import React from 'react';
import AdSense from './AdSense';
import Newsletter from './Newsletter';

const SidebarAds = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`sidebar-ads ${className}`}
      style={{
        position: 'sticky',
        top: '6rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '300px',
        ...style
      }}
    >
      {/* Newsletter Sidebar */}
      <Newsletter variant="sidebar" />
      
      {/* Anúncio Pequeno */}
      <AdSense 
        size="small" 
        slot="sidebar-1"
        style={{ margin: 0 }}
      />
      
      {/* Card de Recursos Populares */}
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h4 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>🔥</span>
          Mais Acessados
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            'Reabilitação de LCA',
            'Fisioterapia Respiratória',
            'Avaliação Neurológica',
            'Exercícios para Idosos'
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                e.currentTarget.style.color = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                background: '#2563eb',
                borderRadius: '50%'
              }}></span>
              {item}
            </a>
          ))}
        </div>
      </div>
      
      {/* Segundo Anúncio */}
      <AdSense 
        size="small" 
        slot="sidebar-2"
        style={{ margin: 0 }}
      />
      
      {/* Card de Estatísticas */}
      <div style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        color: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}>
          10.000+
        </div>
        <div style={{
          fontSize: '0.875rem',
          opacity: 0.9
        }}>
          Artigos disponíveis
        </div>
      </div>
    </div>
  );
};

export default SidebarAds;
