import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const Quiz = () => {
  const isMobile = useMobile();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos

  const questions = [
    {
      id: 1,
      question: "Qual é o principal músculo responsável pela flexão do quadril?",
      options: [
        "Glúteo máximo",
        "Iliopsoas",
        "Reto femoral",
        "Tensor da fáscia lata"
      ],
      correct: 1,
      explanation: "O iliopsoas é o principal flexor do quadril, sendo formado pelos músculos ilíaco e psoas maior."
    },
    {
      id: 2,
      question: "Em que fase da marcha ocorre o contato inicial do pé com o solo?",
      options: [
        "Fase de balanço",
        "Fase de apoio",
        "Fase de propulsão",
        "Fase de oscilação"
      ],
      correct: 1,
      explanation: "O contato inicial ocorre no início da fase de apoio, quando o calcanhar toca o solo."
    },
    {
      id: 3,
      question: "Qual é a amplitude normal de flexão do joelho?",
      options: [
        "0° a 90°",
        "0° a 120°",
        "0° a 135°",
        "0° a 150°"
      ],
      correct: 2,
      explanation: "A amplitude normal de flexão do joelho é de aproximadamente 0° a 135°."
    },
    {
      id: 4,
      question: "O que significa a sigla RICE no tratamento de lesões agudas?",
      options: [
        "Rest, Ice, Compression, Elevation",
        "Rehabilitation, Ice, Care, Exercise",
        "Rest, Immobilization, Cold, Elevation",
        "Recovery, Ice, Compression, Exercise"
      ],
      correct: 0,
      explanation: "RICE significa Rest (repouso), Ice (gelo), Compression (compressão) e Elevation (elevação)."
    },
    {
      id: 5,
      question: "Qual é a principal função do músculo diafragma?",
      options: [
        "Estabilização do core",
        "Flexão do tronco",
        "Respiração",
        "Rotação do tronco"
      ],
      correct: 2,
      explanation: "O diafragma é o principal músculo da respiração, responsável pela inspiração."
    },
    {
      id: 6,
      question: "Em que consiste a técnica de mobilização neural?",
      options: [
        "Alongamento muscular",
        "Fortalecimento neural",
        "Mobilização do sistema nervoso",
        "Estimulação elétrica"
      ],
      correct: 2,
      explanation: "A mobilização neural visa restaurar o movimento e função do sistema nervoso periférico."
    },
    {
      id: 7,
      question: "Qual é o tempo ideal para aplicação de crioterapia?",
      options: [
        "5-10 minutos",
        "15-20 minutos",
        "25-30 minutos",
        "35-40 minutos"
      ],
      correct: 1,
      explanation: "O tempo ideal para crioterapia é de 15-20 minutos para obter efeitos terapêuticos sem danos."
    },
    {
      id: 8,
      question: "O que caracteriza uma lesão de grau II em músculos?",
      options: [
        "Ruptura completa das fibras",
        "Estiramento leve sem ruptura",
        "Ruptura parcial das fibras",
        "Contusão superficial"
      ],
      correct: 2,
      explanation: "Lesão grau II caracteriza-se pela ruptura parcial das fibras musculares."
    },
    {
      id: 9,
      question: "Qual é a principal contraindicação para exercícios isométricos?",
      options: [
        "Idade avançada",
        "Hipertensão arterial severa",
        "Obesidade",
        "Sedentarismo"
      ],
      correct: 1,
      explanation: "Hipertensão arterial severa é contraindicação devido ao aumento da pressão arterial durante exercícios isométricos."
    },
    {
      id: 10,
      question: "O que é propriocepção?",
      options: [
        "Capacidade de força muscular",
        "Percepção da posição corporal no espaço",
        "Flexibilidade articular",
        "Resistência cardiovascular"
      ],
      correct: 1,
      explanation: "Propriocepção é a capacidade de perceber a posição e movimento do corpo no espaço."
    }
  ];

  React.useEffect(() => {
    let interval;
    if (quizStarted && !showResult && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, showResult, timeLeft]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: "Excelente! 🏆", color: "#10b981" };
    if (percentage >= 70) return { message: "Muito bom! 👏", color: "#f59e0b" };
    if (percentage >= 50) return { message: "Bom trabalho! 👍", color: "#0ea5e9" };
    return { message: "Continue estudando! 📚", color: "#ef4444" };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
          paddingTop: '6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem',
              maxWidth: '600px',
              margin: '0 2rem',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto'
            }}>
              <Target size={50} color="white" />
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              🧠 Quiz de Fisioterapia
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Teste seus conhecimentos com 10 questões sobre fisioterapia. 
              Você tem 5 minutos para completar o quiz!
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '2rem',
              background: '#f8fafc',
              borderRadius: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#8b5cf6'
                }}>
                  10
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Questões
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#8b5cf6'
                }}>
                  5
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Minutos
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#8b5cf6'
                }}>
                  70%
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Para Passar
                </div>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '1rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              🚀 Iniciar Quiz
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const scoreMessage = getScoreMessage(score);

    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
          paddingTop: '6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem',
              maxWidth: '600px',
              margin: '0 2rem',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '100px',
              height: '100px',
              background: `linear-gradient(135deg, ${scoreMessage.color} 0%, ${scoreMessage.color}dd 100%)`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto'
            }}>
              <Trophy size={50} color="white" />
            </div>

            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Quiz Finalizado!
            </h2>

            <p style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: scoreMessage.color,
              marginBottom: '1rem'
            }}>
              {scoreMessage.message}
            </p>

            <div style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              {score}/{questions.length}
            </div>

            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Você acertou {((score / questions.length) * 100).toFixed(0)}% das questões
            </p>

            <div style={{
              background: '#f8fafc',
              padding: '2rem',
              borderRadius: '1rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                📊 Resumo do Desempenho
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                fontSize: '0.875rem'
              }}>
                <div>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>✅ Corretas:</span>
                  <span style={{ marginLeft: '0.5rem' }}>{score}</span>
                </div>
                <div>
                  <span style={{ color: '#ef4444', fontWeight: '600' }}>❌ Incorretas:</span>
                  <span style={{ marginLeft: '0.5rem' }}>{questions.length - score}</span>
                </div>
                <div>
                  <span style={{ color: '#6b7280', fontWeight: '600' }}>⏱️ Tempo:</span>
                  <span style={{ marginLeft: '0.5rem' }}>{formatTime(300 - timeLeft)}</span>
                </div>
                <div>
                  <span style={{ color: '#6b7280', fontWeight: '600' }}>📈 Nota:</span>
                  <span style={{ marginLeft: '0.5rem' }}>{((score / questions.length) * 10).toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={resetQuiz}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
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
                <RotateCcw size={20} />
                Tentar Novamente
              </button>
              
              <button
                onClick={() => window.location.href = '/livros'}
                style={{
                  background: 'white',
                  color: '#8b5cf6',
                  border: '2px solid #8b5cf6',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📚 Ver Livros
              </button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
        paddingTop: '6rem',
        padding: '6rem 2rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Header do Quiz */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              Questão {currentQuestion + 1} de {questions.length}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: timeLeft < 60 ? '#ef4444' : '#6b7280'
            }}>
              <Clock size={20} />
              <span style={{ fontWeight: '600' }}>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Progresso */}
          <div style={{
            background: '#e5e7eb',
            height: '8px',
            borderRadius: '4px',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              height: '100%',
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Questão */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '2rem',
              lineHeight: '1.4'
            }}>
              {currentQ.question}
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  style={{
                    padding: '1rem 1.5rem',
                    border: selectedAnswer === index 
                      ? '2px solid #8b5cf6' 
                      : '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    background: selectedAnswer === index 
                      ? '#f3e8ff' 
                      : 'white',
                    color: '#1f2937',
                    fontSize: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: selectedAnswer === index ? '#8b5cf6' : '#e5e7eb',
                    color: selectedAnswer === index ? 'white' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginRight: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              style={{
                background: selectedAnswer !== null 
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                  : '#9ca3af',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                float: 'right'
              }}
            >
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Quiz;
