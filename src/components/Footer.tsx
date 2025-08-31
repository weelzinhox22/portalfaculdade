import React from 'react';
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

interface SocialLink {
  icon: React.ComponentType<{ size: number }>;
  href: string;
  label: string;
}

interface NavigationLink {
  name: string;
  href: string;
}

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks: SocialLink[] = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  const navigationLinks: NavigationLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
    { name: 'Simulados', href: '/simulados' },
    { name: 'Questões', href: '/questoes' },
    { name: 'Comunidade', href: '/questoes-comunidade' }
  ];

  const specialtyLinks: NavigationLink[] = [
    { name: 'Saúde do Atleta', href: '/saude-atleta' },
    { name: 'Unidade Hospitalar', href: '/unidade-hospitalar' },
    { name: 'Saúde do Idoso', href: '/saude-idoso' },
    { name: 'Neurofuncional', href: '/neurofuncional' },
    { name: 'Ferramentas', href: '/ferramentas-calculo' }
  ];

  const legalLinks: NavigationLink[] = [
    { name: 'Política de Privacidade', href: '/politica-privacidade' },
    { name: 'Política de Cookies', href: '/politica-cookies' },
    { name: 'Termos de Uso', href: '/termos-uso' },
    { name: 'Suporte', href: '/contato' }
  ];

  return (
    <>
      <style>
        {`
          .footer {
            background: linear-gradient(135deg, var(--gray-800) 0%, var(--gray-900) 100%);
            color: var(--gray-200);
            position: relative;
            overflow: hidden;
          }

          .footer-decorative-line {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, var(--brand-primary) 50%, transparent 100%);
          }

          .footer-decorative-circle-1 {
            position: absolute;
            top: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%);
            border-radius: 50%;
          }

          .footer-decorative-circle-2 {
            position: absolute;
            bottom: -30px;
            left: -30px;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
            border-radius: 50%;
          }

          .footer-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 var(--space-xl);
            position: relative;
            z-index: 1;
          }

          .footer-newsletter {
            background: var(--gradient-primary);
            border-radius: var(--radius-2xl);
            margin: 0 0 var(--space-3xl) 0;
            overflow: hidden;
            box-shadow: var(--shadow-2xl);
          }

          .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--space-2xl);
            padding: var(--space-2xl) 0;
            border-bottom: 1px solid var(--gray-700);
          }

          .footer-brand {
            max-width: 350px;
          }

          .footer-brand-header {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-lg);
          }

          .footer-brand-icon {
            width: 48px;
            height: 48px;
            background: var(--gradient-primary);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .footer-brand-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin: 0;
          }

          .footer-brand-subtitle {
            font-size: 0.875rem;
            color: var(--gray-400);
            margin: 0;
          }

          .footer-brand-description {
            color: var(--gray-300);
            line-height: 1.6;
            margin-bottom: var(--space-xl);
            font-size: 0.95rem;
          }

          .footer-social-links {
            display: flex;
            gap: var(--space-md);
          }

          .footer-social-link {
            width: 44px;
            height: 44px;
            background: rgba(148, 163, 184, 0.1);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--gray-400);
            text-decoration: none;
            transition: all var(--transition-base);
            border: 1px solid rgba(148, 163, 184, 0.2);
          }

          .footer-social-link:hover {
            background: rgba(13, 148, 136, 0.2);
            color: var(--brand-primary);
            border-color: rgba(13, 148, 136, 0.3);
            transform: translateY(-2px);
          }

          .footer-section-title {
            color: white;
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: var(--space-lg);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }

          .footer-links-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }

          .footer-link {
            color: var(--gray-300);
            text-decoration: none;
            font-size: 0.95rem;
            transition: all var(--transition-base);
            display: inline-block;
          }

          .footer-link:hover {
            color: var(--brand-primary);
            transform: translateX(4px);
          }

          .footer-contact-info {
            margin-bottom: var(--space-xl);
          }

          .footer-contact-item {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
            color: var(--gray-300);
            font-size: 0.95rem;
          }

          .footer-contact-link {
            color: var(--gray-300);
            text-decoration: none;
            transition: color var(--transition-base);
          }

          .footer-contact-link:hover {
            color: var(--brand-primary);
          }

          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-xl) 0;
            flex-wrap: wrap;
            gap: var(--space-md);
          }

          .footer-copyright {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            color: var(--gray-400);
            font-size: 0.9rem;
          }

          .footer-back-to-top {
            background: rgba(13, 148, 136, 0.2);
            border: 1px solid rgba(13, 148, 136, 0.3);
            border-radius: var(--radius-lg);
            padding: var(--space-md);
            color: var(--brand-primary);
            cursor: pointer;
            transition: all var(--transition-base);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            font-size: 0.875rem;
            font-weight: 500;
          }

          .footer-back-to-top:hover {
            background: rgba(13, 148, 136, 0.3);
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .footer-content {
              grid-template-columns: 1fr;
              gap: var(--space-xl);
              padding: var(--space-xl) 0;
            }

            .footer-bottom {
              flex-direction: column;
              text-align: center;
              gap: var(--space-lg);
            }

            .footer-container {
              padding: 0 var(--space-md);
            }
          }
        `}
      </style>
      <footer className="footer">
        <div className="footer-decorative-line" />
        <div className="footer-decorative-circle-1" />
        <div className="footer-decorative-circle-2" />

        <div className="footer-container">
          <div className="footer-newsletter">
            <Newsletter variant="footer" />
          </div>

          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-brand-header">
                <div className="footer-brand-icon">
                  <Stethoscope size={24} color="white" />
                </div>
                <div>
                  <h3 className="footer-brand-title">FisioNeo</h3>
                  <p className="footer-brand-subtitle">Portal de Fisioterapia</p>
                </div>
              </div>

              <p className="footer-brand-description">
                Portal acadêmico desenvolvido para organizar e centralizar conteúdos
                de estudo das principais especialidades da fisioterapia, oferecendo
                recursos educacionais de qualidade para estudantes e profissionais.
              </p>

              <div className="footer-social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="footer-social-link"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="footer-section-title">
                <BookOpen size={20} />
                Navegação
              </h4>
              <ul className="footer-links-list">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-section-title">
                <Award size={20} />
                Especialidades
              </h4>
              <ul className="footer-links-list">
                {specialtyLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-section-title">
                <Users size={20} />
                Suporte & Legal
              </h4>

              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <Mail size={16} />
                  <a href="mailto:fisiowel@gmail.com" className="footer-contact-link">
                    fisiowel@gmail.com
                  </a>
                </div>

                <div className="footer-contact-item">
                  <MapPin size={16} />
                  <span>Brasil</span>
                </div>
              </div>

              <ul className="footer-links-list">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <span>© 2025 FisioNeo</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Feito com <Heart size={14} color="#ef4444" /> para fisioterapeutas
              </span>
            </div>

            <button onClick={scrollToTop} className="footer-back-to-top">
              <ArrowUp size={16} />
              Voltar ao topo
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;