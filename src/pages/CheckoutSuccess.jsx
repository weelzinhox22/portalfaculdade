import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Home,
  ShoppingCart,
  Star,
  Clock
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMobile();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parâmetros retornados pelo Mercado Pago
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');
  const preferenceId = searchParams.get('preference_id');

  useEffect(() => {
    // Simular verificação do pagamento
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        // Simular delay da verificação
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Dados simulados do pagamento
        setPaymentData({
          id: paymentId || 'PAY_123456789',
          status: status || 'approved',
          amount: 45.00,
          items: [
            { title: 'Guyton & Hall - Fisiologia Médica', quantity: 1 },
            { title: 'Tortora - Anatomia Humana', quantity: 1 },
            { title: 'Apostila de Músculos', quantity: 1 }
          ],
          customerEmail: 'cliente@email.com',
          transactionDate: new Date().toLocaleDateString('pt-BR')
        });
        
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId, status]);

  if (loading) {
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
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #f59e0b',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              margin: '0 auto 2rem auto',
              animation: 'spin 1s linear infinite'
            }} />
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Verificando Pagamento...
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Aguarde enquanto confirmamos sua transação.
            </p>
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: isMobile ? '2rem' : '3rem',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Success Icon */}
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle size={50} color="white" />
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              🎉 Pagamento Aprovado!
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Parabéns! Sua compra foi processada com sucesso. 
              Os links de download já foram enviados para seu email.
            </p>

            {/* Payment Details */}
            {paymentData && (
              <div style={{
                background: '#f8fafc',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  📋 Detalhes da Compra
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <strong>ID do Pagamento:</strong><br />
                    <span style={{ color: '#6b7280' }}>{paymentData.id}</span>
                  </div>
                  <div>
                    <strong>Data:</strong><br />
                    <span style={{ color: '#6b7280' }}>{paymentData.transactionDate}</span>
                  </div>
                  <div>
                    <strong>Status:</strong><br />
                    <span style={{ 
                      color: '#10b981',
                      background: '#f0fdf4',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      ✅ Aprovado
                    </span>
                  </div>
                  <div>
                    <strong>Total Pago:</strong><br />
                    <span style={{ 
                      color: '#f59e0b',
                      fontSize: '1.125rem',
                      fontWeight: '700'
                    }}>
                      R$ {paymentData.amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <strong>Itens Comprados:</strong>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0.5rem 0 0 0'
                  }}>
                    {paymentData.items.map((item, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0',
                        borderBottom: index < paymentData.items.length - 1 ? '1px solid #e5e7eb' : 'none'
                      }}>
                        <CheckCircle size={16} color="#10b981" />
                        <span style={{ color: '#374151' }}>
                          {item.title} (Qtd: {item.quantity})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <Mail size={24} />
                📧 Próximos Passos
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1rem',
                textAlign: 'left'
              }}>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <Mail size={20} color="#f59e0b" />
                    <strong>1. Verifique seu Email</strong>
                  </div>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Os links de download foram enviados para {paymentData?.customerEmail}. 
                    Verifique também a pasta de spam.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <Download size={20} color="#f59e0b" />
                    <strong>2. Faça o Download</strong>
                  </div>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Clique nos links para baixar seus livros. 
                    Os arquivos ficam disponíveis para sempre.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f59e0b';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#f59e0b';
                }}
              >
                <ShoppingCart size={20} />
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
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Home size={20} />
                Voltar ao Início
              </button>
            </div>

            {/* Support Info */}
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#f8fafc',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <p style={{ margin: 0 }}>
                <strong>Precisa de ajuda?</strong> Entre em contato conosco pelo email 
                <span style={{ color: '#f59e0b', fontWeight: '600' }}> suporte@fisioestudos.com</span> 
                ou WhatsApp <span style={{ color: '#f59e0b', fontWeight: '600' }}>(11) 99999-9999</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CheckoutSuccess;
