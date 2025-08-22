import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Users, Heart, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SaudeIdoso = () => {
  const modules = [
    {
      id: 1,
      title: 'Processo de Envelhecimento',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      topics: [
        'Fisiologia do envelhecimento',
        'Alterações musculoesqueléticas',
        'Mudanças cognitivas',
        'Aspectos psicossociais'
      ],
      duration: '6 semanas',
      level: 'Básico',
      focus: ['Anatomia', 'Fisiologia', 'Psicologia', 'Social']
    },
    {
      id: 2,
      title: 'Avaliação Geriátrica',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      topics: [
        'Avaliação funcional',
        'Testes de equilíbrio',
        'Escalas geriátricas',
        'Avaliação cognitiva'
      ],
      duration: '8 semanas',
      level: 'Intermediário',
      focus: ['Escalas', 'Testes', 'Avaliação', 'Cognição']
    },
    {
      id: 3,
      title: 'Prevenção de Quedas',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      topics: [
        'Fatores de risco',
        'Treino de equilíbrio',
        'Fortalecimento muscular',
        'Modificações ambientais'
      ],
      duration: '10 semanas',
      level: 'Avançado',
      focus: ['Prevenção', 'Equilíbrio', 'Força', 'Ambiente']
    },
    {
      id: 4,
      title: 'Reabilitação Geriátrica',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-lime-500 to-lime-600',
      topics: [
        'Exercícios funcionais',
        'Treino de marcha',
        'Atividades de vida diária',
        'Adaptações e órteses'
      ],
      duration: '12 semanas',
      level: 'Especialista',
      focus: ['Funcionalidade', 'Mobilidade', 'AVD', 'Adaptação']
    }
  ];

  const materials = [
    {
      id: 1,
      title: 'Guia Completo de Fisioterapia Geriátrica',
      description: 'Manual abrangente para cuidados com idosos, incluindo protocolos de avaliação, intervenção e acompanhamento longitudinal.',
      type: 'PDF',
      icon: <FileText className="w-6 h-6" />,
      size: '22.8 MB',
      pages: '280',
      downloads: '3.1k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Fundamentação Clínica'
    },
    {
      id: 2,
      title: 'Exercícios Seguros para Idosos',
      description: 'Demonstrações detalhadas de exercícios seguros e eficazes, adaptados para diferentes níveis de funcionalidade.',
      type: 'Vídeo',
      icon: <Video className="w-6 h-6" />,
      duration: '3h 15min',
      quality: '4K',
      downloads: '2.4k',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Exercícios Práticos'
    },
    {
      id: 3,
      title: 'Escalas e Instrumentos de Avaliação',
      description: 'Coleção completa de escalas validadas para avaliação geriátrica, com instruções de aplicação e interpretação.',
      type: 'Interativo',
      icon: <ExternalLink className="w-6 h-6" />,
      scales: '35+',
      domains: '12',
      downloads: '2.8k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Instrumentos de Avaliação'
    }
  ];



  const ageGroups = [
    { name: '60-70 anos', icon: '🚶‍♂️', color: 'bg-green-100 text-green-700', focus: 'Prevenção' },
    { name: '70-80 anos', icon: '🧑‍🦽', color: 'bg-blue-100 text-blue-700', focus: 'Manutenção' },
    { name: '80+ anos', icon: '👴', color: 'bg-purple-100 text-purple-700', focus: 'Cuidado Intensivo' },
    { name: 'Frágeis', icon: '🏥', color: 'bg-orange-100 text-orange-700', focus: 'Reabilitação' }
  ];

  const commonConditions = [
    { name: 'Osteoporose', prevalence: '85%', icon: '🦴' },
    { name: 'Sarcopenia', prevalence: '72%', icon: '💪' },
    { name: 'Quedas', prevalence: '68%', icon: '⚠️' },
    { name: 'Demência', prevalence: '45%', icon: '🧠' },
    { name: 'Depressão', prevalence: '38%', icon: '😔' },
    { name: 'Diabetes', prevalence: '62%', icon: '🩺' }
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
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Gentle Background Pattern */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'float 8s ease-in-out infinite'
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
                    👴
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
                      Fisioterapia na<br />Saúde do Idoso
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
                  Envelhecimento ativo e qualidade de vida na terceira idade. 
                  Promova independência e bem-estar em todas as fases do envelhecimento.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <button className="btn btn-primary" style={{ background: 'white', color: '#16a34a' }}>
                    <Play className="w-5 h-5" />
                    Começar Especialização
                  </button>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                    <Download className="w-5 h-5" />
                    Guia do Cuidador
                  </button>
                </div>

                {/* Age Groups */}
                <div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    Faixas Etárias Atendidas:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {ageGroups.map((group) => (
                      <span
                        key={group.name}
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
                        title={group.focus}
                      >
                        {group.icon} {group.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Fisioterapeuta trabalhando com idoso"
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



      {/* Common Conditions */}
      <section style={{ padding: '2rem 0', background: 'var(--green-50)', borderBottom: '1px solid var(--green-200)' }}>
        <div className="container">
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--green-800)' }}>
            Condições Mais Prevalentes na Terceira Idade
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {commonConditions.map((condition) => (
              <div
                key={condition.name}
                style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  border: '1px solid var(--green-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{condition.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {condition.name}
              </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--green-600)' }}>
                  {condition.prevalence}
              </div>
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
            Formação abrangente em fisioterapia geriátrica, do envelhecimento saudável aos cuidados especializados
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

                {/* Focus Areas */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', marginBottom: '0.5rem' }}>
                    Áreas de Foco:
                    </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {module.focus.map((area) => (
                      <span
                        key={area}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.75rem',
                          background: 'var(--green-50)',
                          color: 'var(--green-600)',
                          borderRadius: '1rem',
                          border: '1px solid var(--green-200)'
                        }}
                      >
                        {area}
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
          <h2 className="section-title">Recursos Especializados</h2>
          <p className="section-subtitle">
            Materiais desenvolvidos especificamente para a prática geriátrica baseada em evidências
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
                      background: 'rgba(22, 163, 74, 0.9)',
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
                        background: 'var(--green-100)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--green-600)'
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
                      {material.scales && <span>📊 {material.scales} escalas</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#fbbf24' }}>★</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--neutral-700)' }}>
                        {material.rating}
                      </span>
                    </div>
              </div>
              
                  <button className="btn btn-primary" style={{ width: '100%', background: 'var(--gradient-secondary)' }}>
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

export default SaudeIdoso;