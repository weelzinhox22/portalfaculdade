import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  XCircle, 
  RefreshCw, 
  Home,
  ShoppingCart,
  AlertCircle,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const CheckoutFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMobile();
  const [paymentData, setPaymentData] = useState(null);

  // Parâmetros retornados pelo Mercado Pago
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const statusDetail = searchParams.get('status_detail');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    // Simular dados do pagamento falhado
    setPaymentData({
      id: paymentId || 'PAY_FAILED_123',
      status: status || 'rejected',
      statusDetail: statusDetail || 'cc_rejected_insufficient_amount',
      transactionDate: new Date().toLocaleDateString('pt-BR'),
      amount: 45.00
    });
  }, [paymentId, status, statusDetail]);

  const getErrorMessage = (statusDetail) => {
    const errorMessages = {
      'cc_rejected_insufficient_amount': 'Saldo insuficiente no cartão',
      'cc_rejected_bad_filled_card_number': 'Número do cartão inválido',
      'cc_rejected_bad_filled_date': 'Data de vencimento inválida',
      'cc_rejected_bad_filled_security_code': 'Código de segurança inválido',
      'cc_rejected_bad_filled_other': 'Dados do cartão incorretos',
      'cc_rejected_high_risk': 'Transação rejeitada por segurança',
      'cc_rejected_max_attempts': 'Muitas tentativas com dados incorretos',
      'cc_rejected_duplicated_payment': 'Pagamento duplicado',
      'cc_rejected_card_disabled': 'Cartão desabilitado',
      'cc_rejected_call_for_authorize': 'Autorização necessária com o banco',
      'cc_rejected_card_error': 'Erro no processamento do cartão'
    };

    return errorMessages[statusDetail] || 'Erro no processamento do pagamento';
  };

  const getSolution = (statusDetail) => {
    const solutions = {
      'cc_rejected_insufficient_amount': 'Verifique o saldo disponível ou use outro cartão',
      'cc_rejected_bad_filled_card_number': 'Confira o número do cartão e tente novamente',
      'cc_rejected_bad_filled_date': 'Verifique a data de vencimento do cartão',
      'cc_rejected_bad_filled_security_code': 'Confira o código de segurança (CVV)',
      'cc_rejected_bad_filled_other': 'Revise todos os dados do cartão',
      'cc_rejected_high_risk': 'Entre em contato com seu banco ou use outro cartão',
      'cc_rejected_max_attempts': 'Aguarde alguns minutos antes de tentar novamente',
      'cc_rejected_duplicated_payment': 'Verifique se o pagamento já foi processado',
      'cc_rejected_card_disabled': 'Entre em contato com seu banco',
      'cc_rejected_call_for_authorize': 'Autorize a transação com seu banco',
      'cc_rejected_card_error': 'Tente novamente ou use outro cartão'
    };

    return solutions[statusDetail] || 'Tente novamente ou use outra forma de pagamento';
  };

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
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
            {/* Error Icon */}
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)'
            }}>
              <XCircle size={50} color="white" />
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              😔 Pagamento Não Aprovado
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Infelizmente, não foi possível processar seu pagamento. 
              Mas não se preocupe, você pode tentar novamente!
            </p>

            {/* Error Details */}
            {paymentData && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#dc2626',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={24} />
                  Detalhes do Erro
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <strong>ID da Transação:</strong><br />
                    <span style={{ color: '#6b7280' }}>{paymentData.id}</span>
                  </div>
                  <div>
                    <strong>Data:</strong><br />
                    <span style={{ color: '#6b7280' }}>{paymentData.transactionDate}</span>
                  </div>
                  <div>
                    <strong>Status:</strong><br />
                    <span style={{ 
                      color: '#dc2626',
                      background: '#fef2f2',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      ❌ Rejeitado
                    </span>
                  </div>
                  <div>
                    <strong>Valor:</strong><br />
                    <span style={{ 
                      color: '#6b7280',
                      fontSize: '1.125rem',
                      fontWeight: '700'
                    }}>
                      R$ {paymentData.amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid #fecaca'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <HelpCircle size={20} color="#dc2626" />
                    <strong style={{ color: '#dc2626' }}>Motivo:</strong>
                  </div>
                  <p style={{
                    color: '#374151',
                    marginBottom: '1rem',
                    fontSize: '1rem'
                  }}>
                    {getErrorMessage(paymentData.statusDetail)}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <CreditCard size={20} color="#f59e0b" />
                    <strong style={{ color: '#f59e0b' }}>Solução:</strong>
                  </div>
                  <p style={{
                    color: '#374151',
                    margin: 0,
                    fontSize: '1rem'
                  }}>
                    {getSolution(paymentData.statusDetail)}
                  </p>
                </div>
              </div>
            )}

            {/* Common Solutions */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
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
                💡 Dicas para Resolver
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem'
                }}>
                  <h4 style={{
                    color: '#f59e0b',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    🔍 Verifique os Dados
                  </h4>
                  <ul style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    paddingLeft: '1rem'
                  }}>
                    <li>Número do cartão correto</li>
                    <li>Data de vencimento válida</li>
                    <li>Código CVV correto</li>
                    <li>Nome igual ao do cartão</li>
                  </ul>
                </div>

                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem'
                }}>
                  <h4 style={{
                    color: '#f59e0b',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    💳 Outras Opções
                  </h4>
                  <ul style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    paddingLeft: '1rem'
                  }}>
                    <li>Tente outro cartão</li>
                    <li>Use PIX (instantâneo)</li>
                    <li>Pague com boleto</li>
                    <li>Verifique limite disponível</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <button
                onClick={() => navigate('/checkout', { 
                  state: { 
                    items: JSON.parse(localStorage.getItem('checkoutItems') || '[]')
                  } 
                })}
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
                <RefreshCw size={20} />
                Tentar Novamente
              </button>
              
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
                Ver Outros Livros
              </button>
            </div>

            {/* Support Info */}
            <div style={{
              padding: '1.5rem',
              background: '#f8fafc',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <h4 style={{
                color: '#374151',
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                🆘 Precisa de Ajuda?
              </h4>
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                Nossa equipe está pronta para ajudar! Entre em contato conosco:<br />
                📧 Email: <span style={{ color: '#f59e0b', fontWeight: '600' }}>suporte@fisioestudos.com</span><br />
                📱 WhatsApp: <span style={{ color: '#f59e0b', fontWeight: '600' }}>(11) 99999-9999</span><br />
                🕐 Atendimento: Segunda a Sexta, 8h às 18h
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CheckoutFailure;
