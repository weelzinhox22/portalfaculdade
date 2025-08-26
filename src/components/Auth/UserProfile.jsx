import React, { useState } from 'react'
import { User, Mail, Building, GraduationCap, Calendar, LogOut, Settings, BarChart3 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const UserProfile = ({ isOpen, onClose }) => {
  const { user, profile, signOut, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('perfil')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    nome: profile?.nome || '',
    instituicao: profile?.instituicao || '',
    curso: profile?.curso || '',
    periodo: profile?.periodo || ''
  })

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
      } else {
        setMessage('Perfil atualizado com sucesso!')
        setEditing(false)
      }
    } catch (err) {
      setMessage('Erro inesperado')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  if (!isOpen || !user) return null

  return (
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
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 0 2rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{
              margin: 0,
              color: '#1f2937',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Meu Perfil
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: '#6b7280'
              }}
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { id: 'perfil', label: 'Perfil', icon: User },
              { id: 'estatisticas', label: 'Estatísticas', icon: BarChart3 },
              { id: 'configuracoes', label: 'Configurações', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#6b7280',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
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

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {message && (
            <div style={{
              background: message.includes('sucesso') ? '#dcfce7' : '#fee2e2',
              color: message.includes('sucesso') ? '#16a34a' : '#dc2626',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {message}
            </div>
          )}

          {/* Tab: Perfil */}
          {activeTab === 'perfil' && (
            <div>
              {/* Avatar e Info Básica */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {profile?.nome ? profile.nome.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1f2937' }}>
                    {profile?.nome || 'Usuário'}
                  </h3>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Formulário de Perfil */}
              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      disabled={!editing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        background: editing ? 'white' : '#f9fafb',
                        color: editing ? '#1f2937' : '#6b7280'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Instituição
                    </label>
                    <input
                      type="text"
                      name="instituicao"
                      value={formData.instituicao}
                      onChange={handleInputChange}
                      disabled={!editing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        background: editing ? 'white' : '#f9fafb',
                        color: editing ? '#1f2937' : '#6b7280'
                      }}
                      placeholder="Ex: UNIFESP, USP, UFMG..."
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        Curso
                      </label>
                      <input
                        type="text"
                        name="curso"
                        value={formData.curso}
                        onChange={handleInputChange}
                        disabled={!editing}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          background: editing ? 'white' : '#f9fafb',
                          color: editing ? '#1f2937' : '#6b7280'
                        }}
                        placeholder="Fisioterapia"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        Período
                      </label>
                      <input
                        type="text"
                        name="periodo"
                        value={formData.periodo}
                        onChange={handleInputChange}
                        disabled={!editing}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          background: editing ? 'white' : '#f9fafb',
                          color: editing ? '#1f2937' : '#6b7280'
                        }}
                        placeholder="Ex: 5º período"
                      />
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '2rem',
                  justifyContent: 'flex-end'
                }}>
                  {editing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false)
                          setFormData({
                            nome: profile?.nome || '',
                            instituicao: profile?.instituicao || '',
                            curso: profile?.curso || '',
                            periodo: profile?.periodo || ''
                          })
                        }}
                        style={{
                          background: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
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
                          borderRadius: '0.5rem',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        {loading ? 'Salvando...' : 'Salvar'}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
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
                      Editar Perfil
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Tab: Estatísticas */}
          {activeTab === 'estatisticas' && (
            <div>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Suas Estatísticas</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  background: '#f0f9ff',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0369a1' }}>0</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Simulados Realizados</div>
                </div>
                <div style={{
                  background: '#f0fdf4',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>0%</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Taxa de Acerto</div>
                </div>
                <div style={{
                  background: '#fefce8',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ca8a04' }}>0</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Questões Criadas</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Configurações */}
          {activeTab === 'configuracoes' && (
            <div>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Configurações da Conta</h3>
              
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#1f2937' }}>Sair da Conta</h4>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
                      Desconectar desta sessão
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
