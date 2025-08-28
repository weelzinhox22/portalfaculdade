import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Copy, 
  CheckCircle, 
  Clock,
  QrCode,
  Smartphone,
  ArrowLeft,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import useMobile from '../hooks/useMobile';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPIXReal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const isMobile = useMobile();
  
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(1); // 1: Dados, 2: PIX, 3: Confirmação
  const [pixData, setPixData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentId, setPaymentId] = useState(null);
  
  const [customerData, setCustomerData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    document: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.items) {
      setItems(location.state.items);
    } else {
      navigate('/livros');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Polling para verificar status do pagamento
  useEffect(() => {
    let interval;
    if (paymentId && paymentStatus === 'pending') {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/mercadopago/payment/${paymentId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('📊 Status atual:', data.status);
            
            if (data.status === 'approved') {
              setPaymentStatus('approved');
              setStep(3);
              clearInterval(interval);
            } else if (data.status === 'rejected') {
              setPaymentStatus('rejected');
              clearInterval(interval);
            }
          }
        } catch (error) {
          console.error('Erro ao verificar status:', error);
        }
      }, 3000); // Verificar a cada 3 segundos
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentId, paymentStatus]);

  // Cálculos
  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscount = () => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = getSubtotal();
    
    if (itemCount >= 5) return subtotal * 0.10;
    if (itemCount >= 3) return subtotal * 0.05;
    return 0;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  // Validação
  const validateCustomerData = () => {
    const newErrors = {};
    
    if (!customerData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!customerData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!customerData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!customerData.document.trim()) newErrors.document = 'CPF é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Criar PIX real via Mercado Pago
  const createRealPIX = async () => {
    if (!validateCustomerData()) return;
    
    try {
      setLoading(true);
      console.log('📱 Criando PIX real no Mercado Pago...');
      
      const response = await fetch('http://localhost:3001/api/mercadopago/create-pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerData: customerData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar PIX');
      }

      const data = await response.json();
      console.log('✅ PIX criado:', data);
      
      setPixData(data);
      setPaymentId(data.id);
      setStep(2);
      
    } catch (error) {
      console.error('❌ Erro ao criar PIX:', error);
      
      if (error.message.includes('fetch')) {
        alert('❌ Erro: Servidor backend não está rodando!\n\nPara usar PIX real:\n1. Execute: npm install express cors mercadopago\n2. Execute: node server-mercadopago-real.js\n3. Tente novamente');
      } else {
        alert(`❌ Erro ao criar PIX: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Copiar código PIX
  const copyPIX = async () => {
    if (!pixData?.qr_code) return;
    
    try {
      await navigator.clipboard.writeText(pixData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '2rem',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <h2>Carrinho Vazio</h2>
            <button onClick={() => navigate('/livros')}>
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
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Progress */}
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
                    fontWeight: '600'
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

          {/* Step 1: Dados */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '3rem'
              }}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                💳 PIX Mercado Pago Real
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
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

              {/* Resumo */}
              <div style={{
                background: '#f8fafc',
                padding: '2rem',
                borderRadius: '1rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  📋 Resumo do Pedido
                </h3>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span>Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} itens):</span>
                  <span>R$ {getSubtotal().toFixed(2)}</span>
                </div>
                
                {getDiscount() > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    color: '#10b981'
                  }}>
                    <span>Desconto:</span>
                    <span>-R$ {getDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#f59e0b'
                }}>
                  <span>Total:</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={createRealPIX}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                    Criando PIX...
                  </>
                ) : (
                  <>
                    <QrCode size={24} />
                    Gerar PIX Real
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Step 2: PIX Real */}
          {step === 2 && pixData && (
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
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto'
              }}>
                <QrCode size={40} color="white" />
              </div>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                📱 PIX Mercado Pago
              </h2>

              <p style={{
                color: '#6b7280',
                fontSize: '1.125rem',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                PIX criado com sucesso! Escaneie o QR Code ou copie o código para pagar
              </p>

              {/* Informações do Pagamento */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.875rem'
                }}>
                  <div>
                    <strong>ID do Pagamento:</strong><br />
                    <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>
                      {pixData.id}
                    </span>
                  </div>
                  <div>
                    <strong>Valor:</strong><br />
                    <span style={{ color: '#10b981', fontSize: '1.125rem', fontWeight: '700' }}>
                      R$ {pixData.transaction_amount?.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <strong>Status:</strong><br />
                    <span style={{
                      color: paymentStatus === 'approved' ? '#10b981' : '#f59e0b',
                      fontWeight: '600'
                    }}>
                      {paymentStatus === 'approved' ? '✅ Aprovado' : '⏳ Aguardando'}
                    </span>
                  </div>
                  <div>
                    <strong>Expira em:</strong><br />
                    <span style={{ color: '#6b7280' }}>
                      30 minutos
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              {pixData.qr_code_base64 ? (
                <div style={{
                  background: '#f8fafc',
                  padding: '2rem',
                  borderRadius: '1rem',
                  marginBottom: '2rem'
                }}>
                  <img
                    src={`data:image/png;base64,${pixData.qr_code_base64}`}
                    alt="QR Code PIX"
                    style={{
                      width: '200px',
                      height: '200px',
                      margin: '0 auto',
                      display: 'block',
                      border: '2px solid #e5e7eb',
                      borderRadius: '1rem'
                    }}
                  />
                </div>
              ) : (
                <div style={{
                  background: '#f8fafc',
                  padding: '2rem',
                  borderRadius: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '200px',
                    height: '200px',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    textAlign: 'center',
                    lineHeight: '1.5'
                  }}>
                    📱<br />
                    QR Code PIX<br />
                    <strong style={{ color: '#f59e0b' }}>
                      R$ {pixData.transaction_amount?.toFixed(2)}
                    </strong>
                  </div>
                </div>
              )}

              {/* PIX Copia e Cola */}
              {pixData.qr_code && (
                <div style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '1rem'
                  }}>
                    💳 PIX Copia e Cola:
                  </h4>

                  <div style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                    marginBottom: '1rem',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    lineHeight: '1.4'
                  }}>
                    {pixData.qr_code}
                  </div>

                  <button
                    onClick={copyPIX}
                    style={{
                      background: copied ? '#10b981' : '#f59e0b',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: '0 auto',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={16} />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copiar Código PIX
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Status de Verificação */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                color: paymentStatus === 'approved' ? '#10b981' : '#f59e0b'
              }}>
                {paymentStatus === 'approved' ? (
                  <>
                    <CheckCircle size={20} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      Pagamento confirmado!
                    </span>
                  </>
                ) : (
                  <>
                    <Clock size={20} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      Verificando pagamento automaticamente...
                    </span>
                  </>
                )}
              </div>

              {/* Instruções */}
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                padding: '2rem',
                borderRadius: '1rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '1rem'
                }}>
                  📋 Como pagar:
                </h4>

                <ol style={{
                  color: '#92400e',
                  paddingLeft: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  <li>Abra o app do seu banco</li>
                  <li>Escolha a opção PIX</li>
                  <li>Escaneie o QR Code ou cole o código</li>
                  <li>Confirme o pagamento</li>
                  <li>A confirmação é automática!</li>
                </ol>
              </div>

              {/* Botão Voltar */}
              <button
                onClick={() => setStep(1)}
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
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
              >
                <ArrowLeft size={20} />
                Voltar
              </button>
            </motion.div>
          )}

          {/* Step 3: Sucesso */}
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
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto'
              }}>
                <CheckCircle size={50} color="white" />
              </div>

              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                🎉 Pagamento Confirmado!
              </h2>

              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Parabéns! Seu pagamento PIX foi processado com sucesso pelo Mercado Pago.
                Os links de download foram enviados para <strong>{customerData.email}</strong>
              </p>

              {pixData && (
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{
                    color: '#166534',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    💳 Detalhes do Pagamento:
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#166534'
                  }}>
                    <div><strong>ID:</strong> {pixData.id}</div>
                    <div><strong>Valor:</strong> R$ {pixData.transaction_amount?.toFixed(2)}</div>
                    <div><strong>Método:</strong> PIX</div>
                    <div><strong>Status:</strong> ✅ Aprovado</div>
                  </div>
                </div>
              )}

              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  color: '#166534',
                  fontSize: '1.25rem',
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
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPIXReal;
