-- Script para verificar o estado do banco de dados

-- 1. Verificar se a tabela community_questions existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'community_questions';

-- 2. Verificar a estrutura da tabela community_questions
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'community_questions'
ORDER BY ordinal_position;

-- 3. Verificar se a tabela profiles existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- 4. Verificar a estrutura da tabela profiles
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 5. Contar registros existentes
SELECT 
    'community_questions' as tabela,
    COUNT(*) as total_registros
FROM community_questions
UNION ALL
SELECT 
    'profiles' as tabela,
    COUNT(*) as total_registros
FROM profiles;

-- 6. Verificar usuários autenticados
SELECT 
    id,
    email,
    created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;
