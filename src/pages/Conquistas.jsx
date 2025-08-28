import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Award, Star, Lock, CheckCircle, Target, Calendar, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const Conquistas = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [stats, setStats] = useState({
    livrosLidos: 0,
    artigos: 0,
    quizCompletos: 0,
    horasEstudo: 0,
    streak: 0,
    pontos: 0
  });

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Simular dados do usuário
    setStats({
      livrosLidos: Math.floor(Math.random() * 15) + 1,
      artigos: Math.floor(Math.random() * 25) + 5,
      quizCompletos: Math.floor(Math.random() * 8) + 2,
      horasEstudo: Math.floor(Math.random() * 50) + 10,
      streak: Math.floor(Math.random() * 15) + 1,
      pontos: Math.floor(Math.random() * 800) + 200
    });
  }, [isAuthenticated, navigate]);

  const todasConquistas = [
    // Conquistas de Leitura
    { 
      id: 1, 
      categoria: 'Leitura',
      nome: 'Primeiro Livro', 
      descricao: 'Leia seu primeiro livro digital', 
      icone: '📖', 
      pontos: 50,
      requisito: 1,
      tipo: 'livros',
      desbloqueado: stats.livrosLidos >= 1,
      raridade: 'comum'
    },
    { 
      id: 2, 
      categoria: 'Leitura',
      nome: 'Leitor Dedicado', 
      descricao: 'Leia 5 livros digitais', 
      icone: '📚', 
      pontos: 150,
      requisito: 5,
      tipo: 'livros',
      desbloqueado: stats.livrosLidos >= 5,
      raridade: 'raro'
    },
    { 
      id: 3, 
      categoria: 'Leitura',
      nome: 'Bibliófilo', 
      descricao: 'Leia 10 livros digitais', 
      icone: '📖', 
      pontos: 300,
      requisito: 10,
      tipo: 'livros',
      desbloqueado: stats.livrosLidos >= 10,
      raridade: 'epico'
    },
    { 
      id: 4, 
      categoria: 'Leitura',
      nome: 'Mestre dos Livros', 
      descricao: 'Leia 20 livros digitais', 
      icone: '🏆', 
      pontos: 500,
      requisito: 20,
      tipo: 'livros',
      desbloqueado: stats.livrosLidos >= 20,
      raridade: 'lendario'
    },

    // Conquistas de Quiz
    { 
      id: 5, 
      categoria: 'Quiz',
      nome: 'Primeiro Quiz', 
      descricao: 'Complete seu primeiro quiz', 
      icone: '🧠', 
      pontos: 25,
      requisito: 1,
      tipo: 'quiz',
      desbloqueado: stats.quizCompletos >= 1,
      raridade: 'comum'
    },
    { 
      id: 6, 
      categoria: 'Quiz',
      nome: 'Expert em Quiz', 
      descricao: 'Complete 5 quiz', 
      icone: '🎯', 
      pontos: 100,
      requisito: 5,
      tipo: 'quiz',
      desbloqueado: stats.quizCompletos >= 5,
      raridade: 'raro'
    },
    { 
      id: 7, 
      categoria: 'Quiz',
      nome: 'Mestre do Conhecimento', 
      descricao: 'Complete 10 quiz', 
      icone: '🏅', 
      pontos: 250,
      requisito: 10,
      tipo: 'quiz',
      desbloqueado: stats.quizCompletos >= 10,
      raridade: 'epico'
    },

    // Conquistas de Estudo
    { 
      id: 8, 
      categoria: 'Estudo',
      nome: 'Estudante Consistente', 
      descricao: 'Estude por 7 dias seguidos', 
      icone: '🔥', 
      pontos: 200,
      requisito: 7,
      tipo: 'streak',
      desbloqueado: stats.streak >= 7,
      raridade: 'raro'
    },
    { 
      id: 9, 
      categoria: 'Estudo',
      nome: 'Maratonista', 
      descricao: 'Acumule 20 horas de estudo', 
      icone: '⏰', 
      pontos: 300,
      requisito: 20,
      tipo: 'horas',
      desbloqueado: stats.horasEstudo >= 20,
      raridade: 'epico'
    },
    { 
      id: 10, 
      categoria: 'Estudo',
      nome: 'Dedicação Total', 
      descricao: 'Estude por 30 dias seguidos', 
      icone: '💎', 
      pontos: 1000,
      requisito: 30,
      tipo: 'streak',
      desbloqueado: stats.streak >= 30,
      raridade: 'lendario'
    },

    // Conquistas de Artigos
    { 
      id: 11, 
      categoria: 'Artigos',
      nome: 'Primeiro Artigo', 
      descricao: 'Leia seu primeiro artigo', 
      icone: '📝', 
      pontos: 15,
      requisito: 1,
      tipo: 'artigos',
      desbloqueado: stats.artigos >= 1,
      raridade: 'comum'
    },
    { 
      id: 12, 
      categoria: 'Artigos',
      nome: 'Leitor Ávido', 
      descricao: 'Leia 10 artigos', 
      icone: '📄', 
      pontos: 75,
      requisito: 10,
      tipo: 'artigos',
      desbloqueado: stats.artigos >= 10,
      raridade: 'raro'
    },

    // Conquistas Especiais
    { 
      id: 13, 
      categoria: 'Especial',
      nome: 'Explorador', 
      descricao: 'Visite todas as seções do site', 
      icone: '🗺️', 
      pontos: 100,
      requisito: 1,
      tipo: 'especial',
      desbloqueado: true,
      raridade: 'raro'
    },
    { 
      id: 14, 
      categoria: 'Especial',
      nome: 'Membro VIP', 
      descricao: 'Seja um dos primeiros 100 usuários', 
      icone: '👑', 
      pontos: 500,
      requisito: 1,
      tipo: 'especial',
      desbloqueado: true,
      raridade: 'lendario'
    }
  ];

  const getRaridadeColor = (raridade) => {
    switch (raridade) {
      case 'comum': return '#6b7280';
      case 'raro': return '#0ea5e9';
      case 'epico': return '#8b5cf6';
      case 'lendario': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getRaridadeName = (raridade) => {
    switch (raridade) {
      case 'comum': return 'Comum';
      case 'raro': return 'Raro';
      case 'epico': return 'Épico';
      case 'lendario': return 'Lendário';
      default: return raridade;
    }
  };

  const conquistasDesbloqueadas = todasConquistas.filter(c => c.desbloqueado);
  const conquistasBloqueadas = todasConquistas.filter(c => !c.desbloqueado);

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h1 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              🏆 Suas Conquistas
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              {conquistasDesbloqueadas.length} de {todasConquistas.length} conquistas desbloqueadas
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: '#f0fdf4',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#166534'
                }}>
                  {conquistasDesbloqueadas.reduce((total, c) => total + c.pontos, 0)}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#166534'
                }}>
                  Pontos Ganhos
                </div>
              </div>
              
              <div style={{
                background: '#fef3c7',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#92400e'
                }}>
                  {Math.round((conquistasDesbloqueadas.length / todasConquistas.length) * 100)}%
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#92400e'
                }}>
                  Completado
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conquistas Desbloqueadas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              marginBottom: '3rem'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle size={24} color="#10b981" />
              Conquistas Desbloqueadas ({conquistasDesbloqueadas.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {conquistasDesbloqueadas.map((conquista, index) => (
                <motion.div
                  key={conquista.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ transform: 'translateY(-5px)' }}
                  style={{
                    background: 'white',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: `2px solid ${getRaridadeColor(conquista.raridade)}20`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: getRaridadeColor(conquista.raridade),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {getRaridadeName(conquista.raridade)}
                  </div>

                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: `${getRaridadeColor(conquista.raridade)}20`,
                    borderRadius: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {conquista.icone}
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    {conquista.nome}
                  </h3>

                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                  }}>
                    {conquista.descricao}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#10b981',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      <CheckCircle size={16} />
                      Desbloqueado
                    </div>
                    
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      +{conquista.pontos} pts
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conquistas Bloqueadas */}
          {conquistasBloqueadas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Lock size={24} color="#6b7280" />
                Próximas Conquistas ({conquistasBloqueadas.length})
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {conquistasBloqueadas.map((conquista, index) => (
                  <motion.div
                    key={conquista.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: 'white',
                      borderRadius: '1.5rem',
                      padding: '2rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      opacity: 0.7,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#6b7280',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {getRaridadeName(conquista.raridade)}
                    </div>

                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: '#f3f4f6',
                      borderRadius: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      marginBottom: '1.5rem',
                      filter: 'grayscale(100%)'
                    }}>
                      {conquista.icone}
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#6b7280',
                      marginBottom: '0.5rem'
                    }}>
                      {conquista.nome}
                    </h3>

                    <p style={{
                      color: '#9ca3af',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                      lineHeight: '1.5'
                    }}>
                      {conquista.descricao}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#6b7280',
                        fontSize: '0.875rem'
                      }}>
                        <Lock size={16} />
                        {stats[conquista.tipo] || 0}/{conquista.requisito}
                      </div>
                      
                      <div style={{
                        background: '#6b7280',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        +{conquista.pontos} pts
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div style={{
                      marginTop: '1rem',
                      width: '100%',
                      height: '6px',
                      background: '#e5e7eb',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min(((stats[conquista.tipo] || 0) / conquista.requisito) * 100, 100)}%`,
                        background: getRaridadeColor(conquista.raridade),
                        borderRadius: '3px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botão Voltar ao Dashboard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              📊 Voltar ao Dashboard
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Conquistas;
