-- Script para testar se o projeto Supabase está funcionando
-- Execute este SQL no Supabase SQL Editor

-- 1. Verificar se as tabelas existem
SELECT 'Verificando tabelas existentes...' as status;

SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Verificar se a tabela profiles existe
SELECT 'Verificando tabela profiles...' as status;

SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. Verificar se há usuários na tabela auth.users
SELECT 'Verificando usuários...' as status;

SELECT 
    COUNT(*) as total_usuarios,
    COUNT(*) FILTER (WHERE email_confirmed_at IS NOT NULL) as usuarios_confirmados
FROM auth.users;

-- 4. Verificar configurações de autenticação
SELECT 'Verificando configurações de auth...' as status;

-- Verificar se o signup está habilitado
SELECT 
    name,
    value
FROM auth.config
WHERE name IN ('enable_signup', 'site_url', 'external_email_enabled');

-- 5. Testar inserção na tabela profiles
SELECT 'Testando inserção na tabela profiles...' as status;

-- Criar um usuário de teste (se não existir)
DO $$
DECLARE
    test_user_id UUID;
BEGIN
    -- Verificar se já existe um usuário de teste
    SELECT id INTO test_user_id
    FROM auth.users 
    WHERE email = 'teste@fisioneo.com'
    LIMIT 1;
    
    -- Se não existir, criar um perfil de teste
    IF test_user_id IS NULL THEN
        -- Inserir um perfil de teste diretamente
        INSERT INTO profiles (
            id,
            nome,
            email,
            instituicao,
            curso
        ) VALUES (
            gen_random_uuid(),
            'Usuário de Teste',
            'teste@fisioneo.com',
            'Universidade de Teste',
            'Fisioterapia'
        );
        
        RAISE NOTICE 'Perfil de teste criado com sucesso!';
    ELSE
        RAISE NOTICE 'Usuário de teste já existe: %', test_user_id;
    END IF;
END $$;

-- 6. Verificar se a inserção funcionou
SELECT 'Verificando perfis criados...' as status;

SELECT 
    id,
    nome,
    email,
    instituicao,
    created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 5;

-- 7. Verificar políticas RLS
SELECT 'Verificando políticas RLS...' as status;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 8. Verificar se RLS está habilitado nas tabelas
SELECT 'Verificando RLS habilitado...' as status;

SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
AND rowsecurity = true;

-- 9. Testar função de criação de perfil
SELECT 'Testando função de criação de perfil...' as status;

-- Verificar se a função existe
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%profile%';

-- 10. Resultado final
SELECT 'TESTE COMPLETO - RESUMO:' as status;

SELECT 
    'Tabelas' as categoria,
    COUNT(*) as quantidade
FROM information_schema.tables 
WHERE table_schema = 'public'

UNION ALL

SELECT 
    'Usuários Auth' as categoria,
    COUNT(*) as quantidade
FROM auth.users

UNION ALL

SELECT 
    'Perfis' as categoria,
    COUNT(*) as quantidade
FROM profiles

UNION ALL

SELECT 
    'Políticas RLS' as categoria,
    COUNT(*) as quantidade
FROM pg_policies 
WHERE schemaname = 'public';

SELECT 'Teste do projeto Supabase concluído! ✅' as resultado_final;
