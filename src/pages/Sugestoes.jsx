import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Lightbulb,
  Send,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  Filter,
  Loader
} from 'lucide-react';
import { inserirSugestao, buscarSugestoes, votarSugestao } from '../config/supabase';

const Sugestoes = () => {
  const [novaSugestao, setNovaSugestao] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: 'media'
  });

  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  // Sugestões de exemplo (fallback caso Supabase não esteja configurado)
  const sugestoesExemplo = [
    {
      id: 1,
      titulo: 'Calculadora de Escala de Dor',
      descricao: 'Implementar calculadoras para EVA, McGill e outras escalas de dor validadas',
      categoria: 'calculadoras',
      prioridade: 'alta',
      votos: 45,
      status: 'em-analise',
      autor: 'Maria Silva',
      created_at: '2024-01-15',
      comentarios: 8
    },
    {
      id: 2,
      titulo: 'Questões de Neurologia',
      descricao: 'Banco de questões específico para fisioterapia neurológica com casos clínicos',
      categoria: 'questoes',
      prioridade: 'alta',
      votos: 38,
      status: 'em-producao',
      autor: 'João Santos',
      created_at: '2024-01-12',
      comentarios: 12
    },
    {
      id: 3,
      titulo: 'Vídeos de Técnicas Manuais',
      descricao: 'Biblioteca de vídeos demonstrando técnicas de terapia manual',
      categoria: 'conteudo',
      prioridade: 'media',
      votos: 29,
      status: 'sugerido',
      autor: 'Ana Costa',
      created_at: '2024-01-10',
      comentarios: 5
    },
    {
      id: 4,
      titulo: 'Simulados de Concursos',
      descricao: 'Simulados específicos para concursos públicos em fisioterapia',
      categoria: 'questoes',
      prioridade: 'alta',
      votos: 52,
      status: 'concluido',
      autor: 'Pedro Lima',
      created_at: '2024-01-08',
      comentarios: 15
    },
    {
      id: 5,
      titulo: 'App Mobile',
      descricao: 'Versão mobile do portal para estudar em qualquer lugar',
      categoria: 'plataforma',
      prioridade: 'baixa',
      votos: 23,
      status: 'sugerido',
      autor: 'Carla Mendes',
      created_at: '2024-01-05',
      comentarios: 3
    }
  ];

  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('votos');

  // Carregar sugestões do Supabase
  const carregarSugestoes = async () => {
    setLoading(true);
    setErro(null);

    try {
      const resultado = await buscarSugestoes();

      if (resultado.success && resultado.data) {
        setSugestoes(resultado.data);
      } else {
        // Fallback para sugestões de exemplo se Supabase não estiver configurado
        console.warn('Supabase não configurado, usando dados de exemplo');
        setSugestoes(sugestoesExemplo);
      }
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
      setErro('Erro ao carregar sugestões. Usando dados de exemplo.');
      setSugestoes(sugestoesExemplo);
    } finally {
      setLoading(false);
    }
  };

  // Carregar sugestões ao montar o componente
  useEffect(() => {
    carregarSugestoes();
  }, []);

  const categorias = [
    { value: 'calculadoras', label: 'Calculadoras', icon: '🧮' },
    { value: 'questoes', label: 'Questões', icon: '❓' },
    { value: 'conteudo', label: 'Conteúdo', icon: '📚' },
    { value: 'plataforma', label: 'Plataforma', icon: '💻' },
    { value: 'outros', label: 'Outros', icon: '💡' }
  ];

  const statusConfig = {
    'sugerido': { label: 'Sugerido', cor: '#6b7280', icon: Lightbulb },
    'em-analise': { label: 'Em Análise', cor: '#f59e0b', icon: AlertCircle },
    'em-producao': { label: 'Em Produção', cor: '#3b82f6', icon: Clock },
    'concluido': { label: 'Concluído', cor: '#10b981', icon: CheckCircle }
  };

  const prioridadeConfig = {
    'baixa': { label: 'Baixa', cor: '#6b7280' },
    'media': { label: 'Média', cor: '#f59e0b' },
    'alta': { label: 'Alta', cor: '#ef4444' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!novaSugestao.titulo || !novaSugestao.descricao || !novaSugestao.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setEnviando(true);
    setErro(null);

    try {
      // Tentar enviar para o Supabase
      const resultado = await inserirSugestao({
        ...novaSugestao,
        autor: 'Usuário do Portal'
      });

      if (resultado.success) {
        // Sucesso - recarregar sugestões
        await carregarSugestoes();

        // Limpar formulário
        setNovaSugestao({
          titulo: '',
          descricao: '',
          categoria: '',
          prioridade: 'media'
        });

        alert('Sugestão enviada com sucesso! Obrigado pela contribuição.');
      } else {
        throw new Error(resultado.error || 'Erro ao enviar sugestão');
      }
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);

      // Fallback - adicionar localmente se Supabase falhar
      const sugestaoLocal = {
        id: Date.now(),
        ...novaSugestao,
        votos: 0,
        status: 'sugerido',
        autor: 'Usuário do Portal',
        created_at: new Date().toISOString(),
        comentarios: 0
      };

      setSugestoes([sugestaoLocal, ...sugestoes]);
      setNovaSugestao({
        titulo: '',
        descricao: '',
        categoria: '',
        prioridade: 'media'
      });

      alert('Sugestão salva localmente! (Supabase não configurado)');
    } finally {
      setEnviando(false);
    }
  };

  const handleVotar = async (id) => {
    try {
      // Tentar votar no Supabase
      const resultado = await votarSugestao(id);

      if (resultado.success) {
        // Recarregar sugestões para obter contagem atualizada
        await carregarSugestoes();
      } else {
        throw new Error('Erro ao votar no Supabase');
      }
    } catch (error) {
      console.error('Erro ao votar:', error);

      // Fallback - votar localmente
      setSugestoes(sugestoes.map(s =>
        s.id === id ? { ...s, votos: s.votos + 1 } : s
      ));
    }
  };

  const sugestoesFiltradas = sugestoes
    .filter(s => filtroCategoria === 'todas' || s.categoria === filtroCategoria)
    .filter(s => filtroStatus === 'todos' || s.status === filtroStatus)
    .sort((a, b) => {
      switch (ordenacao) {
        case 'votos': return b.votos - a.votos;
        case 'data': return new Date(b.data) - new Date(a.data);
        case 'comentarios': return b.comentarios - a.comentarios;
        default: return 0;
      }
    });

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e1f5fe 100%)',
        paddingTop: '6rem'
      }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#0d9488',
              textDecoration: 'none',
              marginBottom: '1rem',
              transition: 'color 0.2s ease',
              fontSize: '1rem',
              fontWeight: 500
            }}
            onMouseEnter={(e) => e.target.style.color = '#0f766e'}
            onMouseLeave={(e) => e.target.style.color = '#0d9488'}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Voltar ao Portal
          </Link>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '1rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Sugestões da Comunidade
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Ajude a construir o melhor portal de fisioterapia! Sugira novos conteúdos e vote nas melhores ideias.
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Formulário de Nova Sugestão */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #f3f4f6',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '0.75rem'
              }}>
                <Lightbulb style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>
                  Nova Sugestão
                </h2>
                <p style={{ color: '#6b7280' }}>
                  Compartilhe sua ideia conosco
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Título da Sugestão *
                </label>
                <input
                  type="text"
                  value={novaSugestao.titulo}
                  onChange={(e) => setNovaSugestao({...novaSugestao, titulo: e.target.value})}
                  placeholder="Ex: Calculadora de Índice de Barthel"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Categoria *
                </label>
                <select
                  value={novaSugestao.categoria}
                  onChange={(e) => setNovaSugestao({...novaSugestao, categoria: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Descrição Detalhada *
                </label>
                <textarea
                  value={novaSugestao.descricao}
                  onChange={(e) => setNovaSugestao({...novaSugestao, descricao: e.target.value})}
                  placeholder="Descreva sua sugestão em detalhes. Quanto mais específico, melhor!"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Prioridade
                </label>
                <select
                  value={novaSugestao.prioridade}
                  onChange={(e) => setNovaSugestao({...novaSugestao, prioridade: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={enviando}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  background: enviando ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: enviando ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  marginTop: '0.5rem',
                  opacity: enviando ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!enviando) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!enviando) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {enviando ? (
                  <>
                    <Loader style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
                    Enviar Sugestão
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Estatísticas */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #f3f4f6',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>
              Estatísticas da Comunidade
            </h3>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: '0.5rem',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
                  <span style={{ fontWeight: 500, color: '#166534' }}>Concluídas</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#166534' }}>
                  {sugestoes.filter(s => s.status === 'concluido').length}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#eff6ff',
                borderRadius: '0.5rem',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                  <span style={{ fontWeight: 500, color: '#1e40af' }}>Em Produção</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1e40af' }}>
                  {sugestoes.filter(s => s.status === 'em-producao').length}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#fffbeb',
                borderRadius: '0.5rem',
                border: '1px solid #fed7aa'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
                  <span style={{ fontWeight: 500, color: '#92400e' }}>Em Análise</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#92400e' }}>
                  {sugestoes.filter(s => s.status === 'em-analise').length}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                  <span style={{ fontWeight: 500, color: '#374151' }}>Total de Votos</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#374151' }}>
                  {sugestoes.reduce((total, s) => total + s.votos, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Lista de Sugestões */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>
          {/* Header com Filtros */}
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                Sugestões da Comunidade ({sugestoesFiltradas.length})
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Filtros</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                <option value="todas">Todas as categorias</option>
                {categorias.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                <option value="todos">Todos os status</option>
                <option value="sugerido">Sugerido</option>
                <option value="em-analise">Em Análise</option>
                <option value="em-producao">Em Produção</option>
                <option value="concluido">Concluído</option>
              </select>

              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                <option value="votos">Mais votadas</option>
                <option value="data">Mais recentes</option>
                <option value="comentarios">Mais comentadas</option>
              </select>
            </div>
          </div>

          {/* Lista de Sugestões */}
          <div style={{ padding: '0' }}>
            {loading ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                color: '#6b7280'
              }}>
                <Loader style={{
                  width: '32px',
                  height: '32px',
                  marginBottom: '1rem',
                  animation: 'spin 1s linear infinite'
                }} />
                <span>Carregando sugestões...</span>
              </div>
            ) : erro ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                color: '#ef4444'
              }}>
                <AlertCircle style={{ width: '32px', height: '32px', marginBottom: '1rem' }} />
                <span>{erro}</span>
              </div>
            ) : sugestoesFiltradas.length === 0 ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                color: '#6b7280'
              }}>
                <Lightbulb style={{ width: '32px', height: '32px', marginBottom: '1rem' }} />
                <span>Nenhuma sugestão encontrada com os filtros atuais</span>
              </div>
            ) : (
              sugestoesFiltradas.map((sugestao, index) => {
              const StatusIcon = statusConfig[sugestao.status].icon;

              return (
                <div key={sugestao.id} style={{
                  padding: '1.5rem 2rem',
                  borderBottom: index < sugestoesFiltradas.length - 1 ? '1px solid #e5e7eb' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {/* Área de Votação */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '60px'
                    }}>
                      <button
                        onClick={() => handleVotar(sugestao.id)}
                        style={{
                          background: 'none',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          marginBottom: '0.25rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.background = '#eff6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.background = 'none';
                        }}
                      >
                        <ThumbsUp style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
                        {sugestao.votos}
                      </span>
                    </div>

                    {/* Conteúdo da Sugestão */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: '#111827',
                          margin: 0,
                          lineHeight: 1.4
                        }}>
                          {sugestao.titulo}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.75rem',
                            background: statusConfig[sugestao.status].cor,
                            color: 'white',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}>
                            <StatusIcon style={{ width: '12px', height: '12px' }} />
                            {statusConfig[sugestao.status].label}
                          </span>

                          <span style={{
                            padding: '0.25rem 0.75rem',
                            background: prioridadeConfig[sugestao.prioridade].cor,
                            color: 'white',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}>
                            {prioridadeConfig[sugestao.prioridade].label}
                          </span>
                        </div>
                      </div>

                      <p style={{
                        color: '#6b7280',
                        marginBottom: '1rem',
                        lineHeight: 1.5,
                        fontSize: '0.875rem'
                      }}>
                        {sugestao.descricao}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span>Por {sugestao.autor}</span>
                          <span>{new Date(sugestao.created_at).toLocaleDateString('pt-BR')}</span>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            background: '#f3f4f6',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}>
                            {categorias.find(c => c.value === sugestao.categoria)?.icon} {categorias.find(c => c.value === sugestao.categoria)?.label}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MessageCircle style={{ width: '14px', height: '14px' }} />
                          <span>{sugestao.comentarios} comentários</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sugestoes;
