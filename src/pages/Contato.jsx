import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Mail, Send, MessageCircle, HelpCircle, 
  Bug, Lightbulb, CheckCircle, AlertTriangle, Clock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Contato = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    categoria: '',
    mensagem: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const categorias = [
    { value: 'suporte', label: 'Suporte Técnico', icon: <HelpCircle size={20} /> },
    { value: 'bug', label: 'Reportar Bug', icon: <Bug size={20} /> },
    { value: 'sugestao', label: 'Sugestão', icon: <Lightbulb size={20} /> },
    { value: 'geral', label: 'Dúvida Geral', icon: <MessageCircle size={20} /> }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      setStatus('error')
      setMessage('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setStatus('error')
      setMessage('Por favor, insira um email válido.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      // Simular envio de email (aqui você integraria com um serviço real)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular sucesso
      setStatus('success')
      setMessage('Mensagem enviada com sucesso! Responderemos em breve.')
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        categoria: '',
        mensagem: ''
      })
    } catch (error) {
      setStatus('error')
      setMessage('Erro ao enviar mensagem. Tente novamente ou envie diretamente para fisiowel@gmail.com')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '2rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#6b7280',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e5e7eb'
                e.target.style.color = '#374151'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f3f4f6'
                e.target.style.color = '#6b7280'
              }}
            >
              <ArrowLeft size={20} />
            </button>
            
            <div>
              <h1 style={{
                margin: '0 0 0.5rem 0',
                color: '#1f2937',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                Entre em Contato
              </h1>
              <p style={{
                margin: 0,
                color: '#6b7280',
                fontSize: '1.1rem'
              }}>
                Estamos aqui para ajudar! Envie sua mensagem e responderemos em breve.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '2rem',
              padding: '2rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}
          >
            <h2 style={{
              margin: '0 0 1.5rem 0',
              color: '#1f2937',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Enviar Mensagem
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Nome */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              {/* Categoria */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Categoria
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assunto */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Assunto *
                </label>
                <input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Resumo do que você precisa"
                />
              </div>

              {/* Mensagem */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Mensagem *
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Descreva detalhadamente sua dúvida, sugestão ou problema..."
                />
              </div>

              {/* Status Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: status === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: status === 'success' ? '#166534' : '#dc2626',
                    border: `1px solid ${status === 'success' ? '#bbf7d0' : '#fecaca'}`
                  }}
                >
                  {status === 'success' && <CheckCircle size={20} />}
                  {status === 'error' && <AlertTriangle size={20} />}
                  <span>{message}</span>
                </motion.div>
              )}

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (status !== 'loading') {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (status !== 'loading') {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }
                }}
              >
                {status === 'loading' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock size={20} />
                    </motion.div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'grid',
              gap: '2rem'
            }}
          >
            {/* Email Direto */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '2rem',
              padding: '2rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={24} />
                </div>
                <h3 style={{
                  margin: 0,
                  color: '#1f2937',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}>
                  Email Direto
                </h3>
              </div>
              <p style={{
                margin: '0 0 1rem 0',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Prefere enviar um email diretamente? Use nosso endereço oficial:
              </p>
              <a
                href="mailto:fisiowel@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#eff6ff'
                  e.target.style.color = '#1d4ed8'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#3b82f6'
                }}
              >
                <Mail size={20} />
                fisiowel@gmail.com
              </a>
            </div>

            {/* Tempo de Resposta */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '2rem',
              padding: '2rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={24} />
                </div>
                <h3 style={{
                  margin: 0,
                  color: '#1f2937',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}>
                  Tempo de Resposta
                </h3>
              </div>
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }} />
                  Suporte técnico: até 24 horas
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }} />
                  Dúvidas gerais: até 48 horas
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }} />
                  Sugestões: até 1 semana
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contato
