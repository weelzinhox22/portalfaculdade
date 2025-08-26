import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = 'https://qzuyutklullrypjkgdze.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dXl1dGtsdWxscnlwamtnZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjMzNDksImV4cCI6MjA1ODY5OTM0OX0.QnCAwPpeV7SY5soEysoUvbBgBLX0zbtFaKyghv31Pi4'

// Criar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Função para inserir sugestão
export const inserirSugestao = async (sugestao) => {
  try {
    const { data, error } = await supabase
      .from('sugestoes')
      .insert([
        {
          titulo: sugestao.titulo,
          descricao: sugestao.descricao,
          categoria: sugestao.categoria,
          prioridade: sugestao.prioridade,
          autor: sugestao.autor || 'Anônimo',
          status: 'sugerido',
          votos: 0,
          comentarios: 0,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Erro ao inserir sugestão:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erro na função inserirSugestao:', error)
    return { success: false, error: error.message }
  }
}

// Função para buscar sugestões
export const buscarSugestoes = async () => {
  try {
    const { data, error } = await supabase
      .from('sugestoes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar sugestões:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erro na função buscarSugestoes:', error)
    return { success: false, error: error.message }
  }
}

// Função para votar em sugestão
export const votarSugestao = async (id) => {
  try {
    const { data, error } = await supabase
      .rpc('incrementar_votos', { sugestao_id: id })

    if (error) {
      console.error('Erro ao votar:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erro na função votarSugestao:', error)
    return { success: false, error: error.message }
  }
}

// Funções de autenticação
export const auth = {
  // Registrar usuário
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Login
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  // Escutar mudanças de autenticação
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Funções para progresso do usuário
export const userProgress = {
  // Salvar progresso do simulado
  saveSimuladoProgress: async (userId, simuladoId, progresso) => {
    const { data, error } = await supabase
      .from('simulado_progress')
      .upsert({
        user_id: userId,
        simulado_id: simuladoId,
        questao_atual: progresso.questaoAtual,
        respostas: progresso.respostas,
        tempo_restante: progresso.tempoRestante,
        finalizado: progresso.finalizado,
        pontuacao: progresso.pontuacao,
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  // Carregar progresso do simulado
  loadSimuladoProgress: async (userId, simuladoId) => {
    const { data, error } = await supabase
      .from('simulado_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('simulado_id', simuladoId)
      .single()
    return { data, error }
  },

  // Salvar resultado final
  saveSimuladoResult: async (userId, simuladoId, resultado) => {
    const { data, error } = await supabase
      .from('simulado_results')
      .insert({
        user_id: userId,
        simulado_id: simuladoId,
        pontuacao: resultado.pontuacao,
        total_questoes: resultado.totalQuestoes,
        acertos: resultado.acertos,
        tempo_total: resultado.tempoTotal,
        respostas_detalhadas: resultado.respostasDetalhadas,
        created_at: new Date().toISOString()
      })
    return { data, error }
  },

  // Obter histórico de resultados
  getUserResults: async (userId) => {
    const { data, error } = await supabase
      .from('simulado_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Funções para anotações
export const userNotes = {
  // Salvar anotação
  saveNote: async (userId, questaoId, anotacao) => {
    const { data, error } = await supabase
      .from('user_notes')
      .upsert({
        user_id: userId,
        questao_id: questaoId,
        anotacao: anotacao,
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  // Carregar anotações do usuário
  getUserNotes: async (userId) => {
    const { data, error } = await supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', userId)
    return { data, error }
  },

  // Deletar anotação
  deleteNote: async (userId, questaoId) => {
    const { data, error } = await supabase
      .from('user_notes')
      .delete()
      .eq('user_id', userId)
      .eq('questao_id', questaoId)
    return { data, error }
  }
}

// Funções para questões da comunidade
export const communityQuestions = {
  // Submeter questão para aprovação
  submitQuestion: async (userId, questao) => {
    console.log('=== INICIANDO SUBMIT QUESTION ===')
    console.log('userId:', userId)
    console.log('questao:', questao)

    try {
      // Dados mínimos obrigatórios
      const insertData = {
        user_id: userId,
        titulo: questao.titulo,
        enunciado: questao.enunciado,
        alternativas: questao.alternativas,
        resposta_correta: questao.respostaCorreta,
        explicacao: questao.explicacao,
        area: questao.area,
        dificuldade: questao.dificuldade
      }

      console.log('=== DADOS PARA INSERIR ===')
      console.log(JSON.stringify(insertData, null, 2))

      const { data, error } = await supabase
        .from('community_questions')
        .insert(insertData)

      console.log('=== RESULTADO DA INSERÇÃO ===')
      console.log('data:', data)
      console.log('error:', error)

      return { data, error }
    } catch (err) {
      console.error('=== ERRO CAPTURADO ===')
      console.error('Erro na função submitQuestion:', err)
      return { data: null, error: { message: err.message, details: err } }
    }
  },

  // Obter questões aprovadas da comunidade
  getApprovedQuestions: async () => {
    const { data, error } = await supabase
      .from('community_questions')
      .select(`
        *,
        profiles:user_id (
          nome,
          instituicao
        )
      `)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Obter questões do usuário
  getUserQuestions: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('community_questions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar questões do usuário:', error)
        return { data: [], error }
      }

      return { data: data || [], error: null }
    } catch (err) {
      console.error('Erro inesperado ao buscar questões do usuário:', err)
      return { data: [], error: err }
    }
  },

  // Votar em questão
  voteQuestion: async (userId, questaoId, voto) => {
    const { data, error } = await supabase
      .from('question_votes')
      .upsert({
        user_id: userId,
        questao_id: questaoId,
        voto: voto // 1 para upvote, -1 para downvote
      })
    return { data, error }
  },

  // Incrementar visualizações
  incrementViews: async (questionId) => {
    const { data, error } = await supabase
      .from('community_questions')
      .update({
        visualizacoes: supabase.raw('visualizacoes + 1')
      })
      .eq('id', questionId)

    return { data, error }
  },

  // Obter todas as questões (para moderação) - versão simples
  getAllQuestions: async () => {
    try {
      console.log('🔍 Buscando todas as questões para moderação...')

      const { data, error } = await supabase
        .from('community_questions')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('🔍 Resultado da busca:', { data, error })

      if (error) {
        console.error('❌ Erro ao buscar todas as questões:', error)
        return { data: [], error }
      }

      console.log(`✅ Encontradas ${data?.length || 0} questões`)
      return { data: data || [], error: null }
    } catch (err) {
      console.error('💥 Erro inesperado ao buscar questões:', err)
      return { data: [], error: err }
    }
  },

  // Atualizar status da questão
  updateQuestionStatus: async (questionId, status) => {
    try {
      console.log(`📝 Atualizando status da questão ${questionId} para ${status}`)

      const { data, error } = await supabase
        .from('community_questions')
        .update({
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', questionId)
        .select()

      if (error) {
        console.error('❌ Erro ao atualizar status:', error)
        return { data: null, error }
      }

      console.log('✅ Status atualizado com sucesso:', data)
      return { data, error: null }
    } catch (err) {
      console.error('💥 Erro inesperado ao atualizar status:', err)
      return { data: null, error: err }
    }
  },

  // Obter estatísticas reais do usuário
  getUserStats: async (userId) => {
    try {
      console.log('📊 Buscando estatísticas do usuário:', userId)

      // Buscar questões criadas pelo usuário
      const { data: questionsData, error: questionsError } = await supabase
        .from('community_questions')
        .select('id, status, created_at')
        .eq('user_id', userId)

      if (questionsError) {
        console.error('❌ Erro ao buscar questões:', questionsError)
      }

      // Buscar simulados realizados (se houver tabela)
      // Por enquanto, vamos usar dados básicos
      const questoesCriadas = questionsData?.length || 0
      const questoesAprovadas = questionsData?.filter(q => q.status === 'approved').length || 0

      const stats = {
        simuladosCompletos: 0, // TODO: implementar quando houver tabela de simulados
        questoesCriadas: questoesCriadas,
        questoesAprovadas: questoesAprovadas,
        taxaAcerto: 0, // TODO: implementar quando houver tabela de respostas
        tempoEstudo: 0, // TODO: implementar tracking de tempo
        ranking: 0, // TODO: implementar sistema de ranking
        pontos: questoesAprovadas * 10 // 10 pontos por questão aprovada
      }

      console.log('✅ Estatísticas calculadas:', stats)
      return { data: stats, error: null }
    } catch (err) {
      console.error('💥 Erro inesperado ao buscar estatísticas:', err)
      return { data: null, error: err }
    }
  },

  // Obter conquistas baseadas no progresso real
  getUserAchievements: async (userId) => {
    try {
      console.log('🏆 Calculando conquistas do usuário:', userId)

      // Buscar dados do usuário
      const { data: stats } = await communityQuestions.getUserStats(userId)

      if (!stats) {
        return { data: [], error: null }
      }

      // Definir conquistas baseadas no progresso
      const achievements = [
        {
          id: 1,
          title: 'Primeiro Passo',
          description: 'Criou sua conta no FisioNeo',
          icon: 'User',
          unlocked: true, // Sempre desbloqueada ao criar conta
          unlockedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Criador de Conteúdo',
          description: 'Criou sua primeira questão',
          icon: 'Plus',
          unlocked: stats.questoesCriadas > 0,
          unlockedAt: stats.questoesCriadas > 0 ? new Date().toISOString() : null
        },
        {
          id: 3,
          title: 'Contribuidor Ativo',
          description: 'Criou 5 questões',
          icon: 'BookOpen',
          unlocked: stats.questoesCriadas >= 5,
          unlockedAt: stats.questoesCriadas >= 5 ? new Date().toISOString() : null
        },
        {
          id: 4,
          title: 'Questões Aprovadas',
          description: 'Teve sua primeira questão aprovada',
          icon: 'Award',
          unlocked: stats.questoesAprovadas > 0,
          unlockedAt: stats.questoesAprovadas > 0 ? new Date().toISOString() : null
        },
        {
          id: 5,
          title: 'Expert da Comunidade',
          description: 'Teve 10 questões aprovadas',
          icon: 'Trophy',
          unlocked: stats.questoesAprovadas >= 10,
          unlockedAt: stats.questoesAprovadas >= 10 ? new Date().toISOString() : null
        },
        {
          id: 6,
          title: 'Primeiro Simulado',
          description: 'Completou seu primeiro simulado',
          icon: 'Target',
          unlocked: stats.simuladosCompletos > 0,
          unlockedAt: stats.simuladosCompletos > 0 ? new Date().toISOString() : null
        },
        {
          id: 7,
          title: 'Estudioso',
          description: 'Completou 10 simulados',
          icon: 'Clock',
          unlocked: stats.simuladosCompletos >= 10,
          unlockedAt: stats.simuladosCompletos >= 10 ? new Date().toISOString() : null
        }
      ]

      const unlockedCount = achievements.filter(a => a.unlocked).length
      console.log(`✅ ${unlockedCount}/${achievements.length} conquistas desbloqueadas`)

      return { data: achievements, error: null }
    } catch (err) {
      console.error('💥 Erro inesperado ao calcular conquistas:', err)
      return { data: [], error: err }
    }
  }
}

// Funções para newsletter
export const newsletter = {
  // Inscrever email na newsletter
  subscribe: async (email, name = null) => {
    try {
      console.log('📧 INICIANDO inscrição na newsletter:', email)

      const insertData = {
        email: email,
        is_active: true
      }

      // Adicionar nome se fornecido
      if (name && name.trim()) {
        insertData.name = name.trim()
      }

      console.log('📧 Dados para inserir:', insertData)

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert(insertData)

      console.log('📧 Resposta do Supabase:', { data, error })

      if (error) {
        // Se o email já existe, considerar como sucesso
        if (error.code === '23505') { // Unique constraint violation
          console.log('📧 Email já inscrito:', email)
          return { data: null, error: null, message: 'Email já inscrito na newsletter!' }
        }
        console.error('❌ Erro ao inscrever email:', error)
        return { data: null, error: { message: error.message } }
      }

      console.log('✅ Email inscrito com sucesso!')
      return { data: true, error: null, message: 'Inscrição realizada com sucesso!' }
    } catch (err) {
      console.error('💥 Erro inesperado na inscrição:', err)
      return { data: null, error: { message: err.message } }
    }
  },

  // Cancelar inscrição
  unsubscribe: async (email) => {
    try {
      console.log('📧 Cancelando inscrição:', email)

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: false
        })
        .eq('email', email)
        .select()

      if (error) {
        console.error('❌ Erro ao cancelar inscrição:', error)
        return { data: null, error }
      }

      console.log('✅ Inscrição cancelada:', data)
      return { data, error: null }
    } catch (err) {
      console.error('💥 Erro inesperado ao cancelar:', err)
      return { data: null, error: { message: err.message } }
    }
  },

  // Obter estatísticas da newsletter
  getStats: async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('is_active')

      if (error) {
        console.error('❌ Erro ao buscar estatísticas:', error)
        return { data: null, error }
      }

      const stats = {
        total: data.length,
        active: data.filter(s => s.is_active === true).length,
        inactive: data.filter(s => s.is_active === false).length
      }

      return { data: stats, error: null }
    } catch (err) {
      console.error('💥 Erro inesperado nas estatísticas:', err)
      return { data: null, error: { message: err.message } }
    }
  }
}

// Funções para perfil do usuário
export const userProfile = {
  // Criar/atualizar perfil
  updateProfile: async (userId, profileData) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  // Criar perfil inicial
  createProfile: async (userId, email, additionalData = {}) => {
    try {
      const profileData = {
        id: userId,
        email: email,
        nome: additionalData.nome || email.split('@')[0],
        instituicao: additionalData.instituicao || '',
        curso: additionalData.curso || '',
        periodo: additionalData.periodo || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('Criando perfil:', profileData)

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()

      return { data, error }
    } catch (err) {
      console.error('Erro ao criar perfil:', err)
      return { data: null, error: err }
    }
  },

  // Obter perfil
  getProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle() // Use maybeSingle em vez de single para evitar erro se não encontrar

      if (error && error.code !== 'PGRST116') { // PGRST116 é "not found"
        console.error('Erro ao buscar perfil:', error)
        return { data: null, error }
      }

      return { data: data || null, error: null }
    } catch (err) {
      console.error('Erro inesperado ao buscar perfil:', err)
      return { data: null, error: err }
    }
  }
}

export default supabase
