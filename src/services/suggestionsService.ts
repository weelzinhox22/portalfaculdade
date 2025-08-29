import { supabase } from '../config/supabase';

export type SuggestionStatus = 'pending' | 'in_progress' | 'completed' | 'rejected';

export type Suggestion = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  status: SuggestionStatus;
  want_notifications: boolean;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
  profiles?: {
    id: string;
    email: string;
    nome: string;
  };
};

export async function createSuggestion(data: {
  title: string;
  description: string;
  user_id: string;
  want_notifications: boolean;
}): Promise<Suggestion> {
  try {
    const { data: suggestion, error } = await supabase
      .from('suggestions')
      .insert([{
        ...data,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select('*, profiles(*)')
      .single();

    if (error) throw error;
    return suggestion;
  } catch (error) {
    console.error('Error creating suggestion:', error);
    throw error;
  }
}

export async function getSuggestions(filters?: {
  status?: SuggestionStatus;
  userId?: string;
}): Promise<Suggestion[]> {
  try {
    let query = supabase
      .from('suggestions')
      .select('*, profiles(*)');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
}

export async function updateSuggestionStatus(
  suggestionId: string,
  status: SuggestionStatus,
  adminNotes?: string
): Promise<Suggestion> {
  try {
    const { data: suggestion, error } = await supabase
      .from('suggestions')
      .update({
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', suggestionId)
      .select('*, profiles(*)')
      .single();

    if (error) throw error;

    // O email será enviado automaticamente pelo trigger no banco de dados
    return suggestion;
  } catch (error) {
    console.error('Error updating suggestion status:', error);
    throw error;
  }
}

async function sendStatusUpdateEmail(suggestion: Suggestion) {
  try {
    const statusMessages = {
      pending: 'está em análise',
      in_progress: 'está em produção',
      completed: 'foi concluída',
      rejected: 'foi rejeitada'
    };

    const { error } = await supabase.functions.invoke('send-email', {
      body: {
        to: suggestion.profiles?.email,
        subject: `Atualização da sua sugestão: ${suggestion.title}`,
        content: `
          Olá ${suggestion.profiles?.nome},
          
          Sua sugestão "${suggestion.title}" ${statusMessages[suggestion.status]}.
          
          ${suggestion.admin_notes ? `\nObservações: ${suggestion.admin_notes}` : ''}
          
          Obrigado por contribuir para a melhoria do portal!
        `
      }
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}
