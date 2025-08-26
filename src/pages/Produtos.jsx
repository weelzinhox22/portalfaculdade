import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  BookOpen,
  Download,
  Star,
  ExternalLink,
  Filter,
  Search,
  Tag,
  Award,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Share2,
  FileText,
  Monitor
} from 'lucide-react';
import useMobile from '../hooks/useMobile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Produtos = () => {
  const isMobile = useMobile();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'todos', name: 'Todos os Produtos', icon: '🛍️' },
    { id: 'livros', name: 'Livros', icon: '📚' },
    { id: 'ebooks', name: 'E-books', icon: '📱' },
    { id: 'cursos', name: 'Cursos Online', icon: '🎓' },
    { id: 'resumos', name: 'Resumos', icon: '📝' },
    { id: 'equipamentos', name: 'Equipamentos', icon: '🏥' },
    { id: 'software', name: 'Software', icon: '💻' }
  ];

  const products = [
    {
      id: 1,
      title: "Fisioterapia Respiratória - Bases Fisiológicas e Aplicações Clínicas",
      author: "Sarmento, George Jerre Vieira",
      category: 'livros',
      type: 'Livro Físico',
      price: 'R$ 189,90',
      originalPrice: 'R$ 220,00',
      discount: '14%',
      rating: 4.8,
      reviews: 127,
      image: '/api/placeholder/300/400',
      description: 'Referência completa em fisioterapia respiratória com abordagem prática e científica.',
      features: [
        'Mais de 600 páginas de conteúdo',
        'Casos clínicos práticos',
        'Ilustrações detalhadas',
        'Protocolos atualizados'
      ],
      affiliateLink: 'https://www.sanar.com/livro-fisioterapia-respiratoria?ref=fisioestudos',
      bestseller: true,
      specialty: 'Fisioterapia Respiratória'
    },
    {
      id: 2,
      title: "E-book: Avaliação Neurológica Completa",
      author: "FisioEstudos",
      category: 'ebooks',
      type: 'E-book PDF',
      price: 'R$ 47,90',
      originalPrice: 'R$ 67,90',
      discount: '29%',
      rating: 4.9,
      reviews: 89,
      image: '/api/placeholder/300/400',
      description: 'Guia completo para avaliação neurológica em fisioterapia com protocolos práticos.',
      features: [
        'Mais de 150 páginas',
        'Protocolos de avaliação',
        'Casos clínicos',
        'Vídeos complementares'
      ],
      affiliateLink: '#comprar-ebook-neuro',
      isDigital: true,
      specialty: 'Fisioterapia Neurológica'
    },
    {
      id: 3,
      title: "Curso Online: Fisioterapia em UTI",
      author: "Instituto Fisio+",
      category: 'cursos',
      type: 'Curso Online',
      price: 'R$ 297,00',
      originalPrice: 'R$ 397,00',
      discount: '25%',
      rating: 4.7,
      reviews: 234,
      image: '/api/placeholder/300/400',
      description: 'Curso completo sobre fisioterapia em unidade de terapia intensiva.',
      features: [
        '40 horas de conteúdo',
        'Certificado incluso',
        'Acesso vitalício',
        'Suporte do instrutor'
      ],
      affiliateLink: 'https://institutofisio.com.br/curso-uti?ref=fisioestudos',
      duration: '40h',
      specialty: 'Fisioterapia Hospitalar'
    },
    {
      id: 4,
      title: "Resumo: Anatomia do Sistema Musculoesquelético",
      author: "FisioEstudos",
      category: 'resumos',
      type: 'Resumo PDF',
      price: 'R$ 19,90',
      originalPrice: 'R$ 29,90',
      discount: '33%',
      rating: 4.6,
      reviews: 156,
      image: '/api/placeholder/300/400',
      description: 'Resumo visual completo da anatomia musculoesquelética para estudos.',
      features: [
        '50 páginas ilustradas',
        'Mapas mentais',
        'Tabelas resumo',
        'Download imediato'
      ],
      affiliateLink: '#comprar-resumo-anatomia',
      isDigital: true,
      specialty: 'Anatomia'
    },
    {
      id: 5,
      title: "Theraband - Kit Completo de Faixas Elásticas",
      author: "Theraband",
      category: 'equipamentos',
      type: 'Equipamento',
      price: 'R$ 89,90',
      originalPrice: 'R$ 119,90',
      discount: '25%',
      rating: 4.5,
      reviews: 78,
      image: '/api/placeholder/300/400',
      description: 'Kit completo com 5 faixas elásticas de diferentes resistências.',
      features: [
        '5 níveis de resistência',
        'Material de alta qualidade',
        'Guia de exercícios incluso',
        'Frete grátis'
      ],
      affiliateLink: 'https://amazon.com.br/theraband-kit?tag=fisioestudos-20',
      specialty: 'Equipamentos'
    },
    {
      id: 6,
      title: "Software: FisioCalc Pro",
      author: "TechFisio",
      category: 'software',
      type: 'Software',
      price: 'R$ 127,00',
      originalPrice: 'R$ 167,00',
      discount: '24%',
      rating: 4.4,
      reviews: 45,
      image: '/api/placeholder/300/400',
      description: 'Software completo para cálculos e avaliações em fisioterapia.',
      features: [
        'Mais de 50 calculadoras',
        'Relatórios automáticos',
        'Backup na nuvem',
        'Atualizações gratuitas'
      ],
      affiliateLink: 'https://techfisio.com/fisiocalc?ref=fisioestudos',
      specialty: 'Ferramentas'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
                         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePurchase = (product) => {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'affiliate',
        event_label: product.title,
        value: parseFloat(product.price.replace('R$ ', '').replace(',', '.'))
      });
    }
    
    // Open affiliate link
    window.open(product.affiliateLink, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
    console.log('Produtos component mounted', { searchTerm, selectedCategory });
  }, []);

  useEffect(() => {
    console.log('Search term changed:', searchTerm);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        paddingTop: '6rem'
      }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
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
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
                }}>
                  <ShoppingCart size={40} color="white" />
                </div>
              </div>

              <h1 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                Produtos Recomendados
              </h1>

              <p style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                color: '#d1fae5',
                lineHeight: '1.6',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                Livros, cursos, e-books e equipamentos selecionados para acelerar 
                seu aprendizado e desenvolvimento profissional em fisioterapia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section style={{
          padding: '4rem 0',
          background: '#f8fafc'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 0',
                color: '#6b7280'
              }}>
                <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  Nenhum produto encontrado
                </h3>
                <p>Tente ajustar os filtros ou termo de busca.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {/* Product Image */}
                    <div style={{
                      position: 'relative',
                      height: '250px',
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
                        {product.bestseller && (
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
                            <Award size={12} />
                            Bestseller
                          </div>
                        )}
                        {product.discount && (
                          <div style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            -{product.discount}
                          </div>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
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
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Heart
                          size={20}
                          color={favorites.includes(product.id) ? '#ef4444' : '#9ca3af'}
                          fill={favorites.includes(product.id) ? '#ef4444' : 'none'}
                        />
                      </button>

                      {/* Product Type Icon */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                      }}>
                        {product.category === 'livros' && <BookOpen size={40} color="white" />}
                        {product.category === 'ebooks' && <Download size={40} color="white" />}
                        {product.category === 'cursos' && <Award size={40} color="white" />}
                        {product.category === 'resumos' && <FileText size={40} color="white" />}
                        {product.category === 'equipamentos' && <ShoppingCart size={40} color="white" />}
                        {product.category === 'software' && <Monitor size={40} color="white" />}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div style={{ padding: '2rem' }}>
                      {/* Category and Type */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          background: '#f0fdf4',
                          color: '#166534',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {product.specialty}
                        </span>
                        <span style={{
                          color: '#6b7280',
                          fontSize: '0.875rem'
                        }}>
                          {product.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '0.5rem',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.title}
                      </h3>

                      {/* Author */}
                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        marginBottom: '1rem'
                      }}>
                        por {product.author}
                      </p>

                      {/* Description */}
                      <p style={{
                        color: '#4b5563',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.description}
                      </p>

                      {/* Features */}
                      <div style={{
                        marginBottom: '1.5rem'
                      }}>
                        <h4 style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '0.75rem'
                        }}>
                          Principais características:
                        </h4>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              marginBottom: '0.5rem',
                              fontSize: '0.875rem',
                              color: '#4b5563'
                            }}>
                              <CheckCircle size={16} color="#10b981" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Rating and Reviews */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              color={i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'}
                              fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                            />
                          ))}
                          <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginLeft: '0.25rem'
                          }}>
                            {product.rating}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>
                          ({product.reviews} avaliações)
                        </span>
                      </div>

                      {/* Price */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '2rem'
                      }}>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#059669'
                        }}>
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span style={{
                            fontSize: '1rem',
                            color: '#9ca3af',
                            textDecoration: 'line-through'
                          }}>
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '1rem'
                      }}>
                        <button
                          onClick={() => handlePurchase(product)}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '1rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {product.isDigital ? <Download size={20} /> : <ExternalLink size={20} />}
                          {product.isDigital ? 'Comprar Agora' : 'Ver na Loja'}
                        </button>

                        <button
                          style={{
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '1rem',
                            padding: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = '#10b981';
                            e.target.style.color = '#10b981';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.color = '#374151';
                          }}
                        >
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>
              Não encontrou o que procurava?
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#cbd5e1',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Envie suas sugestões de produtos que gostaria de ver aqui.
              Estamos sempre atualizando nossa seleção com os melhores recursos para fisioterapeutas.
            </p>
            <button
              style={{
                background: 'white',
                color: '#1e40af',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Enviar Sugestão
            </button>
          </div>
        </section>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Produtos;

        {/* Filters and Search */}
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
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px'
              }}>
                <Search 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Buscar produtos, autores ou especialidades..."
                  value={searchTerm || ''}
                  onChange={(e) => setSearchTerm(e.target.value || '')}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '2rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
              justifyContent: isMobile ? 'flex-start' : 'center'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'white',
                    color: selectedCategory === category.id ? 'white' : '#374151',
                    border: selectedCategory === category.id ? 'none' : '1px solid #e5e7eb',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.color = '#10b981';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.color = '#374151';
                    }
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
