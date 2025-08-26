import React, { useState, useEffect } from 'react'
import {
  ArrowLeft, Save, AlertCircle, CheckCircle, Eye, EyeOff,
  BookOpen, Target, Lightbulb, FileText, Users, Send,
  Clock, Star, Award, Zap, Brain, Heart
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { communityQuestions } from '../config/supabase'
import { useNavigate } from 'react-router-dom'

const CriarQuestao = () => {
  const { user, profile, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const [questao, setQuestao] = useState({
    titulo: '',
    enunciado: '',
    alternativas: [
      { id: 'a', texto: '' },
      { id: 'b', texto: '' },
      { id: 'c', texto: '' },
      { id: 'd', texto: '' },
      { id: 'e', texto: '' }
    ],
    respostaCorreta: '',
    explicacao: '',
    raciocinio: '',
    referencias: '',
    area: '',
    dificuldade: 'media',
    tags: [],
    fonte: '',
    ano: new Date().getFullYear()
  })

  const [stats, setStats] = useState({
    questoesCriadas: 0,
    questoesAprovadas: 0,
    totalVotos: 0
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

  const steps = [
    { id: 1, title: 'Informações Básicas', icon: FileText },
    { id: 2, title: 'Questão e Alternativas', icon: BookOpen },
    { id: 3, title: 'Explicação e Referências', icon: Lightbulb },
    { id: 4, title: 'Revisão e Envio', icon: Send }
  ]

  // Carregar estatísticas do usuário
  useEffect(() => {
    if (user) {
      loadUserStats()
    }
  }, [user])

  const loadUserStats = async () => {
    try {
      // Por enquanto, vamos usar valores padrão para evitar erros
      setStats({
        questoesCriadas: 0,
        questoesAprovadas: 0,
        totalVotos: 0
      })

      // Tentar carregar as estatísticas reais
      const { data, error } = await communityQuestions.getUserQuestions(user.id)
      if (!error && data) {
        setStats({
          questoesCriadas: data.length,
          questoesAprovadas: data.filter(q => q.status === 'approved').length,
          totalVotos: data.reduce((sum, q) => sum + (q.votos_positivos || 0), 0)
        })
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
      // Manter valores padrão em caso de erro
    }
  }

  const handleInputChange = (field, value) => {
    setQuestao(prev => ({
      ...prev,
      [field]: value
    }))
    clearMessage()
  }

  const handleAlternativaChange = (id, texto) => {
    setQuestao(prev => ({
      ...prev,
      alternativas: prev.alternativas.map(alt =>
        alt.id === id ? { ...alt, texto } : alt
      )
    }))
    clearMessage()
  }

  const handleTagToggle = (tag) => {
    setQuestao(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const clearMessage = () => {
    if (message) {
      setMessage('')
      setMessageType('')
    }
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!questao.titulo.trim()) {
          setMessage('Título é obrigatório')
          setMessageType('error')
          return false
        }
        if (!questao.area) {
          setMessage('Selecione uma área')
          setMessageType('error')
          return false
        }
        break
      case 2:
        if (!questao.enunciado.trim()) {
          setMessage('Enunciado é obrigatório')
          setMessageType('error')
          return false
        }
        if (questao.alternativas.some(alt => !alt.texto.trim())) {
          setMessage('Todas as alternativas devem ser preenchidas')
          setMessageType('error')
          return false
        }
        if (!questao.respostaCorreta) {
          setMessage('Selecione a resposta correta')
          setMessageType('error')
          return false
        }
        break
      case 3:
        if (!questao.explicacao.trim()) {
          setMessage('Explicação é obrigatória')
          setMessageType('error')
          return false
        }
        break
    }
    return true
  }

  const validateQuestaoCompleta = () => {
    const errors = []

    if (!questao.titulo.trim()) errors.push('Título é obrigatório')
    if (!questao.enunciado.trim()) errors.push('Enunciado é obrigatório')
    if (questao.alternativas.some(alt => !alt.texto.trim())) errors.push('Todas as alternativas devem ser preenchidas')
    if (!questao.respostaCorreta) errors.push('Selecione a resposta correta')
    if (!questao.explicacao.trim()) errors.push('Explicação é obrigatória')
    if (!questao.area) errors.push('Selecione uma área')

    if (errors.length > 0) {
      setMessage(errors.join(', '))
      setMessageType('error')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    console.log('🚀 INICIANDO handleSubmit')
    console.log('isAuthenticated:', isAuthenticated)
    console.log('user:', user)

    if (!isAuthenticated) {
      console.log('❌ Usuário não autenticado')
      setMessage('Você precisa estar logado para criar questões')
      setMessageType('error')
      return
    }

    console.log('✅ Usuário autenticado, validando questão...')
    if (!validateQuestaoCompleta()) {
      console.log('❌ Validação falhou')
      return
    }

    console.log('✅ Validação passou, iniciando envio...')
    setLoading(true)
    setMessage('')

    try {
      // Preparar dados da questão (apenas campos básicos por enquanto)
      const questaoData = {
        titulo: questao.titulo,
        enunciado: questao.enunciado,
        alternativas: questao.alternativas,
        respostaCorreta: questao.respostaCorreta,
        explicacao: questao.explicacao,
        raciocinio: questao.raciocinio,
        referencias: questao.referencias,
        area: areas.find(a => a.id === questao.area)?.nome || questao.area,
        dificuldade: questao.dificuldade
      }

      console.log('📦 Dados preparados:', questaoData)
      console.log('👤 User ID:', user.id)

      const { data, error } = await communityQuestions.submitQuestion(user.id, questaoData)

      console.log('📡 Resposta do Supabase:')
      console.log('data:', data)
      console.log('error:', error)

      if (error) {
        console.error('❌ Erro do Supabase:', error)
        setMessage(`Erro ao enviar questão: ${error.message || JSON.stringify(error)}`)
        setMessageType('error')
      } else {
        console.log('✅ Questão enviada com sucesso:', data)
        setMessage('🎉 Questão enviada com sucesso! Ela será analisada pela moderação e, se aprovada, aparecerá na comunidade.')
        setMessageType('success')

        // Atualizar estatísticas
        try {
          console.log('📊 Atualizando estatísticas...')
          await loadUserStats()
        } catch (statsError) {
          console.error('⚠️ Erro ao atualizar estatísticas:', statsError)
        }

        // Aguardar um pouco e redirecionar
        setTimeout(() => {
          console.log('🔄 Redirecionando...')
          navigate('/questoes-comunidade', {
            state: { message: 'Sua questão foi enviada e está aguardando aprovação!' }
          })
        }, 3000)
      }
    } catch (err) {
      console.error('💥 Erro inesperado capturado:', err)
      setMessage(`Erro inesperado: ${err.message}`)
      setMessageType('error')
    } finally {
      console.log('🏁 Finalizando handleSubmit')
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '2rem',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            color: 'white'
          }}>
            <AlertCircle size={40} />
          </div>
          <h2 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.75rem' }}>
            Login Necessário
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Você precisa estar logado para criar questões e contribuir com a comunidade de fisioterapia.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/auth')}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              Fazer Login
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              Voltar ao Início
            </button>
          </div>
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
        maxWidth: '1200px',
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
                  Criar Nova Questão
                </h1>
                <p style={{
                  margin: 0,
                  color: '#6b7280',
                  fontSize: '1rem'
                }}>
                  Contribua com a comunidade criando questões de qualidade
                </p>
              </div>
            </div>

            {/* Estatísticas do Usuário */}
            <div style={{
              display: 'flex',
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  {stats.questoesCriadas}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Criadas
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  {stats.questoesAprovadas}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Aprovadas
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#f59e0b'
                }}>
                  {stats.totalVotos}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Votos
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    background: isActive ? '#3b82f6' : isCompleted ? '#10b981' : '#f3f4f6',
                    color: isActive || isCompleted ? 'white' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={16} />
                  <span>{step.title}</span>
                  {isCompleted && <CheckCircle size={16} />}
                </div>
              )
            })}
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

        {/* Conteúdo Principal */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '2rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          minHeight: '600px'
        }}>
          {/* Step 1: Informações Básicas */}
          {currentStep === 1 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h2 style={{
                    margin: '0 0 0.25rem 0',
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    Informações Básicas
                  </h2>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    Defina o título, área e características da sua questão
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Título */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Título da Questão *
                  </label>
                  <input
                    type="text"
                    value={questao.titulo}
                    onChange={(e) => handleInputChange('titulo', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    placeholder="Ex: Anatomia do sistema respiratório - músculos da respiração"
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                {/* Área */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Área de Conhecimento *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {areas.map(area => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => handleInputChange('area', area.id)}
                        style={{
                          padding: '1rem',
                          border: questao.area === area.id ? `2px solid ${area.cor}` : '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          background: questao.area === area.id ? `${area.cor}15` : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if (questao.area !== area.id) {
                            e.target.style.borderColor = area.cor
                            e.target.style.background = `${area.cor}08`
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (questao.area !== area.id) {
                            e.target.style.borderColor = '#e5e7eb'
                            e.target.style.background = 'white'
                          }
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>{area.icon}</span>
                          <div>
                            <div style={{
                              fontWeight: '600',
                              color: questao.area === area.id ? area.cor : '#1f2937',
                              fontSize: '0.875rem'
                            }}>
                              {area.nome}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dificuldade e Tags */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '2rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      Dificuldade *
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        { id: 'facil', nome: 'Fácil', cor: '#10b981', icon: '🟢' },
                        { id: 'media', nome: 'Médio', cor: '#f59e0b', icon: '🟡' },
                        { id: 'dificil', nome: 'Difícil', cor: '#ef4444', icon: '🔴' }
                      ].map(dif => (
                        <button
                          key={dif.id}
                          type="button"
                          onClick={() => handleInputChange('dificuldade', dif.id)}
                          style={{
                            padding: '0.75rem',
                            border: questao.dificuldade === dif.id ? `2px solid ${dif.cor}` : '2px solid #e5e7eb',
                            borderRadius: '0.5rem',
                            background: questao.dificuldade === dif.id ? `${dif.cor}15` : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: questao.dificuldade === dif.id ? dif.cor : '#6b7280'
                          }}
                        >
                          <span>{dif.icon}</span>
                          {dif.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      Tags (opcional)
                    </label>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {tagsDisponiveis.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          style={{
                            padding: '0.5rem 1rem',
                            border: questao.tags.includes(tag) ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                            borderRadius: '2rem',
                            background: questao.tags.includes(tag) ? '#3b82f615' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: questao.tags.includes(tag) ? '#3b82f6' : '#6b7280'
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Questão e Alternativas */}
          {currentStep === 2 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 style={{
                    margin: '0 0 0.25rem 0',
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    Questão e Alternativas
                  </h2>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    Escreva o enunciado e as 5 alternativas da questão
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Enunciado */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Enunciado da Questão *
                  </label>
                  <textarea
                    value={questao.enunciado}
                    onChange={(e) => handleInputChange('enunciado', e.target.value)}
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Digite o enunciado da questão de forma clara e objetiva..."
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      Seja claro e objetivo. Evite ambiguidades.
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: questao.enunciado.length > 500 ? '#ef4444' : '#6b7280'
                    }}>
                      {questao.enunciado.length}/800 caracteres
                    </span>
                  </div>
                </div>

                {/* Alternativas */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Alternativas *
                  </label>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {questao.alternativas.map((alternativa, index) => (
                      <div
                        key={alternativa.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          padding: '1rem',
                          border: questao.respostaCorreta === alternativa.id ? '2px solid #10b981' : '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          background: questao.respostaCorreta === alternativa.id ? '#10b98115' : 'white',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <input
                            type="radio"
                            name="respostaCorreta"
                            value={alternativa.id}
                            checked={questao.respostaCorreta === alternativa.id}
                            onChange={(e) => handleInputChange('respostaCorreta', e.target.value)}
                            style={{
                              width: '20px',
                              height: '20px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{
                            minWidth: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: questao.respostaCorreta === alternativa.id ? '#10b981' : '#6b7280',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            {alternativa.id.toUpperCase()}
                          </span>
                        </div>
                        <textarea
                          value={alternativa.texto}
                          onChange={(e) => handleAlternativaChange(alternativa.id, e.target.value)}
                          rows={2}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            background: 'transparent',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                          }}
                          placeholder={`Digite a alternativa ${alternativa.id.toUpperCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#f0f9ff',
                    borderRadius: '0.75rem',
                    border: '1px solid #e0f2fe'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <Target size={16} style={{ color: '#0ea5e9' }} />
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#0c4a6e'
                      }}>
                        Dica para criar boas alternativas:
                      </span>
                    </div>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '1.5rem',
                      color: '#0c4a6e',
                      fontSize: '0.875rem',
                      lineHeight: '1.5'
                    }}>
                      <li>Todas as alternativas devem ser plausíveis</li>
                      <li>Evite alternativas obviamente incorretas</li>
                      <li>Mantenha tamanho similar entre as alternativas</li>
                      <li>Use linguagem técnica apropriada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Explicação e Referências */}
          {currentStep === 3 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h2 style={{
                    margin: '0 0 0.25rem 0',
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    Explicação e Referências
                  </h2>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    Forneça explicação detalhada e referências científicas
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Explicação */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Explicação da Resposta Correta *
                  </label>
                  <textarea
                    value={questao.explicacao}
                    onChange={(e) => handleInputChange('explicacao', e.target.value)}
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Explique por que a resposta está correta, incluindo conceitos teóricos relevantes..."
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                {/* Linha de Raciocínio */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Linha de Raciocínio (opcional)
                  </label>
                  <textarea
                    value={questao.raciocinio}
                    onChange={(e) => handleInputChange('raciocinio', e.target.value)}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Descreva o raciocínio passo a passo para chegar à resposta..."
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                {/* Referências e Fonte */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      Referências Bibliográficas
                    </label>
                    <textarea
                      value={questao.referencias}
                      onChange={(e) => handleInputChange('referencias', e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '0.875rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Ex: Kendall FP, McCreary EK. Músculos: Provas e Funções. 5ª ed. São Paulo: Manole; 2007."
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      Fonte/Origem
                    </label>
                    <input
                      type="text"
                      value={questao.fonte}
                      onChange={(e) => handleInputChange('fonte', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        marginBottom: '1rem'
                      }}
                      placeholder="Ex: Concurso SES-DF 2022, Prova própria"
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />

                    <label style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      Ano
                    </label>
                    <input
                      type="number"
                      value={questao.ano}
                      onChange={(e) => handleInputChange('ano', parseInt(e.target.value))}
                      min="2000"
                      max={new Date().getFullYear()}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Revisão e Envio */}
          {currentStep === 4 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Send size={24} />
                </div>
                <div>
                  <h2 style={{
                    margin: '0 0 0.25rem 0',
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    Revisão e Envio
                  </h2>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    Revise sua questão antes de enviar para aprovação
                  </p>
                </div>
              </div>

              {/* Preview da Questão */}
              <div style={{
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                padding: '2rem',
                background: '#fafafa'
              }}>
                {/* Header da Preview */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div>
                    <h3 style={{
                      margin: '0 0 0.5rem 0',
                      color: '#1f2937',
                      fontSize: '1.25rem',
                      fontWeight: 'bold'
                    }}>
                      {questao.titulo || 'Título da questão'}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {questao.area && (
                        <span style={{
                          background: areas.find(a => a.id === questao.area)?.cor || '#6b7280',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {areas.find(a => a.id === questao.area)?.nome || questao.area}
                        </span>
                      )}
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
                      {questao.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            background: '#3b82f6',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    <Users size={16} />
                    Por: {profile?.nome || user?.email || 'Você'}
                  </div>
                </div>

                {/* Enunciado */}
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    margin: '0 0 1rem 0',
                    color: '#1f2937',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Enunciado:
                  </h4>
                  <p style={{
                    margin: 0,
                    color: '#4b5563',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {questao.enunciado || 'Enunciado da questão aparecerá aqui...'}
                  </p>
                </div>

                {/* Alternativas */}
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    margin: '0 0 1rem 0',
                    color: '#1f2937',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Alternativas:
                  </h4>
                  {questao.alternativas.map((alt) => (
                    <div
                      key={alt.id}
                      style={{
                        padding: '0.75rem',
                        marginBottom: '0.5rem',
                        background: alt.id === questao.respostaCorreta ? '#dcfce7' : '#f9fafb',
                        border: alt.id === questao.respostaCorreta ? '2px solid #16a34a' : '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem'
                      }}
                    >
                      <span style={{
                        fontWeight: '600',
                        color: alt.id === questao.respostaCorreta ? '#16a34a' : '#374151',
                        minWidth: '20px'
                      }}>
                        {alt.id.toUpperCase()})
                      </span>
                      <span style={{
                        color: alt.id === questao.respostaCorreta ? '#16a34a' : '#4b5563',
                        lineHeight: '1.5'
                      }}>
                        {alt.texto || `Alternativa ${alt.id.toUpperCase()}`}
                      </span>
                      {alt.id === questao.respostaCorreta && (
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

                {/* Explicação */}
                {questao.explicacao && (
                  <div style={{
                    background: '#f0f9ff',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    marginBottom: '1rem',
                    border: '1px solid #e0f2fe'
                  }}>
                    <h4 style={{
                      margin: '0 0 1rem 0',
                      color: '#0c4a6e',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      Explicação:
                    </h4>
                    <p style={{
                      margin: 0,
                      color: '#0c4a6e',
                      lineHeight: '1.6'
                    }}>
                      {questao.explicacao}
                    </p>
                  </div>
                )}

                {/* Informações Adicionais */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  {questao.raciocinio && (
                    <div style={{
                      background: '#fefce8',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #fef3c7'
                    }}>
                      <h5 style={{
                        margin: '0 0 0.5rem 0',
                        color: '#92400e',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        Raciocínio:
                      </h5>
                      <p style={{
                        margin: 0,
                        color: '#92400e',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {questao.raciocinio}
                      </p>
                    </div>
                  )}

                  {questao.referencias && (
                    <div style={{
                      background: '#f3f4f6',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h5 style={{
                        margin: '0 0 0.5rem 0',
                        color: '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        Referências:
                      </h5>
                      <p style={{
                        margin: 0,
                        color: '#4b5563',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {questao.referencias}
                      </p>
                    </div>
                  )}

                  {questao.fonte && (
                    <div style={{
                      background: '#fef2f2',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #fecaca'
                    }}>
                      <h5 style={{
                        margin: '0 0 0.5rem 0',
                        color: '#991b1b',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        Fonte:
                      </h5>
                      <p style={{
                        margin: 0,
                        color: '#991b1b',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {questao.fonte} ({questao.ano})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              style={{
                background: currentStep === 1 ? '#f3f4f6' : '#6b7280',
                color: currentStep === 1 ? '#9ca3af' : 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={16} />
              Anterior
            </button>

            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              {currentStep === 4 && (
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  style={{
                    background: 'none',
                    border: '2px solid #3b82f6',
                    color: '#3b82f6',
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
                >
                  {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
                  {previewMode ? 'Editar' : 'Preview'}
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
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
                  Próximo
                  <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-1px)'
                      e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                >
                  <Send size={16} />
                  {loading ? 'Enviando...' : 'Enviar Questão'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CriarQuestao
