// Teste direto da API do Mercado Pago
const ACCESS_TOKEN = 'APP_USR-7231868781185518-082719-7396aa493a2ebd6c50ff094845179cba-2244840287';

// Dados mínimos para teste
const testPreference = {
  items: [
    {
      id: "1",
      title: "Teste - Livro de Fisioterapia",
      description: "Livro digital de teste",
      quantity: 1,
      unit_price: 15.00,
      currency_id: "BRL"
    }
  ],
  payer: {
    name: "João Silva",
    email: "test@example.com",
    phone: {
      area_code: "11",
      number: "999999999"
    },
    identification: {
      type: "CPF",
      number: "11111111111"
    }
  },
  back_urls: {
    success: "http://localhost:5173/checkout/success",
    failure: "http://localhost:5173/checkout/failure",
    pending: "http://localhost:5173/checkout/pending"
  },
  external_reference: `TEST_${Date.now()}`,
  payment_methods: {
    excluded_payment_methods: [],
    excluded_payment_types: [],
    installments: 12
  }
};

console.log('🧪 Testando API do Mercado Pago...');
console.log('📦 Dados de teste:', JSON.stringify(testPreference, null, 2));

try {
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testPreference)
  });

  console.log('📊 Status da resposta:', response.status);
  console.log('📋 Headers da resposta:', Object.fromEntries(response.headers.entries()));

  if (response.ok) {
    const data = await response.json();
    console.log('✅ Sucesso! Preferência criada:');
    console.log('🆔 ID:', data.id);
    console.log('🔗 Link:', data.init_point);
  } else {
    const errorText = await response.text();
    console.error('❌ Erro da API:');
    console.error('📄 Resposta:', errorText);
    
    try {
      const errorData = JSON.parse(errorText);
      console.error('🔍 Erro detalhado:', JSON.stringify(errorData, null, 2));
    } catch (e) {
      console.error('❌ Não foi possível parsear o erro como JSON');
    }
  }
} catch (error) {
  console.error('❌ Erro de rede:', error.message);
}
