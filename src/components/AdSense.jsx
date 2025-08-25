import React, { useEffect } from 'react';

const AdSense = ({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  style = {},
  className = '',
  size = 'medium' // 'small', 'medium', 'large', 'banner'
}) => {
  useEffect(() => {
    try {
      // Carrega o script do AdSense se ainda não foi carregado
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
      
      // Inicializa o anúncio
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Erro ao carregar AdSense:', error);
    }
  }, []);

  // Define estilos baseados no tamanho
  const sizeStyles = {
    small: { minHeight: '100px', maxWidth: '300px' },
    medium: { minHeight: '250px', maxWidth: '100%' },
    large: { minHeight: '400px', maxWidth: '100%' },
    banner: { minHeight: '90px', maxWidth: '100%' }
  };

  const adStyle = {
    display: 'block',
    textAlign: 'center',
    margin: '1rem auto',
    padding: '1rem',
    background: 'rgba(248, 250, 252, 0.8)',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    borderRadius: '0.75rem',
    ...sizeStyles[size],
    ...style
  };

  return (
    <div className={`adsense-container ${className}`} style={adStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...sizeStyles[size] }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot || "XXXXXXXXXX"}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
      
      {/* Fallback para desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          border: '2px dashed #cbd5e1',
          borderRadius: '0.5rem',
          padding: '2rem',
          color: '#64748b',
          fontSize: '0.875rem',
          fontWeight: '500',
          textAlign: 'center',
          ...sizeStyles[size]
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📢</div>
            <div>Espaço para Anúncio AdSense</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>
              Tamanho: {size} | Slot: {slot || 'default'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdSense;
