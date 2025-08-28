// Servidor Mercado Pago Simples - Teste
const express = require('express');
const cors = require('cors');

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
    message: 'Servidor funcionando!',
    timestamp: new Date().toISOString(),
    access_token_configured: !!ACCESS_TOKEN
  });
});

// Rota para criar preferência
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    console.log('📦 Criando preferência:', req.body);
    
    const { items, customerData } = req.body;
    
    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Dados da preferência
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
        name: customerData.name,
        email: customerData.email,
        phone: {
          area_code: '11',
          number: '999999999'
        },
        identification: {
          type: 'CPF',
          number: '11111111111'
        }
      },
      back_urls: {
        success: `${req.headers.origin}/checkout/success`,
        failure: `${req.headers.origin}/checkout/failure`,
        pending: `${req.headers.origin}/checkout/pending`
      },
      auto_return: 'approved',
      external_reference: `ORDER_${Date.now()}`
    };

    console.log('🔄 Fazendo request para Mercado Pago...');
    
    // Usar fetch nativo do Node.js (v18+) ou simular
    let response;
    try {
      // Tentar usar fetch nativo
      response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferenceData)
      });
    } catch (fetchError) {
      console.log('⚠️ Fetch não disponível, simulando resposta...');
      
      // Simular resposta para teste
      const mockPreferenceId = `PREF_${Date.now()}`;
      const mockInitPoint = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}`;
      
      return res.json({
        id: mockPreferenceId,
        init_point: mockInitPoint,
        sandbox_init_point: mockInitPoint,
        message: 'Simulação - Para usar real, instale node-fetch'
      });
    }

    if (response && response.ok) {
      const data = await response.json();
      console.log('✅ Preferência criada:', data.id);
      
      res.json({
        id: data.id,
        init_point: data.init_point,
        sandbox_init_point: data.sandbox_init_point
      });
    } else {
      const errorText = await response.text();
      console.error('❌ Erro da API:', errorText);
      
      // Retornar simulação em caso de erro
      const mockPreferenceId = `PREF_${Date.now()}`;
      const mockInitPoint = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}`;
      
      res.json({
        id: mockPreferenceId,
        init_point: mockInitPoint,
        sandbox_init_point: mockInitPoint,
        message: 'Simulação - Erro na API real'
      });
    }
    
  } catch (error) {
    console.error('❌ Erro interno:', error);
    res.status(500).json({ 
      error: 'Erro interno',
      details: error.message 
    });
  }
});

// Webhook
app.post('/api/mercadopago/webhook', (req, res) => {
  console.log('📨 Webhook recebido:', req.body);
  res.status(200).send('OK');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Teste: http://localhost:${PORT}/api/test`);
  console.log(`💳 Mercado Pago configurado!`);
});

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('❌ Erro:', error.message);
});
