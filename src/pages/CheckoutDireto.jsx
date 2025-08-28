import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutDireto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Redirecionar para Mercado Pago
  const redirectToMercadoPago = async () => {
    if (!validateCustomerData()) return;
    
    try {
      setLoading(true);
      console.log('🚀 Redirecionando para Mercado Pago...');
      
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Preferência criada:', data.id);
      console.log('🔗 Redirecionando para:', data.init_point);
      
      // Redirecionar IMEDIATAMENTE para Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('URL de redirecionamento não encontrada');
      }
      
    } catch (error) {
      console.error('❌ Erro:', error);
      alert(`❌ Erro: ${error.message}\n\nVerifique se o servidor está rodando: node server-final.mjs`);
    } finally {
      setLoading(false);
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem'
            }}
          >
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              💳 Checkout Mercado Pago
            </h1>

            <div style={{
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#92400e',
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                🚧 Funcionalidade em Desenvolvimento
              </h3>
              <p style={{
                color: '#92400e',
                marginBottom: '1rem',
                fontSize: '1.125rem'
              }}>
                Estamos finalizando a integração com o sistema de pagamentos.
                Em breve você poderá adquirir nossos livros digitais!
              </p>
              <div style={{
                background: '#fff7ed',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                marginTop: '1.5rem'
              }}>
                <h4 style={{
                  color: '#ea580c',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  📧 Quer ser notificado quando estiver pronto?
                </h4>
                <p style={{
                  color: '#ea580c',
                  fontSize: '0.875rem'
                }}>
                  Entre em contato conosco e seja o primeiro a saber quando o sistema estiver funcionando!
                </p>
              </div>
            </div>

            {/* Formulário */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => navigate('/livros')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
                📚 Ver Mais Livros
              </button>

              <button
                onClick={() => navigate('/contato')}
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
                📧 Entrar em Contato
              </button>
            </div>

            <p style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#6b7280',
              marginTop: '1.5rem',
              fontStyle: 'italic'
            }}>
              💡 Enquanto isso, explore nosso conteúdo gratuito e fique por dentro das novidades!
            </p>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CheckoutDireto;
