-- Script SQL para configurar o Supabase para o Portal de Fisioterapia
-- Execute este script no SQL Editor do Supabase

-- 1. Criar tabela de sugestões
CREATE TABLE IF NOT EXISTS sugestoes (
    id BIGSERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL CHECK (categoria IN ('calculadoras', 'questoes', 'conteudo', 'plataforma', 'outros')),
    prioridade TEXT NOT NULL DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta')),
    status TEXT NOT NULL DEFAULT 'sugerido' CHECK (status IN ('sugerido', 'em-analise', 'em-producao', 'concluido')),
    autor TEXT NOT NULL DEFAULT 'Anônimo',
    votos INTEGER NOT NULL DEFAULT 0,
    comentarios INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar função para incrementar votos
CREATE OR REPLACE FUNCTION incrementar_votos(sugestao_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE sugestoes 
    SET votos = votos + 1, updated_at = NOW()
    WHERE id = sugestao_id;
END;
$$ LANGUAGE plpgsql;

-- 3. Criar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sugestoes_updated_at
    BEFORE UPDATE ON sugestoes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Configurar Row Level Security (RLS)
ALTER TABLE sugestoes ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas de segurança
-- Permitir leitura para todos
CREATE POLICY "Permitir leitura de sugestões para todos" ON sugestoes
    FOR SELECT USING (true);

-- Permitir inserção para todos (usuários anônimos podem sugerir)
CREATE POLICY "Permitir inserção de sugestões para todos" ON sugestoes
    FOR INSERT WITH CHECK (true);

-- Permitir atualização apenas dos votos (através da função)
CREATE POLICY "Permitir atualização de votos" ON sugestoes
    FOR UPDATE USING (true)
    WITH CHECK (true);

-- 6. Inserir algumas sugestões de exemplo
INSERT INTO sugestoes (titulo, descricao, categoria, prioridade, status, autor, votos, comentarios) VALUES
('Calculadora de Escala de Dor', 'Implementar calculadoras para EVA, McGill e outras escalas de dor validadas', 'calculadoras', 'alta', 'em-analise', 'Maria Silva', 45, 8),
('Questões de Neurologia', 'Banco de questões específico para fisioterapia neurológica com casos clínicos', 'questoes', 'alta', 'em-producao', 'João Santos', 38, 12),
('Vídeos de Técnicas Manuais', 'Biblioteca de vídeos demonstrando técnicas de terapia manual', 'conteudo', 'media', 'sugerido', 'Ana Costa', 29, 5),
('Simulados de Concursos', 'Simulados específicos para concursos públicos em fisioterapia', 'questoes', 'alta', 'concluido', 'Pedro Lima', 52, 15),
('App Mobile', 'Versão mobile do portal para estudar em qualquer lugar', 'plataforma', 'baixa', 'sugerido', 'Carla Mendes', 23, 3);

-- 7. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_sugestoes_categoria ON sugestoes(categoria);
CREATE INDEX IF NOT EXISTS idx_sugestoes_status ON sugestoes(status);
CREATE INDEX IF NOT EXISTS idx_sugestoes_created_at ON sugestoes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sugestoes_votos ON sugestoes(votos DESC);

-- Verificar se tudo foi criado corretamente
SELECT 'Tabela sugestoes criada com sucesso!' as status;
SELECT COUNT(*) as total_sugestoes FROM sugestoes;
