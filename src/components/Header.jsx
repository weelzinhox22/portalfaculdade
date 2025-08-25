import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Saúde do Atleta', href: '/saude-atleta' },
    { name: 'Unidade Hospitalar', href: '/unidade-hospitalar' },
    { name: 'Saúde do Idoso', href: '/saude-idoso' },
    { name: 'Neurofuncional', href: '/neurofuncional' },
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
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: '#ffffff',
          backdropFilter: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '0.75rem 0',
          boxShadow: isScrolled 
            ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
            : 'none'
        }}
      >
        <div className="container" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          background: 'transparent'
        }}>
          <Link 
            to="/" 
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0d9488',
              textDecoration: 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.3s ease',
              letterSpacing: '-0.025em',
              textShadow: 'none'
            }}
          >
            FisioWel
          </Link>
          
          {/* Desktop Navigation */}
          <nav style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem',
            '@media (max-width: 768px)': { display: 'none' }
          }}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  color: location.pathname === item.href 
                    ? '#0d9488'
                    : '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.href ? '500' : '400',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '0.5rem 0',
                  textShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0d9488';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = location.pathname === item.href 
                    ? '#0d9488'
                    : '#64748b';
                }}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#0d9488',
                    borderRadius: '1px'
                  }} />
                )}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={toggleSearchModal}
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
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(13, 148, 136, 0.1)';
                e.target.style.color = '#0d9488';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.color = '#64748b';
              }}
            >
              <Search size={20} />
            </button>
            
            {/* Mobile Menu Button */}
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
                justifyContent: 'center',
                '@media (min-width: 769px)': { display: 'none' }
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(13, 148, 136, 0.1)';
                e.target.style.color = '#0d9488';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.color = '#64748b';
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out'
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
          width: '280px',
          maxWidth: '85vw',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          padding: '2rem 0',
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
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={toggleMobileMenu}
                  style={{
                    color: location.pathname === item.href ? '#0d9488' : '#374151',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: location.pathname === item.href ? '600' : '500',
                    padding: '1rem 1.5rem',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
                    background: location.pathname === item.href 
                      ? 'rgba(13, 148, 136, 0.1)' 
                      : 'transparent',
                    border: location.pathname === item.href 
                      ? '1px solid rgba(13, 148, 136, 0.2)' 
                      : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.href) {
                      e.target.style.background = 'rgba(13, 148, 136, 0.05)';
                      e.target.style.color = '#0d9488';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.href) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#374151';
                    }
                  }}
                >
                  {item.name}
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
