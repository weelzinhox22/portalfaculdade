import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogIn, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './header.css';

interface DropdownItem {
  name: string;
  href: string;
  icon?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const isActive = (href: string): boolean => location.pathname === href;

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'Livros',
      href: '/livros',
      badge: 'R$ 15',
      badgeColor: '#f59e0b',
      highlight: true
    },
    {
      name: 'Cursos',
      href: '/cursos',
      badge: 'Em Breve',
      badgeColor: '#8b5cf6',
      highlight: true
    },
    {
      name: 'Especialidades',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Saúde do Atleta', href: '/saude-atleta', icon: '🏃‍♂️', description: 'Fisioterapia esportiva completa', badge: 'Completo', badgeColor: '#10b981' },
        { name: 'Unidade Hospitalar', href: '/unidade-hospitalar', icon: '🏥', description: 'Fisioterapia hospitalar', badge: 'Completo', badgeColor: '#10b981' },
        { name: 'Saúde do Idoso', href: '/saude-idoso', icon: '👴', description: 'Geriatria e gerontologia', badge: 'Completo', badgeColor: '#10b981' },
        { name: 'Neurofuncional', href: '/neurofuncional', icon: '🧠', description: 'Reabilitação neurológica', badge: 'Completo', badgeColor: '#10b981' },
        { name: 'Fisioterapia Respiratória', href: '/respiratoria', icon: '🫁', description: 'Técnicas respiratórias e ventilação', badge: 'Novo', badgeColor: '#0ea5e9' },
        { name: 'Fisioterapia Ortopédica', href: '/ortopedica', icon: '🦴', description: 'Lesões musculoesqueléticas', badge: 'Novo', badgeColor: '#0ea5e9' },
        { name: 'Fisioterapia Esportiva', href: '/esportiva', icon: '⚽', description: 'Prevenção e reabilitação esportiva', badge: 'Em Breve', badgeColor: '#8b5cf6' },
        { name: 'Fisioterapia Pediátrica', href: '/pediatrica', icon: '👶', description: 'Desenvolvimento infantil', badge: 'Em Breve', badgeColor: '#8b5cf6' }
      ]
    },
    {
      name: 'Quiz',
      href: '/quiz',
      badge: 'Novo',
      badgeColor: '#8b5cf6'
    },
    {
      name: 'Fórum',
      href: '/forum',
      badge: 'Comunidade',
      badgeColor: '#10b981'
    },
    {
      name: 'Blog',
      href: '/blog',
      badge: '12 Artigos',
      badgeColor: '#0ea5e9'
    },
    {
      name: 'Mais',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Newsletter', href: '/newsletter', icon: '📧', description: 'Conteúdo exclusivo semanal', badge: 'Grátis', badgeColor: '#10b981' },
        { name: 'Downloads', href: '/downloads', icon: '📱', description: 'Materiais gratuitos', badge: 'Grátis', badgeColor: '#10b981' },
        { name: 'Questões', href: '/questoes', icon: '❓', description: 'Banco de questões comentadas' },
        { name: 'Simulados', href: '/simulados', icon: '📝', description: 'Simulados completos' },
        { name: 'Calculadoras', href: '/ferramentas-calculo', icon: '🧮', description: 'Ferramentas clínicas' },
        { name: 'Sobre Nós', href: '/sobre', icon: 'ℹ️', description: 'Nossa história e missão' },
        { name: 'Contato', href: '/contato', icon: '📞', description: 'Fale conosco' },
        { name: 'Política de Cookies', href: '/politica-cookies', icon: '🍪', description: 'Privacidade e cookies' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
    if (!showSearchModal) {
      setTimeout(() => {
        const searchInput = document.getElementById('header-search-input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownEnter = (itemName: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.color = 'var(--brand-primary)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.color = 'var(--gray-700)';
  };

  return (
    <>
      <style>
        {`
          .header-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            height: 60px;
            background: ${isScrolled 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(255, 255, 255, 0.98)'};
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: ${isScrolled 
              ? '1px solid var(--gray-200)' 
              : '1px solid transparent'};
            transition: all var(--transition-base);
            box-shadow: ${isScrolled ? 'var(--shadow-sm)' : 'none'};
          }

          .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 var(--space-md);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .logo {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--gray-800);
            text-decoration: none;
            letter-spacing: -0.025em;
            transition: color var(--transition-base);
          }

          .logo:hover {
            color: var(--brand-primary);
          }

          .nav-desktop {
            display: none;
            align-items: center;
            gap: var(--space-xs);
          }

          .nav-link {
            padding: var(--space-sm) var(--space-md);
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--gray-600);
            text-decoration: none;
            border-radius: var(--radius-lg);
            transition: all var(--transition-base);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            position: relative;
          }

          .nav-link:hover {
            color: var(--gray-800);
            background: var(--gray-100);
          }

          .nav-link.active {
            color: var(--brand-primary);
            background: rgba(13, 148, 136, 0.1);
          }

          .nav-link.highlight {
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            border: 1px solid rgba(14, 165, 233, 0.2);
            font-weight: 600;
          }

          .nav-link.highlight:hover {
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
          }

          .dropdown-button {
            padding: var(--space-sm) var(--space-md);
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--gray-600);
            background: none;
            border: none;
            border-radius: var(--radius-lg);
            transition: all var(--transition-base);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: var(--space-xs);
          }

          .dropdown-button:hover {
            color: var(--gray-800);
            background: var(--gray-100);
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            padding-top: var(--space-sm);
            z-index: 50;
          }

          .dropdown-content {
            background: white;
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--gray-200);
            min-width: 280px;
            padding: var(--space-md);
            animation: fadeInUp 0.2s ease-out;
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            padding: var(--space-md);
            border-radius: var(--radius-md);
            text-decoration: none;
            color: var(--gray-700);
            transition: all var(--transition-base);
            margin-bottom: var(--space-xs);
          }

          .dropdown-item:hover {
            background: var(--gray-50);
            transform: translateX(4px);
          }

          .action-buttons {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }

          .action-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            color: var(--gray-600);
            cursor: pointer;
            border-radius: var(--radius-md);
            transition: all var(--transition-base);
          }

          .action-btn:hover {
            background: var(--gray-100);
            color: var(--gray-800);
          }

          .action-btn.primary {
            color: var(--brand-primary);
          }

          .action-btn.primary:hover {
            background: rgba(13, 148, 136, 0.1);
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-overlay);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999;
          }

          .mobile-menu {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            z-index: 1000;
            max-height: calc(100vh - 60px);
            overflow-y: auto;
            border-top: 1px solid var(--gray-200);
            box-shadow: var(--shadow-lg);
          }

          .mobile-menu-content {
            padding: var(--space-md);
          }

          .mobile-nav-item {
            margin-bottom: var(--space-sm);
          }

          .mobile-nav-link {
            display: block;
            padding: var(--space-md);
            color: var(--gray-700);
            text-decoration: none;
            font-weight: 500;
            border-radius: var(--radius-md);
            transition: all var(--transition-base);
          }

          .mobile-nav-link:hover,
          .mobile-nav-link.active {
            color: var(--brand-primary);
            background: rgba(13, 148, 136, 0.1);
          }

          .mobile-dropdown-header {
            padding: var(--space-md);
            font-weight: 600;
            color: var(--gray-800);
            border-bottom: 1px solid var(--gray-200);
            margin-bottom: var(--space-sm);
          }

          .mobile-dropdown-item {
            display: block;
            padding: var(--space-md) var(--space-xl);
            color: var(--gray-600);
            text-decoration: none;
            font-size: 0.875rem;
            transition: all var(--transition-base);
          }

          .mobile-dropdown-item:hover {
            color: var(--brand-primary);
            background: var(--gray-50);
          }

          @media (min-width: 768px) {
            .nav-desktop {
              display: flex;
            }
            .mobile-menu-btn {
              display: none;
            }
          }

          @media (min-width: 1024px) {
            .header-container {
              padding: 0 var(--space-xl);
            }
          }
        `}
      </style>
      <header className="header-nav">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            FisioWel
          </Link>

          {/* Navigation Desktop */}
          <nav className="nav-desktop">
            {navigation.map((item) => (
              <div
                key={item.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
              >
                {item.hasDropdown ? (
                  <button
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#6b7280',
                      background: 'none',
                      border: 'none',
                      borderRadius: '0.5rem',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {item.name}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        transform: activeDropdown === item.name ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    style={{
                      padding: item.highlight ? '0.75rem 1rem' : '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: item.highlight ? 600 : 500,
                      color: isActive(item.href) ? '#0d9488' : (item.highlight ? '#1f2937' : '#6b7280'),
                      textDecoration: 'none',
                      borderRadius: '0.75rem',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: item.highlight ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)' : 'transparent',
                      border: item.highlight ? '1px solid rgba(14, 165, 233, 0.2)' : 'none'
                    }}
                  >
                    {item.name}
                    {item.badge && (
                      <span style={{
                        background: item.highlight
                          ? `linear-gradient(135deg, ${item.badgeColor} 0%, ${item.badgeColor}dd 100%)`
                          : item.badgeColor || '#ef4444',
                        color: 'white',
                        fontSize: item.highlight ? '0.75rem' : '0.625rem',
                        fontWeight: '700',
                        padding: item.highlight ? '0.25rem 0.5rem' : '0.125rem 0.375rem',
                        borderRadius: '1rem',
                        lineHeight: '1',
                        boxShadow: item.highlight ? `0 2px 8px ${item.badgeColor}40` : 'none',
                        animation: item.highlight ? 'pulse 2s infinite' : 'none'
                      }}>
                        {item.badge}
                      </span>
                    )}
                    {isActive(item.href) && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        background: '#0d9488',
                        borderRadius: '50%'
                      }} />
                    )}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      paddingTop: '0.5rem',
                      zIndex: 50
                    }}
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={() => handleDropdownLeave()}
                  >
                    <div style={{
                      background: 'white',
                      borderRadius: '1rem',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      border: '1px solid #e5e7eb',
                      minWidth: '280px',
                      padding: '1rem',
                      animation: 'fadeInUp 0.2s ease-out'
                    }}>
                      {item.dropdownItems?.map((dropdownItem, idx) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            textDecoration: 'none',
                            color: '#374151',
                            transition: 'all 0.2s ease',
                            marginBottom: idx < (item.dropdownItems?.length || 0) - 1 ? '0.25rem' : '0'
                          }}
                        >
                          <span style={{
                            fontSize: '1.25rem',
                            minWidth: '1.5rem',
                            textAlign: 'center'
                          }}>
                            {dropdownItem.icon}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontWeight: '600',
                              fontSize: '0.875rem',
                              color: '#1f2937',
                              marginBottom: '0.125rem'
                            }}>
                              {dropdownItem.name}
                            </div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#6b7280',
                              lineHeight: '1.3'
                            }}>
                              {dropdownItem.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - Search & Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Search Button */}
            <button
              onClick={toggleSearchModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Search size={18} />
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/criar-questao')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Criar Questão"
                >
                  <Plus size={18} />
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    background: 'none',
                    border: 'none',
                    color: '#0ea5e9',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Meu Dashboard"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/profile')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Meu Perfil"
                >
                  <User size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                title="Entrar"
              >
                <LogIn size={18} />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh'
          }}
          onClick={toggleSearchModal}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch}>
              <input
                id="header-search-input"
                type="text"
                placeholder="Buscar artigos, especialidades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0d9488',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 999
            }}
            onClick={toggleMobileMenu}
          />
          <div
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              background: 'white',
              zIndex: 1000,
              maxHeight: 'calc(100vh - 60px)',
              overflowY: 'auto',
              borderTop: '1px solid #e5e7eb'
            }}
          >
            <div style={{ padding: '1rem' }}>
              {navigation.map((item) => (
                <div key={item.name} style={{ marginBottom: '0.5rem' }}>
                  {item.hasDropdown ? (
                    <div>
                      <div style={{
                        padding: '0.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        borderBottom: '1px solid #f3f4f6'
                      }}>
                        {item.name}
                      </div>
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          style={{
                            display: 'block',
                            padding: '0.75rem 1.5rem',
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                          }}
                          onClick={toggleMobileMenu}
                        >
                          {dropdownItem.icon} {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      style={{
                        display: 'block',
                        padding: '0.75rem',
                        color: isActive(item.href) ? '#0d9488' : '#374151',
                        textDecoration: 'none',
                        fontWeight: isActive(item.href) ? '600' : '500',
                        borderRadius: '0.5rem',
                        background: isActive(item.href) ? '#f0fdfa' : 'transparent'
                      }}
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                      {item.badge && (
                        <span style={{
                          marginLeft: '0.5rem',
                          background: item.badgeColor || '#ef4444',
                          color: 'white',
                          fontSize: '0.625rem',
                          fontWeight: '700',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '1rem'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;