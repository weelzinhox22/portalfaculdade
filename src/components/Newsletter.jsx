import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { newsletter } from '../config/supabase';

const Newsletter = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Por favor, insira um email válido.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      console.log('📧 INICIANDO inscrição na newsletter:', email);
      console.log('📧 Função newsletter disponível:', typeof newsletter);
      console.log('📧 Função subscribe disponível:', typeof newsletter?.subscribe);

      if (!newsletter || !newsletter.subscribe) {
        throw new Error('Função newsletter não disponível');
      }

      const result = await newsletter.subscribe(email);
      console.log('📧 Resultado completo:', result);

      const { data, error, message: responseMessage } = result;

      if (error) {
        console.error('❌ Erro na inscrição:', error);
        setStatus('error');
        setMessage(`Erro ao inscrever: ${error.message || 'Tente novamente.'}`);
      } else {
        console.log('✅ Inscrição realizada:', data);
        setStatus('success');
        setMessage(responseMessage || 'Inscrição realizada com sucesso! Bem-vindo(a).');
        setEmail('');
      }
    } catch (error) {
      console.error('💥 Erro inesperado na inscrição:', error);
      setStatus('error');
      setMessage(`Erro inesperado: ${error.message}`);
    }
  };

  const baseStyles = {
    container: {
      borderRadius: '1.5rem',
      padding: '2.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      marginBottom: '0.75rem',
      textAlign: 'center',
      color: '#1e293b',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    description: {
      fontSize: '1rem',
      color: '#64748b',
      textAlign: 'center',
      maxWidth: '480px',
      margin: '0 auto 2rem auto',
      lineHeight: '1.5',
    },
    form: {
      display: 'flex',
      gap: '0.75rem',
      maxWidth: '420px',
      margin: '0 auto',
      background: 'white',
      padding: '0.375rem',
      borderRadius: '1rem',
      boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    input: {
      flex: 1,
      border: 'none',
      background: 'transparent',
      padding: '0.875rem 1rem',
      fontSize: '0.95rem',
      outline: 'none',
      color: '#334155',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      color: 'white',
      border: 'none',
      padding: '0.875rem 1.25rem',
      borderRadius: '0.75rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
    },
    statusMessage: {
      marginTop: '1.25rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
    }
  };

  const modalStyles = {
    container: {
      padding: '3rem',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '1rem',
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textAlign: 'center',
      color: '#1e293b',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    description: {
      fontSize: '1rem',
      color: '#64748b',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto 2rem auto',
      lineHeight: '1.6',
    },
    form: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '400px',
      margin: '0 auto',
      background: 'white',
      padding: '0.5rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    },
    input: {
      flex: 1,
      border: 'none',
      background: 'transparent',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      outline: 'none',
      color: '#334155',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    statusMessage: {
      marginTop: '1rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      fontWeight: '500',
    }
  };

  const compactStyles = {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      padding: '3rem',
      textAlign: 'center',
    },
    title: {
      ...baseStyles.title,
      fontSize: '2rem',
    },
    description: {
      ...baseStyles.description,
      fontSize: '1rem',
      marginBottom: '2rem',
    },
  };

  const styles = variant === 'compact' ? compactStyles : baseStyles;

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-20%',
        width: '100%',
        height: '150%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
        transform: 'rotate(30deg)',
        zIndex: 0,
      }}></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.25rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 25px -5px rgba(13, 148, 136, 0.4)'
          }}>
            <Mail size={20} />
          </div>
        </div>
        <h2 style={styles.title}>
          📚 Conteúdo Exclusivo para Fisioterapeutas
        </h2>
        <p style={styles.description}>
          <strong>Receba gratuitamente</strong> casos clínicos reais, artigos científicos atualizados
          e dicas práticas que vão acelerar sua evolução profissional.
          <span style={{ color: '#0d9488', fontWeight: '600' }}>
            +2.500 fisioterapeutas já fazem parte!
          </span>
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              background: status === 'loading'
                ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
                : 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
              transform: status === 'loading' ? 'scale(0.98)' : 'scale(1)',
            }}
            disabled={status === 'loading'}
            onMouseEnter={(e) => {
              if (status !== 'loading') {
                e.target.style.background = 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)';
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 25px -5px rgba(13, 148, 136, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (status !== 'loading') {
                e.target.style.background = 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {status === 'loading' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send size={18} />
              </motion.div>
            ) : (
              <Send size={18} />
            )}
            <span>{status === 'loading' ? 'Enviando...' : 'Quero Receber!'}</span>
          </button>
        </form>

        {/* Benefits */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '📧', text: 'Sem spam' },
            { icon: '🎯', text: 'Conteúdo relevante' },
            { icon: '🔓', text: 'Cancele quando quiser' }
          ].map((benefit, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#64748b',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '1rem' }}>{benefit.icon}</span>
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...styles.statusMessage,
              color: status === 'success' ? '#059669' : '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {status === 'success' && <CheckCircle size={18} />}
            {status === 'error' && <AlertTriangle size={18} />}
            <span>{message}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Newsletter;