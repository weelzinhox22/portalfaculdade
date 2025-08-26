import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, auth, userProfile } from '../config/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar usuário atual ao carregar
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // Carregar perfil do usuário
          const { data: profileData } = await userProfile.getProfile(user.id)
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        // Carregar perfil
        const { data: profileData } = await userProfile.getProfile(session.user.id)
        setProfile(profileData)
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      console.log('📝 INICIANDO cadastro...')
      console.log('📝 Email tipo:', typeof email, 'valor:', email)
      console.log('📝 Password tipo:', typeof password, 'length:', password?.length)
      console.log('📝 UserData:', userData)

      // Validação rigorosa dos parâmetros
      if (!email || typeof email !== 'string') {
        throw new Error('Email inválido')
      }

      if (!password || typeof password !== 'string') {
        throw new Error('Senha inválida')
      }

      // Garantir que são strings limpas
      const cleanEmail = String(email).trim()
      const cleanPassword = String(password)

      console.log('📝 Email limpo:', cleanEmail)
      console.log('📝 Chamando auth.signUp...')

      // Teste direto com o cliente Supabase
      console.log('📝 Tentando cadastro direto...')

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword
      })

      console.log('📝 Resposta completa do Supabase:')
      console.log('📝 Data:', data)
      console.log('📝 Error:', error)

      if (error) {
        console.error('❌ Erro no cadastro:', error)
        return { data: null, error }
      }

      // Criar perfil inicial se o usuário foi criado
      if (data?.user) {
        console.log('👤 Usuário criado, ID:', data.user.id)
        console.log('👤 Criando perfil inicial...')

        try {
          const profileData = {
            nome: userData?.nome || email.split('@')[0],
            instituicao: userData?.instituicao || '',
            curso: userData?.curso || '',
            periodo: userData?.periodo || '',
            email: email
          }

          console.log('👤 Dados do perfil a criar:', profileData)

          const profileResult = await userProfile.updateProfile(data.user.id, profileData)
          console.log('👤 Resultado da criação do perfil:', profileResult)

          if (profileResult.error) {
            console.error('⚠️ Erro ao criar perfil:', profileResult.error)
          } else {
            console.log('✅ Perfil criado com sucesso')
          }
        } catch (profileError) {
          console.error('💥 Erro inesperado ao criar perfil:', profileError)
          // Não falhar o cadastro por causa do perfil
        }
      }

      console.log('✅ Cadastro concluído com sucesso')
      return { data, error: null }
    } catch (error) {
      console.error('💥 Erro inesperado no cadastro:', error)
      return { data: null, error: { message: error.message } }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      console.log('🔐 Tentando fazer login com:', email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      console.log('🔐 Resultado do login:', { data, error })

      if (error) {
        console.error('❌ Erro no login:', error)
        return { data: null, error }
      }

      console.log('✅ Login realizado com sucesso')
      return { data, error: null }
    } catch (error) {
      console.error('💥 Erro inesperado no login:', error)
      return { data: null, error: { message: error.message } }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      console.log('🚪 Fazendo logout...')

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('❌ Erro no logout:', error)
        return { error }
      }

      // Limpar estado local
      setUser(null)
      setProfile(null)

      console.log('✅ Logout realizado com sucesso')
      return { error: null }
    } catch (error) {
      console.error('💥 Erro inesperado no logout:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      if (!user) throw new Error('Usuário não autenticado')
      
      const { data, error } = await userProfile.updateProfile(user.id, profileData)
      
      if (!error) {
        setProfile(prev => ({ ...prev, ...profileData }))
      }
      
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
