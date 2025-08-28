import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, FileText, Play, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritos } from '../contexts/FavoritosContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const Favoritos = () => {
  const { user, isAuthenticated } = useAuth();
  const { favoritos, removerFavorito } = useFavoritos();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [filtro, setFiltro] = useState('todos');

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
  }, [isAuthenticated, navigate]);

  // Função já vem do contexto

  const favoritosFiltrados = favoritos.filter(item => 
    filtro === 'todos' || item.tipo === filtro
  );

  const getIcone = (tipo) => {
    switch (tipo) {
      case 'livro': return { icone: BookOpen, cor: '#10b981' };
      case 'artigo': return { icone: FileText, cor: '#0ea5e9' };
      case 'curso': return { icone: Play, cor: '#8b5cf6' };
      default: return { icone: Heart, cor: '#ef4444' };
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'livro': return 'Livro';
      case 'artigo': return 'Artigo';
      case 'curso': return 'Curso';
      default: return tipo;
    }
  };

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
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
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <Heart size={isMobile ? 32 : 48} color="#ef4444" />
              Meus Favoritos
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280'
            }}>
              {favoritos.length} {favoritos.length === 1 ? 'item salvo' : 'itens salvos'}
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { id: 'todos', nome: 'Todos', icone: '📋' },
                { id: 'livro', nome: 'Livros', icone: '📚' },
                { id: 'artigo', nome: 'Artigos', icone: '📝' },
                { id: 'curso', nome: 'Cursos', icone: '🎓' }
              ].map(opcao => (
                <button
                  key={opcao.id}
                  onClick={() => setFiltro(opcao.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: filtro === opcao.id ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    background: filtro === opcao.id ? '#fef2f2' : 'white',
                    color: filtro === opcao.id ? '#ef4444' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{opcao.icone}</span>
                  {opcao.nome}
                  <span style={{
                    background: filtro === opcao.id ? '#ef4444' : '#e5e7eb',
                    color: filtro === opcao.id ? 'white' : '#6b7280',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    marginLeft: '0.25rem'
                  }}>
                    {opcao.id === 'todos' 
                      ? favoritos.length 
                      : favoritos.filter(f => f.tipo === opcao.id).length}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Lista de Favoritos */}
          {favoritosFiltrados.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                💔
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Nenhum favorito encontrado
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                {filtro === 'todos' 
                  ? 'Você ainda não salvou nenhum item como favorito'
                  : `Você não tem ${filtro}s salvos como favoritos`}
              </p>
              <button
                onClick={() => navigate('/livros')}
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📚 Explorar Conteúdo
              </button>
            </motion.div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {favoritosFiltrados.map((item, index) => {
                const { icone: IconeComponent, cor } = getIcone(item.tipo);
                
                return (
                  <motion.div
                    key={item.id}
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
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: `${cor}20`,
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconeComponent size={24} color={cor} />
                      </div>
                      
                      <button
                        onClick={() => removerFavorito(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease'
                        }}
                        title="Remover dos favoritos"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div style={{
                      background: cor,
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '1rem'
                    }}>
                      {getTipoLabel(item.tipo)}
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {item.titulo}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      marginBottom: '1rem'
                    }}>
                      {item.descricao}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#6b7280',
                        fontSize: '0.75rem'
                      }}>
                        <Calendar size={14} />
                        {new Date(item.dataAdicionado).toLocaleDateString('pt-BR')}
                      </div>
                      
                      {item.preco && (
                        <div style={{
                          background: '#10b981',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {item.preco}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(item.link)}
                      style={{
                        width: '100%',
                        background: `linear-gradient(135deg, ${cor} 0%, ${cor}dd 100%)`,
                        color: 'white',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ExternalLink size={16} />
                      Acessar {getTipoLabel(item.tipo)}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '3rem',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'white',
                color: '#ef4444',
                border: '2px solid #ef4444',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📊 Voltar ao Dashboard
            </button>
            
            <button
              onClick={() => navigate('/livros')}
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📚 Explorar Mais Conteúdo
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Favoritos;
