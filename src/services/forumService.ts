import { supabase } from '../config/supabase';

type UserProfile = {
  id: string;
  email: string;
  nome: string;
  created_at: string;
};

type ForumCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order_index?: number;
};

type ForumTopic = {
  id: string;
  title: string;
  content: string;
  category_id: string;
  user_id: string;
  created_at: string;
  forum_categories?: ForumCategory;
  profiles?: UserProfile;
};

type ForumReply = {
  id: string;
  content: string;
  topic_id: string;
  user_id: string;
  created_at: string;
  profiles?: UserProfile;
};

type ForumStats = {
  members: number;
  topics: number;
  replies: number;
};

// Helper function to ensure user profile exists
async function ensureUserProfile(userId: string): Promise<void> {
  try {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      const { data: userData } = await supabase.auth.getUser();
      
      if (userData?.user) {
        const { error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            email: userData.user.email,
            nome: userData.user.user_metadata?.nome || userData.user.email?.split('@')[0],
            created_at: new Date().toISOString()
          }]);

        if (createError) throw createError;
      }
    }
  } catch (error) {
    console.error('Error ensuring user profile:', error);
    throw error;
  }
}

export async function getForumCategories(): Promise<ForumCategory[]> {
  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('order_index', { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    return [];
  }
}

export async function getForumTopics(
  category: string = 'all',
  searchQuery: string = '',
  sortBy: string = 'recent'
): Promise<ForumTopic[]> {
  try {
    console.log('🔍 Iniciando busca de tópicos...', { category, searchQuery, sortBy });
    
    // Check table structure
    const { data: tables, error: tablesError } = await supabase
      .from('forum_topics')
      .select(`
        id,
        title,
        content,
        category_id,
        user_id,
        created_at
      `)
      .limit(1);
      
    if (tablesError) {
      console.error('❌ Erro na estrutura da tabela:', tablesError);
      if (tablesError.message.includes('does not exist')) {
        throw new Error('A tabela forum_topics não existe. Por favor, execute as migrações do banco de dados.');
      }
      throw new Error('Erro ao verificar estrutura da tabela: ' + tablesError.message);
    }
    console.log('✅ Estrutura da tabela OK', { sample: tables });

    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        forum_categories (*),
        profiles:user_id (
          id,
          email,
          nome
        )
      `);

    if (category !== 'all') {
      query = query.eq('category_id', category);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.error('❌ Erro ao buscar tópicos:', error);
      throw error;
    }
    console.log('✅ Tópicos encontrados:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('Error fetching forum topics:', error);
    return [];
  }
}

export async function getForumTopic(topicId: string): Promise<ForumTopic | null> {
  try {
    const { data, error } = await supabase
      .from('forum_topics')
      .select(`
        *,
        forum_categories (*),
        profiles:user_id (
          id,
          email,
          nome
        )
      `)
      .eq('id', topicId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching forum topic:', error);
    throw error;
  }
}

export async function getForumReplies(topicId: string): Promise<ForumReply[]> {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select(`
        *,
        profiles:user_id (
          id,
          email,
          nome
        )
      `)
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching forum replies:', error);
    return [];
  }
}

export async function createForumTopic(topicData: {
  title: string;
  content: string;
  category_id: string;
  user_id: string;
}): Promise<ForumTopic> {
  try {
    // Garante que o perfil do usuário existe
    await ensureUserProfile(topicData.user_id);

    // Cria o tópico apenas com os campos necessários
    const { data, error } = await supabase
      .from('forum_topics')
      .insert([{
        ...topicData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating forum topic:', error);
    throw error;
  }
}

export async function createForumReply(replyData: {
  content: string;
  topic_id: string;
  user_id: string;
}): Promise<ForumReply> {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .insert([{
        ...replyData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating forum reply:', error);
    throw error;
  }
}

export async function likeForumReply(replyId: string, userId: string): Promise<boolean> {
  try {
    const { data: existingLike } = await supabase
      .from('forum_reply_likes')
      .select('*')
      .eq('reply_id', replyId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Remove like
      const { error } = await supabase
        .from('forum_reply_likes')
        .delete()
        .eq('reply_id', replyId)
        .eq('user_id', userId);

      if (error) throw error;
      return false;
    } else {
      // Add like
      const { error } = await supabase
        .from('forum_reply_likes')
        .insert([{
          reply_id: replyId,
          user_id: userId,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error('Error toggling forum reply like:', error);
    throw error;
  }
}

export async function getForumStats(): Promise<ForumStats> {
  try {
    const [membersCount, topicsCount, repliesCount] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact' }),
      supabase.from('forum_topics').select('id', { count: 'exact' }),
      supabase.from('forum_replies').select('id', { count: 'exact' })
    ]);

    return {
      members: membersCount.count || 0,
      topics: topicsCount.count || 0,
      replies: repliesCount.count || 0
    };
  } catch (error) {
    console.error('Error fetching forum stats:', error);
    return { members: 0, topics: 0, replies: 0 };
  }
}
