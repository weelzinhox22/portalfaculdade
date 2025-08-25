import React, { useState, useEffect } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('newsletterBannerDismissed');
    if (!bannerDismissed) {
      // Atraso para não sobrecarregar a primeira renderização
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('newsletterBannerDismissed', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de submissão aqui
    console.log('Email submitted:', email);
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, y: -50, padding: 0, margin: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
            color: 'white',
            padding: '1.5rem 2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Mail size={40} style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>
                  Receba nosso conteúdo em primeira mão!
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  opacity: 0.9
                }}>
                  Junte-se a milhares de estudantes e profissionais.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              minWidth: '350px'
            }}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  padding: '0.5rem 1rem',
                  color: 'white',
                  outline: 'none',
                  '::placeholder': { color: 'rgba(255, 255, 255, 0.7)' }
                }}
              />
              <button type="submit" style={{
                background: 'white',
                color: '#0d9488',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Send size={16} />
                <span>Inscrever</span>
              </button>
            </form>
            <button
              onClick={handleDismiss}
              style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white'
              }}
              aria-label="Fechar banner"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterBanner;