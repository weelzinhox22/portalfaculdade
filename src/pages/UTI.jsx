import React, { useEffect } from 'react';
import { ArrowLeft, Download, Play, BookOpen, Target, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const UTI = () => {
  const modules = [
    {
      id: 1,
      title: 'Fundamentos da UTI',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      topics: ['Ambiente de terapia intensiva', 'Monitorização hemodinâmica', 'Ventilação mecânica', 'Sedação e analgesia'],
      duration: '8 semanas',
      level: 'Básico'
    },
    {
      id: 2,
      title: 'Mobilização Precoce',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      topics: ['Protocolos de mobilização', 'Avaliação funcional', 'Exercícios no leito', 'Transferências seguras'],
      duration: '10 semanas',
      level: 'Intermediário'
    },
    {
      id: 3,
      title: 'Desmame Ventilatório',
      icon: <Target className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      topics: ['Critérios de desmame', 'Teste de respiração espontânea', 'Fortalecimento diafragmático', 'Extubação'],
      duration: '12 semanas',
      level: 'Avançado'
    }
  ];

  const conditions = [
    { name: 'Síndrome do Desuso', icon: '🛏️', color: 'bg-red-100 text-red-700', impact: 'Alto' },
    { name: 'Fraqueza Adquirida', icon: '💪', color: 'bg-orange-100 text-orange-700', impact: 'Alto' },
    { name: 'Delirium', icon: '🧠', color: 'bg-yellow-100 text-yellow-700', impact: 'Médio' },
    { name: 'Pneumonia', icon: '🫁', color: 'bg-blue-100 text-blue-700', impact: 'Alto' },
    { name: 'Trombose', icon: '🩸', color: 'bg-purple-100 text-purple-700', impact: 'Alto' },
    { name: 'Úlceras de Pressão', icon: '🔴', color: 'bg-pink-100 text-pink-700', impact: 'Médio' }
  ];

  const interventions = [
    { name: 'Mobilização no Leito', icon: '🛏️', description: 'Exercícios passivos e ativos assistidos' },
    { name: 'Sedestação', icon: '🪑', description: 'Posicionamento sentado progressivo' },
    { name: 'Ortostatismo', icon: '🧍‍♂️', description: 'Treino de postura em pé' },
    { name: 'Deambulação', icon: '🚶‍♂️', description: 'Caminhada assistida e progressiva' },
    { name: 'Exercícios Respiratórios', icon: '🫁', description: 'Higiene brônquica e expansão pulmonar' },
    { name: 'Estimulação Cognitiva', icon: '🧠', description: 'Atividades para orientação e memória' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-red-600 hover:text-red-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-6">
              <span className="text-3xl">🏥</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fisioterapia em UTI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Especialização em cuidados intensivos, mobilização precoce e reabilitação de pacientes críticos
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Começar Estudos
              </button>
              <button className="border-2 border-red-500 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center">
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
              { number: '24/7', label: 'Cuidados', icon: '🏥' },
              { number: '100%', label: 'Críticos', icon: '⚠️' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-red-600 mb-1">{stat.number}</div>
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
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Módulo {module.id}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📋 Tópicos Principais:</h4>
                    <ul className="space-y-2">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        ✅ Conteúdo disponível • 🎯 Em desenvolvimento
                      </div>
                      <button className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-300">
                        Estudar Agora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interventions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🔧 Principais Intervenções
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interventions.map((intervention, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl mb-3">{intervention.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{intervention.name}</h3>
                  <p className="text-gray-600 text-sm">{intervention.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              ⚠️ Complicações Preveníveis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {conditions.map((condition, index) => (
                <div key={index} className={`${condition.color} rounded-xl p-4 text-center`}>
                  <div className="text-2xl mb-2">{condition.icon}</div>
                  <div className="font-semibold mb-1">{condition.name}</div>
                  <div className="text-sm opacity-75">Impacto: {condition.impact}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🚨 Salve Vidas na UTI!</h2>
            <p className="text-xl mb-6 opacity-90">
              Torne-se especialista em fisioterapia intensiva e faça a diferença em momentos críticos
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/livros" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Livros Especializados
              </Link>
              <Link to="/quiz" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center">
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

export default UTI;
