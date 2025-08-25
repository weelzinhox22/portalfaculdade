import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Play, ExternalLink, BookOpen, FileText, Video, Activity, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdSense from '../components/AdSense';
import NewsletterModal from '../components/NewsletterModal';
import SidebarAds from '../components/SidebarAds';

const SaudeAtleta = () => {
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
      level: 'Básico',
      sports: ['Futebol', 'Basquete', 'Tênis', 'Corrida']
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
      level: 'Intermediário',
      sports: ['Crossfit', 'Natação', 'Ciclismo', 'Atletismo']
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
      level: 'Avançado',
      sports: ['Futebol', 'Vôlei', 'MMA', 'Rugby']
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
      level: 'Especialista',
      sports: ['Todos os esportes']
    }
  ];

  const materials = [
    {
      id: 1,
      title: 'Apostila Completa - Fisioterapia Esportiva',
      description: 'Material didático completo com 300+ páginas abordando desde fundamentos até técnicas avançadas de reabilitação esportiva.',
      type: 'PDF',
      icon: <FileText className="w-6 h-6" />,
      size: '28.5 MB',
      pages: '320',
      downloads: '2.8k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Fundamentação Teórica'
    },
    {
      id: 2,
      title: 'Videoaulas - Técnicas de Avaliação',
      description: 'Série completa de vídeos demonstrando técnicas práticas de avaliação funcional e biomecânica para atletas.',
      type: 'Vídeo',
      icon: <Video className="w-6 h-6" />,
      duration: '4h 20min',
      quality: '4K',
      downloads: '1.9k',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d15f3d2d7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Avaliação Prática'
    },
    {
      id: 3,
      title: 'Protocolos de Reabilitação Esportiva',
      description: 'Guias práticos e protocolos específicos para diferentes modalidades esportivas e tipos de lesões.',
      type: 'Interativo',
      icon: <ExternalLink className="w-6 h-6" />,
      protocols: '45+',
      sports: '20+',
      downloads: '3.2k',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Protocolos Clínicos'
    }
  ];

  const sportsCategories = [
    { name: 'Futebol', icon: '⚽', color: 'bg-green-100 text-green-700' },
    { name: 'Basquete', icon: '🏀', color: 'bg-orange-100 text-orange-700' },
    { name: 'Tênis', icon: '🎾', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Natação', icon: '🏊‍♂️', color: 'bg-blue-100 text-blue-700' },
    { name: 'Corrida', icon: '🏃‍♂️', color: 'bg-red-100 text-red-700' },
    { name: 'Ciclismo', icon: '🚴‍♂️', color: 'bg-purple-100 text-purple-700' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="specialty-page">
      <NewsletterModal />
      
      {/* Hero Section */}
      <section 
        className="specialty-hero relative"
        style={{
          minHeight: '60vh',
          width: '100%',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1
          }}
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link to="/" className="inline-flex items-center text-white/80 mb-8 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Fisioterapia Esportiva
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">
              Especialização em avaliação, prevenção e reabilitação de atletas, com foco em desempenho e retorno seguro ao esporte.
            </p>
            <div className="flex flex-wrap gap-4">
              {sportsCategories.map((sport, index) => (
                <motion.div
                  key={sport.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-4 py-2 rounded-full ${sport.color} flex items-center gap-2`}
                >
                  <span className="text-xl">{sport.icon}</span>
                  <span className="font-medium">{sport.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
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

            {/* Materials Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Materiais Didáticos</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-500 transition-all duration-300"
                  >
                    <img
                      src={material.image}
                      alt={material.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        {material.icon}
                        <span>{material.type}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {material.downloads} downloads
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium text-gray-700">{material.rating}</span>
                        </div>
                      </div>
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
          <div className="w-full lg:w-80 space-y-6">
            <SidebarAds />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaudeAtleta;
