import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  LogIn, 
  Mail, 
  User, 
  Gift,
  X,
  CheckCircle,
  Download
} from 'lucide-react';
import emailService from '../services/emailService';

const LeadCaptureModal = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  item,
  onSuccess 
}) => {
  const [step, setStep] = useState('capture'); // 'capture', 'loading', 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStep('loading');
    
    try {
      // Adicionar lead ao email marketing
      const result = await emailService.addLead(
        formData.email,
        formData.name,
        'premium_download',
        [item.category, 'premium_user']
      );
      
      if (result.success) {
        // Segmentar por categoria
        await emailService.segmentLead(formData.email, item.category);
        
        // Track evento
        await emailService.trackEvent(formData.email, 'lead_capture', {
          item_id: item.id,
          item_title: item.title,
          source: 'premium_download_modal'
        });
        
        setStep('success');
        
        // Chamar callback de sucesso após 2 segundos
        setTimeout(() => {
          onSuccess && onSuccess(formData);
          onClose();
        }, 2000);
        
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao capturar lead:', error);
      alert('Erro ao processar cadastro. Tente novamente.');
      setStep('capture');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const resetModal = () => {
    setStep('capture');
    setFormData({ name: '', email: '' });
    setErrors({});
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '2rem'
        }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '2rem',
            padding: '3rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} color="#6b7280" />
          </button>

          {step === 'capture' && (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)'
              }}>
                <Crown size={40} color="white" />
              </div>
              
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Acesso Premium Liberado!
              </h2>
              
              <p style={{
                color: '#6b7280',
                marginBottom: '1rem',
                lineHeight: '1.6',
                fontSize: '1.1rem'
              }}>
                Para baixar <strong>{item?.title}</strong> e acessar nosso acervo premium, 
                precisamos apenas de algumas informações:
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  color: '#92400e',
                  margin: '0 0 1rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '700'
                }}>
                  🎁 Você também ganhará:
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: '#92400e',
                  textAlign: 'left'
                }}>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} />
                    Acesso a todos os materiais premium
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} />
                    Guia de estudos personalizado
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} />
                    Ofertas exclusivas por email
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} />
                    Grupo VIP no Telegram
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Nome completo
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User 
                      size={20} 
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af'
                      }} 
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  {errors.name && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      margin: '0.5rem 0 0 0'
                    }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail 
                      size={20} 
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af'
                      }} 
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      margin: '0.5rem 0 0 0'
                    }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    type="button"
                    onClick={handleClose}
                    style={{
                      flex: 1,
                      background: 'white',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      padding: '1rem',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 2,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Download size={20} />
                    Liberar Acesso
                  </button>
                </div>
              </form>

              <p style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginTop: '1.5rem',
                lineHeight: '1.4'
              }}>
                Ao continuar, você concorda em receber emails educativos sobre fisioterapia. 
                Você pode cancelar a qualquer momento.
              </p>
            </>
          )}

          {step === 'loading' && (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid transparent',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Liberando seu acesso...
              </h2>
              
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Estamos preparando seus materiais premium e enviando as instruções por email.
              </p>
            </>
          )}

          {step === 'success' && (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto'
              }}>
                <CheckCircle size={40} color="white" />
              </div>
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                🎉 Acesso Liberado!
              </h2>
              
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Perfeito, <strong>{formData.name}</strong>! Seu download será iniciado em instantes.
              </p>

              <div style={{
                background: '#f0fdf4',
                padding: '1rem',
                borderRadius: '1rem',
                marginBottom: '1rem'
              }}>
                <p style={{
                  color: '#166534',
                  margin: 0,
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  📧 Verifique seu email para acessar todos os materiais premium!
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
