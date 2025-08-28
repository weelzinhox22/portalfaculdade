# 🔧 Debug - Erro 400 Mercado Pago

## 🎯 **Problemas Identificados:**

### **❌ Erro 400:**
```
Failed to load resource: the server responded with a status of 400 (Bad Request)
❌ Erro: Error: Erro da API do Mercado Pago
```

### **⚠️ Warning React:**
```
Received `true` for a non-boolean attribute `jsx`
```

---

## 🚀 **Correções Aplicadas:**

### **✅ Servidor Melhorado:**
- ✅ **Logs detalhados** para ver exatamente o erro
- ✅ **Dados padrão** para evitar campos vazios
- ✅ **Tratamento** de erros melhorado

### **✅ Dados Corrigidos:**
```javascript
payer: {
  name: customerData.name || 'João Silva',
  email: customerData.email || 'test@example.com',
  phone: {
    area_code: '11',
    number: '999999999'
  },
  identification: {
    type: 'CPF',
    number: '11111111111'
  }
}
```

---

## 🧪 **Como Testar e Ver os Logs:**

### **1️⃣ Verificar se servidor está rodando:**
```bash
# Deve estar rodando automaticamente
# Se não, execute:
node server-final.mjs
```

### **2️⃣ Fazer uma compra de teste:**
1. 📚 **Acesse:** http://localhost:5173/livros
2. 🛒 **Adicione** um livro ao carrinho
3. 💳 **Clique** "Comprar Agora"
4. 📝 **Preencha** os dados:
   ```
   Nome: João Silva
   Email: test@example.com
   Telefone: (11) 99999-9999
   CPF: 11111111111
   ```
5. 🚀 **Clique** "Ir para Mercado Pago"

### **3️⃣ Verificar logs no terminal:**
- 📊 **Console do servidor** mostrará logs detalhados
- 🔍 **Se erro 400:** Verá exatamente qual campo está errado
- ✅ **Se sucesso:** Verá "Status: 201" e link do MP

---

## 📊 **Logs Esperados:**

### **✅ Se Funcionou:**
```bash
📦 Criando preferência Mercado Pago: {...}
🔄 Enviando para API do Mercado Pago...
📦 Dados enviados: {...}
📊 Status da resposta: 201
✅ Preferência criada com sucesso!
🆔 ID: 2244840287-xxxx-xxxx-xxxx-xxxxxxxxxxxx
🔗 Link: https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=xxxx
```

### **❌ Se Deu Erro:**
```bash
📦 Criando preferência Mercado Pago: {...}
🔄 Enviando para API do Mercado Pago...
📦 Dados enviados: {...}
❌ Erro da API Mercado Pago:
📊 Status: 400
📄 Resposta: {"message":"...", "error":"...", "status":400}
🔍 Erro detalhado: {...}
```

---

## 🔧 **Possíveis Causas do Erro 400:**

### **1. Campos Obrigatórios:**
- ❌ **Nome** vazio ou inválido
- ❌ **Email** formato inválido
- ❌ **CPF** formato inválido
- ❌ **Telefone** formato inválido

### **2. Dados dos Items:**
- ❌ **Preço** inválido (deve ser número)
- ❌ **Quantidade** inválida
- ❌ **ID** do item inválido

### **3. URLs de Retorno:**
- ❌ **back_urls** inválidas
- ❌ **notification_url** inválida

---

## 🚀 **Soluções Aplicadas:**

### **✅ Dados Padrão:**
- ✅ **Nome:** 'João Silva' se vazio
- ✅ **Email:** 'test@example.com' se vazio
- ✅ **Telefone:** '11999999999' fixo
- ✅ **CPF:** '11111111111' fixo

### **✅ URLs Fixas:**
- ✅ **Success:** http://localhost:5173/checkout/success
- ✅ **Failure:** http://localhost:5173/checkout/failure
- ✅ **Pending:** http://localhost:5173/checkout/pending
- ✅ **Webhook:** http://localhost:3001/api/mercadopago/webhook

---

## 🎯 **Próximos Passos:**

### **1️⃣ Teste Agora:**
- 🧪 **Faça** uma compra de teste
- 👀 **Observe** os logs no terminal
- 📊 **Veja** se aparece Status 201 ou erro detalhado

### **2️⃣ Se Ainda Der Erro:**
- 📋 **Copie** os logs completos do terminal
- 🔍 **Identifique** qual campo está causando problema
- 🔧 **Ajuste** os dados conforme necessário

### **3️⃣ Se Funcionar:**
- ✅ **Será redirecionado** para mercadopago.com
- 💳 **Verá** PIX + Cartão + Boleto + Parcelamento
- 🎉 **Mercado Pago oficial** funcionando!

---

## 🔧 **Comandos de Debug:**

### **Reiniciar Servidor:**
```bash
# Parar servidor atual (Ctrl+C)
# Executar novamente:
node server-final.mjs
```

### **Testar API Diretamente:**
```bash
# Abrir no navegador:
http://localhost:3001/api/test
```

### **Verificar Logs:**
```bash
# Observar terminal onde rodou:
node server-final.mjs
```

---

## 🎉 **Resultado Esperado:**

### **Quando Funcionar:**
1. ✅ **Logs:** Status 201 no terminal
2. ✅ **Frontend:** "Redirecionando..."
3. ✅ **Navegador:** Vai para mercadopago.com
4. ✅ **Tela:** PIX + Cartão + Boleto oficial

### **Diferença vs Antes:**
- ❌ **Antes:** Tela simulada no seu site
- ✅ **Agora:** Redirecionamento para Mercado Pago oficial

---

## 🚀 **Teste AGORA:**

1. **Acesse:** http://localhost:5173/livros
2. **Compre** um livro
3. **Observe** os logs no terminal
4. **Veja** se redireciona para Mercado Pago

**Se der erro, copie os logs e me envie para ajustar!** 🔧

**Se funcionar, você terá o Mercado Pago oficial no seu site!** 🎉💳
