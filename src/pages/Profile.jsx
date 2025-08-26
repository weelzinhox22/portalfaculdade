import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, User, Mail, Building, GraduationCap, Calendar, 
  Edit3, Save, X, Camera, BarChart3, Trophy, Target, 
  BookOpen, Clock, TrendingUp, Award, Settings, LogOut,
  CheckCircle, AlertCircle, Plus, Eye
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { userProfile, communityQuestions } from '../config/supabase'

const Profile = () => {
  const navigate = useNavigate()
  const { user, profile, signOut, updateProfile, isAuthenticated } = useAuth()
  
  const [activeTab, setActiveTab] = useState('overview')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [stats, setStats] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)

  const [formData, setFormData] = useState({
    nome: '',
    instituicao: '',
    curso: '',
    periodo: '',
    bio: '',
    linkedin: '',
    instagram: ''
  })

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [isAuthenticated, navigate])

  // Carregar dados do perfil
  useEffect(() => {
    if (profile) {
      setFormData({
        nome: profile.nome || '',
        instituicao: profile.instituicao || '',
        curso: profile.curso || '',
        periodo: profile.periodo || '',
        bio: profile.bio || '',
        linkedin: profile.linkedin || '',
        instagram: profile.instagram || ''
      })
    }
  }, [profile])

  // Carregar estatísticas e conquistas reais
  const loadUserData = async () => {
    if (!user?.id) return

    try {
      setLoadingStats(true)
      console.log('📊 Carregando dados do usuário...')

      // Carregar estatísticas
      const { data: statsData, error: statsError } = await communityQuestions.getUserStats(user.id)
      if (statsError) {
        console.error('❌ Erro ao carregar estatísticas:', statsError)
      } else {
        setStats(statsData)
        console.log('✅ Estatísticas carregadas:', statsData)
      }

      // Carregar conquistas
      const { data: achievementsData, error: achievementsError } = await communityQuestions.getUserAchievements(user.id)
      if (achievementsError) {
        console.error('❌ Erro ao carregar conquistas:', achievementsError)
      } else {
        setAchievements(achievementsData)
        console.log('✅ Conquistas carregadas:', achievementsData)
      }
    } catch (error) {
      console.error('💥 Erro inesperado ao carregar dados:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  // Carregar dados quando o usuário estiver disponível
  useEffect(() => {
    if (user?.id) {
      loadUserData()
    }
  }, [user?.id])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await updateProfile(formData)
      if (error) {
        setMessage('Erro ao atualizar perfil')
        setMessageType('error')
      } else {
        setMessage('Perfil atualizado com sucesso!')
        setMessageType('success')
        setEditing(false)
      }
    } catch (err) {
      setMessage('Erro inesperado')
      setMessageType('error')
    } finally {
      setLoading(false)
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 3000)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      console.log('🚪 Iniciando logout...')

      const { error } = await signOut()

      if (error) {
        console.error('❌ Erro no logout:', error)
        alert('Erro ao sair. Tente novamente.')
        setLoading(false)
      } else {
        console.log('✅ Logout realizado, redirecionando...')
        // Não mostrar mensagem, apenas redirecionar

        // Redirecionar imediatamente
        navigate('/', { replace: true })

        // Forçar reload da página para limpar qualquer estado residual
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      }
    } catch (error) {
      console.error('💥 Erro inesperado no logout:', error)
      alert('Erro inesperado ao sair.')
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: User },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  // Função para obter ícone da conquista
  const getAchievementIcon = (iconName) => {
    const icons = {
      User: User,
      Plus: Plus,
      BookOpen: BookOpen,
      Award: Award,
      Trophy: Trophy,
      Target: Target,
      Clock: Clock,
      Star: Star
    }
    return icons[iconName] || Trophy
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className="profile-page"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '1rem' : '2rem 1rem'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '2rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
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
              onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 style={{
              margin: 0,
              color: '#1f2937',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              Meu Perfil
            </h1>
          </div>

          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
              }}>
                {profile?.nome ? profile.nome.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <button style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6b7280',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <Camera size={16} />
              </button>
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h2 style={{
                margin: '0 0 0.5rem 0',
                color: '#1f2937',
                fontSize: '1.75rem',
                fontWeight: 'bold'
              }}>
                {profile?.nome || 'Usuário'}
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  <Mail size={14} />
                  {user.email}
                </div>
                
                {profile?.instituicao && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    <Building size={14} />
                    {profile.instituicao}
                  </div>
                )}
                
                {profile?.curso && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    <GraduationCap size={14} />
                    {profile.curso} {profile.periodo && `- ${profile.periodo}`}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div style={{
                display: 'flex',
                gap: '2rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#3b82f6'
                  }}>
                    {stats?.simuladosCompletos || 0}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Simulados
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#10b981'
                  }}>
                    {stats?.taxaAcerto || 0}%
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Acertos
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#f59e0b'
                  }}>
                    #{stats?.ranking || 0}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Ranking
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setEditing(!editing)}
              style={{
                background: editing ? '#ef4444' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {editing ? <X size={16} /> : <Edit3 size={16} />}
              {editing ? 'Cancelar' : 'Editar Perfil'}
            </button>
          </div>

          {/* Tabs */}
          <div
            className="profile-tabs"
            style={{
              display: 'flex',
              gap: isMobile ? '0' : '0.5rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '0',
              flexDirection: isMobile ? 'column' : 'row',
              overflowX: isMobile ? 'visible' : 'auto'
            }}
          >
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="profile-tab"
                  style={{
                    background: isMobile && activeTab === tab.id ? '#f0f9ff' : 'none',
                    border: isMobile ? '1px solid #e5e7eb' : 'none',
                    padding: isMobile ? '0.875rem 1rem' : '1rem 1.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    gap: '0.5rem',
                    color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                    borderBottom: !isMobile && activeTab === tab.id ? '2px solid #3b82f6' : !isMobile ? '2px solid transparent' : 'none',
                    borderRadius: isMobile ? '0.5rem' : '0',
                    marginBottom: isMobile ? '0.25rem' : '0',
                    width: isMobile ? '100%' : 'auto',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Mensagem */}
        {message && (
          <div style={{
            background: messageType === 'success' ? '#dcfce7' : '#fee2e2',
            color: messageType === 'success' ? '#16a34a' : '#dc2626',
            padding: '1rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {messageType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {message}
          </div>
        )}

        {/* Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '2rem',
          padding: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          minHeight: '400px'
        }}>
          <>
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
            <div>
              {editing ? (
                <form onSubmit={handleSaveProfile}>
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem'
                  }}>
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
                          Nome Completo
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
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>

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
                        <input
                          type="text"
                          name="instituicao"
                          value={formData.instituicao}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '0.75rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          placeholder="Ex: UNIFESP, USP, UFMG..."
                          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>
                    </div>

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
                          Curso
                        </label>
                        <input
                          type="text"
                          name="curso"
                          value={formData.curso}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '0.75rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          placeholder="Fisioterapia"
                          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>

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
                        <input
                          type="text"
                          name="periodo"
                          value={formData.periodo}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '0.75rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          placeholder="Ex: 5º período"
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
                        Biografia
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          fontSize: '0.875rem',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          resize: 'vertical'
                        }}
                        placeholder="Conte um pouco sobre você..."
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false)
                          setFormData({
                            nome: profile?.nome || '',
                            instituicao: profile?.instituicao || '',
                            curso: profile?.curso || '',
                            periodo: profile?.periodo || '',
                            bio: profile?.bio || '',
                            linkedin: profile?.linkedin || '',
                            instagram: profile?.instagram || ''
                          })
                        }}
                        style={{
                          background: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.75rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: loading ? '#9ca3af' : '#3b82f6',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.75rem',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Save size={16} />
                        {loading ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 style={{
                    margin: '0 0 1.5rem 0',
                    color: '#1f2937',
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}>
                    Informações Pessoais
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem'
                  }}>
                    <div style={{
                      padding: '1.5rem',
                      background: '#f9fafb',
                      borderRadius: '1rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h4 style={{
                        margin: '0 0 1rem 0',
                        color: '#374151',
                        fontSize: '1rem',
                        fontWeight: '600'
                      }}>
                        Dados Acadêmicos
                      </h4>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '0.25rem'
                          }}>
                            Instituição
                          </div>
                          <div style={{
                            color: '#1f2937',
                            fontWeight: '500'
                          }}>
                            {profile?.instituicao || 'Não informado'}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '0.25rem'
                          }}>
                            Curso
                          </div>
                          <div style={{
                            color: '#1f2937',
                            fontWeight: '500'
                          }}>
                            {profile?.curso || 'Não informado'}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '0.25rem'
                          }}>
                            Período
                          </div>
                          <div style={{
                            color: '#1f2937',
                            fontWeight: '500'
                          }}>
                            {profile?.periodo || 'Não informado'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {profile?.bio && (
                      <div style={{
                        padding: '1.5rem',
                        background: '#f0f9ff',
                        borderRadius: '1rem',
                        border: '1px solid #e0f2fe'
                      }}>
                        <h4 style={{
                          margin: '0 0 1rem 0',
                          color: '#374151',
                          fontSize: '1rem',
                          fontWeight: '600'
                        }}>
                          Sobre
                        </h4>
                        <p style={{
                          margin: 0,
                          color: '#4b5563',
                          lineHeight: '1.6'
                        }}>
                          {profile.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Stats */}
          {activeTab === 'stats' && (
            <div>
              <h3 style={{
                margin: '0 0 2rem 0',
                color: '#1f2937',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>
                Suas Estatísticas
              </h3>

              {loadingStats ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e5e7eb',
                    borderTop: '3px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '1rem'
                  }} />
                  Carregando estatísticas...
                </div>
              ) : stats ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {stats?.simuladosCompletos || 0}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.9 }}>Simulados Completos</div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {stats?.taxaAcerto || 0}%
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.9 }}>Taxa de Acerto</div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {stats?.questoesCriadas || 0}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.9 }}>Questões Criadas</div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {stats?.questoesAprovadas || 0}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.9 }}>Questões Aprovadas</div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {stats?.pontos || 0}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.9 }}>Pontos</div>
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  Erro ao carregar estatísticas
                </div>
              )}
            </div>
          )}

          {/* Tab: Achievements */}
          {activeTab === 'achievements' && (
            <div>
              <h3 style={{
                margin: '0 0 2rem 0',
                color: '#1f2937',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>
                Conquistas
              </h3>
              
              {loadingStats ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e5e7eb',
                    borderTop: '3px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '1rem'
                  }} />
                  Carregando conquistas...
                </div>
              ) : achievements.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {achievements.map(achievement => {
                    const Icon = getAchievementIcon(achievement.icon)
                    return (
                      <div
                        key={achievement.id}
                        style={{
                          padding: '1.5rem',
                          background: achievement.unlocked ? '#f0fdf4' : '#f9fafb',
                          border: achievement.unlocked ? '2px solid #22c55e' : '2px solid #e5e7eb',
                          borderRadius: '1rem',
                          opacity: achievement.unlocked ? 1 : 0.6,
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            background: achievement.unlocked ? '#22c55e' : '#9ca3af',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            <Icon size={24} />
                          </div>
                        <div>
                          <h4 style={{
                            margin: '0 0 0.25rem 0',
                            color: achievement.unlocked ? '#16a34a' : '#6b7280',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {achievement.title}
                          </h4>
                          <p style={{
                            margin: 0,
                            color: '#6b7280',
                            fontSize: '0.875rem'
                          }}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      
                      {achievement.unlocked && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#16a34a',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>
                          <CheckCircle size={16} />
                          Conquistado!
                        </div>
                      )}
                    </div>
                    )
                  })}
                </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#6b7280'
                  }}>
                    Nenhuma conquista disponível
                  </div>
                )}
            </div>
          )}

          {/* Tab: Settings */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{
                margin: '0 0 2rem 0',
                color: '#1f2937',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>
                Configurações da Conta
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
                      Alterar Senha
                    </h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                      Atualize sua senha para manter sua conta segura
                    </p>
                  </div>
                  <button style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Alterar
                  </button>
                </div>

                <div style={{
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
                      Notificações por Email
                    </h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                      Receba atualizações sobre novos simulados e questões
                    </p>
                  </div>
                  <label style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '60px',
                    height: '34px'
                  }}>
                    <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: '#3b82f6',
                      borderRadius: '34px',
                      transition: '0.4s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '26px',
                        width: '26px',
                        left: '30px',
                        bottom: '4px',
                        background: 'white',
                        borderRadius: '50%',
                        transition: '0.4s'
                      }} />
                    </span>
                  </label>
                </div>

                <div style={{
                  padding: '1.5rem',
                  border: '2px solid #fee2e2',
                  borderRadius: '1rem',
                  background: '#fef2f2'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>
                        Sair da Conta
                      </h4>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                        Desconectar desta sessão
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      disabled={loading}
                      style={{
                        background: loading ? '#9ca3af' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: loading ? 0.7 : 1,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.background = '#dc2626'
                          e.target.style.transform = 'translateY(-1px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.target.style.background = '#ef4444'
                          e.target.style.transform = 'translateY(0)'
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid transparent',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          Saindo...
                        </>
                      ) : (
                        <>
                          <LogOut size={16} />
                          Sair
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          </>
        </div>
      </div>
    </div>
  )
}

export default Profile
