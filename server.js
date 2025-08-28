// Servidor simples para integração com Mercado Pago
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

// Rota para criar preferência do Mercado Pago
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    console.log('📦 Recebendo dados para criar preferência:', req.body);
    
    const preferenceData = req.body;
    
    // Fazer request para API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erro do Mercado Pago:', errorData);
      return res.status(400).json({ 
        error: 'Erro ao criar preferência',
        details: errorData 
      });
    }

    const data = await response.json();
    console.log('✅ Preferência criada com sucesso:', data.id);
    
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

// Webhook para receber notificações do Mercado Pago
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook recebido:', req.body);
    
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('💳 Pagamento ID:', paymentId);
      
      // Aqui você processaria o pagamento
      // Por exemplo: atualizar banco de dados, enviar email, etc.
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
    message: 'Servidor funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`🧪 Teste: http://localhost:${PORT}/api/test`);
  console.log(`💳 Mercado Pago configurado com Access Token`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
