import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Filter,
  Trophy,
  Target,
  BookOpen,
  Play,
  Pause,
  SkipForward,
  Award,
  TrendingUp,
  Users,
  Star,
  AlertCircle
} from 'lucide-react';

const Questoes = () => {
  const [modoAtual, setModoAtual] = useState('selecao'); // 'selecao', 'questao', 'resultado'
  const [filtros, setFiltros] = useState({
    area: 'todas',
    dificuldade: 'todas',
    tipo: 'todas'
  });
  
  const [sessaoAtual, setSessaoAtual] = useState({
    questoes: [],
    questaoAtual: 0,
    respostas: {},
    tempoInicio: null,
    tempoDecorrido: 0,
    modo: 'estudo' // 'estudo' ou 'simulado'
  });

  const [estatisticas, setEstatisticas] = useState({
    totalQuestoes: 0,
    acertos: 0,
    erros: 0,
    percentualAcerto: 0,
    tempoMedio: 0,
    ranking: 0
  });

  // Banco de questões simulado
  const bancoQuestoes = [
    {
      id: 1,
      area: 'anatomia',
      dificuldade: 'facil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual músculo é considerado o principal flexor do quadril?',
      alternativas: [
        { id: 'a', texto: 'Glúteo máximo' },
        { id: 'b', texto: 'Iliopsoas' },
        { id: 'c', texto: 'Reto femoral' },
        { id: 'd', texto: 'Sartório' },
        { id: 'e', texto: 'Tensor da fáscia lata' }
      ],
      respostaCorreta: 'b',
      explicacao: 'O iliopsoas é formado pelos músculos psoas maior e ilíaco, sendo considerado o principal flexor do quadril. Origina-se na coluna lombar e crista ilíaca, inserindo-se no trocânter menor do fêmur.',
      referencias: 'Kendall, F.P. et al. Músculos: Provas e Funções. 5ª ed.',
      tags: ['anatomia', 'quadril', 'músculos'],
      autor: 'Prof. Dr. João Silva',
      dificuldadeNumerica: 2
    },
    {
      id: 2,
      area: 'neurologia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Em relação à Escala de Coma de Glasgow, qual pontuação indica coma profundo?',
      alternativas: [
        { id: 'a', texto: '15 pontos' },
        { id: 'b', texto: '8-12 pontos' },
        { id: 'c', texto: '3-8 pontos' },
        { id: 'd', texto: '13-15 pontos' },
        { id: 'e', texto: '9-12 pontos' }
      ],
      respostaCorreta: 'c',
      explicacao: 'A Escala de Coma de Glasgow varia de 3 a 15 pontos. Pontuação de 3-8 indica coma severo, 9-12 coma moderado e 13-15 coma leve ou consciência normal.',
      referencias: 'Teasdale, G. & Jennett, B. Lancet, 1974',
      tags: ['neurologia', 'glasgow', 'coma'],
      autor: 'Prof. Dra. Maria Santos',
      dificuldadeNumerica: 5
    },
    {
      id: 3,
      area: 'cardiologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Durante o teste de esforço, qual é o principal indicador de isquemia miocárdica no ECG?',
      alternativas: [
        { id: 'a', texto: 'Elevação do segmento ST' },
        { id: 'b', texto: 'Depressão do segmento ST ≥ 1mm' },
        { id: 'c', texto: 'Inversão da onda T' },
        { id: 'd', texto: 'Prolongamento do intervalo QT' },
        { id: 'e', texto: 'Aparecimento de ondas Q' }
      ],
      respostaCorreta: 'b',
      explicacao: 'A depressão horizontal ou descendente do segmento ST ≥ 1mm, medida 80ms após o ponto J, é o principal critério eletrocardiográfico para isquemia miocárdica durante teste de esforço.',
      referencias: 'Diretrizes da Sociedade Brasileira de Cardiologia, 2019',
      tags: ['cardiologia', 'teste-esforco', 'ecg'],
      autor: 'Prof. Dr. Carlos Lima',
      dificuldadeNumerica: 8
    },
    {
      id: 4,
      area: 'ortopedia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'O teste de Lachman é utilizado para avaliar a integridade de qual estrutura?',
      alternativas: [
        { id: 'a', texto: 'Ligamento colateral medial' },
        { id: 'b', texto: 'Ligamento colateral lateral' },
        { id: 'c', texto: 'Ligamento cruzado anterior' },
        { id: 'd', texto: 'Ligamento cruzado posterior' },
        { id: 'e', texto: 'Menisco medial' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O teste de Lachman é considerado o teste mais sensível e específico para avaliar a integridade do ligamento cruzado anterior (LCA). É realizado com o joelho em 20-30° de flexão.',
      referencias: 'Magee, D.J. Avaliação Musculoesquelética. 6ª ed.',
      tags: ['ortopedia', 'joelho', 'lachman'],
      autor: 'Prof. Dra. Ana Costa',
      dificuldadeNumerica: 4
    },
    {
      id: 5,
      area: 'respiratoria',
      dificuldade: 'facil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual é o volume corrente normal em um adulto saudável em repouso?',
      alternativas: [
        { id: 'a', texto: '100-200 mL' },
        { id: 'b', texto: '300-400 mL' },
        { id: 'c', texto: '500-600 mL' },
        { id: 'd', texto: '700-800 mL' },
        { id: 'e', texto: '900-1000 mL' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O volume corrente (VT) normal em adultos saudáveis em repouso é de aproximadamente 500-600 mL ou 6-8 mL/kg de peso corporal.',
      referencias: 'West, J.B. Fisiologia Respiratória. 9ª ed.',
      tags: ['respiratoria', 'volumes', 'fisiologia'],
      autor: 'Prof. Dr. Pedro Mendes',
      dificuldadeNumerica: 3
    }
  ];

  const areas = [
    { value: 'todas', label: 'Todas as Áreas', icon: '📚' },
    { value: 'anatomia', label: 'Anatomia', icon: '🦴' },
    { value: 'neurologia', label: 'Neurologia', icon: '🧠' },
    { value: 'cardiologia', label: 'Cardiologia', icon: '❤️' },
    { value: 'ortopedia', label: 'Ortopedia', icon: '🦵' },
    { value: 'respiratoria', label: 'Respiratória', icon: '🫁' },
    { value: 'pediatria', label: 'Pediatria', icon: '👶' },
    { value: 'geriatria', label: 'Geriatria', icon: '👴' }
  ];

  const dificuldades = [
    { value: 'todas', label: 'Todas', cor: '#6b7280' },
    { value: 'facil', label: 'Fácil', cor: '#10b981' },
    { value: 'media', label: 'Média', cor: '#f59e0b' },
    { value: 'dificil', label: 'Difícil', cor: '#ef4444' }
  ];

  const tipos = [
    { value: 'todas', label: 'Todos os Tipos' },
    { value: 'multipla-escolha', label: 'Múltipla Escolha' },
    { value: 'verdadeiro-falso', label: 'Verdadeiro/Falso' },
    { value: 'dissertativa', label: 'Dissertativa' }
  ];

  // Filtrar questões
  const questoesFiltradas = bancoQuestoes.filter(questao => {
    return (filtros.area === 'todas' || questao.area === filtros.area) &&
           (filtros.dificuldade === 'todas' || questao.dificuldade === filtros.dificuldade) &&
           (filtros.tipo === 'todas' || questao.tipo === filtros.tipo);
  });

  const iniciarSessao = (modo, quantidade = 10) => {
    const questoesSelecionadas = questoesFiltradas
      .sort(() => Math.random() - 0.5)
      .slice(0, quantidade);
    
    setSessaoAtual({
      questoes: questoesSelecionadas,
      questaoAtual: 0,
      respostas: {},
      tempoInicio: Date.now(),
      tempoDecorrido: 0,
      modo
    });
    
    setModoAtual('questao');
  };

  const responderQuestao = (questaoId, alternativaId) => {
    setSessaoAtual(prev => ({
      ...prev,
      respostas: {
        ...prev.respostas,
        [questaoId]: alternativaId
      }
    }));
  };

  const proximaQuestao = () => {
    if (sessaoAtual.questaoAtual < sessaoAtual.questoes.length - 1) {
      setSessaoAtual(prev => ({
        ...prev,
        questaoAtual: prev.questaoAtual + 1
      }));
    } else {
      finalizarSessao();
    }
  };

  const finalizarSessao = () => {
    const tempoTotal = Date.now() - sessaoAtual.tempoInicio;
    let acertos = 0;
    
    sessaoAtual.questoes.forEach(questao => {
      if (sessaoAtual.respostas[questao.id] === questao.respostaCorreta) {
        acertos++;
      }
    });
    
    const novasEstatisticas = {
      totalQuestoes: sessaoAtual.questoes.length,
      acertos,
      erros: sessaoAtual.questoes.length - acertos,
      percentualAcerto: Math.round((acertos / sessaoAtual.questoes.length) * 100),
      tempoMedio: Math.round(tempoTotal / sessaoAtual.questoes.length / 1000),
      ranking: Math.floor(Math.random() * 100) + 1 // Simulado
    };
    
    setEstatisticas(novasEstatisticas);
    setModoAtual('resultado');
  };

  const reiniciar = () => {
    setModoAtual('selecao');
    setSessaoAtual({
      questoes: [],
      questaoAtual: 0,
      respostas: {},
      tempoInicio: null,
      tempoDecorrido: 0,
      modo: 'estudo'
    });
  };

  // Timer para modo simulado
  useEffect(() => {
    let interval;
    if (modoAtual === 'questao' && sessaoAtual.modo === 'simulado') {
      interval = setInterval(() => {
        setSessaoAtual(prev => ({
          ...prev,
          tempoDecorrido: Date.now() - prev.tempoInicio
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [modoAtual, sessaoAtual.modo, sessaoAtual.tempoInicio]);

  const formatarTempo = (ms) => {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) {
      return `${horas}:${(minutos % 60).toString().padStart(2, '0')}:${(segundos % 60).toString().padStart(2, '0')}`;
    }
    return `${minutos}:${(segundos % 60).toString().padStart(2, '0')}`;
  };

  return (
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
              Banco de Questões
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Pratique com questões de fisioterapia baseadas em evidências científicas e concursos
            </p>
          </div>
        </div>

        {/* Tela de Seleção */}
        {modoAtual === 'selecao' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Estatísticas Gerais */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>
                Estatísticas do Banco
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: '#10b981',
                    borderRadius: '0.5rem'
                  }}>
                    <BookOpen style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534' }}>
                      {bancoQuestoes.length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                      Questões Disponíveis
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#eff6ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: '#3b82f6',
                    borderRadius: '0.5rem'
                  }}>
                    <Users style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                      {areas.length - 1}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                      Áreas Cobertas
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#fffbeb',
                  borderRadius: '0.5rem',
                  border: '1px solid #fed7aa'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: '#f59e0b',
                    borderRadius: '0.5rem'
                  }}>
                    <Trophy style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>
                      {estatisticas.percentualAcerto || 0}%
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                      Seu Aproveitamento
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros e Configurações */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Filter style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Configurar Sessão de Estudos
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Área de Conhecimento
                  </label>
                  <select
                    value={filtros.area}
                    onChange={(e) => setFiltros({...filtros, area: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    {areas.map(area => (
                      <option key={area.value} value={area.value}>
                        {area.icon} {area.label}
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
                    Nível de Dificuldade
                  </label>
                  <select
                    value={filtros.dificuldade}
                    onChange={(e) => setFiltros({...filtros, dificuldade: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    {dificuldades.map(dif => (
                      <option key={dif.value} value={dif.value}>
                        {dif.label}
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
                    Tipo de Questão
                  </label>
                  <select
                    value={filtros.tipo}
                    onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    {tipos.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Questões disponíveis com os filtros atuais:
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                  {questoesFiltradas.length} questões
                </div>
              </div>

              {/* Botões de Início */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <button
                  onClick={() => iniciarSessao('estudo', 5)}
                  disabled={questoesFiltradas.length === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: questoesFiltradas.length > 0 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: questoesFiltradas.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <BookOpen style={{ width: '20px', height: '20px' }} />
                  Modo Estudo (5 questões)
                </button>

                <button
                  onClick={() => iniciarSessao('simulado', 10)}
                  disabled={questoesFiltradas.length < 10}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: questoesFiltradas.length >= 10 ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: questoesFiltradas.length >= 10 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (questoesFiltradas.length >= 10) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (questoesFiltradas.length >= 10) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <Clock style={{ width: '20px', height: '20px' }} />
                  Simulado (10 questões)
                </button>

                <button
                  onClick={() => iniciarSessao('personalizado', Math.min(questoesFiltradas.length, 20))}
                  disabled={questoesFiltradas.length === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: questoesFiltradas.length > 0 ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: questoesFiltradas.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(245, 158, 11, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <Target style={{ width: '20px', height: '20px' }} />
                  Personalizado (até 20)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tela de Questão */}
        {modoAtual === 'questao' && sessaoAtual.questoes.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #f3f4f6',
            overflow: 'hidden'
          }}>
            {/* Header da Questão */}
            <div style={{
              padding: '1.5rem 2rem',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
                    Questão {sessaoAtual.questaoAtual + 1} de {sessaoAtual.questoes.length}
                  </span>

                  {sessaoAtual.modo === 'simulado' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444' }}>
                        {formatarTempo(sessaoAtual.tempoDecorrido)}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={reiniciar}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'none',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.color = '#6b7280';
                  }}
                >
                  <XCircle style={{ width: '16px', height: '16px' }} />
                  Sair
                </button>
              </div>

              {/* Barra de Progresso */}
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((sessaoAtual.questaoAtual + 1) / sessaoAtual.questoes.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Conteúdo da Questão */}
            <div style={{ padding: '2rem' }}>
              {(() => {
                const questaoAtual = sessaoAtual.questoes[sessaoAtual.questaoAtual];
                const dificuldadeCor = dificuldades.find(d => d.value === questaoAtual.dificuldade)?.cor || '#6b7280';

                return (
                  <div>
                    {/* Metadados da Questão */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: areas.find(a => a.value === questaoAtual.area)?.icon ? '#f0fdf4' : '#f8fafc',
                        color: '#166534',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        border: '1px solid #bbf7d0'
                      }}>
                        {areas.find(a => a.value === questaoAtual.area)?.icon} {areas.find(a => a.value === questaoAtual.area)?.label}
                      </span>

                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: dificuldadeCor,
                        color: 'white',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}>
                        {dificuldades.find(d => d.value === questaoAtual.dificuldade)?.label}
                      </span>
                    </div>

                    {/* Enunciado */}
                    <div style={{
                      padding: '1.5rem',
                      background: '#f8fafc',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#111827',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {questaoAtual.enunciado}
                      </h3>
                    </div>

                    {/* Alternativas */}
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {questaoAtual.alternativas.map((alternativa, index) => {
                        const isSelected = sessaoAtual.respostas[questaoAtual.id] === alternativa.id;

                        return (
                          <button
                            key={alternativa.id}
                            onClick={() => responderQuestao(questaoAtual.id, alternativa.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              padding: '1rem 1.5rem',
                              background: isSelected ? '#eff6ff' : 'white',
                              border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                              borderRadius: '0.75rem',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontSize: '1rem'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.target.style.borderColor = '#3b82f6';
                                e.target.style.background = '#f8fafc';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.background = 'white';
                              }
                            }}
                          >
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              background: isSelected ? '#3b82f6' : '#f3f4f6',
                              color: isSelected ? 'white' : '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              flexShrink: 0
                            }}>
                              {alternativa.id.toUpperCase()}
                            </div>
                            <span style={{ color: '#374151', lineHeight: 1.5 }}>
                              {alternativa.texto}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Botões de Navegação */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={() => setSessaoAtual(prev => ({
                          ...prev,
                          questaoAtual: Math.max(0, prev.questaoAtual - 1)
                        }))}
                        disabled={sessaoAtual.questaoAtual === 0}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: sessaoAtual.questaoAtual === 0 ? '#f3f4f6' : 'white',
                          color: sessaoAtual.questaoAtual === 0 ? '#9ca3af' : '#6b7280',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          cursor: sessaoAtual.questaoAtual === 0 ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <ArrowLeft style={{ width: '16px', height: '16px' }} />
                        Anterior
                      </button>

                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {sessaoAtual.modo === 'estudo' ? 'Modo Estudo' : 'Modo Simulado'}
                      </div>

                      <button
                        onClick={proximaQuestao}
                        disabled={!sessaoAtual.respostas[questaoAtual.id]}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: !sessaoAtual.respostas[questaoAtual.id] ? '#f3f4f6' :
                                     sessaoAtual.questaoAtual === sessaoAtual.questoes.length - 1 ?
                                     'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                                     'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: !sessaoAtual.respostas[questaoAtual.id] ? '#9ca3af' : 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontWeight: 600,
                          cursor: !sessaoAtual.respostas[questaoAtual.id] ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (sessaoAtual.respostas[questaoAtual.id]) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sessaoAtual.respostas[questaoAtual.id]) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        {sessaoAtual.questaoAtual === sessaoAtual.questoes.length - 1 ? (
                          <>
                            <CheckCircle style={{ width: '16px', height: '16px' }} />
                            Finalizar
                          </>
                        ) : (
                          <>
                            Próxima
                            <SkipForward style={{ width: '16px', height: '16px' }} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Tela de Resultado */}
        {modoAtual === 'resultado' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Resultado Geral */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                background: estatisticas.percentualAcerto >= 70 ?
                           'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                           estatisticas.percentualAcerto >= 50 ?
                           'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                           'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {estatisticas.percentualAcerto >= 70 ? (
                  <Trophy style={{ width: '40px', height: '40px', color: 'white' }} />
                ) : estatisticas.percentualAcerto >= 50 ? (
                  <Award style={{ width: '40px', height: '40px', color: 'white' }} />
                ) : (
                  <AlertCircle style={{ width: '40px', height: '40px', color: 'white' }} />
                )}
              </div>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {estatisticas.percentualAcerto >= 70 ? 'Excelente!' :
                 estatisticas.percentualAcerto >= 50 ? 'Bom trabalho!' : 'Continue estudando!'}
              </h2>

              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Você acertou {estatisticas.acertos} de {estatisticas.totalQuestoes} questões
              </p>

              <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: estatisticas.percentualAcerto >= 70 ? '#10b981' :
                       estatisticas.percentualAcerto >= 50 ? '#f59e0b' : '#ef4444',
                marginBottom: '1rem'
              }}>
                {estatisticas.percentualAcerto}%
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <div style={{
                  padding: '1rem',
                  background: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534' }}>
                    {estatisticas.acertos}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                    Acertos
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#fef2f2',
                  borderRadius: '0.5rem',
                  border: '1px solid #fecaca'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>
                    {estatisticas.erros}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                    Erros
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#eff6ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                    {estatisticas.tempoMedio}s
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                    Tempo Médio
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#fffbeb',
                  borderRadius: '0.5rem',
                  border: '1px solid #fed7aa'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>
                    #{estatisticas.ranking}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                    Ranking
                  </div>
                </div>
              </div>
            </div>

            {/* Revisão das Questões */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '1.5rem 2rem',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Revisão das Questões
                </h3>
              </div>

              <div style={{ padding: '0' }}>
                {sessaoAtual.questoes.map((questao, index) => {
                  const respostaUsuario = sessaoAtual.respostas[questao.id];
                  const acertou = respostaUsuario === questao.respostaCorreta;
                  const alternativaCorreta = questao.alternativas.find(a => a.id === questao.respostaCorreta);
                  const alternativaUsuario = questao.alternativas.find(a => a.id === respostaUsuario);

                  return (
                    <div key={questao.id} style={{
                      padding: '1.5rem 2rem',
                      borderBottom: index < sessaoAtual.questoes.length - 1 ? '1px solid #e5e7eb' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: acertou ? '#10b981' : '#ef4444',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          flexShrink: 0
                        }}>
                          {acertou ? (
                            <CheckCircle style={{ width: '16px', height: '16px' }} />
                          ) : (
                            <XCircle style={{ width: '16px', height: '16px' }} />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
                              Questão {index + 1}
                            </span>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              background: areas.find(a => a.value === questao.area)?.icon ? '#f0fdf4' : '#f8fafc',
                              color: '#166534',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}>
                              {areas.find(a => a.value === questao.area)?.label}
                            </span>
                          </div>

                          <p style={{
                            fontSize: '1rem',
                            color: '#374151',
                            marginBottom: '1rem',
                            lineHeight: 1.5
                          }}>
                            {questao.enunciado}
                          </p>

                          <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {respostaUsuario && (
                              <div style={{
                                padding: '0.75rem',
                                background: acertou ? '#f0fdf4' : '#fef2f2',
                                borderRadius: '0.5rem',
                                border: `1px solid ${acertou ? '#bbf7d0' : '#fecaca'}`
                              }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                                  Sua resposta: {alternativaUsuario?.id.toUpperCase()}) {alternativaUsuario?.texto}
                                </div>
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: acertou ? '#166534' : '#dc2626',
                                  fontWeight: 500
                                }}>
                                  {acertou ? '✓ Correto!' : '✗ Incorreto'}
                                </div>
                              </div>
                            )}

                            {!acertou && (
                              <div style={{
                                padding: '0.75rem',
                                background: '#f0fdf4',
                                borderRadius: '0.5rem',
                                border: '1px solid #bbf7d0'
                              }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                                  Resposta correta: {alternativaCorreta?.id.toUpperCase()}) {alternativaCorreta?.texto}
                                </div>
                              </div>
                            )}

                            {questao.explicacao && (
                              <div style={{
                                padding: '0.75rem',
                                background: '#fffbeb',
                                borderRadius: '0.5rem',
                                border: '1px solid #fed7aa',
                                marginTop: '0.5rem'
                              }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', marginBottom: '0.5rem' }}>
                                  Explicação:
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: 1.4 }}>
                                  {questao.explicacao}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botões de Ação */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={reiniciar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <RotateCcw style={{ width: '16px', height: '16px' }} />
                Nova Sessão
              </button>

              <button
                onClick={() => iniciarSessao(sessaoAtual.modo, sessaoAtual.questoes.length)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Play style={{ width: '16px', height: '16px' }} />
                Repetir Sessão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questoes;
