import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
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
  Clock
} from 'lucide-react';
import useMobile from '../hooks/useMobile';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);

  // Mock product data - in real app, fetch from API
  const product = {
    id: 2,
    title: "E-book: Avaliação Neurológica Completa",
    author: "FisioEstudos",
    price: 'R$ 47,90',
    originalPrice: 'R$ 67,90',
    discount: '29%',
    rating: 4.9,
    reviews: 89,
    description: 'Guia completo para avaliação neurológica em fisioterapia com protocolos práticos.',
    features: [
      'Mais de 150 páginas',
      'Protocolos de avaliação',
      'Casos clínicos',
      'Vídeos complementares'
    ]
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
          transaction_id: Date.now().toString(),
          value: 47.90,
          currency: 'BRL',
          items: [{
            item_id: product.id,
            item_name: product.title,
            category: 'ebook',
            quantity: 1,
            price: 47.90
          }]
        });
      }
    }, 2000);
  };

  const formatPrice = (price) => {
    return parseFloat(price.replace('R$ ', '').replace(',', '.'));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (!product) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Produto não encontrado</h2>
            <button
              onClick={() => navigate('/produtos')}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                marginTop: '1rem',
                cursor: 'pointer'
              }}
            >
              Voltar aos Produtos
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
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/produtos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '0.875rem',
              cursor: 'pointer',
              marginBottom: '2rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#10b981'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
          >
            <ArrowLeft size={16} />
            Voltar aos produtos
          </button>

          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}>
              {[
                { number: 1, title: 'Informações', icon: User },
                { number: 2, title: 'Pagamento', icon: CreditCard },
                { number: 3, title: 'Confirmação', icon: CheckCircle }
              ].map((stepItem, index) => {
                const Icon = stepItem.icon;
                const isActive = step >= stepItem.number;
                const isCurrent = step === stepItem.number;
                
                return (
                  <React.Fragment key={stepItem.number}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: isActive 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? 'white' : '#9ca3af',
                        border: isCurrent ? '3px solid #10b981' : 'none',
                        transition: 'all 0.3s ease'
                      }}>
                        <Icon size={20} />
                      </div>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: isActive ? '#10b981' : '#9ca3af'
                      }}>
                        {stepItem.title}
                      </span>
                    </div>
                    {index < 2 && (
                      <div style={{
                        width: '60px',
                        height: '2px',
                        background: step > stepItem.number ? '#10b981' : '#e5e7eb',
                        transition: 'background 0.3s ease'
                      }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
            gap: '3rem'
          }}>
            {/* Main Content */}
            <div>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div style={{
                    background: 'white',
                    borderRadius: '2rem',
                    padding: '3rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}>
                    <h2 style={{
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '2rem'
                    }}>
                      Suas Informações
                    </h2>

                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
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
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            style={{
                              width: '100%',
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />
                        </div>

                        <div>
                          <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            E-mail *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{
                              width: '100%',
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />
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
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            style={{
                              width: '100%',
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />
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
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                            style={{
                              width: '100%',
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Continuar para Pagamento
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div style={{
                    background: 'white',
                    borderRadius: '2rem',
                    padding: '3rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}>
                    <h2 style={{
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '2rem'
                    }}>
                      Forma de Pagamento
                    </h2>

                    <form onSubmit={handleSubmit}>
                      {/* Payment Methods */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '2rem'
                      }}>
                        {[
                          { id: 'pix', name: 'PIX', desc: 'Aprovação instantânea', discount: '5%' },
                          { id: 'card', name: 'Cartão de Crédito', desc: 'Até 12x sem juros', discount: null },
                          { id: 'boleto', name: 'Boleto Bancário', desc: 'Vencimento em 3 dias', discount: null }
                        ].map(method => (
                          <label
                            key={method.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              padding: '1.5rem',
                              border: paymentMethod === method.id ? '2px solid #10b981' : '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              background: paymentMethod === method.id ? '#f0fdf4' : 'white'
                            }}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              style={{ display: 'none' }}
                            />
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: '2px solid',
                              borderColor: paymentMethod === method.id ? '#10b981' : '#d1d5db',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {paymentMethod === method.id && (
                                <div style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: '#10b981'
                                }} />
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                  fontWeight: '600',
                                  color: '#1f2937'
                                }}>
                                  {method.name}
                                </span>
                                {method.discount && (
                                  <span style={{
                                    background: '#fbbf24',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                  }}>
                                    -{method.discount}
                                  </span>
                                )}
                              </div>
                              <p style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                margin: 0
                              }}>
                                {method.desc}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Security Info */}
                      <div style={{
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '0.5rem'
                        }}>
                          <Shield size={20} color="#059669" />
                          <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#059669'
                          }}>
                            Compra 100% Segura
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#166534',
                          margin: 0,
                          lineHeight: '1.5'
                        }}>
                          Seus dados estão protegidos com criptografia SSL.
                          Garantia de 30 dias ou seu dinheiro de volta.
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '1rem'
                      }}>
                        <button
                          type="button"
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
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          style={{
                            flex: 1,
                            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '1rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
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
                              Processando...
                            </>
                          ) : (
                            <>
                              <Lock size={20} />
                              Finalizar Compra
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div style={{
                    background: 'white',
                    borderRadius: '2rem',
                    padding: '3rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem auto',
                      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
                    }}>
                      <CheckCircle size={40} color="white" />
                    </div>

                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}>
                      Compra Realizada com Sucesso!
                    </h2>

                    <p style={{
                      fontSize: '1.1rem',
                      color: '#6b7280',
                      marginBottom: '2rem',
                      lineHeight: '1.6'
                    }}>
                      Seu e-book foi enviado para <strong>{formData.email}</strong>.
                      Verifique sua caixa de entrada e spam.
                    </p>

                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '1rem',
                      padding: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#059669',
                        marginBottom: '1rem'
                      }}>
                        O que você recebeu:
                      </h3>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                      }}>
                        {product.features.map((feature, idx) => (
                          <li key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.75rem',
                            fontSize: '0.95rem',
                            color: '#166534'
                          }}>
                            <CheckCircle size={16} color="#10b981" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => navigate('/produtos')}
                        style={{
                          background: 'white',
                          color: '#10b981',
                          border: '1px solid #10b981',
                          padding: '1rem 2rem',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#10b981';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#10b981';
                        }}
                      >
                        Ver Mais Produtos
                      </button>
                      <button
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <Download size={20} />
                        Baixar Agora
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Product Summary Sidebar */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  Resumo do Pedido
                </h3>

                {/* Product Info */}
                <div style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3'
                  }}>
                    {product.title}
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    por {product.author}
                  </p>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          color={i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'}
                          fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                        />
                      ))}
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#374151'
                    }}>
                      {product.rating} ({product.reviews} avaliações)
                    </span>
                  </div>

                  {/* Features */}
                  <div>
                    <h5 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.75rem'
                    }}>
                      Inclui:
                    </h5>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {product.features.map((feature, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          color: '#4b5563'
                        }}>
                          <CheckCircle size={14} color="#10b981" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Subtotal:
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>
                      {product.originalPrice}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#059669'
                    }}>
                      Desconto ({product.discount}):
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#059669',
                      fontWeight: '600'
                    }}>
                      -R$ {(formatPrice(product.originalPrice) - formatPrice(product.price)).toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {paymentMethod === 'pix' && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#059669'
                      }}>
                        Desconto PIX (5%):
                      </span>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#059669',
                        fontWeight: '600'
                      }}>
                        -R$ {(formatPrice(product.price) * 0.05).toFixed(2).replace('.', ',')}
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
                      color: '#059669'
                    }}>
                      R$ {paymentMethod === 'pix'
                        ? (formatPrice(product.price) * 0.95).toFixed(2).replace('.', ',')
                        : product.price.replace('R$ ', '')
                      }
                    </span>
                  </div>
                </div>

                {/* Guarantees */}
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
                    Suas Garantias:
                  </h5>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Shield size={16} color="#10b981" />
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#4b5563'
                      }}>
                        30 dias de garantia
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Download size={16} color="#10b981" />
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#4b5563'
                      }}>
                        Download imediato
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Clock size={16} color="#10b981" />
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#4b5563'
                      }}>
                        Acesso vitalício
                      </span>
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
