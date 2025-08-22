import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Activity, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SaudeAtleta = () => {
  const modules = [
    {
      id: 1,
      title: 'Biomecânica Esportiva',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Anatomia e fisiologia do exercício',
        'Análise biomecânica do movimento',
        'Tipos de lesões esportivas',
        'Avaliação funcional do atleta'
      ],
      duration: '6 semanas',
      level: 'Básico',
      sports: ['Futebol', 'Basquete', 'Tênis', 'Corrida']
    },
    {
      id: 2,
      title: 'Prevenção de Lesões',
      icon: <Target className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      topics: [
        'Programas preventivos',
        'Aquecimento e alongamento',
        'Fortalecimento específico',
        'Educação do atleta'
      ],
      duration: '8 semanas',
      level: 'Intermediário',
      sports: ['Crossfit', 'Natação', 'Ciclismo', 'Atletismo']
    },
    {
      id: 3,
      title: 'Reabilitação Atlética',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      topics: [
        'Fase aguda das lesões',
        'Técnicas de terapia manual',
        'Modalidades terapêuticas',
        'Exercícios terapêuticos'
      ],
      duration: '10 semanas',
      level: 'Avançado',
      sports: ['Futebol', 'Vôlei', 'MMA', 'Rugby']
    },
    {
      id: 4,
      title: 'Performance e Retorno',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      topics: [
        'Critérios de retorno ao esporte',
        'Progressão de cargas',
        'Testes funcionais',
        'Acompanhamento contínuo'
      ],
      duration: '12 semanas',
      level: 'Especialista',
      sports: ['Todos os esportes']
    }
  ];

  const materials = [
    {
      id: 1,
      title: 'Apostila Completa - Fisioterapia Esportiva',
      description: 'Material didático completo com 300+ páginas abordando desde fundamentos até técnicas avançadas de reabilitação esportiva.',
      type: 'PDF',
      icon: <FileText className="w-6 h-6" />,
      size: '28.5 MB',
      pages: '320',
      downloads: '2.8k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Fundamentação Teórica'
    },
    {
      id: 2,
      title: 'Videoaulas - Técnicas de Avaliação',
      description: 'Série completa de vídeos demonstrando técnicas práticas de avaliação funcional e biomecânica para atletas.',
      type: 'Vídeo',
      icon: <Video className="w-6 h-6" />,
      duration: '4h 20min',
      quality: '4K',
      downloads: '1.9k',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d15f3d2d7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Avaliação Prática'
    },
    {
      id: 3,
      title: 'Protocolos de Reabilitação Esportiva',
      description: 'Guias práticos e protocolos específicos para diferentes modalidades esportivas e tipos de lesões.',
      type: 'Interativo',
      icon: <ExternalLink className="w-6 h-6" />,
      protocols: '45+',
      sports: '20+',
      downloads: '3.2k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Protocolos Clínicos'
    }
  ];

  const quickStats = [
    { label: 'Atletas Atendidos', value: '5k+', icon: '🏃‍♂️' },
    { label: 'Modalidades', value: '25+', icon: '⚽' },
    { label: 'Protocolos', value: '45+', icon: '📋' },
    { label: 'Taxa de Retorno', value: '96%', icon: '🎯' }
  ];

  const sportsCategories = [
    { name: 'Futebol', icon: '⚽', color: 'bg-green-100 text-green-700' },
    { name: 'Basquete', icon: '🏀', color: 'bg-orange-100 text-orange-700' },
    { name: 'Tênis', icon: '🎾', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Natação', icon: '🏊‍♂️', color: 'bg-blue-100 text-blue-700' },
    { name: 'Corrida', icon: '🏃‍♂️', color: 'bg-red-100 text-red-700' },
    { name: 'Ciclismo', icon: '🚴‍♂️', color: 'bg-purple-100 text-purple-700' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      {/* Hero Section */}
      <section className="specialty-hero">
        <div 
          className="hero-background"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'float 6s ease-in-out infinite'
            }}
          />
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <Link 
                  to="/" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao Portal
                </Link>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div 
                    style={{
                      width: '4rem',
                      height: '4rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    🏃‍♂️
                  </div>
                  <div>
                    <h1 style={{ 
                      fontSize: '3rem', 
                      fontWeight: '800', 
                      color: 'white', 
                      margin: 0, 
                      lineHeight: '1.1',
                      fontFamily: 'Plus Jakarta Sans, sans-serif'
                    }}>
                      Fisioterapia na<br />Saúde do Atleta
                    </h1>
                  </div>
                </div>
                
                <p style={{ 
                  fontSize: '1.2rem', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  maxWidth: '500px'
                }}>
                  Especialização em prevenção e reabilitação de lesões esportivas. 
                  Otimize a performance e acelere o retorno ao esporte.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <button className="btn btn-primary" style={{ background: 'white', color: '#2563eb' }}>
                    <Play className="w-5 h-5" />
                    Começar Treinamento
                  </button>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                    <Download className="w-5 h-5" />
                    Guia Gratuito
                  </button>
                </div>

                {/* Sports Categories */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {sportsCategories.map((sport) => (
                    <span
                      key={sport.name}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: '1rem',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {sport.icon} {sport.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Fisioterapeuta trabalhando com atleta"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section style={{ padding: '3rem 0', background: 'white', borderBottom: '1px solid var(--neutral-200)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {quickStats.map((stat, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid var(--neutral-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--blue-600)', marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--neutral-600)', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section style={{ padding: '4rem 0', background: 'var(--neutral-50)' }}>
        <div className="container">
          <h2 className="section-title">Módulos Especializados</h2>
          <p className="section-subtitle">
            Formação completa em fisioterapia esportiva, desde a prevenção até o retorno ao alto rendimento
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {modules.map((module, index) => (
              <div
                key={module.id}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--neutral-200)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div 
                    style={{
                      width: '3rem',
                      height: '3rem',
                      background: `linear-gradient(135deg, ${module.color.split(' ')[1]} 0%, ${module.color.split(' ')[3]} 100%)`,
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    {module.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--neutral-800)', margin: 0 }}>
                      {module.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>{module.duration}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>•</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>{module.level}</span>
                    </div>
                  </div>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {module.topics.map((topic, idx) => (
                    <li 
                      key={idx}
                      style={{
                        padding: '0.5rem 0',
                        color: 'var(--neutral-600)',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}
                    >
                      <span 
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.75rem',
                          width: '0.5rem',
                          height: '0.5rem',
                          background: `linear-gradient(135deg, ${module.color.split(' ')[1]} 0%, ${module.color.split(' ')[3]} 100%)`,
                          borderRadius: '50%'
                        }}
                      />
                      {topic}
                    </li>
                  ))}
                </ul>

                {/* Sports Tags */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', marginBottom: '0.5rem' }}>
                    Modalidades:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {module.sports.map((sport) => (
                      <span
                        key={sport}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.75rem',
                          background: 'var(--blue-50)',
                          color: 'var(--blue-600)',
                          borderRadius: '1rem',
                          border: '1px solid var(--blue-200)'
                        }}
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: `linear-gradient(135deg, ${module.color.split(' ')[1]} 0%, ${module.color.split(' ')[3]} 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Acessar Módulo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Materiais Exclusivos</h2>
          <p className="section-subtitle">
            Recursos práticos e atualizados para dominar a fisioterapia esportiva
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {materials.map((material) => (
              <div
                key={material.id}
                style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--neutral-200)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={material.image}
                    alt={material.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(37, 99, 235, 0.9)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {material.type}
                  </div>
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.7rem',
                      fontWeight: '500',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {material.category}
                  </div>
                </div>
                
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div 
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'var(--blue-100)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--blue-600)'
                      }}
                    >
                      {material.icon}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--neutral-800)', margin: 0 }}>
                      {material.title}
                    </h3>
                  </div>
                  
                  <p style={{ color: 'var(--neutral-600)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {material.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
                      {material.size && <span>📄 {material.size}</span>}
                      {material.duration && <span>⏱️ {material.duration}</span>}
                      {material.pages && <span>📖 {material.pages} páginas</span>}
                      {material.protocols && <span>📋 {material.protocols} protocolos</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#fbbf24' }}>★</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--neutral-700)' }}>
                        {material.rating}
                      </span>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    <Download className="w-4 h-4" />
                    {material.type === 'PDF' ? 'Download' : material.type === 'Vídeo' ? 'Assistir' : 'Acessar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaudeAtleta;