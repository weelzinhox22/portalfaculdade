-- Teste de inserção na tabela community_questions
-- Execute este SQL no Supabase para testar se a tabela está funcionando

-- Primeiro, verificar se a tabela existe
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'community_questions'
ORDER BY ordinal_position;

-- Teste de inserção simples
INSERT INTO community_questions (
  user_id,
  titulo,
  enunciado,
  alternativas,
  resposta_correta,
  explicacao,
  area,
  dificuldade,
  status
) VALUES (
  'c2964997-5625-44f7-8a0b-2c808760bb8e', -- Substitua pelo seu user_id
  'Teste de Questão',
  'Esta é uma questão de teste para verificar se a inserção está funcionando.',
  '[
    {"id": "a", "texto": "Alternativa A"},
    {"id": "b", "texto": "Alternativa B"},
    {"id": "c", "texto": "Alternativa C"},
    {"id": "d", "texto": "Alternativa D"},
    {"id": "e", "texto": "Alternativa E"}
  ]'::jsonb,
  'a',
  'Esta é a explicação da resposta correta.',
  'Anatomia',
  'facil',
  'approved'
);

-- Verificar se a inserção funcionou
SELECT * FROM community_questions WHERE titulo = 'Teste de Questão';
