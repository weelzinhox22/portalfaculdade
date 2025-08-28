import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, BookOpen, Target, Heart, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pediatrica = () => {
  const modules = [
    {
      id: 1,
      title: 'Desenvolvimento Neuromotor',
      icon: <Baby className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      topics: ['Marcos do desenvolvimento', 'Reflexos primitivos', 'Controle postural', 'Aquisições motoras'],
      duration: '8 semanas',
      level: 'Básico',
      ages: ['0-6 meses', '6-12 meses', '1-2 anos', '2-5 anos']
    },
    {
      id: 2,
      title: 'Avaliação Pediátrica',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      topics: ['Escalas de desenvolvimento', 'Testes padronizados', 'Observação clínica', 'Anamnese familiar'],
      duration: '10 semanas',
      level: 'Intermediário',
      ages: ['Neonatos', 'Lactentes', 'Pré-escolares', 'Escolares']
    },
    {
      id: 3,
      title: 'Intervenção Precoce',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: ['Estimulação precoce', 'Terapia lúdica', 'Orientação familiar', 'Integração sensorial'],
      duration: '12 semanas',
      level: 'Avançado',
      ages: ['0-3 anos', 'Prematuros', 'Alto risco']
    }
  ];

  const conditions = [
    { name: 'Paralisia Cerebral', icon: '🧠', color: 'bg-blue-100 text-blue-700', prevalence: '2-3/1000' },
    { name: 'Atraso Motor', icon: '👶', color: 'bg-pink-100 text-pink-700', prevalence: '5-10%' },
    { name: 'Prematuridade', icon: '🍼', color: 'bg-purple-100 text-purple-700', prevalence: '11%' },
    { name: 'Síndrome de Down', icon: '💙', color: 'bg-yellow-100 text-yellow-700', prevalence: '1/700' },
    { name: 'Autismo', icon: '🌈', color: 'bg-green-100 text-green-700', prevalence: '1/54' },
    { name: 'Distrofia Muscular', icon: '💪', color: 'bg-red-100 text-red-700', prevalence: '1/3500' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-6">
              <span className="text-3xl">👶</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fisioterapia Pediátrica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Especialização em desenvolvimento infantil, intervenção precoce e reabilitação pediátrica
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Começar Estudos
              </button>
              <button className="border-2 border-pink-500 text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Material Gratuito
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { number: '3', label: 'Módulos', icon: '📚' },
              { number: '30', label: 'Semanas', icon: '📅' },
              { number: '20+', label: 'Condições', icon: '🏥' },
              { number: '0-18', label: 'Anos', icon: '👶' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-pink-600 mb-1">{stat.number}</div>
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
              {modules.map((module) => (
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
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                      Módulo {module.id}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">📋 Tópicos Principais:</h4>
                      <ul className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">👶 Faixas Etárias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.ages.map((age, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {age}
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
                      <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                        Estudar Agora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🏥 Principais Condições Pediátricas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {conditions.map((condition, index) => (
                <div key={index} className={`${condition.color} rounded-xl p-4 text-center`}>
                  <div className="text-2xl mb-2">{condition.icon}</div>
                  <div className="font-semibold mb-1">{condition.name}</div>
                  <div className="text-sm opacity-75">Incidência: {condition.prevalence}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🌟 Transforme o Futuro das Crianças!</h2>
            <p className="text-xl mb-6 opacity-90">
              Especialize-se em fisioterapia pediátrica e faça a diferença no desenvolvimento infantil
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/livros" className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Livros Especializados
              </Link>
              <Link to="/quiz" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center">
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

export default Pediatrica;
