import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, XCircle, Eye, Clock, User, Calendar,
  Filter, Search, ArrowLeft, AlertTriangle, BookOpen
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { communityQuestions } from '../config/supabase'

const AdminModerator = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [questoes, setQuestoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [questaoSelecionada, setQuestaoSelecionada] = useState(null)
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    console.log('🔐 AdminModerator - isAuthenticated:', isAuthenticated)
    console.log('🔐 AdminModerator - user:', user)

    if (isAuthenticated && user) {
      carregarQuestoes()
    }
  }, [isAuthenticated, user, filtroStatus])

  const carregarQuestoes = async () => {
    try {
      setLoading(true)
      console.log('📋 Carregando questões para moderação...')

      const { data, error } = await communityQuestions.getAllQuestions()

      console.log('📋 Resultado:', { data, error })

      if (error) {
        console.error('❌ Erro ao carregar questões:', error)
        alert(`Erro ao carregar questões: ${error.message}`)
      } else {
        console.log(`✅ Carregadas ${data?.length || 0} questões`)
        setQuestoes(data || [])
      }
    } catch (err) {
      console.error('💥 Erro inesperado:', err)
      alert(`Erro inesperado: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const aprovarQuestao = async (questaoId) => {
    setProcessando(true)
    try {
      const { error } = await communityQuestions.updateQuestionStatus(questaoId, 'approved')
      
      if (error) {
        alert('Erro ao aprovar questão')
      } else {
        alert('Questão aprovada com sucesso!')
        carregarQuestoes()
      }
    } catch (err) {
      alert('Erro inesperado')
    } finally {
      setProcessando(false)
    }
  }

  const rejeitarQuestao = async (questaoId) => {
    setProcessando(true)
    try {
      const { error } = await communityQuestions.updateQuestionStatus(questaoId, 'rejected')
      
      if (error) {
        alert('Erro ao rejeitar questão')
      } else {
        alert('Questão rejeitada')
        carregarQuestoes()
      }
    } catch (err) {
      alert('Erro inesperado')
    } finally {
      setProcessando(false)
    }
  }

  const questoesFiltradas = questoes.filter(questao => {
    const matchStatus = !filtroStatus || questao.status === filtroStatus
    const matchSearch = !searchQuery || 
      questao.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      questao.enunciado.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchStatus && matchSearch
  })

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '2rem',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
        }}>
          <AlertTriangle size={60} style={{ color: '#f59e0b', marginBottom: '2rem' }} />
          <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>Acesso Restrito</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Esta área é restrita para moderadores. Faça login para continuar.
          </p>
          <button
            onClick={() => navigate('/auth')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Fazer Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1400px',
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
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  color: '#6b7280'
                }}
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 style={{
                  margin: '0 0 0.5rem 0',
                  color: '#1f2937',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  Moderação de Questões
                </h1>
                <p style={{
                  margin: 0,
                  color: '#6b7280',
                  fontSize: '1rem'
                }}>
                  Aprovar ou rejeitar questões da comunidade
                </p>
              </div>
            </div>

            {/* Estatísticas rápidas */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#f59e0b'
                }}>
                  {questoes.filter(q => q.status === 'pending').length}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  Pendentes
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  {questoes.filter(q => q.status === 'approved').length}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  Aprovadas
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '2rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {/* Status Filter */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Status
              </label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              >
                <option value="">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="approved">Aprovadas</option>
                <option value="rejected">Rejeitadas</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Buscar
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Buscar por título ou conteúdo..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Questões */}
        {loading ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '2rem',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #f3f4f6',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem'
            }} />
            <p>Carregando questões...</p>
          </div>
        ) : questoesFiltradas.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '2rem',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
          }}>
            <BookOpen size={60} style={{ color: '#9ca3af', marginBottom: '2rem' }} />
            <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>
              Nenhuma questão encontrada
            </h3>
            <p style={{ color: '#6b7280' }}>
              Não há questões que correspondam aos filtros selecionados.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {questoesFiltradas.map((questao) => (
              <div
                key={questao.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '2rem',
                  padding: '2rem',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  border: `2px solid ${
                    questao.status === 'approved' ? '#10b981' :
                    questao.status === 'rejected' ? '#ef4444' : '#f59e0b'
                  }`
                }}
              >
                {/* Header da Questão */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{
                        margin: 0,
                        color: '#1f2937',
                        fontSize: '1.25rem',
                        fontWeight: 'bold'
                      }}>
                        {questao.titulo}
                      </h3>
                      
                      <span style={{
                        background: questao.status === 'approved' ? '#10b981' :
                                   questao.status === 'rejected' ? '#ef4444' : '#f59e0b',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {questao.status === 'approved' ? 'Aprovada' :
                         questao.status === 'rejected' ? 'Rejeitada' : 'Pendente'}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        background: '#3b82f6',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {questao.area}
                      </span>
                      
                      <span style={{
                        background: questao.dificuldade === 'facil' ? '#10b981' : 
                                   questao.dificuldade === 'media' ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {questao.dificuldade === 'facil' ? 'Fácil' : 
                         questao.dificuldade === 'media' ? 'Médio' : 'Difícil'}
                      </span>
                    </div>

                    <p style={{
                      margin: '0 0 1rem 0',
                      color: '#4b5563',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}>
                      {questao.enunciado}
                    </p>

                    {/* Autor e Data */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={14} />
                        {questao.autor_nome || 'Anônimo'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} />
                        {new Date(questao.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  {questao.status === 'pending' && (
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginLeft: '2rem'
                    }}>
                      <button
                        onClick={() => aprovarQuestao(questao.id)}
                        disabled={processando}
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.75rem',
                          cursor: processando ? 'not-allowed' : 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          opacity: processando ? 0.6 : 1
                        }}
                      >
                        <CheckCircle size={16} />
                        Aprovar
                      </button>

                      <button
                        onClick={() => rejeitarQuestao(questao.id)}
                        disabled={processando}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.75rem',
                          cursor: processando ? 'not-allowed' : 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          opacity: processando ? 0.6 : 1
                        }}
                      >
                        <XCircle size={16} />
                        Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminModerator
