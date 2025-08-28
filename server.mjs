// Servidor Mercado Pago - ES Module
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Suas credenciais do Mercado Pago
const ACCESS_TOKEN = 'APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287';

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rota de teste
app.get('/api/test', (req, res) => {
  console.log('📋 Rota de teste acessada!');
  res.json({ 
    message: 'Servidor Mercado Pago funcionando!',
    timestamp: new Date().toISOString(),
    access_token_configured: !!ACCESS_TOKEN,
    node_version: process.version
  });
});

// Rota para testar conexão com Mercado Pago
app.get('/api/test-connection', async (req, res) => {
  try {
    console.log('🧪 Testando conexão com Mercado Pago...');
    
    const response = await fetch('https://api.mercadopago.com/users/me', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      console.log('✅ Conexão OK! Usuário:', userData.email);
      res.json({
        status: 'success',
        message: 'Conexão com Mercado Pago OK!',
        user: {
          id: userData.id,
          email: userData.email,
          country_id: userData.site_id
        }
      });
    } else {
      const errorText = await response.text();
      console.error('❌ Erro de conexão:', errorText);
      res.status(response.status).json({
        status: 'error',
        message: 'Erro de conexão com Mercado Pago',
        details: errorText
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno ao testar conexão',
      details: error.message
    });
  }
});

// Rota para criar preferência
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    console.log('📦 Criando preferência Mercado Pago:', req.body);
    
    const { items, customerData } = req.body;
    
    // Dados da preferência
    const preferenceData = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.title,
        description: `${item.author} - Livro digital de fisioterapia`,
        quantity: item.quantity,
        unit_price: parseFloat(item.price),
        currency_id: 'BRL',
        category_id: 'books'
      })),
      payer: {
        name: customerData.name,
        email: customerData.email,
        phone: {
          area_code: customerData.phone.substring(1, 3) || '11',
          number: customerData.phone.replace(/\D/g, '').substring(2) || '999999999'
        },
        identification: {
          type: 'CPF',
          number: customerData.document.replace(/\D/g, '') || '11111111111'
        }
      },
      back_urls: {
        success: 'http://localhost:5173/checkout/success',
        failure: 'http://localhost:5173/checkout/failure',
        pending: 'http://localhost:5173/checkout/pending'
      },
      notification_url: 'http://localhost:3001/api/mercadopago/webhook',
      statement_descriptor: 'FISIOESTUDOS',
      external_reference: `ORDER_${Date.now()}`,
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      }
    };

    console.log('🔄 Enviando para API do Mercado Pago...');
    console.log('📍 URL:', 'https://api.mercadopago.com/checkout/preferences');
    console.log('🔑 Access Token:', ACCESS_TOKEN.substring(0, 20) + '...');
    console.log('📦 Dados enviados:', JSON.stringify(preferenceData, null, 2));
    
    // Request para API oficial do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': `${Date.now()}-${Math.random()}`
      },
      body: JSON.stringify(preferenceData)
    });

    console.log('📊 Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro da API Mercado Pago:');
      console.error('📊 Status:', response.status);
      console.error('📋 Headers:', Object.fromEntries(response.headers.entries()));
      console.error('📄 Resposta:', errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
        console.error('🔍 Erro detalhado:', JSON.stringify(errorData, null, 2));
      } catch (e) {
        errorData = { message: errorText };
      }

      return res.status(response.status).json({
        error: 'Erro da API do Mercado Pago',
        details: errorData,
        status: response.status,
        raw_response: errorText
      });
    }

    const data = await response.json();
    console.log('✅ Preferência criada com sucesso!');
    console.log('🆔 ID:', data.id);
    console.log('🔗 Link de pagamento:', data.init_point);
    
    res.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
      client_id: data.client_id,
      collector_id: data.collector_id,
      external_reference: data.external_reference,
      date_created: data.date_created
    });
    
  } catch (error) {
    console.error('❌ Erro interno:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// Rota para verificar status do pagamento
app.get('/api/mercadopago/payment/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    console.log('🔍 Verificando pagamento:', paymentId);
    
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro ao consultar pagamento:', errorText);
      return res.status(response.status).json({ 
        error: 'Erro ao consultar pagamento',
        details: errorText 
      });
    }

    const data = await response.json();
    console.log('📊 Status do pagamento:', data.status);
    
    res.json({
      id: data.id,
      status: data.status,
      status_detail: data.status_detail,
      transaction_amount: data.transaction_amount,
      currency_id: data.currency_id,
      payment_method_id: data.payment_method_id,
      date_created: data.date_created,
      date_approved: data.date_approved,
      payer: data.payer,
      external_reference: data.external_reference
    });
    
  } catch (error) {
    console.error('❌ Erro ao verificar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro interno',
      details: error.message 
    });
  }
});

// Webhook do Mercado Pago
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook recebido:', req.body);
    
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('💳 Processando pagamento:', paymentId);
      
      // Buscar detalhes do pagamento
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        
        console.log('📊 Detalhes do pagamento:', {
          id: paymentData.id,
          status: paymentData.status,
          external_reference: paymentData.external_reference,
          transaction_amount: paymentData.transaction_amount
        });
        
        switch (paymentData.status) {
          case 'approved':
            console.log('✅ Pagamento aprovado!');
            // Aqui você enviaria o email com os downloads
            break;
          case 'pending':
            console.log('⏳ Pagamento pendente');
            break;
          case 'rejected':
            console.log('❌ Pagamento rejeitado');
            break;
        }
      }
    }
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).send('Error');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Mercado Pago rodando na porta ${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`🧪 Teste básico: http://localhost:${PORT}/api/test`);
  console.log(`🔌 Teste conexão: http://localhost:${PORT}/api/test-connection`);
  console.log(`🔑 Access Token: ${ACCESS_TOKEN ? 'CONFIGURADO' : 'NÃO CONFIGURADO'}`);
  console.log(`💳 Suporte: PIX + Cartão + Boleto + Mercado Pago`);
});

// Tratamento de erros
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
