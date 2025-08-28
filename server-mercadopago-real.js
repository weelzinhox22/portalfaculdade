// Servidor Mercado Pago REAL - PIX Funcionando
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');

const app = express();
const PORT = 3001;

// Suas credenciais REAIS do Mercado Pago
const ACCESS_TOKEN = 'APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287';

// Configurar cliente do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: ACCESS_TOKEN,
  options: { timeout: 5000 }
});

const preference = new Preference(client);
const payment = new Payment(client);

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rota para criar preferência (PIX + Cartão)
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    console.log('📦 Criando preferência Mercado Pago:', req.body);
    
    const { items, customerData } = req.body;
    
    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Dados da preferência
    const preferenceData = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.title,
        description: `${item.author} - ${item.pages} páginas`,
        quantity: item.quantity,
        unit_price: parseFloat(item.price),
        currency_id: 'BRL'
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
        installments: 12
      }
    };

    console.log('🔄 Enviando para Mercado Pago...');
    
    // Criar preferência
    const result = await preference.create({ body: preferenceData });
    
    console.log('✅ Preferência criada:', result.id);
    console.log('🔗 Link de pagamento:', result.init_point);
    
    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar preferência:', error);
    res.status(500).json({ 
      error: 'Erro ao criar preferência',
      details: error.message,
      cause: error.cause || 'Erro desconhecido'
    });
  }
});

// Rota para criar pagamento PIX direto
app.post('/api/mercadopago/create-pix', async (req, res) => {
  try {
    console.log('📱 Criando PIX direto:', req.body);
    
    const { items, customerData } = req.body;
    
    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Dados do pagamento PIX
    const paymentData = {
      transaction_amount: parseFloat(total.toFixed(2)),
      description: `FisioEstudos - ${items.length} livro(s)`,
      payment_method_id: 'pix',
      payer: {
        email: customerData.email,
        first_name: customerData.name.split(' ')[0],
        last_name: customerData.name.split(' ').slice(1).join(' ') || 'Silva',
        identification: {
          type: 'CPF',
          number: customerData.document.replace(/\D/g, '') || '11111111111'
        }
      },
      external_reference: `ORDER_${Date.now()}`,
      notification_url: `${req.headers.origin}/api/mercadopago/webhook`
    };

    console.log('🔄 Criando pagamento PIX...');
    
    // Criar pagamento PIX
    const result = await payment.create({ body: paymentData });
    
    console.log('✅ PIX criado:', result.id);
    console.log('📱 QR Code:', result.point_of_interaction?.transaction_data?.qr_code);
    
    res.json({
      id: result.id,
      status: result.status,
      qr_code: result.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
      ticket_url: result.point_of_interaction?.transaction_data?.ticket_url,
      transaction_amount: result.transaction_amount,
      date_of_expiration: result.date_of_expiration
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar PIX:', error);
    res.status(500).json({ 
      error: 'Erro ao criar PIX',
      details: error.message,
      cause: error.cause || 'Erro desconhecido'
    });
  }
});

// Rota para verificar status do pagamento
app.get('/api/mercadopago/payment/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    console.log('🔍 Verificando pagamento:', paymentId);
    
    const result = await payment.get({ id: paymentId });
    
    console.log('📊 Status do pagamento:', result.status);
    
    res.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      transaction_amount: result.transaction_amount,
      currency_id: result.currency_id,
      date_created: result.date_created,
      date_approved: result.date_approved,
      payer: result.payer,
      payment_method_id: result.payment_method_id
    });
    
  } catch (error) {
    console.error('❌ Erro ao verificar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro ao verificar pagamento',
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
      const paymentDetails = await payment.get({ id: paymentId });
      
      console.log('📊 Detalhes do pagamento:', {
        id: paymentDetails.id,
        status: paymentDetails.status,
        external_reference: paymentDetails.external_reference,
        transaction_amount: paymentDetails.transaction_amount
      });
      
      // Processar baseado no status
      switch (paymentDetails.status) {
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
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).send('Error');
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Servidor Mercado Pago funcionando!',
    timestamp: new Date().toISOString(),
    access_token_configured: !!ACCESS_TOKEN
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Mercado Pago rodando na porta ${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`🧪 Teste: http://localhost:${PORT}/api/test`);
  console.log(`💳 Access Token configurado: ${ACCESS_TOKEN ? 'SIM' : 'NÃO'}`);
  console.log(`📱 PIX e Cartão habilitados!`);
});

// Tratamento de erros
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
