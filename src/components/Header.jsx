import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import './header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Verificar se a rota atual corresponde ao link de navegação
  const isActive = (href) => location.pathname === href;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Atleta', href: '/saude-atleta' },
    { name: 'Hospitalar', href: '/unidade-hospitalar' },
    { name: 'Idoso', href: '/saude-idoso' },
    { name: 'Neuro', href: '/neurofuncional' },
    { name: 'Utilitários', href: '/ferramentas-calculo' },
    { name: 'Questões', href: '/questoes' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
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

  const handleSearch = (e) => {
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
        const searchInput = document.getElementById('header-search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
          @media (min-width: 769px) {
            .nav-desktop { display: flex !important; }
            .mobile-menu-btn { display: none !important; }
          }
        `}
      </style>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '1px solid rgba(0, 0, 0, 0.1)'
          : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '60px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 max(1rem, env(safe-area-inset-left))',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1f2937',
              textDecoration: 'none',
              letterSpacing: '-0.025em',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#0d9488'}
            onMouseLeave={(e) => e.target.style.color = '#1f2937'}
          >
            FisioNeo
          </Link>

          {/* Navigation Desktop */}
          <nav className="nav-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive(item.href) ? '#0d9488' : '#6b7280',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.target.style.color = '#374151';
                    e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.target.style.color = '#6b7280';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.name}
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
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.color = '#6b7280';
              }}
            >
              <Search size={18} />
            </button>

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
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.color = '#6b7280';
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
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
            zIndex: 999,
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          padding: '80px 2rem 2rem',
          overflowY: 'auto'
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%'
        }}>
          {/* Mobile Menu Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem 2rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0d9488',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}>
              Menu
            </div>
            <button 
              onClick={toggleMobileMenu}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav style={{ 
            flex: 1,
            padding: '0 2rem'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem'
            }}>
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={toggleMobileMenu}
                  style={{
                    display: 'block',
                    color: location.pathname === item.href ? '#0d9488' : '#1f2937',
                    textDecoration: 'none',
                    fontSize: '1.125rem',
                    fontWeight: location.pathname === item.href ? '600' : '500',
                    padding: '1rem 0',
                    borderBottom: index < navigation.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.href) {
                      e.target.style.color = '#0d9488';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.href) {
                      e.target.style.color = '#1f2937';
                    }
                  }}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '4px',
                      background: '#0d9488',
                      borderRadius: '50%'
                    }} />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div style={{
            padding: '2rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            marginTop: 'auto'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748b',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              Portal de Fisioterapia
              <br />
              <span style={{ fontWeight: '600', color: '#0d9488' }}>FisioWel</span>
            </div>
          </div>
        </div>
      </div>

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
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSearchModal(false);
            }
          }}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              width: '90%',
              maxWidth: '600px',
              boxShadow: 'var(--shadow-2xl)',
              animation: 'slideDown 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--neutral-800)', margin: 0 }}>
                Buscar Artigos e Conteúdos
              </h3>
              <button 
                onClick={() => setShowSearchModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  color: 'var(--neutral-500)'
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSearch}>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search 
                  className="w-5 h-5" 
                  style={{ 
                    position: 'absolute', 
                    left: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: 'var(--neutral-400)' 
                  }} 
                />
                <input
                  id="header-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Digite sua pesquisa: técnicas, patologias, tratamentos..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem 1rem 3rem',
                    fontSize: '1.1rem',
                    border: '2px solid var(--neutral-200)',
                    borderRadius: '0.75rem',
                    background: 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-500)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
                />
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', marginBottom: '1.5rem' }}>
                🔍 Busca integrada no <strong>SciELO</strong>, <strong>Google Acadêmico</strong> e conteúdo do portal
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Search size={18} />
                  Buscar
                </button>
                <button 
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </>
  );
};

export default Header;
