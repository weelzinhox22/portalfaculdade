import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

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

    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulação de sucesso ou erro
    if (email.includes('error')) {
      setStatus('error');
      setMessage('Ocorreu um erro. Tente novamente.');
    } else {
      setStatus('success');
      setMessage('Inscrição realizada com sucesso! Bem-vindo(a).');
      setEmail('');
    }
  };

  const baseStyles = {
    container: {
      borderRadius: '1.5rem',
      padding: '4rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textAlign: 'center',
      color: '#1e293b',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    description: {
      fontSize: '1.125rem',
      color: '#64748b',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto 2.5rem auto',
      lineHeight: '1.6',
    },
    form: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '500px',
      margin: '0 auto',
      background: 'white',
      padding: '0.5rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
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
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.9rem',
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
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#059669'
          }}>
            <Mail size={32} />
          </div>
        </div>
        <h2 style={styles.title}>Fique por Dentro das Novidades</h2>
        <p style={styles.description}>
          Inscreva-se em nossa newsletter e receba quinzenalmente os melhores artigos, 
          casos clínicos e atualizações científicas diretamente no seu e-mail.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="seu.melhor.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            disabled={status === 'loading'}
          />
          <button type="submit" style={styles.button} disabled={status === 'loading'}>
            {status === 'loading' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send size={20} />
              </motion.div>
            ) : (
              <Send size={20} />
            )}
            <span>{status === 'loading' ? 'Enviando...' : 'Inscrever'}</span>
          </button>
        </form>
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