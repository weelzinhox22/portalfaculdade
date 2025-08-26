-- Script simples para criar apenas a tabela profiles
-- Use este se quiser algo mais básico

-- Criar a tabela profiles
CREATE TABLE profiles (
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

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política básica - usuários podem ver e editar apenas seu próprio perfil
CREATE POLICY "Usuários podem gerenciar seu próprio perfil" ON profiles
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Política para permitir leitura pública dos perfis (opcional)
CREATE POLICY "Perfis são visíveis para todos" ON profiles
  FOR SELECT USING (true);

-- Verificar se funcionou
SELECT * FROM profiles LIMIT 1;
