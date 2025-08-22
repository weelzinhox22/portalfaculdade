import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Thermometer, Activity, Wind, Eye, Brain, Stethoscope, Monitor, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

const AvaliacaoUTI = () => {
  const [animateVitals, setAnimateVitals] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger animation after component mounts
    setTimeout(() => setAnimateVitals(true), 1000);
  }, []);

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
                Pontos importantes a serem observados no ambiente hospitalar:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {[
                  'Está em respiração espontânea ou necessita de suporte ventilatório?',
                  'Se faz uso de suporte ventilatório, é invasivo ou não invasivo?',
                  'Utiliza recurso de administração de oxigênio?',
                  'Faz uso de cateter central, periférico, sonda nasogástrica, vesical?',
                  'Está corado?',
                  'Como está sua expressão facial?',
                  'Tem alguma incisão cirúrgica recente?',
                  'Apresenta sinais de desconforto respiratório?',
                  'Está orientado no tempo e no espaço?'
                ].map((item, index) => (
                  <div key={index} style={{ 
                    background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--slate-200)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <div style={{ 
                      width: '1.5rem', 
                      height: '1.5rem', 
                      background: 'var(--blue-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      flexShrink: 0,
                      marginTop: '0.1rem'
                    }}>
                      {index + 1}
                    </div>
                    <p style={{ 
                      color: 'var(--slate-700)', 
                      fontSize: '1rem', 
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
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
                      <p style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                        A oscilação da temperatura corporal pode gerar danos celulares e metabólicos. 
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minMax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem' }}>
                          <strong style={{ color: 'var(--red-800)' }}>Hipertermia:</strong>
                          <span style={{ color: 'var(--red-700)' }}> &gt;37,8°C</span>
                        </div>
                        <div style={{ background: 'var(--blue-50)', padding: '1rem', borderRadius: '0.5rem' }}>
                          <strong style={{ color: 'var(--blue-800)' }}>Hipotermia:</strong>
                          <span style={{ color: 'var(--blue-700)' }}> &lt;35°C</span>
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
                    Tipos de Tórax
                  </h3>
                  <p style={{ color: 'var(--emerald-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    A configuração torácica se modifica frente a situações crônicas que levam ao aumento do aprisionamento aéreo, bem como nas condições ortopédicas da coluna vertebral.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[
                      { nome: 'Tonel', desc: 'Aumento do diâmetro anteroposterior' },
                      { nome: 'Pectus Carinatum', desc: 'Protusão esternal' },
                      { nome: 'Pectus Excavatum', desc: 'Depressão esternal' },
                      { nome: 'Cifoescoliótico', desc: 'Associação de cifose e escoliose' }
                    ].map((tipo, index) => (
                      <div key={index} style={{ 
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--emerald-200)',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--emerald-800)', marginBottom: '0.5rem' }}>
                          {tipo.nome}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--emerald-700)', margin: 0 }}>
                          {tipo.desc}
                        </p>
                      </div>
                    ))}
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
