import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './FisioGuia.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Exercise {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  benefits: string[];
  contraindications: string[];
  videoUrl?: string;
}

const FisioGuia: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lombalgia');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showEbookModal, setShowEbookModal] = useState(false);
  const chartRef = useRef<ChartJS<'bar'> | null>(null);

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Ponte (Elevação Pélvica)",
      description: "Deite-se de costas com os joelhos dobrados. Eleve o quadril contraindo os glúteos. Ótimo para fortalecer a cadeia posterior e estabilizar a lombar.",
      category: "coluna",
      difficulty: "Iniciante",
      duration: "3 séries de 10-15 repetições",
      benefits: [
        "Fortalecimento do core",
        "Estabilização lombar",
        "Ativação glútea"
      ],
      contraindications: [
        "Dor aguda na coluna",
        "Hérnia discal em crise"
      ],
      videoUrl: "https://www.youtube.com/watch?v=OUgsJ8HhZqY"
    },
    {
      id: 2,
      title: "Gato-Camelo",
      description: "Em quatro apoios, alterne entre arquear a coluna para cima (gato) e para baixo (camelo). Melhora a mobilidade da coluna vertebral.",
      category: "coluna",
      difficulty: "Iniciante",
      duration: "2 séries de 10 repetições",
      benefits: [
        "Mobilidade da coluna",
        "Alongamento muscular",
        "Consciência corporal"
      ],
      contraindications: [
        "Instabilidade vertebral",
        "Dor aguda na coluna"
      ],
      videoUrl: "https://www.youtube.com/watch?v=kqnua4rHVVA"
    },
    {
      id: 3,
      title: "Extensão de Joelho Sentado",
      description: "Sentado em uma cadeira, estenda uma perna até ficar reta, contraindo o músculo da coxa (quadríceps). Essencial para a saúde do joelho.",
      category: "joelho",
      difficulty: "Iniciante",
      duration: "3 séries de 15-20 repetições",
      benefits: [
        "Fortalecimento do quadríceps",
        "Estabilização do joelho",
        "Melhora da função articular"
      ],
      contraindications: [
        "Dor aguda no joelho",
        "Edema significativo"
      ],
      videoUrl: "https://www.youtube.com/watch?v=0d-1aU4WX_c"
    },
    {
      id: 4,
      title: "Mini-Agachamento Isométrico",
      description: "Com as costas apoiadas na parede, deslize para baixo até uma posição de meio agachamento e segure. Fortalece sem impacto na articulação.",
      category: "joelho",
      difficulty: "Intermediário",
      duration: "3 séries de 30-45 segundos",
      benefits: [
        "Fortalecimento sem impacto",
        "Estabilização articular",
        "Preparação para agachamento"
      ],
      contraindications: [
        "Dor aguda no joelho",
        "Instabilidade severa"
      ],
      videoUrl: "https://www.youtube.com/watch?v=aclHkVJ9dBc"
    },
    {
      id: 5,
      title: "Escrita do Alfabeto com o Pé",
      description: "Sentado, eleve o pé e 'escreva' as letras do alfabeto no ar com o dedão. Excelente para recuperar a mobilidade do tornazelo.",
      category: "tornozelo",
      difficulty: "Iniciante",
      duration: "3 séries de 2-3 alfabetos completos",
      benefits: [
        "Mobilidade do tornozelo",
        "Coordenação motora",
        "Propriocepção"
      ],
      contraindications: [
        "Dor aguda no tornozelo",
        "Fratura recente"
      ],
      videoUrl: "https://www.youtube.com/watch?v=0d-1aU4WX_c"
    },
    {
      id: 6,
      title: "Equilíbrio Unipodal",
      description: "Fique em pé sobre uma perna, tentando manter o equilíbrio. Crucial para treinar a propriocepção e prevenir novas entorses.",
      category: "tornozelo",
      difficulty: "Intermediário",
      duration: "3 séries de 30-60 segundos",
      benefits: [
        "Propriocepção",
        "Estabilidade articular",
        "Prevenção de lesões"
      ],
      contraindications: [
        "Instabilidade severa",
        "Dor aguda no tornozelo"
      ],
      videoUrl: "https://www.youtube.com/watch?v=0d-1aU4WX_c"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "Preciso de encaminhamento médico para fazer fisioterapia?",
      answer: "Não. A fisioterapia é uma profissão de primeira intenção, o que significa que você pode procurar um fisioterapeuta diretamente, sem a necessidade de um encaminhamento médico. O fisioterapeuta é qualificado para avaliar, diagnosticar e tratar disfunções musculoesqueléticas."
    },
    {
      id: 2,
      question: "Devo usar calor ou gelo na minha dor?",
      answer: "Gelo para lesões agudas e traumas (até 48-72h), como uma entorse ou pancada. Calor para dores crônicas, musculares e rigidez (sem inchaço evidente)."
    },
    {
      id: 3,
      question: "O repouso absoluto é a melhor solução para dor nas costas?",
      answer: "Isso é um mito! O repouso prolongado é prejudicial. Ele enfraquece a musculatura que sustenta a coluna, retarda a recuperação e pode cronificar a dor. O movimento orientado e gradual é a chave."
    },
    {
      id: 4,
      question: "Meus exames de imagem não mostram nada. Por que ainda sinto dor?",
      answer: "Muitas dores são de origem 'mecânica', causadas por disfunções no movimento das articulações ou tensões musculares que não aparecem em exames de imagem. Um fisioterapeuta é treinado para identificar essas restrições."
    },
    {
      id: 5,
      question: "Quantas sessões de fisioterapia preciso para melhorar?",
      answer: "O número de sessões varia conforme a condição, gravidade e comprometimento do paciente. Condições agudas podem melhorar em 6-8 sessões, enquanto condições crônicas podem requerer 12-20 sessões. A consistência nos exercícios em casa é fundamental."
    },
    {
      id: 6,
      question: "Posso fazer exercícios mesmo sentindo dor?",
      answer: "Depende do tipo de dor. Dor leve durante o exercício pode ser normal e até benéfica. Mas se a dor for intensa, aguda ou piorar durante o exercício, pare imediatamente. A regra é: 'No pain, no gain' é um mito perigoso."
    }
  ];

  const chartData = {
    labels: ['Lombalgia', 'Dor Ciática', 'Hérnia de Disco', 'Osteoartrose Joelho', 'Entorse Tornozelo'],
    datasets: [
      {
        label: 'Incidência Relativa',
        data: [90, 65, 55, 45, 30],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 5
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Prevalência (Índice Fictício)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Condições Mais Comuns na Fisioterapia Ortopédica',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' / 100';
            }
            return label;
          }
        }
      }
    }
  };

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="fisioguia-page">
      {/* Header */}
      <header className="fisioguia-header">
        <nav className="fisioguia-nav">
          <div className="fisioguia-nav-brand">
            <a href="#inicio">FisioGuia</a>
          </div>
          <div className="fisioguia-nav-links">
            <a href="#patologias">Entenda sua Dor</a>
            <a href="#faq">Dúvidas Comuns</a>
            <a href="#exercicios">Exercícios</a>
            <a href="#ebook" className="fisioguia-nav-cta">Saiba Mais</a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="fisioguia-hero">
          <div className="fisioguia-container">
            <div className="fisioguia-hero-content">
              <h1>Entenda sua dor. Recupere seu movimento.</h1>
              <p>
                Um guia completo e interativo, baseado em evidências, para você compreender as causas da sua dor e encontrar o caminho para uma vida mais ativa e sem desconforto.
              </p>
              <div className="fisioguia-hero-cta">
                <a href="#patologias" className="fisioguia-button-primary">
                  Comece a sua jornada
                </a>
                <button 
                  className="fisioguia-button-secondary"
                  onClick={() => setShowEbookModal(true)}
                >
                  📘 Ver Ebook Completo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Patologias Section */}
        <section id="patologias" className="fisioguia-section">
          <div className="fisioguia-container">
            <div className="fisioguia-section-header">
              <h2>Entenda sua Dor: As Condições Mais Comuns</h2>
              <p>
                Nesta seção, exploramos as patologias musculoesqueléticas mais frequentes. Selecione uma condição para aprender sobre suas causas, sintomas e os tratamentos fisioterapêuticos mais eficazes.
              </p>
            </div>

            {/* Chart */}
            <div className="fisioguia-chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Tabs */}
            <div className="fisioguia-tabs">
              <button 
                className={`fisioguia-tab ${activeTab === 'lombalgia' ? 'active' : ''}`}
                onClick={() => setActiveTab('lombalgia')}
              >
                Lombalgia e Dor nas Costas
              </button>
              <button 
                className={`fisioguia-tab ${activeTab === 'hernia' ? 'active' : ''}`}
                onClick={() => setActiveTab('hernia')}
              >
                Hérnia de Disco
              </button>
              <button 
                className={`fisioguia-tab ${activeTab === 'ciatica' ? 'active' : ''}`}
                onClick={() => setActiveTab('ciatica')}
              >
                Dor Ciática
              </button>
              <button 
                className={`fisioguia-tab ${activeTab === 'tornozelo' ? 'active' : ''}`}
                onClick={() => setActiveTab('tornozelo')}
              >
                Entorse de Tornozelo
              </button>
              <button 
                className={`fisioguia-tab ${activeTab === 'joelho' ? 'active' : ''}`}
                onClick={() => setActiveTab('joelho')}
              >
                Osteoartrose de Joelho
              </button>
            </div>

            {/* Tab Content */}
            <div className="fisioguia-tab-content">
              {activeTab === 'lombalgia' && (
                <div className="fisioguia-tab-panel">
                  <h3>Guia sobre Lombalgia e Dor nas Costas</h3>
                  <p>
                    A lombalgia é uma das queixas mais comuns em consultórios de fisioterapia e a principal causa de incapacidade em todo o mundo. Ela pode variar de uma dor leve e persistente a uma dor aguda e incapacitante.
                  </p>
                  
                  <div className="fisioguia-info-grid">
                    <div className="fisioguia-info-card">
                      <h4>🔍 Causas Comuns</h4>
                      <ul>
                        <li>Tensão muscular ou ligamentar</li>
                        <li>Hérnia de disco</li>
                        <li>Alterações degenerativas</li>
                        <li>Sedentarismo</li>
                        <li>Má postura prolongada</li>
                        <li>Estresse e tensão emocional</li>
                      </ul>
                    </div>
                    
                    <div className="fisioguia-info-card">
                      <h4>💡 Soluções</h4>
                      <ul>
                        <li>Terapia manual</li>
                        <li>Exercícios terapêuticos</li>
                        <li>Educação postural</li>
                        <li>Fortalecimento do core</li>
                        <li>Pilates e yoga</li>
                        <li>Acupuntura</li>
                      </ul>
                    </div>

                    <div className="fisioguia-info-card">
                      <h4>⚠️ Sinais de Alerta</h4>
                      <ul>
                        <li>Dor que irradia para as pernas</li>
                        <li>Perda de força ou sensibilidade</li>
                        <li>Dor noturna intensa</li>
                        <li>Perda de controle urinário</li>
                        <li>Febre associada</li>
                      </ul>
                    </div>
                  </div>

                  <div className="fisioguia-cta-box">
                    <p><strong>💡 Quer saber mais sobre exercícios específicos para lombalgia?</strong></p>
                    <button 
                      className="fisioguia-button-secondary"
                      onClick={() => setShowEbookModal(true)}
                    >
                      📖 Ver Ebook Completo
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'hernia' && (
                <div className="fisioguia-tab-panel">
                  <h3>Entendendo a Hérnia de Disco</h3>
                  <p>
                    A hérnia de disco ocorre quando o núcleo gelatinoso de um disco intervertebral extravasa através de uma fissura em seu anel externo, podendo comprimir raízes nervosas.
                  </p>
                  
                  <div className="fisioguia-info-grid">
                    <div className="fisioguia-info-card">
                      <h4>⚠️ Sintomas</h4>
                      <ul>
                        <li>Dor que irradia para braços ou pernas</li>
                        <li>Formigamento ou dormência</li>
                        <li>Fraqueza muscular</li>
                        <li>Dor ao tossir ou espirrar</li>
                        <li>Piora ao sentar</li>
                      </ul>
                    </div>
                    
                    <div className="fisioguia-info-card">
                      <h4>🛠️ Tratamento</h4>
                      <ul>
                        <li>Reduzir pressão sobre o nervo</li>
                        <li>Fortalecer musculatura de suporte</li>
                        <li>Exercícios de estabilização</li>
                        <li>Terapia manual</li>
                        <li>Educação postural</li>
                      </ul>
                    </div>

                    <div className="fisioguia-info-card">
                      <h4>📊 Estatísticas</h4>
                      <ul>
                        <li>80% das pessoas melhoram sem cirurgia</li>
                        <li>Fisioterapia é eficaz em 70% dos casos</li>
                        <li>Recuperação pode levar 6-12 semanas</li>
                        <li>Prevenção é fundamental</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ciatica' && (
                <div className="fisioguia-tab-panel">
                  <h3>O que é a Dor Ciática?</h3>
                  <p>
                    A dor ciática refere-se à dor que irradia ao longo do trajeto do nervo ciático, que se ramifica da parte inferior das costas, passando pelas nádegas e descendo por cada perna.
                  </p>
                  
                  <div className="fisioguia-info-grid">
                    <div className="fisioguia-info-card">
                      <h4>🎯 Características</h4>
                      <ul>
                        <li>Dor que varia de queimação a choque elétrico</li>
                        <li>Pode ser agravada ao tossir ou espirrar</li>
                        <li>Geralmente afeta apenas um lado</li>
                        <li>Piora ao sentar por muito tempo</li>
                        <li>Pode causar dormência</li>
                      </ul>
                    </div>
                    
                    <div className="fisioguia-info-card">
                      <h4>🔧 Abordagem</h4>
                      <ul>
                        <li>Aliviar compressão do nervo</li>
                        <li>Melhorar mobilidade</li>
                        <li>Fortalecer o core</li>
                        <li>Exercícios de alongamento</li>
                        <li>Terapia manual</li>
                      </ul>
                    </div>

                    <div className="fisioguia-info-card">
                      <h4>💡 Dicas Importantes</h4>
                      <ul>
                        <li>Evite ficar sentado por muito tempo</li>
                        <li>Use travesseiro entre os joelhos ao dormir</li>
                        <li>Mantenha-se ativo com exercícios leves</li>
                        <li>Aplique gelo nas primeiras 48h</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tornozelo' && (
                <div className="fisioguia-tab-panel">
                  <h3>Reabilitação da Entorse de Tornozelo</h3>
                  <p>
                    A entorse de tornozelo é uma das lesões musculoesqueléticas mais comuns, ocorrendo quando os ligamentos que sustentam a articulação são estirados além de sua capacidade.
                  </p>
                  
                  <div className="fisioguia-info-grid">
                    <div className="fisioguia-info-card">
                      <h4>📋 Fases da Recuperação</h4>
                      <ul>
                        <li>Controle da dor e inchaço</li>
                        <li>Recuperação da mobilidade</li>
                        <li>Fortalecimento muscular</li>
                        <li>Treino de propriocepção</li>
                        <li>Retorno ao esporte</li>
                      </ul>
                    </div>
                    
                    <div className="fisioguia-info-card">
                      <h4>🎯 Objetivos</h4>
                      <ul>
                        <li>Restaurar estabilidade</li>
                        <li>Prevenir instabilidade crônica</li>
                        <li>Retornar às atividades</li>
                        <li>Melhorar equilíbrio</li>
                        <li>Fortalecer musculatura</li>
                      </ul>
                    </div>

                    <div className="fisioguia-info-card">
                      <h4>⏰ Tempo de Recuperação</h4>
                      <ul>
                        <li>Entorse leve: 2-4 semanas</li>
                        <li>Entorse moderada: 4-8 semanas</li>
                        <li>Entorse grave: 8-12 semanas</li>
                        <li>Retorno ao esporte: 12-16 semanas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'joelho' && (
                <div className="fisioguia-tab-panel">
                  <h3>Gerenciando a Osteoartrose de Joelho</h3>
                  <p>
                    A osteoartrose é uma condição degenerativa da cartilagem articular. No joelho, causa dor, rigidez e diminuição da função, impactando significativamente a qualidade de vida.
                  </p>
                  
                  <div className="fisioguia-info-grid">
                    <div className="fisioguia-info-card">
                      <h4>🎯 Papel da Fisioterapia</h4>
                      <ul>
                        <li>Reduzir dor</li>
                        <li>Melhorar função</li>
                        <li>Fortalecer musculatura</li>
                        <li>Educar sobre modificações</li>
                        <li>Melhorar mobilidade</li>
                      </ul>
                    </div>
                    
                    <div className="fisioguia-info-card">
                      <h4>💪 Exercícios Recomendados</h4>
                      <ul>
                        <li>Fortalecimento de baixo impacto</li>
                        <li>Treino de flexibilidade</li>
                        <li>Atividades na água</li>
                        <li>Tai Chi</li>
                        <li>Caminhada</li>
                      </ul>
                    </div>

                    <div className="fisioguia-info-card">
                      <h4>🔬 Evidências Científicas</h4>
                      <ul>
                        <li>Exercícios reduzem dor em 30-40%</li>
                        <li>Melhoram função em 25-35%</li>
                        <li>Previnem progressão da doença</li>
                        <li>Reduzem necessidade de cirurgia</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="fisioguia-section fisioguia-section-alt">
          <div className="fisioguia-container">
            <div className="fisioguia-section-header">
              <h2>Desmistificando a Fisioterapia</h2>
              <p>
                Confiança é a base de qualquer tratamento. Por isso, reunimos e respondemos às dúvidas mais comuns dos pacientes.
              </p>
            </div>

            <div className="fisioguia-faq-container">
              {faqs.map((faq) => (
                <div key={faq.id} className="fisioguia-faq-item">
                  <button
                    className="fisioguia-faq-question"
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="fisioguia-faq-icon">
                      {openFaq === faq.id ? '▼' : '▶'}
                    </span>
                  </button>
                  {openFaq === faq.id && (
                    <div className="fisioguia-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="fisioguia-cta-box">
              <p><strong>💡 Ainda tem dúvidas? Nosso ebook responde muito mais!</strong></p>
              <button 
                className="fisioguia-button-primary"
                onClick={() => setShowEbookModal(true)}
              >
                📖 Ver Todas as Respostas
              </button>
            </div>
          </div>
        </section>

        {/* Exercícios Section */}
        <section id="exercicios" className="fisioguia-section">
          <div className="fisioguia-container">
            <div className="fisioguia-section-header">
              <h2>Guia Prático de Exercícios</h2>
              <p>
                O movimento é o melhor remédio. Aqui você encontrará uma seleção de exercícios terapêuticos fundamentais para a reabilitação das condições mais comuns.
              </p>
            </div>

            {/* Filters */}
            <div className="fisioguia-filters">
              <button 
                className={`fisioguia-filter ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`fisioguia-filter ${activeFilter === 'coluna' ? 'active' : ''}`}
                onClick={() => setActiveFilter('coluna')}
              >
                Coluna
              </button>
              <button 
                className={`fisioguia-filter ${activeFilter === 'joelho' ? 'active' : ''}`}
                onClick={() => setActiveFilter('joelho')}
              >
                Joelho
              </button>
              <button 
                className={`fisioguia-filter ${activeFilter === 'tornozelo' ? 'active' : ''}`}
                onClick={() => setActiveFilter('tornozelo')}
              >
                Tornozelo
              </button>
            </div>

            {/* Exercise Grid */}
            <div className="fisioguia-exercise-grid">
              {exercises
                .filter(exercise => activeFilter === 'all' || exercise.category === activeFilter)
                .map(exercise => (
                  <div key={exercise.id} className="fisioguia-exercise-card">
                    <div 
                      className="fisioguia-exercise-video"
                      onClick={() => exercise.videoUrl && handleVideoClick(exercise.videoUrl)}
                      style={{ cursor: exercise.videoUrl ? 'pointer' : 'default' }}
                    >
                      <span className="fisioguia-play-icon">▶</span>
                      {exercise.videoUrl && (
                        <div className="fisioguia-video-overlay">
                          <span>Clique para ver no YouTube</span>
                        </div>
                      )}
                    </div>
                    <div className="fisioguia-exercise-content">
                      <h4>{exercise.title}</h4>
                      <p>{exercise.description}</p>
                      <div className="fisioguia-exercise-meta">
                        <span className="fisioguia-exercise-difficulty">{exercise.difficulty}</span>
                        <span className="fisioguia-exercise-duration">{exercise.duration}</span>
                      </div>
                      <div className="fisioguia-exercise-benefits">
                        <h5>Benefícios:</h5>
                        <ul>
                          {exercise.benefits.slice(0, 2).map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      {exercise.videoUrl && (
                        <button 
                          className="fisioguia-video-button"
                          onClick={() => handleVideoClick(exercise.videoUrl!)}
                        >
                          🎥 Ver Vídeo no YouTube
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="fisioguia-cta-box">
              <p><strong>💡 Quer ver mais de 50 exercícios detalhados com vídeos?</strong></p>
              <button 
                className="fisioguia-button-primary"
                onClick={() => setShowEbookModal(true)}
              >
                📖 Ver Ebook Completo
              </button>
            </div>
          </div>
        </section>

        {/* Ebook Section */}
        <section id="ebook" className="fisioguia-section fisioguia-section-alt">
          <div className="fisioguia-container">
            <div className="fisioguia-ebook-container">
              <div className="fisioguia-ebook-content">
                <h2>Transforme seu Conhecimento em Ação</h2>
                <p className="fisioguia-ebook-subtitle">
                  Você aprendeu sobre as causas da dor, desmistificou dúvidas e conheceu exercícios essenciais. Agora, é hora de dar o próximo passo com um guia completo e aprofundado.
                </p>
                
                <div className="fisioguia-ebook-features">
                  <h3>🎯 O que você encontrará no ebook:</h3>
                  <div className="fisioguia-features-grid">
                    <div className="fisioguia-feature-item">
                      <span className="fisioguia-feature-icon">📱</span>
                      <div>
                        <strong>50+ exercícios específicos</strong>
                        <p>Para cada condição da coluna</p>
                      </div>
                    </div>
                    <div className="fisioguia-feature-item">
                      <span className="fisioguia-feature-icon">📊</span>
                      <div>
                        <strong>Planos de tratamento</strong>
                        <p>De 4, 8 e 12 semanas</p>
                      </div>
                    </div>
                    <div className="fisioguia-feature-item">
                      <span className="fisioguia-feature-icon">📋</span>
                      <div>
                        <strong>Guia de postura</strong>
                        <p>Para trabalho, casa e atividades</p>
                      </div>
                    </div>
                    <div className="fisioguia-feature-item">
                      <span className="fisioguia-feature-icon">🚨</span>
                      <div>
                        <strong>Protocolos de emergência</strong>
                        <p>Para crises de dor aguda</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fisioguia-ebook-cta">
                  <button 
                    className="fisioguia-ebook-button"
                    onClick={() => setShowEbookModal(true)}
                  >
                    🚀 QUERO MEU EBOOK AGORA - R$ 47
                  </button>
                  <p className="fisioguia-ebook-guarantee">
                    ✅ Garantia de 30 dias ou seu dinheiro de volta
                  </p>
                  <p className="fisioguia-ebook-bonus">
                    🎁 BÔNUS: Acesso vitalício + Atualizações gratuitas
                  </p>
                </div>
              </div>
              
              <div className="fisioguia-ebook-visual">
                <div className="fisioguia-ebook-cover">
                  <div className="fisioguia-ebook-cover-content">
                    <span className="fisioguia-ebook-cover-icon">📘</span>
                    <h3>O GUIA DEFINITIVO</h3>
                    <p>para uma</p>
                    <strong>COLUNA SEM DOR</strong>
                    <div className="fisioguia-ebook-cover-badge">
                      <span>+50 EXERCÍCIOS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fisioguia-footer">
        <div className="fisioguia-footer-content">
          <p>&copy; 2025 FisioGuia Interativo. Todos os direitos reservados.</p>
          <p className="fisioguia-footer-disclaimer">
            Este conteúdo é informativo e não substitui uma avaliação profissional. Consulte sempre um fisioterapeuta.
          </p>
        </div>
      </footer>

      {/* Ebook Modal */}
      {showEbookModal && (
        <div className="fisioguia-modal-overlay" onClick={() => setShowEbookModal(false)}>
          <div className="fisioguia-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="fisioguia-modal-close"
              onClick={() => setShowEbookModal(false)}
            >
              ×
            </button>
            
            <div className="fisioguia-modal-content">
              <h2 className="fisioguia-modal-title">
                🎉 Parabéns por dar o primeiro passo!
              </h2>
              
              <div className="fisioguia-modal-ebook-preview">
                <div className="fisioguia-modal-ebook-cover">
                  <span>📘</span>
                  <h3>O GUIA DEFINITIVO</h3>
                  <p>para uma</p>
                  <strong>COLUNA SEM DOR</strong>
                </div>
              </div>

              <div className="fisioguia-modal-features">
                <h3>✨ O que você receberá:</h3>
                <ul>
                  <li>📱 <strong>Ebook em PDF</strong> - Acesse em qualquer dispositivo</li>
                  <li>🎥 <strong>Vídeos demonstrativos</strong> - Veja como fazer cada exercício</li>
                  <li>📊 <strong>Planos de tratamento</strong> - Estruturados por tempo e condição</li>
                  <li>🔍 <strong>Guia de diagnóstico</strong> - Identifique sua condição</li>
                  <li>📅 <strong>Checklist de progresso</strong> - Acompanhe sua evolução</li>
                  <li>💬 <strong>Suporte por email</strong> - Tire suas dúvidas</li>
                </ul>
              </div>

              <div className="fisioguia-modal-pricing">
                <div className="fisioguia-modal-price">
                  <span className="fisioguia-modal-old-price">De R$ 97</span>
                  <span className="fisioguia-modal-current-price">Por apenas R$ 47</span>
                  <span className="fisioguia-modal-discount">51% OFF</span>
                </div>
                
                <p className="fisioguia-modal-urgency">
                  ⏰ Oferta por tempo limitado - Apenas 100 cópias disponíveis!
                </p>
              </div>

              <div className="fisioguia-modal-cta">
                <button className="fisioguia-modal-button">
                  🚀 COMPRAR AGORA - R$ 47
                </button>
                <p className="fisioguia-modal-guarantee">
                  ✅ Garantia de 30 dias ou seu dinheiro de volta
                </p>
                <p className="fisioguia-modal-bonus">
                  🎁 BÔNUS: Acesso vitalício + Atualizações gratuitas
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FisioGuia;
