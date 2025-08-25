import React from 'react';
import AdSense from './AdSense';

const InlineAd = ({ 
  position = 'center', // 'center', 'left', 'right'
  size = 'medium',
  slot,
  style = {},
  className = '',
  showLabel = true
}) => {
  const containerStyle = {
    margin: '3rem 0',
    display: 'flex',
    justifyContent: position === 'center' ? 'center' : position,
    ...style
  };

  return (
    <div className={`inline-ad ${className}`} style={containerStyle}>
      <div style={{
        position: 'relative',
        maxWidth: size === 'banner' ? '100%' : '600px',
        width: '100%'
      }}>
        {showLabel && (
          <div style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Publicidade
          </div>
        )}
        
        <AdSense 
          size={size}
          slot={slot}
          style={{ margin: 0 }}
        />
      </div>
    </div>
  );
};

export default InlineAd;
