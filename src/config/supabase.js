import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qzuyutklullrypjkgdze.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dXl1dGtsdWxscnlwamtnZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjMzNDksImV4cCI6MjA1ODY5OTM0OX0.QnCAwPpeV7SY5soEysoUvbBgBLX0zbtFaKyghv31Pi4'

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

export default supabase
