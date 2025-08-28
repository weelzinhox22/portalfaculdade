// Servidor Mercado Pago OFICIAL - API Real
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Para fazer requests HTTP

const app = express();
const PORT = 3001;

// Suas credenciais REAIS do Mercado Pago
const ACCESS_TOKEN = 'APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287';
const BASE_URL = 'https://api.mercadopago.com';

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rota para criar preferência (PIX + Cartão + Todas as opções)
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    console.log('📦 Criando preferência Mercado Pago:', req.body);
    
    const { items, customerData } = req.body;
    
    // Dados da preferência conforme documentação oficial
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
        },
        address: {
          street_name: 'Rua Exemplo',
          street_number: 123,
          zip_code: '01234567'
        }
      },
      back_urls: {
        success: `${req.headers.origin}/checkout/success`,
        failure: `${req.headers.origin}/checkout/failure`,
        pending: `${req.headers.origin}/checkout/pending`
      },
      auto_return: 'approved',
      notification_url: `${req.headers.origin}/api/mercadopago/webhook`,
      statement_descriptor: 'FISIOESTUDOS',
      external_reference: `ORDER_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1
      },
      shipments: {
        mode: 'not_specified'
      },
      additional_info: 'Livros digitais de fisioterapia - FisioEstudos'
    };

    console.log('🔄 Enviando para API do Mercado Pago...');
    console.log('📍 URL:', `${BASE_URL}/checkout/preferences`);
    
    // Request para API oficial do Mercado Pago
    const response = await fetch(`${BASE_URL}/checkout/preferences`, {
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
      console.error('❌ Erro da API:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
      }
      
      return res.status(response.status).json({ 
        error: 'Erro da API do Mercado Pago',
        details: errorData,
        status: response.status
      });
    }

    const data = await response.json();
    console.log('✅ Preferência criada com sucesso!');
    console.log('🆔 ID:', data.id);
    console.log('🔗 Link de pagamento:', data.init_point);
    console.log('🧪 Link sandbox:', data.sandbox_init_point);
    
    res.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
      client_id: data.client_id,
      collector_id: data.collector_id,
      operation_type: data.operation_type,
      items: data.items,
      payer: data.payer,
      back_urls: data.back_urls,
      auto_return: data.auto_return,
      payment_methods: data.payment_methods,
      external_reference: data.external_reference,
      expires: data.expires,
      expiration_date_from: data.expiration_date_from,
      expiration_date_to: data.expiration_date_to,
      date_created: data.date_created
    });
    
  } catch (error) {
    console.error('❌ Erro interno:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message,
      stack: error.stack
    });
  }
});

// Rota para verificar status do pagamento (conforme sua documentação)
app.get('/api/mercadopago/payment/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    console.log('🔍 Verificando pagamento:', paymentId);
    
    // Request conforme sua documentação
    const response = await fetch(`${BASE_URL}/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📊 Status da consulta:', response.status);
    
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
    console.log('💰 Valor:', data.transaction_amount);
    console.log('💳 Método:', data.payment_method_id);
    
    // Resposta conforme exemplo que você mostrou
    res.json({
      id: data.id,
      date_created: data.date_created,
      date_approved: data.date_approved,
      date_last_updated: data.date_last_updated,
      money_release_date: data.money_release_date,
      payment_method: data.payment_method,
      payment_method_id: data.payment_method_id,
      payment_type_id: data.payment_type_id,
      status: data.status,
      status_detail: data.status_detail,
      currency_id: data.currency_id,
      description: data.description,
      collector_id: data.collector_id,
      payer: data.payer,
      metadata: data.metadata,
      additional_info: data.additional_info,
      external_reference: data.external_reference,
      transaction_amount: data.transaction_amount,
      transaction_amount_refunded: data.transaction_amount_refunded,
      coupon_amount: data.coupon_amount,
      transaction_details: data.transaction_details,
      installments: data.installments,
      card: data.card
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
    console.log('📋 Headers:', req.headers);
    
    const { type, data, action, api_version, date_created, id, live_mode, user_id } = req.body;
    
    console.log('📊 Tipo de notificação:', type);
    console.log('🆔 ID da notificação:', id);
    console.log('🔴 Modo live:', live_mode);
    
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('💳 ID do pagamento:', paymentId);
      
      // Consultar detalhes do pagamento
      const paymentResponse = await fetch(`${BASE_URL}/v1/payments/${paymentId}`, {
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
          status_detail: paymentData.status_detail,
          external_reference: paymentData.external_reference,
          transaction_amount: paymentData.transaction_amount,
          payment_method_id: paymentData.payment_method_id,
          payer_email: paymentData.payer?.email
        });
        
        // Processar baseado no status
        switch (paymentData.status) {
          case 'approved':
            console.log('✅ Pagamento aprovado!');
            console.log('💰 Valor:', paymentData.transaction_amount);
            console.log('📧 Email:', paymentData.payer?.email);
            console.log('🔗 Referência:', paymentData.external_reference);
            // Aqui você enviaria o email com os downloads
            break;
          case 'pending':
            console.log('⏳ Pagamento pendente');
            break;
          case 'rejected':
            console.log('❌ Pagamento rejeitado');
            console.log('❓ Motivo:', paymentData.status_detail);
            break;
          case 'cancelled':
            console.log('🚫 Pagamento cancelado');
            break;
          case 'refunded':
            console.log('💸 Pagamento estornado');
            break;
          case 'charged_back':
            console.log('🔄 Chargeback');
            break;
        }
      }
    }
    
    // Responder OK para o Mercado Pago
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).send('Error');
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Servidor Mercado Pago OFICIAL funcionando!',
    timestamp: new Date().toISOString(),
    base_url: BASE_URL,
    access_token_configured: !!ACCESS_TOKEN,
    access_token_preview: ACCESS_TOKEN ? `${ACCESS_TOKEN.substring(0, 20)}...` : 'NÃO CONFIGURADO'
  });
});

// Rota para testar conectividade com Mercado Pago
app.get('/api/test-connection', async (req, res) => {
  try {
    console.log('🧪 Testando conexão com Mercado Pago...');
    
    const response = await fetch(`${BASE_URL}/users/me`, {
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Mercado Pago OFICIAL rodando na porta ${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`🧪 Teste básico: http://localhost:${PORT}/api/test`);
  console.log(`🔌 Teste conexão: http://localhost:${PORT}/api/test-connection`);
  console.log(`📍 Base URL: ${BASE_URL}`);
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
