import { Link } from 'react-router-dom';
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Github,
  BookOpen,
  Users,
  Award,
  Stethoscope,
  ArrowUp
} from 'lucide-react';
import Newsletter from './Newsletter';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, #0d9488 50%, transparent 100%)'
      }} />

      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Newsletter Section */}
        <div style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
          borderRadius: '2rem',
          margin: '0 0 4rem 0',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
        }}>
          <Newsletter variant="footer" />
        </div>

        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          padding: '3rem 0',
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          {/* Brand Section */}
          <div style={{ maxWidth: '350px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Stethoscope size={24} color="white" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0
                }}>
                  FisioNeo
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  margin: 0
                }}>
                  Portal de Fisioterapia
                </p>
              </div>
            </div>

            <p style={{
              color: '#cbd5e1',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontSize: '0.95rem'
            }}>
              Portal acadêmico desenvolvido para organizar e centralizar conteúdos
              de estudo das principais especialidades da fisioterapia, oferecendo
              recursos educacionais de qualidade para estudantes e profissionais.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(148, 163, 184, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(148, 163, 184, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(13, 148, 136, 0.2)';
                    e.target.style.color = '#0d9488';
                    e.target.style.borderColor = 'rgba(13, 148, 136, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(148, 163, 184, 0.1)';
                    e.target.style.color = '#94a3b8';
                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BookOpen size={20} />
              Navegação
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { name: 'Home', href: '/' },
                { name: 'Sobre', href: '/sobre' },
                { name: 'Contato', href: '/contato' },
                { name: 'Simulados', href: '/simulados' },
                { name: 'Questões', href: '/questoes' },
                { name: 'Comunidade', href: '/questoes-comunidade' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    style={{
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#0d9488';
                      e.target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#cbd5e1';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Award size={20} />
              Especialidades
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { name: 'Saúde do Atleta', href: '/saude-atleta' },
                { name: 'Unidade Hospitalar', href: '/unidade-hospitalar' },
                { name: 'Saúde do Idoso', href: '/saude-idoso' },
                { name: 'Neurofuncional', href: '/neurofuncional' },
                { name: 'Ferramentas', href: '/ferramentas-calculo' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    style={{
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#0d9488';
                      e.target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#cbd5e1';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Users size={20} />
              Suporte & Legal
            </h4>

            {/* Contact Info */}
            <div style={{
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                color: '#cbd5e1',
                fontSize: '0.95rem'
              }}>
                <Mail size={16} />
                <a
                  href="mailto:fisiowel@gmail.com"
                  style={{
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#0d9488'}
                  onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                >
                  fisiowel@gmail.com
                </a>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#cbd5e1',
                fontSize: '0.95rem'
              }}>
                <MapPin size={16} />
                <span>Brasil</span>
              </div>
            </div>

            {/* Legal Links */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { name: 'Política de Privacidade', href: '/politica-privacidade' },
                { name: 'Termos de Uso', href: '/termos-uso' },
                { name: 'Suporte', href: '/contato' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    style={{
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#0d9488';
                      e.target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#cbd5e1';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem 0',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}>
            <span>© 2025 FisioNeo</span>
            <span>•</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Feito com <Heart size={14} color="#ef4444" /> para fisioterapeutas
            </span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(13, 148, 136, 0.2)',
              border: '1px solid rgba(13, 148, 136, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem',
              color: '#0d9488',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(13, 148, 136, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(13, 148, 136, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <ArrowUp size={16} />
            Voltar ao topo
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;