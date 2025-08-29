import { supabase } from './supabase';

export const emailService = {
  // Criar uma nova notificação de email
  createNotification: async (userId: string, email: string, subject: string, content: string) => {
    try {
      const { data, error } = await supabase
        .rpc('create_notification', {
          p_user_id: userId,
          p_email: email,
          p_subject: subject,
          p_content: content
        });

      if (error) {
        console.error('Erro ao criar notificação:', error);
        throw error;
      }

      return { success: true, notificationId: data };
    } catch (error) {
      console.error('Erro no serviço de notificação:', error);
      return { success: false, error };
    }
  },

  // Buscar notificações do usuário
  getUserNotifications: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar notificações:', error);
        throw error;
      }

      return { success: true, notifications: data };
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      return { success: false, error };
    }
  }
};

export default emailService;
