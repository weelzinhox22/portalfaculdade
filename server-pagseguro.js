// Servidor com PagSeguro - Alternativa Brasileira
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Credenciais PagSeguro (você precisa criar conta)
const PAGSEGURO_EMAIL = 'seu@email.com';
const PAGSEGURO_TOKEN = 'seu_token_aqui';

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rota para criar checkout PagSeguro
app.post('/api/pagseguro/create-checkout', async (req, res) => {
  try {
    console.log('📦 Criando checkout PagSeguro:', req.body);
    
    const { items, customerData } = req.body;
    
    // Dados para PagSeguro
    const checkoutData = {
      email: PAGSEGURO_EMAIL,
      token: PAGSEGURO_TOKEN,
      currency: 'BRL',
      reference: `ORDER_${Date.now()}`,
      senderName: customerData.name,
      senderEmail: customerData.email,
      senderPhone: customerData.phone,
      senderCPF: customerData.document,
      redirectURL: `${req.headers.origin}/checkout/success`,
      notificationURL: `${req.headers.origin}/api/pagseguro/webhook`,
      items: items.map((item, index) => ({
        [`itemId${index + 1}`]: item.id,
        [`itemDescription${index + 1}`]: item.title,
        [`itemAmount${index + 1}`]: item.price.toFixed(2),
        [`itemQuantity${index + 1}`]: item.quantity
      })).reduce((acc, item) => ({ ...acc, ...item }), {})
    };
    
    console.log('✅ Checkout PagSeguro preparado');
    
    // Simular resposta do PagSeguro
    const mockCheckoutCode = `checkout_${Date.now()}`;
    const mockRedirectURL = `https://pagseguro.uol.com.br/v2/checkout/payment.html?code=${mockCheckoutCode}`;
    
    res.json({
      checkoutCode: mockCheckoutCode,
      redirectURL: mockRedirectURL
    });
    
  } catch (error) {
    console.error('❌ Erro PagSeguro:', error);
    res.status(500).json({ 
      error: 'Erro ao criar checkout',
      details: error.message 
    });
  }
});

// Webhook PagSeguro
app.post('/api/pagseguro/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook PagSeguro:', req.body);
    
    const notificationCode = req.body.notificationCode;
    
    if (notificationCode) {
      console.log('💳 Notificação PagSeguro:', notificationCode);
      // Consultar status da transação
    }
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Erro webhook PagSeguro:', error);
    res.status(500).send('Error');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor PagSeguro rodando na porta ${PORT}`);
  console.log(`🇧🇷 Gateway brasileiro ativo!`);
});
