import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavoritos } from '../contexts/FavoritosContext';
import { useAuth } from '../contexts/AuthContext';

const FavoritoButton = ({ 
  item, 
  size = 'medium',
  showText = false,
  className = '',
  style = {} 
}) => {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const { isAuthenticated } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isFav = isFavorito(item.titulo, item.tipo);
  
  const sizes = {
    small: { icon: 16, padding: '0.5rem' },
    medium: { icon: 20, padding: '0.75rem' },
    large: { icon: 24, padding: '1rem' }
  };
  
  const currentSize = sizes[size];

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar favoritos');
      return;
    }

    setIsAnimating(true);
    const sucesso = toggleFavorito(item);
    
    // Feedback visual
    setTimeout(() => {
      setIsAnimating(false);
      if (sucesso !== undefined) {
        // Mostrar toast de sucesso (opcional)
        console.log(sucesso ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
      }
    }, 300);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 0.3 }}
      style={{
        background: isFav 
          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
          : 'rgba(255, 255, 255, 0.9)',
        color: isFav ? 'white' : '#6b7280',
        border: isFav ? 'none' : '2px solid #e5e7eb',
        borderRadius: '50%',
        width: `${currentSize.icon + 16}px`,
        height: `${currentSize.icon + 16}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isFav 
          ? '0 4px 15px rgba(239, 68, 68, 0.4)'
          : '0 2px 4px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        ...style
      }}
      className={className}
      title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart 
        size={currentSize.icon} 
        fill={isFav ? 'currentColor' : 'none'}
        style={{
          transition: 'all 0.3s ease'
        }}
      />
      {showText && (
        <span style={{
          marginLeft: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          {isFav ? 'Favoritado' : 'Favoritar'}
        </span>
      )}
    </motion.button>
  );
};

export default FavoritoButton;
