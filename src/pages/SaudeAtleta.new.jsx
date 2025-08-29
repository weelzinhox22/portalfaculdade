import React, { useEffect } from 'react';
import { ArrowLeft, FileText, Video, Activity, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSense from '../components/AdSense';
import SidebarAds from '../components/SidebarAds';

const SaudeAtleta = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const modules = [
    {
      id: 1,
      title: 'Biomecânica Esportiva',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Anatomia e fisiologia do exercício',
        'Análise biomecânica do movimento',
        'Tipos de lesões esportivas',
        'Avaliação funcional do atleta'
      ],
      duration: '6 semanas',
      level: 'Básico'
    },
    {
      id: 2,
      title: 'Prevenção de Lesões',
      icon: <Target className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      topics: [
        'Programas preventivos',
        'Aquecimento e alongamento',
        'Fortalecimento específico',
        'Educação do atleta'
      ],
      duration: '8 semanas',
      level: 'Intermediário'
    },
    {
      id: 3,
      title: 'Reabilitação Atlética',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      topics: [
        'Fase aguda das lesões',
        'Técnicas de terapia manual',
        'Modalidades terapêuticas',
        'Exercícios terapêuticos'
      ],
      duration: '10 semanas',
      level: 'Avançado'
    },
    {
      id: 4,
      title: 'Performance e Retorno',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      topics: [
        'Critérios de retorno ao esporte',
        'Progressão de cargas',
        'Testes funcionais',
        'Acompanhamento contínuo'
      ],
      duration: '12 semanas',
      level: 'Especialista'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 min-h-[60vh]">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <Link to="/" className="inline-flex items-center text-white/80 mb-8 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Fisioterapia Esportiva
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">
              Especialização em avaliação, prevenção e reabilitação de atletas, com foco em desempenho e retorno seguro ao esporte.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Ad below hero */}
            <div className="mb-12">
              <AdSense size="large" slot="hero-bottom" />
            </div>

            {/* Modules Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Módulos de Estudo</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-500 transition-all duration-300"
                  >
                    <div className={`p-6 bg-gradient-to-r ${module.color}`}>
                      <div className="text-white mb-4">{module.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
                      <p className="text-blue-100 text-sm">{module.duration} • {module.level}</p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-2">
                        {module.topics.map((topic, index) => (
                          <li key={index} className="text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Ad */}
            <div className="mt-12">
              <AdSense size="large" slot="content-bottom" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <SidebarAds />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaudeAtleta;
