-- 🚀 COMANDO RÁPIDO PARA CORRIGIR O FÓRUM
-- Execute este comando no SQL Editor do Supabase

-- 1. Verificar se existem categorias
SELECT COUNT(*) as total_categorias FROM forum_categories;

-- 2. Se o resultado for 0, execute este INSERT:
INSERT INTO forum_categories (name, description, icon, color, order_index) VALUES
('Fisioterapia Respiratória', 'Técnicas respiratórias, ventilação mecânica, UTI', '🫁', '#0891b2', 1),
('Fisioterapia Ortopédica', 'Lesões musculoesqueléticas, reabilitação', '🦴', '#ea580c', 2),
('Fisioterapia Neurológica', 'AVC, lesões medulares, neuroplasticidade', '🧠', '#8b5cf6', 3),
('Fisioterapia Esportiva', 'Prevenção, reabilitação esportiva', '⚽', '#10b981', 4),
('Fisioterapia Pediátrica', 'Desenvolvimento infantil, intervenção precoce', '👶', '#f59e0b', 5),
('Fisioterapia Geriátrica', 'Envelhecimento ativo, prevenção de quedas', '👴', '#6366f1', 6),
('Discussões Gerais', 'Tópicos diversos sobre fisioterapia', '💬', '#6b7280', 7);

-- 3. Verificar se as categorias foram criadas
SELECT * FROM forum_categories ORDER BY order_index;

-- 4. Criar as funções necessárias
CREATE OR REPLACE FUNCTION update_topic_reply_count(topic_id UUID, user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_topics 
  SET 
    replies_count = replies_count + 1,
    last_reply_at = NOW(),
    last_reply_user_id = user_id,
    updated_at = NOW()
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql;

-- 5. Habilitar RLS e criar políticas básicas
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Categorias são públicas" ON forum_categories FOR SELECT USING (true);

ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Tópicos são públicos para leitura" ON forum_topics FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Usuários autenticados podem criar tópicos" ON forum_topics FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Respostas são públicas para leitura" ON forum_replies FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Usuários autenticados podem criar respostas" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
