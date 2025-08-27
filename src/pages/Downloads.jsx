import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  BookOpen, 
  Star, 
  Eye,
  Lock,
  Unlock,
  FileText,
  Heart,
  Share2,
  User,
  LogIn,
  Crown,
  Gift
} from 'lucide-react';
import useMobile from '../hooks/useMobile';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import emailService from '../services/emailService';
import LeadCaptureModal from '../components/LeadCaptureModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Downloads = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '📚' },
    { id: 'anatomia', name: 'Anatomia', icon: '🦴' },
    { id: 'atlas', name: 'Atlas', icon: '🗺️' },
    { id: 'semiologia', name: 'Semiologia', icon: '🔍' },
    { id: 'cardiologia', name: 'Cardiologia', icon: '❤️' }
  ];

  const downloads = [
    {
      id: 1,
      title: "NETTER Atlas de Anatomia Humana PDF - Download Gratuito",
      author: "Frank H. Netter",
      category: 'atlas',
      type: 'PDF',
      size: '125 MB',
      pages: '672 páginas',
      rating: 4.9,
      downloads: 15420,
      description: 'Atlas Netter PDF grátis - O melhor atlas de anatomia humana para fisioterapia e medicina. Download direto e gratuito.',
      seoDescription: 'Baixe grátis o Atlas Netter de Anatomia Humana em PDF. O atlas mais usado por estudantes de fisioterapia, medicina e enfermagem.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1gTa-sQ3tlWp05qHXDXBN9Ki_YzRxU9HN/view?usp=sharing',
      isPremium: false,
      isPopular: true,
      tags: ['netter pdf', 'atlas anatomia', 'anatomia humana pdf', 'netter download', 'atlas netter gratis', 'fisioterapia', 'medicina']
    },
    {
      id: 2,
      title: "Sobotta Atlas de Anatomia Humana Volume 1 PDF Grátis",
      author: "Johannes Sobotta",
      category: 'anatomia',
      type: 'PDF',
      size: '89 MB',
      pages: '456 páginas',
      rating: 4.8,
      downloads: 12350,
      description: 'Sobotta PDF download gratuito - Atlas clássico de anatomia humana com ilustrações detalhadas para fisioterapia.',
      seoDescription: 'Download grátis Sobotta Volume 1 PDF. Atlas de anatomia humana completo para estudantes de fisioterapia e medicina.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1869-gB-VzxIHp6aV2p8kAtg5MRDIytBS/view?usp=sharing',
      isPremium: false,
      isPopular: true,
      tags: ['sobotta pdf', 'sobotta download', 'atlas sobotta', 'anatomia humana pdf', 'sobotta volume 1', 'fisioterapia', 'medicina']
    },
    {
      id: 3,
      title: "Sobotta Atlas de Anatomia Humana Volume 2 PDF Download",
      author: "Johannes Sobotta",
      category: 'anatomia',
      type: 'PDF',
      size: '95 MB',
      pages: '512 páginas',
      rating: 4.8,
      downloads: 11200,
      description: 'Sobotta Volume 2 PDF grátis - Continuação do atlas com sistemas específicos. Download direto e gratuito.',
      seoDescription: 'Baixe grátis o Sobotta Volume 2 em PDF. Atlas de anatomia humana com foco em sistemas específicos do corpo.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1lpEiaZ2ADMEvHKy7eFj0qXYKOV7WACvw/view?usp=sharing',
      isPremium: false,
      tags: ['sobotta volume 2 pdf', 'sobotta download', 'atlas anatomia', 'anatomia humana', 'sobotta gratis', 'fisioterapia']
    },
    {
      id: 4,
      title: "Sobotta Tabela de Músculos e Ossos PDF - Premium",
      author: "Johannes Sobotta",
      category: 'anatomia',
      type: 'PDF',
      size: '45 MB',
      pages: '128 páginas',
      rating: 4.7,
      downloads: 8900,
      description: 'Sobotta tabela músculos PDF - Quadros resumidos completos de músculos, ossos e estruturas anatômicas.',
      seoDescription: 'Tabela Sobotta de músculos e ossos em PDF. Quadros resumidos essenciais para fisioterapia e anatomia.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1IlGkEQGmubhcA4gbSeyJOEYAnj7jn3P6/view?usp=sharing',
      isPremium: true,
      tags: ['sobotta tabela musculos', 'tabela ossos pdf', 'quadro musculos', 'anatomia musculos', 'sobotta premium', 'fisioterapia']
    },
    {
      id: 5,
      title: "Gray's Anatomia Dissecação Fotográfica PDF - Premium",
      author: "Gray's Anatomy",
      category: 'anatomia',
      type: 'PDF',
      size: '156 MB',
      pages: '789 páginas',
      rating: 4.9,
      downloads: 9800,
      description: 'Gray\'s dissector PDF - Dissecções fotográficas reais em alta qualidade para estudo anatômico avançado.',
      seoDescription: 'Gray\'s Clinical Photographic Dissector PDF. Dissecções anatômicas reais para medicina e fisioterapia.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1UlyijRWriO-fgVQDlTEuG9wDtaLPTs9p/view?usp=sharing',
      isPremium: true,
      isPopular: true,
      tags: ['grays dissector pdf', 'dissecacao anatomica', 'gray anatomia pdf', 'dissector fotografico', 'anatomia avancada', 'medicina']
    },
    {
      id: 6,
      title: "Semiologia da Mão PDF - Exame Físico Completo Grátis",
      author: "Diversos Autores",
      category: 'semiologia',
      type: 'PDF',
      size: '32 MB',
      pages: '245 páginas',
      rating: 4.6,
      downloads: 5600,
      description: 'Semiologia mão PDF grátis - Guia completo para exame semiológico da mão e punho para fisioterapeutas.',
      seoDescription: 'Download grátis Semiologia da Mão PDF. Guia completo de exame físico da mão para fisioterapia e medicina.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1PG9vyj9dL1zegjRnHxSFzgzFMBemBpmT/view?usp=sharing',
      isPremium: false,
      tags: ['semiologia mao pdf', 'exame fisico mao', 'semiologia fisioterapia', 'exame mao punho', 'fisioterapia mao', 'ortopedia']
    },
    {
      id: 7,
      title: "Atlas de Anatomia Cardíaca PDF - Cardiologia Premium",
      author: "Cardiac Institute",
      category: 'cardiologia',
      type: 'PDF',
      size: '67 MB',
      pages: '324 páginas',
      rating: 4.7,
      downloads: 4200,
      description: 'Atlas anatomia cardíaca PDF - Especializado em anatomia do coração com imagens detalhadas e precisas.',
      seoDescription: 'Atlas de Anatomia Cardíaca PDF premium. Estudo completo do coração para cardiologia e fisioterapia.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1rd1BtmtOC8MzOG2X8jnAcLKOkg2FMFDe/view?usp=sharing',
      isPremium: true,
      tags: ['atlas cardiaco pdf', 'anatomia coracao', 'cardiologia pdf', 'atlas cardiologia', 'anatomia cardiaca', 'fisioterapia cardiaca']
    },
    {
      id: 8,
      title: "Caderno de Anatomia Prática PDF - Exercícios Grátis",
      author: "Universidade Federal",
      category: 'anatomia',
      type: 'PDF',
      size: '28 MB',
      pages: '156 páginas',
      rating: 4.5,
      downloads: 7800,
      description: 'Caderno anatomia PDF grátis - Exercícios práticos e estudos dirigidos de anatomia humana para fisioterapia.',
      seoDescription: 'Caderno de Estudos Práticos em Anatomia PDF grátis. Exercícios e atividades práticas para estudantes.',
      image: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1cr8rLrBkokd-S2PbBphdzQ_EkYLHeuXA/view?usp=sharing',
      isPremium: false,
      tags: ['caderno anatomia pdf', 'exercicios anatomia', 'anatomia pratica', 'estudos anatomia', 'atividades anatomia', 'fisioterapia']
    }
  ];

  const filteredDownloads = downloads.filter(item => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch = !searchTerm || 
                         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDownload = async (item) => {
    if (item.isPremium && !isAuthenticated) {
      setSelectedItem(item);
      setShowLeadCapture(true);
      return;
    }

    setDownloadingId(item.id);

    // Email marketing para usuários autenticados
    if (isAuthenticated && user?.email) {
      try {
        // Adicionar lead ao email marketing
        await emailService.addLead(
          user.email,
          user.name || user.email.split('@')[0],
          'downloads',
          [item.category, item.tags[0]]
        );

        // Segmentar por categoria
        await emailService.segmentLead(user.email, item.category);

        // Track evento para remarketing
        await emailService.trackEvent(user.email, 'download', {
          item_id: item.id,
          item_title: item.title,
          category: item.category,
          is_premium: item.isPremium
        });
      } catch (error) {
        console.error('Erro no email marketing:', error);
      }
    }

    // Simulate download delay
    setTimeout(() => {
      // Convert Google Drive view link to direct download
      const fileId = item.driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/)[1];
      const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

      // Open download link
      window.open(downloadLink, '_blank');

      setDownloadingId(null);

      // Track download analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'file_download', {
          file_name: item.title,
          file_type: item.type,
          is_premium: item.isPremium,
          category: item.category,
          user_authenticated: isAuthenticated
        });
      }

      // Show success message for premium downloads
      if (item.isPremium) {
        setTimeout(() => {
          alert('✅ Download iniciado! Verifique seu email para mais materiais exclusivos.');
        }, 2000);
      }
    }, 1500);
  };

  const handleLeadCaptureSuccess = async (leadData) => {
    // Simular autenticação temporária para permitir download
    const tempUser = {
      email: leadData.email,
      name: leadData.name,
      isTemp: true
    };

    // Iniciar download do item selecionado
    if (selectedItem) {
      setTimeout(() => {
        handleDownload({ ...selectedItem, isPremium: false }); // Temporariamente não premium para permitir download
      }, 1000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // SEO Meta Tags
    document.title = 'Downloads Gratuitos - Atlas Netter, Sobotta PDF | FisioEstudos';

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Download grátis Atlas Netter PDF, Sobotta, Gray\'s Anatomy e mais materiais de fisioterapia. +50.000 downloads realizados. Acesso imediato!');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Download grátis Atlas Netter PDF, Sobotta, Gray\'s Anatomy e mais materiais de fisioterapia. +50.000 downloads realizados. Acesso imediato!';
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'netter pdf download, sobotta pdf gratis, atlas anatomia pdf, gray anatomia download, fisioterapia pdf, anatomia humana pdf, semiologia pdf, atlas cardiaco pdf');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'netter pdf download, sobotta pdf gratis, atlas anatomia pdf, gray anatomia download, fisioterapia pdf, anatomia humana pdf, semiologia pdf, atlas cardiaco pdf';
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Downloads Gratuitos - Atlas Netter, Sobotta PDF | FisioEstudos');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Downloads Gratuitos - Atlas Netter, Sobotta PDF | FisioEstudos';
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Baixe grátis os melhores atlas de anatomia: Netter, Sobotta, Gray\'s Anatomy e mais. Materiais essenciais para fisioterapia e medicina.');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Baixe grátis os melhores atlas de anatomia: Netter, Sobotta, Gray\'s Anatomy e mais. Materiais essenciais para fisioterapia e medicina.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <Header />
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => {
          setShowLeadCapture(false);
          setSelectedItem(null);
        }}
        onLogin={() => {
          setShowLeadCapture(false);
          navigate('/auth');
        }}
        item={selectedItem}
        onSuccess={handleLeadCaptureSuccess}
      />

      {/* Login Modal (Fallback) */}
      {showLoginPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '2rem',
            padding: '3rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Crown size={30} color="white" />
            </div>
            
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Conteúdo Premium
            </h3>
            
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              Este material é exclusivo para usuários cadastrados. 
              Faça login para acessar nosso acervo premium.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={() => setShowLoginPrompt(false)}
                style={{
                  flex: 1,
                  background: 'white',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  padding: '0.875rem',
                  borderRadius: '1rem',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  navigate('/auth');
                }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.875rem',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogIn size={16} />
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        paddingTop: '6rem'
      }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
          color: 'white',
          padding: isMobile ? '3rem 0' : '4rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '100%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            transform: 'rotate(30deg)'
          }} />

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
                }}>
                  <Download size={40} color="white" />
                </div>
              </div>

              <h1 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                Downloads Gratuitos
              </h1>

              <p style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                color: '#e9d5ff',
                lineHeight: '1.6',
                maxWidth: '700px',
                margin: '0 auto 2rem auto'
              }}>
                Acervo completo de livros, atlas e materiais de estudo em fisioterapia.
                Baixe gratuitamente os melhores recursos para sua formação.
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem'
                }}>
                  <Gift size={20} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {downloads.filter(d => !d.isPremium).length} Gratuitos
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem'
                }}>
                  <Crown size={20} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {downloads.filter(d => d.isPremium).length} Premium
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{
          padding: '3rem 0',
          background: 'white',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: '2rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#7c3aed',
                  marginBottom: '0.5rem'
                }}>
                  {downloads.length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Materiais Disponíveis
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#10b981',
                  marginBottom: '0.5rem'
                }}>
                  {downloads.reduce((sum, d) => sum + d.downloads, 0).toLocaleString()}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Downloads Realizados
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>
                  4.7
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Avaliação Média
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#ef4444',
                  marginBottom: '0.5rem'
                }}>
                  100%
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Gratuito
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section style={{
          padding: '3rem 0',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px'
              }}>
                <input
                  type="text"
                  placeholder="Buscar por título, autor ou tema..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '2rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <FileText
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id
                      ? 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)'
                      : 'white',
                    color: selectedCategory === category.id ? 'white' : '#374151',
                    border: selectedCategory === category.id ? 'none' : '1px solid #e5e7eb',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Downloads Grid */}
        <section style={{
          padding: '4rem 0',
          background: '#f8fafc'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {filteredDownloads.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    background: 'white',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    position: 'relative',
                    height: '200px',
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Badges */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      {item.isPremium && (
                        <div style={{
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Crown size={12} />
                          Premium
                        </div>
                      )}
                      {item.isPopular && (
                        <div style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          Popular
                        </div>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <Heart
                        size={20}
                        color={favorites.includes(item.id) ? '#ef4444' : '#9ca3af'}
                        fill={favorites.includes(item.id) ? '#ef4444' : 'none'}
                      />
                    </button>

                    {/* Icon */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)'
                    }}>
                      <BookOpen size={40} color="white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '2rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        background: '#f3e8ff',
                        color: '#7c3aed',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {item.type}
                      </span>
                      <span style={{
                        color: '#6b7280',
                        fontSize: '0.875rem'
                      }}>
                        {item.size}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {item.title}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginBottom: '1rem'
                    }}>
                      por {item.author}
                    </p>

                    <p style={{
                      color: '#4b5563',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      marginBottom: '1.5rem'
                    }}>
                      {item.description}
                    </p>

                    {/* Stats */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Star size={16} color="#fbbf24" fill="#fbbf24" />
                        {item.rating}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Download size={16} />
                        {item.downloads.toLocaleString()}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <FileText size={16} />
                        {item.pages}
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(item)}
                      disabled={downloadingId === item.id}
                      style={{
                        width: '100%',
                        background: item.isPremium
                          ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: downloadingId === item.id ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        opacity: downloadingId === item.id ? 0.7 : 1
                      }}
                    >
                      {downloadingId === item.id ? (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid transparent',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          Baixando...
                        </>
                      ) : (
                        <>
                          {item.isPremium ? <Lock size={20} /> : <Download size={20} />}
                          {item.isPremium ? 'Login Necessário' : 'Download Gratuito'}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Downloads;
