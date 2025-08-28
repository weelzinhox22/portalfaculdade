import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoritoButton from '../components/FavoritoButton';
import useMobile from '../hooks/useMobile';

const Blog = () => {
  const isMobile = useMobile();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'todos', name: 'Todos os Artigos', count: 12 },
    { id: 'anatomia', name: 'Anatomia', count: 3 },
    { id: 'exercicios', name: 'Exercícios', count: 4 },
    { id: 'patologias', name: 'Patologias', count: 3 },
    { id: 'dicas', name: 'Dicas Práticas', count: 2 }
  ];

  const articles = [
    {
      id: 1,
      title: "Anatomia do Sistema Muscular: Guia Completo",
      excerpt: "Entenda a estrutura e função dos principais grupos musculares do corpo humano e sua importância na fisioterapia.",
      author: "Dr. João Silva",
      date: "2024-01-15",
      readTime: "8 min",
      category: "anatomia",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      tags: ["Anatomia", "Músculos", "Fisiologia"]
    },
    {
      id: 2,
      title: "10 Exercícios Essenciais para Reabilitação de Joelho",
      excerpt: "Protocolo completo de exercícios para recuperação de lesões no joelho, com progressões e adaptações.",
      author: "Dra. Maria Santos",
      date: "2024-01-12",
      readTime: "12 min",
      category: "exercicios",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["Exercícios", "Joelho", "Reabilitação"]
    },
    {
      id: 3,
      title: "Lombalgia: Causas, Sintomas e Tratamento",
      excerpt: "Tudo que você precisa saber sobre dor lombar, desde as causas mais comuns até as melhores abordagens terapêuticas.",
      author: "Prof. Carlos Lima",
      date: "2024-01-10",
      readTime: "15 min",
      category: "patologias",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
      tags: ["Lombalgia", "Coluna", "Dor"]
    },
    {
      id: 4,
      title: "Fisioterapia Respiratória em Tempos de COVID-19",
      excerpt: "Técnicas e protocolos atualizados para reabilitação respiratória pós-COVID e outras patologias pulmonares.",
      author: "Dra. Ana Oliveira",
      date: "2024-01-08",
      readTime: "10 min",
      category: "patologias",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      tags: ["Respiratória", "COVID-19", "Reabilitação"]
    },
    {
      id: 5,
      title: "Exercícios de Pilates na Fisioterapia",
      excerpt: "Como integrar os princípios do Pilates na prática fisioterapêutica para melhor resultado dos pacientes.",
      author: "Prof. Roberto Ferreira",
      date: "2024-01-05",
      readTime: "9 min",
      category: "exercicios",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      tags: ["Pilates", "Core", "Estabilização"]
    },
    {
      id: 6,
      title: "Dicas para uma Avaliação Postural Eficiente",
      excerpt: "Passo a passo para realizar uma avaliação postural completa e identificar desvios e compensações.",
      author: "Dra. Patricia Costa",
      date: "2024-01-03",
      readTime: "11 min",
      category: "dicas",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      tags: ["Avaliação", "Postura", "Diagnóstico"]
    },
    {
      id: 7,
      title: "Anatomia do Sistema Nervoso Central",
      excerpt: "Estruturas neuroanatômicas essenciais para o fisioterapeuta: cérebro, medula espinhal e suas funções.",
      author: "Dr. Fernando Alves",
      date: "2024-01-01",
      readTime: "14 min",
      category: "anatomia",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      tags: ["Neuroanatomia", "SNC", "Neurologia"]
    },
    {
      id: 8,
      title: "Exercícios Funcionais para Idosos",
      excerpt: "Programa de exercícios funcionais adaptados para a terceira idade, focando em independência e qualidade de vida.",
      author: "Dra. Juliana Moreira",
      date: "2023-12-28",
      readTime: "13 min",
      category: "exercicios",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["Geriatria", "Funcional", "Independência"]
    },
    {
      id: 9,
      title: "Síndrome do Túnel do Carpo: Diagnóstico e Tratamento",
      excerpt: "Abordagem completa da síndrome do túnel do carpo, desde o diagnóstico até as técnicas de tratamento mais eficazes.",
      author: "Dr. Ricardo Santos",
      date: "2023-12-25",
      readTime: "12 min",
      category: "patologias",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
      tags: ["Túnel do Carpo", "Mão", "Neuropatia"]
    },
    {
      id: 10,
      title: "Como Montar um Consultório de Fisioterapia",
      excerpt: "Guia prático com dicas essenciais para abrir e estruturar seu próprio consultório de fisioterapia.",
      author: "Prof. Gabriel Oliveira",
      date: "2023-12-22",
      readTime: "16 min",
      category: "dicas",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      tags: ["Consultório", "Empreendedorismo", "Negócios"]
    },
    {
      id: 11,
      title: "Anatomia dos Músculos do Core",
      excerpt: "Estudo detalhado da musculatura do core e sua importância na estabilização e movimento do corpo.",
      author: "Dra. Camila Rodrigues",
      date: "2023-12-20",
      readTime: "10 min",
      category: "anatomia",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      tags: ["Core", "Estabilização", "Músculos"]
    },
    {
      id: 12,
      title: "Exercícios de Fortalecimento para Ombro",
      excerpt: "Protocolo progressivo de exercícios para fortalecimento e reabilitação do complexo do ombro.",
      author: "Prof. André Martins",
      date: "2023-12-18",
      readTime: "11 min",
      category: "exercicios",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["Ombro", "Fortalecimento", "Manguito Rotador"]
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
    const matchesSearch = !searchTerm || 
                         article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        paddingTop: '6rem'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              📚 Blog FisioEstudos
            </h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              marginBottom: '2rem'
            }}>
              Artigos, dicas e conhecimento atualizado para fisioterapeutas
            </p>
          </motion.div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2rem'
        }}>
          {/* Filtros e Busca */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '2rem',
            marginBottom: '3rem',
            alignItems: isMobile ? 'stretch' : 'center'
          }}>
            {/* Busca */}
            <div style={{ position: 'relative', flex: 1 }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }}
              />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Categorias */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2rem',
                    border: 'none',
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
                      : 'white',
                    color: selectedCategory === category.id ? 'white' : '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Artigos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${article.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  {/* Botão de Favorito */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem'
                  }}>
                    <FavoritoButton
                      item={{
                        titulo: article.title,
                        tipo: 'artigo',
                        descricao: article.excerpt,
                        categoria: article.category,
                        link: '/blog'
                      }}
                      size="medium"
                    />
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {categories.find(cat => cat.id === article.category)?.name}
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.75rem',
                    lineHeight: '1.4'
                  }}>
                    {article.title}
                  </h3>

                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {article.excerpt}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          background: '#f3f4f6',
                          color: '#374151',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <button style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}>
                    Ler Artigo
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#6b7280'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Nenhum artigo encontrado
              </h3>
              <p>Tente ajustar os filtros ou termo de busca.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
