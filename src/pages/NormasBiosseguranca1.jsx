import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, Shield, AlertTriangle, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const NormasBiosseguranca1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const questionAnswers = [
    {
      id: 1,
      question: "Sabemos que existem cinco categorias de riscos presentes no ambiente laboral. Estes riscos podem ser prevenidos quando o empregador disponibiliza, conforme previsto na legislação, os equipamentos de proteção individual ao seu funcionário, como as luvas e máscaras. Selecione o principal risco que o ambiente hospitalar apresenta ao profissional de saúde:",
      options: [
        { letter: 'a', text: 'Químico.' },
        { letter: 'b', text: 'Físico.' },
        { letter: 'c', text: 'Biológico.' },
        { letter: 'd', text: 'Acidente.', correct: true },
        { letter: 'e', text: 'Ergonômico.' }
      ]
    },
    {
      id: 2,
      question: "Humanizar é um fundamento da assistência à saúde multiprofissional, desde 2003, que buscou estabelecer meios de auxílio fundamentados no paciente e não apenas no processo puramente tecnicista, processo este que originou a processo biomédico da saúde. Com base na proposta da Política Nacional de Humanização, assinale a alternativa correta com relação aos seus princípios:",
      options: [
        { letter: 'a', text: 'Lembrar que não existe motivo para criar vínculo terapêutico, por isso devemos visualizar o outro como um objeto de trabalho.' },
        { letter: 'b', text: 'Chamar sempre o paciente pelo número do leito e nunca pelo seu nome.' },
        { letter: 'c', text: 'Permitir que o paciente faça pequenas escolhas, pois pode melhorar a sua percepção de domínio sobre si.', correct: true },
        { letter: 'd', text: 'Utilizar um tom de voz forte e alto para que o paciente compreenda.' },
        { letter: 'e', text: 'Não repassar nenhuma informação à família.' }
      ]
    },
    {
      id: 3,
      question: "A NR 32 foi a primeira norma regulamentadora do mundo, atribuída à assistência do colaborador da saúde, com objetivo de prevenir os danos e acidentes relacionados ao trabalho. Com base nas suas determinações analise as afirmações a seguir: I. É proibido o trabalho de colaborador com ferimento nos membros superiores, sem prévia avaliação médica. II. É proibido ao fisioterapeuta o manuseio de agulhas. III. É proibido o uso de adornos. IV. É proibido o uso de EPI fora do local de trabalho. Entre as afirmações anteriores, escolha a alternativa que contém as determinações corretas.",
      options: [
        { letter: 'a', text: 'I e II estão corretas.' },
        { letter: 'b', text: 'I, II e III estão corretas.' },
        { letter: 'c', text: 'I e IV estão corretas.' },
        { letter: 'd', text: 'I, II, III e IV estão corretas.' },
        { letter: 'e', text: 'I, III e IV estão corretas.', correct: true }
      ]
    }
  ];

  return (
    <div className="normas-biosseguranca-page" style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 15s ease-in-out infinite'
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                color: 'white', 
                margin: 0, 
                lineHeight: '1.1',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}>
                Normas de Biossegurança 1
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                margin: '0.5rem 0 0 0'
              }}>
                Fundamentos essenciais de segurança no ambiente hospitalar
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
              <BookOpen className="w-4 h-4" />
              Módulo Fundamental
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
              <Users className="w-4 h-4" />
              4 Semanas
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
              <Building2 className="w-4 h-4" />
              Todos os Setores
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Introdução */}
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--neutral-700)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                A OMS recomenda que estejam disponíveis 3 a 5 leitos hospitalares para cada mil habitantes, no Brasil, a média é de 2,26 leitos para cada mil habitantes.
              </p>
            </div>

            {/* Pontos Importantes */}
            <div style={{ 
              background: 'linear-gradient(145deg, #f0fdfa 0%, #ecfdf5 100%)',
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
                Pontos Importantes ao Iniciar o Atendimento de Fisioterapia
              </h2>
              
              <ol style={{ 
                paddingLeft: '2rem', 
                color: 'var(--neutral-700)', 
                lineHeight: '1.8',
                listStyleType: 'decimal',
                fontSize: '1.1rem'
              }}>
                <li style={{ marginBottom: '1rem' }}>Chamar sempre o paciente pelo o seu nome, nunca pela doença ou pelo número do leito</li>
                <li style={{ marginBottom: '1rem' }}>Utilizar um tom de voz agradável e com termos que o paciente compreenda</li>
                <li style={{ marginBottom: '1rem' }}>Examinar o paciente de forma cuidadosa, evitando exposições desnecessárias</li>
                <li style={{ marginBottom: '1rem' }}>Estabelecer um contato atencioso</li>
                <li style={{ marginBottom: '1rem' }}>Permitir que o paciente faça pequenas escolhas, pois pode melhorar a sua percepção de domínio sobre si</li>
                <li style={{ marginBottom: '1rem' }}>Repassar à família informações de maneira cuidadosa e ética</li>
                <li style={{ marginBottom: '1rem' }}>Enxergar o outro como ser humano e não como objeto</li>
              </ol>
            </div>

            {/* CCIH */}
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
                marginBottom: '1.5rem'
              }}>
                Comissão de Controle de Infecção Hospitalar (CCIH)
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--blue-700)'
              }}>
                No ambiente hospitalar existe uma comissão designada para averiguar e controlar possíveis focos de riscos, ela é chamada de Comissão de Controle de Infecção Hospitalar (CCIH).
              </p>
            </div>

            {/* NR 32 */}
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
                marginBottom: '2rem'
              }}>
                NR 32 - Norma Regulamentadora
              </h2>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--neutral-700)', 
                marginBottom: '2rem'
              }}>
                A primeira norma regulamentadora do mundo destinada à proteção e saúde dos profissionais que atuam num serviço de saúde foi a NR 32, ela define que pode ser considerado um serviço de saúde todo e qualquer estabelecimento que destina assistência à saúde, independente do nível de complexidade. Ressaltando assim que a NR 32 não se aplica apenas aos profissionais que trabalham no ambiente hospitalar, mas sim a todos os profissionais que atuam em clínicas, laboratórios, unidades básicas de saúde, entre outros.
              </p>
              
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                color: 'var(--emerald-700)', 
                marginBottom: '1.5rem'
              }}>
                A NR 32 determina a todos os trabalhadores do ambiente hospitalar:
              </h3>
              
              <ol style={{ 
                paddingLeft: '2rem', 
                color: 'var(--neutral-700)', 
                lineHeight: '1.8',
                listStyleType: 'decimal',
                fontSize: '1.1rem'
              }}>
                <li style={{ marginBottom: '1rem' }}>São proibidos o reencape e a desconexão manual de agulhas</li>
                <li style={{ marginBottom: '1rem' }}>É proibido o trabalho de colaborador com ferimento nos membros superiores, sem prévia avaliação médica</li>
                <li style={{ marginBottom: '1rem' }}>É proibido o uso de sapatos abertos</li>
                <li style={{ marginBottom: '1rem' }}>É proibido o uso de adornos (brincos, pulseiras e anéis)</li>
                <li style={{ marginBottom: '1rem' }}>É proibido o consumo de alimento no local de trabalho</li>
                <li style={{ marginBottom: '1rem' }}>É proibido o uso de EPI fora do local de trabalho</li>
                <li style={{ marginBottom: '1rem' }}>É obrigatória a prática das precauções padrão</li>
              </ol>
            </div>

            {/* Classificação de Áreas */}
            <div style={{ 
              background: 'linear-gradient(145deg, #fefce8 0%, #fef3c7 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--amber-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--amber-800)', 
                marginBottom: '1.5rem'
              }}>
                Classificação de Áreas Hospitalares
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--amber-700)'
              }}>
                Cada área de um hospital apresenta diferentes tipos de riscos em relação à incidência de presença de infecção. Por exemplo, as unidades cirúrgicas e as unidades de terapia intensiva são classificadas como áreas críticas pela maior chance de contágio com agentes biológicos. As enfermarias são consideradas unidades semicríticas e os consultórios são denominados área não crítica para infecção.
              </p>
            </div>

            {/* Classificação dos Riscos */}
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
                marginBottom: '2rem'
              }}>
                Classificação dos Riscos Laborais (NR 5)
              </h2>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--neutral-700)', 
                marginBottom: '2rem'
              }}>
                Os riscos laborais podem ser classificados em 5 tipos, estes riscos são descritos na NR 5 como:
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '2rem', 
                  background: 'var(--green-50)', 
                  borderRadius: '1rem',
                  border: '2px solid var(--green-200)'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--green-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                  }}>1</div>
                  <div>
                    <h3 style={{ color: 'var(--green-800)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      Riscos Físicos (Grupo 1)
                    </h3>
                    <p style={{ margin: 0, color: 'var(--green-700)', fontSize: '1rem' }}>
                      Situações que colocam o trabalhador em contato com algum tipo de energia. Identificação na cor verde.
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '2rem', 
                  background: 'var(--red-50)', 
                  borderRadius: '1rem',
                  border: '2px solid var(--red-200)'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--red-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                  }}>2</div>
                  <div>
                    <h3 style={{ color: 'var(--red-800)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      Riscos Químicos (Grupo 2)
                    </h3>
                    <p style={{ margin: 0, color: 'var(--red-700)', fontSize: '1rem' }}>
                      Situações que colocam o trabalhador em contato com alguma substância química que pode ser absorvida pelo corpo. Identificação na cor vermelha.
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '2rem', 
                  background: '#fef3e2', 
                  borderRadius: '1rem',
                  border: '2px solid #fed7aa'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: '#a16207', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                  }}>3</div>
                  <div>
                    <h3 style={{ color: '#a16207', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      Riscos Biológicos (Grupo 3)
                    </h3>
                    <p style={{ margin: 0, color: '#92400e', fontSize: '1rem' }}>
                      Situações que colocam o trabalhador em contato com agentes biológicos. Identificação na cor marrom.
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '2rem', 
                  background: 'var(--yellow-50)', 
                  borderRadius: '1rem',
                  border: '2px solid var(--yellow-200)'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--yellow-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                  }}>4</div>
                  <div>
                    <h3 style={{ color: 'var(--yellow-800)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      Riscos Ergonômicos (Grupo 4)
                    </h3>
                    <p style={{ margin: 0, color: 'var(--yellow-700)', fontSize: '1rem' }}>
                      Situações que podem causar danos ou desconforto à saúde física. Identificação na cor amarela.
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '2rem', 
                  background: 'var(--blue-50)', 
                  borderRadius: '1rem',
                  border: '2px solid var(--blue-200)'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--blue-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                  }}>5</div>
                  <div>
                    <h3 style={{ color: 'var(--blue-800)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      Riscos de Acidentes (Grupo 5)
                    </h3>
                    <p style={{ margin: 0, color: 'var(--blue-700)', fontSize: '1rem' }}>
                      Situações que colocam o trabalhador em qualquer situação de vulnerabilidade. Identificação na cor azul.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questões de Avaliação */}
            <div style={{ 
              background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--neutral-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--neutral-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Questões de Avaliação
              </h2>
              
              {questionAnswers.map((qa, index) => (
                <div key={qa.id} style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  marginBottom: '2rem',
                  border: '1px solid var(--neutral-200)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: '600', 
                    color: 'var(--neutral-800)', 
                    marginBottom: '1.5rem'
                  }}>
                    {index + 1}. {qa.question}
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {qa.options.map((option) => (
                      <div key={option.letter} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        padding: '1rem',
                        background: option.correct ? 'var(--green-50)' : 'var(--neutral-50)',
                        borderRadius: '0.5rem',
                        border: option.correct ? '2px solid var(--green-300)' : '1px solid var(--neutral-200)'
                      }}>
                        <span style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          background: option.correct ? 'var(--green-500)' : 'var(--neutral-400)',
                          color: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          flexShrink: 0
                        }}>
                          {option.letter}
                        </span>
                        <span style={{ 
                          color: option.correct ? 'var(--green-800)' : 'var(--neutral-700)',
                          fontWeight: option.correct ? '600' : '400'
                        }}>
                          {option.text}
                          {option.correct && (
                            <span style={{ 
                              marginLeft: '0.5rem', 
                              color: 'var(--green-600)', 
                              fontSize: '0.9rem'
                            }}>
                              (correto)
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Cadeia Epidemiológica de Transmissão */}
            <div style={{ 
              background: 'linear-gradient(145deg, #fef7ff 0%, #fae8ff 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--purple-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--purple-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Cadeia Epidemiológica de Transmissão
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: 'var(--purple-700)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Todo quadro infeccioso que se instala em um paciente é decorrente de um ciclo denominado "Cadeia Epidemiológica de Transmissão". Este ciclo estabelece que um agente infeccioso pode ser transmitido por diferentes vias de contágio, porém, quando temos um agente infeccioso que encontra um hospedeiro susceptível, um processo patológico é possível de se instalar.
              </p>

              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                color: 'var(--purple-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Vias de Transmissão
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--blue-200)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--blue-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>🤝</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--blue-800)', marginBottom: '1rem' }}>
                    Contato
                  </h4>
                  <p style={{ color: 'var(--blue-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Pode ser direta, quando há contato entre dois corpos, ou indireta, quando há um material contaminado que entra em contato com um hospedeiro susceptível.
                  </p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--blue-50)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--blue-200)'
                  }}>
                    <strong style={{ color: 'var(--blue-800)' }}>Exemplo:</strong>
                    <span style={{ color: 'var(--blue-700)', marginLeft: '0.5rem' }}>Staphylococcus sp.</span>
                  </div>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--gray-200)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--gray-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>💨</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--gray-800)', marginBottom: '1rem' }}>
                    Ar
                  </h4>
                  <p style={{ color: 'var(--gray-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Dispersão de partículas que podem permanecer suspensas no ar por tempo prolongado.
                  </p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--gray-50)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--gray-200)'
                  }}>
                    <strong style={{ color: 'var(--gray-800)' }}>Exemplo:</strong>
                    <span style={{ color: 'var(--gray-700)', marginLeft: '0.5rem' }}>Tuberculose</span>
                  </div>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--cyan-200)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--cyan-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>💧</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--cyan-800)', marginBottom: '1rem' }}>
                    Perdigotos
                  </h4>
                  <p style={{ color: 'var(--cyan-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Dispersão pelo ar em distâncias inferiores a 90 cm.
                  </p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--cyan-50)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--cyan-200)'
                  }}>
                    <strong style={{ color: 'var(--cyan-800)' }}>Exemplo:</strong>
                    <span style={{ color: 'var(--cyan-700)', marginLeft: '0.5rem' }}>Vírus Influenza</span>
                  </div>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--orange-200)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--orange-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>🍽️</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--orange-800)', marginBottom: '1rem' }}>
                    Veículos Comuns
                  </h4>
                  <p style={{ color: 'var(--orange-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Alimento ou água contaminada.
                  </p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--orange-50)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--orange-200)'
                  }}>
                    <strong style={{ color: 'var(--orange-800)' }}>Exemplo:</strong>
                    <span style={{ color: 'var(--orange-700)', marginLeft: '0.5rem' }}>Salmonela</span>
                  </div>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--green-200)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--green-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>🦟</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--green-800)', marginBottom: '1rem' }}>
                    Vetores
                  </h4>
                  <p style={{ color: 'var(--green-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Insetos que transmitem agentes infecciosos.
                  </p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--green-50)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--green-200)'
                  }}>
                    <strong style={{ color: 'var(--green-800)' }}>Exemplo:</strong>
                    <span style={{ color: 'var(--green-700)', marginLeft: '0.5rem' }}>Malária</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Isolamento Hospitalar */}
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
                color: 'var(--red-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Medidas de Isolamento - ANVISA
              </h2>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--neutral-700)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Com base nessas vias de transmissão, a ANVISA estabelece medidas de prevenção e controle de agentes infecciosos, são barreiras chamadas de isolamento.
              </p>

              <div style={{ 
                background: 'linear-gradient(145deg, #fef2f2 0%, #fde8e8 100%)',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                border: '1px solid var(--red-200)'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '600', 
                  color: 'var(--red-800)', 
                  marginBottom: '1rem'
                }}>
                  Objetivo do Isolamento
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.7', 
                  color: 'var(--red-700)'
                }}>
                  Prevenir que microrganismos sejam disseminados entre os próprios pacientes e os profissionais. Pacientes colonizados por microrganismos resistentes e aqueles que estão aguardando resultado de exame laboratorial, porém, com suspeita de infecção, devem ser considerados elegíveis para internação em isolamento.
                </p>
              </div>

              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                color: 'var(--neutral-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Tipos de Isolamento
              </h3>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Isolamento por Contato */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--emerald-300)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      width: '3rem', 
                      height: '3rem', 
                      background: 'var(--emerald-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>🤝</div>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--emerald-800)' }}>
                      Isolamento por Contato
                    </h4>
                  </div>
                  <p style={{ color: 'var(--emerald-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                    Deve ser colocado nesse tipo de isolamento pessoas portadoras de microrganismos que são transmitidos pelo contato como a infecção por estafilococos e varicela.
                  </p>
                  <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--emerald-200)'
                  }}>
                    <strong style={{ color: 'var(--emerald-800)' }}>Precauções:</strong>
                    <span style={{ color: 'var(--emerald-700)', marginLeft: '0.5rem' }}>
                      Além da precaução padrão, uso de luvas e avental não estéril. Colocar antes da entrada no quarto e retirar antes da saída.
                    </span>
                  </div>
                </div>

                {/* Isolamento por Aerossol */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--blue-300)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      width: '3rem', 
                      height: '3rem', 
                      background: 'var(--blue-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>💨</div>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--blue-800)' }}>
                      Isolamento por Aerossol
                    </h4>
                  </div>
                  <p style={{ color: 'var(--blue-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                    Deve ser colocado nesse tipo de isolamento com pressão negativa, condições que sejam transmitidas pelo ar como a tuberculose e sarampo.
                  </p>
                  <div style={{ 
                    background: 'rgba(59, 130, 246, 0.1)', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--blue-200)'
                  }}>
                    <strong style={{ color: 'var(--blue-800)' }}>Precauções:</strong>
                    <span style={{ color: 'var(--blue-700)', marginLeft: '0.5rem' }}>
                      Além da precaução padrão, uso da máscara N95 antes da entrada no quarto. Porta deve permanecer fechada durante todo o período.
                    </span>
                  </div>
                </div>

                {/* Isolamento por Perdigoto */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--sky-300)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      width: '3rem', 
                      height: '3rem', 
                      background: 'var(--sky-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>💧</div>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--sky-800)' }}>
                      Isolamento por Perdigoto
                    </h4>
                  </div>
                  <p style={{ color: 'var(--sky-700)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                    Deve ser colocado neste tipo de isolamento com pressão negativa, condições que se transmita pelo ar como a infecção meningocócica e por haemophylus influenzae.
                  </p>
                  <div style={{ 
                    background: 'rgba(14, 165, 233, 0.1)', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--sky-200)'
                  }}>
                    <strong style={{ color: 'var(--sky-800)' }}>Precauções:</strong>
                    <span style={{ color: 'var(--sky-700)', marginLeft: '0.5rem' }}>
                      Além da precaução padrão, uso da máscara simples antes da entrada no quarto.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Termos sobre Limpeza */}
            <div style={{ 
              background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--slate-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--slate-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Termos sobre Limpeza
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--green-200)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--green-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2rem'
                  }}>🧽</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--green-800)', marginBottom: '1rem' }}>
                    Limpeza
                  </h3>
                  <p style={{ color: 'var(--green-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Remoção de todo material estranho a um objeto por meio do processo de lavagem.
                  </p>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--yellow-200)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--yellow-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2rem'
                  }}>🧪</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--yellow-800)', marginBottom: '1rem' }}>
                    Desinfecção
                  </h3>
                  <p style={{ color: 'var(--yellow-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Inativação de microrganismos patogênicos, por meio de métodos químicos e físicos.
                  </p>
                </div>

                <div style={{ 
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--red-200)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--red-500)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2rem'
                  }}>🔥</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--red-800)', marginBottom: '1rem' }}>
                    Esterilização
                  </h3>
                  <p style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Destruição completa de toda forma de vida microbiana por meio de diferentes processos.
                  </p>
                </div>
              </div>
            </div>

            {/* Classificação de Materiais */}
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
                color: 'var(--neutral-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Classificação de Materiais em Unidades de Saúde
              </h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Materiais Críticos */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #fef2f2 0%, #fde8e8 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--red-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--red-800)', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'var(--red-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700'
                    }}>C</div>
                    Materiais Críticos - Esterilização
                  </h3>
                  <p style={{ color: 'var(--red-700)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    Devem ser submetidos a procedimentos de esterilização, como é o caso dos materiais cirúrgicos.
                  </p>
                  
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--red-800)', marginBottom: '1rem' }}>
                    Métodos de Esterilização:
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'white', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--red-200)'
                    }}>
                      <strong style={{ color: 'var(--red-800)' }}>Autoclavagem:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>
                        Vapor d'água em altas pressões
                      </span>
                    </div>
                    <div style={{ 
                      background: 'white', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--red-200)'
                    }}>
                      <strong style={{ color: 'var(--red-800)' }}>Radiação ionizante:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>
                        Para materiais termossensíveis
                      </span>
                    </div>
                    <div style={{ 
                      background: 'white', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--red-200)'
                    }}>
                      <strong style={{ color: 'var(--red-800)' }}>Óxido de etileno:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>
                        Para plásticos e borracha
                      </span>
                    </div>
                    <div style={{ 
                      background: 'white', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--red-200)'
                    }}>
                      <strong style={{ color: 'var(--red-800)' }}>Calor seco:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>
                        160-180°C por até 2 horas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Materiais Semicríticos */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #fefce8 0%, #fef3c7 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--amber-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--amber-800)', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'var(--amber-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700'
                    }}>SC</div>
                    Materiais Semicríticos - Desinfecção de Alto Nível
                  </h3>
                  <p style={{ color: 'var(--amber-700)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Devem ser submetidos ao processo de desinfecção de alto nível, que tem ação em diversos microrganismos, exceto em esporos bacterianos.
                  </p>
                  <div style={{ 
                    background: 'white', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--amber-200)'
                  }}>
                    <strong style={{ color: 'var(--amber-800)' }}>Exemplos:</strong>
                    <span style={{ color: 'var(--amber-700)', marginLeft: '0.5rem' }}>
                      Circuitos de terapia respiratória, umidificadores, inspirômetros, inaladores, ambu e peak flow
                    </span>
                  </div>
                </div>

                {/* Materiais Não Críticos */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid var(--green-300)'
                }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: 'var(--green-800)', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'var(--green-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700'
                    }}>NC</div>
                    Materiais Não Críticos - Desinfecção de Baixo Nível
                  </h3>
                  <p style={{ color: 'var(--green-700)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Devem ser submetidos à desinfecção de baixo nível antes e após o contato com o paciente utilizando álcool 70%.
                  </p>
                  <div style={{ 
                    background: 'white', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--green-200)'
                  }}>
                    <strong style={{ color: 'var(--green-800)' }}>Exemplos:</strong>
                    <span style={{ color: 'var(--green-700)', marginLeft: '0.5rem' }}>
                      Estetoscópio, esfigmomanômetro e superfícies
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ 
                background: 'linear-gradient(145deg, #f3f4f6 0%, #e5e7eb 100%)',
                borderRadius: '1rem',
                padding: '2rem',
                marginTop: '2rem',
                border: '1px solid var(--gray-300)'
              }}>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.7', 
                  color: 'var(--gray-700)',
                  textAlign: 'center'
                }}>
                  <strong style={{ color: 'var(--gray-800)' }}>Importante:</strong> Todos os materiais que possam ser reutilizados no tratamento fisioterapêutico necessitam ser encaminhados para a sala de utilidades, um local chamado expurgo, de onde os equipamentos serão destinados à central de material para o correto processo de desinfecção ou esterilização.
                </p>
              </div>
            </div>

            {/* Classificação de Resíduos */}
            <div style={{ 
              background: 'linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)',
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '3rem',
              border: '1px solid var(--gray-200)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-800)', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Classificação de Resíduos Hospitalares
              </h2>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Grupo A */}
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
                    <div style={{ 
                      width: '3rem', 
                      height: '3rem', 
                      background: 'var(--red-500)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1.2rem'
                    }}>A</div>
                    Grupo A - Resíduos Biológicos
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--red-200)' }}>
                      <strong style={{ color: 'var(--red-800)' }}>A1:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>Possível presença de agentes biológicos</span>
                    </div>
                    <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--red-200)' }}>
                      <strong style={{ color: 'var(--red-800)' }}>A2:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>Culturas, bolsas transfusionais, amostras</span>
                    </div>
                    <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--red-200)' }}>
                      <strong style={{ color: 'var(--red-800)' }}>A3:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>Peças anatômicas de animais</span>
                    </div>
                    <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--red-200)' }}>
                      <strong style={{ color: 'var(--red-800)' }}>A4:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>Peças anatômicas de seres humanos</span>
                    </div>
                    <div style={{ background: 'var(--red-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--red-200)' }}>
                      <strong style={{ color: 'var(--red-800)' }}>A5:</strong>
                      <span style={{ color: 'var(--red-700)', marginLeft: '0.5rem' }}>Órgãos, tecidos e fluidos</span>
                    </div>
                  </div>
                </div>

                {/* Demais Grupos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ 
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--orange-200)'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: '700', 
                      color: 'var(--orange-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        background: 'var(--orange-500)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700'
                      }}>B</div>
                      Grupo B
                    </h4>
                    <p style={{ color: 'var(--orange-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Substâncias químicas, produtos hormonais, desinfetantes e resíduos farmacêuticos.
                    </p>
                  </div>

                  <div style={{ 
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--purple-200)'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: '700', 
                      color: 'var(--purple-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        background: 'var(--purple-500)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700'
                      }}>C</div>
                      Grupo C
                    </h4>
                    <p style={{ color: 'var(--purple-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Materiais com radionuclídeos de laboratórios de pesquisa e ensino.
                    </p>
                  </div>

                  <div style={{ 
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--green-200)'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: '700', 
                      color: 'var(--green-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        background: 'var(--green-500)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700'
                      }}>D</div>
                      Grupo D
                    </h4>
                    <p style={{ color: 'var(--green-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Material sem risco biológico: fraldas, papel higiênico, restos de alimentos, gesso.
                    </p>
                  </div>

                  <div style={{ 
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '2px solid var(--blue-200)'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: '700', 
                      color: 'var(--blue-800)', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        background: 'var(--blue-500)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700'
                      }}>E</div>
                      Grupo E
                    </h4>
                    <p style={{ color: 'var(--blue-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Materiais perfurocortantes: agulhas, bisturis, ampolas de vidro.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ 
                background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '1rem',
                padding: '2rem',
                marginTop: '2rem',
                border: '1px solid var(--amber-300)'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: 'var(--amber-800)', 
                  marginBottom: '1rem'
                }}>
                  Procedimentos de Descarte
                </h3>
                <ul style={{ 
                  paddingLeft: '1.5rem', 
                  color: 'var(--amber-700)', 
                  lineHeight: '1.7',
                  fontSize: '1rem'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>A1 e A2 infecciosos:</strong> Precisam ser tratados dentro da unidade antes do descarte
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>A2 (sem agentes), A3, A4, A5:</strong> Apenas contidos em sacos plásticos dentro de recipiente lavável
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Material com putrefação:</strong> Manter sob refrigeração após 24h até retirada para incineração
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Grupo E:</strong> Descarte em recipiente rígido com símbolo de risco biológico
                  </li>
                </ul>
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
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
      `}</style>
    </div>
  );
};

export default NormasBiosseguranca1;

