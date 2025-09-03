import { supabase } from '../config/supabase';

// Buscar categorias do fórum
export const getForumCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

// Buscar tópicos do fórum
export const getForumTopics = async (category = 'all', searchQuery = '', sortBy = 'recent') => {
  try {
    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        author:profiles(nome),
        category:forum_categories(name),
        replies:forum_replies(count)
      `);

    // Filtrar por categoria
    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    // Filtrar por busca
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    // Ordenar
    switch (sortBy) {
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popular':
        query = query.order('views', { ascending: false });
        break;
      case 'active':
        query = query.order('last_reply_at', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query.limit(50);

    if (error) {
      console.error('Erro ao buscar tópicos:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar tópicos:', error);
    return [];
  }
};

// Buscar estatísticas do fórum
export const getForumStats = async () => {
  try {
    const [topicsResult, repliesResult, membersResult] = await Promise.all([
      supabase.from('forum_topics').select('*', { count: 'exact', head: true }),
      supabase.from('forum_replies').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true })
    ]);

    return {
      topics: topicsResult.count || 0,
      replies: repliesResult.count || 0,
      members: membersResult.count || 0
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return { topics: 0, replies: 0, members: 0 };
  }
};

// Criar novo tópico
export const createForumTopic = async (topicData) => {
  try {
    const { data, error } = await supabase
      .from('forum_topics')
      .insert([topicData])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar tópico:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar tópico:', error);
    throw error;
  }
};

// Buscar tópico específico
export const getForumTopic = async (topicId) => {
  try {
    const { data, error } = await supabase
      .from('forum_topics')
      .select(`
        *,
        author:profiles(nome, email),
        category:forum_categories(name, color)
      `)
      .eq('id', topicId)
      .single();

    if (error) {
      console.error('Erro ao buscar tópico:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar tópico:', error);
    return null;
  }
};

// Buscar respostas de um tópico
export const getForumReplies = async (topicId) => {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select(`
        *,
        author:profiles(nome, email)
      `)
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erro ao buscar respostas:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar respostas:', error);
    return [];
  }
};

// Criar resposta
export const createForumReply = async (replyData) => {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .insert([replyData])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar resposta:', error);
      throw error;
    }

    // Atualizar last_reply_at do tópico
    await supabase
      .from('forum_topics')
      .update({ last_reply_at: new Date().toISOString() })
      .eq('id', replyData.topic_id);

    return data;
  } catch (error) {
    console.error('Erro ao criar resposta:', error);
    throw error;
  }
};

// Marcar tópico como visualizado
export const markTopicAsViewed = async (topicId) => {
  try {
    const { error } = await supabase
      .from('forum_topics')
      .update({ views: supabase.raw('views + 1') })
      .eq('id', topicId);

    if (error) {
      console.error('Erro ao marcar como visualizado:', error);
    }
  } catch (error) {
    console.error('Erro ao marcar como visualizado:', error);
  }
};

// Curtir/descurtir resposta
export const likeForumReply = async (replyId, userId) => {
  try {
    // Verificar se já curtiu
    const { data: existingLike, error: checkError } = await supabase
      .from('forum_reply_likes')
      .select('*')
      .eq('reply_id', replyId)
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar like:', checkError);
      throw checkError;
    }

    if (existingLike) {
      // Remover like
      const { error: deleteError } = await supabase
        .from('forum_reply_likes')
        .delete()
        .eq('reply_id', replyId)
        .eq('user_id', userId);

      if (deleteError) {
        console.error('Erro ao remover like:', deleteError);
        throw deleteError;
      }

      return false; // Like removido
    } else {
      // Adicionar like
      const { error: insertError } = await supabase
        .from('forum_reply_likes')
        .insert([{
          reply_id: replyId,
          user_id: userId
        }]);

      if (insertError) {
        console.error('Erro ao adicionar like:', insertError);
        throw insertError;
      }

      return true; // Like adicionado
    }
  } catch (error) {
    console.error('Erro ao gerenciar like:', error);
    throw error;
  }
};

// Buscar likes de uma resposta
export const getReplyLikes = async (replyId) => {
  try {
    const { data, error } = await supabase
      .from('forum_reply_likes')
      .select('user_id')
      .eq('reply_id', replyId);

    if (error) {
      console.error('Erro ao buscar likes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar likes:', error);
    return [];
  }
};
