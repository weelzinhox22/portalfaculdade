import { supabase } from '../config/supabase';

// Categorias padrão do fórum
const defaultCategories = [
  {
    name: 'Fisioterapia Respiratória',
    description: 'Técnicas respiratórias, ventilação mecânica, UTI',
    icon: '🫁',
    color: '#0891b2',
    order_index: 1
  },
  {
    name: 'Fisioterapia Ortopédica',
    description: 'Lesões musculoesqueléticas, reabilitação',
    icon: '🦴',
    color: '#ea580c',
    order_index: 2
  },
  {
    name: 'Fisioterapia Neurológica',
    description: 'AVC, lesões medulares, neuroplasticidade',
    icon: '🧠',
    color: '#8b5cf6',
    order_index: 3
  },
  {
    name: 'Fisioterapia Esportiva',
    description: 'Prevenção, reabilitação esportiva',
    icon: '⚽',
    color: '#10b981',
    order_index: 4
  },
  {
    name: 'Fisioterapia Pediátrica',
    description: 'Desenvolvimento infantil, intervenção precoce',
    icon: '👶',
    color: '#f59e0b',
    order_index: 5
  },
  {
    name: 'Fisioterapia Geriátrica',
    description: 'Envelhecimento ativo, prevenção de quedas',
    icon: '👴',
    color: '#6366f1',
    order_index: 6
  },
  {
    name: 'Discussões Gerais',
    description: 'Tópicos diversos sobre fisioterapia',
    icon: '💬',
    color: '#6b7280',
    order_index: 7
  }
];

// Função para verificar e criar categorias se necessário
export const setupForumCategories = async () => {
  try {
    console.log('🔧 Verificando configuração do fórum...');

    // Verificar se existem categorias
    const { data: existingCategories, error: selectError } = await supabase
      .from('forum_categories')
      .select('*');

    if (selectError) {
      console.error('❌ Erro ao verificar categorias:', selectError);
      throw selectError;
    }

    console.log('📊 Categorias existentes:', existingCategories?.length || 0);

    // Se não há categorias, criar as padrão
    if (!existingCategories || existingCategories.length === 0) {
      console.log('📝 Criando categorias padrão...');

      const { data: newCategories, error: insertError } = await supabase
        .from('forum_categories')
        .insert(defaultCategories)
        .select();

      if (insertError) {
        console.error('❌ Erro ao criar categorias:', insertError);

        // Se o erro for de duplicata, tentar buscar novamente
        if (insertError.code === '23505') {
          console.log('⚠️ Categorias já existem, buscando novamente...');
          const { data: retryData } = await supabase
            .from('forum_categories')
            .select('*')
            .order('order_index', { ascending: true });
          return retryData;
        }

        throw insertError;
      }

      console.log('✅ Categorias criadas com sucesso:', newCategories?.length || 0);
      return newCategories;
    }

    console.log('✅ Categorias já existem');
    return existingCategories;
  } catch (error) {
    console.error('❌ Erro na configuração do fórum:', error);
    throw error;
  }
};

// Função para criar tópicos de exemplo (opcional)
export const createSampleTopics = async () => {
  try {
    console.log('📝 Verificando tópicos de exemplo...');

    // Verificar se já existem tópicos
    const { data: existingTopics, error: selectError } = await supabase
      .from('forum_topics')
      .select('*');

    if (selectError) {
      console.error('❌ Erro ao verificar tópicos:', selectError);
      return;
    }

    if (existingTopics && existingTopics.length > 0) {
      console.log('✅ Tópicos já existem');
      return;
    }

    // Buscar categorias para criar tópicos de exemplo
    const { data: categories } = await supabase
      .from('forum_categories')
      .select('*')
      .limit(3);

    if (!categories || categories.length === 0) {
      console.log('⚠️ Nenhuma categoria encontrada para criar tópicos de exemplo');
      return;
    }

    // Buscar um usuário para ser o autor (ou usar um ID fixo)
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('⚠️ Usuário não logado - não é possível criar tópicos de exemplo');
      return;
    }

    const sampleTopics = [
      {
        category_id: categories[0]?.id,
        user_id: user.id,
        title: 'Bem-vindos ao Fórum de Fisioterapia! 🎉',
        content: `Olá pessoal!

Este é o nosso novo fórum da comunidade de fisioterapia. Aqui vocês podem:

• Tirar dúvidas sobre casos clínicos
• Compartilhar experiências profissionais  
• Discutir novas técnicas e tratamentos
• Trocar conhecimentos com colegas

Vamos construir juntos uma comunidade forte e colaborativa!

Sejam todos bem-vindos! 💪`,
        is_pinned: true,
        views: 0,
        replies_count: 0
      },
      {
        category_id: categories[1]?.id,
        user_id: user.id,
        title: 'Dúvida sobre protocolo de reabilitação pós-cirúrgica',
        content: `Pessoal, estou com uma dúvida sobre um caso:

Paciente de 45 anos, pós-cirurgia de LCA há 2 semanas. Ainda apresenta edema e limitação de movimento.

Quando vocês costumam iniciar exercícios mais intensos? Algum protocolo específico que recomendam?

Obrigado pela ajuda!`,
        views: 0,
        replies_count: 0
      }
    ];

    const { data: newTopics, error: insertError } = await supabase
      .from('forum_topics')
      .insert(sampleTopics)
      .select();

    if (insertError) {
      console.error('❌ Erro ao criar tópicos de exemplo:', insertError);
      return;
    }

    console.log('✅ Tópicos de exemplo criados:', newTopics?.length || 0);
  } catch (error) {
    console.error('❌ Erro ao criar tópicos de exemplo:', error);
  }
};
