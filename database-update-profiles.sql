-- Script para adicionar novos campos à tabela profiles
-- Execute este SQL se você já tem a tabela profiles criada

-- Adicionar novos campos se não existirem
DO $$ 
BEGIN
    -- Adicionar campo bio
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'bio') THEN
        ALTER TABLE profiles ADD COLUMN bio TEXT;
    END IF;
    
    -- Adicionar campo linkedin
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'linkedin') THEN
        ALTER TABLE profiles ADD COLUMN linkedin TEXT;
    END IF;
    
    -- Adicionar campo instagram
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'instagram') THEN
        ALTER TABLE profiles ADD COLUMN instagram TEXT;
    END IF;
END $$;

-- Mensagem de sucesso
SELECT 'Campos adicionados à tabela profiles com sucesso!' as status;
