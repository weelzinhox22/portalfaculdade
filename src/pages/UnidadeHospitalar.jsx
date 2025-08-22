import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Building2, Heart, Stethoscope, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnidadeHospitalar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({
    title: false,
    description: false,
    buttons: false,
    tags: false,
    image: false
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Staggered animations
    const timeouts = [
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, title: true })), 300),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, description: true })), 600),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, buttons: true })), 900),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, tags: true })), 1200),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, image: true })), 400),
    ];

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  const modules = [
    {
      id: 0,
      title: 'Normas de Biossegurança 1',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      topics: [
        'Fundamentos da biossegurança hospitalar',
        'NR 32 e legislação aplicada',
        'Classificação de riscos laborais',
        'CCIH e controle de infecção'
      ],
      duration: '4 semanas',
      level: 'Fundamental',
      departments: ['Todos os Setores', 'UTI', 'Enfermarias', 'Ambulatório'],
      hasDetailedContent: true,
      link: '/normas-biosseguranca-1'
    },
    {
      id: 1,
      title: 'Avaliação fisioterapêutica e monitorização do paciente em UTI',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Anamnese no ambiente hospitalar',
        'Avaliação de sinais vitais',
        'Exame físico e ausculta pulmonar',
        'Monitorização multiparâmetros'
      ],
      duration: '5 semanas',
      level: 'Avançado',
      departments: ['UTI Geral', 'UTI Cardiológica', 'UTI Neurológica'],
      hasDetailedContent: true,
      link: '/avaliacao-uti'
    },
    {
      id: 5,
      title: 'Fisioterapia em UTI',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      topics: [
        'Fisioterapia em ventilação mecânica',
        'Mobilização precoce',
        'Prevenção de complicações',
        'Desmame ventilatório'
      ],
      duration: '10 semanas',
      level: 'Avançado',
      departments: ['UTI Geral', 'UTI Cardiológica', 'UTI Neurológica', 'UTI Pediátrica']
    },
    {
      id: 2,
      title: 'Cardiologia Hospitalar',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      topics: [
        'Reabilitação cardíaca',
        'Pós-operatório cardiovascular',
        'Exercícios terapêuticos',
        'Monitorização cardíaca'
      ],
      duration: '8 semanas',
      level: 'Intermediário',
      departments: ['Cardiologia', 'Cirurgia Cardíaca', 'Hemodinâmica', 'Marcapasso']
    },
    {
      id: 3,
      title: 'Pneumologia e Respiratória',
      icon: <Stethoscope className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Técnicas de higiene brônquica',
        'Reexpansão pulmonar',
        'Treinamento muscular respiratório',
        'Oxigenoterapia'
      ],
      duration: '12 semanas',
      level: 'Especialista',
      departments: ['Pneumologia', 'Cirurgia Torácica', 'Emergência', 'Oncologia']
    },
    {
      id: 4,
      title: 'Ortopedia Hospitalar',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      topics: [
        'Pós-operatório ortopédico',
        'Mobilização articular',
        'Fortalecimento muscular',
        'Marcha assistida'
      ],
      duration: '6 semanas',
      level: 'Básico',
      departments: ['Ortopedia', 'Traumatologia', 'Coluna', 'Artroscopia']
    }
  ];

  const materials = [
    {
      id: 1,
      title: 'Manual de Fisioterapia Hospitalar',
      description: 'Protocolos e diretrizes completas para atuação fisioterapêutica no ambiente hospitalar, incluindo normas de segurança e controle de infecção.',
      type: 'PDF',
      icon: <FileText className="w-6 h-6" />,
      size: '35.2 MB',
      pages: '420',
      downloads: '4.2k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Protocolos Hospitalares'
    },
    {
      id: 2,
      title: 'Técnicas Avançadas de UTI',
      description: 'Demonstrações práticas de técnicas especializadas em unidade de terapia intensiva, incluindo ventilação mecânica e mobilização precoce.',
      type: 'Vídeo',
      icon: <Video className="w-6 h-6" />,
      duration: '5h 30min',
      quality: '4K',
      downloads: '3.8k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Técnicas Especializadas'
    },
    {
      id: 3,
      title: 'Sistema de Protocolos Integrados',
      description: 'Plataforma interativa com protocolos padronizados para diferentes setores hospitalares, com fluxogramas e tomada de decisão clínica.',
      type: 'Interativo',
      icon: <ExternalLink className="w-6 h-6" />,
      protocols: '80+',
      departments: '15',
      downloads: '5.1k',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Sistema Integrado'
    }
  ];

  const quickStats = [
    { label: 'Pacientes/Ano', value: '15k+', icon: '🏥' },
    { label: 'Setores Hospitalares', value: '18', icon: '🏢' },
    { label: 'Protocolos Ativos', value: '80+', icon: '📋' },
    { label: 'Taxa de Alta', value: '92%', icon: '✅' }
  ];

  const hospitalDepartments = [
    { name: 'UTI Geral', icon: '🏥', level: 'Crítico', color: 'bg-red-100 text-red-700' },
    { name: 'Cardiologia', icon: '❤️', level: 'Especializado', color: 'bg-pink-100 text-pink-700' },
    { name: 'Pneumologia', icon: '🫁', level: 'Especializado', color: 'bg-blue-100 text-blue-700' },
    { name: 'Ortopedia', icon: '🦴', level: 'Cirúrgico', color: 'bg-green-100 text-green-700' },
    { name: 'Neurologia', icon: '🧠', level: 'Crítico', color: 'bg-purple-100 text-purple-700' },
    { name: 'Emergência', icon: '🚨', level: 'Urgência', color: 'bg-orange-100 text-orange-700' }
  ];

  const criticalCare = [
    { condition: 'Ventilação Mecânica', prevalence: '78%', icon: '🫁', complexity: 'Alta' },
    { condition: 'Pós-Cirúrgico', prevalence: '65%', icon: '🔪', complexity: 'Média' },
    { condition: 'Mobilização Precoce', prevalence: '89%', icon: '🚶‍♂️', complexity: 'Média' },
    { condition: 'Desmame Ventilatório', prevalence: '45%', icon: '💨', complexity: 'Alta' },
    { condition: 'Reabilitação Cardíaca', prevalence: '52%', icon: '❤️', complexity: 'Alta' },
    { condition: 'Higiene Brônquica', prevalence: '71%', icon: '🫁', complexity: 'Média' }
  ];

  const equipments = [
    { name: 'Ventilador Mecânico', usage: '95%', icon: '🔧' },
    { name: 'Monitor Cardíaco', usage: '100%', icon: '📊' },
    { name: 'Oxímetro', usage: '100%', icon: '🩺' },
    { name: 'Aspirador', usage: '85%', icon: '💨' },
    { name: 'Desfibrilador', usage: '60%', icon: '⚡' },
    { name: 'Eletrocardiograma', usage: '80%', icon: '📈' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page" style={{ paddingTop: 0 }}>
      {/* Hero Section */}
      <section className="specialty-hero">
        <div 
          className="hero-background"
          style={{
            minHeight: '95vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -2
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            {/* Fallback para navegadores que não suportam MP4 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/videos/hero.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </video>

          {/* Dark overlay for text readability */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
              zIndex: -1
            }}
          />
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
                      display: 'flex',
              flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
              gap: '2.5rem'
            }}>
                    <h1 style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                      fontWeight: '800', 
                      color: 'white', 
                      margin: 0, 
                lineHeight: '1.2',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                transform: animatedElements.title ? 'translateY(0)' : 'translateY(30px)',
                opacity: animatedElements.title ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}>
                Fisioterapia em<br />
                <span style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.8))'
                }}>
                  Unidade Hospitalar
                </span>
              </h1>
              
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                transform: animatedElements.buttons ? 'translateY(0)' : 'translateY(30px)',
                opacity: animatedElements.buttons ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
              }}>
                <button 
                  className="btn btn-primary" 
                  style={{ 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', 
                    color: '#0d9488',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.25)';
                  }}
                >
                    <Play className="w-5 h-5" />
                    Começar Especialização
                  </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    color: 'white', 
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                    <Download className="w-5 h-5" />
                    Protocolos UTI
                  </button>
                </div>

              {/* Minimal Department Tags */}
              <div style={{
                transform: animatedElements.tags ? 'translateY(0)' : 'translateY(20px)',
                opacity: animatedElements.tags ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s'
              }}>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.75rem',
                  justifyContent: 'center'
                }}>
                  {hospitalDepartments.slice(0, 4).map((dept, index) => (
                      <span
                        key={dept.name}
                        style={{
                          padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '1.5rem',
                        fontSize: '0.85rem',
                          fontWeight: '500',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        animation: `slideInUp 0.4s ease-out ${0.1 * index}s both`
                        }}
                      >
                      {dept.name}
                      </span>
                    ))}
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .specialty-hero .container > div {
              text-align: center !important;
            }
            
            .specialty-hero h1 {
              font-size: clamp(2.5rem, 8vw, 4rem) !important;
            }
            
            .specialty-hero button {
              padding: 1rem 2rem !important;
              font-size: 1rem !important;
            }
          }
        `}</style>
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
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--teal-600)', marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--neutral-600)', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Care Overview */}
      <section style={{ padding: '2rem 0', background: 'var(--teal-50)', borderBottom: '1px solid var(--teal-200)' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--teal-800)' }}>
              Principais Intervenções em Ambiente Hospitalar
            </h3>
            <p style={{ textAlign: 'center', color: 'var(--teal-600)', fontSize: '0.9rem' }}>
              Prevalência e complexidade das principais técnicas utilizadas
            </p>
              </div>
              
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {criticalCare.map((care) => (
              <div
                key={care.condition}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  border: '1px solid var(--teal-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{care.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {care.condition}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--teal-600)', marginBottom: '0.25rem' }}>
                  {care.prevalence}
                </div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.5rem',
                  background: care.complexity === 'Alta' ? 'var(--red-100)' : 'var(--yellow-100)',
                  color: care.complexity === 'Alta' ? 'var(--red-700)' : 'var(--yellow-700)'
                }}>
                  {care.complexity}
                </div>
              </div>
            ))}
              </div>
              
          {/* Equipment Usage */}
          <div>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--teal-800)' }}>
              Equipamentos Mais Utilizados
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {equipments.map((equipment) => (
                <div
                  key={equipment.name}
                  style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    border: '1px solid var(--teal-200)'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{equipment.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {equipment.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--teal-600)' }}>
                    {equipment.usage}
                  </div>
                </div>
              ))}
            </div>
              </div>
            </div>
          </section>

      {/* Modules Section */}
      <section style={{ padding: '4rem 0', background: 'var(--neutral-50)' }}>
        <div className="container">
          <h2 className="section-title">Módulos Especializados</h2>
          <p className="section-subtitle">
            Formação completa em fisioterapia hospitalar, desde cuidados básicos até técnicas críticas avançadas
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

                {/* Department Tags */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', marginBottom: '0.5rem' }}>
                    Setores de Aplicação:
                    </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {module.departments.map((dept) => (
                      <span
                        key={dept}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.75rem',
                          background: 'var(--teal-50)',
                          color: 'var(--teal-600)',
                          borderRadius: '1rem',
                          border: '1px solid var(--teal-200)'
                        }}
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
                
                {module.hasDetailedContent && module.link ? (
                  <Link
                    to={module.link}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: `linear-gradient(135deg, ${module.color.split(' ')[1]} 0%, ${module.color.split(' ')[3]} 100%)`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    <BookOpen className="w-4 h-4" />
                    Ver Conteúdo Completo
                  </Link>
                ) : (
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
                )}
              </div>
            ))}
              </div>
            </div>
          </section>


      {/* Materials Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Recursos Hospitalares</h2>
          <p className="section-subtitle">
            Materiais especializados para atuação segura e eficaz no ambiente hospitalar
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
                      background: 'rgba(13, 148, 136, 0.9)',
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
                        background: 'var(--teal-100)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--teal-600)'
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
              
                  <button className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)' }}>
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

export default UnidadeHospitalar;