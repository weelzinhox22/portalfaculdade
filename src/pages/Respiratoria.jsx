import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Activity, Zap, Target, TrendingUp, Heart, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Respiratoria = () => {
  const isMobile = window.innerWidth <= 768;
  const modules = [
    {
      id: 1,
      title: 'Anatomia e Fisiologia Respiratória',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      topics: [
        'Sistema respiratório: anatomia e fisiologia',
        'Mecânica ventilatória',
        'Trocas gasosas e transporte de O2/CO2',
        'Controle neural da respiração'
      ],
      duration: '6 semanas',
      level: 'Básico',
      conditions: ['Asma', 'DPOC', 'Pneumonia', 'COVID-19'],
      hasDetailedContent: true,
      link: '/fisiologia-respiratoria'
    },
    {
      id: 2,
      title: 'Avaliação Respiratória',
      icon: <Stethoscope className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Anamnese respiratória',
        'Inspeção, palpação e ausculta',
        'Testes de função pulmonar',
        'Gasometria arterial'
      ],
      duration: '8 semanas',
      level: 'Intermediário',
      conditions: ['Insuficiência Respiratória', 'Fibrose Pulmonar', 'Embolia', 'Atelectasia']
    },
    {
      id: 3,
      title: 'Técnicas de Fisioterapia Respiratória',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      topics: [
        'Higiene brônquica',
        'Exercícios respiratórios',
        'Ventilação não invasiva',
        'Desmame ventilatório'
      ],
      duration: '10 semanas',
      level: 'Avançado',
      conditions: ['Ventilação Mecânica', 'Traqueostomia', 'UTI', 'Pós-operatório']
    },
    {
      id: 4,
      title: 'Fisioterapia Respiratória Pediátrica',
      icon: <Target className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      topics: [
        'Desenvolvimento pulmonar infantil',
        'Patologias respiratórias pediátricas',
        'Técnicas adaptadas para crianças',
        'Orientação familiar'
      ],
      duration: '8 semanas',
      level: 'Especialização',
      conditions: ['Bronquiolite', 'Fibrose Cística', 'Asma Infantil', 'Prematuridade']
    }
  ];

  const respiratoryConditions = [
    { name: 'DPOC', icon: '🫁', color: 'bg-red-100 text-red-700', prevalence: '15%' },
    { name: 'Asma', icon: '💨', color: 'bg-blue-100 text-blue-700', prevalence: '12%' },
    { name: 'Pneumonia', icon: '🦠', color: 'bg-yellow-100 text-yellow-700', prevalence: '8%' },
    { name: 'COVID-19', icon: '😷', color: 'bg-purple-100 text-purple-700', prevalence: '5%' },
    { name: 'Fibrose Pulmonar', icon: '🔬', color: 'bg-green-100 text-green-700', prevalence: '3%' },
    { name: 'Embolia Pulmonar', icon: '⚠️', color: 'bg-orange-100 text-orange-700', prevalence: '2%' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      {/* Hero Section */}
      <section className="specialty-hero">
        <div
          className="hero-background specialty-hero"
          style={{
            background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
            minHeight: isMobile ? '50vh' : '60vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '3rem 0' : '4rem 0'
          }}
        >
          {/* Animated Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'float 6s ease-in-out infinite'
            }}
          />

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.9)'}
              >
                <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                Voltar ao Início
              </Link>
            </div>

            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '2.5rem' }}>🫁</span>
              </div>

              <h1 style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Fisioterapia Respiratória
              </h1>

              <p style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Domine as técnicas de avaliação e tratamento respiratório, desde cuidados básicos até ventilação mecânica em UTI
              </p>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <Play style={{ width: '20px', height: '20px' }} />
                  Começar Estudos
                </button>

                <button style={{
                  background: 'white',
                  color: '#0891b2',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
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
                  e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}>
                  <Download style={{ width: '20px', height: '20px' }} />
                  Material Gratuito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{
        background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
        minHeight: '100vh'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem'
        }}>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {[
              { number: '4', label: 'Módulos', icon: '📚' },
              { number: '32', label: 'Semanas', icon: '📅' },
              { number: '50+', label: 'Técnicas', icon: '🔧' },
              { number: '100+', label: 'Casos Clínicos', icon: '🏥' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#0891b2',
                  marginBottom: '0.25rem'
                }}>{stat.number}</div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Modules */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#1f2937',
              marginBottom: '2rem'
            }}>
              📚 Módulos de Estudo
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {modules.map((module, index) => (
                <div key={module.id} style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginRight: '1rem'
                      }}>
                        {module.icon}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '0.5rem'
                        }}>{module.title}</h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>
                          <span>⏱️ {module.duration}</span>
                          <span>📊 {module.level}</span>
                        </div>
                      </div>
                    </div>
                    <span style={{
                      background: '#e0f2fe',
                      color: '#0891b2',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      Módulo {module.id}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '2rem'
                  }}>
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '1rem'
                      }}>📋 Tópicos Principais:</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {module.topics.map((topic, idx) => (
                          <li key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6b7280',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{
                              width: '8px',
                              height: '8px',
                              background: '#0891b2',
                              borderRadius: '50%',
                              marginRight: '0.75rem'
                            }}></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '1rem'
                      }}>🏥 Condições Abordadas:</h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {module.conditions.map((condition, idx) => (
                          <span key={idx} style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem'
                          }}>
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      {module.hasDetailedContent ? '✅ Conteúdo disponível' : '🎯 Em desenvolvimento'}
                    </div>
                    {module.hasDetailedContent && module.link ? (
                      <Link to={module.link} style={{
                        background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(8, 145, 178, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        Acessar Conteúdo
                      </Link>
                    ) : (
                      <button style={{
                        background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(8, 145, 178, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        Estudar Agora
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>🚀 Pronto para Dominar a Fisioterapia Respiratória?</h2>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Acesse conteúdo exclusivo, casos clínicos reais e técnicas atualizadas
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <Link to="/livros" style={{
                background: 'white',
                color: '#0891b2',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                <BookOpen style={{ width: '20px', height: '20px' }} />
                Ver Livros Especializados
              </Link>
              <Link to="/quiz" style={{
                border: '2px solid white',
                color: 'white',
                background: 'transparent',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#0891b2';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}>
                <Target style={{ width: '20px', height: '20px' }} />
                Fazer Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Respiratoria;
