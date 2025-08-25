import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Scale, Ruler, AlertTriangle, CheckCircle, Info, Heart, Activity } from 'lucide-react';
import './calculadoras.css';

const IMCCalculator = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const calcularIMC = (e) => {
    e.preventDefault();
    setError('');

    // Validação
    if (!peso || !altura || !idade) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));
    const idadeNum = parseInt(idade);

    if (isNaN(pesoNum) || isNaN(alturaNum) || isNaN(idadeNum)) {
      setError('Por favor, insira valores numéricos válidos.');
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0 || idadeNum <= 0) {
      setError('Os valores devem ser maiores que zero.');
      return;
    }

    // Cálculo do IMC
    const imc = pesoNum / (alturaNum * alturaNum);

    // Classificação baseada em evidências científicas
    let classificacao = '';
    let cor = '';
    let risco = '';
    let recomendacoes = [];
    let pesoIdeal = {};

    // Ajustes para diferentes faixas etárias (baseado em Lipschitz, 1994 para idosos)
    if (idadeNum >= 65) {
      // Critérios específicos para idosos
      if (imc < 22) {
        classificacao = 'Baixo peso';
        cor = 'text-blue-600';
        risco = 'Aumentado para desnutrição e fragilidade';
        recomendacoes = [
          'Avaliação nutricional completa',
          'Exercícios de fortalecimento muscular',
          'Suplementação nutricional se necessário',
          'Acompanhamento médico regular'
        ];
      } else if (imc <= 27) {
        classificacao = 'Peso adequado para idosos';
        cor = 'text-green-600';
        risco = 'Baixo risco';
        recomendacoes = [
          'Manter peso atual',
          'Atividade física regular adaptada',
          'Alimentação equilibrada rica em proteínas',
          'Monitoramento da composição corporal'
        ];
      } else if (imc <= 32) {
        classificacao = 'Sobrepeso';
        cor = 'text-yellow-600';
        risco = 'Moderado';
        recomendacoes = [
          'Redução gradual de peso (5-10%)',
          'Exercícios aeróbicos de baixo impacto',
          'Orientação nutricional',
          'Fisioterapia preventiva'
        ];
      } else {
        classificacao = 'Obesidade';
        cor = 'text-red-600';
        risco = 'Alto risco cardiovascular';
        recomendacoes = [
          'Tratamento médico multidisciplinar',
          'Programa de exercícios supervisionado',
          'Acompanhamento nutricional intensivo',
          'Avaliação de comorbidades'
        ];
      }
      pesoIdeal = {
        min: (22 * alturaNum * alturaNum).toFixed(1),
        max: (27 * alturaNum * alturaNum).toFixed(1)
      };
    } else {
      // Critérios OMS para adultos
      if (imc < 18.5) {
        classificacao = 'Baixo peso';
        cor = 'text-blue-600';
        risco = 'Aumentado para deficiências nutricionais';
        recomendacoes = [
          'Ganho de peso saudável',
          'Avaliação médica para causas subjacentes',
          'Exercícios de fortalecimento',
          'Dieta hipercalórica balanceada'
        ];
      } else if (imc < 25) {
        classificacao = 'Peso normal';
        cor = 'text-green-600';
        risco = 'Baixo risco';
        recomendacoes = [
          'Manter peso atual',
          'Atividade física regular (150min/semana)',
          'Alimentação balanceada',
          'Monitoramento anual'
        ];
      } else if (imc < 30) {
        classificacao = 'Sobrepeso';
        cor = 'text-yellow-600';
        risco = 'Moderado para doenças cardiovasculares';
        recomendacoes = [
          'Perda de peso gradual (0,5-1kg/semana)',
          'Exercícios aeróbicos + resistência',
          'Reeducação alimentar',
          'Acompanhamento profissional'
        ];
      } else if (imc < 35) {
        classificacao = 'Obesidade Grau I';
        cor = 'text-orange-600';
        risco = 'Alto risco para comorbidades';
        recomendacoes = [
          'Perda de peso supervisionada',
          'Exercícios progressivos',
          'Acompanhamento multidisciplinar',
          'Avaliação de fatores de risco'
        ];
      } else if (imc < 40) {
        classificacao = 'Obesidade Grau II';
        cor = 'text-red-500';
        risco = 'Muito alto risco';
        recomendacoes = [
          'Tratamento médico intensivo',
          'Fisioterapia especializada',
          'Suporte psicológico',
          'Consideração de tratamento farmacológico'
        ];
      } else {
        classificacao = 'Obesidade Grau III (Mórbida)';
        cor = 'text-red-700';
        risco = 'Extremamente alto';
        recomendacoes = [
          'Tratamento médico urgente',
          'Avaliação para cirurgia bariátrica',
          'Equipe multidisciplinar especializada',
          'Monitoramento intensivo'
        ];
      }
      pesoIdeal = {
        min: (18.5 * alturaNum * alturaNum).toFixed(1),
        max: (24.9 * alturaNum * alturaNum).toFixed(1)
      };
    }

    // Cálculo de calorias para manutenção (Harris-Benedict revisada)
    let tmb; // Taxa Metabólica Basal
    if (sexo === 'masculino') {
      tmb = 88.362 + (13.397 * pesoNum) + (4.799 * (alturaNum * 100)) - (5.677 * idadeNum);
    } else {
      tmb = 447.593 + (9.247 * pesoNum) + (3.098 * (alturaNum * 100)) - (4.330 * idadeNum);
    }

    setResultado({
      imc: imc.toFixed(1),
      classificacao,
      cor,
      risco,
      recomendacoes,
      pesoIdeal,
      tmb: Math.round(tmb),
      calorias: {
        sedentario: Math.round(tmb * 1.2),
        leve: Math.round(tmb * 1.375),
        moderado: Math.round(tmb * 1.55),
        intenso: Math.round(tmb * 1.725),
        muitoIntenso: Math.round(tmb * 1.9)
      }
    });
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-header">
        <h3 className="calculator-title">Calculadora de IMC</h3>
        <p className="calculator-description">
          O Índice de Massa Corporal (IMC) é uma medida utilizada para avaliar a relação entre peso e altura, 
          fornecendo uma indicação sobre o estado nutricional.
        </p>
      </div>
      
      <div className="calculator-grid">
        <div className="calculator-form-container">
          <h4 className="form-section-title">
            <span className="form-icon">📝</span> Insira seus dados
          </h4>
          
          <form onSubmit={calcularIMC} className="calculator-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="peso" className="form-label">
                  <Scale className="w-4 h-4 inline mr-2" />
                  Peso (kg)
                </label>
                <input
                  type="text"
                  id="peso"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="Ex: 70"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="altura" className="form-label">
                  <Ruler className="w-4 h-4 inline mr-2" />
                  Altura (m)
                </label>
                <input
                  type="text"
                  id="altura"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="Ex: 1.70"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="idade" className="form-label">
                  <User className="w-4 h-4 inline mr-2" />
                  Idade (anos)
                </label>
                <input
                  type="number"
                  id="idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  placeholder="Ex: 30"
                  className="form-input"
                  min="1"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sexo" className="form-label">
                  <User className="w-4 h-4 inline mr-2" />
                  Sexo
                </label>
                <select
                  id="sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  className="form-input"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
            </div>
            
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
              className="calculate-button"
            >
              <span className="button-icon">⚡</span>
              Calcular IMC
            </button>
          </form>
        </div>
        
        <div>
          {resultado ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Resultado Principal */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  Resultado do IMC
                </h4>

                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      {resultado.imc}
                    </div>
                    <p className="text-gray-500">Índice de Massa Corporal</p>
                  </div>

                  <div className="mb-4">
                    <div className={`text-xl font-bold mb-1 ${resultado.cor}`}>
                      {resultado.classificacao}
                    </div>
                    <p className="text-sm text-gray-600">{resultado.risco}</p>
                  </div>
                </div>
              </div>

              {/* Peso Ideal */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  Faixa de Peso Ideal
                </h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {resultado.pesoIdeal.min} - {resultado.pesoIdeal.max} kg
                  </div>
                  <p className="text-gray-500">Para sua altura e idade</p>
                </div>
              </div>

              {/* Gasto Calórico */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Gasto Calórico Diário
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxa Metabólica Basal:</span>
                    <span className="font-semibold">{resultado.tmb} kcal</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-700">Sedentário</div>
                      <div className="text-blue-600 font-semibold">{resultado.calorias.sedentario} kcal</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-700">Ativo</div>
                      <div className="text-green-600 font-semibold">{resultado.calorias.moderado} kcal</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recomendações */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Recomendações Personalizadas
                </h5>
                <ul className="space-y-2">
                  {resultado.recomendacoes.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 text-gray-300">📊</div>
              <h4 className="text-xl font-medium text-gray-400 mb-2">Resultado do IMC</h4>
              <p className="text-gray-400">Preencha os dados e clique em calcular para ver o resultado.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-blue-500 text-xl">💡</span> Interpretação do IMC
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-blue-600 mb-1">Abaixo de 18.5</div>
            <p className="text-sm text-gray-600">Abaixo do peso - Pode indicar desnutrição ou outros problemas de saúde.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-green-600 mb-1">18.5 a 24.9</div>
            <p className="text-sm text-gray-600">Peso normal - Indica um peso saudável para a altura.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-yellow-600 mb-1">25.0 a 29.9</div>
            <p className="text-sm text-gray-600">Sobrepeso - Indica excesso de peso que pode levar a problemas de saúde.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-orange-600 mb-1">30.0 a 34.9</div>
            <p className="text-sm text-gray-600">Obesidade Grau I - Risco aumentado de doenças cardiovasculares.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-red-500 mb-1">35.0 a 39.9</div>
            <p className="text-sm text-gray-600">Obesidade Grau II - Alto risco de comorbidades.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="font-semibold text-red-700 mb-1">Acima de 40</div>
            <p className="text-sm text-gray-600">Obesidade Grau III - Risco muito elevado de doenças associadas.</p>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500 italic">
          <strong>Nota:</strong> O IMC é uma ferramenta de triagem e não um diagnóstico. Consulte sempre um profissional de saúde para uma avaliação completa.
        </div>
      </div>
    </div>
  );
};

export default IMCCalculator;