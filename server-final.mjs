// Servidor Mercado Pago FINAL - Funcionando
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
    access_token_configured: !!ACCESS_TOKEN
  });
});

// Rota para criar preferência
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    console.log('📦 Criando preferência Mercado Pago:', req.body);
    
    const { items, customerData } = req.body;
    
    // Dados da preferência (formato correto)
    const preferenceData = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.title,
        description: `${item.author} - Livro digital`,
        quantity: item.quantity,
        unit_price: parseFloat(item.price),
        currency_id: 'BRL'
      })),
      payer: {
        name: customerData.name || 'João Silva',
        email: customerData.email || 'test@example.com',
        phone: {
          area_code: customerData.phone ? customerData.phone.substring(1, 3) || '11' : '11',
          number: customerData.phone ? customerData.phone.replace(/\D/g, '').substring(2) || '999999999' : '999999999'
        }
      },
      back_urls: {
        success: 'http://localhost:5173/checkout/success',
        failure: 'http://localhost:5173/checkout/failure',
        pending: 'http://localhost:5173/checkout/pending'
      },
      notification_url: 'http://localhost:3001/api/mercadopago/webhook',
      external_reference: `ORDER_${Date.now()}`,
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      }
    };

    console.log('🔄 Enviando para API do Mercado Pago...');
    console.log('📦 Dados enviados:', JSON.stringify(preferenceData, null, 2));
    
    // Request para API oficial do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceData)
    });

    console.log('📊 Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro da API Mercado Pago:');
      console.error('📊 Status:', response.status);
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
    console.log('🔗 Link:', data.init_point);
    
    res.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    });
    
  } catch (error) {
    console.error('❌ Erro interno:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// Webhook do Mercado Pago
app.post('/api/mercadopago/webhook', (req, res) => {
  console.log('📨 Webhook recebido:', req.body);
  res.status(200).send('OK');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Mercado Pago rodando na porta ${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`🧪 Teste: http://localhost:${PORT}/api/test`);
  console.log(`💳 Mercado Pago configurado e funcionando!`);
});

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('❌ Erro:', error.message);
});
