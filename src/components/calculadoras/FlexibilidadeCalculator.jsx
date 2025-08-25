import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './calculadoras.css';

const FlexibilidadeCalculator = () => {
  const [formData, setFormData] = useState({
    ombros: '',
    tronco: '',
    quadril: '',
    isquiotibiais: '',
    tornozelos: ''
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

  const avaliarFlexibilidade = (e) => {
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
    
    // Média (pontuação máxima é 3 por item, total de 5 itens)
    const media = pontuacao / 5;
    
    // Classificação
    let classificacao = '';
    let recomendacoes = [];
    let cor = '';
    
    if (media <= 0.5) {
      classificacao = 'Flexibilidade Excelente';
      recomendacoes = [
        'Continue com sua rotina de alongamentos',
        'Mantenha a prática de exercícios que favorecem a flexibilidade',
        'Considere atividades como yoga ou pilates para manter e aprimorar sua flexibilidade'
      ];
      cor = 'text-green-600';
    } else if (media <= 1.5) {
      classificacao = 'Boa Flexibilidade';
      recomendacoes = [
        'Mantenha uma rotina regular de alongamentos',
        'Foque em áreas específicas com menor flexibilidade',
        'Considere aumentar a frequência dos exercícios de alongamento'
      ];
      cor = 'text-blue-600';
    } else if (media <= 2.5) {
      classificacao = 'Flexibilidade Regular';
      recomendacoes = [
        'Estabeleça uma rotina diária de alongamentos',
        'Considere exercícios específicos para as áreas com maior limitação',
        'Atividades como yoga ou pilates podem ser benéficas'
      ];
      cor = 'text-yellow-600';
    } else {
      classificacao = 'Flexibilidade Reduzida';
      recomendacoes = [
        'Recomenda-se avaliação com um fisioterapeuta',
        'Inicie um programa gradual de alongamentos diários',
        'Considere técnicas de relaxamento muscular antes dos alongamentos'
      ];
      cor = 'text-red-600';
    }
    
    setResultado({
      pontuacao,
      media: media.toFixed(1),
      classificacao,
      recomendacoes,
      cor
    });
  };

  const questoes = [
    {
      id: 'ombros',
      pergunta: 'Flexibilidade dos ombros',
      descricao: 'Tente juntar as mãos atrás das costas (uma por cima do ombro e outra por baixo)',
      opcoes: [
        { valor: '0', texto: 'Consigo juntar as mãos facilmente' },
        { valor: '1', texto: 'As pontas dos dedos se tocam' },
        { valor: '2', texto: 'Há uma pequena distância entre as mãos' },
        { valor: '3', texto: 'Há uma grande distância entre as mãos' }
      ]
    },
    {
      id: 'tronco',
      pergunta: 'Flexibilidade do tronco',
      descricao: 'Em pé, tente tocar o chão com as mãos mantendo os joelhos estendidos',
      opcoes: [
        { valor: '0', texto: 'Toco o chão com as palmas das mãos' },
        { valor: '1', texto: 'Toco o chão com as pontas dos dedos' },
        { valor: '2', texto: 'Alcanço até os tornozelos' },
        { valor: '3', texto: 'Não consigo passar dos joelhos' }
      ]
    },
    {
      id: 'quadril',
      pergunta: 'Flexibilidade do quadril',
      descricao: 'Sentado no chão, tente abrir as pernas lateralmente ao máximo (abertura em V)',
      opcoes: [
        { valor: '0', texto: 'Consigo abrir as pernas formando quase uma linha reta (>150°)' },
        { valor: '1', texto: 'Consigo uma abertura moderada (120-150°)' },
        { valor: '2', texto: 'Consigo uma abertura limitada (90-120°)' },
        { valor: '3', texto: 'Tenho dificuldade para abrir as pernas (<90°)' }
      ]
    },
    {
      id: 'isquiotibiais',
      pergunta: 'Flexibilidade dos isquiotibiais',
      descricao: 'Sentado com as pernas estendidas à frente, tente alcançar os pés',
      opcoes: [
        { valor: '0', texto: 'Consigo segurar os pés ou ir além deles' },
        { valor: '1', texto: 'Alcanço os tornozelos' },
        { valor: '2', texto: 'Alcanço a metade da canela' },
        { valor: '3', texto: 'Não consigo passar dos joelhos' }
      ]
    },
    {
      id: 'tornozelos',
      pergunta: 'Flexibilidade dos tornozelos',
      descricao: 'Sentado com as pernas estendidas, tente apontar e flexionar os pés',
      opcoes: [
        { valor: '0', texto: 'Consigo fazer movimentos amplos em ambas direções' },
        { valor: '1', texto: 'Movimento levemente limitado em uma direção' },
        { valor: '2', texto: 'Movimento moderadamente limitado em ambas direções' },
        { valor: '3', texto: 'Movimento bastante limitado em ambas direções' }
      ]
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h3 className="calculator-title">Avaliação de Flexibilidade</h3>
        <p className="calculator-description">
          Esta ferramenta avalia a flexibilidade das principais articulações do corpo.
          Realize os movimentos descritos e selecione a opção que melhor representa sua capacidade.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-green-500 text-2xl">🤸</span> Teste de Flexibilidade
          </h4>
          
          <form onSubmit={avaliarFlexibilidade} className="space-y-6">
            {questoes.map((questao) => (
              <div key={questao.id} className="border-b border-gray-100 pb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">{questao.pergunta}</label>
                <p className="text-xs text-gray-500 mb-3 italic">{questao.descricao}</p>
                <div className="space-y-2">
                  {questao.opcoes.map((opcao) => (
                    <div key={opcao.valor} className="flex items-center">
                      <input
                        type="radio"
                        id={`${questao.id}-${opcao.valor}`}
                        name={questao.id}
                        value={opcao.valor}
                        checked={formData[questao.id] === opcao.valor}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label htmlFor={`${questao.id}-${opcao.valor}`} className="ml-3 block text-sm text-gray-600">
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
                className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
              >
                {error}
              </motion.div>
            )}
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium py-3 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span className="text-lg">📊</span>
              Avaliar Flexibilidade
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
                <span className="text-green-500 text-2xl">📊</span> Resultado da Avaliação
              </h4>
              
              <div className="text-center mb-8">
                <div className="mb-6">
                  <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                    {resultado.media}/3
                  </div>
                  <p className="text-gray-500">Média de Limitação</p>
                  <p className="text-xs text-gray-400 mt-1">(0 = excelente, 3 = muito limitada)</p>
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
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
                  <span>Excelente</span>
                  <span>Boa</span>
                  <span>Regular</span>
                  <span>Reduzida</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h5 className="font-semibold text-gray-700 mb-4">Recomendações:</h5>
                <ul className="space-y-2">
                  {resultado.recomendacoes.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-700 italic">
                  <strong>Nota:</strong> Esta é uma avaliação preliminar. Para uma análise completa e personalizada, 
                  recomendamos consultar um fisioterapeuta.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 text-gray-300">🤸</div>
              <h4 className="text-xl font-medium text-gray-400 mb-2">Resultado da Avaliação</h4>
              <p className="text-gray-400">Complete o teste para receber uma avaliação da sua flexibilidade.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 bg-green-50 rounded-2xl p-6 border border-green-100">
        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-green-500 text-xl">💡</span> Benefícios da boa flexibilidade
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-2">Prevenção de lesões</div>
            <p className="text-sm text-gray-600">Músculos e articulações flexíveis são menos suscetíveis a lesões durante atividades físicas e movimentos do dia a dia.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-2">Melhor postura</div>
            <p className="text-sm text-gray-600">A flexibilidade adequada contribui para o alinhamento corporal e reduz problemas posturais.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-2">Redução de dores</div>
            <p className="text-sm text-gray-600">Alongamentos regulares podem diminuir dores musculares e articulares, especialmente na região lombar.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-2">Melhor circulação</div>
            <p className="text-sm text-gray-600">Exercícios de flexibilidade promovem melhor fluxo sanguíneo para os músculos e tecidos.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-2">Maior amplitude de movimento</div>
            <p className="text-sm text-gray-600">Articulações mais flexíveis permitem movimentos mais amplos e eficientes nas atividades diárias.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-2">Melhor equilíbrio</div>
            <p className="text-sm text-gray-600">A flexibilidade contribui para melhor coordenação e equilíbrio corporal, reduzindo o risco de quedas.</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-xl border border-green-200">
          <h5 className="font-semibold text-green-700 mb-2">Dicas para melhorar a flexibilidade:</h5>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
            <li>Realize alongamentos diários, mantendo cada posição por 15-30 segundos</li>
            <li>Alongue-se quando os músculos estiverem aquecidos</li>
            <li>Evite movimentos bruscos ou forçados</li>
            <li>Seja consistente - a flexibilidade melhora com a prática regular</li>
            <li>Considere atividades como yoga, pilates ou tai chi</li>
            <li>Respeite os limites do seu corpo e evite dor durante os alongamentos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlexibilidadeCalculator;