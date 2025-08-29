import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMCCalculator, PosturaCalculator, FlexibilidadeCalculator } from '../components/calculadoras';

const Calculadoras = () => {
  const [activeCalculator, setActiveCalculator] = useState('imc');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento para efeito visual
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'imc':
        return <IMCCalculator />;
      case 'postura':
        return <PosturaCalculator />;
      case 'flexibilidade':
        return <FlexibilidadeCalculator />;
      default:
        return <IMCCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 border-t-4 border-emerald-500 border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-emerald-600 font-medium">Carregando calculadoras...</p>
          </motion.div>
        </div>
      ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 max-w-6xl"
      >
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-1/2 bg-emerald-100 rounded-full filter blur-3xl opacity-20"></div>
          </div>
          
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl font-extrabold text-center mb-6 text-gray-800 tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Calculadoras</span> de Avaliação
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-xl text-center text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Utilize nossas ferramentas interativas para realizar avaliações preliminares 
              e obter recomendações personalizadas para sua saúde física.
            </motion.p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-12 relative z-10"
        >
          {[
            { id: 'imc', label: 'Calculadora de IMC', icon: '⚖️' },
            { id: 'postura', label: 'Avaliação Postural', icon: '🧍' },
            { id: 'flexibilidade', label: 'Avaliação de Flexibilidade', icon: '🤸' }
          ].map((calc) => (
            <motion.button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeCalculator === calc.id 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow'}`}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-xl">{calc.icon}</span>
              <span>{calc.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mb-16 relative z-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalculator}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCalculator()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="bg-white rounded-3xl p-10 max-w-4xl mx-auto shadow-xl shadow-emerald-50 border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full -mr-32 -mt-32 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full -ml-32 -mb-32 z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-emerald-500">📊</span> Sobre nossas calculadoras
            </h2>
            
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Nossas calculadoras foram desenvolvidas para fornecer uma avaliação inicial e educativa sobre diferentes aspectos da saúde física. 
                Elas são baseadas em parâmetros científicos e podem ajudar a identificar possíveis áreas que necessitam de atenção profissional.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl">
                  <div className="text-3xl mb-3">⚖️</div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-2">Calculadora de IMC</h3>
                  <p className="text-gray-600">Avalia a relação entre peso e altura, fornecendo uma classificação do estado nutricional.</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl">
                  <div className="text-3xl mb-3">🧍</div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-2">Avaliação Postural</h3>
                  <p className="text-gray-600">Identifica possíveis desvios posturais e fornece recomendações para melhorar o alinhamento corporal.</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl">
                  <div className="text-3xl mb-3">🤸</div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-2">Avaliação de Flexibilidade</h3>
                  <p className="text-gray-600">Analisa a amplitude de movimento das principais articulações e oferece orientações para melhorar a mobilidade.</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-l-4 border-amber-400">
                <p className="font-medium text-amber-800 flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span>
                    <strong>Importante:</strong> Estas calculadoras são apenas ferramentas educativas e não substituem a avaliação completa realizada por um fisioterapeuta qualificado.
                    Para um diagnóstico preciso e um plano de tratamento personalizado, consulte sempre um profissional de saúde.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </div>
  );
};

export default Calculadoras;