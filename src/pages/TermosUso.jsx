import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Users, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TermosUso = () => {
  const navigate = useNavigate()

  const sections = [
    {
      icon: <FileText size={24} />,
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e usar o FisioNeo, você concorda em cumprir estes termos de uso",
        "Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma",
        "Reservamo-nos o direito de modificar estes termos a qualquer momento",
        "Mudanças significativas serão comunicadas com antecedência de 30 dias"
      ]
    },
    {
      icon: <Users size={24} />,
      title: "2. Elegibilidade e Cadastro",
      content: [
        "Você deve ter pelo menos 16 anos para usar nossa plataforma",
        "Estudantes menores de 18 anos devem ter autorização dos responsáveis",
        "Você é responsável por manter suas informações de cadastro atualizadas",
        "É proibido criar múltiplas contas para a mesma pessoa",
        "Você deve fornecer informações verdadeiras e precisas"
      ]
    },
    {
      icon: <CheckCircle size={24} />,
      title: "3. Uso Permitido",
      content: [
        "Usar a plataforma para fins educacionais e de estudo",
        "Compartilhar conhecimento através das questões da comunidade",
        "Participar de discussões construtivas nos fóruns",
        "Reportar problemas técnicos ou conteúdo inadequado",
        "Sugerir melhorias para a plataforma"
      ]
    },
    {
      icon: <XCircle size={24} />,
      title: "4. Uso Proibido",
      content: [
        "Compartilhar contas ou credenciais de acesso com terceiros",
        "Usar a plataforma para fins comerciais sem autorização",
        "Publicar conteúdo ofensivo, discriminatório ou inadequado",
        "Tentar hackear, quebrar ou contornar medidas de segurança",
        "Copiar ou redistribuir conteúdo sem permissão",
        "Usar bots ou scripts automatizados"
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "5. Propriedade Intelectual",
      content: [
        "Todo conteúdo da plataforma é protegido por direitos autorais",
        "Questões criadas por usuários são licenciadas para uso educacional",
        "Você mantém os direitos sobre o conteúdo que criar",
        "Ao publicar conteúdo, você nos concede licença para uso na plataforma",
        "Respeitamos os direitos de propriedade intelectual de terceiros"
      ]
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "6. Limitações de Responsabilidade",
      content: [
        "A plataforma é fornecida 'como está', sem garantias expressas",
        "Não garantimos disponibilidade ininterrupta do serviço",
        "Não somos responsáveis por decisões baseadas no conteúdo da plataforma",
        "O uso da plataforma não substitui orientação profissional qualificada",
        "Limitamos nossa responsabilidade aos termos permitidos por lei"
      ]
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '2rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#6b7280',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e5e7eb'
                e.target.style.color = '#374151'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f3f4f6'
                e.target.style.color = '#6b7280'
              }}
            >
              <ArrowLeft size={20} />
            </button>
            
            <div>
              <h1 style={{
                margin: '0 0 0.5rem 0',
                color: '#1f2937',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                Termos de Uso
              </h1>
              <p style={{
                margin: 0,
                color: '#6b7280',
                fontSize: '1.1rem'
              }}>
                Regras e diretrizes para uso da plataforma FisioNeo
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '1rem',
            marginTop: '1.5rem'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              <br />
              Estes termos estabelecem as regras para uso da plataforma FisioNeo.
              Ao criar uma conta ou usar nossos serviços, você concorda com todos os termos descritos.
            </p>
          </div>
        </motion.div>

        {/* Seções */}
        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '2rem',
                padding: '2rem',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: section.title.includes('Proibido') ? 
                    'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                    section.title.includes('Permitido') ?
                    'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {section.icon}
                </div>
                <h2 style={{
                  margin: 0,
                  color: '#1f2937',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {section.title}
                </h2>
              </div>

              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none'
              }}>
                {section.content.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                      color: '#4b5563',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: section.title.includes('Proibido') ? '#ef4444' :
                                 section.title.includes('Permitido') ? '#10b981' : '#3b82f6',
                      borderRadius: '50%',
                      marginTop: '0.6rem',
                      flexShrink: 0
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Seções Adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '2rem',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
          }}
        >
          <h2 style={{
            margin: '0 0 1.5rem 0',
            color: '#1f2937',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            7. Modificações e Cancelamento
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{
                margin: '0 0 1rem 0',
                color: '#374151',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                Modificações dos Termos
              </h3>
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none'
              }}>
                <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                  • Podemos atualizar estes termos periodicamente
                </li>
                <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                  • Usuários serão notificados sobre mudanças importantes
                </li>
                <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                  • Uso continuado implica aceitação dos novos termos
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{
                margin: '0 0 1rem 0',
                color: '#374151',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                Cancelamento de Conta
              </h3>
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none'
              }}>
                <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                  • Você pode cancelar sua conta a qualquer momento
                </li>
                <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                  • Podemos suspender contas que violem os termos
                </li>
                <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                  • Dados são removidos conforme política de privacidade
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '2rem',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            margin: '0 0 1rem 0',
            color: '#1f2937',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Dúvidas sobre os Termos?
          </h2>
          <p style={{
            margin: '0 0 1.5rem 0',
            color: '#6b7280',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            Se você tiver dúvidas sobre estes termos de uso ou precisar de esclarecimentos,
            nossa equipe está pronta para ajudar.
          </p>
          <button
            onClick={() => navigate('/contato')}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <FileText size={20} />
            Esclarecer Dúvidas
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default TermosUso
