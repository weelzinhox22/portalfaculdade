-- Schema do banco de dados para o sistema de autenticação e questões da comunidade
-- Execute este SQL no Supabase SQL Editor

-- 1. Tabela de perfis dos usuários (estende auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome TEXT,
  instituicao TEXT,
  curso TEXT,
  periodo TEXT,
  email TEXT,
  bio TEXT,
  linkedin TEXT,
  instagram TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela para progresso dos simulados
CREATE TABLE IF NOT EXISTS simulado_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  simulado_id INTEGER NOT NULL,
  questao_atual INTEGER DEFAULT 0,
  respostas JSONB DEFAULT '{}',
  tempo_restante INTEGER,
  finalizado BOOLEAN DEFAULT FALSE,
  pontuacao DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, simulado_id)
);

-- 3. Tabela para resultados finais dos simulados
CREATE TABLE IF NOT EXISTS simulado_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  simulado_id INTEGER NOT NULL,
  pontuacao DECIMAL(5,2) NOT NULL,
  total_questoes INTEGER NOT NULL,
  acertos INTEGER NOT NULL,
  tempo_total INTEGER, -- em segundos
  respostas_detalhadas JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela para anotações dos usuários
CREATE TABLE IF NOT EXISTS user_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  questao_id TEXT NOT NULL, -- ID da questão (pode ser do simulado ou comunidade)
  anotacao TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, questao_id)
);

-- 5. Tabela para questões da comunidade
CREATE TABLE IF NOT EXISTS community_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  titulo TEXT NOT NULL,
  enunciado TEXT NOT NULL,
  alternativas JSONB NOT NULL, -- Array de objetos {id, texto}
  resposta_correta TEXT NOT NULL,
  explicacao TEXT NOT NULL,
  raciocinio TEXT,
  referencias TEXT,
  area TEXT NOT NULL,
  dificuldade TEXT NOT NULL CHECK (dificuldade IN ('facil', 'media', 'dificil')),
  tags TEXT, -- Tags separadas por vírgula
  fonte TEXT, -- Fonte da questão
  ano INTEGER, -- Ano da questão/concurso
  autor_nome TEXT, -- Nome do autor
  autor_instituicao TEXT, -- Instituição do autor
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  votos_positivos INTEGER DEFAULT 0,
  votos_negativos INTEGER DEFAULT 0,
  visualizacoes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela para votos nas questões da comunidade
CREATE TABLE IF NOT EXISTS question_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  questao_id UUID REFERENCES community_questions(id) ON DELETE CASCADE NOT NULL,
  voto INTEGER NOT NULL CHECK (voto IN (-1, 1)), -- -1 para downvote, 1 para upvote
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, questao_id)
);

-- 7. Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_simulado_progress_user_id ON simulado_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_simulado_results_user_id ON simulado_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notes_user_id ON user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_community_questions_status ON community_questions(status);
CREATE INDEX IF NOT EXISTS idx_community_questions_area ON community_questions(area);
CREATE INDEX IF NOT EXISTS idx_community_questions_user_id ON community_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_question_votes_questao_id ON question_votes(questao_id);

-- 8. Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Remover triggers existentes se houver e recriar
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_simulado_progress_updated_at ON simulado_progress;
CREATE TRIGGER update_simulado_progress_updated_at BEFORE UPDATE ON simulado_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_notes_updated_at ON user_notes;
CREATE TRIGGER update_user_notes_updated_at BEFORE UPDATE ON user_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_community_questions_updated_at ON community_questions;
CREATE TRIGGER update_community_questions_updated_at BEFORE UPDATE ON community_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger existente se houver e recriar
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Políticas de segurança RLS (Row Level Security)

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulado_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulado_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_votes ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para simulado_progress
CREATE POLICY "Users can manage own progress" ON simulado_progress
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para simulado_results
CREATE POLICY "Users can view own results" ON simulado_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results" ON simulado_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para user_notes
CREATE POLICY "Users can manage own notes" ON user_notes
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para community_questions
CREATE POLICY "Anyone can view approved questions" ON community_questions
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can view own questions" ON community_questions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own questions" ON community_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending questions" ON community_questions
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Políticas para question_votes
CREATE POLICY "Users can manage own votes" ON question_votes
  FOR ALL USING (auth.uid() = user_id);

-- 11. Função para atualizar contadores de votos
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

-- Remover trigger existente se houver e recriar
DROP TRIGGER IF EXISTS question_votes_trigger ON question_votes;
CREATE TRIGGER question_votes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON question_votes
  FOR EACH ROW EXECUTE FUNCTION update_question_votes();

-- 12. Função para incrementar votos (compatibilidade com código existente)
CREATE OR REPLACE FUNCTION incrementar_votos(sugestao_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE sugestoes SET votos = votos + 1 WHERE id = sugestao_id;
END;
$$ LANGUAGE plpgsql;
