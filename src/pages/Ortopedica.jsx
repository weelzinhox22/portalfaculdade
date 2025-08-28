import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Activity, Zap, Target, TrendingUp, Bone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ortopedica = () => {
  const isMobile = window.innerWidth <= 768;
  const modules = [
    {
      id: 1,
      title: 'Anatomia e Biomecânica',
      icon: <Bone className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      topics: [
        'Sistema musculoesquelético',
        'Biomecânica articular',
        'Cinesiologia aplicada',
        'Análise do movimento'
      ],
      duration: '8 semanas',
      level: 'Básico',
      regions: ['Coluna Vertebral', 'Membros Superiores', 'Membros Inferiores', 'Pelve']
    },
    {
      id: 2,
      title: 'Avaliação Ortopédica',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      topics: [
        'Anamnese ortopédica',
        'Testes especiais',
        'Avaliação postural',
        'Exames complementares'
      ],
      duration: '10 semanas',
      level: 'Intermediário',
      regions: ['Ombro', 'Cotovelo', 'Punho', 'Quadril', 'Joelho', 'Tornozelo']
    },
    {
      id: 3,
      title: 'Técnicas de Tratamento',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
      topics: [
        'Terapia manual ortopédica',
        'Exercícios terapêuticos',
        'Modalidades físicas',
        'Reabilitação funcional'
      ],
      duration: '12 semanas',
      level: 'Avançado',
      regions: ['Cervical', 'Torácica', 'Lombar', 'Sacroilíaca']
    },
    {
      id: 4,
      title: 'Ortopedia Esportiva',
      icon: <Target className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      topics: [
        'Lesões esportivas comuns',
        'Prevenção de lesões',
        'Retorno ao esporte',
        'Performance e reabilitação'
      ],
      duration: '10 semanas',
      level: 'Especialização',
      regions: ['LCA', 'Menisco', 'Manguito Rotador', 'Tendão de Aquiles']
    }
  ];

  const commonConditions = [
    { name: 'Lombalgia', icon: '🦴', color: 'bg-red-100 text-red-700', prevalence: '80%' },
    { name: 'Cervicalgia', icon: '🔴', color: 'bg-orange-100 text-orange-700', prevalence: '65%' },
    { name: 'Artrose', icon: '⚙️', color: 'bg-yellow-100 text-yellow-700', prevalence: '45%' },
    { name: 'Tendinites', icon: '💪', color: 'bg-green-100 text-green-700', prevalence: '35%' },
    { name: 'Hérnias Discais', icon: '🔵', color: 'bg-blue-100 text-blue-700', prevalence: '25%' },
    { name: 'Fraturas', icon: '⚠️', color: 'bg-purple-100 text-purple-700', prevalence: '15%' }
  ];

  const bodyRegions = [
    { name: 'Coluna Cervical', icon: '🔴', conditions: ['Cervicalgia', 'Hérnia Cervical', 'Whiplash'] },
    { name: 'Coluna Lombar', icon: '🟠', conditions: ['Lombalgia', 'Hérnia Lombar', 'Estenose'] },
    { name: 'Ombro', icon: '🟡', conditions: ['Manguito Rotador', 'Impacto', 'Luxação'] },
    { name: 'Joelho', icon: '🟢', conditions: ['LCA', 'Menisco', 'Condromalácia'] },
    { name: 'Quadril', icon: '🔵', conditions: ['Artrose', 'Bursite', 'Impacto Femoro'] },
    { name: 'Tornozelo', icon: '🟣', conditions: ['Entorse', 'Tendinite', 'Fascite'] }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      {/* Hero Section */}
      <section className="specialty-hero">
        <div
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
            minHeight: isMobile ? '50vh' : '60vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '3rem 0' : '4rem 0'
          }}
        >
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
                  fontWeight: '500'
                }}
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
                <span style={{ fontSize: '2.5rem' }}>🦴</span>
              </div>

              <h1 style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Fisioterapia Ortopédica
              </h1>

              <p style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Especialização completa em avaliação e tratamento de disfunções musculoesqueléticas, da coluna aos membros
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
                  backdropFilter: 'blur(10px)'
                }}>
                  <Play style={{ width: '20px', height: '20px' }} />
                  Começar Estudos
                </button>

                <button style={{
                  background: 'white',
                  color: '#ea580c',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
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
        minHeight: '100vh',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {[
              { number: '4', label: 'Módulos', icon: '📚' },
              { number: '40', label: 'Semanas', icon: '📅' },
              { number: '100+', label: 'Técnicas', icon: '🔧' },
              { number: '200+', label: 'Casos Clínicos', icon: '🏥' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#ea580c',
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

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>🚀 Domine a Fisioterapia Ortopédica!</h2>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Torne-se especialista em avaliação e tratamento musculoesquelético
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <Link to="/livros" style={{
                background: 'white',
                color: '#ea580c',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
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
                gap: '0.5rem'
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

export default Ortopedica;
