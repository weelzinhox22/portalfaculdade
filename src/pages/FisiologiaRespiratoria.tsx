import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './FisiologiaRespiratoria.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

interface LungVolume {
  name: string;
  value: number;
  color: string;
  description: string;
}

interface RespiratoryCase {
  id: number;
  title: string;
  description: string;
  symptoms: string[];
  diagnosis: string;
  explanation: string;
  treatment: string[];
}

const FisiologiaRespiratoria: React.FC = () => {
  const [activeTab, setActiveTab] = useState('volumes');
  const [tidalVolume, setTidalVolume] = useState(500);
  const [respiratoryRate, setRespiratoryRate] = useState(12);
  const [vitalCapacity, setVitalCapacity] = useState(4800);
  const [currentCase, setCurrentCase] = useState<RespiratoryCase | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setCorrect] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const chartRef = useRef<ChartJS<'bar'> | null>(null);

  // Volumes pulmonares padrão (ml)
  const lungVolumes: LungVolume[] = [
    { name: 'Volume Residual', value: 1200, color: '#FF6B6B', description: 'Volume que permanece nos pulmões após expiração máxima' },
    { name: 'Volume de Reserva Expiratória', value: 1200, color: '#4ECDC4', description: 'Volume adicional que pode ser expirado após expiração normal' },
    { name: 'Volume Corrente', value: 500, color: '#45B7D1', description: 'Volume inspirado e expirado durante respiração normal' },
    { name: 'Volume de Reserva Inspiratória', value: 3100, color: '#96CEB4', description: 'Volume adicional que pode ser inspirado após inspiração normal' }
  ];

  // Casos clínicos respiratórios
  const respiratoryCases: RespiratoryCase[] = [
    {
      id: 1,
      title: "Paciente com Dispneia aos Esforços",
      description: "Paciente de 65 anos, ex-fumante, apresenta dispneia progressiva há 2 anos. Relata tosse matinal e cansaço fácil.",
      symptoms: ["Dispneia aos esforços", "Tosse matinal", "Cansaço fácil", "Sibilos"],
      diagnosis: "DPOC (Doença Pulmonar Obstrutiva Crônica)",
      explanation: "Sintomas típicos de DPOC com história de tabagismo. Dispneia progressiva e tosse matinal são características da doença.",
      treatment: ["Broncodilatadores", "Corticoides inalatórios", "Reabilitação pulmonar", "Cessação do tabagismo"]
    },
    {
      id: 2,
      title: "Paciente com Dor Torácica Aguda",
      description: "Paciente de 45 anos, obeso, apresenta dor torácica aguda há 2 horas, associada a dispneia e sudorese.",
      symptoms: ["Dor torácica aguda", "Dispneia", "Sudorese", "Ansiedade"],
      diagnosis: "Síndrome Coronariana Aguda",
      explanation: "Dor torácica aguda com sintomas associados sugere isquemia miocárdica. Obesidade é fator de risco cardiovascular.",
      treatment: ["Avaliação cardiológica imediata", "ECG", "Enzimas cardíacas", "Tratamento anti-isquêmico"]
    },
    {
      id: 3,
      title: "Paciente com Febre e Tosse Produtiva",
      description: "Paciente de 28 anos, previamente saudável, apresenta febre alta, tosse produtiva e dispneia há 3 dias.",
      symptoms: ["Febre alta", "Tosse produtiva", "Dispneia", "Dor torácica pleurítica"],
      diagnosis: "Pneumonia Comunitária",
      explanation: "Sintomas típicos de infecção respiratória baixa. Febre, tosse produtiva e dispneia sugerem pneumonia.",
      treatment: ["Antibioticoterapia", "Hidratação", "Fisioterapia respiratória", "Acompanhamento clínico"]
    },
    {
      id: 4,
      title: "Paciente com Dispneia Paroxística Noturna",
      description: "Paciente de 72 anos, hipertenso, acorda à noite com dispneia e tosse. Relata edema em membros inferiores.",
      symptoms: ["Dispneia paroxística noturna", "Tosse noturna", "Edema em membros inferiores", "Ortopneia"],
      diagnosis: "Insuficiência Cardíaca",
      explanation: "Dispneia paroxística noturna é característica de insuficiência cardíaca. Edema sugere retenção hídrica.",
      treatment: ["Diuréticos", "Inibidores da ECA", "Beta-bloqueadores", "Restrição de sal"]
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const selectCase = (caseId: number) => {
    const selectedCase = respiratoryCases.find(c => c.id === caseId);
    setCurrentCase(selectedCase || null);
    setSelectedDiagnosis('');
    setShowFeedback(false);
    setCorrect(false);
  };

  const checkDiagnosis = () => {
    if (!currentCase) return;
    
    const correct = selectedDiagnosis === currentCase.diagnosis;
    setCorrect(correct);
    setShowFeedback(true);
  };

  const calculateTotalLungCapacity = () => {
    return lungVolumes.reduce((total, volume) => total + volume.value, 0);
  };

  const calculateMinuteVentilation = () => {
    return tidalVolume * respiratoryRate;
  };

  const calculateAlveolarVentilation = () => {
    const deadSpace = 150; // ml (espaço morto anatômico)
    return (tidalVolume - deadSpace) * respiratoryRate;
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [tidalVolume, respiratoryRate, vitalCapacity]);

  const volumeChartData = {
    labels: lungVolumes.map(v => v.name),
    datasets: [
      {
        label: 'Volumes Pulmonares (ml)',
        data: lungVolumes.map(v => v.value),
        backgroundColor: lungVolumes.map(v => v.color),
        borderColor: lungVolumes.map(v => v.color),
        borderWidth: 2
      }
    ]
  };

  const spirometryData = {
    labels: ['0s', '1s', '2s', '3s', '4s', '5s', '6s'],
    datasets: [
      {
        label: 'Volume Expiratório Forçado',
        data: [vitalCapacity, vitalCapacity * 0.83, vitalCapacity * 0.95, vitalCapacity * 0.98, vitalCapacity * 0.99, vitalCapacity, vitalCapacity],
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const volumeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Volumes Pulmonares'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Volume (ml)'
        }
      }
    }
  };

  const spirometryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Espirometria - Volume Expiratório Forçado'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Volume (ml)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tempo (segundos)'
        }
      }
    }
  };

  return (
    <div className="respiratory-page">
      <header className="respiratory-header">
        <nav className="respiratory-nav">
          <div className="respiratory-nav-content">
            <div className="respiratory-logo">Fisiologia Respiratória Interativa</div>
            <div className="respiratory-nav-links">
              <button 
                className={`respiratory-nav-link ${activeTab === 'volumes' ? 'active' : ''}`}
                onClick={() => setActiveTab('volumes')}
              >
                Volumes Pulmonares
              </button>
              <button 
                className={`respiratory-nav-link ${activeTab === 'ventilacao' ? 'active' : ''}`}
                onClick={() => setActiveTab('ventilacao')}
              >
                Ventilação
              </button>
              <button 
                className={`respiratory-nav-link ${activeTab === 'casos' ? 'active' : ''}`}
                onClick={() => setActiveTab('casos')}
              >
                Casos Clínicos
              </button>
              <button 
                className={`respiratory-nav-link ${activeTab === 'espirometria' ? 'active' : ''}`}
                onClick={() => setActiveTab('espirometria')}
              >
                Espirometria
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="respiratory-main">
        <div className="respiratory-container">
          {/* Seção de Volumes Pulmonares */}
          {activeTab === 'volumes' && (
            <section className="respiratory-section">
              <h1 className="respiratory-section-title">Volumes e Capacidades Pulmonares</h1>
              <p className="respiratory-section-subtitle">
                Compreenda os diferentes volumes de ar nos pulmões e como eles se relacionam
              </p>

              <div className="respiratory-volumes-grid">
                <div className="respiratory-chart-container">
                  <Bar data={volumeChartData} options={volumeChartOptions} ref={chartRef} />
                </div>

                <div className="respiratory-volumes-info">
                  <h3>Informações dos Volumes</h3>
                  {lungVolumes.map((volume, index) => (
                    <div key={index} className="respiratory-volume-item">
                      <div 
                        className="respiratory-volume-color" 
                        style={{ backgroundColor: volume.color }}
                      ></div>
                      <div className="respiratory-volume-details">
                        <strong>{volume.name}:</strong> {volume.value} ml
                        <p className="respiratory-volume-description">{volume.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="respiratory-capacity-calculations">
                    <h4>Capacidades Calculadas</h4>
                    <div className="respiratory-capacity-item">
                      <strong>Capacidade Vital:</strong> {vitalCapacity} ml
                    </div>
                    <div className="respiratory-capacity-item">
                      <strong>Capacidade Pulmonar Total:</strong> {calculateTotalLungCapacity()} ml
                    </div>
                    <div className="respiratory-capacity-item">
                      <strong>Capacidade Inspiratória:</strong> {lungVolumes[3].value + lungVolumes[2].value} ml
                    </div>
                    <div className="respiratory-capacity-item">
                      <strong>Capacidade Residual Funcional:</strong> {lungVolumes[0].value + lungVolumes[1].value} ml
                    </div>
                  </div>
                </div>
              </div>

              <div className="respiratory-educational-content">
                <h3>Conceitos Importantes</h3>
                <div className="respiratory-concept-grid">
                  <div className="respiratory-concept-card">
                    <h4>Volume Corrente (VT)</h4>
                    <p>Volume de ar inspirado e expirado durante cada ciclo respiratório normal. Em adultos saudáveis, é aproximadamente 500ml.</p>
                  </div>
                  <div className="respiratory-concept-card">
                    <h4>Capacidade Vital (CV)</h4>
                    <p>Volume máximo de ar que pode ser expirado após uma inspiração máxima. É um importante indicador da função pulmonar.</p>
                  </div>
                  <div className="respiratory-concept-card">
                    <h4>Volume Residual (VR)</h4>
                    <p>Volume de ar que permanece nos pulmões após uma expiração máxima. Não pode ser expirado voluntariamente.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Seção de Ventilação */}
          {activeTab === 'ventilacao' && (
            <section className="respiratory-section">
              <h2 className="respiratory-section-title">Ventilação Pulmonar</h2>
              <p className="respiratory-section-subtitle">
                Ajuste os parâmetros e veja como afetam a ventilação
              </p>

              <div className="respiratory-ventilation-simulator">
                <div className="respiratory-simulator-controls">
                  <h3>Controles do Simulador</h3>
                  
                  <div className="respiratory-control-group">
                    <label>
                      Volume Corrente (ml): <span className="respiratory-value">{tidalVolume}</span>
                    </label>
                    <input
                      type="range"
                      min="300"
                      max="1000"
                      step="50"
                      value={tidalVolume}
                      onChange={(e) => setTidalVolume(parseInt(e.target.value))}
                      className="respiratory-slider"
                    />
                  </div>

                  <div className="respiratory-control-group">
                    <label>
                      Frequência Respiratória (rpm): <span className="respiratory-value">{respiratoryRate}</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="25"
                      step="1"
                      value={respiratoryRate}
                      onChange={(e) => setRespiratoryRate(parseInt(e.target.value))}
                      className="respiratory-slider"
                    />
                  </div>
                </div>

                <div className="respiratory-ventilation-results">
                  <h3>Resultados da Ventilação</h3>
                  
                  <div className="respiratory-results-grid">
                    <div className="respiratory-result-card">
                      <h4>Ventilação Minuta</h4>
                      <div className="respiratory-result-value">{calculateMinuteVentilation()} ml/min</div>
                      <p>Volume total de ar movimentado por minuto</p>
                    </div>
                    
                    <div className="respiratory-result-card">
                      <h4>Ventilação Alveolar</h4>
                      <div className="respiratory-result-value">{calculateAlveolarVentilation()} ml/min</div>
                      <p>Volume de ar que chega aos alvéolos por minuto</p>
                    </div>
                    
                    <div className="respiratory-result-card">
                      <h4>Eficiência Ventilatória</h4>
                      <div className="respiratory-result-value">
                        {((calculateAlveolarVentilation() / calculateMinuteVentilation()) * 100).toFixed(1)}%
                      </div>
                      <p>Porcentagem do ar que chega aos alvéolos</p>
                    </div>
                  </div>

                  <div className="respiratory-ventilation-chart">
                    <h4>Comparação com Valores Normais</h4>
                    <Bar 
                      data={{
                        labels: ['Ventilação Minuta', 'Ventilação Alveolar'],
                        datasets: [
                          {
                            label: 'Valores Atuais',
                            data: [calculateMinuteVentilation(), calculateAlveolarVentilation()],
                            backgroundColor: ['#4ECDC4', '#45B7D1']
                          },
                          {
                            label: 'Valores Normais',
                            data: [6000, 4200],
                            backgroundColor: ['rgba(78, 205, 196, 0.5)', 'rgba(69, 183, 209, 0.5)']
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: { display: true, text: 'ml/min' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Seção de Casos Clínicos */}
          {activeTab === 'casos' && (
            <section className="respiratory-section">
              <h2 className="respiratory-section-title">Casos Clínicos Respiratórios</h2>
              <p className="respiratory-section-subtitle">
                Teste seus conhecimentos com casos clínicos reais
              </p>

              <div className="respiratory-cases-grid">
                {respiratoryCases.map((caseItem) => (
                  <div 
                    key={caseItem.id} 
                    className={`respiratory-case-card ${currentCase?.id === caseItem.id ? 'selected' : ''}`}
                    onClick={() => selectCase(caseItem.id)}
                  >
                    <h3>{caseItem.title}</h3>
                    <p>{caseItem.description}</p>
                    <div className="respiratory-case-symptoms">
                      <strong>Sintomas:</strong>
                      <ul>
                        {caseItem.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {currentCase && (
                <div className="respiratory-case-diagnosis">
                  <h3>Diagnóstico do Caso</h3>
                  <p><strong>Caso:</strong> {currentCase.title}</p>
                  
                  <div className="respiratory-diagnosis-options">
                    <h4>Qual é o diagnóstico mais provável?</h4>
                    {respiratoryCases.map((caseItem) => (
                      <button
                        key={caseItem.id}
                        className={`respiratory-diagnosis-option ${selectedDiagnosis === caseItem.diagnosis ? 'selected' : ''}`}
                        onClick={() => setSelectedDiagnosis(caseItem.diagnosis)}
                      >
                        {caseItem.diagnosis}
                      </button>
                    ))}
                  </div>

                  {selectedDiagnosis && (
                    <button 
                      className="respiratory-check-button"
                      onClick={checkDiagnosis}
                    >
                      Verificar Resposta
                    </button>
                  )}

                  {showFeedback && (
                    <div className={`respiratory-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <h4>{isCorrect ? '✅ Correto!' : '❌ Incorreto!'}</h4>
                      <p><strong>Diagnóstico:</strong> {currentCase.diagnosis}</p>
                      <p><strong>Explicação:</strong> {currentCase.explanation}</p>
                      <div className="respiratory-treatment">
                        <strong>Tratamento:</strong>
                        <ul>
                          {currentCase.treatment.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Seção de Espirometria */}
          {activeTab === 'espirometria' && (
            <section className="respiratory-section">
              <h2 className="respiratory-section-title">Espirometria Interativa</h2>
              <p className="respiratory-section-subtitle">
                Compreenda os testes de função pulmonar
              </p>

              <div className="respiratory-spirometry-container">
                <div className="respiratory-spirometry-chart">
                  <Line data={spirometryData} options={spirometryOptions} />
                </div>

                <div className="respiratory-spirometry-controls">
                  <h3>Controles da Espirometria</h3>
                  
                  <div className="respiratory-control-group">
                    <label>
                      Capacidade Vital (ml): <span className="respiratory-value">{vitalCapacity}</span>
                    </label>
                    <input
                      type="range"
                      min="2000"
                      max="6000"
                      step="100"
                      value={vitalCapacity}
                      onChange={(e) => setVitalCapacity(parseInt(e.target.value))}
                      className="respiratory-slider"
                    />
                  </div>

                  <div className="respiratory-spirometry-info">
                    <h4>Interpretação da Espirometria</h4>
                    <div className="respiratory-spirometry-values">
                      <div className="respiratory-spirometry-value">
                        <strong>CVF:</strong> {vitalCapacity} ml
                      </div>
                      <div className="respiratory-spirometry-value">
                        <strong>VEF1:</strong> {(vitalCapacity * 0.83).toFixed(0)} ml
                      </div>
                      <div className="respiratory-spirometry-value">
                        <strong>VEF1/CVF:</strong> {((vitalCapacity * 0.83) / vitalCapacity * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="respiratory-spirometry-interpretation">
                      <h5>Interpretação:</h5>
                      <p>
                        {((vitalCapacity * 0.83) / vitalCapacity * 100) >= 80 
                          ? '✅ Função pulmonar normal - VEF1/CVF ≥ 80%'
                          : '⚠️ Possível obstrução das vias aéreas - VEF1/CVF < 80%'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="respiratory-educational-content">
                <h3>Conceitos da Espirometria</h3>
                <div className="respiratory-concept-grid">
                  <div className="respiratory-concept-card">
                    <h4>CVF (Capacidade Vital Forçada)</h4>
                    <p>Volume máximo de ar que pode ser expirado forçadamente após uma inspiração máxima.</p>
                  </div>
                  <div className="respiratory-concept-card">
                    <h4>VEF1 (Volume Expiratório Forçado no 1º segundo)</h4>
                    <p>Volume de ar expirado no primeiro segundo de uma expiração forçada máxima.</p>
                  </div>
                  <div className="respiratory-concept-card">
                    <h4>VEF1/CVF</h4>
                    <p>Relação entre VEF1 e CVF. Valores ≥ 80% indicam função pulmonar normal.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Seção de Conceitos Fundamentais */}
          <section className="respiratory-section">
            <h2 className="respiratory-section-title">Conceitos Fundamentais</h2>
            <p className="respiratory-section-subtitle">
              Aprenda os princípios básicos da fisiologia respiratória
            </p>

            <div className="respiratory-accordion">
              <div className="respiratory-accordion-item">
                <button 
                  className="respiratory-accordion-button"
                  onClick={() => toggleAccordion(0)}
                >
                  <span>Mecânica Ventilatória</span>
                  <span className={`respiratory-accordion-arrow ${activeAccordion === 0 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`respiratory-accordion-content ${activeAccordion === 0 ? 'expanded' : 'collapsed'}`}>
                  <div className="respiratory-accordion-text">
                    <strong>Inspiração:</strong> Contração do diafragma e músculos intercostais externos → Aumento do volume torácico → Diminuição da pressão intrapulmonar → Entrada de ar<br/>
                    <strong>Expiração:</strong> Relaxamento dos músculos → Diminuição do volume torácico → Aumento da pressão intrapulmonar → Saída de ar
                  </div>
                </div>
              </div>

              <div className="respiratory-accordion-item">
                <button 
                  className="respiratory-accordion-button"
                  onClick={() => toggleAccordion(1)}
                >
                  <span>Trocas Gasosas</span>
                  <span className={`respiratory-accordion-arrow ${activeAccordion === 1 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`respiratory-accordion-content ${activeAccordion === 1 ? 'expanded' : 'collapsed'}`}>
                  <div className="respiratory-accordion-text">
                    <strong>Difusão:</strong> O2 e CO2 se movem por difusão através da membrana alvéolo-capilar<br/>
                    <strong>Fatores que afetam:</strong> Espessura da membrana, área de superfície, gradiente de pressão, solubilidade dos gases
                  </div>
                </div>
              </div>

              <div className="respiratory-accordion-item">
                <button 
                  className="respiratory-accordion-button"
                  onClick={() => toggleAccordion(2)}
                >
                  <span>Controle da Ventilação</span>
                  <span className={`respiratory-accordion-arrow ${activeAccordion === 2 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`respiratory-accordion-content ${activeAccordion === 2 ? 'expanded' : 'collapsed'}`}>
                  <div className="respiratory-accordion-text">
                    <strong>Centro Respiratório:</strong> Localizado no bulbo e ponte<br/>
                    <strong>Quimiorreceptores:</strong> Sensíveis a alterações de O2, CO2 e pH<br/>
                    <strong>Mecanorreceptores:</strong> Sensíveis ao estiramento pulmonar
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="respiratory-footer">
        <div className="respiratory-footer-content">
          <p>© 2025 Portal de Fisioterapia - Fisiologia Respiratória Interativa</p>
        </div>
      </footer>
    </div>
  );
};

export default FisiologiaRespiratoria;
