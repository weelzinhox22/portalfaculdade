import { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Criar versão de baixa qualidade para placeholder
    const lowQualitySrc = src.replace(/\.(jpg|jpeg|png)/i, '-low.$1');
    
    // Pré-carregar a imagem de baixa qualidade
    setCurrentSrc(lowQualitySrc);
    
    // Carregar a imagem de alta qualidade
    const highResImage = new Image();
    highResImage.src = src;
    highResImage.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <img
        src={currentSrc}
        alt={alt}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-60 blur-sm'}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default OptimizedImage;