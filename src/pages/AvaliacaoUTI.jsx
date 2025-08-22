import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Thermometer, Activity, Wind, Eye, Brain, Stethoscope, Monitor, Gauge, ChevronDown, ChevronRight, Info, AlertTriangle, CheckCircle, X, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AvaliacaoUTI = () => {
  const [animateVitals, setAnimateVitals] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [flashcardStats, setFlashcardStats] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger animation after component mounts
    setTimeout(() => setAnimateVitals(true), 1000);
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

  const markFlashcard = (isCorrect) => {
    setFlashcardStats(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }));
    setTimeout(nextFlashcard, 1000);
  };

  const flashcards = [
    {
      question: "Quais são os principais danos celulares causados pela hipertermia?",
      answer: "Desnaturação proteica, disfunção mitocondrial, peroxidação lipídica, ativação de cascatas inflamatórias, e comprometimento da síntese de ATP. Temperaturas >42°C causam morte celular irreversível.",
      category: "Fisiopatologia"
    },
    {
      question: "Como o fisioterapeuta pode intervir em pacientes hipertérmicos?",
      answer: "Técnicas de resfriamento: compressas frias, ventilação, hidratação; Exercícios passivos para manter circulação; Posicionamento para favorecer perda de calor; Monitoramento contínuo de sinais vitais.",
      category: "Intervenção"
    },
    {
      question: "O que caracteriza o tórax em tonel e sua fisiopatologia?",
      answer: "Aumento do diâmetro anteroposterior por hiperinsuflação pulmonar crônica (DPOC). Causa: aprisionamento aéreo, perda de elasticidade, aumento do volume residual. Resulta em uso excessivo de músculos acessórios.",
      category: "Anatomia Patológica"
    },
    {
      question: "Qual a diferença entre roncos e sibilos na ausculta?",
      answer: "Roncos: sons graves e contínuos, indicam obstrução de vias aéreas superiores por secreções. Sibilos: sons agudos, indicam broncoconstrição (expiratório) ou obstrução periférica (inspiratório).",
      category: "Semiologia"
    },
    {
      question: "Como interpretar a respiração paradoxal?",
      answer: "Movimento assincrônico entre tórax e abdômen. Durante inspiração: tórax se retrai e abdômen se expande. Indica fadiga muscular respiratória, trauma torácico ou obstrução grave das vias aéreas.",
      category: "Emergência"
    }
  ];

  const vitalsData = {
    temperatura: { value: 36.8, unit: '°C', range: '36.1° - 37.2°', color: '#ef4444' },
    fc: { value: 78, unit: 'BPM', range: '60 - 100 BPM', color: '#ec4899' },
    fr: { value: 16, unit: 'RPM', range: '12 - 20 RPM', color: '#06b6d4' },
    pa: { value: '118/76', unit: 'mmHg', range: '≤120/≤80 mmHg', color: '#8b5cf6' }
  };

  const ruidosAdventicios = [
    {
      ruido: 'Roncos',
      caracteristica: 'Som grave e contínuo',
      significado: 'Sugestivo de obstrução de vias aéreas inferiores'
    },
    {
      ruido: 'Sibilos',
      caracteristica: 'Som agudo que pode estar presente em apenas uma parte do ciclo respiratório, comumente na fase expiratória',
      significado: 'Fase expiratória: sugere bronco-constrição\nFase inspiratória: sugere obstrução das vias aéreas periféricas'
    },
    {
      ruido: 'Estertores crepitantes',
      caracteristica: 'Som descontínuo semelhante ao atrito dos fios de cabelo',
      significado: 'Sugestivo de líquido nas vias aéreas'
    },
    {
      ruido: 'Atrito pleural',
      caracteristica: 'Som de atrito mais comum durante a inspiração',
      significado: 'Atrito das pleuras parietal'
    }
  ];

  return (
    <div className="avaliacao-uti-page" style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
              <Monitor className="w-8 h-8 text-white" />
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
                Avaliação Fisioterapêutica e Monitorização em UTI
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                margin: '0.5rem 0 0 0'
              }}>
                Protocolos essenciais para avaliação e monitoramento contínuo
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
              <Stethoscope className="w-4 h-4" />
              Módulo Avançado
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
              UTI e Emergência
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
              <Monitor className="w-4 h-4" />
              Monitorização Contínua
            </span>
          </div>
        </div>
      </section>

      {/* Flashcards Interativos */}
      <section style={{ padding: '2rem 0', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '700', 
              color: 'var(--slate-800)', 
              marginBottom: '1rem'
            }}>
              📚 Teste seus conhecimentos
            </h2>
            <p style={{ color: 'var(--slate-600)', marginBottom: '2rem' }}>
              Flashcards interativos para fixar conceitos importantes
            </p>

            {/* Flashcard */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem',
              border: '1px solid var(--slate-200)',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: showFlashcardAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d'
            }}
            onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
            onMouseEnter={(e) => e.currentTarget.style.transform = showFlashcardAnswer ? 'rotateY(180deg) scale(1.02)' : 'rotateY(0deg) scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = showFlashcardAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)'}
            >
              {/* Frente do card */}
              <div style={{
                backfaceVisibility: 'hidden',
                display: showFlashcardAnswer ? 'none' : 'block'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}>
                  {flashcards[currentFlashcard]?.category}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'var(--slate-800)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {flashcards[currentFlashcard]?.question}
                </h3>
                <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  Clique para ver a resposta
                </p>
              </div>

              {/* Verso do card */}
              <div style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: showFlashcardAnswer ? 'block' : 'none',
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                right: '2rem',
                bottom: '2rem'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #10b981, #047857)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}>
                  Resposta
                </div>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'var(--slate-700)',
                  lineHeight: '1.6',
                  margin: 0,
                  textAlign: 'left'
                }}>
                  {flashcards[currentFlashcard]?.answer}
                </p>
              </div>
            </div>

            {/* Controles do Flashcard */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              {showFlashcardAnswer && (
                <>
                  <button
                    onClick={() => markFlashcard(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <X className="w-4 h-4" />
                    Difícil
                  </button>
                  <button
                    onClick={() => markFlashcard(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Fácil
                  </button>
                </>
              )}
              <button
                onClick={nextFlashcard}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <RotateCcw className="w-4 h-4" />
                Próximo
              </button>
            </div>

            {/* Estatísticas */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--green-600)' }}>
                <CheckCircle className="w-4 h-4" />
                <span>Fáceis: {flashcardStats.correct}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--red-600)' }}>
                <X className="w-4 h-4" />
                <span>Difíceis: {flashcardStats.incorrect}</span>
              </div>
              <div style={{ color: 'var(--slate-600)' }}>
                Card {currentFlashcard + 1} de {flashcards.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Anamnese */}
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
                Anamnese no Ambiente Hospitalar
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--emerald-700)', 
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Toda avaliação começa por um bom levantamento de informações, conhecida como anamnese. Porém, no ambiente hospitalar, em muitas condições o paciente não tem capacidade de relatar dados de sua história, sendo então indicado o levantamento da informação com os familiares e no prontuário.
              </p>

              <div style={{ 
                background: 'rgba(16, 185, 129, 0.1)', 
                padding: '2rem', 
                borderRadius: '1rem',
                border: '1px solid var(--emerald-300)'
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7', 
                  color: 'var(--emerald-700)',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--emerald-800)' }}>Importante:</strong> Muitos pacientes relatam sintomas inespecíficos para o médico determinar o diagnóstico clínico. Isso se dá por conta de que eles podem acontecer devido a problemas cardíacos, respiratórios e até mesmo renais, como é o caso da dispneia.
                </p>
              </div>
            </div>

            {/* Sintomas Principais */}
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
                color: 'var(--blue-800)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Principais Sintomas e Avaliação
              </h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Dispneia */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--blue-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--blue-800)', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Wind className="w-6 h-6" />
                    Dispneia
                  </h3>
                  <p style={{ color: 'var(--blue-700)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Caracterizada pela sensação de falta de ar, comum nas doenças respiratórias e cardíacas. Pode surgir devido ao esforço respiratório por conta da hipoxemia, aumento do esforço respiratório pela redução do calibre das vias aéreas ou redução da expansibilidade pulmonar.
                  </p>
                  
                  <div style={{ 
                    background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)', 
                    padding: '2rem', 
                    borderRadius: '1rem',
                    border: '2px solid #3b82f6',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Background pattern */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.03'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                      opacity: 0.5
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h4 style={{ 
                        fontSize: '1.4rem', 
                        fontWeight: '700', 
                        color: '#1e40af', 
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(30, 64, 175, 0.1)'
                      }}>
                        📊 Escala de Borg Modificada
                      </h4>
                      
                      <p style={{ 
                        fontSize: '1rem', 
                        color: '#475569', 
                        textAlign: 'center', 
                        marginBottom: '2rem',
                        fontStyle: 'italic'
                      }}>
                        Avaliação subjetiva da sensação de falta de ar
                      </p>
                      
                      {/* Escala visual */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(11, 1fr)', 
                        gap: '0.5rem', 
                        marginBottom: '2rem',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '0.75rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <div key={num} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <div style={{
                              width: '2.5rem',
                              height: '2.5rem',
                              borderRadius: '50%',
                              background: num === 0 ? '#10b981' : 
                                         num <= 3 ? '#84cc16' :
                                         num <= 6 ? '#eab308' :
                                         num <= 8 ? '#f97316' : '#ef4444',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '700',
                              fontSize: '1rem',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              transform: num === 0 || num === 10 ? 'scale(1.1)' : 'scale(1)',
                              transition: 'transform 0.3s ease'
                            }}>
                              {num}
                            </div>
                            {(num === 0 || num === 10) && (
                              <div style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: num === 0 ? '#10b981' : '#ef4444',
                                textAlign: 'center',
                                lineHeight: '1.2'
                              }}>
                                {num === 0 ? 'Sem\ndesconforto' : 'Desconforto\nmáximo'}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Legendas das faixas */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                        gap: '1rem'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: 'rgba(16, 185, 129, 0.1)',
                          borderRadius: '0.5rem',
                          border: '1px solid #10b981'
                        }}>
                          <div style={{ 
                            width: '1rem', 
                            height: '1rem', 
                            borderRadius: '50%', 
                            background: '#10b981' 
                          }} />
                          <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: '500' }}>
                            0-3: Leve
                          </span>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: 'rgba(234, 179, 8, 0.1)',
                          borderRadius: '0.5rem',
                          border: '1px solid #eab308'
                        }}>
                          <div style={{ 
                            width: '1rem', 
                            height: '1rem', 
                            borderRadius: '50%', 
                            background: '#eab308' 
                          }} />
                          <span style={{ fontSize: '0.9rem', color: '#92400e', fontWeight: '500' }}>
                            4-6: Moderado
                          </span>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: 'rgba(239, 68, 68, 0.1)',
                          borderRadius: '0.5rem',
                          border: '1px solid #ef4444'
                        }}>
                          <div style={{ 
                            width: '1rem', 
                            height: '1rem', 
                            borderRadius: '50%', 
                            background: '#ef4444' 
                          }} />
                          <span style={{ fontSize: '0.9rem', color: '#991b1b', fontWeight: '500' }}>
                            7-10: Intenso
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tosse */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #fef7ff 0%, #fae8ff 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--purple-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--purple-800)', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Activity className="w-6 h-6" />
                    Tosse
                  </h3>
                  <p style={{ color: 'var(--purple-700)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Sistema comum em doenças cardíacas e respiratórias, porém sua característica difere em alguns aspectos.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--purple-200)'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--purple-800)', marginBottom: '0.5rem' }}>
                        Eficácia
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--purple-700)' }}>
                        Tem fluxo expiratório adequado? Classifica como eficaz ou ineficaz.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--purple-200)'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--purple-800)', marginBottom: '0.5rem' }}>
                        Produtividade
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--purple-700)' }}>
                        Tem presença de secreção? Identifica como seca ou produtiva.
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    border: '1px solid var(--purple-200)',
                    marginTop: '1rem'
                  }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--purple-800)', marginBottom: '1rem' }}>
                      Características da Expectoração:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <strong style={{ color: 'var(--purple-800)' }}>Coloração:</strong>
                        <span style={{ color: 'var(--purple-700)', marginLeft: '0.5rem' }}>
                          Purulenta (infecção) vs Mucoide (vias aéreas)
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--purple-800)' }}>Viscosidade:</strong>
                        <span style={{ color: 'var(--purple-700)', marginLeft: '0.5rem' }}>
                          Fluida vs Espessa
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--purple-800)' }}>Quantidade:</strong>
                        <span style={{ color: 'var(--purple-700)', marginLeft: '0.5rem' }}>
                          Pequena a grande
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--purple-800)' }}>Odor:</strong>
                        <span style={{ color: 'var(--purple-700)', marginLeft: '0.5rem' }}>
                          Fétido (Pseudomonas/Klebsiella)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outros Sintomas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ 
                    background: 'linear-gradient(145deg, #fef2f2 0%, #fde8e8 100%)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--red-300)'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--red-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Heart className="w-5 h-5" />
                      Dor Torácica
                    </h4>
                    <p style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                      Característica de condição cardiovascular adversa. Dor não pleurítica com irradiação para membro superior esquerdo e porção dorsal indica angina.
                    </p>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(145deg, #fefce8 0%, #fef3c7 100%)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--amber-300)'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--amber-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Thermometer className="w-5 h-5" />
                      Febre
                    </h4>
                    <p style={{ color: 'var(--amber-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                      Reflete quadros infecciosos. Leva a estado hiperdinâmico com aumento do consumo de O₂ e sobrecarga cardiovascular.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quadros Hiperdinâmicos */}
            <div style={{ 
              background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--amber-300)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--amber-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Quadros Hiperdinâmicos
              </h2>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--amber-700)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Condições que podem evoluir com complicações graves como o choque hiperdinâmico:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--red-200)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--red-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem'
                  }}>🦠</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--red-800)', marginBottom: '0.5rem' }}>
                    Séptico
                  </h3>
                  <p style={{ color: 'var(--red-700)', fontSize: '0.95rem' }}>
                    Falência circulatória por infecção
                  </p>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--orange-200)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--orange-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem'
                  }}>⚠️</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--orange-800)', marginBottom: '0.5rem' }}>
                    Anafilático
                  </h3>
                  <p style={{ color: 'var(--orange-700)', fontSize: '0.95rem' }}>
                    Falência circulatória por reação alérgica
                  </p>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--purple-200)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--purple-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem'
                  }}>🧠</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--purple-800)', marginBottom: '0.5rem' }}>
                    Neurogênico
                  </h3>
                  <p style={{ color: 'var(--purple-700)', fontSize: '0.95rem' }}>
                    Falência por alteração do sistema nervoso
                  </p>
                </div>
              </div>
            </div>

            {/* Exame Físico - Inspeção */}
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
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Exame Físico - Inspeção
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--slate-700)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                A inspeção é o primeiro e mais importante método de avaliação. Deve ser sistemática, detalhada e abranger todos os aspectos visuais do paciente.
              </p>

              {/* Resumo dos Pontos-Chave */}
              <div style={{
                background: 'linear-gradient(145deg, #f0f9ff, #e0f2fe)',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid var(--sky-200)'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '600', 
                  color: 'var(--sky-800)', 
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  🔍 Checklist Rápido de Inspeção
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {[
                    { icon: '🫁', question: 'Modo ventilatório?', detail: 'Espontâneo, VNI ou invasivo' },
                    { icon: '💨', question: 'Oxigenoterapia?', detail: 'Tipo de dispositivo e FiO₂' },
                    { icon: '🩸', question: 'Acessos vasculares?', detail: 'Periférico, central, condições' },
                    { icon: '🔧', question: 'Sondas e drenos?', detail: 'Tipos, fixação, funcionamento' },
                    { icon: '🎨', question: 'Coloração da pele?', detail: 'Cianose, palidez, icterícia' },
                    { icon: '😊', question: 'Expressão facial?', detail: 'Dor, ansiedade, consciência' },
                    { icon: '🔪', question: 'Incisões cirúrgicas?', detail: 'Localização, cicatrização' },
                    { icon: '😮‍💨', question: 'Desconforto respiratório?', detail: 'Tiragem, uso de acessórios' },
                    { icon: '🧠', question: 'Orientação?', detail: 'Tempo, espaço, pessoa' }
                  ].map((item, index) => (
                    <div key={index} style={{ 
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--sky-200)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                    >
                      <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--sky-800)', fontSize: '0.95rem' }}>
                          {item.question}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--sky-600)' }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sinais Vitais - Passo a Passo */}
            <div style={{ 
              background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--blue-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--blue-800)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Avaliação dos Sinais Vitais - Passo a Passo
              </h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Temperatura */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--red-200)',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '-1rem',
                    left: '2rem',
                    background: 'var(--red-500)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Passo 1
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <Thermometer className="w-8 h-8 text-red-500" style={{ marginTop: '0.5rem', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--red-800)', marginBottom: '1rem' }}>
                        Temperatura
                      </h3>
                      <p style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                        A oscilação da temperatura corporal pode gerar danos celulares e metabólicos críticos. 
                      </p>

                      {/* Classificação de Temperatura */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'linear-gradient(145deg, #dbeafe, #bfdbfe)', padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid var(--blue-300)' }}>
                          <strong style={{ color: 'var(--blue-800)', fontSize: '1.1rem' }}>Hipotermia Severa</strong>
                          <div style={{ color: 'var(--blue-700)', marginTop: '0.5rem' }}>&lt;32°C</div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--blue-600)', marginTop: '0.5rem', margin: 0 }}>
                            Risco de arritmias ventriculares
                          </p>
                        </div>
                        <div style={{ background: 'linear-gradient(145deg, #e0f2fe, #b3e5fc)', padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid var(--cyan-300)' }}>
                          <strong style={{ color: 'var(--cyan-800)', fontSize: '1.1rem' }}>Hipotermia Moderada</strong>
                          <div style={{ color: 'var(--cyan-700)', marginTop: '0.5rem' }}>32-35°C</div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--cyan-600)', marginTop: '0.5rem', margin: 0 }}>
                            Depressão do SNC e bradicardia
                          </p>
                        </div>
                        <div style={{ background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)', padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid var(--green-300)' }}>
                          <strong style={{ color: 'var(--green-800)', fontSize: '1.1rem' }}>Normal</strong>
                          <div style={{ color: 'var(--green-700)', marginTop: '0.5rem' }}>36.1-37.2°C</div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--green-600)', marginTop: '0.5rem', margin: 0 }}>
                            Homeostase térmica adequada
                          </p>
                        </div>
                        <div style={{ background: 'linear-gradient(145deg, #fef3c7, #fde68a)', padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid var(--amber-300)' }}>
                          <strong style={{ color: 'var(--amber-800)', fontSize: '1.1rem' }}>Febre Moderada</strong>
                          <div style={{ color: 'var(--amber-700)', marginTop: '0.5rem' }}>37.8-39°C</div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--amber-600)', marginTop: '0.5rem', margin: 0 }}>
                            Resposta inflamatória ativa
                          </p>
                        </div>
                        <div style={{ background: 'linear-gradient(145deg, #fef2f2, #fecaca)', padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid var(--red-300)' }}>
                          <strong style={{ color: 'var(--red-800)', fontSize: '1.1rem' }}>Hipertermia Severa</strong>
                          <div style={{ color: 'var(--red-700)', marginTop: '0.5rem' }}>&gt;40°C</div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--red-600)', marginTop: '0.5rem', margin: 0 }}>
                            Emergência médica - danos irreversíveis
                          </p>
                        </div>
                      </div>

                      {/* Danos Celulares Detalhados */}
                      <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--red-200)',
                        marginBottom: '2rem'
                      }}>
                        <h4 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: '600', 
                          color: 'var(--red-800)', 
                          marginBottom: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <AlertTriangle className="w-5 h-5" />
                          Mecanismos de Danos Celulares
                        </h4>
                        
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                          {/* Hipertermia */}
                          <div style={{ padding: '1.5rem', background: 'linear-gradient(145deg, #fef2f2, #fde8e8)', borderRadius: '0.75rem', borderLeft: '4px solid var(--red-500)' }}>
                            <h5 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                              🔥 Hipertermia (&gt;40°C)
                            </h5>
                            <ul style={{ color: 'var(--red-700)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                              <li><strong>Desnaturação proteica:</strong> Perda da estrutura terciária das enzimas e proteínas estruturais</li>
                              <li><strong>Disfunção mitocondrial:</strong> Desacoplamento da fosforilação oxidativa, redução do ATP</li>
                              <li><strong>Peroxidação lipídica:</strong> Danos à membrana celular por radicais livres</li>
                              <li><strong>Ativação de caspases:</strong> Indução de apoptose celular programada</li>
                              <li><strong>Resposta ao choque térmico:</strong> Síntese excessiva de proteínas de estresse (HSPs)</li>
                            </ul>
                          </div>

                          {/* Hipotermia */}
                          <div style={{ padding: '1.5rem', background: 'linear-gradient(145deg, #eff6ff, #dbeafe)', borderRadius: '0.75rem', borderLeft: '4px solid var(--blue-500)' }}>
                            <h5 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                              🧊 Hipotermia (&lt;35°C)
                            </h5>
                            <ul style={{ color: 'var(--blue-700)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                              <li><strong>Redução enzimática:</strong> Diminuição da atividade enzimática em 50% a cada 10°C de queda</li>
                              <li><strong>Cristalização intracelular:</strong> Formação de cristais de gelo que rompem organelas</li>
                              <li><strong>Vasoconstrição periférica:</strong> Redução da perfusão tecidual e oxigenação</li>
                              <li><strong>Depressão metabólica:</strong> Redução do consumo de O₂ e produção de CO₂</li>
                              <li><strong>Disfunção de bomba Na⁺/K⁺:</strong> Alteração do potencial de membrana</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Intervenções Fisioterapêuticas */}
                      <div style={{
                        background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--green-300)'
                      }}>
                        <h4 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: '600', 
                          color: 'var(--green-800)', 
                          marginBottom: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Heart className="w-5 h-5" />
                          Intervenções Fisioterapêuticas na Termorregulação
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                          {/* Hipertermia */}
                          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--green-200)' }}>
                            <h5 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Thermometer className="w-4 h-4" />
                              Manejo da Hipertermia
                            </h5>
                            <ul style={{ color: 'var(--slate-700)', lineHeight: '1.5', fontSize: '0.95rem', paddingLeft: '1rem' }}>
                              <li><strong>Resfriamento ativo:</strong> Compressas frias em regiões de grande vascularização (axilas, virilhas, pescoço)</li>
                              <li><strong>Posicionamento:</strong> Elevação de membros para favorecer retorno venoso</li>
                              <li><strong>Mobilização passiva:</strong> Estimular circulação sem gerar calor metabólico</li>
                              <li><strong>Monitoramento contínuo:</strong> Temperatura central e periférica</li>
                              <li><strong>Exercícios respiratórios:</strong> Favorecer perda de calor por evaporação</li>
                            </ul>
                          </div>

                          {/* Hipotermia */}
                          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--green-200)' }}>
                            <h5 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Thermometer className="w-4 h-4" />
                              Manejo da Hipotermia
                            </h5>
                            <ul style={{ color: 'var(--slate-700)', lineHeight: '1.5', fontSize: '0.95rem', paddingLeft: '1rem' }}>
                              <li><strong>Reaquecimento passivo:</strong> Mantas térmicas e proteção contra perdas de calor</li>
                              <li><strong>Mobilização ativa assistida:</strong> Gerar calor metabólico através de contração muscular</li>
                              <li><strong>Técnicas de aquecimento:</strong> Infravermelho, mantas elétricas (com cuidado)</li>
                              <li><strong>Exercícios isométricos:</strong> Contrações musculares para termogênese</li>
                              <li><strong>Progressão gradual:</strong> Evitar reaquecimento muito rápido (afterdrop)</li>
                            </ul>
                          </div>
                        </div>

                        {/* Caso Clínico */}
                        <div style={{
                          background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          border: '1px solid var(--amber-300)',
                          marginTop: '1.5rem'
                        }}>
                          <h5 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            📋 Caso Clínico: Hipertermia em UTI
                          </h5>
                          <div style={{ color: 'var(--amber-800)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
                              <strong>Paciente:</strong> Masculino, 68 anos, pós-operatório de cirurgia cardíaca, apresentando T° = 39.8°C há 6 horas.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                              <strong>Conduta fisioterapêutica:</strong> Aplicação de compressas frias em região axilar e inguinal, mobilização passiva de MMII para estimular retorno venoso, exercícios respiratórios para aumentar perda de calor por evaporação.
                            </p>
                            <p style={{ margin: 0, fontStyle: 'italic' }}>
                              <strong>Resultado:</strong> Redução da temperatura para 38.2°C em 2 horas, melhora do estado geral e redução da taquicardia.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frequência Cardíaca */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--pink-200)',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '-1rem',
                    left: '2rem',
                    background: 'var(--pink-500)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Passo 2
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <Heart className="w-8 h-8 text-pink-500" style={{ marginTop: '0.5rem', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--pink-800)', marginBottom: '1rem' }}>
                        Frequência Cardíaca (FC)
                      </h3>
                      <p style={{ color: 'var(--pink-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                        Verificação do pulso periférico pela palpação da artéria radial ou carótida. Contar durante um minuto e avaliar ritmo.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div style={{ background: 'var(--green-50)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                          <strong style={{ color: 'var(--green-800)' }}>Normal</strong><br/>
                          <span style={{ color: 'var(--green-700)' }}>60-100 bpm</span>
                        </div>
                        <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                          <strong style={{ color: 'var(--red-800)' }}>Taquicardia</strong><br/>
                          <span style={{ color: 'var(--red-700)' }}>&gt;100 bpm</span>
                        </div>
                        <div style={{ background: 'var(--blue-50)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                          <strong style={{ color: 'var(--blue-800)' }}>Bradicardia</strong><br/>
                          <span style={{ color: 'var(--blue-700)' }}>&lt;60 bpm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frequência Respiratória */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--cyan-200)',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '-1rem',
                    left: '2rem',
                    background: 'var(--cyan-500)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Passo 3
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <Wind className="w-8 h-8 text-cyan-500" style={{ marginTop: '0.5rem', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--cyan-800)', marginBottom: '1rem' }}>
                        Frequência Respiratória (f)
                      </h3>
                      <p style={{ color: 'var(--cyan-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                        Observar o ciclo respiratório através da expansão do tórax durante um minuto.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div style={{ background: 'var(--green-50)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                          <strong style={{ color: 'var(--green-800)' }}>Normal</strong><br/>
                          <span style={{ color: 'var(--green-700)' }}>12-20 rpm</span>
                        </div>
                        <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                          <strong style={{ color: 'var(--red-800)' }}>Taquipneia</strong><br/>
                          <span style={{ color: 'var(--red-700)' }}>&gt;20 rpm</span>
                        </div>
                        <div style={{ background: 'var(--blue-50)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                          <strong style={{ color: 'var(--blue-800)' }}>Bradipneia</strong><br/>
                          <span style={{ color: 'var(--blue-700)' }}>&lt;12 rpm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pressão Arterial */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--purple-200)',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '-1rem',
                    left: '2rem',
                    background: 'var(--purple-500)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Passo 4
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <Gauge className="w-8 h-8 text-purple-500" style={{ marginTop: '0.5rem', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--purple-800)', marginBottom: '1rem' }}>
                        Pressão Arterial (PA)
                      </h3>
                      <p style={{ color: 'var(--purple-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                        Força do sangue sobre a parede vascular. Utilizar método auscultatório com sons de Korotkoff.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ background: 'var(--purple-50)', padding: '1rem', borderRadius: '0.5rem' }}>
                          <strong style={{ color: 'var(--purple-800)' }}>PAS (Sistólica):</strong><br/>
                          <span style={{ color: 'var(--purple-700)' }}>≤120 mmHg</span><br/>
                          <small style={{ color: 'var(--purple-600)' }}>Primeiro som</small>
                        </div>
                        <div style={{ background: 'var(--purple-50)', padding: '1rem', borderRadius: '0.5rem' }}>
                          <strong style={{ color: 'var(--purple-800)' }}>PAD (Diastólica):</strong><br/>
                          <span style={{ color: 'var(--purple-700)' }}>≤80 mmHg</span><br/>
                          <small style={{ color: 'var(--purple-600)' }}>Som reduzido</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor de Sinais Vitais Animado */}
            <div style={{ 
              background: 'linear-gradient(145deg, #1f2937 0%, #111827 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '2px solid var(--gray-600)',
              color: 'white'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'white', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Monitorização Multiparâmetros - UTI
              </h2>
              
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--gray-300)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Valores de referência dos sinais vitais para adultos:
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                {Object.entries(vitalsData).map(([key, data]) => (
                  <div key={key} style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: `2px solid ${data.color}`,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Animated pulse effect */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle, ${data.color}20 0%, transparent 70%)`,
                      transform: 'translate(-50%, -50%)',
                      animation: animateVitals ? 'pulse 2s infinite' : 'none',
                      opacity: 0.3
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: '800', 
                        color: data.color,
                        marginBottom: '0.5rem',
                        textShadow: `0 0 10px ${data.color}50`
                      }}>
                        {data.value}
                      </div>
                      <div style={{ 
                        fontSize: '1rem', 
                        color: 'var(--gray-300)',
                        marginBottom: '1rem'
                      }}>
                        {data.unit}
                      </div>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--gray-400)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '0.5rem',
                        borderRadius: '0.5rem'
                      }}>
                        {data.range}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'var(--gray-300)',
                  margin: 0
                }}>
                  <strong style={{ color: 'white' }}>Importante:</strong> No ambiente de terapia intensiva, estes parâmetros são monitorizados continuamente através de monitorização multiparâmetros individual para cada paciente.
                </p>
              </div>
            </div>

            {/* Avaliação do Tórax */}
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
                color: 'var(--emerald-800)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Avaliação do Tórax
              </h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Tipos de Tórax */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--emerald-300)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--emerald-800)', marginBottom: '1.5rem' }}>
                    Tipos de Tórax: Anatomia Patológica e Fisiopatologia
                  </h3>
                  <p style={{ color: 'var(--emerald-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                    A configuração torácica se modifica frente a situações crônicas que levam ao aumento do aprisionamento aéreo, bem como nas condições ortopédicas da coluna vertebral. Cada alteração possui implicações biomecânicas específicas na função respiratória.
                  </p>
                  
                  {/* Tipos de Tórax Expandidos */}
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    
                    {/* Tórax em Tonel */}
                    <div style={{ 
                      background: 'white',
                      borderRadius: '1rem',
                      padding: '2rem',
                      border: '1px solid var(--emerald-200)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'linear-gradient(145deg, #fef3c7, #fde68a)',
                        borderRadius: '0.75rem'
                      }}>
                        <div style={{ 
                          width: '3rem',
                          height: '3rem',
                          background: 'var(--amber-500)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          🫁
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--amber-800)', margin: 0 }}>
                            Tórax em Tonel (Barrel Chest)
                          </h4>
                          <p style={{ color: 'var(--amber-700)', fontSize: '0.9rem', margin: 0 }}>
                            Diâmetro anteroposterior aumentado - Razão AP:Lateral &gt; 0.9
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {/* Fisiopatologia */}
                        <div style={{ 
                          background: 'linear-gradient(145deg, #fef2f2, #fde8e8)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          borderLeft: '4px solid var(--red-500)'
                        }}>
                          <h5 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                            🔬 Fisiopatologia
                          </h5>
                          <ul style={{ color: 'var(--red-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                            <li><strong>Hiperinsuflação pulmonar:</strong> Volume residual aumentado (150-200% do normal)</li>
                            <li><strong>Perda de elasticidade:</strong> Destruição de fibras elásticas (enfisema)</li>
                            <li><strong>Aprisionamento aéreo:</strong> Obstrução expiratória + colapso dinâmico</li>
                            <li><strong>Desvantagem mecânica:</strong> Diafragma em posição baixa e horizontalizada</li>
                            <li><strong>Músculos acessórios:</strong> Hipertrofia compensatória</li>
                          </ul>
                        </div>

                        {/* Implicações Clínicas */}
                        <div style={{ 
                          background: 'linear-gradient(145deg, #eff6ff, #dbeafe)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          borderLeft: '4px solid var(--blue-500)'
                        }}>
                          <h5 style={{ color: 'var(--blue-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                            💊 Implicações Clínicas
                          </h5>
                          <ul style={{ color: 'var(--blue-700)', lineHeight: '1.6', paddingLeft: '1rem' }}>
                            <li><strong>Dispneia aos esforços:</strong> Ineficiência ventilatória</li>
                            <li><strong>Fadiga muscular:</strong> Trabalho respiratório aumentado em 3-4x</li>
                            <li><strong>Hipercapnia:</strong> Ventilação alveolar reduzida</li>
                            <li><strong>Cor pulmonale:</strong> Hipertensão pulmonar secundária</li>
                            <li><strong>Infecções recorrentes:</strong> Clearance mucociliar prejudicado</li>
                          </ul>
                        </div>
                      </div>

                      {/* Intervenções Fisioterapêuticas Específicas */}
                      <div style={{
                        background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--green-300)',
                        marginTop: '1.5rem'
                      }}>
                        <h5 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                          🩺 Abordagem Fisioterapêutica
                        </h5>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                          <div>
                            <h6 style={{ color: 'var(--green-700)', fontWeight: '600', marginBottom: '0.5rem' }}>Exercícios Respiratórios:</h6>
                            <ul style={{ color: 'var(--green-600)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                              <li>Respiração com lábios franzidos</li>
                              <li>Padrão diafragmático</li>
                              <li>Exercícios com EPAP</li>
                            </ul>
                          </div>
                          <div>
                            <h6 style={{ color: 'var(--green-700)', fontWeight: '600', marginBottom: '0.5rem' }}>Expansão Torácica:</h6>
                            <ul style={{ color: 'var(--green-600)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                              <li>Mobilização costal</li>
                              <li>Alongamento m. acessórios</li>
                              <li>Exercícios posturais</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pectus Carinatum */}
                    <div style={{ 
                      background: 'white',
                      borderRadius: '1rem',
                      padding: '2rem',
                      border: '1px solid var(--purple-200)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'linear-gradient(145deg, #f3e8ff, #e9d5ff)',
                        borderRadius: '0.75rem'
                      }}>
                        <div style={{ 
                          width: '3rem',
                          height: '3rem',
                          background: 'var(--purple-500)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          📐
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--purple-800)', margin: 0 }}>
                            Pectus Carinatum (Peito de Pombo)
                          </h4>
                          <p style={{ color: 'var(--purple-700)', fontSize: '0.9rem', margin: 0 }}>
                            Protrusão anterior do esterno e cartilagens costais
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ 
                          background: 'linear-gradient(145deg, #fef3c7, #fde68a)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          borderLeft: '4px solid var(--amber-500)'
                        }}>
                          <h5 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                            📊 Características
                          </h5>
                          <ul style={{ color: 'var(--amber-700)', lineHeight: '1.5', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                            <li>Incidência: 1:400 nascimentos</li>
                            <li>Predominância masculina (4:1)</li>
                            <li>Crescimento compensatório das cartilagens</li>
                            <li>Frequentemente assimétrico</li>
                          </ul>
                        </div>

                        <div style={{ 
                          background: 'linear-gradient(145deg, #ecfdf5, #d1fae5)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          borderLeft: '4px solid var(--green-500)'
                        }}>
                          <h5 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                            🎯 Intervenção Fisioterapêutica
                          </h5>
                          <ul style={{ color: 'var(--green-700)', lineHeight: '1.5', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                            <li>Alongamento peitoral maior</li>
                            <li>Fortalecimento músculos dorsais</li>
                            <li>Exercícios de consciência postural</li>
                            <li>Técnicas de mobilização costal</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Pectus Excavatum */}
                    <div style={{ 
                      background: 'white',
                      borderRadius: '1rem',
                      padding: '2rem',
                      border: '1px solid var(--indigo-200)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'linear-gradient(145deg, #e0e7ff, #c7d2fe)',
                        borderRadius: '0.75rem'
                      }}>
                        <div style={{ 
                          width: '3rem',
                          height: '3rem',
                          background: 'var(--indigo-500)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          🕳️
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--indigo-800)', margin: 0 }}>
                            Pectus Excavatum (Peito Escavado)
                          </h4>
                          <p style={{ color: 'var(--indigo-700)', fontSize: '0.9rem', margin: 0 }}>
                            Depressão côncava do esterno e cartilagens costais
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ 
                          background: 'linear-gradient(145deg, #fef2f2, #fde8e8)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          borderLeft: '4px solid var(--red-500)'
                        }}>
                          <h5 style={{ color: 'var(--red-800)', fontWeight: '600', marginBottom: '1rem' }}>
                            ⚠️ Comprometimentos Funcionais
                          </h5>
                          <ul style={{ color: 'var(--red-700)', lineHeight: '1.5', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                            <li><strong>Índice de Haller &gt;3.25:</strong> Indicação cirúrgica</li>
                            <li><strong>Compressão cardíaca:</strong> Redução do débito até 20%</li>
                            <li><strong>Restrição pulmonar:</strong> CVF reduzida em 10-15%</li>
                            <li><strong>Limitação ao exercício:</strong> VO₂ máx. diminuído</li>
                          </ul>
                        </div>

                        <div style={{ 
                          background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          borderLeft: '4px solid var(--green-500)'
                        }}>
                          <h5 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '1rem' }}>
                            💪 Protocolo Fisioterapêutico
                          </h5>
                          <ul style={{ color: 'var(--green-700)', lineHeight: '1.5', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                            <li><strong>Pré-cirúrgico:</strong> Condicionamento cardiovascular</li>
                            <li><strong>Pós-cirúrgico:</strong> Mobilização precoce</li>
                            <li><strong>Exercícios específicos:</strong> Push-ups modificados</li>
                            <li><strong>Expansão torácica:</strong> Mobilização ativa-assistida</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Tórax Cifoescoliótico */}
                    <div style={{ 
                      background: 'white',
                      borderRadius: '1rem',
                      padding: '2rem',
                      border: '1px solid var(--rose-200)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'linear-gradient(145deg, #fdf2f8, #fce7f3)',
                        borderRadius: '0.75rem'
                      }}>
                        <div style={{ 
                          width: '3rem',
                          height: '3rem',
                          background: 'var(--rose-500)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          🔄
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--rose-800)', margin: 0 }}>
                            Tórax Cifoescoliótico
                          </h4>
                          <p style={{ color: 'var(--rose-700)', fontSize: '0.9rem', margin: 0 }}>
                            Combinação de cifose e escoliose com deformidade tridimensional
                          </p>
                        </div>
                      </div>

                      <div style={{ 
                        background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--amber-300)',
                        marginBottom: '1.5rem'
                      }}>
                        <h5 style={{ color: 'var(--amber-800)', fontWeight: '600', marginBottom: '1rem' }}>
                          🎯 Caso Clínico Complexo
                        </h5>
                        <div style={{ color: 'var(--amber-800)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                          <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
                            <strong>Paciente:</strong> Feminina, 16 anos, escoliose idiopática com cifose torácica de 65° (Cobb), limitação ventilatória severa.
                          </p>
                          <p style={{ marginBottom: '1rem' }}>
                            <strong>Comprometimentos:</strong> CVF = 45% do predito, assimetria torácica, dor crônica, limitação funcional severa.
                          </p>
                          <p style={{ margin: 0, fontStyle: 'italic' }}>
                            <strong>Protocolo integrado:</strong> Cinesioterapia respiratória + RPG + fortalecimento assimétrico + técnicas de alongamento específicas.
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        <div style={{ background: 'var(--rose-50)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--rose-500)' }}>
                          <h6 style={{ color: 'var(--rose-800)', fontWeight: '600', marginBottom: '0.5rem' }}>Comprometimentos Ventilatórios:</h6>
                          <ul style={{ color: 'var(--rose-700)', fontSize: '0.85rem', paddingLeft: '1rem', lineHeight: '1.4' }}>
                            <li>Padrão restritivo (CVF ↓↓)</li>
                            <li>Ventilação/perfusão alterada</li>
                            <li>Músculos respiratórios encurtados</li>
                          </ul>
                        </div>
                        <div style={{ background: 'var(--green-50)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--green-500)' }}>
                          <h6 style={{ color: 'var(--green-800)', fontWeight: '600', marginBottom: '0.5rem' }}>Intervenções Prioritárias:</h6>
                          <ul style={{ color: 'var(--green-700)', fontSize: '0.85rem', paddingLeft: '1rem', lineHeight: '1.4' }}>
                            <li>Mobilização de coluna torácica</li>
                            <li>Expansão costal assimétrica</li>
                            <li>Fortalecimento do lado côncavo</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Padrão Respiratório */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--blue-300)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--blue-800)', marginBottom: '1.5rem' }}>
                    Padrão Respiratório
                  </h3>
                  <p style={{ color: 'var(--blue-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Definido pelo movimento do compartimento toracoabdominal mais predominante durante o ciclo ventilatório.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[
                      { nome: 'Torácica', desc: 'Predomínio movimento torácico (comum em mulheres)', color: 'var(--pink-500)' },
                      { nome: 'Abdominal', desc: 'Predomínio movimento abdominal (comum em homens)', color: 'var(--blue-500)' },
                      { nome: 'Mista', desc: 'Movimento sincrônico entre tórax e abdômen', color: 'var(--green-500)' },
                      { nome: 'Paradoxal', desc: 'Movimento assincrônico - desconforto agudo', color: 'var(--red-500)' }
                    ].map((padrao, index) => (
                      <div key={index} style={{ 
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: `2px solid ${padrao.color}20`,
                        borderLeft: `4px solid ${padrao.color}`
                      }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: padrao.color, marginBottom: '0.5rem' }}>
                          {padrao.nome}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--gray-700)', margin: 0, lineHeight: '1.5' }}>
                          {padrao.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ritmos Respiratórios */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #fefce8 0%, #fef3c7 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--amber-300)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--amber-800)', marginBottom: '1.5rem' }}>
                    Ritmos Respiratórios Patológicos
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '2px solid var(--red-200)'
                    }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--red-800)', marginBottom: '1rem' }}>
                        Cheyne-Stokes
                      </h4>
                      <p style={{ fontSize: '1rem', color: 'var(--red-700)', lineHeight: '1.6' }}>
                        Fase de apneia seguida por incursões respiratórias rápidas e profundas.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      border: '2px solid var(--orange-200)'
                    }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--orange-800)', marginBottom: '1rem' }}>
                        Biot
                      </h4>
                      <p style={{ fontSize: '1rem', color: 'var(--orange-700)', lineHeight: '1.6' }}>
                        Apneia inicial seguida de inspirações/expirações sem sequência organizada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela de Ruídos Adventícios */}
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
                color: 'var(--purple-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Ausculta Pulmonar - Ruídos Adventícios
              </h2>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--purple-700)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                O processo da ausculta deve ser feito de maneira padronizada, utilizando estetoscópio posicionado diretamente no tórax desnudo, iniciando pela porção posterior e seguindo da parte superior para inferior, sempre bilateral.
              </p>

              <div style={{ overflow: 'auto', borderRadius: '1rem', border: '2px solid var(--purple-200)' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  background: 'white'
                }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                      <th style={{ 
                        padding: '1.5rem', 
                        color: 'white', 
                        fontWeight: '700', 
                        fontSize: '1.1rem',
                        textAlign: 'left',
                        borderRight: '1px solid rgba(255,255,255,0.2)'
                      }}>
                        Ruído
                      </th>
                      <th style={{ 
                        padding: '1.5rem', 
                        color: 'white', 
                        fontWeight: '700', 
                        fontSize: '1.1rem',
                        textAlign: 'left',
                        borderRight: '1px solid rgba(255,255,255,0.2)'
                      }}>
                        Característica
                      </th>
                      <th style={{ 
                        padding: '1.5rem', 
                        color: 'white', 
                        fontWeight: '700', 
                        fontSize: '1.1rem',
                        textAlign: 'left'
                      }}>
                        Significado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ruidosAdventicios.map((ruido, index) => (
                      <tr key={index} style={{ 
                        borderBottom: index < ruidosAdventicios.length - 1 ? '1px solid var(--purple-100)' : 'none',
                        background: index % 2 === 0 ? 'var(--purple-25)' : 'white'
                      }}>
                        <td style={{ 
                          padding: '1.5rem', 
                          fontWeight: '600', 
                          color: 'var(--purple-800)',
                          borderRight: '1px solid var(--purple-100)',
                          fontSize: '1rem'
                        }}>
                          {ruido.ruido}
                        </td>
                        <td style={{ 
                          padding: '1.5rem', 
                          color: 'var(--purple-700)',
                          borderRight: '1px solid var(--purple-100)',
                          fontSize: '0.95rem',
                          lineHeight: '1.6'
                        }}>
                          {ruido.caracteristica}
                        </td>
                        <td style={{ 
                          padding: '1.5rem', 
                          color: 'var(--purple-700)',
                          fontSize: '0.95rem',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-line'
                        }}>
                          {ruido.significado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ 
                background: 'linear-gradient(145deg, #faf5ff 0%, #f3e8ff 100%)',
                borderRadius: '1rem',
                padding: '2rem',
                marginTop: '2rem',
                border: '1px solid var(--purple-200)'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: 'var(--purple-800)', 
                  marginBottom: '1rem'
                }}>
                  Documentação no Prontuário
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.7', 
                  color: 'var(--purple-700)',
                  margin: 0
                }}>
                  <strong>Exemplo:</strong> "Sons pulmonares reduzidos no terço inferior de ambos os hemitórax e com presença de roncos no terço médio do hemitórax direito."
                </p>
              </div>
            </div>

            {/* Monitorização Respiratória */}
            <div style={{ 
              background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--sky-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--sky-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Monitorização Respiratória
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--sky-700)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                A monitorização respiratória é fundamental durante todo o processo de internação, pois mesmo pessoas sem distúrbios respiratórios podem desenvolvê-los por restrição ao leito e exposição ao risco biológico.
              </p>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Força Muscular Respiratória */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--cyan-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--cyan-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Gauge className="w-6 h-6" />
                    Força Muscular Respiratória - Manovacuometria
                  </h3>
                  <p style={{ color: 'var(--cyan-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Teste que determina a Pressão Inspiratória Máxima (PImax) e Pressão Expiratória Máxima (PEmax). Fornece informações sobre necessidade de intubação e capacidade de desmame ventilatório.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'var(--cyan-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--cyan-200)'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--cyan-800)', marginBottom: '0.5rem' }}>
                        PImax &gt; 30 cmH₂O
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--cyan-700)' }}>
                        Associado ao sucesso no desmame ventilatório invasivo
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--red-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--red-200)'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--red-800)', marginBottom: '0.5rem' }}>
                        Contraindicação
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--red-700)' }}>
                        Instabilidade hemodinâmica e respiratória
                      </p>
                    </div>
                  </div>
                </div>

                {/* Volume Corrente e Volume Minuto */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--blue-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--blue-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Wind className="w-6 h-6" />
                    Volume Corrente e Volume Minuto - Ventilometria
                  </h3>
                  <p style={{ color: 'var(--blue-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Paciente posicionado sentado, conectar ventilômetro na cânula orotraqueal ou boca, respiração tranquila durante um minuto.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'var(--blue-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--blue-800)', marginBottom: '0.5rem' }}>
                        Volume Corrente
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--blue-700)' }}>
                        5-8 ml/kg de peso
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--blue-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--blue-800)', marginBottom: '0.5rem' }}>
                        Volume Minuto
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--blue-700)' }}>
                        5-6 L/min
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--green-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--green-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--green-800)', marginBottom: '0.5rem' }}>
                        Cálculo
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--green-700)' }}>
                        VC = VM ÷ FR
                      </p>
                    </div>
                  </div>
                </div>

                {/* Oxigenação */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--green-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--green-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Heart className="w-6 h-6" />
                    Oxigenação - SpO₂
                  </h3>
                  <p style={{ color: 'var(--green-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Monitorização não invasiva através de oxímetro de pulso. Verifica saturação periférica de oxigênio.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'var(--green-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--green-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--green-800)', marginBottom: '0.5rem' }}>
                        Normal
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--green-700)' }}>
                        SpO₂ &gt; 95%
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--red-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--red-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--red-800)', marginBottom: '0.5rem' }}>
                        Limitações
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--red-700)' }}>
                        Periferia fria, excesso de luz
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ventilação - Capnografia */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--purple-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--purple-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Activity className="w-6 h-6" />
                    Ventilação - Capnografia
                  </h3>
                  <p style={{ color: 'var(--purple-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                    Método não invasivo para detectar CO₂ exalado, representando a concentração do CO₂ alveolar. Sensor instalado no circuito do ventilador.
                  </p>
                  
                  <div style={{ 
                    background: 'var(--purple-50)', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    border: '1px solid var(--purple-200)'
                  }}>
                    <p style={{ fontSize: '1rem', color: 'var(--purple-700)', margin: 0 }}>
                      <strong style={{ color: 'var(--purple-800)' }}>Vantagem:</strong> Apresenta diferença discreta com gasometria arterial, garantindo confiança de uso.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitorização Hemodinâmica */}
            <div style={{ 
              background: 'linear-gradient(145deg, #fef2f2 0%, #fde8e8 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--red-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--red-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Monitorização Hemodinâmica
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--red-700)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Fundamental para garantir que a função cardiovascular esteja corretamente mantida. O termo "hemodinâmica" reflete a função circulatória do sangue nos vasos sanguíneos.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--red-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--red-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Heart className="w-6 h-6" />
                    Pressão Venosa Central (PVC)
                  </h3>
                  <p style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Cateter venoso central introduzido no átrio direito para estimar o valor da pré-carga do ventrículo direito.
                  </p>
                  
                  <div style={{ 
                    background: 'var(--red-50)', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    border: '1px solid var(--red-200)',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--red-800)', marginBottom: '0.5rem' }}>
                      Valores Normais
                    </h4>
                    <p style={{ fontSize: '1.1rem', color: 'var(--red-700)', fontWeight: '600' }}>
                      2 - 11 cmH₂O
                    </p>
                  </div>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--pink-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--pink-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Monitor className="w-6 h-6" />
                    Cateter de Swan Ganz
                  </h3>
                  <p style={{ color: 'var(--pink-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Cateter de artéria pulmonar com três vias que transmitem informações simultâneas para monitor.
                  </p>
                  
                  <div style={{ 
                    background: 'var(--pink-50)', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    border: '1px solid var(--pink-200)'
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--pink-800)', marginBottom: '1rem' }}>
                      Variáveis Identificadas:
                    </h4>
                    <ul style={{ color: 'var(--pink-700)', fontSize: '0.95rem', paddingLeft: '1.5rem', margin: 0 }}>
                      <li>Débito cardíaco</li>
                      <li>Pressão venosa central</li>
                      <li>Resistência vascular</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitorização Neurológica */}
            <div style={{ 
              background: 'linear-gradient(145deg, #faf5ff 0%, #f3e8ff 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--purple-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--purple-800)', 
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Monitorização Neurológica
              </h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Escala de Glasgow */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--indigo-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--indigo-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Brain className="w-6 h-6" />
                    Escala de Glasgow
                  </h3>
                  <p style={{ color: 'var(--indigo-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Avalia nível de consciência em indivíduos que não estejam utilizando drogas sedativas. Muito utilizada no atendimento pré-hospitalar.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'var(--indigo-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--indigo-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--indigo-800)', marginBottom: '0.5rem' }}>
                        Abertura Ocular
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--indigo-700)' }}>
                        4 pontos máximo
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--indigo-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--indigo-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--indigo-800)', marginBottom: '0.5rem' }}>
                        Resposta Verbal
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--indigo-700)' }}>
                        5 pontos máximo
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--indigo-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--indigo-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--indigo-800)', marginBottom: '0.5rem' }}>
                        Resposta Motora
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--indigo-700)' }}>
                        6 pontos máximo
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: 'var(--red-50)', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    border: '1px solid var(--red-200)',
                    marginTop: '1rem',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '1rem', color: 'var(--red-700)', margin: 0 }}>
                      <strong style={{ color: 'var(--red-800)' }}>Importante:</strong> Máximo 15 pontos. Valores &lt; 8 → considerar intubação
                    </p>
                  </div>
                </div>

                {/* Escala de Ramsay */}
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--violet-200)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--violet-800)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Activity className="w-6 h-6" />
                    Escala de Ramsay
                  </h3>
                  <p style={{ color: 'var(--violet-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    Avalia nível de consciência em pacientes que fazem uso de sedativos. Seis níveis de avaliação.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'var(--red-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--red-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--red-800)', marginBottom: '0.5rem' }}>
                        Nível 1
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--red-700)' }}>
                        Paciente agitado
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--blue-50)', 
                      padding: '1.5rem', 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--blue-200)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--blue-800)', marginBottom: '0.5rem' }}>
                        Nível 6
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--blue-700)' }}>
                        Sem resposta aos estímulos
                      </p>
                    </div>
                  </div>
                </div>

                {/* PIC e Pupilas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  <div style={{ 
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--orange-200)'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--orange-800)', 
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <Gauge className="w-6 h-6" />
                      Pressão Intracraniana (PIC)
                    </h3>
                    <p style={{ color: 'var(--orange-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                      Monitorada por cateter intraventricular. Paciente com cabeceira elevada 30-45° e cabeça na linha média.
                    </p>
                    
                    <div style={{ 
                      background: 'var(--orange-50)', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--orange-200)',
                      marginBottom: '1rem'
                    }}>
                      <p style={{ fontSize: '0.95rem', color: 'var(--orange-700)', margin: 0 }}>
                        <strong>Normal:</strong> &lt; 10 mmHg
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--red-50)', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--red-200)'
                    }}>
                      <p style={{ fontSize: '0.95rem', color: 'var(--red-700)', margin: 0 }}>
                        <strong>Contraindicação Fisioterapia:</strong> PIC &gt; 20 mmHg
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--emerald-200)'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '700', 
                      color: 'var(--emerald-800)', 
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <Eye className="w-6 h-6" />
                      Avaliação das Pupilas
                    </h3>
                    <p style={{ color: 'var(--emerald-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                      Resposta pupilar reflete funcionamento do sistema nervoso.
                    </p>
                    
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <div style={{ 
                        background: 'var(--green-50)', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid var(--green-200)'
                      }}>
                        <strong style={{ color: 'var(--green-800)' }}>Isocóricas:</strong>
                        <span style={{ color: 'var(--green-700)', marginLeft: '0.5rem' }}>Reação normal à luz</span>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--yellow-50)', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid var(--yellow-200)'
                      }}>
                        <strong style={{ color: 'var(--yellow-800)' }}>Miótica:</strong>
                        <span style={{ color: 'var(--yellow-700)', marginLeft: '0.5rem' }}>Ambas contraídas</span>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--orange-50)', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid var(--orange-200)'
                      }}>
                        <strong style={{ color: 'var(--orange-800)' }}>Anisocórica:</strong>
                        <span style={{ color: 'var(--orange-700)', marginLeft: '0.5rem' }}>Assimétricas</span>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--red-50)', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid var(--red-200)'
                      }}>
                        <strong style={{ color: 'var(--red-800)' }}>Midríatica:</strong>
                        <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>Ambas dilatadas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão de Retorno */}
            <div style={{ textAlign: 'center' }}>
              <Link
                to="/unidade-hospitalar"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-lg)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'var(--shadow-lg)';
                }}
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para Módulos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AvaliacaoUTI;
