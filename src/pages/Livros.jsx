import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ShoppingCart, 
  Star, 
  Download,
  Filter,
  Search,
  Heart,
  Eye,
  Users,
  Award,
  Zap,
  CheckCircle
} from 'lucide-react';
import useMobile from '../hooks/useMobile';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoritoButton from '../components/FavoritoButton';
import Newsletter from '../components/Newsletter';

const Livros = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 'todos', name: 'Todos os Livros', icon: '📚', count: 24 },
    { id: 'anatomia', name: 'Anatomia & Fisiologia', icon: '🦴', count: 5 },
    { id: 'pediatria', name: 'Pediatria', icon: '👶', count: 3 },
    { id: 'geriatria', name: 'Geriatria', icon: '👴', count: 3 },
    { id: 'esportiva', name: 'Fisioterapia Esportiva', icon: '🏃‍♂️', count: 4 },
    { id: 'saude-mulher', name: 'Saúde da Mulher', icon: '🤱', count: 2 },
    { id: 'respiratoria', name: 'Fisioterapia Respiratória', icon: '🫁', count: 2 },
    { id: 'exercicios', name: 'Exercícios Terapêuticos', icon: '💪', count: 5 }
  ];

  const books = [
    {
      id: 1,
      title: "Apostila de Músculos",
      author: "Diversos Autores",
      category: 'anatomia',
      price: 15.00,
      originalPrice: 45.00,
      discount: 67,
      rating: 4.8,
      reviews: 234,
      pages: 180,
      year: 2023,
      description: "Guia completo dos músculos do corpo humano com ilustrações detalhadas e origem/inserção de cada músculo.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1yq1jOkQ7YHMq-XlcqvAICw3_ST7VXnOS/view?usp=sharing',
      bestseller: true,
      features: [
        'Ilustrações anatômicas detalhadas',
        'Origem e inserção muscular',
        'Ações e inervações',
        'Aplicação clínica prática'
      ]
    },
    {
      id: 2,
      title: "Tratado de Pediatria 4ª Edição",
      author: "Nelson Textbook",
      category: 'pediatria',
      price: 15.00,
      originalPrice: 280.00,
      discount: 95,
      rating: 4.9,
      reviews: 189,
      pages: 3500,
      year: 2020,
      description: "Referência mundial em pediatria com abordagem completa do desenvolvimento infantil e patologias pediátricas.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1hVzil5GrZ44lCP5tJRrWqlIqBU0TB4L7/view?usp=sharing',
      bestseller: true,
      features: [
        'Mais de 3500 páginas',
        'Casos clínicos reais',
        'Protocolos atualizados',
        'Referência mundial'
      ]
    },
    {
      id: 3,
      title: "Tratado de Obesidade 2ª Edição",
      author: "ABESO",
      category: 'geriatria',
      price: 15.00,
      originalPrice: 150.00,
      discount: 90,
      rating: 4.7,
      reviews: 156,
      pages: 890,
      year: 2022,
      description: "Abordagem multidisciplinar da obesidade com foco em prevenção, tratamento e reabilitação.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1MZpWuKZDKJY4CvwT_q073mYoJrCkkuWL/view?usp=sharing',
      features: [
        'Abordagem multidisciplinar',
        'Protocolos de tratamento',
        'Exercícios específicos',
        'Nutrição aplicada'
      ]
    },
    {
      id: 4,
      title: "Tratado de Geriatria e Gerontologia 3ª Ed",
      author: "Freitas & Py",
      category: 'geriatria',
      price: 15.00,
      originalPrice: 220.00,
      discount: 93,
      rating: 4.8,
      reviews: 203,
      pages: 1200,
      year: 2021,
      description: "Referência brasileira em geriatria com abordagem integral do envelhecimento saudável.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/19Of_NRAxCyxHV4gRpgXAhkatriBVjPrE/view?usp=sharing',
      features: [
        'Envelhecimento saudável',
        'Síndromes geriátricas',
        'Reabilitação funcional',
        'Cuidados paliativos'
      ]
    },
    {
      id: 5,
      title: "Tratado de Fisiologia Médica - Guyton & Hall 12ª ed",
      author: "Guyton & Hall",
      category: 'anatomia',
      price: 15.00,
      originalPrice: 350.00,
      discount: 96,
      rating: 4.9,
      reviews: 567,
      pages: 1200,
      year: 2021,
      description: "O livro de fisiologia mais usado no mundo, referência absoluta para estudantes e profissionais.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1oX9J6bvCgQjl6WC-ZMzW5jxrNrQAJmDx/view?usp=sharing',
      bestseller: true,
      features: [
        'Referência mundial',
        'Ilustrações didáticas',
        'Casos clínicos',
        'Atualização constante'
      ]
    },
    {
      id: 6,
      title: "Princípios de Anatomia Humana 14ª Edição",
      author: "Tortora & Derrickson",
      category: 'anatomia',
      price: 15.00,
      originalPrice: 280.00,
      discount: 95,
      rating: 4.8,
      reviews: 445,
      pages: 1100,
      year: 2022,
      description: "Atlas de anatomia com abordagem sistêmica e correlações clínicas essenciais.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1MEIQrF-jaidYFOwEguT8CQsohvKrBsbw/view?usp=sharing',
      features: [
        'Ilustrações em alta resolução',
        'Correlações clínicas',
        'Anatomia sistêmica',
        'Recursos digitais'
      ]
    },
    {
      id: 7,
      title: "PNF - Facilitação Neuromuscular Proprioceptiva",
      author: "Adler, Beckers & Buck",
      category: 'exercicios',
      price: 15.00,
      originalPrice: 180.00,
      discount: 92,
      rating: 4.7,
      reviews: 178,
      pages: 420,
      year: 2020,
      description: "Técnicas avançadas de PNF para reabilitação neurológica e ortopédica.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1P2c__VfKuc1EoSDO-B0cwQ-gxRy3HAV4/view?usp=sharing',
      features: [
        'Técnicas de PNF',
        'Padrões de movimento',
        'Aplicação prática',
        'Vídeos demonstrativos'
      ]
    },
    {
      id: 8,
      title: "Pilates - Bolas e Faixas",
      author: "Diversos Autores",
      category: 'exercicios',
      price: 15.00,
      originalPrice: 89.00,
      discount: 83,
      rating: 4.6,
      reviews: 134,
      pages: 250,
      year: 2021,
      description: "Exercícios de Pilates com acessórios para fortalecimento e flexibilidade.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/13gAUg74R14bUW-q4xsDWOQ6oA_C8DFFR/view?usp=sharing',
      features: [
        'Exercícios com bolas',
        'Técnicas com faixas',
        'Progressões didáticas',
        'Fotos ilustrativas'
      ]
    },
    {
      id: 9,
      title: "Lesões no Esporte - Uma Abordagem Anatômica",
      author: "Diversos Autores",
      category: 'esportiva',
      price: 15.00,
      originalPrice: 165.00,
      discount: 91,
      rating: 4.7,
      reviews: 198,
      pages: 380,
      year: 2020,
      description: "Abordagem anatômica das lesões esportivas mais comuns com protocolos de tratamento.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1plkeUz1fb2jC9m9L_Oul8EkC4LqKQGAN/view?usp=sharing',
      features: [
        'Lesões por modalidade',
        'Anatomia aplicada',
        'Protocolos de reabilitação',
        'Prevenção de lesões'
      ]
    },
    {
      id: 10,
      title: "Intervenções para Crianças com Paralisia Cerebral",
      author: "Diversos Autores",
      category: 'pediatria',
      price: 15.00,
      originalPrice: 195.00,
      discount: 92,
      rating: 4.8,
      reviews: 167,
      pages: 450,
      year: 2021,
      description: "Raciocínio clínico para tomada de decisão baseada em evidência na paralisia cerebral.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1qdZg2VXkLILynSYU5Z7CmLRtlEBDE_VK/view?usp=sharing',
      features: [
        'Evidências científicas',
        'Raciocínio clínico',
        'Intervenções práticas',
        'Casos clínicos'
      ]
    },
    {
      id: 11,
      title: "Fisioterapia na Prática Esportiva",
      author: "Diversos Autores",
      category: 'esportiva',
      price: 15.00,
      originalPrice: 145.00,
      discount: 90,
      rating: 4.6,
      reviews: 223,
      pages: 320,
      year: 2022,
      description: "Aplicação prática da fisioterapia no esporte com técnicas modernas de reabilitação.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1iRw5qtOBluxuxTnPM6snxSkM9P02ren3/view?usp=sharing',
      features: [
        'Técnicas modernas',
        'Aplicação prática',
        'Modalidades esportivas',
        'Retorno ao esporte'
      ]
    },
    {
      id: 12,
      title: "Fisioterapia Aplicada à Saúde da Mulher",
      author: "Elza Baracho",
      category: 'saude-mulher',
      price: 15.00,
      originalPrice: 175.00,
      discount: 91,
      rating: 4.9,
      reviews: 289,
      pages: 520,
      year: 2021,
      description: "Abordagem completa da fisioterapia na saúde da mulher, incluindo uroginecologia e obstetrícia.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1yGB0XUqY6wpDNQ0IGvjgQqg1K0mCF-Zg/view?usp=sharing',
      bestseller: true,
      features: [
        'Uroginecologia',
        'Fisioterapia obstétrica',
        'Disfunções pélvicas',
        'Casos práticos'
      ]
    },
    {
      id: 13,
      title: "Fisiopatologia Pulmonar - Princípios Básicos",
      author: "John B. West",
      category: 'respiratoria',
      price: 15.00,
      originalPrice: 185.00,
      discount: 92,
      rating: 4.8,
      reviews: 156,
      pages: 280,
      year: 2020,
      description: "Fundamentos da fisiopatologia pulmonar essenciais para fisioterapeutas respiratórios.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1yGB0XUqY6wpDNQ0IGvjgQqg1K0mCF-Zg/view?usp=sharing',
      features: [
        'Princípios básicos',
        'Fisiopatologia aplicada',
        'Casos clínicos',
        'Ilustrações didáticas'
      ]
    },
    {
      id: 14,
      title: "Fisiologia do Esporte e do Exercício 7ª Ed",
      author: "Wilmore, Costill & Kenney",
      category: 'esportiva',
      price: 15.00,
      originalPrice: 295.00,
      discount: 95,
      rating: 4.9,
      reviews: 445,
      pages: 640,
      year: 2022,
      description: "Referência mundial em fisiologia do exercício com aplicações práticas no esporte.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1J322xtntmUMlIv305Duwrr-d9i-S-sEX/view?usp=sharing',
      bestseller: true,
      features: [
        'Referência mundial',
        'Fisiologia aplicada',
        'Métodos de treinamento',
        'Avaliação funcional'
      ]
    },
    {
      id: 15,
      title: "Exercícios Terapêuticos",
      author: "Diversos Autores",
      category: 'exercicios',
      price: 15.00,
      originalPrice: 125.00,
      discount: 88,
      rating: 4.7,
      reviews: 267,
      pages: 420,
      year: 2021,
      description: "Compêndio completo de exercícios terapêuticos para diversas patologias.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1mcBik8Hvyi95OSJWGAknbHaTCHWvcyUr/view?usp=sharing',
      features: [
        'Exercícios por patologia',
        'Progressões terapêuticas',
        'Fotos demonstrativas',
        'Protocolos práticos'
      ]
    },
    {
      id: 16,
      title: "Exercícios Terapêuticos - Fundamentos e Técnicas",
      author: "Kisner & Colby",
      category: 'exercicios',
      price: 15.00,
      originalPrice: 245.00,
      discount: 94,
      rating: 4.8,
      reviews: 334,
      pages: 890,
      year: 2020,
      description: "Livro clássico sobre exercícios terapêuticos com fundamentos científicos e aplicação prática.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/1h8wdddn6iHryZX0m0-KYMUyadnlMGOAu/view?usp=sharing',
      bestseller: true,
      features: [
        'Fundamentos científicos',
        'Técnicas avançadas',
        'Aplicação clínica',
        'Referência mundial'
      ]
    },
    {
      id: 17,
      title: "Fisioterapia em UTI",
      author: "Dr. Carlos Mendes",
      category: 'respiratoria',
      price: 15.00,
      originalPrice: 180.00,
      discount: 92,
      rating: 4.9,
      reviews: 145,
      pages: 380,
      year: 2024,
      description: "Guia completo para fisioterapia em unidades de terapia intensiva, incluindo ventilação mecânica e mobilização precoce.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo17',
      bestseller: true,
      features: [
        'Ventilação Mecânica',
        'Mobilização Precoce',
        'Protocolos de UTI',
        'Casos Clínicos Reais'
      ]
    },
    {
      id: 18,
      title: "Fisioterapia Pediátrica Moderna",
      author: "Dra. Ana Beatriz",
      category: 'pediatria',
      price: 15.00,
      originalPrice: 165.00,
      discount: 91,
      rating: 4.8,
      reviews: 198,
      pages: 420,
      year: 2024,
      description: "Abordagens modernas em fisioterapia pediátrica, desde neonatos até adolescentes.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo18',
      features: [
        'Desenvolvimento Motor',
        'Paralisia Cerebral',
        'Prematuridade',
        'Integração Sensorial'
      ]
    },
    {
      id: 19,
      title: "Fisioterapia Geriátrica Avançada",
      author: "Prof. Roberto Silva",
      category: 'geriatria',
      price: 15.00,
      originalPrice: 195.00,
      discount: 92,
      rating: 4.7,
      reviews: 167,
      pages: 350,
      year: 2024,
      description: "Cuidados fisioterapêuticos especializados para a terceira idade, prevenção de quedas e manutenção da independência.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo19',
      features: [
        'Prevenção de Quedas',
        'Sarcopenia',
        'Fragilidade',
        'Reabilitação Cognitiva'
      ]
    },
    {
      id: 20,
      title: "Fisioterapia Aquática",
      author: "Dra. Marina Costa",
      category: 'exercicios',
      price: 15.00,
      originalPrice: 140.00,
      discount: 89,
      rating: 4.6,
      reviews: 134,
      pages: 290,
      year: 2024,
      description: "Técnicas e protocolos de hidroterapia para diferentes patologias e faixas etárias.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo20',
      features: [
        'Hidroterapia',
        'Exercícios Aquáticos',
        'Bad Ragaz',
        'Reabilitação Aquática'
      ]
    },
    {
      id: 21,
      title: "Fisioterapia Dermatofuncional",
      author: "Dra. Camila Rodrigues",
      category: 'saude-mulher',
      price: 15.00,
      originalPrice: 175.00,
      discount: 91,
      rating: 4.8,
      reviews: 223,
      pages: 320,
      year: 2024,
      description: "Técnicas avançadas em fisioterapia dermatofuncional, estética e reabilitação da pele.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo21',
      bestseller: true,
      features: [
        'Radiofrequência',
        'Ultrassom Estético',
        'Drenagem Linfática',
        'Cicatrização'
      ]
    },
    {
      id: 22,
      title: "Fisioterapia do Trabalho",
      author: "Prof. André Santos",
      category: 'anatomia',
      price: 15.00,
      originalPrice: 155.00,
      discount: 90,
      rating: 4.7,
      reviews: 189,
      pages: 360,
      year: 2024,
      description: "Prevenção e tratamento de lesões relacionadas ao trabalho, ergonomia e saúde ocupacional.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo22',
      features: [
        'Ergonomia',
        'LER/DORT',
        'Ginástica Laboral',
        'Análise Postural'
      ]
    },
    {
      id: 23,
      title: "Fisioterapia Vestibular",
      author: "Dr. Fernando Lima",
      category: 'anatomia',
      price: 15.00,
      originalPrice: 160.00,
      discount: 91,
      rating: 4.8,
      reviews: 156,
      pages: 310,
      year: 2024,
      description: "Diagnóstico e tratamento de distúrbios do equilíbrio e tontura através da fisioterapia vestibular.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo23',
      features: [
        'Vertigem',
        'Manobras Vestibulares',
        'Reabilitação do Equilíbrio',
        'Testes Funcionais'
      ]
    },
    {
      id: 24,
      title: "Fisioterapia Esportiva de Elite",
      author: "Prof. Gabriel Ferreira",
      category: 'esportiva',
      price: 15.00,
      originalPrice: 220.00,
      discount: 93,
      rating: 4.9,
      reviews: 278,
      pages: 450,
      year: 2024,
      description: "Preparação física, prevenção de lesões e reabilitação em atletas de alto rendimento.",
      cover: '/api/placeholder/300/400',
      driveLink: 'https://drive.google.com/file/d/exemplo24',
      bestseller: true,
      features: [
        'Biomecânica Esportiva',
        'Prevenção de Lesões',
        'Performance',
        'Recuperação Ativa'
      ]
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'todos' || book.category === selectedCategory;
    const matchesSearch = !searchTerm || 
                         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const addToCart = (book) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === book.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const buyNow = (book) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Redirecionar para checkout DIRETO do Mercado Pago
    navigate('/checkout-direto', {
      state: {
        items: [{ ...book, quantity: 1 }],
        total: book.price
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO Meta Tags
    document.title = 'Livros de Fisioterapia - R$ 15,00 cada | FisioEstudos';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Livros de fisioterapia por apenas R$ 15,00 cada. Guyton, Tortora, Tratados e mais. Download imediato após pagamento!');
    }
  }, []);

  return (
    <>
      <Header />
      
      {/* Carrinho Flutuante */}
      {isAuthenticated && cart.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          background: 'white',
          borderRadius: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
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
            <ShoppingCart size={24} color="#f59e0b" />
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
                  {item.title.substring(0, 25)}...
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Qtd: {item.quantity} × R$ {item.price.toFixed(2)}
                </p>
              </div>
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
                color: '#f59e0b'
              }}>
                R$ {getCartTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => navigate('/checkout-direto', {
                state: {
                  items: cart,
                  total: getCartTotal()
                }
              })}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        paddingTop: '6rem'
      }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
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
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)'
                }}>
                  <BookOpen size={40} color="white" />
                </div>
              </div>

              <h1 style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                Livros de Fisioterapia
              </h1>

              <p style={{
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                color: '#fef3c7',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '0 auto 2rem auto',
                fontWeight: '500'
              }}>
                Os melhores livros de fisioterapia por apenas <strong>R$ 15,00 cada</strong>.
                Download imediato após o pagamento!
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem'
                }}>
                  <BookOpen size={20} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {books.length} Livros Disponíveis
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
                  <Download size={20} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    Download Imediato
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
                  <Award size={20} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    Até 96% de Desconto
                  </span>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: '2rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#fef3c7'
                }}>
                  🔥 Oferta Especial de Lançamento
                </h3>
                <p style={{
                  fontSize: '1rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Livros que custam até R$ 350,00 por apenas <strong>R$ 15,00</strong>.
                  Economize milhares de reais em sua biblioteca!
                </p>
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
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>
                  {books.length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Livros Disponíveis
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#10b981',
                  marginBottom: '0.5rem'
                }}>
                  R$ 15
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Preço Único
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#ef4444',
                  marginBottom: '0.5rem'
                }}>
                  96%
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Desconto Máximo
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#8b5cf6',
                  marginBottom: '0.5rem'
                }}>
                  4.8
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Avaliação Média
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
                  placeholder="Buscar por título ou autor..."
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
              </div>
            </div>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              overflowX: isMobile ? 'auto' : 'visible',
              paddingBottom: isMobile ? '1rem' : '0'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
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
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                  <span style={{
                    background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                    color: selectedCategory === category.id ? 'white' : '#6b7280',
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '1rem',
                    fontWeight: '600'
                  }}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Books Grid */}
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
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
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
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
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
                      {book.bestseller && (
                        <div style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
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
                      <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        -{book.discount}%
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem'
                    }}>
                      <FavoritoButton
                        item={{
                          titulo: book.title,
                          tipo: 'livro',
                          descricao: book.description,
                          preco: book.price,
                          categoria: book.category,
                          link: '/livros'
                        }}
                        size="medium"
                      />
                    </div>

                    {/* Book Icon */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
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
                        background: '#fef3c7',
                        color: '#f59e0b',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {book.pages} páginas
                      </span>
                      <span style={{
                        color: '#6b7280',
                        fontSize: '0.875rem'
                      }}>
                        {book.year}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {book.title}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginBottom: '1rem'
                    }}>
                      por {book.author}
                    </p>

                    <p style={{
                      color: '#4b5563',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      marginBottom: '1.5rem'
                    }}>
                      {book.description}
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
                        ✨ Destaques:
                      </h4>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                      }}>
                        {book.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            <CheckCircle size={14} color="#10b981" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

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
                        {book.rating}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Users size={16} />
                        {book.reviews} avaliações
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.875rem',
                          color: '#9ca3af',
                          textDecoration: 'line-through'
                        }}>
                          R$ {book.originalPrice.toFixed(2)}
                        </span>
                        <span style={{
                          fontSize: '2rem',
                          fontWeight: '800',
                          color: '#f59e0b'
                        }}>
                          R$ {book.price.toFixed(2)}
                        </span>
                      </div>
                      <div style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        Economize R$ {(book.originalPrice - book.price).toFixed(2)}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem'
                    }}>
                      <button
                        onClick={() => buyNow(book)}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                        <Zap size={20} />
                        Comprar Agora
                      </button>

                      {isAuthenticated && (
                        <button
                          onClick={() => addToCart(book)}
                          style={{
                            background: 'white',
                            color: '#f59e0b',
                            border: '2px solid #f59e0b',
                            borderRadius: '1rem',
                            padding: '1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <ShoppingCart size={20} />
                        </button>
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

export default Livros;
