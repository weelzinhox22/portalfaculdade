// Email Marketing Service para Nutrição de Leads
class EmailService {
  constructor() {
    this.apiKey = import.meta.env.VITE_MAILCHIMP_API_KEY || '';
    this.listId = import.meta.env.VITE_MAILCHIMP_LIST_ID || '';
    this.baseUrl = 'https://us21.api.mailchimp.com/3.0'; // Ajustar conforme sua região
  }

  // Adicionar lead à lista de email marketing
  async addLead(email, firstName, source = 'downloads', interests = []) {
    try {
      // Simular sucesso para desenvolvimento
      // Em produção, implementar integração real com Mailchimp/RD Station
      console.log('📧 Lead capturado:', { email, firstName, source, interests });

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Disparar sequência de boas-vindas
      this.triggerWelcomeSequence(email, firstName, source);

      return { success: true };
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
      return { success: false, error: error.message };
    }
  }

  // Disparar sequência de boas-vindas
  async triggerWelcomeSequence(email, firstName, source) {
    console.log(`🎉 Sequência de boas-vindas iniciada para ${firstName} (${email})`);
    console.log(`📊 Fonte: ${source}`);

    // Em produção, aqui seria feita a integração real com:
    // - Mailchimp Automations
    // - RD Station Workflows
    // - SendGrid Automations
    // - Ou webhook personalizado

    return { success: true };
  }

  // Segmentar leads por interesse
  async segmentLead(email, category) {
    const segments = {
      'anatomia': ['anatomia_humana', 'atlas_anatomia'],
      'atlas': ['atlas_medicos', 'referencias_visuais'],
      'semiologia': ['exame_fisico', 'diagnostico'],
      'cardiologia': ['fisio_cardiaca', 'cardiologia']
    };

    const tags = segments[category] || [category];

    console.log(`🏷️ Segmentando lead ${email} com tags:`, tags);

    // Em produção, aqui seria feita a segmentação real
    return { success: true };
  }

  // Gerar hash do subscriber (necessário para API do Mailchimp)
  getSubscriberHash(email) {
    // Implementação simples de MD5 para browser (apenas para demo)
    // Em produção, use uma biblioteca como crypto-js
    return btoa(email.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 32);
  }

  // Tracking de eventos para remarketing
  async trackEvent(email, eventType, eventData) {
    console.log(`📊 Evento rastreado:`, {
      email,
      event: eventType,
      data: eventData,
      timestamp: new Date().toISOString()
    });

    // Em produção, aqui seria enviado para:
    // - Google Analytics
    // - Facebook Pixel
    // - Sistema de CRM
    // - Webhook personalizado

    return { success: true };
  }
}

// Templates de Email para Sequência de Nutrição
export const emailTemplates = {
  welcome: {
    subject: "✅ Seu acesso premium foi liberado! + Bônus especial",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Bem-vindo ao FisioEstudos!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Seu acesso premium foi liberado</p>
        </div>
        
        <div style="padding: 40px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Olá <strong>{{firstName}}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Parabéns! Agora você tem acesso aos nossos materiais premium de fisioterapia. 
            Preparamos alguns bônus especiais para você:
          </p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">🎁 Seus Bônus Exclusivos:</h3>
            <ul style="color: #374151; line-height: 1.8;">
              <li>📚 Acesso a todos os materiais premium</li>
              <li>📋 Guia de estudos em anatomia (PDF)</li>
              <li>💬 Acesso ao grupo VIP no Telegram</li>
              <li>🎯 Plano de estudos personalizado</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://fisioestudos.com/downloads" 
               style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
                      color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 25px; font-weight: bold; display: inline-block;">
              🚀 ACESSAR MATERIAIS PREMIUM
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 30px;">
            Dúvidas? Responda este email que te ajudamos! 😊
          </p>
        </div>
      </div>
    `
  },

  studyTips: {
    subject: "📚 5 técnicas para memorizar anatomia 3x mais rápido",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🧠 Técnicas de Estudo Avançadas</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Como estudar anatomia de forma eficiente</p>
        </div>
        
        <div style="padding: 40px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Olá <strong>{{firstName}}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Você baixou nossos atlas de anatomia, então sei que está estudando sério! 
            Aqui estão 5 técnicas comprovadas para memorizar estruturas anatômicas 3x mais rápido:
          </p>
          
          <div style="margin: 30px 0;">
            <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0;">1. 🗺️ Técnica do Mapa Mental</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                Crie mapas visuais conectando estruturas relacionadas. Exemplo: coração → artérias → veias → capilares.
              </p>
            </div>
            
            <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0;">2. 🎨 Associação Visual</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                Associe cada estrutura a uma imagem mental marcante. Quanto mais bizarra, melhor você lembra!
              </p>
            </div>
            
            <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0;">3. ⏰ Repetição Espaçada</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                Revise o conteúdo em intervalos crescentes: 1 dia, 3 dias, 1 semana, 1 mês.
              </p>
            </div>
            
            <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0;">4. 🎭 Storytelling Anatômico</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                Crie histórias envolvendo as estruturas. "O sangue viajou pela artéria até encontrar..."
              </p>
            </div>
            
            <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0;">5. ✋ Prática Ativa</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                Desenhe, aponte, explique em voz alta. Quanto mais sentidos envolver, melhor!
              </p>
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 30px 0;">
            <p style="margin: 0; color: #92400e; font-weight: bold;">
              💡 Dica Extra: Nosso curso "Anatomia Descomplicada" ensina essas técnicas em detalhes, 
              com exercícios práticos e casos reais. Interessado?
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://fisioestudos.com/produtos" 
               style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
                      color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 25px; font-weight: bold; display: inline-block;">
              🎓 VER CURSOS DISPONÍVEIS
            </a>
          </div>
        </div>
      </div>
    `
  },

  specialOffer: {
    subject: "🎯 Oferta especial para você, {{firstName}} - 40% OFF",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🔥 OFERTA ESPECIAL</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Exclusiva para nossos subscribers</p>
        </div>
        
        <div style="padding: 40px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Olá <strong>{{firstName}}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Como você demonstrou interesse em nossos materiais de anatomia, 
            tenho uma oferta especial que expira em 48 horas:
          </p>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
                      padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center;">
            <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 24px;">
              📚 E-book "Anatomia para Fisioterapeutas"
            </h2>
            <div style="margin: 20px 0;">
              <span style="font-size: 18px; color: #6b7280; text-decoration: line-through;">
                De R$ 67,90
              </span>
              <span style="font-size: 32px; color: #dc2626; font-weight: bold; margin-left: 15px;">
                por R$ 39,90
              </span>
            </div>
            <div style="background: #dc2626; color: white; padding: 10px 20px; 
                        border-radius: 25px; display: inline-block; font-weight: bold;">
              40% DE DESCONTO
            </div>
          </div>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">✅ O que você vai receber:</h3>
            <ul style="color: #374151; line-height: 1.8; margin: 0;">
              <li>📖 Mais de 200 páginas de conteúdo</li>
              <li>🎨 Ilustrações exclusivas e didáticas</li>
              <li>🏥 Casos clínicos práticos</li>
              <li>📋 Resumos por sistema</li>
              <li>🎯 Exercícios de fixação</li>
              <li>📱 Acesso vitalício</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://fisioestudos.com/checkout/anatomia-ebook" 
               style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
                      color: white; padding: 20px 40px; text-decoration: none; 
                      border-radius: 25px; font-weight: bold; display: inline-block;
                      font-size: 18px;">
              🚀 GARANTIR DESCONTO AGORA
            </a>
          </div>
          
          <div style="background: #fee2e2; padding: 15px; border-radius: 10px; text-align: center;">
            <p style="margin: 0; color: #dc2626; font-weight: bold;">
              ⏰ Oferta válida apenas até {{expirationDate}} às 23:59h
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 30px;">
            *Oferta exclusiva para nossos subscribers. Não perca!
          </p>
        </div>
      </div>
    `
  }
};

export default new EmailService();
