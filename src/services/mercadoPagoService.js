// Serviço do Mercado Pago para processamento de pagamentos
class MercadoPagoService {
  constructor() {
    // Suas credenciais do Mercado Pago
    this.publicKey = 'APP_USR-ad3f1019-4db0-4b8c-958d-dba6a14276a8';
    this.accessToken = 'APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287';
    this.baseUrl = 'https://api.mercadopago.com';
  }

  // Criar preferência de pagamento
  async createPreference(preferenceData) {
    try {
      console.log('🔄 Criando preferência no Mercado Pago...', preferenceData);

      // Para desenvolvimento, simular resposta do Mercado Pago
      if (import.meta.env.DEV) {
        return this.simulatePreferenceCreation(preferenceData);
      }

      const response = await fetch(`${this.baseUrl}/checkout/preferences`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferenceData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro do Mercado Pago: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Preferência criada com sucesso:', data.id);
      
      return {
        id: data.id,
        init_point: data.init_point,
        sandbox_init_point: data.sandbox_init_point
      };

    } catch (error) {
      console.error('❌ Erro ao criar preferência:', error);
      throw error;
    }
  }

  // Simular criação de preferência para desenvolvimento
  simulatePreferenceCreation(preferenceData) {
    console.log('🧪 Simulando criação de preferência (desenvolvimento)');
    
    const mockPreferenceId = `PREF_${Date.now()}`;
    const mockInitPoint = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}`;
    
    // Simular delay da API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: mockPreferenceId,
          init_point: mockInitPoint,
          sandbox_init_point: mockInitPoint
        });
      }, 1000);
    });
  }

  // Verificar status do pagamento
  async getPaymentStatus(paymentId) {
    try {
      console.log('🔍 Verificando status do pagamento:', paymentId);

      // Para desenvolvimento, simular status
      if (import.meta.env.DEV) {
        return this.simulatePaymentStatus(paymentId);
      }

      const response = await fetch(`${this.baseUrl}/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao verificar pagamento: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Status do pagamento:', data.status);
      
      return {
        id: data.id,
        status: data.status,
        status_detail: data.status_detail,
        transaction_amount: data.transaction_amount,
        currency_id: data.currency_id,
        payer: data.payer,
        payment_method_id: data.payment_method_id,
        date_created: data.date_created,
        date_approved: data.date_approved
      };

    } catch (error) {
      console.error('❌ Erro ao verificar status:', error);
      throw error;
    }
  }

  // Simular status do pagamento para desenvolvimento
  simulatePaymentStatus(paymentId) {
    console.log('🧪 Simulando status do pagamento (desenvolvimento)');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: paymentId,
          status: 'approved',
          status_detail: 'accredited',
          transaction_amount: 15.00,
          currency_id: 'BRL',
          payer: {
            email: 'test@example.com'
          },
          payment_method_id: 'pix',
          date_created: new Date().toISOString(),
          date_approved: new Date().toISOString()
        });
      }, 1500);
    });
  }

  // Processar webhook do Mercado Pago
  async processWebhook(webhookData) {
    try {
      console.log('📨 Processando webhook do Mercado Pago:', webhookData);

      const { type, data } = webhookData;

      if (type === 'payment') {
        const paymentStatus = await this.getPaymentStatus(data.id);
        
        // Aqui você pode implementar a lógica para:
        // 1. Atualizar status do pedido no banco de dados
        // 2. Enviar email de confirmação
        // 3. Liberar acesso aos produtos
        // 4. Notificar outros sistemas
        
        console.log('✅ Webhook processado com sucesso');
        return paymentStatus;
      }

      return null;
    } catch (error) {
      console.error('❌ Erro ao processar webhook:', error);
      throw error;
    }
  }

  // Gerar dados da preferência formatados
  formatPreferenceData(items, customerData, options = {}) {
    const preferenceData = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.title,
        description: `${item.author} - ${item.pages} páginas`,
        quantity: item.quantity,
        unit_price: parseFloat(item.price),
        currency_id: 'BRL',
        category_id: 'books'
      })),
      payer: {
        name: customerData.name,
        email: customerData.email,
        phone: {
          area_code: customerData.phone.substring(1, 3),
          number: customerData.phone.substring(4).replace(/\D/g, '')
        },
        identification: {
          type: 'CPF',
          number: customerData.document.replace(/\D/g, '')
        },
        address: customerData.address ? {
          street_name: customerData.address,
          zip_code: customerData.zipCode?.replace(/\D/g, ''),
          city: customerData.city,
          state: customerData.state
        } : undefined
      },
      back_urls: {
        success: `${window.location.origin}/checkout/success`,
        failure: `${window.location.origin}/checkout/failure`,
        pending: `${window.location.origin}/checkout/pending`
      },
      auto_return: 'approved',
      notification_url: `${window.location.origin}/api/mercadopago/webhook`,
      statement_descriptor: 'FISIOESTUDOS',
      external_reference: options.orderId || `ORDER_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      },
      shipments: {
        mode: 'not_specified' // Produto digital
      }
    };

    // Aplicar desconto se houver
    if (options.discount && options.discount > 0) {
      preferenceData.discounts = [{
        name: options.discountName || 'Desconto especial',
        value: parseFloat(options.discount)
      }];
    }

    // Configurações adicionais
    if (options.metadata) {
      preferenceData.metadata = options.metadata;
    }

    return preferenceData;
  }

  // Calcular desconto baseado na quantidade de itens
  calculateDiscount(items) {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    let discountPercentage = 0;
    let discountName = '';

    if (itemCount >= 5) {
      discountPercentage = 0.10; // 10%
      discountName = 'Desconto 10% - Compra múltipla (5+ itens)';
    } else if (itemCount >= 3) {
      discountPercentage = 0.05; // 5%
      discountName = 'Desconto 5% - Compra múltipla (3+ itens)';
    }

    const discountAmount = subtotal * discountPercentage;

    return {
      percentage: discountPercentage,
      amount: discountAmount,
      name: discountName,
      total: subtotal - discountAmount
    };
  }

  // Validar dados do cliente
  validateCustomerData(customerData) {
    const errors = {};

    if (!customerData.name?.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!customerData.email?.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      errors.email = 'Email inválido';
    }

    if (!customerData.phone?.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!/\(\d{2}\)\s\d{4,5}-\d{4}/.test(customerData.phone)) {
      errors.phone = 'Formato de telefone inválido';
    }

    if (!customerData.document?.trim()) {
      errors.document = 'CPF é obrigatório';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(customerData.document)) {
      errors.document = 'Formato de CPF inválido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Formatar CPF
  formatCPF(value) {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Formatar telefone
  formatPhone(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return value;
  }

  // Formatar CEP
  formatZipCode(value) {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}

// Instância singleton
const mercadoPagoService = new MercadoPagoService();

export default mercadoPagoService;
