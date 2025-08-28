import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Eye, Target, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useMobile from '../hooks/useMobile';

const PoliticaCookies = () => {
  const isMobile = useMobile();

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem',
              marginBottom: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto'
            }}>
              <Cookie size={40} color="white" />
            </div>

            <h1 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              🍪 Política de Cookies
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280'
            }}>
              Transparência total sobre como usamos cookies no FisioEstudos
            </p>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'white',
              borderRadius: '2rem',
              padding: '3rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Shield size={24} color="#10b981" />
                  O que são Cookies?
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita nosso site. 
                  Eles nos ajudam a melhorar sua experiência e fornecer funcionalidades personalizadas.
                </p>
              </section>

              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Settings size={24} color="#8b5cf6" />
                  Tipos de Cookies que Usamos
                </h2>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {[
                    {
                      titulo: '🔧 Cookies Necessários',
                      descricao: 'Essenciais para o funcionamento básico do site, como autenticação e navegação.',
                      exemplos: 'Login, carrinho de compras, preferências de idioma',
                      obrigatorio: true
                    },
                    {
                      titulo: '⚙️ Cookies Funcionais',
                      descricao: 'Melhoram a funcionalidade do site e personalizam sua experiência.',
                      exemplos: 'Lembrar preferências, tema escuro/claro, favoritos',
                      obrigatorio: false
                    },
                    {
                      titulo: '📊 Cookies de Análise',
                      descricao: 'Nos ajudam a entender como você usa o site para melhorarmos.',
                      exemplos: 'Google Analytics, tempo de permanência, páginas visitadas',
                      obrigatorio: false
                    },
                    {
                      titulo: '🎯 Cookies de Marketing',
                      descricao: 'Usados para mostrar anúncios relevantes e medir campanhas.',
                      exemplos: 'Google Ads, Facebook Pixel, remarketing',
                      obrigatorio: false
                    }
                  ].map((tipo, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        borderRadius: '1rem',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>
                        {tipo.titulo}
                        {tipo.obrigatorio && (
                          <span style={{
                            background: '#ef4444',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.75rem',
                            marginLeft: '0.5rem'
                          }}>
                            Obrigatório
                          </span>
                        )}
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '0.5rem'
                      }}>
                        {tipo.descricao}
                      </p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        fontStyle: 'italic'
                      }}>
                        <strong>Exemplos:</strong> {tipo.exemplos}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Eye size={24} color="#0ea5e9" />
                  Seus Direitos
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {[
                    'Aceitar ou rejeitar cookies não essenciais',
                    'Alterar suas preferências a qualquer momento',
                    'Solicitar informações sobre dados coletados',
                    'Solicitar exclusão dos seus dados',
                    'Acessar e corrigir suas informações pessoais'
                  ].map((direito, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        color: '#374151'
                      }}
                    >
                      <span style={{ color: '#10b981' }}>✅</span>
                      {direito}
                    </li>
                  ))}
                </ul>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  📞 Contato
                </h2>
                <p>
                  Se você tiver dúvidas sobre nossa política de cookies, entre em contato conosco:
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1rem 0',
                  color: '#0ea5e9'
                }}>
                  <li>📧 Email: privacidade@fisioestudos.com</li>
                  <li>📱 WhatsApp: (11) 99999-9999</li>
                  <li>🌐 Site: www.fisioestudos.com/contato</li>
                </ul>
              </section>

              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <p style={{
                  color: '#166534',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  <strong>🔒 Última atualização:</strong> Janeiro de 2024<br />
                  Estamos comprometidos com sua privacidade e transparência.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PoliticaCookies;
