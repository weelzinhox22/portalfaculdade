-- Script para corrigir triggers duplicados no Supabase
-- Execute este SQL se você receber erros de triggers já existentes

-- 1. Remover todos os triggers existentes
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_simulado_progress_updated_at ON simulado_progress;
DROP TRIGGER IF EXISTS update_user_notes_updated_at ON user_notes;
DROP TRIGGER IF EXISTS update_community_questions_updated_at ON community_questions;
DROP TRIGGER IF EXISTS question_votes_trigger ON question_votes;

-- 2. Recriar função para atualizar updated_at (caso não exista)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Recriar função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recriar função para atualizar votos
CREATE OR REPLACE FUNCTION update_question_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.voto = 1 THEN
      UPDATE community_questions 
      SET votos_positivos = votos_positivos + 1 
      WHERE id = NEW.questao_id;
    ELSE
      UPDATE community_questions 
      SET votos_negativos = votos_negativos + 1 
      WHERE id = NEW.questao_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Remove voto anterior
    IF OLD.voto = 1 THEN
      UPDATE community_questions 
      SET votos_positivos = votos_positivos - 1 
      WHERE id = OLD.questao_id;
    ELSE
      UPDATE community_questions 
      SET votos_negativos = votos_negativos - 1 
      WHERE id = OLD.questao_id;
    END IF;
    -- Adiciona novo voto
    IF NEW.voto = 1 THEN
      UPDATE community_questions 
      SET votos_positivos = votos_positivos + 1 
      WHERE id = NEW.questao_id;
    ELSE
      UPDATE community_questions 
      SET votos_negativos = votos_negativos + 1 
      WHERE id = NEW.questao_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.voto = 1 THEN
      UPDATE community_questions 
      SET votos_positivos = votos_positivos - 1 
      WHERE id = OLD.questao_id;
    ELSE
      UPDATE community_questions 
      SET votos_negativos = votos_negativos - 1 
      WHERE id = OLD.questao_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 5. Recriar todos os triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_simulado_progress_updated_at BEFORE UPDATE ON simulado_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at BEFORE UPDATE ON user_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_questions_updated_at BEFORE UPDATE ON community_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER question_votes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON question_votes
  FOR EACH ROW EXECUTE FUNCTION update_question_votes();

-- Mensagem de sucesso
SELECT 'Triggers corrigidos com sucesso!' as status;
