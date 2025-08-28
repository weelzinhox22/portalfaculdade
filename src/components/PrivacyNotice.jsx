import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const PrivacyNotice = () => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou
    const privacyConsent = localStorage.getItem('privacyConsent');
    if (!privacyConsent) {
      // Mostrar banner após 3 segundos
      setTimeout(() => {
        setShowNotice(true);
      }, 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyConsent', 'accepted');
    setShowNotice(false);
  };

  const handleReject = () => {
    localStorage.setItem('privacyConsent', 'rejected');
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        right: '2rem',
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        border: '2px solid #0ea5e9',
        maxWidth: '500px',
        margin: '0 auto',
        animation: 'slideUp 0.5s ease-out'
      }}
    >
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          fontSize: '2rem'
        }}>
          🍪
        </div>
        <div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.25rem'
          }}>
            Otimização da Navegação
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Melhoramos sua experiência no site
          </p>
        </div>
        
        <button
          onClick={() => setShowNotice(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '0.25rem',
            marginLeft: 'auto'
          }}
        >
          <X size={16} />
        </button>
      </div>

      <p style={{
        color: '#4b5563',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        marginBottom: '1.5rem'
      }}>
        Usamos tecnologias para otimizar sua navegação, personalizar conteúdo e melhorar sua experiência. 
        <a 
          href="/politica-cookies" 
          style={{ 
            color: '#0ea5e9', 
            textDecoration: 'underline',
            fontWeight: '600'
          }}
        >
          Ver política completa
        </a>
      </p>

      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleAccept}
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(14, 165, 233, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <Check size={16} />
          ✅ Aceitar e Otimizar
        </button>
        
        <button
          onClick={handleReject}
          style={{
            background: 'white',
            color: '#6b7280',
            border: '2px solid #e5e7eb',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.color = '#6b7280';
          }}
        >
          Não Otimizar
        </button>
      </div>
      
      <p style={{
        fontSize: '0.75rem',
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: '1rem',
        margin: '1rem 0 0 0'
      }}>
        🔒 Seus dados estão seguros e você pode alterar suas preferências a qualquer momento
      </p>
    </div>
  );
};

export default PrivacyNotice;
