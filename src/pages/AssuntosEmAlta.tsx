import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BookOpen, Target, Users, Lightbulb } from 'lucide-react';
import './AssuntosEmAlta.css';

const AssuntosEmAlta = () => {
  const [activeTab, setActiveTab] = useState('tendencias');

  const modules = [
    {
      id: 'fisioguia',
      icon: '🔥',
      title: 'Guia Interativo de Fisioterapia',
      description: 'Tópicos atuais e tendências emergentes em fisioterapia, guias interativos e conteúdos em destaque.',
      href: '/fisioguia',
      color: 'orange',
      features: ['Guia Interativo', 'Tendências 2025', 'Conceitos Atuais', 'Inovações'],
      articles: '15+ artigos',
      cases: '8+ casos'
    },
    {
      id: 'tendencias-2025',
      icon: '📈',
      title: 'Tendências 2025 em Fisioterapia',
      description: 'As principais inovações, tecnologias e abordagens que estão moldando o futuro da fisioterapia.',
      href: '/tendencias-2025',
      color: 'blue',
      features: ['Tecnologias Emergentes', 'IA na Reabilitação', 'Telefisioterapia', 'Pesquisas Atuais'],
      articles: '12+ artigos',
      cases: '5+ casos'
    },
    {
      id: 'conceitos-atuais',
      icon: '🧠',
      title: 'Conceitos Atuais em Reabilitação',
      description: 'Conceitos fundamentais e metodologias modernas que estão revolucionando a reabilitação.',
      href: '/conceitos-atuais',
      color: 'purple',
      features: ['Neuroplasticidade', 'Biomecânica Avançada', 'Terapia Manual', 'Evidências Científicas'],
      articles: '18+ artigos',
      cases: '10+ casos'
    },
    {
      id: 'inovacoes-tecnologicas',
      icon: '⚡',
      title: 'Inovações Tecnológicas',
      description: 'Ferramentas e tecnologias de ponta que estão transformando a prática fisioterapêutica.',
      href: '/inovacoes-tecnologicas',
      color: 'green',
      features: ['Realidade Virtual', 'Robótica', 'Wearables', 'Apps de Saúde'],
      articles: '20+ artigos',
      cases: '12+ casos'
    }
  ];

  const colorSchemes = {
    orange: {
      accent: '#ea580c',
      light: 'rgba(249, 115, 22, 0.1)',
      border: 'rgba(249, 115, 22, 0.2)',
      iconBg: 'rgba(249, 115, 22, 0.1)'
    },
    blue: {
      accent: '#2563eb',
      light: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(59, 130, 246, 0.2)',
      iconBg: 'rgba(59, 130, 246, 0.1)'
    },
    purple: {
      accent: '#9333ea',
      light: 'rgba(168, 85, 247, 0.1)',
      border: 'rgba(168, 85, 247, 0.2)',
      iconBg: 'rgba(168, 85, 247, 0.1)'
    },
    green: {
      accent: '#16a34a',
      light: 'rgba(34, 197, 94, 0.1)',
      border: 'rgba(34, 197, 94, 0.2)',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }
  };

  return (
    <div className="assuntos-alta-page">
      {/* Header */}
      <header className="assuntos-alta-header">
        <div className="assuntos-alta-nav">
          <Link to="/" className="assuntos-alta-back">
            ← Voltar para Home
          </Link>
          <h1 className="assuntos-alta-title">Assuntos em Alta</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="assuntos-alta-hero">
        <div className="assuntos-alta-container">
          <div className="assuntos-alta-hero-content">
            <div className="assuntos-alta-badge">
              <TrendingUp className="assuntos-alta-badge-icon" />
              <span>CONTEÚDO EM DESTAQUE</span>
            </div>
            
            <h2 className="assuntos-alta-hero-title">
              Explore os <span className="assuntos-alta-highlight">Tópicos Mais Atuais</span> da Fisioterapia
            </h2>
            
            <p className="assuntos-alta-hero-description">
              Descubra as últimas tendências, conceitos inovadores e tecnologias emergentes 
              que estão moldando o futuro da reabilitação e da fisioterapia.
            </p>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="assuntos-alta-modules">
        <div className="assuntos-alta-container">
          <div className="assuntos-alta-modules-grid">
            {modules.map((module, index) => {
              const colorScheme = colorSchemes[module.color];
              
              return (
                <Link
                  key={module.id}
                  to={module.href}
                  className="assuntos-alta-module-card"
                  style={{ borderColor: colorScheme.border }}
                >
                  {/* Module Number */}
                  <div 
                    className="assuntos-alta-module-number"
                    style={{ color: colorScheme.accent }}
                  >
                    0{index + 1}
                  </div>
                  
                  {/* Module Icon */}
                  <div 
                    className="assuntos-alta-module-icon"
                    style={{ background: colorScheme.iconBg }}
                  >
                    <span style={{ fontSize: '2rem' }}>{module.icon}</span>
                  </div>
                  
                  {/* Module Content */}
                  <div className="assuntos-alta-module-content">
                    <h3 className="assuntos-alta-module-title">
                      {module.title}
                    </h3>
                    
                    <p className="assuntos-alta-module-description">
                      {module.description}
                    </p>
                    
                    {/* Features */}
                    <div className="assuntos-alta-module-features">
                      <span className="assuntos-alta-features-label">Destaques:</span>
                      <div className="assuntos-alta-features-list">
                        {module.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="assuntos-alta-feature-item">
                            <Target 
                              className="assuntos-alta-feature-icon" 
                              style={{ color: colorScheme.accent }}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {module.features.length > 3 && (
                          <span className="assuntos-alta-feature-more">
                            +{module.features.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Module Footer */}
                  <div className="assuntos-alta-module-footer">
                    <div className="assuntos-alta-module-stats">
                      <div className="assuntos-alta-stat">
                        <BookOpen className="assuntos-alta-stat-icon" />
                        <span>{module.articles}</span>
                      </div>
                      <div className="assuntos-alta-stat">
                        <Target className="assuntos-alta-stat-icon" />
                        <span>{module.cases}</span>
                      </div>
                    </div>
                    
                    <div 
                      className="assuntos-alta-action-btn"
                      style={{ color: colorScheme.accent, borderColor: colorScheme.border }}
                    >
                      <span>Explorar</span>
                      <ArrowRight className="assuntos-alta-arrow" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="assuntos-alta-cta">
        <div className="assuntos-alta-container">
          <div className="assuntos-alta-cta-content">
            <h3 className="assuntos-alta-cta-title">
              Mantenha-se Atualizado
            </h3>
            <p className="assuntos-alta-cta-description">
              Acompanhe as últimas tendências e inovações em fisioterapia. 
              Nosso conteúdo é atualizado regularmente para manter você na vanguarda da profissão.
            </p>
            <Link to="/" className="assuntos-alta-cta-button">
              Voltar para Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssuntosEmAlta;
