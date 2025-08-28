import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Star, BookOpen, Award, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoritoButton from '../components/FavoritoButton';
import useMobile from '../hooks/useMobile';

const Cursos = () => {
  const isMobile = useMobile();
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos os Cursos', count: 8 },
    { id: 'basico', name: 'Básico', count: 3 },
    { id: 'intermediario', name: 'Intermediário', count: 3 },
    { id: 'avancado', name: 'Avançado', count: 2 }
  ];

  const courses = [
    {
      id: 1,
      title: "Anatomia Humana Completa",
      instructor: "Dr. João Silva",
      level: "basico",
      duration: "40 horas",
      students: 1250,
      rating: 4.9,
      reviews: 234,
      price: 197.00,
      originalPrice: 397.00,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      description: "Curso completo de anatomia humana com foco na prática fisioterapêutica.",
      modules: 12,
      certificate: true,
      highlights: [
        "Anatomia por sistemas",
        "Casos clínicos práticos",
        "Material 3D interativo",
        "Certificado de conclusão"
      ]
    },
    {
      id: 2,
      title: "Fisioterapia Respiratória Avançada",
      instructor: "Dra. Maria Santos",
      level: "avancado",
      duration: "60 horas",
      students: 890,
      rating: 4.8,
      reviews: 156,
      price: 297.00,
      originalPrice: 597.00,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      description: "Técnicas avançadas de fisioterapia respiratória para diferentes patologias.",
      modules: 16,
      certificate: true,
      highlights: [
        "Ventilação mecânica",
        "Técnicas de higiene brônquica",
        "Reabilitação pulmonar",
        "Casos clínicos reais"
      ]
    },
    {
      id: 3,
      title: "Exercícios Terapêuticos na Prática",
      instructor: "Prof. Carlos Lima",
      level: "intermediario",
      duration: "35 horas",
      students: 1450,
      rating: 4.7,
      reviews: 298,
      price: 167.00,
      originalPrice: 347.00,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      description: "Aprenda a prescrever e aplicar exercícios terapêuticos de forma eficaz.",
      modules: 10,
      certificate: true,
      highlights: [
        "Prescrição de exercícios",
        "Progressões terapêuticas",
        "Adaptações por patologia",
        "Vídeos demonstrativos"
      ]
    },
    {
      id: 4,
      title: "Fisioterapia Pediátrica Essencial",
      instructor: "Dra. Ana Oliveira",
      level: "intermediario",
      duration: "45 horas",
      students: 720,
      rating: 4.9,
      reviews: 187,
      price: 227.00,
      originalPrice: 447.00,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      description: "Fundamentos e práticas da fisioterapia pediátrica do nascimento à adolescência.",
      modules: 14,
      certificate: true,
      highlights: [
        "Desenvolvimento motor",
        "Patologias pediátricas",
        "Técnicas de tratamento",
        "Orientação familiar"
      ]
    },
    {
      id: 5,
      title: "Introdução à Fisioterapia",
      instructor: "Prof. Roberto Ferreira",
      level: "basico",
      duration: "25 horas",
      students: 2100,
      rating: 4.6,
      reviews: 445,
      price: 97.00,
      originalPrice: 197.00,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
      description: "Curso introdutório perfeito para quem está começando na fisioterapia.",
      modules: 8,
      certificate: true,
      highlights: [
        "História da fisioterapia",
        "Princípios básicos",
        "Ética profissional",
        "Primeiros passos"
      ]
    },
    {
      id: 6,
      title: "Fisioterapia Esportiva Completa",
      instructor: "Dra. Patricia Costa",
      level: "avancado",
      duration: "55 horas",
      students: 650,
      rating: 4.8,
      reviews: 134,
      price: 347.00,
      originalPrice: 697.00,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      description: "Especialização em fisioterapia esportiva para atletas de alto rendimento.",
      modules: 18,
      certificate: true,
      highlights: [
        "Prevenção de lesões",
        "Reabilitação esportiva",
        "Biomecânica do esporte",
        "Retorno ao esporte"
      ]
    },
    {
      id: 7,
      title: "Avaliação Fisioterapêutica",
      instructor: "Dr. Fernando Alves",
      level: "intermediario",
      duration: "30 horas",
      students: 980,
      rating: 4.7,
      reviews: 203,
      price: 147.00,
      originalPrice: 297.00,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      description: "Técnicas e métodos de avaliação fisioterapêutica completa.",
      modules: 9,
      certificate: true,
      highlights: [
        "Anamnese detalhada",
        "Testes funcionais",
        "Avaliação postural",
        "Relatórios técnicos"
      ]
    },
    {
      id: 8,
      title: "Primeiros Socorros para Fisioterapeutas",
      instructor: "Dra. Juliana Moreira",
      level: "basico",
      duration: "20 horas",
      students: 1800,
      rating: 4.8,
      reviews: 367,
      price: 77.00,
      originalPrice: 157.00,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      description: "Conhecimentos essenciais de primeiros socorros aplicados à fisioterapia.",
      modules: 6,
      certificate: true,
      highlights: [
        "Situações de emergência",
        "RCP básica",
        "Imobilizações",
        "Protocolos de atendimento"
      ]
    }
  ];

  const filteredCourses = courses.filter(course => {
    return selectedCategory === 'todos' || course.level === selectedCategory;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'basico': return '#10b981';
      case 'intermediario': return '#f59e0b';
      case 'avancado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getLevelName = (level) => {
    switch (level) {
      case 'basico': return 'Básico';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      default: return level;
    }
  };

  return (
    <>
      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        paddingTop: '6rem'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
              🎓 Cursos Online
            </h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              marginBottom: '2rem'
            }}>
              Aprenda com os melhores professores e avance sua carreira na fisioterapia
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                <span>5.000+ Alunos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} />
                <span>Certificados</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} />
                <span>Acesso Vitalício</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2rem'
        }}>
          {/* Filtros */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
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
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
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

          {/* Grid de Cursos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${course.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: getLevelColor(course.level),
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {getLevelName(course.level)}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Play size={16} />
                  </div>

                  {/* Botão de Favorito */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem'
                  }}>
                    <FavoritoButton
                      item={{
                        titulo: course.title,
                        tipo: 'curso',
                        descricao: course.description,
                        preco: course.price,
                        categoria: course.level,
                        link: '/cursos'
                      }}
                      size="medium"
                    />
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {course.title}
                  </h3>

                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    Por {course.instructor}
                  </p>

                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    marginBottom: '1rem'
                  }}>
                    {course.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <BookOpen size={14} />
                      <span>{course.modules} módulos</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Users size={14} />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{course.rating}</span>
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ({course.reviews} avaliações)
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#f59e0b'
                      }}>
                        R$ {course.price.toFixed(2)}
                      </span>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        textDecoration: 'line-through',
                        marginLeft: '0.5rem'
                      }}>
                        R$ {course.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    {course.certificate && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: '#10b981',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        <Award size={16} />
                        <span>Certificado</span>
                      </div>
                    )}
                  </div>

                  <button style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}>
                    🚧 Em Breve
                  </button>

                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'center'
                  }}>
                    💡 Funcionalidade em desenvolvimento
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cursos;
