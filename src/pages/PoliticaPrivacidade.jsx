import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Users, Mail, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PoliticaPrivacidade = () => {
  const navigate = useNavigate()

  const sections = [
    {
      icon: <Shield size={24} />,
      title: "1. Informações que Coletamos",
      content: [
        "Dados de cadastro: nome, e-mail, instituição de ensino, curso e período",
        "Dados de navegação: páginas visitadas, tempo de permanência, dispositivo utilizado",
        "Dados de interação: questões respondidas, desempenho em simulados, anotações pessoais",
        "Dados de comunicação: mensagens enviadas através de formulários de contato"
      ]
    },
    {
      icon: <Eye size={24} />,
      title: "2. Como Utilizamos suas Informações",
      content: [
        "Personalizar sua experiência de aprendizado",
        "Fornecer estatísticas de desempenho e progresso",
        "Enviar comunicações relevantes sobre atualizações da plataforma",
        "Melhorar nossos serviços através de análises de uso",
        "Responder a dúvidas e solicitações de suporte"
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "3. Proteção dos seus Dados",
      content: [
        "Utilizamos criptografia SSL para proteger a transmissão de dados",
        "Armazenamos informações em servidores seguros com acesso restrito",
        "Implementamos medidas de segurança técnicas e organizacionais",
        "Realizamos backups regulares para prevenir perda de dados",
        "Limitamos o acesso aos dados apenas a funcionários autorizados"
      ]
    },
    {
      icon: <Users size={24} />,
      title: "4. Compartilhamento de Informações",
      content: [
        "Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros",
        "Podemos compartilhar dados agregados e anonimizados para fins estatísticos",
        "Em caso de obrigação legal, podemos divulgar informações às autoridades competentes",
        "Parceiros de serviço podem ter acesso limitado aos dados para operação da plataforma"
      ]
    },
    {
      icon: <Mail size={24} />,
      title: "5. Seus Direitos",
      content: [
        "Acessar e visualizar seus dados pessoais",
        "Corrigir informações incorretas ou desatualizadas",
        "Solicitar a exclusão de sua conta e dados associados",
        "Portabilidade dos seus dados para outras plataformas",
        "Revogar consentimentos dados anteriormente"
      ]
    },
    {
      icon: <Calendar size={24} />,
      title: "6. Retenção de Dados",
      content: [
        "Mantemos seus dados enquanto sua conta estiver ativa",
        "Dados de desempenho são mantidos para fins educacionais",
        "Após exclusão da conta, dados são removidos em até 30 dias",
        "Alguns dados podem ser mantidos por obrigações legais",
        "Logs de segurança são mantidos por até 12 meses"
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
                Política de Privacidade
              </h1>
              <p style={{
                margin: 0,
                color: '#6b7280',
                fontSize: '1.1rem'
              }}>
                Como protegemos e utilizamos suas informações pessoais
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
              Esta política descreve como o FisioNeo coleta, usa e protege suas informações pessoais.
              Ao usar nossa plataforma, você concorda com as práticas descritas nesta política.
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
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                      background: '#3b82f6',
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
            Dúvidas sobre Privacidade?
          </h2>
          <p style={{
            margin: '0 0 1.5rem 0',
            color: '#6b7280',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            Se você tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus dados,
            entre em contato conosco.
          </p>
          <button
            onClick={() => navigate('/contato')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
              e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <Mail size={20} />
            Entrar em Contato
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default PoliticaPrivacidade
