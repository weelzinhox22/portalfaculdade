import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Mail, Lock, User, Building, GraduationCap, Calendar, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import useMobile from '../hooks/useMobile'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp, isAuthenticated } = useAuth()
  const isMobile = useMobile()
  
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nome: '',
    instituicao: '',
    curso: '',
    periodo: ''
  })

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (message) {
      setMessage('')
      setMessageType('')
    }
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage('Email e senha são obrigatórios')
      setMessageType('error')
      return false
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setMessage('As senhas não coincidem')
        setMessageType('error')
        return false
      }
      if (formData.password.length < 6) {
        setMessage('A senha deve ter pelo menos 6 caracteres')
        setMessageType('error')
        return false
      }
      if (!formData.nome.trim()) {
        setMessage('Nome é obrigatório')
        setMessageType('error')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setMessage('Email ou senha incorretos')
          setMessageType('error')
        } else {
          setMessage('Login realizado com sucesso!')
          setMessageType('success')
          // Navegação será feita pelo useEffect
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          nome: formData.nome,
          instituicao: formData.instituicao,
          curso: formData.curso,
          periodo: formData.periodo
        })
        
        if (error) {
          if (error.message.includes('already registered')) {
            setMessage('Este email já está cadastrado')
          } else {
            setMessage('Erro ao criar conta. Tente novamente.')
          }
          setMessageType('error')
        } else {
          setMessage('Conta criada com sucesso! Verifique seu email para confirmar.')
          setMessageType('success')
          setTimeout(() => {
            setIsLogin(true)
            setMessage('')
          }, 3000)
        }
      }
    } catch (err) {
      setMessage('Erro inesperado. Tente novamente.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      nome: '',
      instituicao: '',
      curso: '',
      periodo: ''
    })
    setMessage('')
    setMessageType('')
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  return (
    <div
      className="auth-page"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '2rem 1rem'
      }}
    >
      <div
        className="auth-card"
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '1000px',
          background: 'white',
          borderRadius: isMobile ? '1rem' : '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: (isLogin && !isMobile) ? '1fr 1fr' : '1fr',
          minHeight: isMobile ? 'auto' : '600px'
        }}
      >
        {/* Lado Esquerdo - Informações */}
        {isLogin && !isMobile && (
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decoração de fundo */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Bem-vindo de volta!
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                opacity: 0.9,
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Continue sua jornada de aprendizado em fisioterapia. Acesse simulados, 
                crie questões e colabore com a comunidade.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} />
                  <span>Simulados de concursos reais</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} />
                  <span>Questões da comunidade</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} />
                  <span>Progresso salvo automaticamente</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} />
                  <span>Ferramentas de cálculo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lado Direito - Formulário */}
        <div
          className="auth-form-container"
          style={{
            padding: isMobile ? '2rem 1.5rem' : '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#6b7280',
                marginBottom: '2rem',
                fontSize: '0.875rem'
              }}
            >
              <ArrowLeft size={16} />
              Voltar
            </button>

            <h1
              className="auth-title"
              style={{
                fontSize: isMobile ? '1.75rem' : '2rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}
            >
              {isLogin ? 'Entrar na Conta' : 'Criar Conta'}
            </h1>

            <p
              className="auth-subtitle"
              style={{
                color: '#6b7280',
                fontSize: isMobile ? '0.95rem' : '1rem'
              }}
            >
              {isLogin
                ? 'Acesse sua conta para continuar seus estudos'
                : 'Junte-se à comunidade de fisioterapia'
              }
            </p>
          </div>

          {/* Mensagem */}
          {message && (
            <div style={{
              background: messageType === 'success' ? '#dcfce7' : '#fee2e2',
              color: messageType === 'success' ? '#16a34a' : '#dc2626',
              padding: '1rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {messageType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {message}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="auth-input"
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.875rem 1rem 0.875rem 3rem' : '1rem 1rem 1rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: isMobile ? '1rem' : '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: '#fafafa'
                  }}
                  placeholder="seu@email.com"
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Nome (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Nome Completo
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: '#fafafa'
                    }}
                    placeholder="Seu nome completo"
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            )}

            {/* Campos adicionais do cadastro em grid */}
            {!isLogin && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Instituição
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={20} style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="text"
                      name="instituicao"
                      value={formData.instituicao}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        background: '#fafafa'
                      }}
                      placeholder="UNIFESP, USP..."
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Curso
                  </label>
                  <div style={{ position: 'relative' }}>
                    <GraduationCap size={20} style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="text"
                      name="curso"
                      value={formData.curso}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        background: '#fafafa'
                      }}
                      placeholder="Fisioterapia"
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Período (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Período/Semestre
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    name="periodo"
                    value={formData.periodo}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: '#fafafa'
                    }}
                    placeholder="Ex: 5º período, 8º semestre"
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            )}

            {/* Senha */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: '#fafafa'
                  }}
                  placeholder="Sua senha"
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirmar Senha (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Confirmar Senha
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '1rem 3rem 1rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: '#fafafa'
                    }}
                    placeholder="Confirme sua senha"
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9ca3af'
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="auth-button"
              style={{
                width: '100%',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                padding: isMobile ? '0.875rem 1.5rem' : '1rem',
                borderRadius: '0.75rem',
                fontSize: isMobile ? '1rem' : '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }
              }}
            >
              {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          {/* Switch Mode */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </span>
            <button
              onClick={switchMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginLeft: '0.5rem',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </div>

          {/* Links Legais */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #f3f4f6'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.75rem',
              marginBottom: '1rem',
              lineHeight: '1.5'
            }}>
              Ao {isLogin ? 'fazer login' : 'criar uma conta'}, você concorda com nossos
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: '0.75rem'
            }}>
              <Link
                to="/termos-uso"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Termos de Uso
              </Link>
              <span style={{ color: '#d1d5db' }}>•</span>
              <Link
                to="/politica-privacidade"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Política de Privacidade
              </Link>
              <span style={{ color: '#d1d5db' }}>•</span>
              <Link
                to="/contato"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
