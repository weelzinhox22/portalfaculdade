import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Neurofuncional = () => {
  const modules = [
    {
      id: 1,
      title: 'Neuroanatomia',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      topics: [
        'Sistema nervoso central',
        'Sistema nervoso periférico', 
        'Vias motoras e sensitivas',
        'Plasticidade neural'
      ],
      duration: '8 semanas',
      level: 'Básico'
    },
    {
      id: 2,
      title: 'Patologias Neurológicas',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      topics: [
        'AVC e suas sequelas',
        'Traumatismo cranioencefálico',
        'Lesão medular',
        'Doenças neurodegenerativas'
      ],
      duration: '10 semanas',
      level: 'Intermediário'
    },
    {
      id: 3,
      title: 'Avaliação Neurológica',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Escalas neurológicas',
        'Testes de função motora',
        'Avaliação sensitiva',
        'Análise de movimento'
      ],
      duration: '6 semanas',
      level: 'Intermediário'
    },
    {
      id: 4,
      title: 'Neurorreabilitação',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      topics: [
        'Conceitos neurofacilitadores',
        'Treino de marcha',
        'Reeducação motora',
        'Tecnologias assistivas'
      ],
      duration: '12 semanas',
      level: 'Avançado'
    },
    {
      id: 5,
      title: 'Neuropatia Diabética',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      topics: [
        'Fisiopatologia e Etiologia',
        'Classificação e Manifestações Clínicas',
        'Diagnóstico e Rastreamento',
        'Manejo e Abordagens Terapêuticas'
      ],
      duration: '4 semanas',
      level: 'Intermediário',
      link: '/neuropatia'
    },
    {
      id: 6,
      title: 'Neuropatia Diabética - Versão Completa',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
      topics: [
        'Guia Interativo Completo',
        'Ferramentas de IA Avançadas',
        'Versão HTML Original',
        'Recursos Educacionais Extras'
      ],
      duration: '6 semanas',
      level: 'Avançado',
      link: '/src/pages/neuropatia2.html'
    }
  ];

  const materials = [
    {
      id: 1,
      title: 'Manual de Neurorreabilitação',
      description: 'Fundamentos teóricos e práticos da fisioterapia neurológica. Conteúdo atualizado com as mais recentes evidências científicas.',
      type: 'PDF',
      icon: <FileText className="w-6 h-6" />,
      size: '15.2 MB',
      pages: '340',
      downloads: '1.2k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Técnicas de Facilitação Neuromuscular',
      description: 'Demonstrações práticas de conceitos neurofacilitadores e técnicas avançadas de reabilitação.',
      type: 'Vídeo',
      icon: <Video className="w-6 h-6" />,
      duration: '2h 45min',
      quality: '4K',
      downloads: '856',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Atlas Neuroanatômico Interativo',
      description: 'Imagens detalhadas do sistema nervoso com correlações clínicas e casos práticos.',
      type: 'Interativo',
      icon: <ExternalLink className="w-6 h-6" />,
      sections: '24',
      cases: '150+',
      downloads: '2.1k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];



  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const getButtonStyle = (color) => ({
    width: '100%',
    padding: '0.75rem',
    background: `linear-gradient(135deg, ${color.split(' ')[1]} 0%, ${color.split(' ')[3]} 100%)`,
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
  });

  return (
    <div className="specialty-page" style={{ paddingTop: '6rem' }}>
      {/* Hero Section */}
      <section className="specialty-hero">
        <div 
          className="hero-background"
          style={{
            background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Pattern */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.3
            }}
          />
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '4rem', 
              alignItems: 'center',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '2rem',
                textAlign: 'center'
              }
            }}>
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
                    🧠
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
                      Fisioterapia<br />Neurofuncional
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
                  Reabilitação neurológica, plasticidade cerebral e recuperação funcional. 
                  Domine as técnicas mais avançadas da neurorreabilitação.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" style={{ background: 'white', color: '#9333ea' }}>
                    <Play className="w-5 h-5" />
                    Começar Agora
                  </button>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                    <Download className="w-5 h-5" />
                    Download Gratuito
                  </button>
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Profissionais de Fisioterapia Neurológica"
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



      {/* Modules Section */}
      <section style={{ padding: '4rem 0', background: 'var(--neutral-50)' }}>
        <div className="container">
          <h2 className="section-title">Módulos do Curso</h2>
          <p className="section-subtitle">
            Conteúdo estruturado e progressivo para dominar a fisioterapia neurofuncional
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '1.5rem'
            }
          }}>
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
                
                {module.link ? (
                  <Link to={module.link} style={getButtonStyle(module.color)}>
                    Acessar Módulo
                  </Link>
                ) : (
                  <button 
                    style={getButtonStyle(module.color)}
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
          <h2 className="section-title">Materiais de Estudo</h2>
          <p className="section-subtitle">
            Recursos exclusivos e atualizados para acelerar seu aprendizado
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '1.5rem'
            }
          }}>
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
                      background: 'rgba(147, 51, 234, 0.9)',
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
                </div>
                
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div 
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'var(--purple-100)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--purple-600)'
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
                      {material.size && <span>{material.size}</span>}
                      {material.duration && <span>{material.duration}</span>}
                      {material.pages && <span>{material.pages} páginas</span>}
                      {material.sections && <span>{material.sections} seções</span>}
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

export default Neurofuncional;