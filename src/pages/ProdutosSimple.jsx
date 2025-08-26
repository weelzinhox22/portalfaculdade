import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  BookOpen,
  Download,
  Star,
  ExternalLink,
  Search,
  CheckCircle,
  Heart,
  Plus,
  User,
  LogIn
} from 'lucide-react';
import useMobile from '../hooks/useMobile';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const ProdutosSimple = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos os Produtos', icon: '🛍️' },
    { id: 'livros', name: 'Livros', icon: '📚' },
    { id: 'ebooks', name: 'E-books', icon: '📱' },
    { id: 'cursos', name: 'Cursos Online', icon: '🎓' },
    { id: 'resumos', name: 'Resumos', icon: '📝' },
    { id: 'equipamentos', name: 'Equipamentos', icon: '🏥' }
  ];

  const products = [
    {
      id: 1,
      title: "Fisioterapia Respiratória - Bases Fisiológicas",
      author: "Sarmento, George Jerre Vieira",
      category: 'livros',
      type: 'Livro Físico',
      price: 'R$ 189,90',
      originalPrice: 'R$ 220,00',
      discount: '14%',
      rating: 4.8,
      reviews: 127,
      description: 'Referência completa em fisioterapia respiratória.',
      features: [
        'Mais de 600 páginas',
        'Casos clínicos práticos',
        'Ilustrações detalhadas'
      ],
      affiliateLink: 'https://www.sanar.com/livro-fisioterapia-respiratoria',
      isAffiliate: true,
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
      description: 'Guia completo para avaliação neurológica.',
      features: [
        'Mais de 150 páginas',
        'Protocolos de avaliação',
        'Casos clínicos'
      ],
      isAffiliate: false,
      isDigital: true,
      specialty: 'Fisioterapia Neurológica'
    },
    {
      id: 3,
      title: "Estetoscópio Premium Littmann",
      author: "3M Littmann",
      category: 'equipamentos',
      type: 'Equipamento',
      price: 'R$ 299,90',
      originalPrice: 'R$ 349,90',
      discount: '14%',
      rating: 4.7,
      reviews: 156,
      description: 'Estetoscópio profissional de alta qualidade.',
      features: [
        'Acústica superior',
        'Durabilidade comprovada',
        'Garantia de 2 anos'
      ],
      affiliateLink: 'https://shopee.com.br/estetoscopio-littmann',
      isAffiliate: true,
      specialty: 'Equipamentos'
    },
    {
      id: 4,
      title: "Resumo: Anatomia Musculoesquelética",
      author: "FisioEstudos",
      category: 'resumos',
      type: 'PDF Resumo',
      price: 'R$ 19,90',
      originalPrice: 'R$ 29,90',
      discount: '33%',
      rating: 4.6,
      reviews: 89,
      description: 'Resumo visual completo da anatomia.',
      features: [
        '50 páginas ilustradas',
        'Mapas mentais',
        'Download imediato'
      ],
      isAffiliate: false,
      isDigital: true,
      specialty: 'Anatomia'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
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

  const addToCart = (product) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePurchase = (product) => {
    if (product.isAffiliate) {
      // Produto afiliado - redireciona para loja externa
      window.open(product.affiliateLink, '_blank');
    } else {
      // Produto próprio - adiciona ao carrinho ou vai para checkout
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return;
      }

      // Se for produto digital, vai direto para checkout
      if (product.isDigital) {
        navigate(`/checkout/${product.id}`);
      } else {
        addToCart(product);
      }
    }
  };

  const goToCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout', { state: { cartItems: cart } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      {/* Carrinho Flutuante (apenas para usuários logados) */}
      {isAuthenticated && cart.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          background: 'white',
          borderRadius: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          padding: '1.5rem',
          minWidth: '300px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>
              Carrinho ({getCartItemsCount()})
            </h3>
            <ShoppingCart size={24} color="#10b981" />
          </div>

          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>
                  {item.title.substring(0, 30)}...
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Qtd: {item.quantity} × {item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                ×
              </button>
            </div>
          ))}

          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '2px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Total:
              </span>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#10b981'
              }}>
                R$ {getCartTotal().toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              onClick={goToCheckout}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '0.875rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}

      {/* Modal de Login */}
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
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <User size={30} color="white" />
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Login Necessário
            </h3>

            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              Para adicionar produtos ao carrinho e fazer compras, você precisa estar logado.
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
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: 'white',
          padding: isMobile ? '3rem 0' : '4rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '800',
              marginBottom: '1.5rem'
            }}>
              Produtos Recomendados
            </h1>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              color: '#d1fae5',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Livros, cursos e e-books selecionados para acelerar 
              seu aprendizado em fisioterapia.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
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
                  placeholder="Buscar produtos..."
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
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
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
                    gap: '0.5rem'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
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
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Product Image */}
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
                      left: '1rem'
                    }}>
                      {product.discount && (
                        <div style={{
                          background: '#ef4444',
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

                    {/* Icon */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {product.category === 'livros' && <BookOpen size={30} color="white" />}
                      {product.category === 'ebooks' && <Download size={30} color="white" />}
                      {product.category === 'cursos' && <ShoppingCart size={30} color="white" />}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {product.title}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginBottom: '1rem'
                    }}>
                      por {product.author}
                    </p>

                    <p style={{
                      color: '#4b5563',
                      fontSize: '0.9rem',
                      marginBottom: '1.5rem'
                    }}>
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            color={i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'}
                            fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                        {product.rating} ({product.reviews} avaliações)
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

                    {/* Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem'
                    }}>
                      {product.isAffiliate ? (
                        // Produto Afiliado - Link Externo
                        <button
                          onClick={() => handlePurchase(product)}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '1rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <ExternalLink size={20} />
                          Ver na Loja
                        </button>
                      ) : (
                        // Produto Próprio - Checkout Interno
                        <>
                          {product.isDigital ? (
                            // Produto Digital - Compra Direta
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                              }}
                            >
                              <Download size={20} />
                              Comprar Agora
                            </button>
                          ) : (
                            // Produto Físico - Adicionar ao Carrinho
                            <button
                              onClick={() => addToCart(product)}
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                              }}
                            >
                              <Plus size={20} />
                              Adicionar
                            </button>
                          )}

                          {/* Botão de Favoritos */}
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            style={{
                              background: favorites.includes(product.id) ? '#fee2e2' : 'white',
                              color: favorites.includes(product.id) ? '#dc2626' : '#6b7280',
                              border: '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              padding: '1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Heart
                              size={20}
                              fill={favorites.includes(product.id) ? 'currentColor' : 'none'}
                            />
                          </button>
                        </>
                      )}
                    </div>
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

export default ProdutosSimple;
