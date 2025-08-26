-- Script para adicionar novos campos à tabela community_questions
-- Execute este SQL se você já tem a tabela community_questions criada

-- Adicionar novos campos se não existirem
DO $$ 
BEGIN
    -- Adicionar campo tags
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'community_questions' AND column_name = 'tags') THEN
        ALTER TABLE community_questions ADD COLUMN tags TEXT;
    END IF;
    
    -- Adicionar campo fonte
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'community_questions' AND column_name = 'fonte') THEN
        ALTER TABLE community_questions ADD COLUMN fonte TEXT;
    END IF;
    
    -- Adicionar campo ano
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'community_questions' AND column_name = 'ano') THEN
        ALTER TABLE community_questions ADD COLUMN ano INTEGER;
    END IF;
    
    -- Adicionar campo autor_nome
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'community_questions' AND column_name = 'autor_nome') THEN
        ALTER TABLE community_questions ADD COLUMN autor_nome TEXT;
    END IF;
    
    -- Adicionar campo autor_instituicao
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'community_questions' AND column_name = 'autor_instituicao') THEN
        ALTER TABLE community_questions ADD COLUMN autor_instituicao TEXT;
    END IF;
    
    -- Adicionar campo visualizacoes
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'community_questions' AND column_name = 'visualizacoes') THEN
        ALTER TABLE community_questions ADD COLUMN visualizacoes INTEGER DEFAULT 0;
    END IF;
END $$;

-- Mensagem de sucesso
SELECT 'Campos adicionados à tabela community_questions com sucesso!' as status;
