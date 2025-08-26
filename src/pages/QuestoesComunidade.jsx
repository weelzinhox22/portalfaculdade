import React, { useState, useEffect } from 'react'
import {
  ArrowLeft, ThumbsUp, ThumbsDown, User, Calendar, BookOpen, Plus,
  Search, Filter, Eye, Star, TrendingUp, Clock, Award, Target,
  CheckCircle, AlertCircle, Users, Heart, Brain, Zap
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { communityQuestions } from '../config/supabase'

const QuestoesComunidade = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile, isAuthenticated } = useAuth()

  const [questoes, setQuestoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroDificuldade, setFiltroDificuldade] = useState('')
  const [filtroTag, setFiltroTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent') // recent, popular, votes
  const [questaoSelecionada, setQuestaoSelecionada] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const [stats, setStats] = useState({
    totalQuestoes: 0,
    questoesAprovadas: 0,
    totalAutores: 0,
    questoesHoje: 0
  })

  const areas = [
    { id: 'anatomia', nome: 'Anatomia', icon: '🦴', cor: '#ef4444' },
    { id: 'fisiologia', nome: 'Fisiologia', icon: '❤️', cor: '#dc2626' },
    { id: 'biomecânica', nome: 'Biomecânica', icon: '⚙️', cor: '#f97316' },
    { id: 'cinesiologia', nome: 'Cinesiologia', icon: '🏃', cor: '#f59e0b' },
    { id: 'ortopedia', nome: 'Ortopedia', icon: '🦴', cor: '#eab308' },
    { id: 'neurologia', nome: 'Neurologia', icon: '🧠', cor: '#84cc16' },
    { id: 'cardiologia', nome: 'Cardiologia', icon: '💓', cor: '#22c55e' },
    { id: 'pneumologia', nome: 'Pneumologia', icon: '🫁', cor: '#10b981' },
    { id: 'pediatria', nome: 'Pediatria', icon: '👶', cor: '#14b8a6' },
    { id: 'geriatria', nome: 'Geriatria', icon: '👴', cor: '#06b6d4' },
    { id: 'uti', nome: 'UTI', icon: '🏥', cor: '#0ea5e9' },
    { id: 'eletroterapia', nome: 'Eletroterapia', icon: '⚡', cor: '#3b82f6' },
    { id: 'hidroterapia', nome: 'Hidroterapia', icon: '🌊', cor: '#6366f1' },
    { id: 'terapia-manual', nome: 'Terapia Manual', icon: '👐', cor: '#8b5cf6' },
    { id: 'saude-mulher', nome: 'Saúde da Mulher', icon: '👩', cor: '#a855f7' },
    { id: 'reumatologia', nome: 'Reumatologia', icon: '🦴', cor: '#d946ef' },
    { id: 'sus', nome: 'SUS', icon: '🏛️', cor: '#ec4899' },
    { id: 'etica', nome: 'Ética', icon: '⚖️', cor: '#f43f5e' },
    { id: 'outros', nome: 'Outros', icon: '📚', cor: '#64748b' }
  ]

  const tagsDisponiveis = [
    'Concurso', 'Residência', 'Graduação', 'Pós-graduação',
    'Prática Clínica', 'Teórica', 'Caso Clínico', 'Diagnóstico',
    'Tratamento', 'Prevenção', 'Reabilitação', 'Avaliação'
  ]

  useEffect(() => {
    carregarQuestoes()

    // Verificar se há mensagem do estado de navegação
    if (location.state?.message) {
      setMessage(location.state.message)
      setMessageType('success')
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
    }
  }, [location])

  useEffect(() => {
    // Recarregar quando filtros mudarem
    carregarQuestoes()
  }, [sortBy])

  const carregarQuestoes = async () => {
    try {
      const { data, error } = await communityQuestions.getApprovedQuestions()
      if (error) {
        console.error('Erro ao carregar questões:', error)
      } else {
        const questoesOrdenadas = ordenarQuestoes(data || [])
        setQuestoes(questoesOrdenadas)
        calcularEstatisticas(questoesOrdenadas)
      }
    } catch (err) {
      console.error('Erro inesperado:', err)
    } finally {
      setLoading(false)
    }
  }

  const ordenarQuestoes = (questoes) => {
    switch (sortBy) {
      case 'popular':
        return [...questoes].sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0))
      case 'votes':
        return [...questoes].sort((a, b) => (b.votos_positivos || 0) - (a.votos_positivos || 0))
      case 'recent':
      default:
        return [...questoes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  }

  const calcularEstatisticas = (questoes) => {
    const hoje = new Date().toDateString()
    const autoresUnicos = new Set(questoes.map(q => q.user_id)).size
    const questoesHoje = questoes.filter(q =>
      new Date(q.created_at).toDateString() === hoje
    ).length

    setStats({
      totalQuestoes: questoes.length,
      questoesAprovadas: questoes.filter(q => q.status === 'approved').length,
      totalAutores: autoresUnicos,
      questoesHoje
    })
  }

  const handleVote = async (questaoId, voto) => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para votar')
      return
    }

    try {
      await communityQuestions.voteQuestion(user.id, questaoId, voto)
      // Recarregar questões para atualizar contadores
      carregarQuestoes()
    } catch (err) {
      console.error('Erro ao votar:', err)
    }
  }

  const questoesFiltradas = questoes.filter(questao => {
    const matchArea = !filtroArea || questao.area.toLowerCase().includes(filtroArea.toLowerCase())
    const matchDificuldade = !filtroDificuldade || questao.dificuldade === filtroDificuldade
    const matchTag = !filtroTag || (questao.tags && questao.tags.toLowerCase().includes(filtroTag.toLowerCase()))
    const matchSearch = !searchQuery ||
      questao.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      questao.enunciado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (questao.autor_nome && questao.autor_nome.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchArea && matchDificuldade && matchTag && matchSearch
  })

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '2rem',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
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
          <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>
            Carregando Questões
          </h3>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Buscando as melhores questões da comunidade...
          </p>
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
        {/* Header com Estatísticas */}
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
            marginBottom: '2rem'
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
                  color: '#6b7280',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
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
                  Questões da Comunidade
                </h1>
                <p style={{
                  margin: 0,
                  color: '#6b7280',
                  fontSize: '1rem'
                }}>
                  Conhecimento compartilhado pela comunidade de fisioterapia
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={() => navigate('/criar-questao')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                  e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <Plus size={16} />
                Criar Questão
              </button>
            )}
          </div>

          {/* Estatísticas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              padding: '1.5rem',
              borderRadius: '1rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <BookOpen size={20} />
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                  {stats.totalQuestoes}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Total de Questões
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '1.5rem',
              borderRadius: '1rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <CheckCircle size={20} />
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                  {stats.questoesAprovadas}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Questões Aprovadas
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              padding: '1.5rem',
              borderRadius: '1rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Users size={20} />
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                  {stats.totalAutores}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Colaboradores
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              padding: '1.5rem',
              borderRadius: '1rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Star size={20} />
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                  {stats.questoesHoje}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Questões Hoje
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem */}
        {message && (
          <div style={{
            background: messageType === 'success' ? '#dcfce7' : '#fee2e2',
            color: messageType === 'success' ? '#16a34a' : '#dc2626',
            padding: '1.5rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            {messageType === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span style={{ fontSize: '1rem' }}>{message}</span>
          </div>
        )}

        {/* Filtros e Busca */}
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
            marginBottom: '1.5rem'
          }}>
            <Filter size={20} style={{ color: '#6b7280' }} />
            <h3 style={{
              margin: 0,
              color: '#1f2937',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Filtros e Busca
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Busca */}
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
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Buscar por título, conteúdo ou autor..."
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                <option value="recent">Mais Recentes</option>
                <option value="popular">Mais Visualizadas</option>
                <option value="votes">Mais Votadas</option>
              </select>
            </div>

            {/* Dificuldade */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Dificuldade
              </label>
              <select
                value={filtroDificuldade}
                onChange={(e) => setFiltroDificuldade(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                <option value="">Todas</option>
                <option value="facil">Fácil</option>
                <option value="media">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>

          {/* Filtro por Área */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Área de Conhecimento
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => setFiltroArea('')}
                style={{
                  padding: '0.5rem 1rem',
                  border: !filtroArea ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  borderRadius: '2rem',
                  background: !filtroArea ? '#3b82f615' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: !filtroArea ? '#3b82f6' : '#6b7280'
                }}
              >
                Todas
              </button>
              {areas.map(area => (
                <button
                  key={area.id}
                  onClick={() => setFiltroArea(area.nome)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: filtroArea === area.nome ? `2px solid ${area.cor}` : '2px solid #e5e7eb',
                    borderRadius: '2rem',
                    background: filtroArea === area.nome ? `${area.cor}15` : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: filtroArea === area.nome ? area.cor : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span>{area.icon}</span>
                  {area.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Tags */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Tags
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => setFiltroTag('')}
                style={{
                  padding: '0.5rem 1rem',
                  border: !filtroTag ? '2px solid #8b5cf6' : '2px solid #e5e7eb',
                  borderRadius: '2rem',
                  background: !filtroTag ? '#8b5cf615' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: !filtroTag ? '#8b5cf6' : '#6b7280'
                }}
              >
                Todas
              </button>
              {tagsDisponiveis.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFiltroTag(tag)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: filtroTag === tag ? '2px solid #8b5cf6' : '2px solid #e5e7eb',
                    borderRadius: '2rem',
                    background: filtroTag === tag ? '#8b5cf615' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: filtroTag === tag ? '#8b5cf6' : '#6b7280'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contador de Resultados */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '1rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <BookOpen size={20} style={{ color: '#3b82f6' }} />
            <span style={{
              color: '#1f2937',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              {questoesFiltradas.length} questões encontradas
            </span>
          </div>

          {(searchQuery || filtroArea || filtroDificuldade || filtroTag) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setFiltroArea('')
                setFiltroDificuldade('')
                setFiltroTag('')
              }}
              style={{
                background: 'none',
                border: '1px solid #e5e7eb',
                color: '#6b7280',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f3f4f6'
                e.target.style.color = '#374151'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none'
                e.target.style.color = '#6b7280'
              }}
            >
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Lista de Questões */}
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {questoesFiltradas.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '1rem',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <BookOpen size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>
                Nenhuma questão encontrada
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Não há questões aprovadas com os filtros selecionados.
              </p>
              {isAuthenticated && (
                <button
                  onClick={() => navigate('/criar-questao')}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Seja o primeiro a criar uma questão!
                </button>
              )}
            </div>
          ) : (
            questoesFiltradas.map((questao) => (
              <div
                key={questao.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '2rem',
                  padding: '2rem',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => setQuestaoSelecionada(questao)}
                onMouseEnter={(e) => {
                  const areaInfo = areas.find(a => a.nome.toLowerCase() === questao.area.toLowerCase()) || { cor: '#6b7280' }
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.2)'
                  e.currentTarget.style.borderColor = areaInfo.cor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.borderColor = 'transparent'
                }}
              >
                {/* Header da Questão */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: '0 0 0.5rem 0',
                      color: '#1f2937',
                      fontSize: '1.25rem',
                      fontWeight: '600'
                    }}>
                      {questao.titulo}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      {(() => {
                        const areaInfo = areas.find(a => a.nome.toLowerCase() === questao.area.toLowerCase()) ||
                                        { cor: '#6b7280', icon: '📚', nome: questao.area }
                        return (
                          <div style={{
                            background: areaInfo.cor,
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '1.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span>{areaInfo.icon}</span>
                            {areaInfo.nome}
                          </div>
                        )
                      })()}

                      <div style={{
                        background: questao.dificuldade === 'facil' ? '#10b981' :
                                   questao.dificuldade === 'media' ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <span>
                          {questao.dificuldade === 'facil' ? '🟢' :
                           questao.dificuldade === 'media' ? '🟡' : '🔴'}
                        </span>
                        {questao.dificuldade === 'facil' ? 'Fácil' :
                         questao.dificuldade === 'media' ? 'Médio' : 'Difícil'}
                      </div>

                      {questao.tags && questao.tags.split(',').slice(0, 2).map((tag, index) => (
                        <div
                          key={index}
                          style={{
                            background: '#8b5cf6',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '1.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {tag.trim()}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Votos */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVote(questao.id, 1)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: '#16a34a',
                        fontSize: '0.875rem'
                      }}
                    >
                      <ThumbsUp size={16} />
                      {questao.votos_positivos || 0}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVote(questao.id, -1)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: '#dc2626',
                        fontSize: '0.875rem'
                      }}
                    >
                      <ThumbsDown size={16} />
                      {questao.votos_negativos || 0}
                    </button>
                  </div>
                </div>

                {/* Enunciado (preview) */}
                <p style={{
                  color: '#4b5563',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  {questao.enunciado.length > 200 
                    ? questao.enunciado.substring(0, 200) + '...' 
                    : questao.enunciado}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  {/* Autor e Data */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {(questao.autor_nome || questao.profiles?.nome || 'A').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#374151' }}>
                          {questao.autor_nome || questao.profiles?.nome || 'Anônimo'}
                        </div>
                        {(questao.autor_instituicao || questao.profiles?.instituicao) && (
                          <div style={{ fontSize: '0.75rem' }}>
                            {questao.autor_instituicao || questao.profiles?.instituicao}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      <Calendar size={14} />
                      {new Date(questao.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      <Eye size={16} />
                      {questao.visualizacoes || 0}
                    </div>

                    <div style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Target size={14} />
                      Ver Questão
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Questão Detalhada */}
      {questaoSelecionada && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setQuestaoSelecionada(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: '#6b7280'
              }}
            >
              ✕
            </button>

            <h2 style={{
              margin: '0 0 1rem 0',
              color: '#1f2937',
              fontSize: '1.5rem'
            }}>
              {questaoSelecionada.titulo}
            </h2>

            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{
                background: '#f3f4f6',
                color: '#374151',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem'
              }}>
                {questaoSelecionada.area}
              </span>
              <span style={{
                background: questaoSelecionada.dificuldade === 'facil' ? '#dcfce7' : 
                           questaoSelecionada.dificuldade === 'media' ? '#fef3c7' : '#fee2e2',
                color: questaoSelecionada.dificuldade === 'facil' ? '#166534' : 
                       questaoSelecionada.dificuldade === 'media' ? '#92400e' : '#991b1b',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem'
              }}>
                {questaoSelecionada.dificuldade === 'facil' ? 'Fácil' : 
                 questaoSelecionada.dificuldade === 'media' ? 'Médio' : 'Difícil'}
              </span>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Enunciado</h3>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
                {questaoSelecionada.enunciado}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Alternativas</h3>
              {questaoSelecionada.alternativas.map((alt, index) => (
                <div
                  key={alt.id}
                  style={{
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    background: alt.id === questaoSelecionada.resposta_correta ? '#dcfce7' : '#f9fafb',
                    border: alt.id === questaoSelecionada.resposta_correta ? '2px solid #16a34a' : '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{
                    fontWeight: '600',
                    color: alt.id === questaoSelecionada.resposta_correta ? '#16a34a' : '#374151'
                  }}>
                    {alt.id.toUpperCase()})
                  </span>
                  <span style={{
                    color: alt.id === questaoSelecionada.resposta_correta ? '#16a34a' : '#4b5563'
                  }}>
                    {alt.texto}
                  </span>
                  {alt.id === questaoSelecionada.resposta_correta && (
                    <span style={{
                      marginLeft: 'auto',
                      background: '#16a34a',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      CORRETA
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              background: '#f0f9ff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Explicação</h3>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
                {questaoSelecionada.explicacao}
              </p>
            </div>

            {questaoSelecionada.raciocinio && (
              <div style={{
                background: '#fefce8',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Linha de Raciocínio</h3>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
                  {questaoSelecionada.raciocinio}
                </p>
              </div>
            )}

            {questaoSelecionada.referencias && (
              <div style={{
                background: '#f3f4f6',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Referências</h3>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6', fontSize: '0.875rem' }}>
                  {questaoSelecionada.referencias}
                </p>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <div>
                Criado por: <strong>{questaoSelecionada.profiles?.nome || 'Usuário'}</strong>
                {questaoSelecionada.profiles?.instituicao && (
                  <span> • {questaoSelecionada.profiles.instituicao}</span>
                )}
              </div>
              <div>
                {new Date(questaoSelecionada.created_at).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestoesComunidade
