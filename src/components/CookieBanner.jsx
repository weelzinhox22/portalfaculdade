import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Mostrar banner após 2 segundos
      setTimeout(() => {
        setShowBanner(true);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

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
        border: '1px solid #e5e7eb',
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
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
            Cookies e Privacidade
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Melhoramos sua experiência com cookies
          </p>
        </div>
      </div>

      <p style={{
        color: '#4b5563',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        marginBottom: '1.5rem'
      }}>
        Usamos cookies para otimizar sua navegação e personalizar conteúdo.
        <a
          href="/politica-cookies"
          style={{ color: '#0ea5e9', textDecoration: 'underline' }}
        >
          Saiba mais
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
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Check size={16} />
          Aceitar Cookies
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
            cursor: 'pointer'
          }}
        >
          Rejeitar
        </button>

        <button
          onClick={() => setShowBanner(false)}
          style={{
            background: 'transparent',
            color: '#6b7280',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
