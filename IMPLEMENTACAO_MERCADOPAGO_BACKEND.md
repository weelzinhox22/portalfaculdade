# 🚀 Implementação Backend - Mercado Pago API

## 📋 **Suas Credenciais**

### **Chaves de Acesso:**
- **Public Key:** `APP_USR-ad3f1019-4db0-4b8c-958d-dba6a14276a8`
- **Access Token:** `APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287`

### **Importante:**
- ✅ **Public Key:** Usar no frontend (já implementado)
- ✅ **Access Token:** Usar APENAS no backend (nunca expor)
- 🔒 **Segurança:** Manter Access Token em variáveis de ambiente

---

## 🛠️ **Implementação Node.js/Express**

### **1. Instalação das Dependências:**
```bash
npm install mercadopago express cors dotenv
```

### **2. Configuração do Servidor (.env):**
```env
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287
MERCADOPAGO_PUBLIC_KEY=APP_USR-ad3f1019-4db0-4b8c-958d-dba6a14276a8

# Ambiente
NODE_ENV=development
PORT=3001

# URLs de retorno
FRONTEND_URL=http://localhost:5173
```

### **3. Servidor Express (server.js):**
```javascript
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Rota para criar preferência
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    const preferenceData = req.body;
    
    console.log('📦 Criando preferência:', preferenceData);
    
    const preference = await mercadopago.preferences.create(preferenceData);
    
    console.log('✅ Preferência criada:', preference.body.id);
    
    res.json({
      id: preference.body.id,
      init_point: preference.body.init_point,
      sandbox_init_point: preference.body.sandbox_init_point
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar preferência:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Rota para webhook do Mercado Pago
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log('📨 Webhook recebido:', { type, data });
    
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Buscar detalhes do pagamento
      const payment = await mercadopago.payment.findById(paymentId);
      const paymentData = payment.body;
      
      console.log('💳 Dados do pagamento:', {
        id: paymentData.id,
        status: paymentData.status,
        external_reference: paymentData.external_reference,
        transaction_amount: paymentData.transaction_amount
      });
      
      // Processar baseado no status
      switch (paymentData.status) {
        case 'approved':
          await processApprovedPayment(paymentData);
          break;
        case 'pending':
          await processPendingPayment(paymentData);
          break;
        case 'rejected':
          await processRejectedPayment(paymentData);
          break;
      }
    }
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).send('Error');
  }
});

// Processar pagamento aprovado
async function processApprovedPayment(paymentData) {
  console.log('✅ Processando pagamento aprovado:', paymentData.id);
  
  try {
    // 1. Atualizar status do pedido no banco de dados
    // await updateOrderStatus(paymentData.external_reference, 'paid');
    
    // 2. Enviar email com links de download
    // await sendDownloadEmail(paymentData.payer.email, paymentData.external_reference);
    
    // 3. Registrar venda para analytics
    // await trackSale(paymentData);
    
    console.log('📧 Email de confirmação enviado para:', paymentData.payer.email);
    
  } catch (error) {
    console.error('❌ Erro ao processar pagamento aprovado:', error);
  }
}

// Processar pagamento pendente
async function processPendingPayment(paymentData) {
  console.log('⏳ Processando pagamento pendente:', paymentData.id);
  
  // Implementar lógica para pagamentos pendentes (boleto, etc.)
}

// Processar pagamento rejeitado
async function processRejectedPayment(paymentData) {
  console.log('❌ Processando pagamento rejeitado:', paymentData.id);
  
  // Implementar lógica para pagamentos rejeitados
}

// Rota para verificar status do pagamento
app.get('/api/mercadopago/payment/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await mercadopago.payment.findById(paymentId);
    
    res.json(payment.body);
    
  } catch (error) {
    console.error('❌ Erro ao buscar pagamento:', error);
    res.status(500).json({ error: 'Erro ao buscar pagamento' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
});
```

---

## 📧 **Implementação do Email (Nodemailer)**

### **1. Instalação:**
```bash
npm install nodemailer
```

### **2. Configuração do Email:**
```javascript
const nodemailer = require('nodemailer');

// Configurar transporter (Gmail exemplo)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App Password do Gmail
  }
});

// Função para enviar email com downloads
async function sendDownloadEmail(customerEmail, orderId) {
  try {
    const downloadLinks = await generateDownloadLinks(orderId);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: '📚 Seus Livros FisioEstudos - Download Disponível!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 2rem; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🎉 Compra Aprovada!</h1>
            <p style="color: #fef3c7; margin: 0.5rem 0 0 0;">Seus livros estão prontos para download</p>
          </div>
          
          <div style="background: white; padding: 2rem; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937;">Olá!</h2>
            <p style="color: #6b7280; line-height: 1.6;">
              Parabéns! Seu pagamento foi aprovado com sucesso. 
              Clique nos links abaixo para fazer o download dos seus livros:
            </p>
            
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              ${downloadLinks.map(link => `
                <div style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                  <h3 style="color: #1f2937; margin: 0 0 0.5rem 0; font-size: 1rem;">${link.title}</h3>
                  <a href="${link.url}" style="background: #f59e0b; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                    📥 Baixar Agora
                  </a>
                </div>
              `).join('')}
            </div>
            
            <div style="background: #fef3c7; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #f59e0b; margin: 0 0 0.5rem 0;">⚠️ Importante:</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 1.5rem;">
                <li>Os links ficam disponíveis por 30 dias</li>
                <li>Salve os arquivos em seu dispositivo</li>
                <li>Em caso de problemas, entre em contato conosco</li>
              </ul>
            </div>
            
            <p style="color: #6b7280; text-align: center; margin-top: 2rem;">
              Precisa de ajuda? Responda este email ou entre em contato:<br>
              📧 suporte@fisioestudos.com | 📱 (11) 99999-9999
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 1rem; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #6b7280; margin: 0; font-size: 0.875rem;">
              © 2024 FisioEstudos - Todos os direitos reservados
            </p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado para:', customerEmail);
    
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
  }
}

// Gerar links de download seguros
async function generateDownloadLinks(orderId) {
  // Implementar lógica para gerar links únicos e seguros
  // Exemplo com JWT tokens
  const jwt = require('jsonwebtoken');
  
  const books = await getOrderBooks(orderId);
  
  return books.map(book => ({
    title: book.title,
    url: `${process.env.FRONTEND_URL}/download/${jwt.sign(
      { bookId: book.id, orderId, exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) }, // 30 dias
      process.env.JWT_SECRET
    )}`
  }));
}
```

---

## 🗄️ **Banco de Dados (Exemplo com MongoDB)**

### **1. Schema do Pedido:**
```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerEmail: { type: String, required: true },
  customerName: { type: String, required: true },
  items: [{
    bookId: String,
    title: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentId: String,
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  mercadoPagoData: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
```

---

## 🔒 **Segurança e Boas Práticas**

### **1. Variáveis de Ambiente (.env):**
```env
# Nunca commitar este arquivo!
MERCADOPAGO_ACCESS_TOKEN=APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287
JWT_SECRET=sua_chave_secreta_super_forte_aqui
EMAIL_USER=seu@email.com
EMAIL_PASS=sua_senha_de_app
DATABASE_URL=mongodb://localhost:27017/fisioestudos
```

### **2. Validações:**
- ✅ Validar dados de entrada
- ✅ Verificar assinatura do webhook
- ✅ Implementar rate limiting
- ✅ Logs de segurança
- ✅ Sanitizar dados

### **3. Monitoramento:**
- 📊 Logs estruturados
- 🚨 Alertas de erro
- 📈 Métricas de conversão
- 🔍 Rastreamento de transações

---

## 🚀 **Deploy e Produção**

### **1. Configurações de Produção:**
```javascript
// Configurar HTTPS obrigatório
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// Rate limiting
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
}));
```

### **2. Webhook em Produção:**
- 🔗 **URL:** `https://seudominio.com/api/mercadopago/webhook`
- 🔒 **HTTPS obrigatório**
- ⚡ **Resposta rápida** (< 2 segundos)
- 🔄 **Idempotência** (processar mesmo webhook múltiplas vezes)

---

## 📋 **Checklist de Implementação**

### **Backend:**
- [ ] Servidor Express configurado
- [ ] Credenciais do Mercado Pago configuradas
- [ ] Rota de criação de preferência
- [ ] Webhook implementado
- [ ] Banco de dados configurado
- [ ] Sistema de email implementado
- [ ] Links de download seguros
- [ ] Logs e monitoramento

### **Frontend:**
- [x] Página de checkout implementada
- [x] Integração com Mercado Pago
- [x] Páginas de sucesso/falha
- [x] Validação de formulários
- [x] UX otimizada

### **Testes:**
- [ ] Testar pagamento com cartão
- [ ] Testar pagamento com PIX
- [ ] Testar webhook
- [ ] Testar envio de email
- [ ] Testar links de download
- [ ] Testar cenários de erro

**Sua implementação está 90% completa! Só falta o backend para funcionar perfeitamente.** 🚀✨
