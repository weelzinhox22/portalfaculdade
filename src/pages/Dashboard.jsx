import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, BookOpen, Trophy, Target, Clock, TrendingUp,
  Calendar, Star, Award, Brain, Heart, Download,
  BarChart3, PieChart, Activity, Zap, CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritos } from '../contexts/FavoritosContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { favoritos } = useFavoritos();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    livrosLidos: 0,
    artigos: 0,
    quizCompletos: 0,
    horasEstudo: 0,
    streak: 0,
    pontos: 0,
    nivel: 1,
    proximoNivel: 100
  });

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Simular carregamento de dados
    setTimeout(() => {
      // Dados simulados baseados no usuário
      setStats({
        livrosLidos: Math.floor(Math.random() * 15) + 1,
        artigos: Math.floor(Math.random() * 25) + 5,
        quizCompletos: Math.floor(Math.random() * 8) + 2,
        horasEstudo: Math.floor(Math.random() * 50) + 10,
        streak: Math.floor(Math.random() * 15) + 1,
        pontos: Math.floor(Math.random() * 800) + 200,
        nivel: Math.floor(Math.random() * 5) + 1,
        proximoNivel: 100
      });
      setLoading(false);
    }, 1500);
  }, [isAuthenticated, navigate]);

  const conquistas = [
    { id: 1, nome: 'Primeiro Quiz', descricao: 'Complete seu primeiro quiz', icone: '🧠', desbloqueado: true },
    { id: 2, nome: 'Leitor Dedicado', descricao: 'Leia 5 livros', icone: '📚', desbloqueado: stats.livrosLidos >= 5 },
    { id: 3, nome: 'Estudante Consistente', descricao: '7 dias seguidos estudando', icone: '🔥', desbloqueado: stats.streak >= 7 },
    { id: 4, nome: 'Expert em Quiz', descricao: 'Complete 5 quiz', icone: '🎯', desbloqueado: stats.quizCompletos >= 5 },
    { id: 5, nome: 'Maratonista', descricao: '20 horas de estudo', icone: '⏰', desbloqueado: stats.horasEstudo >= 20 },
    { id: 6, nome: 'Conhecimento Profundo', descricao: 'Leia 10 livros', icone: '🏆', desbloqueado: stats.livrosLidos >= 10 }
  ];

  const atividadesRecentes = [
    { id: 1, tipo: 'quiz', titulo: 'Quiz de Anatomia', data: '2024-01-15', pontos: 85 },
    { id: 2, tipo: 'livro', titulo: 'Fisioterapia Respiratória', data: '2024-01-14', pontos: 50 },
    { id: 3, tipo: 'artigo', titulo: 'Lombalgia: Causas e Tratamento', data: '2024-01-13', pontos: 25 },
    { id: 4, tipo: 'quiz', titulo: 'Quiz de Exercícios', data: '2024-01-12', pontos: 92 },
    { id: 5, tipo: 'livro', titulo: 'Anatomia Humana', data: '2024-01-11', pontos: 50 }
  ];

  const metasSemanais = [
    { id: 1, meta: 'Ler 2 livros', progresso: 1, total: 2, icone: '📚' },
    { id: 2, meta: 'Completar 3 quiz', progresso: 2, total: 3, icone: '🧠' },
    { id: 3, meta: 'Estudar 10 horas', progresso: 7, total: 10, icone: '⏰' },
    { id: 4, meta: 'Ler 5 artigos', progresso: 3, total: 5, icone: '📝' }
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          paddingTop: '6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #0ea5e9',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem auto'
            }} />
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Carregando seu Dashboard...
            </h2>
            <p style={{ color: '#6b7280' }}>
              Preparando suas estatísticas e progresso
            </p>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          {/* Header do Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700'
                }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    Olá, {user?.name || 'Estudante'}! 👋
                  </h1>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '1.125rem'
                  }}>
                    Bem-vindo ao seu painel de estudos
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                padding: '1rem 1.5rem',
                borderRadius: '1rem'
              }}>
                <Trophy size={24} color="#f59e0b" />
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    Nível {stats.nivel}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#92400e'
                  }}>
                    {stats.pontos} pontos
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Estatísticas Principais */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { 
                titulo: 'Livros Lidos', 
                valor: stats.livrosLidos, 
                icone: BookOpen, 
                cor: '#10b981',
                fundo: '#ecfdf5'
              },
              { 
                titulo: 'Artigos Lidos', 
                valor: stats.artigos, 
                icone: Star, 
                cor: '#f59e0b',
                fundo: '#fef3c7'
              },
              { 
                titulo: 'Quiz Completos', 
                valor: stats.quizCompletos, 
                icone: Brain, 
                cor: '#8b5cf6',
                fundo: '#f3e8ff'
              },
              { 
                titulo: 'Horas de Estudo', 
                valor: stats.horasEstudo, 
                icone: Clock, 
                cor: '#ef4444',
                fundo: '#fef2f2'
              },
              {
                titulo: 'Sequência',
                valor: `${stats.streak} dias`,
                icone: () => <span style={{ fontSize: '24px' }}>🔥</span>,
                cor: '#f97316',
                fundo: '#fff7ed'
              },
              {
                titulo: 'Pontos Totais',
                valor: stats.pontos,
                icone: Zap,
                cor: '#0ea5e9',
                fundo: '#f0f9ff'
              },
              {
                titulo: 'Favoritos',
                valor: favoritos.length,
                icone: Heart,
                cor: '#ef4444',
                fundo: '#fef2f2'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ transform: 'translateY(-5px)' }}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${stat.fundo}`
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: stat.fundo,
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <stat.icone size={24} color={stat.cor} />
                  </div>
                </div>
                
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {stat.valor}
                </div>
                
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {stat.titulo}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Atividades Recentes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Activity size={24} color="#0ea5e9" />
                Atividades Recentes
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {atividadesRecentes.map((atividade, index) => (
                  <motion.div
                    key={atividade.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: '#f8fafc',
                      borderRadius: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ background: '#f1f5f9' }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: atividade.tipo === 'quiz' ? '#8b5cf6' : 
                                 atividade.tipo === 'livro' ? '#10b981' : '#f59e0b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem'
                    }}>
                      {atividade.tipo === 'quiz' ? '🧠' : 
                       atividade.tipo === 'livro' ? '📚' : '📝'}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.25rem'
                      }}>
                        {atividade.titulo}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        {new Date(atividade.data).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      +{atividade.pontos} pts
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar com Conquistas e Metas */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              {/* Conquistas */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  background: 'white',
                  borderRadius: '2rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Award size={20} color="#f59e0b" />
                  Conquistas
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {conquistas.slice(0, 4).map((conquista, index) => (
                    <motion.div
                      key={conquista.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        background: conquista.desbloqueado ? '#f0fdf4' : '#f8fafc',
                        borderRadius: '0.75rem',
                        opacity: conquista.desbloqueado ? 1 : 0.6
                      }}
                    >
                      <div style={{
                        fontSize: '1.5rem',
                        filter: conquista.desbloqueado ? 'none' : 'grayscale(100%)'
                      }}>
                        {conquista.icone}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: conquista.desbloqueado ? '#166534' : '#6b7280'
                        }}>
                          {conquista.nome}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: conquista.desbloqueado ? '#166534' : '#9ca3af'
                        }}>
                          {conquista.descricao}
                        </div>
                      </div>
                      {conquista.desbloqueado && (
                        <CheckCircle size={16} color="#10b981" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/conquistas')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Trophy size={16} />
                  Ver Todas
                </button>
              </motion.div>

              {/* Metas Semanais */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: 'white',
                  borderRadius: '2rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Target size={20} color="#8b5cf6" />
                  Metas da Semana
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {metasSemanais.map((meta, index) => (
                    <motion.div
                      key={meta.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        padding: '1rem',
                        background: '#f8fafc',
                        borderRadius: '1rem'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          <span>{meta.icone}</span>
                          {meta.meta}
                        </div>
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#6b7280'
                        }}>
                          {meta.progresso}/{meta.total}
                        </span>
                      </div>
                      
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: '#e5e7eb',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(meta.progresso / meta.total) * 100}%` }}
                          transition={{ delay: index * 0.2, duration: 0.8 }}
                          style={{
                            height: '100%',
                            background: meta.progresso === meta.total 
                              ? '#10b981' 
                              : '#8b5cf6',
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '2rem',
              marginTop: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              🚀 Continue Aprendendo
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {[
                { titulo: 'Fazer Quiz', link: '/quiz', cor: '#8b5cf6', icone: '🧠' },
                { titulo: 'Ler Livros', link: '/livros', cor: '#10b981', icone: '📚' },
                { titulo: 'Ver Artigos', link: '/blog', cor: '#f59e0b', icone: '📝' },
                { titulo: 'Meus Favoritos', link: '/favoritos', cor: '#ef4444', icone: '❤️' },
                { titulo: 'Fazer Curso', link: '/cursos', cor: '#8b5cf6', icone: '🎓' },
                { titulo: 'Ver Conquistas', link: '/conquistas', cor: '#f59e0b', icone: '🏆' }
              ].map((acao, index) => (
                <motion.button
                  key={index}
                  whileHover={{ transform: 'translateY(-2px)' }}
                  whileTap={{ transform: 'translateY(0)' }}
                  onClick={() => navigate(acao.link)}
                  style={{
                    background: `linear-gradient(135deg, ${acao.cor} 0%, ${acao.cor}dd 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{acao.icone}</span>
                  {acao.titulo}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
