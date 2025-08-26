-- Script para testar inserção na tabela profiles
-- Execute este SQL no Supabase SQL Editor

-- 1. Primeiro, vamos ver os usuários existentes
SELECT 
    id,
    email,
    created_at,
    raw_user_meta_data
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;

-- 2. Inserir perfil usando um ID específico
-- SUBSTITUA 'SEU-USER-ID-AQUI' pelo ID que apareceu na consulta acima
INSERT INTO profiles (
    id, 
    nome, 
    email, 
    instituicao, 
    curso, 
    periodo
) VALUES (
    'SEU-USER-ID-AQUI', -- ⚠️ SUBSTITUA PELO SEU USER ID
    'João Silva',
    'joao@email.com',
    'UNIFESP',
    'Fisioterapia',
    '5º período'
);

-- 3. Verificar se foi inserido
SELECT * FROM profiles;

-- 4. Se você souber seu email, pode usar esta query para inserir automaticamente:
-- (Descomente as linhas abaixo e substitua o email)

/*
INSERT INTO profiles (
    id, 
    nome, 
    email, 
    instituicao, 
    curso
)
SELECT 
    u.id,
    'Seu Nome Aqui',
    u.email,
    'Sua Instituição',
    'Fisioterapia'
FROM auth.users u 
WHERE u.email = 'SEU-EMAIL@AQUI.COM' -- ⚠️ SUBSTITUA PELO SEU EMAIL
LIMIT 1;
*/

-- 5. Verificar o resultado final
SELECT 
    p.*,
    u.email as user_email
FROM profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.created_at DESC;
