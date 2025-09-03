import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './GasometriaArterial.css';
import { GeminiService } from '../services/geminiService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CaseData {
  patientHistory: string;
  ph: number;
  pco2: number;
  hco3: number;
  be: number;
}

interface ClinicalCase {
  id: number;
  title: string;
  description: string;
  ph: number;
  pco2: number;
  hco3: number;
  be: number;
  correctAnswer: string;
  explanation: string;
}

const GasometriaArterial: React.FC = () => {
  const [ph, setPh] = useState(7.40);
  const [pco2, setPco2] = useState(40);
  const [hco3, setHco3] = useState(24);
  const [primaryDisorder, setPrimaryDisorder] = useState('Equilíbrio Ácido-Base Normal');
  const [compensationStatus, setCompensationStatus] = useState('Sem distúrbio primário');
  const [currentCase, setCurrentCase] = useState<ClinicalCase | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [componentInfo, setComponentInfo] = useState<{[key: string]: string}>({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string} | null>(null);
  const chartRef = useRef<ChartJS<'bar'> | null>(null);

  // Casos clínicos pré-definidos expandidos com mais variedade
  const clinicalCases: ClinicalCase[] = [
    // CASOS RESPIRATÓRIOS
    {
      id: 1,
      title: "Caso 1: Paciente com DPOC Exacerbado",
      description: "Paciente de 65 anos com DPOC há 10 anos, apresenta dispneia e tosse produtiva há 3 dias. Gasometria arterial revela:",
      ph: 7.32,
      pco2: 55,
      hco3: 28,
      be: 2,
      correctAnswer: "Acidose Respiratória Compensada",
      explanation: "pH baixo (7.32) indica acidemia. PCO2 alto (55) indica componente respiratório. HCO3 elevado (28) indica compensação renal. BE positivo (2) confirma compensação."
    },
    {
      id: 2,
      title: "Caso 2: Paciente com DPOC Agudo",
      description: "Paciente de 58 anos com DPOC, internado por agudização. Apresenta dispneia severa e cianose. Gasometria arterial revela:",
      ph: 7.25,
      pco2: 68,
      hco3: 24,
      be: -1,
      correctAnswer: "Acidose Respiratória",
      explanation: "pH muito baixo (7.25) indica acidemia severa. PCO2 muito alto (68) indica componente respiratório agudo. HCO3 normal (24) indica ausência de compensação renal."
    },
    {
      id: 3,
      title: "Caso 3: Paciente com Ansiedade e Hiperventilação",
      description: "Paciente de 32 anos com crise de ansiedade, apresenta hiperventilação e parestesias. Gasometria arterial revela:",
      ph: 7.48,
      pco2: 28,
      hco3: 22,
      be: -2,
      correctAnswer: "Alcalose Respiratória",
      explanation: "pH alto (7.48) indica alcalemia. PCO2 baixo (28) indica componente respiratório. HCO3 normal (22) e BE ligeiramente negativo (-2) indicam compensação renal inicial."
    },
    {
      id: 4,
      title: "Caso 4: Paciente com Sepse e Hiperventilação",
      description: "Paciente de 45 anos com sepse, apresenta taquipneia e febre. Gasometria arterial revela:",
      ph: 7.52,
      pco2: 25,
      hco3: 20,
      be: -4,
      correctAnswer: "Alcalose Respiratória Compensada",
      explanation: "pH alto (7.52) indica alcalemia. PCO2 baixo (25) indica componente respiratório. HCO3 baixo (20) e BE negativo (-4) indicam compensação renal."
    },

    // CASOS METABÓLICOS
    {
      id: 5,
      title: "Caso 5: Paciente com Vômitos Persistentes",
      description: "Paciente de 28 anos com vômitos persistentes há 3 dias, apresenta fraqueza e cãibras. Gasometria arterial revela:",
      ph: 7.52,
      pco2: 38,
      hco3: 32,
      be: 8,
      correctAnswer: "Alcalose Metabólica",
      explanation: "pH alto (7.52) indica alcalemia. PCO2 normal (38) indica que não há compensação respiratória. HCO3 alto (32) e BE positivo (8) indicam componente metabólico."
    },
    {
      id: 6,
      title: "Caso 6: Paciente com Insuficiência Renal Crônica",
      description: "Paciente de 45 anos com insuficiência renal crônica, apresenta fadiga e confusão mental. Gasometria arterial revela:",
      ph: 7.28,
      pco2: 35,
      hco3: 18,
      be: -8,
      correctAnswer: "Acidose Metabólica Compensada",
      explanation: "pH baixo (7.28) indica acidemia. PCO2 baixo (35) indica compensação respiratória. HCO3 baixo (18) e BE negativo (-8) indicam componente metabólico."
    },
    {
      id: 7,
      title: "Caso 7: Paciente com Cetoacidose Diabética",
      description: "Paciente de 35 anos com diabetes tipo 1, apresenta náuseas e confusão. Gasometria arterial revela:",
      ph: 7.22,
      pco2: 30,
      hco3: 12,
      be: -16,
      correctAnswer: "Acidose Metabólica Compensada",
      explanation: "pH muito baixo (7.22) indica acidemia severa. PCO2 baixo (30) indica compensação respiratória. HCO3 muito baixo (12) e BE muito negativo (-16) indicam acidose metabólica severa."
    },
    {
      id: 8,
      title: "Caso 8: Paciente com Diarreia Severa",
      description: "Paciente de 42 anos com diarreia há 5 dias, apresenta desidratação e fraqueza. Gasometria arterial revela:",
      ph: 7.30,
      pco2: 32,
      hco3: 16,
      be: -10,
      correctAnswer: "Acidose Metabólica Compensada",
      explanation: "pH baixo (7.30) indica acidemia. PCO2 baixo (32) indica compensação respiratória. HCO3 baixo (16) e BE negativo (-10) indicam componente metabólico."
    },

    // CASOS MISTOS E COMPLEXOS
    {
      id: 9,
      title: "Caso 9: Paciente com Parada Cardíaca",
      description: "Paciente de 60 anos pós-parada cardíaca, apresenta choque cardiogênico. Gasometria arterial revela:",
      ph: 7.18,
      pco2: 55,
      hco3: 15,
      be: -12,
      correctAnswer: "Acidose Mista",
      explanation: "pH muito baixo (7.18) indica acidemia severa. PCO2 alto (55) indica componente respiratório. HCO3 baixo (15) e BE negativo (-12) indicam componente metabólico. Distúrbio misto."
    },
    {
      id: 10,
      title: "Caso 10: Paciente com Trauma Múltiplo",
      description: "Paciente de 25 anos com trauma múltiplo, apresenta choque hemorrágico. Gasometria arterial revela:",
      ph: 7.15,
      pco2: 60,
      hco3: 18,
      be: -8,
      correctAnswer: "Acidose Mista",
      explanation: "pH muito baixo (7.15) indica acidemia severa. PCO2 alto (60) indica componente respiratório. HCO3 baixo (18) e BE negativo (-8) indicam componente metabólico. Distúrbio misto."
    },

    // CASOS COMPENSADOS COMPLEXOS
    {
      id: 11,
      title: "Caso 11: Paciente com DPOC Crônico Bem Compensado",
      description: "Paciente de 70 anos com DPOC há 20 anos, estável clinicamente. Gasometria arterial revela:",
      ph: 7.38,
      pco2: 52,
      hco3: 30,
      be: 6,
      correctAnswer: "Acidose Respiratória Compensada",
      explanation: "pH normal (7.38) indica compensação adequada. PCO2 alto (52) indica componente respiratório crônico. HCO3 alto (30) e BE positivo (6) indicam compensação renal completa."
    },
    {
      id: 12,
      title: "Caso 12: Paciente com Insuficiência Renal Bem Compensada",
      description: "Paciente de 50 anos com insuficiência renal estável, em diálise. Gasometria arterial revela:",
      ph: 7.42,
      pco2: 32,
      hco3: 20,
      be: -4,
      correctAnswer: "Acidose Metabólica Compensada",
      explanation: "pH normal (7.42) indica compensação adequada. PCO2 baixo (32) indica compensação respiratória. HCO3 baixo (20) e BE negativo (-4) indicam componente metabólico compensado."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const generateRandomCase = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const newCase = await GeminiService.generateClinicalCase();
      
      // Validar se a resposta está nas opções disponíveis
      const validAnswers = [
        "Acidose Respiratória",
        "Alcalose Respiratória", 
        "Acidose Metabólica",
        "Alcalose Metabólica",
        "Acidose Respiratória Compensada",
        "Alcalose Respiratória Compensada",
        "Acidose Metabólica Compensada",
        "Alcalose Metabólica Compensada"
      ];
      
      if (!validAnswers.includes(newCase.correctAnswer)) {
        console.warn('Resposta da API não está nas opções válidas:', newCase.correctAnswer);
        setApiError('Resposta da API inválida. Usando caso pré-definido.');
        throw new Error('Resposta inválida da API');
      }
      
      const caseWithId = { ...newCase, id: Date.now() }; // Adiciona ID único
      setCurrentCase(caseWithId);
      setSelectedAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } catch (error) {
      console.error('Erro ao gerar caso clínico:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setApiError(`Erro na API: ${errorMessage}. Usando caso pré-definido.`);
      
      // Fallback inteligente para caso pré-definido
      // Selecionar caso baseado em critérios para evitar repetição
      let selectedCase;
      
      if (currentCase) {
        // Se já temos um caso, escolher um diferente
        const currentIndex = clinicalCases.findIndex(c => c.correctAnswer === currentCase.correctAnswer);
        const availableCases = clinicalCases.filter((_, index) => index !== currentIndex);
        const randomIndex = Math.floor(Math.random() * availableCases.length);
        selectedCase = availableCases[randomIndex];
      } else {
        // Primeiro caso: escolher aleatoriamente
        const randomIndex = Math.floor(Math.random() * clinicalCases.length);
        selectedCase = clinicalCases[randomIndex];
      }
      
      setCurrentCase(selectedCase);
      setSelectedAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } finally {
      setIsLoading(false);
    }
  };

    const handleComponentInfo = async (componentName: string) => {
    setIsLoading(true);
    try {
      let info: string;
      
      if (componentInfo[componentName]) {
        info = componentInfo[componentName];
      } else {
        info = await GeminiService.getComponentInfo(componentName);
        setComponentInfo(prev => ({ ...prev, [componentName]: info }));
      }
      
      // Abrir modal com as informações
      setModalContent({
        title: `Informações sobre ${componentName}`,
        content: info
      });
      setShowModal(true);
    } catch (error) {
      console.error(`Erro ao carregar informações de ${componentName}:`, error);
      
      // Log mais detalhado para debug
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
      }
      
      // Fallback para informações pré-definidas
      const fallbackInfo = {
        'pH': 'O pH é uma medida da concentração de íons hidrogênio (H+) no sangue. Valores normais entre 7.35-7.45 indicam equilíbrio ácido-base adequado. Alterações podem indicar distúrbios respiratórios ou metabólicos.',
        'PCO2': 'A PCO2 reflete a pressão parcial de CO2 no sangue arterial, indicando a eficiência da ventilação pulmonar. Valores normais: 35-45 mmHg. Alterações afetam diretamente o pH sanguíneo.',
        'HCO3': 'O bicarbonato (HCO3-) é o principal tampão metabólico do organismo, regulado pelos rins. Valores normais: 22-26 mEq/L. Sua concentração indica a capacidade de compensação metabólica.',
        'BE': 'O Base Excess (BE) indica o excesso ou déficit de bases no organismo. Valores normais: -2 a +2 mEq/L. É útil para avaliar a magnitude de distúrbios metabólicos e compensações.'
      };
      
      const info = fallbackInfo[componentName as keyof typeof fallbackInfo];
      setComponentInfo(prev => ({ ...prev, [componentName]: info }));
      
      // Abrir modal com fallback
      setModalContent({
        title: `Informações sobre ${componentName}`,
        content: info
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const selectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!currentCase) return;
    
    // Log para debug
    console.log('Resposta selecionada:', selectedAnswer);
    console.log('Resposta correta:', currentCase.correctAnswer);
    console.log('Comparação exata:', selectedAnswer === currentCase.correctAnswer);
    
    const correct = selectedAnswer === currentCase.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  useEffect(() => {
    calculateDisorder();
    updateChart();
  }, [ph, pco2, hco3]);

  const calculateDisorder = () => {
    // Lógica melhorada para determinar o distúrbio primário
    let disorder = '';
    let compensation = '';

    // Definir limites mais realistas
    const pH_acidemia = 7.35;
    const pH_alcalemia = 7.45;
    const PCO2_normal_min = 35;
    const PCO2_normal_max = 45;
    const HCO3_normal_min = 22;
    const HCO3_normal_max = 26;

    if (ph < pH_acidemia) {
      // Acidemia
      const pco2_abnormal = pco2 > PCO2_normal_max;
      const hco3_abnormal = hco3 < HCO3_normal_min;
      
      if (pco2_abnormal && !hco3_abnormal) {
        // Distúrbio respiratório primário
        disorder = 'Acidose Respiratória';
        if (hco3 > HCO3_normal_max) {
          compensation = 'Compensada (HCO3 elevado)';
        } else {
          compensation = 'Não compensada';
        }
      } else if (hco3_abnormal && !pco2_abnormal) {
        // Distúrbio metabólico primário
        disorder = 'Acidose Metabólica';
        if (pco2 < PCO2_normal_min) {
          compensation = 'Compensada (PCO2 baixo)';
        } else {
          compensation = 'Não compensada';
        }
      } else if (pco2_abnormal && hco3_abnormal) {
        // Distúrbio misto
        disorder = 'Acidose Mista';
        compensation = 'Distúrbio complexo';
      } else {
        // Acidemia leve sem distúrbio claro
        disorder = 'Acidemia Leve';
        compensation = 'Sem compensação clara';
      }
    } else if (ph > pH_alcalemia) {
      // Alcalemia
      const pco2_abnormal = pco2 < PCO2_normal_min;
      const hco3_abnormal = hco3 > HCO3_normal_max;
      
      if (pco2_abnormal && !hco3_abnormal) {
        // Distúrbio respiratório primário
        disorder = 'Alcalose Respiratória';
        if (hco3 < HCO3_normal_min) {
          compensation = 'Compensada (HCO3 baixo)';
        } else {
          compensation = 'Não compensada';
        }
      } else if (hco3_abnormal && !pco2_abnormal) {
        // Distúrbio metabólico primário
        disorder = 'Alcalose Metabólica';
        if (pco2 > PCO2_normal_max) {
          compensation = 'Compensada (PCO2 alto)';
        } else {
          compensation = 'Não compensada';
        }
      } else if (pco2_abnormal && hco3_abnormal) {
        // Distúrbio misto
        disorder = 'Alcalose Mista';
        compensation = 'Distúrbio complexo';
      } else {
        // Alcalemia leve sem distúrbio claro
        disorder = 'Alcalemia Leve';
        compensation = 'Sem compensação clara';
      }
    } else {
      // pH normal
      if (Math.abs(pco2 - 40) <= 2 && Math.abs(hco3 - 24) <= 2) {
        disorder = 'Equilíbrio Ácido-Base Normal';
        compensation = 'Sem distúrbio primário';
      } else {
        disorder = 'Equilíbrio Compensado';
        compensation = 'Compensação adequada';
      }
    }

    setPrimaryDisorder(disorder);
    setCompensationStatus(compensation);
  };

  const updateChart = () => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [ph, pco2, hco3];
      chartRef.current.update();
    }
  };

  const chartData = {
    labels: ['pH', 'PCO2 (mmHg)', 'HCO3 (mEq/L)'],
    datasets: [
      {
        label: 'Valores Atuais',
        data: [ph, pco2, hco3],
        backgroundColor: [
          'rgba(13, 145, 178, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          'rgba(13, 145, 178, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Valores Normais',
        data: [7.40, 40, 24],
        backgroundColor: [
          'rgba(156, 163, 175, 0.6)',
          'rgba(156, 163, 175, 0.6)',
          'rgba(156, 163, 175, 0.6)'
        ],
        borderColor: [
          'rgba(156, 163, 175, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Comparação com Valores Normais'
      }
    }
  };

  return (
    <div className="gasometria-page">
      <header className="gasometria-header">
        <nav className="gasometria-nav">
          <div className="gasometria-nav-content">
            <div className="gasometria-logo">Guia Interativo de Gasometria Arterial</div>
            <div className="gasometria-nav-links">
              <a href="#fundamentos" className="gasometria-nav-link">Fundamentos</a>
              <a href="#interpretacao" className="gasometria-nav-link">Interpretação</a>
              <a href="#simulador" className="gasometria-nav-link">Simulador</a>
              <a href="#casos-clinicos" className="gasometria-nav-link">Casos Clínicos</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="gasometria-main">
        <div className="gasometria-container">
          {/* Seção de Fundamentos */}
          <section id="fundamentos" className="gasometria-section">
            <h1 className="gasometria-section-title">Fundamentos da Gasometria Arterial</h1>
            <p className="gasometria-section-subtitle">
              Compreenda os princípios básicos e a fisiologia do equilíbrio ácido-base
            </p>

            <div className="gasometria-components-grid">
                             <div className="gasometria-component-card border-cyan">
                 <h3 className="gasometria-component-title">pH</h3>
                 <p className="gasometria-component-description">
                   Mede a concentração de íons hidrogênio no sangue, determinando se o meio é ácido, neutro ou alcalino.
                 </p>
                 <div className="gasometria-component-normal">
                   <strong>Normal:</strong> 7.35 - 7.45
                 </div>
                 <div className="gasometria-component-values">
                   <span className="acidosis">&lt; 7.35: Acidemia</span><br />
                   <span className="alkalosis">&gt; 7.45: Alcalemia</span>
                 </div>
                         <button
          className="gasometria-btn"
          onClick={() => handleComponentInfo('pH')}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Saiba Mais'}
        </button>
               </div>

                             <div className="gasometria-component-card border-teal">
                 <h3 className="gasometria-component-title">PCO2</h3>
                 <p className="gasometria-component-description">
                   Pressão parcial de dióxido de carbono, reflete a eficiência da ventilação pulmonar.
                 </p>
                 <div className="gasometria-component-normal">
                   <strong>Normal:</strong> 35 - 45 mmHg
                 </div>
                 <div className="gasometria-component-values">
                   <span className="acidosis">&gt; 45: Hipercapnia</span><br />
                   <span className="alkalosis">&lt; 35: Hipocapnia</span>
                 </div>
                         <button
          className="gasometria-btn"
          onClick={() => handleComponentInfo('PCO2')}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Saiba Mais'}
        </button>
               </div>

                             <div className="gasometria-component-card border-emerald">
                 <h3 className="gasometria-component-title">HCO3</h3>
                 <p className="gasometria-component-description">
                   Bicarbonato, principal tampão metabólico do organismo, regulado pelos rins.
                 </p>
                 <div className="gasometria-component-normal">
                   <strong>Normal:</strong> 22 - 26 mEq/L
                 </div>
                 <div className="gasometria-component-values">
                   <span className="acidosis">&lt; 22: Acidose Metabólica</span><br />
                   <span className="alkalosis">&gt; 26: Alcalose Metabólica</span>
                 </div>
                         <button
          className="gasometria-btn"
          onClick={() => handleComponentInfo('HCO3')}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Saiba Mais'}
        </button>
               </div>

              <div className="gasometria-component-card border-sky">
                <h3 className="gasometria-component-title">BE (Base Excess)</h3>
                <p className="gasometria-component-description">
                  Excesso ou déficit de bases, indica a reserva alcalina do organismo.
                </p>
                <div className="gasometria-component-normal">
                  <strong>Normal:</strong> -2 a +2 mEq/L
                </div>
                <div className="gasometria-component-values">
                  <span className="acidosis">&lt; -2: Déficit de Base</span><br />
                  <span className="alkalosis">&gt; +2: Excesso de Base</span>
                </div>
                                         <button
          className="gasometria-btn"
          onClick={() => handleComponentInfo('BE')}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Saiba Mais'}
        </button>
              </div>
            </div>

            {/* Sistema Tampão */}
            <div className="gasometria-buffer-system">
              <h3 className="gasometria-buffer-system-title">Sistema Tampão do Organismo</h3>
              <p className="gasometria-buffer-system-text">
                O organismo possui três sistemas principais para manter o equilíbrio ácido-base:
              </p>
              <div className="gasometria-educational-text">
                <strong>1. Sistema Tampão Bicarbonato:</strong> O mais importante, onde CO2 + H2O ↔ H2CO3 ↔ H+ + HCO3-
              </div>
              <div className="gasometria-educational-text">
                <strong>2. Sistema Tampão Hemoglobina:</strong> A hemoglobina captura íons H+ e CO2
              </div>
              <div className="gasometria-educational-text">
                <strong>3. Sistema Tampão Fosfato:</strong> Importante no rim e células
              </div>
            </div>

            {/* Relação pH e PCO2 */}
            <div className="gasometria-educational-section">
              <h3 className="gasometria-educational-subtitle">Relação Inversa entre pH e PCO2</h3>
              <p className="gasometria-educational-text">
                <strong>Lei de Henderson-Hasselbalch:</strong> pH = pK + log([HCO3-]/[H2CO3])
              </p>
              <p className="gasometria-educational-text">
                Quando a PCO2 aumenta, mais CO2 se dissolve formando H2CO3, que se dissocia em H+ e HCO3-, 
                aumentando a concentração de H+ e diminuindo o pH (acidose respiratória).
              </p>
              <p className="gasometria-educational-text">
                Quando a PCO2 diminui, menos H+ é formado, aumentando o pH (alcalose respiratória).
              </p>
            </div>
          </section>

          {/* Seção de Interpretação */}
          <section id="interpretacao" className="gasometria-section">
            <h2 className="gasometria-section-title">Interpretação da Gasometria Arterial</h2>
            <p className="gasometria-section-subtitle">
              Aprenda o passo a passo para interpretar corretamente uma gasometria
            </p>

            {/* Tabela de Diagnósticos */}
            <div className="gasometria-educational-section">
              <h3 className="gasometria-educational-subtitle">Tabela de Diagnósticos</h3>
              <table className="gasometria-table">
                <thead>
                  <tr>
                    <th>pH</th>
                    <th>PCO2</th>
                    <th>HCO3</th>
                    <th>Diagnóstico</th>
                    <th>Explicação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="acidosis">↓ Baixo</td>
                    <td className="acidosis">↑ Alto</td>
                    <td className="normal">Normal</td>
                    <td className="acidosis">Acidose Respiratória</td>
                    <td>Retenção de CO2 causa acidemia</td>
                  </tr>
                  <tr>
                    <td className="alkalosis">↑ Alto</td>
                    <td className="alkalosis">↓ Baixo</td>
                    <td className="normal">Normal</td>
                    <td className="alkalosis">Alcalose Respiratória</td>
                    <td>Eliminação excessiva de CO2 causa alcalemia</td>
                  </tr>
                  <tr>
                    <td className="acidosis">↓ Baixo</td>
                    <td className="normal">Normal</td>
                    <td className="acidosis">↓ Baixo</td>
                    <td className="acidosis">Acidose Metabólica</td>
                    <td>Perda de HCO3 ou ganho de ácidos causa acidemia</td>
                  </tr>
                  <tr>
                    <td className="alkalosis">↑ Alto</td>
                    <td className="normal">Normal</td>
                    <td className="alkalosis">↑ Alto</td>
                    <td className="alkalosis">Alcalose Metabólica</td>
                    <td>Ganho de HCO3 ou perda de ácidos causa alcalemia</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sequência de Avaliação */}
            <div className="gasometria-educational-section">
              <h3 className="gasometria-educational-subtitle">Sequência de Avaliação</h3>
              <div className="gasometria-highlight-box">
                <div className="gasometria-highlight-title">1º: pH → 2º: PCO2/HCO3 → 3º: BE</div>
                <div className="gasometria-highlight-text">
                  <strong>Por que esta sequência?</strong><br/>
                  • pH: Identifica se há acidemia ou alcalemia<br/>
                  • PCO2/HCO3: Determina se o distúrbio é respiratório ou metabólico<br/>
                  • BE: Confirma a compensação e a magnitude do distúrbio metabólico
                </div>
              </div>
            </div>

            {/* Causas Comuns */}
            <div className="gasometria-educational-section">
              <h3 className="gasometria-educational-subtitle">Causas Mais Comuns</h3>
              <table className="gasometria-table">
                <thead>
                  <tr>
                    <th>Distúrbio</th>
                    <th>Causas Principais</th>
                    <th>Exemplos Clínicos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="acidosis">Acidose Respiratória</td>
                    <td>Hipoventilação</td>
                    <td>DPOC, sedação, obesidade, distúrbios neuromusculares</td>
                  </tr>
                  <tr>
                    <td className="alkalosis">Alcalose Respiratória</td>
                    <td>Hiperventilação</td>
                    <td>Ansiedade, dor, febre, sepse, embolia pulmonar</td>
                  </tr>
                  <tr>
                    <td className="acidosis">Acidose Metabólica</td>
                    <td>Perda de HCO3 ou ganho de ácidos</td>
                    <td>Insuficiência renal, cetoacidose diabética, diarreia</td>
                  </tr>
                  <tr>
                    <td className="alkalosis">Alcalose Metabólica</td>
                    <td>Ganho de HCO3 ou perda de ácidos</td>
                    <td>Vômitos, uso de diuréticos, hiperaldosteronismo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Índice de Oxigenação */}
            <div className="gasometria-oxygenation-index">
              <h3 className="gasometria-oxygenation-index-title">Índice de Oxigenação (PaO2/FiO2)</h3>
              <p className="gasometria-oxygenation-index-text">
                O índice PaO2/FiO2 é um marcador importante da função pulmonar e da gravidade da lesão pulmonar.
              </p>
              <div className="gasometria-oxygenation-formula">
                PaO2/FiO2 = Pressão arterial de O2 ÷ Fração inspirada de O2
              </div>
              <table className="gasometria-table">
                <thead>
                  <tr>
                    <th>Valor</th>
                    <th>Interpretação</th>
                    <th>Gravidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="normal">&gt; 400</td>
                    <td>Normal</td>
                    <td>Sem comprometimento</td>
                  </tr>
                  <tr>
                    <td className="highlight">300-400</td>
                    <td>Leve</td>
                    <td>Comprometimento leve</td>
                  </tr>
                  <tr>
                    <td className="warning">200-300</td>
                    <td>Moderado</td>
                    <td>SDRA leve a moderado</td>
                  </tr>
                  <tr>
                    <td className="acidosis">&lt; 200</td>
                    <td>Grave</td>
                    <td>SDRA grave</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Seção de Compensação */}
          <section className="gasometria-section">
            <h2 className="gasometria-section-title">Sistemas de Compensação</h2>
            <p className="gasometria-section-subtitle">
              Entenda como o organismo compensa os distúrbios ácido-base
            </p>

            {/* Tabela de Compensação */}
            <div className="gasometria-educational-section">
              <h3 className="gasometria-educational-subtitle">Tabela de Compensação</h3>
              <table className="gasometria-table">
                <thead>
                  <tr>
                    <th>Distúrbio Primário</th>
                    <th>pH</th>
                    <th>PCO2</th>
                    <th>HCO3</th>
                    <th>BE</th>
                    <th>Mecanismo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="acidosis">Acidose Respiratória Compensada</td>
                    <td className="acidosis">7.30-7.35</td>
                    <td className="acidosis">↑ 45-60</td>
                    <td className="alkalosis">↑ 26-35</td>
                    <td className="alkalosis">+2 a +8</td>
                    <td>Rim retém HCO3</td>
                  </tr>
                  <tr>
                    <td className="alkalosis">Alcalose Respiratória Compensada</td>
                    <td className="alkalosis">7.45-7.50</td>
                    <td className="alkalosis">↓ 25-35</td>
                    <td className="acidosis">↓ 18-22</td>
                    <td className="acidosis">-2 a -8</td>
                    <td>Rim elimina HCO3</td>
                  </tr>
                  <tr>
                    <td className="acidosis">Acidose Metabólica Compensada</td>
                    <td className="acidosis">7.30-7.35</td>
                    <td className="alkalosis">↓ 25-35</td>
                    <td className="acidosis">↓ 15-22</td>
                    <td className="acidosis">-8 a -15</td>
                    <td>Pulmão hiperventila</td>
                  </tr>
                  <tr>
                    <td className="alkalosis">Alcalose Metabólica Compensada</td>
                    <td className="alkalosis">7.45-7.50</td>
                    <td className="acidosis">↑ 45-55</td>
                    <td className="alkalosis">↑ 26-35</td>
                    <td className="alkalosis">+8 a +15</td>
                    <td>Pulmão hipoventila</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Explicação dos Mecanismos */}
            <div className="gasometria-educational-section">
              <h3 className="gasometria-educational-subtitle">Mecanismos de Compensação</h3>
              
              <div className="gasometria-compensation-grid">
                <div className="gasometria-compensation-card">
                  <h4 className="gasometria-compensation-title respiratory">Compensação Respiratória</h4>
                  <p className="gasometria-compensation-description">
                    Ocorre rapidamente (minutos a horas) através de alterações na ventilação.
                  </p>
                  <div className="gasometria-compensation-examples">
                    <div className="gasometria-compensation-example">
                      <div className="gasometria-compensation-example-title">Acidose Metabólica</div>
                      <div className="gasometria-compensation-example-text">
                        <span className="highlight">Hiperventilação</span> para eliminar CO2 e aumentar pH
                      </div>
                    </div>
                    <div className="gasometria-compensation-example">
                      <div className="gasometria-compensation-example-title">Alcalose Metabólica</div>
                      <div className="gasometria-compensation-example-text">
                        <span className="highlight">Hipoventilação</span> para reter CO2 e diminuir pH
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gasometria-compensation-card">
                  <h4 className="gasometria-compensation-title metabolic">Compensação Renal</h4>
                  <p className="gasometria-compensation-description">
                    Ocorre mais lentamente (dias) através de alterações na excreção de H+ e HCO3-.
                  </p>
                  <div className="gasometria-compensation-examples">
                    <div className="gasometria-compensation-example">
                      <div className="gasometria-compensation-example-title">Acidose Respiratória</div>
                      <div className="gasometria-compensation-example-text">
                        <span className="highlight">Retenção de HCO3-</span> para aumentar pH
                      </div>
                    </div>
                    <div className="gasometria-compensation-example">
                      <div className="gasometria-compensation-example-title">Alcalose Respiratória</div>
                      <div className="gasometria-compensation-example-text">
                        <span className="highlight">Eliminação de HCO3-</span> para diminuir pH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção do Simulador */}
          <section id="simulador" className="gasometria-section">
            <h2 className="gasometria-section-title">Simulador Interativo</h2>
            <p className="gasometria-section-subtitle">
              Ajuste os valores e veja como eles afetam o diagnóstico em tempo real
            </p>

            <div className="gasometria-simulator">
              <div className="gasometria-simulator-grid">
                <div className="gasometria-simulator-controls">
                  <h3 className="gasometria-simulator-title">Controles</h3>
                  
                  <div className="gasometria-control-group">
                    <label className="gasometria-control-label">
                      pH: <span className="gasometria-control-value ph">{ph.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="6.8"
                      max="7.8"
                      step="0.01"
                      value={ph}
                      onChange={(e) => setPh(parseFloat(e.target.value))}
                      className="gasometria-slider"
                    />
                  </div>

                  <div className="gasometria-control-group">
                    <label className="gasometria-control-label">
                      PCO2 (mmHg): <span className="gasometria-control-value pco2">{pco2}</span>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      step="1"
                      value={pco2}
                      onChange={(e) => setPco2(parseInt(e.target.value))}
                      className="gasometria-slider"
                    />
                  </div>

                  <div className="gasometria-control-group">
                    <label className="gasometria-control-label">
                      HCO3 (mEq/L): <span className="gasometria-control-value hco3">{hco3}</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      step="1"
                      value={hco3}
                      onChange={(e) => setHco3(parseInt(e.target.value))}
                      className="gasometria-slider"
                    />
                  </div>
                </div>

                <div className="gasometria-results">
                  <h3 className="gasometria-results-title">Resultados</h3>
                  
                  <div className={`gasometria-result-box ${
                    primaryDisorder.includes('Acidose') ? 'acidosis' : 
                    primaryDisorder.includes('Alcalose') ? 'alkalosis' : 'normal'
                  }`}>
                    <div className={`gasometria-primary-disorder ${
                      primaryDisorder.includes('Acidose') ? 'acidosis' : 
                      primaryDisorder.includes('Alcalose') ? 'alkalosis' : 'normal'
                    }`}>
                      {primaryDisorder}
                    </div>
                    <div className={`gasometria-compensation-status ${
                      compensationStatus.includes('Compensada') ? 'normal' :
                      compensationStatus.includes('Acidose') ? 'acidosis' :
                      compensationStatus.includes('Alcalose') ? 'alkalosis' : 'normal'
                    }`}>
                      {compensationStatus}
                    </div>
                  </div>

                  <div className="gasometria-chart-container">
                    <Bar data={chartData} options={chartOptions} ref={chartRef} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção de Casos Clínicos */}
          <section id="casos-clinicos" className="gasometria-section">
            <h2 className="gasometria-section-title">Casos Clínicos Interativos</h2>
            <p className="gasometria-section-subtitle">
              Teste seus conhecimentos com casos clínicos reais
            </p>

            <div className="gasometria-educational-section">
                                               <div className="gasometria-case-buttons">
                    <button 
                      className="gasometria-case-button"
                      onClick={generateRandomCase}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Gerando Caso...' : 'Gerar Novo Caso Clínico (API)'}
                    </button>
                    
                    <button 
                      className="gasometria-case-button-secondary"
                      onClick={() => {
                        // Selecionar caso pré-definido aleatório
                        const randomIndex = Math.floor(Math.random() * clinicalCases.length);
                        setCurrentCase(clinicalCases[randomIndex]);
                        setSelectedAnswer('');
                        setShowFeedback(false);
                        setIsCorrect(false);
                        setApiError(null);
                      }}
                      style={{ marginLeft: '10px' }}
                    >
                      Usar Caso Pré-definido
                    </button>
                  </div>

               {apiError && (
                 <div className="gasometria-error-message">
                   {apiError}
                 </div>
               )}

                             {currentCase && (
                 <div className="gasometria-clinical-case">
                   <div className="gasometria-case-header">
                     <h3 className="gasometria-clinical-case-title">{currentCase.title}</h3>
                     <div className="gasometria-case-type-indicator">
                       {clinicalCases.some(c => c.id === currentCase.id) ? 
                         '📚 Caso Pré-definido' : '🤖 Caso da API'}
                     </div>
                   </div>
                  <p className="gasometria-clinical-case-description">{currentCase.description}</p>
                  
                  <div className="gasometria-clinical-case-values">
                    pH: {currentCase.ph} | PCO2: {currentCase.pco2} mmHg | HCO3: {currentCase.hco3} mEq/L | BE: {currentCase.be} mEq/L
                  </div>

                  <div className="gasometria-clinical-case-question">
                    Qual é o diagnóstico correto?
                  </div>

                  <div className="gasometria-clinical-case-options">
                    {[
                      "Acidose Respiratória",
                      "Alcalose Respiratória", 
                      "Acidose Metabólica",
                      "Alcalose Metabólica",
                      "Acidose Respiratória Compensada",
                      "Alcalose Respiratória Compensada",
                      "Acidose Metabólica Compensada",
                      "Alcalose Metabólica Compensada"
                    ].map((option) => (
                      <div
                        key={option}
                        className={`gasometria-clinical-case-option ${
                          selectedAnswer === option ? 'selected' : ''
                        }`}
                        onClick={() => selectAnswer(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>

                  {selectedAnswer && (
                    <button 
                      className="gasometria-btn-primary"
                      onClick={checkAnswer}
                    >
                      Verificar Resposta
                    </button>
                  )}

                  {/* Botão de debug temporário */}
                  {process.env.NODE_ENV === 'development' && currentCase && (
                    <button 
                      className="gasometria-btn-secondary"
                      onClick={() => {
                        console.log('=== DEBUG INFO ===');
                        console.log('Caso atual:', currentCase);
                        console.log('Resposta correta:', currentCase.correctAnswer);
                        console.log('Opções válidas:', [
                          "Acidose Respiratória",
                          "Alcalose Respiratória", 
                          "Acidose Metabólica",
                          "Alcalose Metabólica",
                          "Acidose Respiratória Compensada",
                          "Alcalose Respiratória Compensada",
                          "Acidose Metabólica Compensada",
                          "Alcalose Metabólica Compensada"
                        ]);
                        console.log('Resposta selecionada:', selectedAnswer);
                        console.log('Comparação:', selectedAnswer === currentCase.correctAnswer);
                      }}
                      style={{ marginTop: '10px', fontSize: '12px', padding: '5px 10px' }}
                    >
                      Debug Info
                    </button>
                  )}

                  {showFeedback && (
                    <div className={`gasometria-clinical-case-feedback show ${
                      isCorrect ? 'correct' : 'incorrect'
                    }`}>
                      <strong>{isCorrect ? 'Correto!' : 'Incorreto!'}</strong><br/>
                      {currentCase.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Seção de Passo a Passo */}
          <section className="gasometria-section">
            <h2 className="gasometria-section-title">Passo a Passo para Interpretação</h2>
            <p className="gasometria-section-subtitle">
              Siga esta sequência para interpretar corretamente qualquer gasometria
            </p>

            <div className="gasometria-accordion">
              <div className="gasometria-accordion-item">
                <button 
                  className="gasometria-accordion-button"
                  onClick={() => toggleAccordion(0)}
                >
                  <span>Passo 1: Avaliar o pH</span>
                  <span className={`gasometria-accordion-arrow ${activeAccordion === 0 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`gasometria-accordion-content ${activeAccordion === 0 ? 'expanded' : 'collapsed'}`}>
                  <div className="gasometria-accordion-text">
                    <strong>pH &lt; 7.35:</strong> Acidemia - o sangue está mais ácido que o normal<br/>
                    <strong>pH 7.35-7.45:</strong> Normal - equilíbrio ácido-base adequado<br/>
                    <strong>pH &gt; 7.45:</strong> Alcalemia - o sangue está mais alcalino que o normal
                  </div>
                </div>
              </div>

              <div className="gasometria-accordion-item">
                <button 
                  className="gasometria-accordion-button"
                  onClick={() => toggleAccordion(1)}
                >
                  <span>Passo 2: Identificar o Componente Primário</span>
                  <span className={`gasometria-accordion-arrow ${activeAccordion === 1 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`gasometria-accordion-content ${activeAccordion === 1 ? 'expanded' : 'collapsed'}`}>
                  <div className="gasometria-accordion-text">
                    <strong>Componente Respiratório:</strong> Alterações na PCO2<br/>
                    <strong>Componente Metabólico:</strong> Alterações no HCO3<br/>
                    <strong>Distúrbio Misto:</strong> Alterações em ambos os componentes
                  </div>
                </div>
              </div>

              <div className="gasometria-accordion-item">
                <button 
                  className="gasometria-accordion-button"
                  onClick={() => toggleAccordion(2)}
                >
                  <span>Passo 3: Avaliar a Compensação</span>
                  <span className={`gasometria-accordion-arrow ${activeAccordion === 2 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`gasometria-accordion-content ${activeAccordion === 2 ? 'expanded' : 'collapsed'}`}>
                  <div className="gasometria-accordion-text">
                    <strong>Compensação Respiratória:</strong> Ocorre em minutos a horas<br/>
                    <strong>Compensação Renal:</strong> Ocorre em dias<br/>
                    <strong>Sem Compensação:</strong> Distúrbio agudo ou grave
                  </div>
                </div>
              </div>

              <div className="gasometria-accordion-item">
                <button 
                  className="gasometria-accordion-button"
                  onClick={() => toggleAccordion(3)}
                >
                  <span>Passo 4: Confirmar com o BE</span>
                  <span className={`gasometria-accordion-arrow ${activeAccordion === 3 ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`gasometria-accordion-content ${activeAccordion === 3 ? 'expanded' : 'collapsed'}`}>
                  <div className="gasometria-accordion-text">
                    <strong>BE Negativo:</strong> Confirma acidose metabólica ou compensação de alcalose respiratória<br/>
                    <strong>BE Positivo:</strong> Confirma alcalose metabólica ou compensação de acidose respiratória<br/>
                    <strong>BE Normal:</strong> Distúrbio respiratório puro ou compensação adequada
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modal para informações dos componentes */}
      {showModal && modalContent && (
        <div className="gasometria-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="gasometria-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gasometria-modal-header">
              <h3 className="gasometria-modal-title">{modalContent.title}</h3>
              <button 
                className="gasometria-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="gasometria-modal-content">
              <p>{modalContent.content}</p>
            </div>
          </div>
        </div>
      )}

      <footer className="gasometria-footer">
        <div className="gasometria-footer-content">
          <p>© 2025 Portal de Fisioterapia - Guia Interativo de Gasometria Arterial</p>
        </div>
      </footer>
    </div>
  );
};

export default GasometriaArterial;
