import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './calculadoras.css';

const PosturaCalculator = () => {
  const [formData, setFormData] = useState({
    cabeca: '',
    ombros: '',
    coluna: '',
    quadril: '',
    joelhos: '',
    pes: ''
  });
  
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const avaliarPostura = (e) => {
    e.preventDefault();
    setError('');
    
    // Verificar se todos os campos foram preenchidos
    const camposVazios = Object.values(formData).some(value => value === '');
    if (camposVazios) {
      setError('Por favor, responda todas as perguntas.');
      return;
    }
    
    // Calcular pontuação
    const pontuacao = Object.values(formData).reduce((total, value) => {
      return total + parseInt(value);
    }, 0);
    
    // Classificação
    let classificacao = '';
    let recomendacoes = [];
    let cor = '';
    
    if (pontuacao <= 5) {
      classificacao = 'Postura Excelente';
      recomendacoes = [
        'Continue mantendo bons hábitos posturais',
        'Pratique exercícios regulares para manter a força muscular',
        'Faça pausas regulares se trabalha sentado por longos períodos'
      ];
      cor = 'text-green-600';
    } else if (pontuacao <= 10) {
      classificacao = 'Postura Boa';
      recomendacoes = [
        'Atenção a pequenos desvios posturais',
        'Considere exercícios específicos para fortalecer a musculatura postural',
        'Verifique a ergonomia do seu ambiente de trabalho'
      ];
      cor = 'text-blue-600';
    } else if (pontuacao <= 15) {
      classificacao = 'Postura Regular';
      recomendacoes = [
        'Exercícios de fortalecimento muscular são recomendados',
        'Alongamentos diários podem ajudar a melhorar a postura',
        'Considere uma avaliação profissional com um fisioterapeuta'
      ];
      cor = 'text-yellow-600';
    } else {
      classificacao = 'Postura Inadequada';
      recomendacoes = [
        'Recomenda-se avaliação com um fisioterapeuta',
        'Exercícios específicos para correção postural são necessários',
        'Atenção à ergonomia e hábitos diários'
      ];
      cor = 'text-red-600';
    }
    
    setResultado({
      pontuacao,
      classificacao,
      recomendacoes,
      cor
    });
  };

  const questoes = [
    {
      id: 'cabeca',
      pergunta: 'Posição da cabeça',
      opcoes: [
        { valor: '0', texto: 'Alinhada com a coluna' },
        { valor: '1', texto: 'Levemente inclinada para frente' },
        { valor: '2', texto: 'Muito inclinada para frente' },
        { valor: '3', texto: 'Inclinada para o lado ou rotacionada' }
      ]
    },
    {
      id: 'ombros',
      pergunta: 'Alinhamento dos ombros',
      opcoes: [
        { valor: '0', texto: 'Nivelados e relaxados' },
        { valor: '1', texto: 'Levemente elevados ou protrusos' },
        { valor: '2', texto: 'Um ombro mais alto que o outro' },
        { valor: '3', texto: 'Muito elevados ou muito protrusos' }
      ]
    },
    {
      id: 'coluna',
      pergunta: 'Curvatura da coluna',
      opcoes: [
        { valor: '0', texto: 'Curvaturas naturais preservadas' },
        { valor: '1', texto: 'Leve aumento ou diminuição das curvaturas' },
        { valor: '2', texto: 'Aumento moderado das curvaturas' },
        { valor: '3', texto: 'Aumento acentuado das curvaturas ou escoliose visível' }
      ]
    },
    {
      id: 'quadril',
      pergunta: 'Alinhamento do quadril',
      opcoes: [
        { valor: '0', texto: 'Nivelado e alinhado' },
        { valor: '1', texto: 'Levemente inclinado' },
        { valor: '2', texto: 'Rotação anterior ou posterior' },
        { valor: '3', texto: 'Muito desalinhado ou inclinado' }
      ]
    },
    {
      id: 'joelhos',
      pergunta: 'Posição dos joelhos',
      opcoes: [
        { valor: '0', texto: 'Alinhados e com extensão normal' },
        { valor: '1', texto: 'Levemente hiperextendidos ou flexionados' },
        { valor: '2', texto: 'Joelhos valgos (para dentro) ou varos (para fora)' },
        { valor: '3', texto: 'Acentuadamente desalinhados' }
      ]
    },
    {
      id: 'pes',
      pergunta: 'Posição dos pés',
      opcoes: [
        { valor: '0', texto: 'Alinhados, com arco plantar normal' },
        { valor: '1', texto: 'Levemente pronados ou supinados' },
        { valor: '2', texto: 'Arco plantar caído ou muito elevado' },
        { valor: '3', texto: 'Pés muito pronados ou supinados' }
      ]
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h3 className="calculator-title">Avaliação Postural</h3>
        <p className="calculator-description">
          Esta ferramenta oferece uma avaliação preliminar da sua postura corporal.
          Responda às perguntas com base na sua percepção ou com ajuda de outra pessoa.
        </p>
      </div>
      
      <div className="calculator-grid">
        <div className="calculator-form-container">
          <h4 className="form-section-title">
            <span className="form-icon">📋</span> Questionário de Avaliação
          </h4>
          
          <form onSubmit={avaliarPostura} className="calculator-form">
            {questoes.map((questao) => (
              <div key={questao.id} className="form-group">
                <label className="form-label">{questao.pergunta}</label>
                <div className="radio-group">
                  {questao.opcoes.map((opcao) => (
                    <div key={opcao.valor} className="radio-option">
                      <input
                        type="radio"
                        id={`${questao.id}-${opcao.valor}`}
                        name={questao.id}
                        value={opcao.valor}
                        checked={formData[questao.id] === opcao.valor}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <label htmlFor={`${questao.id}-${opcao.valor}`} className="radio-label">
                        {opcao.texto}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}
            
            <button 
              type="submit"
              className="btn btn-primary btn-block"
            >
              <span className="btn-icon">🔍</span>
              Avaliar Postura
            </button>
          </form>
        </div>
        
        <div>
          {resultado ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
                <span className="text-purple-500 text-2xl">📊</span> Resultado da Avaliação
              </h4>
              
              <div className="text-center mb-8">
                <div className="mb-6">
                  <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    {resultado.pontuacao}/18
                  </div>
                  <p className="text-gray-500">Pontuação Total</p>
                </div>
                
                <div className="mb-8">
                  <div className={`text-2xl font-bold mb-1 ${resultado.cor}`}>
                    {resultado.classificacao}
                  </div>
                </div>
                
                <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-red-500"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>18</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
                  <span>Excelente</span>
                  <span>Boa</span>
                  <span>Regular</span>
                  <span>Inadequada</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h5 className="font-semibold text-gray-700 mb-4">Recomendações:</h5>
                <ul className="space-y-2">
                  {resultado.recomendacoes.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-sm text-purple-700 italic">
                  <strong>Nota:</strong> Esta é uma avaliação preliminar. Para uma análise completa e personalizada, 
                  recomendamos consultar um fisioterapeuta.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 text-gray-300">🧍</div>
              <h4 className="text-xl font-medium text-gray-400 mb-2">Resultado da Avaliação</h4>
              <p className="text-gray-400">Responda o questionário para receber uma avaliação postural preliminar.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 bg-purple-50 rounded-2xl p-6 border border-purple-100">
        <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-purple-500 text-xl">💡</span> Dicas para uma boa postura
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-purple-600 mb-2">Ao sentar</div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Mantenha os pés apoiados no chão</li>
              <li>Joelhos em ângulo de 90°</li>
              <li>Costas apoiadas no encosto da cadeira</li>
              <li>Monitores na altura dos olhos</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-purple-600 mb-2">Ao ficar em pé</div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Distribua o peso igualmente nos dois pés</li>
              <li>Mantenha os ombros relaxados</li>
              <li>Abdômen levemente contraído</li>
              <li>Cabeça alinhada com a coluna</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-purple-600 mb-2">Ao dormir</div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Prefira colchões firmes, mas confortáveis</li>
              <li>Use travesseiro que mantenha a coluna cervical alinhada</li>
              <li>Evite dormir de bruços</li>
              <li>Posição ideal: de lado com um travesseiro entre os joelhos</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-purple-600 mb-2">Exercícios recomendados</div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Fortalecimento da musculatura do core</li>
              <li>Alongamentos para a coluna e membros</li>
              <li>Exercícios de consciência corporal</li>
              <li>Pilates ou yoga para melhorar alinhamento</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosturaCalculator;