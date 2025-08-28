// Servidor com Stripe - Alternativa ao Mercado Pago
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Chaves do Stripe (teste)
const STRIPE_SECRET_KEY = 'sk_test_51234567890'; // Você precisa criar conta no Stripe
const STRIPE_PUBLIC_KEY = 'pk_test_51234567890'; // Chave pública

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rota para criar sessão de checkout do Stripe
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    console.log('📦 Criando sessão Stripe:', req.body);
    
    const { items, customerData } = req.body;
    
    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simular criação de sessão (você implementaria com Stripe real)
    const sessionData = {
      id: `cs_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/cs_${Date.now()}`,
      payment_status: 'unpaid',
      amount_total: Math.round(total * 100), // Stripe usa centavos
      currency: 'brl',
      customer_email: customerData.email,
      line_items: items.map(item => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.title,
            description: `${item.author} - ${item.pages} páginas`
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      }))
    };
    
    console.log('✅ Sessão Stripe criada:', sessionData.id);
    
    res.json({
      sessionId: sessionData.id,
      url: sessionData.url
    });
    
  } catch (error) {
    console.error('❌ Erro Stripe:', error);
    res.status(500).json({ 
      error: 'Erro ao criar sessão',
      details: error.message 
    });
  }
});

// Webhook do Stripe
app.post('/api/stripe/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook Stripe:', req.body);
    
    const { type, data } = req.body;
    
    if (type === 'checkout.session.completed') {
      console.log('✅ Pagamento aprovado via Stripe');
      // Processar pagamento aprovado
    }
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Erro webhook Stripe:', error);
    res.status(500).send('Error');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Stripe rodando na porta ${PORT}`);
  console.log(`💳 Alternativa ao Mercado Pago ativa!`);
});
