import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import AdSense from './AdSense';

const StickyAd = ({ 
  position = 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  size = 'small',
  slot,
  autoHide = true,
  hideAfter = 10000, // 10 segundos
  style = {},
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosable, setIsClosable] = useState(true);

  useEffect(() => {
    // Mostra o anúncio após 3 segundos
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Auto-hide após o tempo especificado
    let hideTimer;
    if (autoHide && hideAfter > 0) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, hideAfter);
    }

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [autoHide, hideAfter]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Define posicionamento baseado na prop position
  const positionStyles = {
    'bottom-right': {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 1000
    },
    'bottom-left': {
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      zIndex: 1000
    },
    'top-right': {
      position: 'fixed',
      top: '6rem',
      right: '2rem',
      zIndex: 1000
    },
    'top-left': {
      position: 'fixed',
      top: '6rem',
      left: '2rem',
      zIndex: 1000
    }
  };

  const containerStyle = {
    ...positionStyles[position],
    maxWidth: '300px',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    overflow: 'hidden',
    animation: 'slideIn 0.5s ease-out',
    ...style
  };

  return (
    <div className={`sticky-ad ${className}`} style={containerStyle}>
      {/* Header com botão de fechar */}
      {isClosable && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1rem',
          background: 'rgba(248, 250, 252, 0.8)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.6)'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: '#64748b',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Publicidade
          </span>
          
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(226, 232, 240, 0.5)';
              e.currentTarget.style.color = '#64748b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      )}
      
      {/* Conteúdo do Anúncio */}
      <div style={{ padding: '1rem' }}>
        <AdSense 
          size={size}
          slot={slot}
          style={{ margin: 0, background: 'transparent', border: 'none', padding: 0 }}
        />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .sticky-ad {
            position: fixed !important;
            bottom: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StickyAd;
