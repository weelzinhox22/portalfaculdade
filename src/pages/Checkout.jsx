import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  CreditCard,
  Lock,
  CheckCircle,
  Download,
  Mail,
  User,
  Phone,
  MapPin,
  ArrowLeft,
  Shield,
  Star,
  Clock,
  Trash2,
  Plus,
  Minus,
  AlertCircle,
  Receipt
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import useMobile from '../hooks/useMobile';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const isMobile = useMobile();

  // Estados do checkout
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Dados, 2: Pagamento, 3: Confirmação
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [preferenceId, setPreferenceId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Dados do cliente
  const [customerData, setCustomerData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    document: '',
    zipCode: '',
    address: '',
    city: '',
    state: ''
  });

  // Erros de validação
  const [errors, setErrors] = useState({});

  // Inicializar itens do carrinho
  useEffect(() => {
    if (location.state?.items) {
      setItems(location.state.items);
    } else {
      // Se não há itens, redirecionar
      navigate('/livros');
    }
  }, [location.state, navigate]);

  // Redirecionar se não autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', {
        state: {
          returnTo: '/checkout',
          message: 'Faça login para finalizar sua compra'
        }
      });
    }
  }, [isAuthenticated, navigate]);

  // Funções de manipulação do carrinho
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Cálculos
  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscount = () => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = getSubtotal();

    // Desconto progressivo: 5% para 3+ itens, 10% para 5+ itens
    if (itemCount >= 5) return subtotal * 0.10;
    if (itemCount >= 3) return subtotal * 0.05;
    return 0;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  // Validação dos dados
  const validateCustomerData = () => {
    const newErrors = {};

    if (!customerData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!customerData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!customerData.document.trim()) {
      newErrors.document = 'CPF é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Criar preferência no Mercado Pago
  const createMercadoPagoPreference = async () => {
    try {
      setLoading(true);

      const preferenceData = {
        items: items.map(item => ({
          id: item.id.toString(),
          title: item.title,
          description: `${item.author} - ${item.pages} páginas`,
          quantity: item.quantity,
          unit_price: item.price,
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
          success: `${window.location.origin}/checkout/success`,
          failure: `${window.location.origin}/checkout/failure`,
          pending: `${window.location.origin}/checkout/pending`
        },
        auto_return: 'approved',
        notification_url: `${window.location.origin}/api/mercadopago/webhook`,
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

      // Aplicar desconto se houver
      const discount = getDiscount();
      if (discount > 0) {
        const itemCount = items.reduce((total, item) => total + item.quantity, 0);
        preferenceData.discounts = [{
          name: `Desconto ${itemCount >= 5 ? '10%' : '5%'} - Compra múltipla`,
          value: discount
        }];
      }

      console.log('🔄 Criando preferência OFICIAL do Mercado Pago...');
      console.log('📦 Dados enviados:', { items, customerData });

      // Request para API OFICIAL do Mercado Pago
      const response = await fetch('http://localhost:3001/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerData: customerData
        })
      });

      console.log('📊 Status da resposta:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erro da API:', errorData);
        throw new Error(errorData.error || `Erro HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Preferência criada com sucesso!');
      console.log('🆔 ID da preferência:', data.id);
      console.log('🔗 Link de pagamento:', data.init_point);
      console.log('🧪 Link sandbox:', data.sandbox_init_point);
      console.log('💳 Métodos disponíveis:', data.payment_methods);

      setPreferenceId(data.id);

      // Salvar dados para possível retorno
      localStorage.setItem('checkout_data', JSON.stringify({
        preferenceId: data.id,
        items: items,
        customerData: customerData,
        total: getTotal()
      }));

      // Redirecionar para o checkout OFICIAL do Mercado Pago
      console.log('🚀 Redirecionando para Mercado Pago OFICIAL...');
      console.log('📍 URL de destino:', data.init_point);

      // Usar init_point (produção) ou sandbox_init_point (teste)
      const redirectUrl = data.init_point || data.sandbox_init_point;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error('URL de redirecionamento não encontrada na resposta');
      }

    } catch (error) {
      console.error('❌ Erro ao criar preferência:', error);

      // Mostrar erro mais específico
      if (error.message.includes('fetch')) {
        alert('❌ Erro: Servidor backend não está rodando!\n\nPara testar o Mercado Pago:\n1. Abra um terminal\n2. Execute: npm install express cors\n3. Execute: node server.js\n4. Tente novamente');
      } else {
        alert(`❌ Erro ao processar pagamento: ${error.message}\n\nTente novamente ou entre em contato com o suporte.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Processar pagamento
  const handlePayment = async () => {
    if (!validateCustomerData()) {
      return;
    }

    await createMercadoPagoPreference();
  };

  // Continuar para próximo step
  const nextStep = () => {
    if (step === 1 && validateCustomerData()) {
      setStep(2);
    }
  };

  // Voltar step anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Se não há itens, mostrar carrinho vazio
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '2rem',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
          }}>
            <ShoppingCart size={80} color="#f59e0b" style={{ marginBottom: '2rem' }} />
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Carrinho Vazio
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Adicione alguns livros ao seu carrinho para continuar com a compra.
            </p>
            <button
              onClick={() => navigate('/livros')}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Ver Livros
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: step >= stepNumber
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : '#e5e7eb',
                    color: step >= stepNumber ? 'white' : '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div style={{
                      width: '60px',
                      height: '2px',
                      background: step > stepNumber ? '#f59e0b' : '#e5e7eb'
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
            gap: '2rem'
          }}>
            {/* Conteúdo Principal */}
            <div>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    background: 'white',
                    borderRadius: '2rem',
                    padding: '2rem'
                  }}
                >
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <User size={24} />
                    Dados Pessoais
                  </h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={customerData.name}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Seu nome completo"
                      />
                      {errors.name && (
                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={customerData.email}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: errors.phone ? '2px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="(11) 99999-9999"
                      />
                      {errors.phone && (
                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        CPF *
                      </label>
                      <input
                        type="text"
                        value={customerData.document}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, document: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: errors.document ? '2px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="000.000.000-00"
                      />
                      {errors.document && (
                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          {errors.document}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '2rem'
                  }}>
                    <button
                      onClick={nextStep}
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Continuar
                      <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    background: 'white',
                    borderRadius: '2rem',
                    padding: '2rem'
                  }}
                >
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <CreditCard size={24} />
                    Pagamento
                  </h2>

                  <div style={{
                    background: '#f8fafc',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}>
                      Resumo dos Dados
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '1rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div><strong>Nome:</strong> {customerData.name}</div>
                      <div><strong>Email:</strong> {customerData.email}</div>
                      <div><strong>Telefone:</strong> {customerData.phone}</div>
                      <div><strong>CPF:</strong> {customerData.document}</div>
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    padding: '2rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto'
                    }}>
                      <Lock size={30} color="white" />
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}>
                      Pagamento Seguro via Mercado Pago
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Você será redirecionado para o ambiente seguro do Mercado Pago para finalizar sua compra.
                      Aceitamos cartão de crédito, débito, PIX e boleto.
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        background: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        💳 Cartão
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        📱 PIX
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        🧾 Boleto
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'space-between'
                  }}>
                    <button
                      onClick={prevStep}
                      style={{
                        background: 'white',
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <ArrowLeft size={20} />
                      Voltar
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      style={{
                        background: loading
                          ? '#9ca3af'
                          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {loading ? (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid transparent',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Lock size={20} />
                          Pagar R$ {getTotal().toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'white',
                    borderRadius: '2rem',
                    padding: '3rem',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem auto'
                  }}>
                    <CheckCircle size={40} color="white" />
                  </div>

                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    🎉 Pagamento Aprovado!
                  </h2>

                  <p style={{
                    color: '#6b7280',
                    fontSize: '1.125rem',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                  }}>
                    Parabéns! Sua compra foi processada com sucesso.
                    Os links de download foram enviados para seu email.
                  </p>

                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{
                      color: '#166534',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      📧 Próximos Passos:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      color: '#166534',
                      textAlign: 'left'
                    }}>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✅ Verifique seu email ({customerData.email})
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✅ Clique nos links de download
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✅ Salve os arquivos em seu dispositivo
                      </li>
                      <li>
                        ✅ Aproveite seus novos livros!
                      </li>
                    </ul>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => navigate('/livros')}
                      style={{
                        background: 'white',
                        color: '#f59e0b',
                        border: '2px solid #f59e0b',
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Comprar Mais Livros
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Voltar ao Início
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Resumo do Pedido - Sidebar */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                position: 'sticky',
                top: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Receipt size={24} />
                  Resumo do Pedido
                </h3>

                {/* Lista de Itens */}
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  marginBottom: '1.5rem'
                }}>
                  {items.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        📚
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '0.25rem',
                          lineHeight: '1.3'
                        }}>
                          {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                        </h4>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          margin: 0
                        }}>
                          {item.author}
                        </p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '0.5rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                width: '24px',
                                height: '24px',
                                background: '#f3f4f6',
                                border: 'none',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              minWidth: '20px',
                              textAlign: 'center'
                            }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                width: '24px',
                                height: '24px',
                                background: '#f3f4f6',
                                border: 'none',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '0.25rem'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cálculos */}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ color: '#6b7280' }}>
                      Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} itens):
                    </span>
                    <span style={{ fontWeight: '600' }}>
                      R$ {getSubtotal().toFixed(2)}
                    </span>
                  </div>

                  {getDiscount() > 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{ color: '#10b981' }}>
                        Desconto ({items.reduce((total, item) => total + item.quantity, 0) >= 5 ? '10%' : '5%'}):
                      </span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>
                        -R$ {getDiscount().toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      Total:
                    </span>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#f59e0b'
                    }}>
                      R$ {getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Garantias */}
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginTop: '1.5rem'
                }}>
                  <h5 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '1rem'
                  }}>
                    🛡️ Suas Garantias:
                  </h5>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10b981" />
                      Download imediato
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10b981" />
                      Acesso vitalício
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10b981" />
                      Suporte 24/7
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10b981" />
                      Garantia de qualidade
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
