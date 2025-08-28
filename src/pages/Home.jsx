import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, BookOpen, Users, Target, Award, Play, Download, Star, Quote, CheckCircle, TrendingUp, Users2, Globe, Shield, Calculator, Lightbulb, HelpCircle } from 'lucide-react';
import Newsletter from '../components/Newsletter';
import AdSense from '../components/AdSense';
import NewsletterBanner from '../components/NewsletterBanner';
import useMobile from '../hooks/useMobile';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { isAuthenticated } = useAuth();

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }

      @keyframes glow {
        0%, 100% { box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1); }
        50% { box-shadow: 0 8px 32px rgba(255, 255, 255, 0.3); }
      }

      @keyframes slideInLeft {
        0% { transform: translateX(-100px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }

      @keyframes slideInRight {
        0% { transform: translateX(100px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }

      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const subjects = [
    {
      id: 'saude-atleta',
      icon: '🏃‍♂️',
      title: 'Fisioterapia na Saúde do Atleta',
      description: 'Prevenção e reabilitação de lesões esportivas, otimização de performance e técnicas específicas para atletas.',
      href: '/saude-atleta',
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      modules: ['Biomecânica Esportiva', 'Prevenção de Lesões', 'Reabilitação Atlética', 'Performance']
    },
    {
      id: 'unidade-hospitalar',
      icon: '🏥',
      title: 'Fisioterapia em Unidade Hospitalar',
      description: 'Cuidados intensivos, reabilitação precoce, mobilização e técnicas especializadas no ambiente hospitalar.',
      href: '/unidade-hospitalar',
      color: 'teal',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      modules: ['UTI', 'Cardiologia', 'Pneumologia', 'Mobilização Precoce']
    },
    {
      id: 'saude-idoso',
      icon: '👴',
      title: 'Fisioterapia na Saúde do Idoso',
      description: 'Envelhecimento ativo, prevenção de quedas, manutenção da funcionalidade e qualidade de vida na terceira idade.',
      href: '/saude-idoso',
      color: 'green',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      modules: ['Envelhecimento', 'Prevenção de Quedas', 'Reabilitação Geriátrica', 'Qualidade de Vida']
    },
    {
      id: 'neurofuncional',
      icon: '🧠',
      title: 'Fisioterapia Neurofuncional',
      description: 'Reabilitação neurológica, plasticidade cerebral, técnicas de neurorreabilitação e recuperação funcional.',
      href: '/neurofuncional',
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      modules: ['Neuroanatomia', 'Patologias Neurológicas', 'Avaliação', 'Neurorreabilitação']
    }
  ];

  const stats = [
    { number: '4', label: 'Especialidades', icon: '📚' },
    { number: '100+', label: 'Materiais Didáticos', icon: '📖' },
    { number: '50+', label: 'Casos Clínicos', icon: '🎯' },
    { number: '24/7', label: 'Acesso Disponível', icon: '⏰' }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Conteúdo Acadêmico de Excelência',
      description: 'Material didático estruturado por especialistas, baseado nas mais recentes evidências científicas.',
      highlight: 'Atualizado semanalmente'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Aprendizado Prático',
      description: 'Casos clínicos reais, simulações e exercícios interativos para aplicação imediata.',
      highlight: '100+ casos práticos'
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: 'Comunidade Ativa',
      description: 'Conecte-se com outros estudantes e profissionais da fisioterapia.',
      highlight: '+5.000 membros'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Certificação Reconhecida',
      description: 'Certificados válidos e reconhecidos pelas principais instituições de ensino.',
      highlight: 'Válido nacionalmente'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Ferramentas de Cálculo',
      description: 'Calculadoras fisioterapêuticas baseadas em evidências científicas para avaliação clínica.',
      highlight: 'IMC, Postura, Flexibilidade e mais',
      link: '/ferramentas-calculo'
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Questões da Comunidade',
      description: 'Questões criadas e aprovadas pela comunidade de fisioterapia. Contribua com seu conhecimento!',
      highlight: 'Criadas por estudantes e profissionais',
      link: '/questoes-comunidade'
    }
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Estudante de Fisioterapia - 8º período",
      content: "Este portal revolucionou meus estudos! O conteúdo é extremamente bem organizado e atualizado.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dr. Carlos Mendes",
      role: "Fisioterapeuta Especialista",
      content: "Recomendo para todos os meus alunos. A qualidade do material é incomparável.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Marina Costa",
      role: "Recém-formada",
      content: "Graças ao portal, consegui me preparar melhor para o mercado de trabalho. Excelente!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const achievements = [
    { icon: <BookOpen className="w-6 h-6" />, text: "Artigos científicos atualizados" },
    { icon: <Target className="w-6 h-6" />, text: "Casos clínicos detalhados" },
    { icon: <TrendingUp className="w-6 h-6" />, text: "Conteúdo sempre atualizado" },
    { icon: <Users2 className="w-6 h-6" />, text: "Organizado por especialidades" }
  ];

  useEffect(() => {
    // Animações GSAP podem ser adicionadas aqui
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('animate-fadeInUp');
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('🔍 Busca iniciada:', searchQuery);
    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      console.log('🚀 Navegando para:', searchUrl);
      navigate(searchUrl);
    } else {
      console.warn('⚠️ Query de busca vazia');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section Redesigned */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '6rem',
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #8b5cf6 75%, #ec4899 100%)'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.7,
          animation: 'float 20s ease-in-out infinite'
        }}></div>

        {/* Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          backdropFilter: 'blur(10px)'
        }}></div>

        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse',
          backdropFilter: 'blur(10px)'
        }}></div>

        <div style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite',
          backdropFilter: 'blur(10px)'
        }}></div>

        {/* Medical Icons Floating */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          fontSize: '2rem',
          opacity: 0.3,
          animation: 'float 10s ease-in-out infinite'
        }}>🫁</div>

        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          fontSize: '1.5rem',
          opacity: 0.3,
          animation: 'float 14s ease-in-out infinite reverse'
        }}>🦴</div>

        <div style={{
          position: 'absolute',
          top: '40%',
          left: '15%',
          fontSize: '1.8rem',
          opacity: 0.3,
          animation: 'float 16s ease-in-out infinite'
        }}>🧠</div>
        
        {/* Content Container */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10,
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div style={{
              color: 'white',
              animation: 'fadeIn 0.8s ease-out'
            }}>
              {/* Enhanced Badges */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '2rem',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  animation: 'glow 2s ease-in-out infinite alternate'
                }}>
                  <Star style={{ width: '18px', height: '18px', color: '#fbbf24' }} />
                  <span>🏆 Portal #1 em Fisioterapia</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '2rem',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)'
                }}>
                  <Users style={{ width: '18px', height: '18px', color: '#10b981' }} />
                  <span>✨ +10.000 estudantes</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0.2) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '2rem',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(245, 158, 11, 0.2)'
                }}>
                  <BookOpen style={{ width: '18px', height: '18px', color: '#f59e0b' }} />
                  <span>📚 24 Livros por R$ 15</span>
                </div>
              </div>

              {/* Enhanced Main Title */}
              <h1 style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}>
                <span style={{
                  display: 'block',
                  animation: 'slideInLeft 0.8s ease-out'
                }}>Transforme sua</span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                  animation: 'slideInRight 0.8s ease-out 0.2s both'
                }}>
                  Jornada Acadêmica
                </span>
                <span style={{ display: 'block' }}>em Fisioterapia</span>
            </h1>
              
              {/* Description */}
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '600px'
              }}>
                O portal mais completo do Brasil com conteúdo especializado, casos clínicos reais 
                e metodologia comprovada para acelerar seu aprendizado em fisioterapia.
              </p>
              
              {/* Achievement List */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {achievements.map((achievement, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {achievement.icon}
                    </div>
                    <span>{achievement.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link to="/livros" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <BookOpen style={{ width: '20px', height: '20px' }} />
                  📚 Ver Livros (R$ 15)
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '0.5rem' }} />
              </Link>
                <Link to="/quiz" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{ fontSize: '20px' }}>🧠</span>
                  Fazer Quiz Grátis
              </Link>

              <Link to="/ferramentas-calculo" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <Target style={{ width: '20px', height: '20px' }} />
                  Calculadoras
              </Link>

              <Link to="/sugestoes" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <Lightbulb style={{ width: '20px', height: '20px' }} />
                  Sugerir Tema
              </Link>

              <Link to="/questoes" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <BookOpen style={{ width: '20px', height: '20px' }} />
                  Banco de Questões
              </Link>
            </div>
          </div>
          
            {/* Right Content - Visual Elements */}
            <div style={{
              position: 'relative',
              height: '100%',
              minHeight: '500px'
            }}>
              {/* Main Image */}
              <div style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                transition: 'transform 0.5s ease'
              }}>
                <img 
                  src="https://images.pexels.com/photos/7551671/pexels-photo-7551671.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Fisioterapeuta trabalhando com paciente"
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                }}></div>
          </div>
              
              {/* Redesigned Mini Cards - Better positioned */}
              {/* Enhanced Card 1 - Artigos */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                backdropFilter: 'blur(15px)',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '0 12px 35px rgba(37, 99, 235, 0.2), 0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '2px solid rgba(37, 99, 235, 0.2)',
                minWidth: '150px',
                animation: 'float 4s ease-in-out infinite',
                zIndex: 10,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(37, 99, 235, 0.3), 0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(37, 99, 235, 0.2), 0 4px 15px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '18px',
                    filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.3))'
                  }}>📚</span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#374151'
                  }}>Artigos</span>
                </div>
                <div style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textAlign: 'center'
                }}>500+</div>
              </div>
              
              {/* Card 2 - Casos Clínicos */}
              <div style={{
                position: 'absolute',
                bottom: '80px',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '140px',
                animation: 'float 3s ease-in-out infinite 1s',
                zIndex: 10
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '16px' }}>🎯</span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#374151'
                  }}>Casos</span>
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#7c3aed',
                  textAlign: 'center'
                }}>120+</div>
              </div>
              
              {/* Card 3 - Especialidades */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '40px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '140px',
                animation: 'float 3s ease-in-out infinite 2s',
                zIndex: 10,
                transform: 'translateY(-50%)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '16px' }}>🏥</span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#374151'
                  }}>Áreas</span>
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#059669',
                  textAlign: 'center'
                }}>8+</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Funcionalidades Principais */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '700',
              color: '#92400e',
              marginBottom: '1rem'
            }}>
              🎯 Tudo que Você Precisa em Um Só Lugar
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#92400e',
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.8
            }}>
              Descubra todas as ferramentas e recursos que preparamos para acelerar seu aprendizado
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              ...(isAuthenticated ? [{
                icon: '📊',
                title: 'Meu Dashboard',
                description: 'Acompanhe seu progresso, conquistas e estatísticas de estudo',
                link: '/dashboard',
                color: '#0ea5e9',
                badge: 'SEU PAINEL',
                stats: 'Progresso • Conquistas • Metas'
              }] : []),
              {
                icon: '🧠',
                title: 'Quiz Interativo',
                description: 'Teste seus conhecimentos com 10 questões práticas de fisioterapia',
                link: '/quiz',
                color: '#8b5cf6',
                badge: 'NOVO',
                stats: '10 Questões • 5 min'
              },
              {
                icon: '📚',
                title: 'Biblioteca Digital',
                description: '24 livros digitais com desconto de até 93% - todas as especialidades',
                link: '/livros',
                color: '#f59e0b',
                badge: 'R$ 15',
                stats: '24 Livros • Todas Especialidades'
              },
              {
                icon: '🎓',
                title: 'Cursos Online',
                description: 'Cursos completos com certificado para aprimorar seus conhecimentos',
                link: '/cursos',
                color: '#8b5cf6',
                badge: 'EM BREVE',
                stats: '8 Cursos • Certificados'
              },
              {
                icon: '📝',
                title: 'Blog Educativo',
                description: 'Artigos atualizados sobre técnicas, patologias e novidades da área',
                link: '/blog',
                color: '#0ea5e9',
                badge: 'NOVO',
                stats: '12 Artigos • Busca Avançada'
              },
              {
                icon: '📧',
                title: 'Newsletter Exclusiva',
                description: 'Conteúdo exclusivo, dicas práticas e novidades direto no seu email',
                link: '/newsletter',
                color: '#10b981',
                badge: 'GRÁTIS',
                stats: '2.500+ Inscritos • Semanal'
              },
              {
                icon: '📱',
                title: 'Downloads Gratuitos',
                description: 'Materiais, planilhas e recursos exclusivos para download',
                link: '/downloads',
                color: '#10b981',
                badge: 'GRÁTIS',
                stats: 'Materiais Exclusivos'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  transform: 'translateY(-10px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                style={{
                  background: 'white',
                  borderRadius: '2rem',
                  padding: '2.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
                onClick={() => navigate(feature.link)}
              >
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: feature.color,
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em'
                }}>
                  {feature.badge}
                </div>

                <div style={{
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                  borderRadius: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {feature.icon}
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>

                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {feature.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{
                    color: feature.color,
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {feature.stats}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  fontWeight: '600',
                  fontSize: '1rem',
                  padding: '1rem',
                  background: `${feature.color}10`,
                  borderRadius: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  Explorar Agora →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Promocional de Produtos */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem'
            }}>
              🔥 Oferta Especial!
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Acesso completo ao conhecimento em fisioterapia por preços incríveis
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* Livros */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ transform: 'translateY(-5px)' }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '2rem',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/livros')}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '3rem'
                }}>
                  📚
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    24 Livros Digitais
                  </h3>
                  <div style={{
                    background: '#f59e0b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    display: 'inline-block'
                  }}>
                    Apenas R$ 15,00 cada
                  </div>
                </div>
              </div>

              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Biblioteca completa com todas as especialidades da fisioterapia.
                Desconto de até 93% do valor original!
              </p>

              <div style={{
                background: 'white',
                color: '#1e40af',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '700',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                📚 Ver Todos os Livros →
              </div>
            </motion.div>

            {/* Cursos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ transform: 'translateY(-5px)' }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '2rem',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/cursos')}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '3rem'
                }}>
                  🎓
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    Cursos Online
                  </h3>
                  <div style={{
                    background: '#8b5cf6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    display: 'inline-block'
                  }}>
                    Em Breve
                  </div>
                </div>
              </div>

              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                8 cursos completos com certificado reconhecido.
                Aprenda com os melhores professores da área!
              </p>

              <div style={{
                background: 'white',
                color: '#1e40af',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '700',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                🎓 Ver Cursos →
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <NewsletterBanner />

      {/* Enhanced Search Section */}
      <section id="search" style={{
        padding: '8rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 20%)',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
          zIndex: 0
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3.5rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#2563eb',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <Search style={{ width: '16px', height: '16px' }} />
              <span>PESQUISA AVANÇADA</span>
            </div>
            
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Encontre o Conhecimento que <span style={{ color: '#2563eb' }}>Você Precisa</span>
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Acesse nossa base de dados com mais de 10.000 artigos científicos, 
              casos clínicos e materiais didáticos especializados
            </p>
          </div>
          
          <div style={{
            marginBottom: '4rem',
            position: 'relative'
          }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '1.5rem',
                  color: '#94a3b8',
                  zIndex: 2
                }}>
                  <Search style={{ width: '24px', height: '24px' }} />
                </div>
                
            <input
              type="text"
                  placeholder="Ex: fisioterapia respiratória, lesões no joelho, AVC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      console.log('⌨️ Enter pressionado no input de busca');
                      handleSearch(e);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '1.5rem 1.5rem 1.5rem 4rem',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.125rem',
                    background: 'transparent',
                    color: '#334155'
                  }}
                />
                
                <button 
                  type="submit" 
                  onClick={(e) => {
                    console.log('🖱️ Botão de busca clicado');
                    // O evento será propagado para o form, mas vamos garantir que a busca aconteça
                    if (!searchQuery.trim()) {
                      e.preventDefault();
                      console.warn('⚠️ Busca vazia - foque no input');
                      document.querySelector('input[placeholder*="fisioterapia"]')?.focus();
                      return;
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1.25rem 2rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Buscar
                  <ArrowRight style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
              
              {/* Glow effect on focus */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '1rem',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                pointerEvents: 'none'
              }} className="search-glow"></div>
          </form>
          
            <div style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                color: '#64748b',
                fontWeight: 500,
                fontSize: '0.9rem'
              }}>Pesquisas populares:</span>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: 'center'
              }}>
                {[
                  'AVC e Reabilitação', 
                  'Lesões Esportivas', 
                  'Fisioterapia Respiratória', 
                  'Idosos e Prevenção', 
                  'Neuroplasticidade',
                  'RPG'
                ].map((suggestion) => (
              <button
                key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '0.5rem 1rem',
                      background: 'rgba(59, 130, 246, 0.08)',
                      color: '#2563eb',
                      border: '1px solid rgba(59, 130, 246, 0.15)',
                      borderRadius: '2rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontWeight: 500
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '4rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem'
              }}>📚</div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  marginBottom: '0.25rem'
                }}>10.000+</div>
                <div style={{
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}>Artigos disponíveis</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem'
              }}>🔍</div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#4f46e5',
                  marginBottom: '0.25rem'
                }}>500+</div>
                <div style={{
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}>Pesquisas diárias</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                background: 'rgba(234, 88, 12, 0.1)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem'
              }}>⚡</div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ea580c',
                  marginBottom: '0.25rem'
                }}>&lt;2s</div>
                <div style={{
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}>Resultados em tempo real</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS for focus effect */}
        <style jsx>{`
          input:focus ~ .search-glow {
            opacity: 1;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Modern Subjects Section */}
      <section style={{
        padding: '8rem 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.02) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(99, 102, 241, 0.1)',
              color: '#4f46e5',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <BookOpen style={{ width: '16px', height: '16px' }} />
              <span>ÁREAS DE ESPECIALIZAÇÃO</span>
            </div>
            
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Especialize-se nas <span style={{ color: '#4f46e5' }}>Principais Áreas</span> da Fisioterapia
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Conteúdo estruturado por especialistas, casos clínicos reais e metodologia comprovada 
              para cada área de atuação profissional
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2.5rem',
            position: 'relative'
          }}>
            {subjects.map((subject, index) => {
              // Define color schemes based on subject color
              const colorSchemes = {
                blue: {
                  bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)',
                  accent: '#2563eb',
                  light: 'rgba(59, 130, 246, 0.1)',
                  border: 'rgba(59, 130, 246, 0.2)',
                  glow: 'rgba(59, 130, 246, 0.3)',
                  iconBg: 'rgba(59, 130, 246, 0.1)'
                },
                teal: {
                  bg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(13, 148, 136, 0.02) 100%)',
                  accent: '#0d9488',
                  light: 'rgba(20, 184, 166, 0.1)',
                  border: 'rgba(20, 184, 166, 0.2)',
                  glow: 'rgba(20, 184, 166, 0.3)',
                  iconBg: 'rgba(20, 184, 166, 0.1)'
                },
                green: {
                  bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.02) 100%)',
                  accent: '#16a34a',
                  light: 'rgba(34, 197, 94, 0.1)',
                  border: 'rgba(34, 197, 94, 0.2)',
                  glow: 'rgba(34, 197, 94, 0.3)',
                  iconBg: 'rgba(34, 197, 94, 0.1)'
                },
                purple: {
                  bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(126, 34, 206, 0.02) 100%)',
                  accent: '#9333ea',
                  light: 'rgba(168, 85, 247, 0.1)',
                  border: 'rgba(168, 85, 247, 0.2)',
                  glow: 'rgba(168, 85, 247, 0.3)',
                  iconBg: 'rgba(168, 85, 247, 0.1)'
                }
              };
              
              const colorScheme = colorSchemes[subject.color] || colorSchemes.blue;
              
              return (
              <Link
                key={subject.id}
                to={subject.href}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    height: '100%'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    background: 'white',
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    border: `1px solid ${colorScheme.border}`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden'
                  }}
                  className="subject-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.background = colorScheme.bg;
                    e.currentTarget.style.borderColor = colorScheme.accent;
                    
                    // Find and animate the action button
                    const actionBtn = e.currentTarget.querySelector('.action-btn');
                    if (actionBtn) {
                      actionBtn.style.background = colorScheme.accent;
                      actionBtn.style.color = 'white';
                      actionBtn.style.transform = 'translateX(5px)';
                    }
                    
                    // Find and animate the card number
                    const cardNumber = e.currentTarget.querySelector('.card-number');
                    if (cardNumber) {
                      cardNumber.style.opacity = '0.9';
                      cardNumber.style.transform = 'translateY(0) rotate(0deg)';
                    }
                    
                    // Find and show the image overlay
                    const imageOverlay = e.currentTarget.querySelector('.image-overlay');
                    if (imageOverlay) {
                      imageOverlay.style.opacity = '0.07';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = colorScheme.border;
                    
                    // Reset action button
                    const actionBtn = e.currentTarget.querySelector('.action-btn');
                    if (actionBtn) {
                      actionBtn.style.background = 'transparent';
                      actionBtn.style.color = colorScheme.accent;
                      actionBtn.style.transform = 'translateX(0)';
                    }
                    
                    // Reset card number
                    const cardNumber = e.currentTarget.querySelector('.card-number');
                    if (cardNumber) {
                      cardNumber.style.opacity = '0.2';
                      cardNumber.style.transform = 'translateY(10px) rotate(-10deg)';
                    }
                    
                    // Hide image overlay
                    const imageOverlay = e.currentTarget.querySelector('.image-overlay');
                    if (imageOverlay) {
                      imageOverlay.style.opacity = '0';
                    }
                  }}
                  >
                    {/* Card Number */}
                    <div 
                      className="card-number"
                        style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '2rem',
                        fontSize: '5rem',
                        fontWeight: 900,
                        color: colorScheme.accent,
                        opacity: 0.2,
                        transform: 'translateY(10px) rotate(-10deg)',
                        transition: 'all 0.5s ease',
                        zIndex: 0
                      }}
                    >
                      0{index + 1}
                    </div>
                    
                    {/* Card Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      position: 'relative',
                      zIndex: 2,
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        background: colorScheme.iconBg,
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        transition: 'all 0.3s ease'
                      }}>
                        {subject.icon}
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div style={{
                      flex: 1,
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        marginBottom: '1rem',
                        lineHeight: 1.3
                      }}>
                        {subject.title}
                      </h3>
                      
                      <p style={{
                        color: '#64748b',
                        lineHeight: 1.6,
                        marginBottom: '2rem'
                      }}>
                        {subject.description}
                      </p>
                      
                      {/* Modules */}
                      <div style={{ marginBottom: '2rem' }}>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#475569',
                          display: 'block',
                          marginBottom: '0.75rem'
                        }}>
                          Módulos inclusos:
                      </span>
                        
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem'
                        }}>
                          {subject.modules.slice(0, 3).map((module, moduleIndex) => (
                            <div key={moduleIndex} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontSize: '0.875rem',
                              color: '#64748b'
                            }}>
                              <CheckCircle style={{ 
                                width: '16px', 
                                height: '16px', 
                                color: colorScheme.accent 
                              }} />
                              <span>{module}</span>
                            </div>
                          ))}
                          
                          {subject.modules.length > 3 && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontSize: '0.875rem',
                              color: colorScheme.accent,
                              fontWeight: 500
                            }}>
                              <span>+{subject.modules.length - 3} módulos</span>
                            </div>
                          )}
                        </div>
                  </div>
                </div>
                
                    {/* Card Footer */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid #e2e8f0',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '1.5rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.875rem',
                          color: '#64748b'
                        }}>
                          <BookOpen style={{ 
                            width: '16px', 
                            height: '16px', 
                            color: colorScheme.accent 
                          }} />
                          <span>25+ artigos</span>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.875rem',
                          color: '#64748b'
                        }}>
                          <Target style={{ 
                            width: '16px', 
                            height: '16px', 
                            color: colorScheme.accent 
                          }} />
                          <span>10+ casos</span>
                        </div>
                      </div>
                      
                      <div 
                        className="action-btn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: colorScheme.accent,
                          fontWeight: 600,
                          padding: '0.5rem 1rem',
                          borderRadius: '0.75rem',
                          border: `1px solid ${colorScheme.border}`,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span>Explorar</span>
                        <ArrowRight style={{ width: '18px', height: '18px' }} />
                      </div>
                    </div>
                    
                    {/* Image Overlay */}
                    <div 
                      className="image-overlay"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${subject.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0,
                        transition: 'opacity 0.5s ease',
                        zIndex: 1
                      }}
                    ></div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" style={{
        padding: '8rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.02) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(234, 88, 12, 0.1)',
              color: '#ea580c',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <Award style={{ width: '16px', height: '16px' }} />
              <span>DIFERENCIAIS</span>
            </div>
            
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Por que <span style={{ color: '#ea580c' }}>Escolher</span> Nosso Portal?
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              A plataforma mais completa e eficiente para sua formação em fisioterapia, 
              com metodologia comprovada e resultados garantidos
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.5rem',
            position: 'relative'
          }}>
            {features.map((feature, index) => {
              // Define different colors for each feature
              const colors = [
                {
                  bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)',
                  accent: '#2563eb',
                  light: 'rgba(59, 130, 246, 0.1)',
                  border: 'rgba(59, 130, 246, 0.15)',
                  iconBg: 'rgba(59, 130, 246, 0.1)'
                },
                {
                  bg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.05) 0%, rgba(194, 65, 12, 0.02) 100%)',
                  accent: '#ea580c',
                  light: 'rgba(234, 88, 12, 0.1)',
                  border: 'rgba(234, 88, 12, 0.15)',
                  iconBg: 'rgba(234, 88, 12, 0.1)'
                },
                {
                  bg: 'linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(21, 128, 61, 0.02) 100%)',
                  accent: '#16a34a',
                  light: 'rgba(22, 163, 74, 0.1)',
                  border: 'rgba(22, 163, 74, 0.15)',
                  iconBg: 'rgba(22, 163, 74, 0.1)'
                },
                {
                  bg: 'linear-gradient(135deg, rgba(126, 34, 206, 0.05) 0%, rgba(107, 33, 168, 0.02) 100%)',
                  accent: '#7e22ce',
                  light: 'rgba(126, 34, 206, 0.1)',
                  border: 'rgba(126, 34, 206, 0.15)',
                  iconBg: 'rgba(126, 34, 206, 0.1)'
                }
              ];
              
              const color = colors[index % colors.length];
              
              const FeatureCard = (
              <div
                key={index}
                style={{
                    position: 'relative',
                  background: 'white',
                  borderRadius: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: `1px solid ${color.border}`,
                    padding: '2.5rem',
                    transition: 'all 0.4s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: feature.link ? 'pointer' : 'default'
                  }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.background = color.bg;
                    
                    // Animate icon
                    const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
                    if (iconWrapper) {
                      iconWrapper.style.transform = 'scale(1.1) rotate(5deg)';
                    }
                    
                    // Show arrow
                    const arrow = e.currentTarget.querySelector('.feature-arrow');
                    if (arrow) {
                      arrow.style.opacity = '1';
                      arrow.style.transform = 'translateX(0)';
                    }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.background = 'white';
                    
                    // Reset icon
                    const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
                    if (iconWrapper) {
                      iconWrapper.style.transform = 'scale(1) rotate(0deg)';
                    }
                    
                    // Hide arrow
                    const arrow = e.currentTarget.querySelector('.feature-arrow');
                    if (arrow) {
                      arrow.style.opacity = '0';
                      arrow.style.transform = 'translateX(-10px)';
                    }
                  }}
                >
                  {/* Feature Icon */}
                  <div 
                    className="icon-wrapper"
                  style={{
                      width: '4rem',
                      height: '4rem',
                      background: color.iconBg,
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                      marginBottom: '2rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: color.accent
                    }}>
                  {feature.icon}
                </div>
                  </div>
                  
                  {/* Feature Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: color.light,
                      color: color.accent,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      marginBottom: '1rem'
                    }}>
                      {feature.highlight}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '1rem',
                      lineHeight: 1.3
                    }}>
                  {feature.title}
                </h3>
                    
                    <p style={{
                      color: '#64748b',
                      lineHeight: 1.6,
                      fontSize: '1rem'
                    }}>
                  {feature.description}
                </p>
              </div>
                  
                  {/* Feature Arrow */}
                  <div 
                    className="feature-arrow"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.5rem',
                      height: '2.5rem',
                      background: color.light,
                      borderRadius: '0.75rem',
                      color: color.accent,
                      marginTop: '2rem',
                      opacity: 0,
                      transform: 'translateX(-10px)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                  </div>
                  
                  {/* Feature Number */}
                  <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: color.accent,
                    opacity: 0.5,
                    zIndex: 1
                  }}>
                    0{index + 1}
                  </div>
                </div>
              );

              // Se o feature tem link, envolve com Link, senão retorna o card normal
              return feature.link ? (
                <Link key={index} to={feature.link} style={{ textDecoration: 'none' }}>
                  {FeatureCard}
                </Link>
              ) : FeatureCard;
            })}
          </div>
          
          {/* Additional Benefits */}
          <div style={{
            marginTop: '5rem',
            background: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            padding: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '1.5rem',
                lineHeight: 1.3
              }}>
                Benefícios <span style={{ color: '#2563eb' }}>Exclusivos</span> para Estudantes
              </h3>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                Além de todo o conteúdo de qualidade, oferecemos benefícios exclusivos para impulsionar sua carreira na fisioterapia.
              </p>
              
              <Link to="/sobre" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#2563eb',
                fontWeight: 600,
                textDecoration: 'none',
                width: 'fit-content',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = '0.75rem';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = '0.5rem';
              }}
              >
                <span>Saiba mais sobre os benefícios</span>
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </Link>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb',
                  flexShrink: 0
                }}>
                  <Download style={{ width: '20px', height: '20px' }} />
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '0.5rem'
                  }}>
                    Material para Download
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}>
                    Acesso a PDFs, apresentações e materiais de estudo para download.
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'rgba(234, 88, 12, 0.1)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ea580c',
                  flexShrink: 0
                }}>
                  <Users2 style={{ width: '20px', height: '20px' }} />
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '0.5rem'
                  }}>
                    Comunidade Exclusiva
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}>
                    Participe de grupos de discussão com outros estudantes e profissionais.
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'rgba(22, 163, 74, 0.1)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a',
                  flexShrink: 0
                }}>
                  <Award style={{ width: '20px', height: '20px' }} />
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '0.5rem'
                  }}>
                    Certificados Reconhecidos
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}>
                    Obtenha certificados válidos ao concluir os módulos de estudo.
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'rgba(126, 34, 206, 0.1)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7e22ce',
                  flexShrink: 0
                }}>
                  <Play style={{ width: '20px', height: '20px' }} />
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '0.5rem'
                  }}>
                    Vídeo-aulas Exclusivas
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}>
                    Acesso a conteúdo em vídeo com demonstrações práticas e explicações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <Newsletter variant="default" />
        </div>
      </section>

      {/* AdSense Banner */}
      <section style={{
        padding: '2rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <AdSense size="banner" slot="home-banner" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '8rem 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.02) 0%, white 100%)',
          zIndex: 0
        }}></div>
        
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '20%',
          height: '20%',
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '25%',
          height: '25%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.02) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(79, 70, 229, 0.1)',
              color: '#4f46e5',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <Quote style={{ width: '16px', height: '16px' }} />
              <span>DEPOIMENTOS</span>
            </div>
            
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              O que Nossos <span style={{ color: '#4f46e5' }}>Estudantes</span> Dizem
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Depoimentos reais de quem transformou sua carreira e aprendizado com nosso portal
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2.5rem',
            position: 'relative'
          }}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                style={{
                  position: 'relative',
                  background: 'white',
                  borderRadius: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  padding: '2.5rem',
                  transition: 'all 0.4s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  
                  // Animate quote icon
                  const quoteIcon = e.currentTarget.querySelector('.quote-icon');
                  if (quoteIcon) {
                    quoteIcon.style.transform = 'scale(1.1) rotate(5deg)';
                    quoteIcon.style.background = 'rgba(79, 70, 229, 0.2)';
                  }
                  
                  // Animate stars
                  const stars = e.currentTarget.querySelectorAll('.star');
                  if (stars) {
                    stars.forEach((star, i) => {
                      setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                          star.style.transform = 'scale(1)';
                        }, 200);
                      }, i * 100);
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  
                  // Reset quote icon
                  const quoteIcon = e.currentTarget.querySelector('.quote-icon');
                  if (quoteIcon) {
                    quoteIcon.style.transform = 'scale(1) rotate(0deg)';
                    quoteIcon.style.background = 'rgba(79, 70, 229, 0.1)';
                  }
                }}
              >
                {/* Top Border */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, #4f46e5, transparent)',
                  borderRadius: '4px 4px 0 0'
                }}></div>
                
                {/* Quote Icon */}
                <div 
                  className="quote-icon"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'rgba(79, 70, 229, 0.1)',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4f46e5',
                    marginBottom: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Quote style={{ width: '24px', height: '24px' }} />
                </div>
                
                {/* Testimonial Content */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#1e293b',
                    lineHeight: 1.7,
                    marginBottom: '2rem',
                    fontStyle: 'italic'
                  }}>
                    "{testimonial.content}"
                  </p>
                  
                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    gap: '0.25rem',
                    marginBottom: '2rem'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="star"
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          color: '#fbbf24',
                          transition: 'transform 0.2s ease'
                        }} 
                      />
                    ))}
                  </div>
                </div>
                
                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(79, 70, 229, 0.2)',
                    flexShrink: 0
                  }}>
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  
                  <div>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </h4>
                    
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.9rem'
                    }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <Link to="/sobre" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(79, 70, 229, 0.2), 0 10px 10px -5px rgba(79, 70, 229, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.1)';
            }}
            >
              <span>Ver Todos os Depoimentos</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense Medium */}
      <section style={{
        padding: '3rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <AdSense size="medium" slot="home-content" />
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.5
        }}></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <div style={{
            marginBottom: '4rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <h2 style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
            Portal em Números
          </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
            Dados que demonstram nosso compromisso com a educação de qualidade
          </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '1rem',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  {stat.icon}
                </div>
                
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                
                <div style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem',
                  fontWeight: 500
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '8rem 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            padding: '4rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              width: '5rem',
              height: '5rem',
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '7rem',
              height: '7rem',
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#2563eb',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <BookOpen style={{ width: '16px', height: '16px' }} />
              <span>COMECE AGORA</span>
            </div>
            
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Transforme sua <span style={{ color: '#2563eb' }}>Jornada</span> de Aprendizado
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto 2.5rem'
            }}>
              Explore nosso conteúdo especializado e descubra como podemos contribuir para seu desenvolvimento profissional na fisioterapia
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/saude-atleta" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.3), 0 10px 10px -5px rgba(37, 99, 235, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1)';
                }}
              >
                <BookOpen style={{ width: '24px', height: '24px' }} />
                <span>Explorar Especialidades</span>
            </Link>
              
              <Link 
                to="/contato" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'white',
                  color: '#1e293b',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#bfdbfe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <span>Entre em Contato</span>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Novo Conteúdo */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              🚀 Explore Mais Conteúdo
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Descubra todas as ferramentas e recursos que preparamos para você
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: '📚 Biblioteca Digital',
                description: 'Mais de 24 livros digitais de fisioterapia com desconto de até 93%',
                link: '/livros',
                color: '#f59e0b',
                badge: 'R$ 15'
              },
              {
                title: '🎓 Cursos Online',
                description: 'Cursos completos com certificado para aprimorar seus conhecimentos',
                link: '/cursos',
                color: '#8b5cf6',
                badge: 'Em Breve'
              },
              {
                title: '📝 Blog Educativo',
                description: 'Artigos atualizados sobre técnicas, patologias e novidades da área',
                link: '/blog',
                color: '#0ea5e9',
                badge: '12 Artigos'
              },
              {
                title: '🧠 Quiz Interativo',
                description: 'Teste seus conhecimentos com questões práticas de fisioterapia',
                link: '/quiz',
                color: '#8b5cf6',
                badge: '10 Questões'
              },
              {
                title: '📧 Newsletter',
                description: 'Receba conteúdo exclusivo e dicas práticas direto no seu email',
                link: '/newsletter',
                color: '#10b981',
                badge: 'Grátis'
              },
              {
                title: '📱 Downloads',
                description: 'Materiais gratuitos, planilhas e recursos para download',
                link: '/downloads',
                color: '#10b981',
                badge: 'Grátis'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => window.location.href = item.link}
              >
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: item.color,
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {item.badge}
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {item.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  Explorar →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;