import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Activity, Zap, Target, TrendingUp, Trophy, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const Esportiva = () => {
  const isMobile = window.innerWidth <= 768;
  const modules = [
    {
      id: 1,
      title: 'Biomecânica do Esporte',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      topics: [
        'Análise biomecânica do movimento',
        'Fisiologia do exercício',
        'Adaptações ao treinamento',
        'Avaliação funcional do atleta'
      ],
      duration: '8 semanas',
      level: 'Básico',
      sports: ['Futebol', 'Basquete', 'Vôlei', 'Tênis']
    },
    {
      id: 2,
      title: 'Prevenção de Lesões',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Fatores de risco',
        'Programas preventivos',
        'Aquecimento e recuperação',
        'Educação do atleta'
      ],
      duration: '10 semanas',
      level: 'Intermediário',
      sports: ['Atletismo', 'Natação', 'Ciclismo', 'Crossfit']
    },
    {
      id: 3,
      title: 'Reabilitação Esportiva',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      topics: [
        'Fases da reabilitação',
        'Exercícios funcionais',
        'Retorno ao esporte',
        'Testes de performance'
      ],
      duration: '12 semanas',
      level: 'Avançado',
      sports: ['Rugby', 'Handebol', 'Judô', 'Ginástica']
    },
    {
      id: 4,
      title: 'Performance e Otimização',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      topics: [
        'Otimização da performance',
        'Periodização do treinamento',
        'Recuperação ativa',
        'Suplementação esportiva'
      ],
      duration: '10 semanas',
      level: 'Especialização',
      sports: ['Esportes Olímpicos', 'Alto Rendimento', 'Profissional']
    }
  ];

  const sportsCategories = [
    { 
      name: 'Esportes Coletivos', 
      icon: '⚽', 
      color: 'bg-green-100 text-green-700',
      sports: ['Futebol', 'Basquete', 'Vôlei', 'Handebol'],
      injuries: ['LCA', 'Entorse', 'Contusão']
    },
    { 
      name: 'Esportes Individuais', 
      icon: '🏃‍♂️', 
      color: 'bg-blue-100 text-blue-700',
      sports: ['Atletismo', 'Natação', 'Tênis', 'Ciclismo'],
      injuries: ['Overuse', 'Tendinite', 'Stress']
    },
    { 
      name: 'Esportes de Combate', 
      icon: '🥋', 
      color: 'bg-red-100 text-red-700',
      sports: ['Judô', 'Karatê', 'MMA', 'Boxe'],
      injuries: ['Trauma', 'Luxação', 'Fratura']
    },
    { 
      name: 'Esportes Radicais', 
      icon: '🏂', 
      color: 'bg-purple-100 text-purple-700',
      sports: ['Surf', 'Skate', 'Escalada', 'Motocross'],
      injuries: ['Politrauma', 'Concussão', 'Abrasão']
    }
  ];

  const commonInjuries = [
    { name: 'Lesão LCA', icon: '🦵', severity: 'Alta', recovery: '6-9 meses' },
    { name: 'Entorse Tornozelo', icon: '🦶', severity: 'Média', recovery: '2-6 semanas' },
    { name: 'Tendinite', icon: '💪', severity: 'Baixa', recovery: '2-8 semanas' },
    { name: 'Concussão', icon: '🧠', severity: 'Alta', recovery: '1-4 semanas' },
    { name: 'Fratura Stress', icon: '🦴', severity: 'Média', recovery: '6-12 semanas' },
    { name: 'Distensão Muscular', icon: '🔴', severity: 'Baixa', recovery: '1-4 semanas' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-green-600 hover:text-green-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6">
              <span className="text-3xl">🏃‍♂️</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fisioterapia Esportiva
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Especialização em prevenção, tratamento e reabilitação de lesões esportivas para atletas de todos os níveis
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Começar Estudos
              </button>
              <button className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Material Gratuito
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { number: '4', label: 'Módulos', icon: '📚' },
              { number: '40', label: 'Semanas', icon: '📅' },
              { number: '50+', label: 'Esportes', icon: '⚽' },
              { number: '100+', label: 'Lesões Estudadas', icon: '🏥' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Modules */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              📚 Módulos de Estudo
            </h2>
            <div className="grid gap-6">
              {modules.map((module, index) => (
                <div key={module.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`bg-gradient-to-r ${module.color} text-white p-3 rounded-xl mr-4`}>
                        {module.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{module.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>⏱️ {module.duration}</span>
                          <span>📊 {module.level}</span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Módulo {module.id}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">📋 Tópicos Principais:</h4>
                      <ul className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">⚽ Esportes Abordados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.sports.map((sport, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        ✅ Conteúdo disponível • 🎯 Em desenvolvimento
                      </div>
                      <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-300">
                        Estudar Agora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sports Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              ⚽ Categorias Esportivas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sportsCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                      <span className={`${category.color} px-3 py-1 rounded-full text-sm font-medium`}>
                        {category.sports.length} modalidades
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🏆 Modalidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.sports.map((sport, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🏥 Lesões Comuns:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.injuries.map((injury, idx) => (
                        <span key={idx} className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                          {injury}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Injuries */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🏥 Lesões Esportivas Mais Comuns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonInjuries.map((injury, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{injury.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{injury.name}</h3>
                      <span className={`text-sm px-2 py-1 rounded ${
                        injury.severity === 'Alta' ? 'bg-red-100 text-red-700' :
                        injury.severity === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {injury.severity}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Recuperação:</span> {injury.recovery}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🏆 Torne-se um Especialista em Fisioterapia Esportiva!</h2>
            <p className="text-xl mb-6 opacity-90">
              Trabalhe com atletas de alto rendimento e transforme carreiras esportivas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/livros" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Livros Especializados
              </Link>
              <Link to="/quiz" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Fazer Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Esportiva;
