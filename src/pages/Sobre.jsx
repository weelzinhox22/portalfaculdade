import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Users,
  Award,
  Heart,
  Brain,
  Activity,
  Shield,
  Stethoscope,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Globe,
  Clock
} from 'lucide-react';

const Sobre = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: 'Conteúdo Baseado em Evidências',
      description: 'Material didático desenvolvido com base nas mais recentes pesquisas científicas e diretrizes clínicas internacionais.',
      color: '#3b82f6'
    },
    {
      icon: <Target size={32} />,
      title: 'Metodologia Prática',
      description: 'Abordagem hands-on que conecta teoria acadêmica com aplicação clínica real através de casos práticos.',
      color: '#10b981'
    },
    {
      icon: <Users size={32} />,
      title: 'Comunidade Ativa',
      description: 'Rede colaborativa de +2.500 estudantes e profissionais compartilhando conhecimento e experiências.',
      color: '#f59e0b'
    },
    {
      icon: <Award size={32} />,
      title: 'Certificação Reconhecida',
      description: 'Cursos e materiais desenvolvidos por especialistas reconhecidos no mercado de fisioterapia.',
      color: '#8b5cf6'
    }
  ];

  const stats = [
    { number: '2.500+', label: 'Estudantes Ativos', icon: <Users size={24} /> },
    { number: '150+', label: 'Materiais Didáticos', icon: <BookOpen size={24} /> },
    { number: '80+', label: 'Casos Clínicos', icon: <Activity size={24} /> },
    { number: '4.8/5', label: 'Avaliação Média', icon: <Star size={24} /> }
  ];

  const specialties = [
    {
      title: 'Fisioterapia Esportiva',
      description: 'Prevenção, tratamento e reabilitação de lesões esportivas com foco na performance e retorno seguro ao esporte.',
      icon: <Activity size={40} />,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      features: ['Biomecânica do Movimento', 'Prevenção de Lesões', 'Retorno ao Esporte']
    },
    {
      title: 'Fisioterapia Hospitalar',
      description: 'Cuidados intensivos, mobilização precoce e reabilitação no ambiente hospitalar para pacientes críticos.',
      icon: <Shield size={40} />,
      gradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      features: ['UTI e Semi-intensiva', 'Mobilização Precoce', 'Desmame Ventilatório']
    },
    {
      title: 'Gerontologia',
      description: 'Envelhecimento ativo, prevenção de quedas e manutenção da independência funcional do idoso.',
      icon: <Heart size={40} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      features: ['Prevenção de Quedas', 'Funcionalidade', 'Qualidade de Vida']
    },
    {
      title: 'Neurorreabilitação',
      description: 'Reabilitação neurológica baseada em neuroplasticidade e recuperação funcional pós-lesão.',
      icon: <Brain size={40} />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      features: ['Neuroplasticidade', 'Reabilitação Motora', 'Tecnologia Assistiva']
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Fundação do FisioNeo',
      description: 'Início do projeto com foco em democratizar o ensino de fisioterapia no Brasil.'
    },
    {
      year: '2024',
      title: 'Expansão de Conteúdo',
      description: 'Lançamento das 4 especialidades principais com mais de 100 materiais didáticos.'
    },
    {
      year: '2025',
      title: 'Comunidade Ativa',
      description: 'Mais de 2.500 estudantes e profissionais utilizando a plataforma regularmente.'
    }
  ];

  return (
    <main style={{ paddingTop: '6rem', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: 'white',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '100%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 50%)',
          transform: 'rotate(30deg)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '80%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
          transform: 'rotate(-20deg)'
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(13, 148, 136, 0.3)'
              }}>
                <Stethoscope size={40} color="white" />
              </div>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.1'
            }}>
              Transformando a Educação em
              <span style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}> Fisioterapia</span>
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#cbd5e1',
              lineHeight: '1.6',
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem auto'
            }}>
              A plataforma educacional mais completa do Brasil para estudantes e profissionais de fisioterapia.
              Conteúdo baseado em evidências, casos clínicos reais e uma comunidade ativa de aprendizado.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/auth"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(13, 148, 136, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(13, 148, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(13, 148, 136, 0.3)';
                }}
              >
                <Play size={20} />
                Começar Agora
              </Link>

              <Link
                to="/contato"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <ArrowRight size={20} />
                Saiba Mais
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              FisioNeo em Números
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Dados que comprovam nosso impacto na educação em fisioterapia
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'white',
                  padding: '3rem 2rem',
                  borderRadius: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'white'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '6rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Por que Escolher o FisioNeo?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Diferenciais que fazem da nossa plataforma a melhor escolha para sua educação
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
                  padding: '3rem 2rem',
                  borderRadius: '2rem',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle, ${feature.color}15 0%, transparent 50%)`,
                  transform: 'rotate(45deg)'
                }} />

                <div style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: feature.color,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    color: 'white',
                    boxShadow: `0 10px 25px ${feature.color}40`
                  }}>
                    {feature.icon}
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>

                  <p style={{
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Especialidades Disponíveis
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Cobertura completa das principais áreas da fisioterapia moderna
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'white',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  background: specialty.gradient,
                  padding: '2rem',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {specialty.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    {specialty.title}
                  </h3>
                </div>

                <div style={{ padding: '2rem' }}>
                  <p style={{
                    color: '#64748b',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                  }}>
                    {specialty.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    {specialty.features.map((feature, featureIndex) => (
                      <div key={featureIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <CheckCircle size={16} color="#10b981" />
                        <span style={{
                          color: '#374151',
                          fontSize: '0.95rem',
                          fontWeight: '500'
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>
              Pronto para Transformar sua Carreira?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              lineHeight: '1.6',
              marginBottom: '3rem'
            }}>
              Junte-se a mais de 2.500 fisioterapeutas que já estão evoluindo com o FisioNeo.
              Comece hoje mesmo sua jornada de aprendizado baseado em evidências.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/auth"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(13, 148, 136, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(13, 148, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(13, 148, 136, 0.3)';
                }}
              >
                <TrendingUp size={20} />
                Começar Gratuitamente
              </Link>

              <Link
                to="/contato"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Globe size={20} />
                Falar Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Sobre;