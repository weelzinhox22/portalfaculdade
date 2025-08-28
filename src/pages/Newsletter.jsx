import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Gift, Calendar, Users, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const Newsletter = () => {
  const isMobile = useMobile();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { id: 'anatomia', name: 'Anatomia & Fisiologia', icon: '🦴' },
    { id: 'exercicios', name: 'Exercícios Terapêuticos', icon: '💪' },
    { id: 'pediatria', name: 'Fisioterapia Pediátrica', icon: '👶' },
    { id: 'geriatria', name: 'Fisioterapia Geriátrica', icon: '👴' },
    { id: 'esportiva', name: 'Fisioterapia Esportiva', icon: '🏃‍♂️' },
    { id: 'respiratoria', name: 'Fisioterapia Respiratória', icon: '🫁' },
    { id: 'neurologia', name: 'Fisioterapia Neurológica', icon: '🧠' },
    { id: 'ortopedia', name: 'Fisioterapia Ortopédica', icon: '🦴' }
  ];

  const benefits = [
    {
      icon: '📚',
      title: 'Conteúdo Exclusivo',
      description: 'Artigos, e-books e materiais que você não encontra em lugar nenhum'
    },
    {
      icon: '🎯',
      title: 'Dicas Práticas',
      description: 'Técnicas e protocolos que você pode aplicar imediatamente na prática'
    },
    {
      icon: '🆓',
      title: 'Downloads Gratuitos',
      description: 'Materiais, planilhas e recursos exclusivos para assinantes'
    },
    {
      icon: '🔔',
      title: 'Novidades em Primeira Mão',
      description: 'Seja o primeiro a saber sobre novos cursos, livros e promoções'
    },
    {
      icon: '💡',
      title: 'Casos Clínicos',
      description: 'Estudos de caso reais para aprimorar seu raciocínio clínico'
    },
    {
      icon: '🎓',
      title: 'Educação Continuada',
      description: 'Conteúdo atualizado para manter você sempre em dia com a profissão'
    }
  ];

  const handleInterestToggle = (interestId) => {
    setInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubscribe = async () => {
    if (!email || !name) {
      alert('Por favor, preencha nome e email');
      return;
    }

    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 2000);
  };

  if (subscribed) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          paddingTop: '6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem',
              maxWidth: '600px',
              margin: '0 2rem',
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
              🎉 Bem-vindo(a) à Newsletter!
            </h2>

            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Obrigado por se inscrever, <strong>{name}</strong>! 
              Você receberá conteúdos exclusivos em <strong>{email}</strong>
            </p>

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
                🎁 Seus Benefícios:
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: '#166534',
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>✅ E-book gratuito "Anatomia Essencial"</li>
                <li style={{ marginBottom: '0.5rem' }}>✅ Newsletter semanal com dicas práticas</li>
                <li style={{ marginBottom: '0.5rem' }}>✅ Acesso a materiais exclusivos</li>
                <li style={{ marginBottom: '0.5rem' }}>✅ Desconto de 20% em todos os produtos</li>
                <li>✅ Convites para webinars gratuitos</li>
              </ul>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.href = '/livros'}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📚 Explorar Livros
              </button>
              
              <button
                onClick={() => window.location.href = '/blog'}
                style={{
                  background: 'white',
                  color: '#10b981',
                  border: '2px solid #10b981',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📝 Ler Artigos
              </button>
            </div>
          </motion.div>
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
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        paddingTop: '6rem'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              📧 Newsletter FisioEstudos
            </h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              marginBottom: '2rem'
            }}>
              Receba conteúdo exclusivo, dicas práticas e novidades da fisioterapia
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                <span>2.500+ Inscritos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} />
                <span>Semanal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Gift size={20} />
                <span>Conteúdo Gratuito</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Formulário */}
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
                marginBottom: '1rem'
              }}>
                📬 Inscreva-se Gratuitamente
              </h2>

              <p style={{
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Junte-se a milhares de fisioterapeutas que já recebem nosso conteúdo exclusivo!
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Seu nome"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="seu@email.com"
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  Áreas de Interesse:
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {interestOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleInterestToggle(option.id)}
                      style={{
                        padding: '0.75rem',
                        border: interests.includes(option.id) 
                          ? '2px solid #0ea5e9' 
                          : '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        background: interests.includes(option.id) 
                          ? '#f0f9ff' 
                          : 'white',
                        color: '#1f2937',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left'
                      }}
                    >
                      {option.icon} {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={loading || !email || !name}
                style={{
                  width: '100%',
                  background: loading || !email || !name
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: loading || !email || !name ? 'not-allowed' : 'pointer',
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
                    Inscrevendo...
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    Inscrever-se Gratuitamente
                  </>
                )}
              </button>

              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                textAlign: 'center',
                marginTop: '1rem'
              }}>
                🔒 Seus dados estão seguros. Você pode cancelar a qualquer momento.
              </p>
            </motion.div>

            {/* Benefícios */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '2rem'
              }}>
                🎁 O que você vai receber:
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: 'white',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem'
                    }}>
                      <div style={{
                        fontSize: '2rem',
                        lineHeight: 1
                      }}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '0.5rem'
                        }}>
                          {benefit.title}
                        </h3>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          lineHeight: '1.5'
                        }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Estatísticas */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                marginTop: '2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  📊 Nossa Comunidade
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#0ea5e9'
                    }}>
                      2.5K+
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Inscritos
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#0ea5e9'
                    }}>
                      95%
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Satisfação
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#0ea5e9'
                    }}>
                      50+
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Artigos
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Newsletter;
