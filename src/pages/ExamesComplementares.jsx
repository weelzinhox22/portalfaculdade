import React, { useEffect, useState } from 'react';
import { ArrowLeft, Activity, Droplet, Camera, Heart, BarChart3, Microscope, Brain, Zap, TrendingUp, ChevronDown, ChevronRight, Info, AlertTriangle, CheckCircle, X, RotateCcw, FlaskConical, FileImage, Stethoscope, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamesComplementares = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [flashcardStats, setFlashcardStats] = useState({ facil: 0, dificil: 0 });
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const nextFlashcard = () => {
    setShowFlashcardAnswer(false);
    setCurrentFlashcard(prev => (prev + 1) % flashcards.length);
  };

  const markFlashcard = (dificuldade) => {
    setFlashcardStats(prev => ({
      ...prev,
      [dificuldade]: prev[dificuldade] + 1
    }));
    setTimeout(nextFlashcard, 1000);
  };

  const flashcards = [
    {
      question: "Qual a função dos eritrócitos no hemograma e qual sua porcentagem no sangue?",
      answer: "Os eritrócitos representam 45-50% das células do sangue (série vermelha) e têm função de transporte de O₂ e CO₂ quando ligados à hemoglobina. São essenciais para a oxigenação tecidual.",
      category: "Hemograma"
    },
    {
      question: "Como interpretar pH 7.25, PaCO₂ 55mmHg, HCO₃⁻ 24mEq/L?",
      answer: "Acidose respiratória: pH ácido (7.25 < 7.35), PaCO₂ elevado (55 > 45), HCO₃⁻ normal (24). Indica hipoventilação com retenção de CO₂, comum em DPOC ou depressão respiratória.",
      category: "Gasometria"
    },
    {
      question: "Quais são as vantagens e limitações da radiografia de tórax AP?",
      answer: "Vantagens: baixo custo, alta disponibilidade, pode ser feita no leito. Limitações: ampliação da área cardíaca, sobreposição de estruturas, menor qualidade que PA.",
      category: "Imagem"
    },
    {
      question: "O que representa o complexo QRS no ECG e seus valores normais?",
      answer: "O complexo QRS representa a despolarização ventricular. Deve ter duração < 0.12s (3 quadradinhos), amplitude variável conforme a derivação, e morfologia uniforme.",
      category: "ECG"
    },
    {
      question: "Quando a angiografia coronária está indicada?",
      answer: "Indicada em suspeita de doença coronariana significativa, angina instável, infarto agudo do miocárdio, antes de cirurgias de alto risco, ou quando testes não invasivos são inconclusivos.",
      category: "Cardiologia"
    }
  ];

  // Dados das tabelas
  const hemogramaReferencia = [
    { 
      categoria: "Eritrograma", 
      exame: "Hemácias", 
      homens: "4,50 - 6,10 milhões/mm³", 
      mulheres: "4,00 - 5,40 milhões/mm³",
      significado: "Transporte de O₂ e CO₂"
    },
    { 
      categoria: "Eritrograma", 
      exame: "Hemoglobina", 
      homens: "13,0 - 16,5 g/dL", 
      mulheres: "12,0 - 15,8 g/dL",
      significado: "Proteína transportadora de oxigênio"
    },
    { 
      categoria: "Eritrograma", 
      exame: "Hematócrito", 
      homens: "36,0 - 54,0%", 
      mulheres: "33,0 - 47,8%",
      significado: "Percentual de células vermelhas no sangue"
    },
    { 
      categoria: "Leucograma", 
      exame: "Neutrófilos", 
      homens: "50-70% (1.800-7.700/mm³)", 
      mulheres: "50-70% (1.800-7.700/mm³)",
      significado: "Defesa contra bactérias"
    },
    { 
      categoria: "Leucograma", 
      exame: "Eosinófilos", 
      homens: "0-7% (0-550/mm³)", 
      mulheres: "0-7% (0-550/mm³)",
      significado: "Resposta alérgica e parasitária"
    },
    { 
      categoria: "Leucograma", 
      exame: "Basófilos", 
      homens: "0-2% (0-220/mm³)", 
      mulheres: "0-2% (0-220/mm³)",
      significado: "Reações alérgicas graves"
    },
    { 
      categoria: "Leucograma", 
      exame: "Linfócitos", 
      homens: "20-50% (740-5.500/mm³)", 
      mulheres: "20-50% (740-5.500/mm³)",
      significado: "Imunidade celular e humoral"
    },
    { 
      categoria: "Leucograma", 
      exame: "Monócitos", 
      homens: "3-14% (37-1.000/mm³)", 
      mulheres: "3-14% (37-1.000/mm³)",
      significado: "Fagocitose e apresentação de antígenos"
    },
    { 
      categoria: "Plaquetas", 
      exame: "Plaquetas", 
      homens: "130-450 × 10³/mm³", 
      mulheres: "130-450 × 10³/mm³",
      significado: "Coagulação sanguínea primária"
    }
  ];

  const gasometriaReferencia = [
    { 
      parametro: "pH", 
      valorNormal: "7,35 - 7,45", 
      significado: "Equilíbrio ácido-base",
      alteracoes: {
        baixo: "Acidose (< 7,35)",
        alto: "Alcalose (> 7,45)"
      }
    },
    { 
      parametro: "PaCO₂", 
      valorNormal: "35 - 45 mmHg", 
      significado: "Ventilação pulmonar",
      alteracoes: {
        baixo: "Hiperventilação (< 35)",
        alto: "Hipoventilação (> 45)"
      }
    },
    { 
      parametro: "PaO₂", 
      valorNormal: "80 - 100 mmHg", 
      significado: "Oxigenação tecidual",
      alteracoes: {
        baixo: "Hipoxemia (< 80)",
        alto: "Hiperóxia (> 100)"
      }
    },
    { 
      parametro: "HCO₃⁻", 
      valorNormal: "22 - 26 mEq/L", 
      significado: "Função metabólica",
      alteracoes: {
        baixo: "Acidose metabólica (< 22)",
        alto: "Alcalose metabólica (> 26)"
      }
    },
    { 
      parametro: "SatO₂", 
      valorNormal: "> 95%", 
      significado: "% Hemoglobina oxigenada",
      alteracoes: {
        baixo: "Dessaturação (< 95%)",
        alto: "Saturação normal"
      }
    },
    { 
      parametro: "BE", 
      valorNormal: "-2 a +2 mEq/L", 
      significado: "Excesso de base",
      alteracoes: {
        baixo: "Déficit de base (< -2)",
        alto: "Excesso de base (> +2)"
      }
    }
  ];

  return (
    <div className="exames-complementares-page" style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 12s ease-in-out infinite'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link 
            to="/unidade-hospitalar" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              marginBottom: '2rem',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Unidade Hospitalar
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: '800', 
                color: 'white', 
                margin: 0, 
                lineHeight: '1.1',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}>
                Exames Complementares em Unidades Hospitalares
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                margin: '0.5rem 0 0 0'
              }}>
                Interpretação e aplicação clínica dos principais exames diagnósticos
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)'
            }}>
              <Microscope className="w-4 h-4" />
              Laboratório Clínico
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)'
            }}>
              <FileImage className="w-4 h-4" />
              Diagnóstico por Imagem
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)'
            }}>
              <Heart className="w-4 h-4" />
              Cardiologia Diagnóstica
            </span>
          </div>
        </div>
      </section>



      {/* Main Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Introdução */}
            <div style={{ 
              background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--emerald-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--emerald-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Importância dos Exames Complementares
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--emerald-700)', 
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Os exames complementares são ferramentas essenciais para o diagnóstico, monitoramento e acompanhamento terapêutico de pacientes hospitalares, fornecendo informações objetivas que complementam a avaliação clínica.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {[
                  { icon: '🔬', title: 'Diagnóstico Preciso', desc: 'Identificação de patologias específicas' },
                  { icon: '📊', title: 'Monitoramento', desc: 'Acompanhamento da evolução clínica' },
                  { icon: '🎯', title: 'Terapia Direcionada', desc: 'Orientação para tratamentos específicos' },
                  { icon: '⚠️', title: 'Detecção Precoce', desc: 'Identificação de complicações' }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--emerald-200)',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--emerald-800)', marginBottom: '0.5rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--emerald-600)', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hemograma */}
            <div style={{ 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <Droplet className="w-8 h-8 text-red-500" />
                Hemograma Completo
              </h2>

              <div style={{ marginBottom: '3rem' }}>
                <p style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '1.8', 
                  color: 'var(--slate-700)', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  O hemograma é fundamental para compreensão de diagnósticos como infecções, inflamação e anemia, fazendo parte da rotina de muitos pacientes internados.
                </p>

                {/* Componentes do Sangue */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                  <div style={{ 
                    background: 'linear-gradient(145deg, #fef2f2, #fde8e8)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--red-300)'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--red-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      🔴 Eritrócitos (Série Vermelha)
                    </h3>
                    <div style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Proporção:</strong> 45-50% das células sanguíneas
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Função:</strong> Transporte de O₂ e CO₂ via hemoglobina
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Importância:</strong> Essencial para oxigenação tecidual
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(145deg, #f0f9ff, #e0f2fe)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--blue-300)'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--blue-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⚪ Leucócitos (Série Branca)
                    </h3>
                    <div style={{ color: 'var(--blue-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Proporção:</strong> Até 1% das células sanguíneas
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Função:</strong> Defesa contra agentes agressores
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Tipos:</strong> Neutrófilos, eosinófilos, basófilos, linfócitos, monócitos
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--amber-300)'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--amber-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      🟡 Plaquetas
                    </h3>
                    <div style={{ color: 'var(--amber-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Função:</strong> Coagulação sanguínea
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Fase:</strong> Primeira fase da coagulação
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Importância:</strong> Hemostasia primária
                      </p>
                    </div>
                  </div>
                </div>

                {/* Classificação dos Leucócitos */}
                <div style={{
                  background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--slate-200)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--slate-800)', 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    🛡️ Classificação dos Leucócitos
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--orange-200)',
                      borderLeft: '4px solid var(--orange-500)'
                    }}>
                      <h4 style={{ color: 'var(--orange-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        ⚡ Resposta Rápida
                      </h4>
                      <ul style={{ color: 'var(--orange-700)', lineHeight: '1.5', paddingLeft: '1rem' }}>
                        <li><strong>Neutrófilos:</strong> Bactérias</li>
                        <li><strong>Eosinófilos:</strong> Parasitas/alergias</li>
                        <li><strong>Basófilos:</strong> Reações alérgicas</li>
                      </ul>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--green-200)',
                      borderLeft: '4px solid var(--green-500)'
                    }}>
                      <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🎯 Resposta Crônica (Potente)
                      </h4>
                      <ul style={{ color: 'var(--green-700)', lineHeight: '1.5', paddingLeft: '1rem' }}>
                        <li><strong>Linfócitos:</strong> Imunidade específica</li>
                        <li><strong>Monócitos:</strong> Fagocitose e apresentação de antígenos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Valores de Referência */}
              <div style={{
                background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--amber-300)'
              }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '700', 
                  color: 'var(--amber-800)', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  📊 Valores de Referência do Hemograma para Adultos
                </h3>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    background: 'white',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
                        <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Categoria</th>
                        <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Exame</th>
                        <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'center' }}>Homens</th>
                        <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'center' }}>Mulheres</th>
                        <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Significado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hemogramaReferencia.map((item, index) => (
                        <tr key={index} style={{ 
                          borderBottom: '1px solid var(--gray-200)',
                          backgroundColor: index % 2 === 0 ? 'white' : 'var(--gray-50)'
                        }}>
                          <td style={{ 
                            padding: '1rem', 
                            fontWeight: item.categoria === 'Eritrograma' ? '600' : item.categoria === 'Leucograma' ? '600' : '600',
                            color: item.categoria === 'Eritrograma' ? 'var(--red-700)' : item.categoria === 'Leucograma' ? 'var(--blue-700)' : 'var(--amber-700)'
                          }}>
                            {item.categoria}
                          </td>
                          <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--slate-700)' }}>
                            {item.exame}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                            {item.homens}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                            {item.mulheres}
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                            {item.significado}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Gasometria Arterial */}
            <div style={{ 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <BarChart3 className="w-8 h-8 text-blue-500" />
                Gasometria Arterial
              </h2>

              <div style={{ marginBottom: '3rem' }}>
                <p style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '1.8', 
                  color: 'var(--slate-700)', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  A gasometria arterial avalia o equilíbrio ácido-básico e a função respiratória através da análise do sangue arterial, sendo fundamental para o manejo de pacientes críticos.
                </p>

                {/* Processo Fisiológico */}
                <div style={{
                  background: 'linear-gradient(145deg, #eff6ff, #dbeafe)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--blue-200)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--blue-800)', 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    🫁 Processo Respiratório e Equilíbrio Ácido-Base
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)'
                    }}>
                      <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        💨 Ventilação
                      </h4>
                      <p style={{ color: 'var(--blue-700)', lineHeight: '1.6', margin: 0 }}>
                        Durante a respiração, o pulmão absorve O₂ e elimina CO₂. A PaCO₂ reflete diretamente a ventilação alveolar.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)'
                    }}>
                      <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🩸 Oxigenação
                      </h4>
                      <p style={{ color: 'var(--blue-700)', lineHeight: '1.6', margin: 0 }}>
                        A PaO₂ e SatO₂ mostram a eficiência da troca gasosa alveolar e capacidade de oxigenação tecidual.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)'
                    }}>
                      <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ⚖️ Equilíbrio Ácido-Base
                      </h4>
                      <p style={{ color: 'var(--blue-700)', lineHeight: '1.6', margin: 0 }}>
                        O pH, HCO₃⁻ e BE avaliam o sistema tampão bicarbonato e a função metabólica renal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sistema Tampão de Bicarbonato */}
                <div style={{
                  background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--amber-300)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--amber-800)', 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    ⚗️ Sistema Tampão de Bicarbonato
                  </h3>
                  
                  <div style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--amber-200)',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <div style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: '600', 
                        color: 'var(--amber-800)',
                        marginBottom: '1rem'
                      }}>
                        Equação Fundamental:
                      </div>
                      <div style={{ 
                        fontSize: '1.4rem', 
                        fontFamily: 'monospace',
                        background: 'var(--amber-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '2px solid var(--amber-200)'
                      }}>
                        CO₂ + H₂O ⇌ H₂CO₃ ⇌ HCO₃⁻ + H⁺
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                      <div style={{ 
                        padding: '1.5rem',
                        background: 'var(--red-50)',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--red-500)'
                      }}>
                        <h4 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          🔴 Acidose (pH ↓)
                        </h4>
                        <p style={{ color: 'var(--red-700)', lineHeight: '1.6', margin: 0 }}>
                          Quando CO₂ é retido, forma H₂CO₃ → HCO₃⁻ + H⁺. 
                          O aumento de H⁺ torna o sangue mais ácido.
                        </p>
                      </div>
                      
                      <div style={{ 
                        padding: '1.5rem',
                        background: 'var(--green-50)',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--green-500)'
                      }}>
                        <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          🔵 Alcalose (pH ↑)
                        </h4>
                        <p style={{ color: 'var(--green-700)', lineHeight: '1.6', margin: 0 }}>
                          Quando HCO₃⁻ se liga ao H⁺, forma H₂CO₃ → H₂O + CO₂. 
                          A redução de H⁺ torna o sangue menos ácido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fisiologia Respiratória Detalhada */}
                <div style={{
                  background: 'linear-gradient(145deg, #ecfdf5, #d1fae5)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--green-300)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--green-800)', 
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    🧠 Fisiologia da Respiração e Equilíbrio Ácido-Base
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--green-200)'
                    }}>
                      <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        🫁 Ventilação Pulmonar
                      </h4>
                      <p style={{ color: 'var(--green-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                        <strong>Inspiração:</strong> Contração do diafragma e músculos intercostais → ↑ volume torácico → ↓ pressão intratorácica → entrada de ar
                      </p>
                      <p style={{ color: 'var(--green-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                        <strong>Expiração:</strong> Relaxamento muscular → ↓ volume torácico → ↑ pressão intratorácica → saída de ar + CO₂
                      </p>
                      <div style={{ 
                        background: 'var(--green-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--green-700)'
                      }}>
                        <strong>PaCO₂ = Produto direto da ventilação alveolar</strong><br/>
                        Hipoventilação → ↑ PaCO₂ → Acidose respiratória<br/>
                        Hiperventilação → ↓ PaCO₂ → Alcalose respiratória
                      </div>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--green-200)'
                    }}>
                      <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        🩸 Troca Gasosa Alveolar
                      </h4>
                      <p style={{ color: 'var(--green-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                        <strong>Difusão do O₂:</strong> Ar alveolar (21% O₂) → membrana respiratória → capilar pulmonar → ligação com hemoglobina
                      </p>
                      <p style={{ color: 'var(--green-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                        <strong>Eliminação do CO₂:</strong> Sangue venoso → alveólo → expiração (produto do metabolismo celular)
                      </p>
                      <div style={{ 
                        background: 'var(--blue-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--blue-700)'
                      }}>
                        <strong>PaO₂ = Eficiência da oxigenação</strong><br/>
                        Normal: 80-100 mmHg (ao nível do mar)<br/>
                        SatO₂ = % de Hb saturada com O₂ (normal &gt;95%)
                      </div>
                    </div>
                  </div>
                  
                  {/* Henderson-Hasselbalch */}
                  <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--green-200)',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1.5rem', fontSize: '1.2rem', textAlign: 'center' }}>
                      ⚗️ Equação de Henderson-Hasselbalch
                    </h4>
                    
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <div style={{ 
                        fontSize: '1.6rem', 
                        fontFamily: 'monospace',
                        background: 'var(--amber-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--amber-300)',
                        fontWeight: '600',
                        color: 'var(--amber-800)'
                      }}>
                        pH = 6,1 + log ([HCO₃⁻] / 0,03 × PaCO₂)
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ 
                        background: 'var(--amber-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--amber-500)'
                      }}>
                        <h5 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          📊 Componente Metabólico
                        </h5>
                        <p style={{ color: 'var(--amber-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                          <strong>HCO₃⁻ (bicarbonato):</strong> Controlado pelos rins<br/>
                          <strong>Normal:</strong> 22-26 mEq/L<br/>
                          <strong>Função:</strong> Principal tampão extracelular
                        </p>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--cyan-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--cyan-500)'
                      }}>
                        <h5 style={{ color: 'var(--cyan-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          🫁 Componente Respiratório
                        </h5>
                        <p style={{ color: 'var(--cyan-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                          <strong>PaCO₂:</strong> Controlado pelos pulmões<br/>
                          <strong>Normal:</strong> 35-45 mmHg<br/>
                          <strong>Função:</strong> Ácido volátil (H₂CO₃)
                        </p>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--purple-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--purple-500)'
                      }}>
                        <h5 style={{ color: 'var(--purple-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          ⚖️ Proporção 20:1
                        </h5>
                        <p style={{ color: 'var(--purple-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                          <strong>Relação ideal:</strong><br/>
                          HCO₃⁻ : H₂CO₃ = 20 : 1<br/>
                          Mantém pH = 7,40 ± 0,05
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mecanismos de Compensação */}
                  <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--green-200)'
                  }}>
                    <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1.5rem', fontSize: '1.2rem', textAlign: 'center' }}>
                      🔄 Mecanismos de Compensação Fisiológica
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                      <div style={{ 
                        background: 'var(--red-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--red-200)'
                      }}>
                        <h5 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          🔴 Acidose (pH &lt; 7,35)
                        </h5>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: 'var(--red-700)' }}>Compensação Respiratória:</strong>
                          <p style={{ color: 'var(--red-600)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                            ↑ Ventilação → ↓ PaCO₂ → ↓ H₂CO₃ → ↑ pH<br/>
                            <em>Resposta em minutos</em>
                          </p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--red-700)' }}>Compensação Renal:</strong>
                          <p style={{ color: 'var(--red-600)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                            ↑ Reabsorção HCO₃⁻ → ↑ Excreção H⁺ → ↑ pH<br/>
                            <em>Resposta em 12-24h</em>
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--blue-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--blue-200)'
                      }}>
                        <h5 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          🔵 Alcalose (pH &gt; 7,45)
                        </h5>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: 'var(--blue-700)' }}>Compensação Respiratória:</strong>
                          <p style={{ color: 'var(--blue-600)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                            ↓ Ventilação → ↑ PaCO₂ → ↑ H₂CO₃ → ↓ pH<br/>
                            <em>Limitada pela hipóxia</em>
                          </p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--blue-700)' }}>Compensação Renal:</strong>
                          <p style={{ color: 'var(--blue-600)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                            ↓ Reabsorção HCO₃⁻ → ↓ Excreção H⁺ → ↓ pH<br/>
                            <em>Resposta lenta mas eficaz</em>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macete para Memorização */}
                <div style={{
                  background: 'linear-gradient(145deg, #fef3c7, #fde68a)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--amber-400)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--amber-800)', 
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    🧩 Macetes para Memorizar Valores de Referência
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-300)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🎯 pH Normal
                      </h4>
                      <div style={{ 
                        background: 'var(--amber-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ color: 'var(--amber-800)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                          "7,40 ± 0,05"
                        </p>
                        <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                          7,35 - 7,45 (Faixa compatível com vida: 6,8 - 7,8)
                        </p>
                      </div>
                      <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <strong>Dica:</strong> pH 7,40 = neutro fisiológico<br/>
                        Menor que 7,35 = ácido<br/>
                        Maior que 7,45 = básico
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-300)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🫁 PaCO₂ (mmHg)
                      </h4>
                      <div style={{ 
                        background: 'var(--cyan-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ color: 'var(--cyan-800)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                          "40 ± 5"
                        </p>
                        <p style={{ color: 'var(--cyan-700)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                          35 - 45 mmHg
                        </p>
                      </div>
                      <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <strong>Dica:</strong> "Quatro-Zero"<br/>
                        &gt;45 = hipoventilação<br/>
                        &lt;35 = hiperventilação
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-300)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🩸 HCO₃⁻ (mEq/L)
                      </h4>
                      <div style={{ 
                        background: 'var(--green-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ color: 'var(--green-800)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                          "24 ± 2"
                        </p>
                        <p style={{ color: 'var(--green-700)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                          22 - 26 mEq/L
                        </p>
                      </div>
                      <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <strong>Dica:</strong> "Vinte e Quatro"<br/>
                        &lt;22 = acidose metabólica<br/>
                        &gt;26 = alcalose metabólica
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-300)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        💨 PaO₂ (mmHg)
                      </h4>
                      <div style={{ 
                        background: 'var(--blue-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ color: 'var(--blue-800)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                          "90 ± 10"
                        </p>
                        <p style={{ color: 'var(--blue-700)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                          80 - 100 mmHg
                        </p>
                      </div>
                      <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <strong>Dica:</strong> "Noventa"<br/>
                        &lt;80 = hipoxemia<br/>
                        &lt;60 = hipoxemia grave
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-300)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🎯 SatO₂ (%)
                      </h4>
                      <div style={{ 
                        background: 'var(--emerald-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ color: 'var(--emerald-800)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                          "&gt; 95%"
                        </p>
                        <p style={{ color: 'var(--emerald-700)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                          Normal: 95-100%
                        </p>
                      </div>
                      <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <strong>Dica:</strong> "Acima de 95"<br/>
                        90-95% = hipoxemia leve<br/>
                        &lt;90% = insuficiência respiratória
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-300)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        ⚖️ BE (mEq/L)
                      </h4>
                      <div style={{ 
                        background: 'var(--slate-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ color: 'var(--slate-800)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                          "0 ± 2"
                        </p>
                        <p style={{ color: 'var(--slate-700)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                          -2 a +2 mEq/L
                        </p>
                      </div>
                      <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <strong>Dica:</strong> "Zero Base"<br/>
                        &lt;-2 = déficit de base<br/>
                        &gt;+2 = excesso de base
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabela de Valores da Gasometria */}
                <div style={{
                  background: 'linear-gradient(145deg, #f0f9ff, #e0f2fe)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--blue-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--blue-800)', 
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    📋 Valores de Referência da Gasometria Arterial
                  </h3>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      background: 'white',
                      borderRadius: '0.75rem',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                      <thead>
                        <tr style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                          <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Parâmetro</th>
                          <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'center' }}>Valor Normal</th>
                          <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Significado</th>
                          <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Alterações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gasometriaReferencia.map((item, index) => (
                          <tr key={index} style={{ 
                            borderBottom: '1px solid var(--gray-200)',
                            backgroundColor: index % 2 === 0 ? 'white' : 'var(--gray-50)'
                          }}>
                            <td style={{ 
                              padding: '1rem', 
                              fontWeight: '600',
                              color: 'var(--blue-700)',
                              fontSize: '1rem'
                            }}>
                              {item.parametro}
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              fontWeight: '500',
                              color: 'var(--slate-700)',
                              background: 'var(--green-50)',
                              fontSize: '0.9rem'
                            }}>
                              {item.valorNormal}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                              {item.significado}
                            </td>
                            <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                              <div style={{ marginBottom: '0.25rem' }}>
                                <span style={{ color: 'var(--red-600)', fontWeight: '500' }}>↓ </span>
                                <span style={{ color: 'var(--slate-600)' }}>{item.alteracoes.baixo}</span>
                              </div>
                              <div>
                                <span style={{ color: 'var(--blue-600)', fontWeight: '500' }}>↑ </span>
                                <span style={{ color: 'var(--slate-600)' }}>{item.alteracoes.alto}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Casos Clínicos de Gasometria Expandidos */}
                <div style={{
                  background: 'linear-gradient(145deg, #fdf2f8, #fce7f3)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--pink-300)',
                  marginTop: '2rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--pink-800)', 
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    📋 Casos Clínicos Detalhados - Interpretação de Gasometria
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--pink-200)'
                    }}>
                      <h4 style={{ color: 'var(--pink-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        📚 Caso 1: DPOC Exacerbado
                      </h4>
                      <div style={{ 
                        background: 'var(--red-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace'
                      }}>
                        pH: 7.28 | PaCO₂: 65 mmHg<br/>
                        HCO₃⁻: 28 mEq/L | PaO₂: 55 mmHg | SatO₂: 88%
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: 'var(--red-700)' }}>🔍 Análise Passo a Passo:</strong>
                        <ul style={{ color: 'var(--pink-700)', fontSize: '0.9rem', paddingLeft: '1rem', margin: '0.5rem 0' }}>
                          <li>pH 7,28 &lt; 7,35 → <strong>ACIDOSE</strong></li>
                          <li>PaCO₂ 65 &gt; 45 → <strong>RESPIRATÓRIA</strong></li>
                          <li>HCO₃⁻ 28 &gt; 26 → <strong>COMPENSAÇÃO RENAL</strong></li>
                          <li>PaO₂ 55 &lt; 80 → <strong>HIPOXEMIA</strong></li>
                        </ul>
                      </div>
                      <p style={{ color: 'var(--pink-700)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        <strong>Diagnóstico:</strong> Acidose respiratória parcialmente compensada com hipoxemia.<br/>
                        <strong>Fisiopatologia:</strong> Obstrução das vias aéreas → hipoventilação → retenção de CO₂ + déficit de O₂.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--pink-200)'
                    }}>
                      <h4 style={{ color: 'var(--pink-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        💨 Caso 2: Síndrome de Hiperventilação
                      </h4>
                      <div style={{ 
                        background: 'var(--blue-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace'
                      }}>
                        pH: 7.52 | PaCO₂: 28 mmHg<br/>
                        HCO₃⁻: 23 mEq/L | PaO₂: 110 mmHg | SatO₂: 99%
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: 'var(--blue-700)' }}>🔍 Análise Passo a Passo:</strong>
                        <ul style={{ color: 'var(--pink-700)', fontSize: '0.9rem', paddingLeft: '1rem', margin: '0.5rem 0' }}>
                          <li>pH 7,52 &gt; 7,45 → <strong>ALCALOSE</strong></li>
                          <li>PaCO₂ 28 &lt; 35 → <strong>RESPIRATÓRIA</strong></li>
                          <li>HCO₃⁻ 23 (normal) → <strong>SEM COMPENSAÇÃO</strong></li>
                          <li>PaO₂ 110 (elevado) → <strong>HIPERÓXIA</strong></li>
                        </ul>
                      </div>
                      <p style={{ color: 'var(--pink-700)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        <strong>Diagnóstico:</strong> Alcalose respiratória aguda não compensada.<br/>
                        <strong>Fisiopatologia:</strong> Ansiedade/dor → hiperventilação → eliminação excessiva de CO₂.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--pink-200)'
                    }}>
                      <h4 style={{ color: 'var(--pink-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        💊 Caso 3: Cetoacidose Diabética
                      </h4>
                      <div style={{ 
                        background: 'var(--purple-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace'
                      }}>
                        pH: 7.18 | PaCO₂: 22 mmHg<br/>
                        HCO₃⁻: 8 mEq/L | PaO₂: 95 mmHg | BE: -18
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: 'var(--purple-700)' }}>🔍 Análise Passo a Passo:</strong>
                        <ul style={{ color: 'var(--pink-700)', fontSize: '0.9rem', paddingLeft: '1rem', margin: '0.5rem 0' }}>
                          <li>pH 7,18 &lt;&lt; 7,35 → <strong>ACIDOSE GRAVE</strong></li>
                          <li>HCO₃⁻ 8 &lt;&lt; 22 → <strong>METABÓLICA</strong></li>
                          <li>PaCO₂ 22 &lt; 35 → <strong>COMPENSAÇÃO RESPIRATÓRIA</strong></li>
                          <li>BE -18 &lt;&lt; -2 → <strong>DÉFICIT DE BASE SEVERO</strong></li>
                        </ul>
                      </div>
                      <p style={{ color: 'var(--pink-700)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        <strong>Diagnóstico:</strong> Acidose metabólica com compensação respiratória máxima.<br/>
                        <strong>Fisiopatologia:</strong> Produção de cetoácidos → consumo de bicarbonato → hiperventilação compensatória.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--pink-200)'
                    }}>
                      <h4 style={{ color: 'var(--pink-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        🤢 Caso 4: Vômitos Persistentes
                      </h4>
                      <div style={{ 
                        background: 'var(--green-50)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace'
                      }}>
                        pH: 7.58 | PaCO₂: 48 mmHg<br/>
                        HCO₃⁻: 44 mEq/L | PaO₂: 88 mmHg | Cl⁻: 78 mEq/L
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: 'var(--green-700)' }}>🔍 Análise Passo a Passo:</strong>
                        <ul style={{ color: 'var(--pink-700)', fontSize: '0.9rem', paddingLeft: '1rem', margin: '0.5rem 0' }}>
                          <li>pH 7,58 &gt;&gt; 7,45 → <strong>ALCALOSE GRAVE</strong></li>
                          <li>HCO₃⁻ 44 &gt;&gt; 26 → <strong>METABÓLICA</strong></li>
                          <li>PaCO₂ 48 &gt; 45 → <strong>COMPENSAÇÃO RESPIRATÓRIA</strong></li>
                          <li>Cl⁻ 78 &lt; 95 → <strong>HIPOCLOREMIA</strong></li>
                        </ul>
                      </div>
                      <p style={{ color: 'var(--pink-700)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        <strong>Diagnóstico:</strong> Alcalose metabólica hipoclorêmica com compensação respiratória.<br/>
                        <strong>Fisiopatologia:</strong> Perda de HCl gástrico → ↑ HCO₃⁻ + hipocloremia → hipoventilação compensatória.
                      </p>
                    </div>
                  </div>
                  
                  {/* Algoritmo de Interpretação */}
                  <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--pink-200)'
                  }}>
                    <h4 style={{ 
                      color: 'var(--pink-800)', 
                      fontWeight: '600', 
                      marginBottom: '1.5rem', 
                      fontSize: '1.2rem', 
                      textAlign: 'center' 
                    }}>
                      🧩 Algoritmo de Interpretação da Gasometria
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                      <div style={{ 
                        background: 'var(--blue-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--blue-300)'
                      }}>
                        <h5 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          1️⃣ Primeiro: Avalie o pH
                        </h5>
                        <ul style={{ color: 'var(--blue-700)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                          <li>&lt; 7,35 = <strong>ACIDOSE</strong></li>
                          <li>7,35 - 7,45 = <strong>NORMAL</strong></li>
                          <li>&gt; 7,45 = <strong>ALCALOSE</strong></li>
                        </ul>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--amber-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--amber-300)'
                      }}>
                        <h5 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          2️⃣ Segundo: Determine a Causa
                        </h5>
                        <ul style={{ color: 'var(--amber-700)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                          <li>PaCO₂ anormal = <strong>RESPIRATÓRIA</strong></li>
                          <li>HCO₃⁻ anormal = <strong>METABÓLICA</strong></li>
                          <li>Ambos alterados = <strong>MISTA</strong></li>
                        </ul>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--green-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--green-300)'
                      }}>
                        <h5 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          3️⃣ Terceiro: Avalie Compensação
                        </h5>
                        <ul style={{ color: 'var(--green-700)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                          <li>Mesmo sentido = <strong>COMPENSAÇÃO</strong></li>
                          <li>pH normal = <strong>COMPENSADA</strong></li>
                          <li>pH anormal = <strong>PARCIALMENTE COMPENSADA</strong></li>
                        </ul>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--purple-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid var(--purple-300)'
                      }}>
                        <h5 style={{ color: 'var(--purple-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          4️⃣ Quarto: Analise Oxigenação
                        </h5>
                        <ul style={{ color: 'var(--purple-700)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                          <li>PaO₂ &gt; 80 = <strong>NORMAL</strong></li>
                          <li>60-80 = <strong>HIPOXEMIA LEVE</strong></li>
                          <li>&lt; 60 = <strong>HIPOXEMIA GRAVE</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exames de Imagem */}
            <div style={{ 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <Camera className="w-8 h-8 text-indigo-500" />
                Exames de Imagem
              </h2>

              {/* Radiografia de Tórax */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '700', 
                  color: 'var(--indigo-800)', 
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📸 Radiografia de Tórax
                </h3>
                
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.8', 
                  color: 'var(--slate-700)', 
                  marginBottom: '2rem'
                }}>
                  O exame de imagem mais antigo e amplamente utilizado. Devido ao baixo custo e alta disponibilidade, 
                  é muito frequente sua solicitação no ambiente hospitalar.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                  <div style={{ 
                    background: 'linear-gradient(145deg, #eef2ff, #e0e7ff)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--indigo-300)'
                  }}>
                    <h4 style={{ 
                      color: 'var(--indigo-800)', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      📐 Incidência Ântero-Posterior (AP)
                    </h4>
                    <div style={{ color: 'var(--indigo-700)', lineHeight: '1.6' }}>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Procedimento:</strong> Filme colocado posteriormente, radiação anterior
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Vantagem:</strong> Pode ser realizada no leito
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Desvantagem:</strong> Ampliação da área cardíaca
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--green-300)'
                  }}>
                    <h4 style={{ 
                      color: 'var(--green-800)', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⚪⚫ Interpretação de Densidade
                    </h4>
                    <div style={{ color: 'var(--green-700)', lineHeight: '1.6' }}>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong>Hipotransparente (claro):</strong> Alta densidade - ossos
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Hipertransparente (escuro):</strong> Baixa densidade - ar
                      </p>
                    </div>
                  </div>
                </div>

                {/* Critérios de Qualidade */}
                <div style={{
                  background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--amber-300)'
                }}>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700', 
                    color: 'var(--amber-800)', 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    ✅ Critérios de Qualidade Radiográfica
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {[
                      { 
                        icon: '🫁', 
                        title: 'Inspiração Adequada', 
                        desc: 'Visualização de ~10 costelas posteriores',
                        detail: 'Solicitar inspiração profunda + apneia'
                      },
                      { 
                        icon: '💡', 
                        title: 'Penetração Correta', 
                        desc: 'Visualização das primeiras vértebras torácicas',
                        detail: 'Dose de radiação adequada'
                      },
                      { 
                        icon: '🏷️', 
                        title: 'Identificação', 
                        desc: 'Marcação clara do lado direito',
                        detail: 'Lateralidade bem definida'
                      },
                      { 
                        icon: '⚖️', 
                        title: 'Posicionamento', 
                        desc: 'Alinhamento simétrico das clavículas',
                        detail: 'Paciente bem centralizado'
                      }
                    ].map((item, index) => (
                      <div key={index} style={{ 
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--amber-200)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                        <h5 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: 'var(--amber-800)', 
                          marginBottom: '0.5rem' 
                        }}>
                          {item.title}
                        </h5>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: 'var(--amber-700)', 
                          marginBottom: '0.5rem',
                          margin: 0 
                        }}>
                          {item.desc}
                        </p>
                        <p style={{ 
                          fontSize: '0.8rem', 
                          color: 'var(--amber-600)', 
                          fontStyle: 'italic',
                          margin: 0
                        }}>
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tomografia Computadorizada */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '700', 
                  color: 'var(--indigo-800)', 
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🖥️ Tomografia Computadorizada de Tórax
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ 
                    background: 'linear-gradient(145deg, #f0f9ff, #e0f2fe)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--cyan-300)'
                  }}>
                    <h4 style={{ 
                      color: 'var(--cyan-800)', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⭐ Vantagens
                    </h4>
                    <ul style={{ color: 'var(--cyan-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                      <li>Avaliação em diferentes planos</li>
                      <li>Sem sobreposição de estruturas</li>
                      <li>Maior precisão das alterações do parênquima</li>
                      <li>Janelas específicas (pulmão/mediastino)</li>
                      <li>Cortes de 1-10mm</li>
                    </ul>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(145deg, #fef2f2, #fde8e8)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--red-300)'
                  }}>
                    <h4 style={{ 
                      color: 'var(--red-800)', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⚠️ Limitações
                    </h4>
                    <ul style={{ color: 'var(--red-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                      <li>Maior custo que radiografia</li>
                      <li>Menor disponibilidade</li>
                      <li>Alta dose de radiação</li>
                      <li>Necessita contraste endovenoso</li>
                      <li>Paciente em decúbito dorsal</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Angiografia Coronariana */}
              <div style={{
                background: 'linear-gradient(145deg, #fdf2f8, #fce7f3)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--rose-300)'
              }}>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '700', 
                  color: 'var(--rose-800)', 
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  ❤️ Angiografia Coronariana
                </h3>
                
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.8', 
                  color: 'var(--rose-700)', 
                  marginBottom: '2rem'
                }}>
                  Exame semi-invasivo que avalia as artérias coronárias para detectar obstruções que podem 
                  causar isquemia miocárdica e evoluir para infarto agudo do miocárdio.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  <div style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--rose-200)'
                  }}>
                    <h4 style={{ color: 'var(--rose-800)', fontWeight: '600', marginBottom: '1rem' }}>
                      🔬 Procedimento
                    </h4>
                    <ul style={{ color: 'var(--rose-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                      <li>Cateter via artéria femoral ou braquial</li>
                      <li>Condução até coronárias</li>
                      <li>Injeção de contraste radiopaco</li>
                      <li>Visualização radiológica em tempo real</li>
                    </ul>
                  </div>
                  
                  <div style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--rose-200)'
                  }}>
                    <h4 style={{ color: 'var(--rose-800)', fontWeight: '600', marginBottom: '1rem' }}>
                      🎯 Indicações
                    </h4>
                    <ul style={{ color: 'var(--rose-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                      <li>Angina instável</li>
                      <li>Infarto agudo do miocárdio</li>
                      <li>Suspeita de doença coronariana</li>
                      <li>Pré-cirúrgico de alto risco</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Eletrocardiograma */}
            <div style={{ 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <Zap className="w-8 h-8 text-yellow-500" />
                Eletrocardiograma (ECG)
              </h2>

              <div style={{ marginBottom: '3rem' }}>
                <p style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '1.8', 
                  color: 'var(--slate-700)', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Exame não invasivo, de baixo custo e alta disponibilidade que registra a atividade elétrica cardíaca. 
                  Útil para identificação de eventos passados e acompanhamento, mas não prediz eventos futuros.
                </p>

                {/* Sistema de Condução */}
                <div style={{
                  background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--amber-300)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--amber-800)', 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    ⚡ Sistema de Condução Elétrica Cardíaca
                  </h3>
                  
                  <div style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--amber-200)',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <div style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        color: 'var(--amber-800)',
                        marginBottom: '1rem'
                      }}>
                        Sequência de Ativação:
                      </div>
                      <div style={{ 
                        fontSize: '1rem', 
                        color: 'var(--amber-700)',
                        lineHeight: '1.6',
                        background: 'var(--amber-50)',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        border: '2px solid var(--amber-200)'
                      }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>1. Nó Sinusal</strong> → Inicia o impulso elétrico
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>2. Fibras Internodais</strong> → Conduzem pela musculatura atrial
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>3. Nó Atrioventricular</strong> → Atraso fisiológico
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>4. Feixe de His</strong> → Divisão em ramos direito e esquerdo
                        </div>
                        <div>
                          <strong>5. Fibras de Purkinje</strong> → Despolarização ventricular
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gráfico do ECG */}
                <div style={{
                  background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--green-300)',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--green-800)', 
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    📈 Traçado Normal do ECG
                  </h3>
                  
                  {/* Representação visual do ECG */}
                  <div style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--green-200)',
                    marginBottom: '2rem',
                    position: 'relative',
                    height: '400px',
                    overflow: 'hidden'
                  }}>
                    <svg 
                      width="100%" 
                      height="100%" 
                      viewBox="0 0 1000 300" 
                      style={{ background: 'linear-gradient(to right, #f0f9ff 0%, #e0f2fe 100%)' }}
                    >
                      {/* Grid ECG */}
                      <defs>
                        <pattern id="smallGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                          <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#fca5a5" strokeWidth="0.3"/>
                        </pattern>
                        <pattern id="largeGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                          <rect width="25" height="25" fill="url(#smallGrid)"/>
                          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#dc2626" strokeWidth="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#largeGrid)" />
                      
                      {/* Linha isoelétrica */}
                      <line x1="0" y1="150" x2="1000" y2="150" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
                      
                      {/* Primeiro complexo PQRST */}
                      {/* Onda P */}
                      <path d="M 80 150 Q 95 130 110 150 Q 120 135 135 150" fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
                      <text x="107" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">P</text>
                      
                      {/* Segmento PR */}
                      <line x1="135" y1="150" x2="180" y2="150" stroke="#64748b" strokeWidth="2"/>
                      
                      {/* Complexo QRS */}
                      <path d="M 180 150 L 185 160 L 195 60 L 205 200 L 215 150" fill="none" stroke="#ef4444" strokeWidth="3"/>
                      <text x="182" y="175" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Q</text>
                      <text x="195" y="45" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">R</text>
                      <text x="208" y="220" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">S</text>
                      
                      {/* Segmento ST */}
                      <line x1="215" y1="150" x2="260" y2="150" stroke="#64748b" strokeWidth="2"/>
                      
                      {/* Onda T */}
                      <path d="M 260 150 Q 285 100 310 150" fill="none" stroke="#10b981" strokeWidth="2.5"/>
                      <text x="285" y="85" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">T</text>
                      
                      {/* Segundo complexo PQRST */}
                      <path d="M 380 150 Q 395 130 410 150 Q 420 135 435 150" fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
                      <line x1="435" y1="150" x2="480" y2="150" stroke="#64748b" strokeWidth="2"/>
                      <path d="M 480 150 L 485 160 L 495 60 L 505 200 L 515 150" fill="none" stroke="#ef4444" strokeWidth="3"/>
                      <line x1="515" y1="150" x2="560" y2="150" stroke="#64748b" strokeWidth="2"/>
                      <path d="M 560 150 Q 585 100 610 150" fill="none" stroke="#10b981" strokeWidth="2.5"/>
                      
                      {/* Terceiro complexo PQRST */}
                      <path d="M 680 150 Q 695 130 710 150 Q 720 135 735 150" fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
                      <line x1="735" y1="150" x2="780" y2="150" stroke="#64748b" strokeWidth="2"/>
                      <path d="M 780 150 L 785 160 L 795 60 L 805 200 L 815 150" fill="none" stroke="#ef4444" strokeWidth="3"/>
                      <line x1="815" y1="150" x2="860" y2="150" stroke="#64748b" strokeWidth="2"/>
                      <path d="M 860 150 Q 885 100 910 150" fill="none" stroke="#10b981" strokeWidth="2.5"/>
                      
                      {/* Intervalos e medidas */}
                      <line x1="80" y1="270" x2="180" y2="270" stroke="#7c3aed" strokeWidth="3"/>
                      <text x="130" y="265" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="bold">Intervalo PR</text>
                      <text x="130" y="280" textAnchor="middle" fill="#7c3aed" fontSize="10">0,12-0,20s</text>
                      
                      <line x1="180" y1="285" x2="215" y2="285" stroke="#ef4444" strokeWidth="3"/>
                      <text x="197" y="300" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">QRS &lt;0,12s</text>
                      
                      <line x1="380" y1="270" x2="610" y2="270" stroke="#f59e0b" strokeWidth="3"/>
                      <text x="495" y="265" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Intervalo RR</text>
                      <text x="495" y="280" textAnchor="middle" fill="#f59e0b" fontSize="10">Ritmo Regular</text>
                      
                      {/* Frequência cardíaca */}
                      <rect x="20" y="20" width="200" height="60" fill="rgba(255,255,255,0.9)" stroke="#3b82f6" strokeWidth="2" rx="10"/>
                      <text x="30" y="40" fill="#3b82f6" fontSize="12" fontWeight="bold">Frequência Cardíaca</text>
                      <text x="30" y="55" fill="#3b82f6" fontSize="14" fontWeight="bold">75 bpm (Normal: 60-100)</text>
                      <text x="30" y="70" fill="#3b82f6" fontSize="10">Ritmo Sinusal Regular</text>
                      
                      {/* Amplitude */}
                      <line x1="950" y1="60" x2="950" y2="200" stroke="#10b981" strokeWidth="2"/>
                      <text x="955" y="130" fill="#10b981" fontSize="12" fontWeight="bold">Amplitude</text>
                      <text x="955" y="145" fill="#10b981" fontSize="10">Normal</text>
                    </svg>
                  </div>

                  {/* Explicação das ondas */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)',
                      borderLeft: '4px solid var(--blue-500)'
                    }}>
                      <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        Onda P
                      </h4>
                      <p style={{ color: 'var(--blue-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        <strong>Função:</strong> Despolarização atrial<br/>
                        <strong>Normal:</strong> &lt; 2,5mm altura, &lt; 3mm largura<br/>
                        <strong>Duração:</strong> &lt; 0,12 segundos
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--red-200)',
                      borderLeft: '4px solid var(--red-500)'
                    }}>
                      <h4 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        Complexo QRS
                      </h4>
                      <p style={{ color: 'var(--red-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        <strong>Função:</strong> Despolarização ventricular<br/>
                        <strong>Normal:</strong> &lt; 0,12 segundos (3 quadrinhos)<br/>
                        <strong>Amplitude:</strong> Maior que onda P (massa ventricular)
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--green-200)',
                      borderLeft: '4px solid var(--green-500)'
                    }}>
                      <h4 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        Onda T
                      </h4>
                      <p style={{ color: 'var(--green-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        <strong>Função:</strong> Repolarização ventricular<br/>
                        <strong>Morfologia:</strong> Assimétrica e arredondada<br/>
                        <strong>Polaridade:</strong> Mesma direção do QRS
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--purple-200)',
                      borderLeft: '4px solid var(--purple-500)'
                    }}>
                      <h4 style={{ color: 'var(--purple-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        Intervalo PR
                      </h4>
                      <p style={{ color: 'var(--purple-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        <strong>Função:</strong> Condução AV<br/>
                        <strong>Normal:</strong> 0,12 - 0,20 segundos<br/>
                        <strong>Significado:</strong> Tempo nó sinusal → nó AV
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--amber-200)',
                      borderLeft: '4px solid var(--amber-500)'
                    }}>
                      <h4 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        Segmento ST
                      </h4>
                      <p style={{ color: 'var(--amber-700)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        <strong>Função:</strong> Platô da despolarização<br/>
                        <strong>Normal:</strong> Linha isoelétrica<br/>
                        <strong>Alterações:</strong> Supra/infradesnivelamento
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exemplo Clínico ECG */}
                <div style={{
                  background: 'linear-gradient(145deg, #eff6ff, #dbeafe)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--blue-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--blue-800)', 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    📋 Exemplo Clínico: Bloqueio de Ramo
                  </h3>
                  
                  <div style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--blue-200)'
                  }}>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      lineHeight: '1.8', 
                      color: 'var(--blue-700)', 
                      marginBottom: '1.5rem'
                    }}>
                      <strong>Situação:</strong> Paciente apresenta bloqueio de um ramo do sistema de Purkinje.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ 
                        background: 'var(--red-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--red-500)'
                      }}>
                        <h4 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          🔍 Achados no ECG
                        </h4>
                        <ul style={{ color: 'var(--red-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                          <li>QRS alargado (&gt; 0,12s)</li>
                          <li>Morfologia alterada do complexo</li>
                          <li>Possível eixo desviado</li>
                          <li>Alteração da sequência de ativação</li>
                        </ul>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--blue-50)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid var(--blue-500)'
                      }}>
                        <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          💡 Interpretação Fisiopatológica
                        </h4>
                        <p style={{ color: 'var(--blue-700)', lineHeight: '1.6', margin: 0 }}>
                          A condução fica interrompida na área estimulada pelo ramo afetado, 
                          não respondendo completa ou parcialmente com a contração miocárdica, 
                          resultando em assincronia ventricular.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Flashcards Interativos */}
            <div style={{ 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <Brain className="w-8 h-8 text-purple-500" />
                Flashcards Interativos
              </h2>

              <div style={{
                background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--slate-300)',
                marginBottom: '2rem'
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: 'var(--slate-700)', 
                  textAlign: 'center',
                  marginBottom: '2rem' 
                }}>
                  Teste seus conhecimentos sobre exames complementares com estes flashcards interativos
                </p>

                {/* Flashcard */}
                <div style={{
                  perspective: '1000px',
                  margin: '0 auto',
                  maxWidth: '600px'
                }}>
                  <div 
                    style={{
                      width: '100%',
                      height: '300px',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      cursor: 'pointer',
                      transition: 'transform 0.6s',
                      transform: showFlashcardAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                    onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                  >
                    {/* Frente do card */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '1rem',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        📝 Pergunta
                      </div>
                      <p style={{ 
                        fontSize: '1.1rem', 
                        lineHeight: '1.6', 
                        textAlign: 'center',
                        margin: 0
                      }}>
                        {flashcards[currentFlashcard].question}
                      </p>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        marginTop: '1.5rem', 
                        opacity: 0.8,
                        textAlign: 'center'
                      }}>
                        Clique para ver a resposta
                      </div>
                    </div>

                    {/* Verso do card */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      borderRadius: '1rem',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        ✅ Resposta
                      </div>
                      <p style={{ 
                        fontSize: '1rem', 
                        lineHeight: '1.6', 
                        textAlign: 'center',
                        margin: 0
                      }}>
                        {flashcards[currentFlashcard].answer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Controles */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '1rem', 
                  marginTop: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => markFlashcard('dificil')}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                    }}
                  >
                    😰 Difícil
                  </button>
                  
                  <button
                    onClick={() => markFlashcard('facil')}
                    style={{
                      background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
                    }}
                  >
                    😊 Fácil
                  </button>
                  
                  <button
                    onClick={nextFlashcard}
                    style={{
                      background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
                      color: '#2d3748',
                      border: 'none',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(168, 237, 234, 0.3)'
                    }}
                  >
                    ➡️ Próximo
                  </button>
                </div>

                {/* Estatísticas */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid var(--slate-200)'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                      {currentFlashcard + 1}/{flashcards.length}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                      Progresso
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid var(--slate-200)'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4ecdc4' }}>
                      {flashcardStats.facil}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                      Fáceis
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid var(--slate-200)'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff6b6b' }}>
                      {flashcardStats.dificil}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                      Difíceis
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Casos Clínicos Integrados */}
            <div style={{ 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <FileText className="w-8 h-8 text-green-500" />
                Casos Clínicos Integrados
              </h2>

              {/* Caso 1: Pneumonia */}
              <div style={{
                background: 'linear-gradient(145deg, #fef2f2, #fde8e8)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--red-300)',
                marginBottom: '3rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: 'var(--red-800)', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  🫁 Caso Clínico 1: Pneumonia Hospitalar
                </h3>
                
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--red-200)',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem' }}>
                    📋 Apresentação do Caso
                  </h4>
                  <p style={{ color: 'var(--red-700)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    Paciente masculino, 65 anos, internado há 7 dias por AVC. Desenvolveu febre (38.5°C), 
                    tosse produtiva e dispneia. Suspeita de pneumonia nosocomial.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{
                      background: 'var(--blue-50)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      borderLeft: '4px solid var(--blue-500)'
                    }}>
                      <h5 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🩸 Hemograma
                      </h5>
                      <ul style={{ color: 'var(--blue-700)', paddingLeft: '1rem' }}>
                        <li>Leucócitos: 16.000/mm³ (VR: 4.000-11.000)</li>
                        <li>Neutrófilos: 85% (VR: 50-70%)</li>
                        <li>Hemoglobina: 10.2 g/dL</li>
                        <li>PCR: 120 mg/L (VR: &lt;3 mg/L)</li>
                      </ul>
                    </div>
                    
                    <div style={{
                      background: 'var(--amber-50)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      borderLeft: '4px solid var(--amber-500)'
                    }}>
                      <h5 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🫁 Gasometria
                      </h5>
                      <ul style={{ color: 'var(--amber-700)', paddingLeft: '1rem' }}>
                        <li>pH: 7.42</li>
                        <li>PaCO₂: 38 mmHg</li>
                        <li>PaO₂: 65 mmHg</li>
                        <li>SatO₂: 92%</li>
                      </ul>
                    </div>
                    
                    <div style={{
                      background: 'var(--green-50)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      borderLeft: '4px solid var(--green-500)'
                    }}>
                      <h5 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        📸 Radiografia
                      </h5>
                      <p style={{ color: 'var(--green-700)', lineHeight: '1.6' }}>
                        Consolidação em lobo inferior direito com broncograma aéreo. 
                        Derrame pleural pequeno à direita.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--red-200)'
                }}>
                  <h4 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem' }}>
                    💡 Interpretação Integrada
                  </h4>
                  <p style={{ color: 'var(--red-700)', lineHeight: '1.6' }}>
                    <strong>Diagnóstico:</strong> Pneumonia hospitalar com hipoxemia moderada.<br/>
                    <strong>Fisiopatologia:</strong> Infecção bacteriana causa inflamação alveolar → ↑ leucócitos, ↑ PCR. 
                    Consolidação pulmonar reduz troca gasosa → ↓ PaO₂.<br/>
                    <strong>Conduta Fisioterapêutica:</strong> Higiene brônquica, mobilização precoce, 
                    técnicas de expansão pulmonar e monitorização da SatO₂.
                  </p>
                </div>
              </div>

              {/* Caso 2: IAM */}
              <div style={{
                background: 'linear-gradient(145deg, #eff6ff, #dbeafe)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--blue-300)'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: 'var(--blue-800)', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  ❤️ Caso Clínico 2: Infarto Agudo do Miocárdio
                </h3>
                
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--blue-200)',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem' }}>
                    📋 Apresentação do Caso
                  </h4>
                  <p style={{ color: 'var(--blue-700)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    Paciente feminina, 58 anos, dor precordial há 2 horas, irradiada para braço esquerdo. 
                    Chegou ao PS com sudorese e náuseas.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{
                      background: 'var(--yellow-50)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      borderLeft: '4px solid var(--yellow-500)'
                    }}>
                      <h5 style={{ color: 'var(--yellow-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        ⚡ ECG de 12 Derivações
                      </h5>
                      <ul style={{ color: 'var(--yellow-700)', paddingLeft: '1rem' }}>
                        <li>Supradesnivelamento de ST em V2-V6</li>
                        <li>Ondas Q patológicas em V3-V4</li>
                        <li>Inversão de onda T em precordiais</li>
                        <li>FC: 98 bpm, ritmo sinusal</li>
                      </ul>
                    </div>
                    
                    <div style={{
                      background: 'var(--rose-50)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      borderLeft: '4px solid var(--rose-500)'
                    }}>
                      <h5 style={{ color: 'var(--rose-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        🎯 Angiografia
                      </h5>
                      <p style={{ color: 'var(--rose-700)', lineHeight: '1.6' }}>
                        Oclusão completa da artéria descendente anterior média. 
                        Circulação colateral presente. TIMI 0.
                      </p>
                    </div>
                    
                    <div style={{
                      background: 'var(--purple-50)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      borderLeft: '4px solid var(--purple-500)'
                    }}>
                      <h5 style={{ color: 'var(--purple-800)', fontWeight: '600', marginBottom: '1rem' }}>
                        📊 Biomarcadores
                      </h5>
                      <ul style={{ color: 'var(--purple-700)', paddingLeft: '1rem' }}>
                        <li>Troponina I: 15.2 ng/mL (VR: &lt;0.04)</li>
                        <li>CK-MB: 85 ng/mL (VR: &lt;6.3)</li>
                        <li>Mioglobina: 350 ng/mL</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--blue-200)'
                }}>
                  <h4 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem' }}>
                    💡 Interpretação Integrada
                  </h4>
                  <p style={{ color: 'var(--blue-700)', lineHeight: '1.6' }}>
                    <strong>Diagnóstico:</strong> IAM com supradesnivelamento do segmento ST (STEMI) em parede anterior.<br/>
                    <strong>Fisiopatologia:</strong> Oclusão da DA → necrose miocárdica → liberação de troponinas e alterações no ECG.<br/>
                    <strong>Conduta Fisioterapêutica:</strong> Mobilização precoce pós-angioplastia, exercícios de baixa intensidade, 
                    educação sobre fatores de risco e reabilitação cardíaca fase I.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamesComplementares;
