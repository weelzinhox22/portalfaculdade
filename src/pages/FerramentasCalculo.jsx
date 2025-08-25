import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Activity, 
  Ruler, 
  Heart, 
  Scale, 
  Info,
  Calculator,
  Target,
  TrendingUp
} from 'lucide-react';

const FerramentasCalculo = () => {
  const [activeTab, setActiveTab] = useState('imc');
  
  // Estados para cada calculadora
  const [imcData, setImcData] = useState({
    peso: '',
    altura: '',
    idade: '',
    sexo: 'masculino'
  });
  
  const [posturalData, setPosturalData] = useState({
    cabeca: 0,
    ombros: 0,
    coluna: 0,
    pelve: 0,
    joelhos: 0,
    tornozelos: 0,
    equilibrio: 0
  });
  
  const [flexibilidadeData, setFlexibilidadeData] = useState({
    sentarAlcancar: '',
    flexaoOmbro: '',
    flexaoQuadril: '',
    dorsiflexao: '',
    idade: '',
    sexo: 'masculino'
  });
  
  const [frequenciaData, setFrequenciaData] = useState({
    idade: '',
    fcRepouso: '',
    nivelAtividade: 'sedentario'
  });
  
  // Estados para resultados
  const [imcResultado, setImcResultado] = useState(null);
  const [posturalResultado, setPosturalResultado] = useState(null);
  const [flexibilidadeResultado, setFlexibilidadeResultado] = useState(null);
  const [frequenciaResultado, setFrequenciaResultado] = useState(null);

  // Função para calcular IMC
  const calcularIMC = () => {
    const peso = parseFloat(imcData.peso);
    const altura = parseFloat(imcData.altura) / 100; // converter cm para m
    const idade = parseInt(imcData.idade);
    
    if (!peso || !altura || !idade) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    const imc = peso / (altura * altura);
    
    // Classificação baseada na idade (OMS + Lipschitz para idosos)
    let classificacao, faixa, risco;
    
    if (idade >= 65) {
      // Critérios para idosos (Lipschitz, 1994)
      if (imc < 22) {
        classificacao = 'Baixo peso';
        faixa = 'danger';
        risco = 'Aumentado para desnutrição';
      } else if (imc <= 27) {
        classificacao = 'Peso adequado';
        faixa = 'success';
        risco = 'Baixo';
      } else {
        classificacao = 'Sobrepeso';
        faixa = 'warning';
        risco = 'Aumentado para doenças cardiovasculares';
      }
    } else {
      // Critérios OMS para adultos
      if (imc < 18.5) {
        classificacao = 'Baixo peso';
        faixa = 'danger';
        risco = 'Baixo (mas aumentado para outros problemas clínicos)';
      } else if (imc <= 24.9) {
        classificacao = 'Peso normal';
        faixa = 'success';
        risco = 'Baixo';
      } else if (imc <= 29.9) {
        classificacao = 'Sobrepeso';
        faixa = 'warning';
        risco = 'Pouco elevado';
      } else if (imc <= 34.9) {
        classificacao = 'Obesidade Grau I';
        faixa = 'danger';
        risco = 'Elevado';
      } else if (imc <= 39.9) {
        classificacao = 'Obesidade Grau II';
        faixa = 'danger';
        risco = 'Muito elevado';
      } else {
        classificacao = 'Obesidade Grau III';
        faixa = 'danger';
        risco = 'Extremamente elevado';
      }
    }
    
    // Calcular peso ideal (fórmula de Devine)
    const alturaM = altura;
    let pesoIdeal;
    if (imcData.sexo === 'masculino') {
      pesoIdeal = 50 + 2.3 * ((alturaM * 100 - 152.4) / 2.54);
    } else {
      pesoIdeal = 45.5 + 2.3 * ((alturaM * 100 - 152.4) / 2.54);
    }
    
    // Calcular TMB (Taxa Metabólica Basal) - Harris-Benedict revisada
    let tmb;
    if (imcData.sexo === 'masculino') {
      tmb = 88.362 + (13.397 * peso) + (4.799 * (altura * 100)) - (5.677 * idade);
    } else {
      tmb = 447.593 + (9.247 * peso) + (3.098 * (altura * 100)) - (4.330 * idade);
    }
    
    // Fatores de atividade para gasto calórico total
    const fatoresAtividade = {
      sedentario: 1.2,
      leve: 1.375,
      moderado: 1.55,
      intenso: 1.725,
      muitoIntenso: 1.9
    };
    
    const gastoCaloricoTotal = {
      sedentario: Math.round(tmb * fatoresAtividade.sedentario),
      leve: Math.round(tmb * fatoresAtividade.leve),
      moderado: Math.round(tmb * fatoresAtividade.moderado),
      intenso: Math.round(tmb * fatoresAtividade.intenso),
      muitoIntenso: Math.round(tmb * fatoresAtividade.muitoIntenso)
    };
    
    setImcResultado({
      imc: imc.toFixed(1),
      classificacao,
      faixa,
      risco,
      pesoIdeal: pesoIdeal.toFixed(1),
      tmb: Math.round(tmb),
      gastoCaloricoTotal
    });
  };

  // Função para calcular avaliação postural
  const calcularPostural = () => {
    const valores = Object.values(posturalData);
    const total = valores.reduce((acc, val) => acc + val, 0);
    const maxPossivel = valores.length * 3; // máximo 3 pontos por parâmetro
    const percentual = (total / maxPossivel) * 100;

    // Classificação baseada no protocolo SAPO
    let classificacao, faixa, interpretacao, prioridades;

    if (percentual <= 25) {
      classificacao = 'Excelente';
      faixa = 'success';
      interpretacao = 'Postura dentro dos padrões de normalidade com mínimas alterações.';
      prioridades = ['Manutenção da postura atual', 'Exercícios preventivos', 'Consciência corporal'];
    } else if (percentual <= 50) {
      classificacao = 'Boa';
      faixa = 'info';
      interpretacao = 'Postura adequada com algumas alterações leves que podem ser corrigidas.';
      prioridades = ['Fortalecimento do core', 'Alongamentos específicos', 'Ergonomia no trabalho'];
    } else if (percentual <= 75) {
      classificacao = 'Regular';
      faixa = 'warning';
      interpretacao = 'Alterações posturais moderadas que requerem intervenção fisioterapêutica.';
      prioridades = ['Correção postural ativa', 'Fortalecimento muscular', 'Mobilização articular'];
    } else {
      classificacao = 'Alterada';
      faixa = 'danger';
      interpretacao = 'Alterações posturais significativas que necessitam acompanhamento profissional.';
      prioridades = ['Avaliação fisioterapêutica completa', 'Programa de reabilitação', 'Acompanhamento médico'];
    }

    // Análise por regiões mais afetadas
    const regioesCriticas = [];
    Object.entries(posturalData).forEach(([regiao, valor]) => {
      if (valor >= 2) {
        const nomes = {
          cabeca: 'Cabeça',
          ombros: 'Ombros',
          coluna: 'Coluna',
          pelve: 'Pelve',
          joelhos: 'Joelhos',
          tornozelos: 'Tornozelos/Pés',
          equilibrio: 'Equilíbrio'
        };
        regioesCriticas.push(nomes[regiao]);
      }
    });

    // Recomendações específicas baseadas nas alterações
    const recomendacoes = [];

    if (posturalData.cabeca >= 2) {
      recomendacoes.push('Exercícios para correção da posição da cabeça e fortalecimento cervical');
    }
    if (posturalData.ombros >= 2) {
      recomendacoes.push('Alongamento de peitorais e fortalecimento de romboides e trapézio médio');
    }
    if (posturalData.coluna >= 2) {
      recomendacoes.push('Exercícios de mobilização vertebral e fortalecimento paravertebral');
    }
    if (posturalData.pelve >= 2) {
      recomendacoes.push('Trabalho de estabilização pélvica e fortalecimento de glúteos');
    }
    if (posturalData.joelhos >= 2) {
      recomendacoes.push('Fortalecimento de quadríceps e alongamento de isquiotibiais');
    }
    if (posturalData.tornozelos >= 2) {
      recomendacoes.push('Exercícios proprioceptivos e fortalecimento de músculos intrínsecos do pé');
    }
    if (posturalData.equilibrio >= 2) {
      recomendacoes.push('Treinamento de equilíbrio e exercícios proprioceptivos');
    }

    setPosturalResultado({
      pontuacao: total,
      percentual: percentual.toFixed(1),
      classificacao,
      faixa,
      interpretacao,
      prioridades,
      regioesCriticas,
      recomendacoes,
      detalhes: posturalData
    });
  };

  // Função para calcular flexibilidade
  const calcularFlexibilidade = () => {
    const idade = parseInt(flexibilidadeData.idade);
    const sexo = flexibilidadeData.sexo;

    if (!idade) {
      alert('Por favor, informe a idade');
      return;
    }

    // Valores normativos baseados no ACSM e literatura científica
    const normas = {
      sentarAlcancar: {
        masculino: {
          '20-29': { excelente: 40, bom: 34, regular: 30, baixo: 25 },
          '30-39': { excelente: 38, bom: 33, regular: 28, baixo: 23 },
          '40-49': { excelente: 35, bom: 29, regular: 24, baixo: 18 },
          '50-59': { excelente: 35, bom: 28, regular: 24, baixo: 16 },
          '60+': { excelente: 33, bom: 25, regular: 20, baixo: 15 }
        },
        feminino: {
          '20-29': { excelente: 41, bom: 37, regular: 33, baixo: 28 },
          '30-39': { excelente: 41, bom: 36, regular: 32, baixo: 27 },
          '40-49': { excelente: 38, bom: 34, regular: 30, baixo: 25 },
          '50-59': { excelente: 39, bom: 33, regular: 30, baixo: 25 },
          '60+': { excelente: 35, bom: 31, regular: 26, baixo: 23 }
        }
      },
      flexaoOmbro: {
        normal: 180,
        excelente: 175,
        bom: 165,
        regular: 150,
        baixo: 135
      },
      flexaoQuadril: {
        normal: 90,
        excelente: 85,
        bom: 75,
        regular: 65,
        baixo: 55
      },
      dorsiflexao: {
        normal: 20,
        excelente: 18,
        bom: 15,
        regular: 12,
        baixo: 8
      }
    };

    // Determinar faixa etária
    let faixaEtaria;
    if (idade <= 29) faixaEtaria = '20-29';
    else if (idade <= 39) faixaEtaria = '30-39';
    else if (idade <= 49) faixaEtaria = '40-49';
    else if (idade <= 59) faixaEtaria = '50-59';
    else faixaEtaria = '60+';

    const resultados = {};
    let pontuacaoTotal = 0;
    let testesRealizados = 0;
    const limitacoes = [];
    const recomendacoes = [];

    // Avaliar cada teste
    const testes = [
      { key: 'sentarAlcancar', nome: 'Sentar e Alcançar', unidade: 'cm' },
      { key: 'flexaoOmbro', nome: 'Flexão de Ombro', unidade: '°' },
      { key: 'flexaoQuadril', nome: 'Flexão de Quadril', unidade: '°' },
      { key: 'dorsiflexao', nome: 'Dorsiflexão', unidade: '°' }
    ];

    testes.forEach(({ key, nome, unidade }) => {
      const valor = parseFloat(flexibilidadeData[key]);
      if (valor) {
        testesRealizados++;
        let classificacao, pontos, percentualNormal;

        if (key === 'sentarAlcancar') {
          const norma = normas.sentarAlcancar[sexo][faixaEtaria];
          if (valor >= norma.excelente) {
            classificacao = 'Excelente';
            pontos = 4;
          } else if (valor >= norma.bom) {
            classificacao = 'Bom';
            pontos = 3;
          } else if (valor >= norma.regular) {
            classificacao = 'Regular';
            pontos = 2;
          } else {
            classificacao = 'Necessita Melhoria';
            pontos = 1;
          }
          percentualNormal = ((valor / norma.excelente) * 100).toFixed(1);
        } else {
          const norma = normas[key];
          percentualNormal = ((valor / norma.normal) * 100).toFixed(1);

          if (valor >= norma.excelente) {
            classificacao = 'Excelente';
            pontos = 4;
          } else if (valor >= norma.bom) {
            classificacao = 'Bom';
            pontos = 3;
          } else if (valor >= norma.regular) {
            classificacao = 'Regular';
            pontos = 2;
          } else {
            classificacao = 'Necessita Melhoria';
            pontos = 1;
          }
        }

        // Identificar limitações e gerar recomendações
        if (pontos <= 2) {
          limitacoes.push(nome);

          switch (key) {
            case 'sentarAlcancar':
              recomendacoes.push('Alongamento de isquiotibiais, panturrilha e coluna lombar');
              break;
            case 'flexaoOmbro':
              recomendacoes.push('Alongamento de peitorais, latíssimo do dorso e cápsula posterior');
              break;
            case 'flexaoQuadril':
              recomendacoes.push('Alongamento de isquiotibiais e fortalecimento de flexores de quadril');
              break;
            case 'dorsiflexao':
              recomendacoes.push('Alongamento de tríceps sural e mobilização articular do tornozelo');
              break;
          }
        }

        resultados[key] = {
          valor,
          classificacao,
          pontos,
          percentualNormal,
          nome,
          unidade
        };
        pontuacaoTotal += pontos;
      }
    });

    const percentualFlexibilidade = testesRealizados > 0 ? (pontuacaoTotal / (testesRealizados * 4)) * 100 : 0;

    let classificacaoGeral, faixa, interpretacao;
    if (percentualFlexibilidade >= 85) {
      classificacaoGeral = 'Excelente';
      faixa = 'success';
      interpretacao = 'Flexibilidade excelente em todos os testes realizados. Mantenha a rotina atual.';
    } else if (percentualFlexibilidade >= 70) {
      classificacaoGeral = 'Boa';
      faixa = 'info';
      interpretacao = 'Boa flexibilidade geral com algumas áreas que podem ser aprimoradas.';
    } else if (percentualFlexibilidade >= 55) {
      classificacaoGeral = 'Regular';
      faixa = 'warning';
      interpretacao = 'Flexibilidade regular. Recomenda-se programa de alongamento específico.';
    } else {
      classificacaoGeral = 'Necessita Melhoria';
      faixa = 'danger';
      interpretacao = 'Flexibilidade limitada. Necessário programa intensivo de alongamento e mobilização.';
    }

    setFlexibilidadeResultado({
      resultados,
      pontuacaoTotal,
      testesRealizados,
      percentual: percentualFlexibilidade.toFixed(1),
      classificacao: classificacaoGeral,
      faixa,
      interpretacao,
      limitacoes,
      recomendacoes
    });
  };

  // Função para calcular frequência cardíaca
  const calcularFrequencia = () => {
    const idade = parseInt(frequenciaData.idade);
    const fcRepouso = parseInt(frequenciaData.fcRepouso);
    const nivelAtividade = frequenciaData.nivelAtividade;

    if (!idade || !fcRepouso) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Validações básicas
    if (idade < 15 || idade > 100) {
      alert('Idade deve estar entre 15 e 100 anos');
      return;
    }

    if (fcRepouso < 40 || fcRepouso > 120) {
      alert('FC de repouso deve estar entre 40 e 120 bpm');
      return;
    }

    // Fórmula de Karvonen (mais precisa que 220-idade)
    const fcMaxima = 220 - idade;
    const reservaFC = fcMaxima - fcRepouso;

    // Análise da FC de repouso
    let statusRepouso, corRepouso;
    if (fcRepouso < 60) {
      statusRepouso = 'Excelente (Atlético)';
      corRepouso = '#10b981';
    } else if (fcRepouso <= 70) {
      statusRepouso = 'Bom';
      corRepouso = '#3b82f6';
    } else if (fcRepouso <= 80) {
      statusRepouso = 'Regular';
      corRepouso = '#f59e0b';
    } else {
      statusRepouso = 'Necessita Melhoria';
      corRepouso = '#ef4444';
    }

    // Zonas de treinamento baseadas no ACSM e fórmula de Karvonen
    const zonas = {
      recuperacao: {
        min: Math.round(fcRepouso + (reservaFC * 0.50)),
        max: Math.round(fcRepouso + (reservaFC * 0.60)),
        nome: 'Recuperação Ativa',
        cor: '#10b981',
        intensidade: '50-60%',
        beneficios: 'Recuperação ativa, queima de gordura, melhora da circulação',
        atividades: 'Caminhada leve, yoga, alongamento dinâmico',
        duracao: '20-40 minutos',
        frequencia: 'Diariamente ou dias de descanso ativo'
      },
      aerobica: {
        min: Math.round(fcRepouso + (reservaFC * 0.60)),
        max: Math.round(fcRepouso + (reservaFC * 0.70)),
        nome: 'Zona Aeróbica Base',
        cor: '#3b82f6',
        intensidade: '60-70%',
        beneficios: 'Melhora da resistência cardiovascular, queima eficiente de gordura',
        atividades: 'Caminhada rápida, ciclismo leve, natação moderada',
        duracao: '30-60 minutos',
        frequencia: '3-5 vezes por semana'
      },
      limiar: {
        min: Math.round(fcRepouso + (reservaFC * 0.70)),
        max: Math.round(fcRepouso + (reservaFC * 0.80)),
        nome: 'Limiar Aeróbico',
        cor: '#f59e0b',
        intensidade: '70-80%',
        beneficios: 'Aumento da capacidade aeróbica, melhora da performance',
        atividades: 'Corrida moderada, ciclismo intenso, natação vigorosa',
        duracao: '20-40 minutos',
        frequencia: '2-3 vezes por semana'
      },
      anaerobica: {
        min: Math.round(fcRepouso + (reservaFC * 0.80)),
        max: Math.round(fcRepouso + (reservaFC * 0.90)),
        nome: 'Zona Anaeróbica',
        cor: '#ef4444',
        intensidade: '80-90%',
        beneficios: 'Aumento da potência, melhora da tolerância ao lactato',
        atividades: 'Corrida intensa, HIIT, treino intervalado',
        duracao: '10-20 minutos (intervalos)',
        frequencia: '1-2 vezes por semana'
      },
      neuromuscular: {
        min: Math.round(fcRepouso + (reservaFC * 0.90)),
        max: fcMaxima,
        nome: 'Potência Neuromuscular',
        cor: '#dc2626',
        intensidade: '90-100%',
        beneficios: 'Desenvolvimento de potência máxima, velocidade',
        atividades: 'Sprints, treino de potência, exercícios explosivos',
        duracao: '5-10 minutos (intervalos curtos)',
        frequencia: '1 vez por semana (atletas)'
      }
    };

    // Recomendações baseadas no nível de atividade
    const recomendacoesPorNivel = {
      sedentario: {
        foco: ['Zona de Recuperação', 'Zona Aeróbica Base'],
        evitar: ['Zona Anaeróbica', 'Potência Neuromuscular'],
        progressao: 'Comece com 20-30 min na zona aeróbica, 3x/semana',
        cuidados: 'Consulte um médico antes de iniciar. Progressão gradual é essencial.'
      },
      leve: {
        foco: ['Zona Aeróbica Base', 'Limiar Aeróbico'],
        evitar: ['Potência Neuromuscular'],
        progressao: 'Aumente gradualmente o tempo na zona aeróbica',
        cuidados: 'Mantenha consistência antes de aumentar intensidade.'
      },
      moderado: {
        foco: ['Zona Aeróbica Base', 'Limiar Aeróbico', 'Zona Anaeróbica'],
        evitar: [],
        progressao: 'Inclua 1-2 sessões de limiar aeróbico por semana',
        cuidados: 'Balance treinos intensos com recuperação adequada.'
      },
      intenso: {
        foco: ['Limiar Aeróbico', 'Zona Anaeróbica', 'Potência Neuromuscular'],
        evitar: [],
        progressao: 'Periodize o treinamento com ciclos de intensidade',
        cuidados: 'Monitore sinais de overtraining. Recuperação é crucial.'
      },
      atleta: {
        foco: ['Todas as zonas com periodização'],
        evitar: [],
        progressao: 'Periodização complexa com picos de forma',
        cuidados: 'Acompanhamento profissional recomendado.'
      }
    };

    setFrequenciaResultado({
      fcMaxima,
      fcRepouso,
      reservaFC,
      statusRepouso,
      corRepouso,
      zonas,
      recomendacoes: recomendacoesPorNivel[nivelAtividade],
      nivelAtividade
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #e0e7ff 100%)', 
      paddingTop: '6rem' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#0d9488',
              textDecoration: 'none',
              marginBottom: '1rem',
              transition: 'color 0.2s ease',
              fontSize: '1rem',
              fontWeight: 500
            }}
            onMouseEnter={(e) => e.target.style.color = '#0f766e'}
            onMouseLeave={(e) => e.target.style.color = '#0d9488'}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Voltar ao Portal
          </Link>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '1rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Ferramentas de Cálculo Fisioterapêutico
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Calculadoras baseadas em evidências científicas para avaliação e acompanhamento fisioterapêutico
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'imc', label: 'IMC', icon: User, desc: 'Índice de Massa Corporal' },
            { id: 'postural', label: 'Avaliação Postural', icon: Activity, desc: 'Análise da postura corporal' },
            { id: 'flexibilidade', label: 'Flexibilidade', icon: Ruler, desc: 'Testes de amplitude de movimento' },
            { id: 'frequencia', label: 'Frequência Cardíaca', icon: Heart, desc: 'Zonas de treinamento cardíaco' }
          ].map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                border: activeTab === id ? 'none' : '1px solid #e5e7eb',
                cursor: 'pointer',
                background: activeTab === id
                  ? 'linear-gradient(135deg, #0d9488 0%, #2563eb 100%)'
                  : 'white',
                color: activeTab === id ? 'white' : '#374151',
                boxShadow: activeTab === id
                  ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== id) {
                  e.target.style.background = '#f9fafb';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== id) {
                  e.target.style.background = 'white';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              <Icon style={{ width: '24px', height: '24px' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600 }}>{label}</div>
                <div style={{
                  fontSize: '0.75rem',
                  opacity: 0.75
                }}>
                  {desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>

          {/* IMC Calculator */}
          {activeTab === 'imc' && (
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                  borderRadius: '0.75rem'
                }}>
                  <User style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>
                    Calculadora de IMC
                  </h2>
                  <p style={{ color: '#6b7280' }}>
                    Baseada nos critérios da OMS e ajustada para diferentes faixas etárias
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {/* Formulário */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        <Scale style={{ width: '16px', height: '16px', display: 'inline', marginRight: '0.5rem' }} />
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        value={imcData.peso}
                        onChange={(e) => setImcData({...imcData, peso: e.target.value})}
                        placeholder="Ex: 70"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        <Ruler style={{ width: '16px', height: '16px', display: 'inline', marginRight: '0.5rem' }} />
                        Altura (cm)
                      </label>
                      <input
                        type="number"
                        value={imcData.altura}
                        onChange={(e) => setImcData({...imcData, altura: e.target.value})}
                        placeholder="Ex: 175"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Idade (anos)
                      </label>
                      <input
                        type="number"
                        value={imcData.idade}
                        onChange={(e) => setImcData({...imcData, idade: e.target.value})}
                        placeholder="Ex: 30"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Sexo
                      </label>
                      <select
                        value={imcData.sexo}
                        onChange={(e) => setImcData({...imcData, sexo: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          background: 'white'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={calcularIMC}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Calculator style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
                    Calcular IMC
                  </button>
                </div>

                {/* Resultados */}
                {imcResultado && (
                  <div style={{
                    padding: '1.5rem',
                    background: imcResultado.faixa === 'success' ? '#f0fdf4' :
                               imcResultado.faixa === 'warning' ? '#fffbeb' : '#fef2f2',
                    border: `1px solid ${imcResultado.faixa === 'success' ? '#bbf7d0' :
                                        imcResultado.faixa === 'warning' ? '#fed7aa' : '#fecaca'}`,
                    borderRadius: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      color: imcResultado.faixa === 'success' ? '#166534' :
                             imcResultado.faixa === 'warning' ? '#92400e' : '#dc2626'
                    }}>
                      Resultado do IMC
                    </h3>

                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 500 }}>IMC:</span>
                        <span style={{ fontWeight: 700 }}>{imcResultado.imc} kg/m²</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 500 }}>Classificação:</span>
                        <span style={{ fontWeight: 700 }}>{imcResultado.classificacao}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 500 }}>Peso Ideal:</span>
                        <span style={{ fontWeight: 700 }}>{imcResultado.pesoIdeal} kg</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 500 }}>TMB:</span>
                        <span style={{ fontWeight: 700 }}>{imcResultado.tmb} kcal/dia</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Avaliação Postural */}
          {activeTab === 'postural' && (
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '0.75rem'
                }}>
                  <Activity style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>
                    Avaliação Postural
                  </h2>
                  <p style={{ color: '#6b7280' }}>
                    Protocolo baseado no SAPO - Software para Avaliação Postural (UNESP)
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {/* Formulário */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#166534', marginBottom: '0.5rem' }}>
                      Instruções de Avaliação
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#166534', lineHeight: 1.5 }}>
                      Avalie cada parâmetro postural usando a escala: 0 = Normal, 1 = Leve, 2 = Moderado, 3 = Severo.
                      Observe o paciente em vista anterior, posterior e lateral.
                    </p>
                  </div>

                  {/* Parâmetros Posturais */}
                  {[
                    {
                      key: 'cabeca',
                      label: 'Posição da Cabeça',
                      desc: 'Anteriorização, lateralização ou rotação da cabeça'
                    },
                    {
                      key: 'ombros',
                      label: 'Alinhamento dos Ombros',
                      desc: 'Elevação, depressão, protração ou assimetria'
                    },
                    {
                      key: 'coluna',
                      label: 'Curvatura da Coluna',
                      desc: 'Hipercifose, hiperlordose, escoliose ou retificação'
                    },
                    {
                      key: 'pelve',
                      label: 'Posição da Pelve',
                      desc: 'Anteversão, retroversão ou inclinação lateral'
                    },
                    {
                      key: 'joelhos',
                      label: 'Alinhamento dos Joelhos',
                      desc: 'Valgismo, varismo, recurvatum ou flexão'
                    },
                    {
                      key: 'tornozelos',
                      label: 'Posição dos Tornozelos/Pés',
                      desc: 'Pronação, supinação, pé plano ou cavo'
                    },
                    {
                      key: 'equilibrio',
                      label: 'Equilíbrio Corporal',
                      desc: 'Distribuição do peso e estabilidade geral'
                    }
                  ].map(({ key, label, desc }) => (
                    <div key={key} style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        {label}
                      </label>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        marginBottom: '0.75rem',
                        lineHeight: 1.4
                      }}>
                        {desc}
                      </p>

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {[
                          { value: 0, label: 'Normal', color: '#10b981' },
                          { value: 1, label: 'Leve', color: '#f59e0b' },
                          { value: 2, label: 'Moderado', color: '#ef4444' },
                          { value: 3, label: 'Severo', color: '#dc2626' }
                        ].map(({ value, label: optLabel, color }) => (
                          <button
                            key={value}
                            onClick={() => setPosturalData({...posturalData, [key]: value})}
                            style={{
                              padding: '0.5rem 0.75rem',
                              border: posturalData[key] === value ? `2px solid ${color}` : '1px solid #d1d5db',
                              borderRadius: '0.375rem',
                              background: posturalData[key] === value ? color : 'white',
                              color: posturalData[key] === value ? 'white' : '#374151',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (posturalData[key] !== value) {
                                e.target.style.borderColor = color;
                                e.target.style.color = color;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (posturalData[key] !== value) {
                                e.target.style.borderColor = '#d1d5db';
                                e.target.style.color = '#374151';
                              }
                            }}
                          >
                            {value} - {optLabel}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={calcularPostural}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Target style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
                    Avaliar Postura
                  </button>
                </div>

                {/* Resultados */}
                {posturalResultado && (
                  <div style={{
                    padding: '1.5rem',
                    background: posturalResultado.faixa === 'success' ? '#f0fdf4' :
                               posturalResultado.faixa === 'info' ? '#eff6ff' :
                               posturalResultado.faixa === 'warning' ? '#fffbeb' : '#fef2f2',
                    border: `1px solid ${posturalResultado.faixa === 'success' ? '#bbf7d0' :
                                        posturalResultado.faixa === 'info' ? '#bfdbfe' :
                                        posturalResultado.faixa === 'warning' ? '#fed7aa' : '#fecaca'}`,
                    borderRadius: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      color: posturalResultado.faixa === 'success' ? '#166534' :
                             posturalResultado.faixa === 'info' ? '#1e40af' :
                             posturalResultado.faixa === 'warning' ? '#92400e' : '#dc2626'
                    }}>
                      Resultado da Avaliação Postural
                    </h3>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Pontuação Total:</span>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: posturalResultado.faixa === 'success' ? '#166534' :
                                 posturalResultado.faixa === 'info' ? '#1e40af' :
                                 posturalResultado.faixa === 'warning' ? '#92400e' : '#dc2626'
                        }}>
                          {posturalResultado.pontuacao}/21 pontos
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Percentual de Alteração:</span>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: posturalResultado.faixa === 'success' ? '#166534' :
                                 posturalResultado.faixa === 'info' ? '#1e40af' :
                                 posturalResultado.faixa === 'warning' ? '#92400e' : '#dc2626'
                        }}>
                          {posturalResultado.percentual}%
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Classificação:</span>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: posturalResultado.faixa === 'success' ? '#166534' :
                                 posturalResultado.faixa === 'info' ? '#1e40af' :
                                 posturalResultado.faixa === 'warning' ? '#92400e' : '#dc2626'
                        }}>
                          {posturalResultado.classificacao}
                        </span>
                      </div>
                    </div>

                    {/* Análise Detalhada por Região */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '1rem',
                        color: '#374151'
                      }}>
                        Análise Detalhada por Região:
                      </h4>

                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {[
                          { key: 'cabeca', label: 'Cabeça' },
                          { key: 'ombros', label: 'Ombros' },
                          { key: 'coluna', label: 'Coluna' },
                          { key: 'pelve', label: 'Pelve' },
                          { key: 'joelhos', label: 'Joelhos' },
                          { key: 'tornozelos', label: 'Tornozelos/Pés' },
                          { key: 'equilibrio', label: 'Equilíbrio' }
                        ].map(({ key, label }) => {
                          const valor = posturalResultado.detalhes[key];
                          const status = valor === 0 ? 'Normal' :
                                        valor === 1 ? 'Leve' :
                                        valor === 2 ? 'Moderado' : 'Severo';
                          const cor = valor === 0 ? '#10b981' :
                                     valor === 1 ? '#f59e0b' :
                                     valor === 2 ? '#ef4444' : '#dc2626';

                          return (
                            <div key={key} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.5rem 0.75rem',
                              background: 'rgba(255, 255, 255, 0.3)',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem'
                            }}>
                              <span style={{ fontWeight: 500 }}>{label}:</span>
                              <span style={{
                                fontWeight: 600,
                                color: cor,
                                padding: '0.25rem 0.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '0.25rem'
                              }}>
                                {status} ({valor})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interpretação */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        color: '#374151'
                      }}>
                        Interpretação:
                      </h4>

                      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#4b5563' }}>
                        {posturalResultado.interpretacao}
                      </p>
                    </div>

                    {/* Regiões Críticas */}
                    {posturalResultado.regioesCriticas && posturalResultado.regioesCriticas.length > 0 && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        marginBottom: '1rem'
                      }}>
                        <h4 style={{
                          fontWeight: 600,
                          marginBottom: '0.75rem',
                          color: '#374151'
                        }}>
                          Regiões que Necessitam Atenção Especial:
                        </h4>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {posturalResultado.regioesCriticas.map((regiao, index) => (
                            <span key={index} style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              border: '1px solid #fecaca'
                            }}>
                              {regiao}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prioridades de Tratamento */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        color: '#374151'
                      }}>
                        Prioridades de Tratamento:
                      </h4>

                      <ul style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#4b5563',
                        paddingLeft: '1.25rem',
                        margin: 0
                      }}>
                        {posturalResultado.prioridades && posturalResultado.prioridades.map((prioridade, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>
                            {prioridade}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recomendações Específicas */}
                    {posturalResultado.recomendacoes && posturalResultado.recomendacoes.length > 0 && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.8)'
                      }}>
                        <h4 style={{
                          fontWeight: 600,
                          marginBottom: '0.75rem',
                          color: '#374151'
                        }}>
                          Recomendações Específicas:
                        </h4>

                        <ul style={{
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: '#4b5563',
                          paddingLeft: '1.25rem',
                          margin: 0
                        }}>
                          {posturalResultado.recomendacoes.map((recomendacao, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                              {recomendacao}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'flexibilidade' && (
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '0.75rem'
                }}>
                  <Ruler style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>
                    Avaliação de Flexibilidade
                  </h2>
                  <p style={{ color: '#6b7280' }}>
                    Testes baseados nas normas do ACSM e protocolos validados cientificamente
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {/* Formulário */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{
                    background: '#fffbeb',
                    border: '1px solid #fed7aa',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#92400e', marginBottom: '0.5rem' }}>
                      Instruções de Avaliação
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: 1.5 }}>
                      Realize os testes de forma padronizada. Meça em centímetros para sentar-alcançar
                      e em graus para amplitudes articulares. Faça aquecimento prévio de 5-10 minutos.
                    </p>
                  </div>

                  {/* Dados Pessoais */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Idade (anos)
                      </label>
                      <input
                        type="number"
                        value={flexibilidadeData.idade}
                        onChange={(e) => setFlexibilidadeData({...flexibilidadeData, idade: e.target.value})}
                        placeholder="Ex: 30"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#f59e0b';
                          e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Sexo
                      </label>
                      <select
                        value={flexibilidadeData.sexo}
                        onChange={(e) => setFlexibilidadeData({...flexibilidadeData, sexo: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          background: 'white'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#f59e0b';
                          e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                      </select>
                    </div>
                  </div>

                  {/* Testes de Flexibilidade */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>
                      1. Teste Sentar e Alcançar (cm)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      <strong>Protocolo:</strong> Sentado com pernas estendidas, pés contra a caixa,
                      alcance máximo com as mãos sobrepostas. Meça a distância alcançada.
                    </p>
                    <input
                      type="number"
                      value={flexibilidadeData.sentarAlcancar}
                      onChange={(e) => setFlexibilidadeData({...flexibilidadeData, sentarAlcancar: e.target.value})}
                      placeholder="Ex: 25 (cm)"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>
                      2. Flexão de Ombro (graus)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      <strong>Protocolo:</strong> Em pé, eleve o braço para frente até a amplitude máxima.
                      Meça com goniômetro. Normal: 180°.
                    </p>
                    <input
                      type="number"
                      value={flexibilidadeData.flexaoOmbro}
                      onChange={(e) => setFlexibilidadeData({...flexibilidadeData, flexaoOmbro: e.target.value})}
                      placeholder="Ex: 170 (graus)"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>
                      3. Flexão de Quadril (graus)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      <strong>Protocolo:</strong> Deitado, eleve a perna estendida até a amplitude máxima.
                      Meça com goniômetro. Normal: 90°.
                    </p>
                    <input
                      type="number"
                      value={flexibilidadeData.flexaoQuadril}
                      onChange={(e) => setFlexibilidadeData({...flexibilidadeData, flexaoQuadril: e.target.value})}
                      placeholder="Ex: 85 (graus)"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>
                      4. Dorsiflexão do Tornozelo (graus)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      <strong>Protocolo:</strong> Sentado, puxe o pé para cima até a amplitude máxima.
                      Meça com goniômetro. Normal: 20°.
                    </p>
                    <input
                      type="number"
                      value={flexibilidadeData.dorsiflexao}
                      onChange={(e) => setFlexibilidadeData({...flexibilidadeData, dorsiflexao: e.target.value})}
                      placeholder="Ex: 18 (graus)"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button
                    onClick={calcularFlexibilidade}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(245, 158, 11, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <TrendingUp style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
                    Avaliar Flexibilidade
                  </button>
                </div>

                {/* Resultados */}
                {flexibilidadeResultado && (
                  <div style={{
                    padding: '1.5rem',
                    background: flexibilidadeResultado.faixa === 'success' ? '#fffbeb' :
                               flexibilidadeResultado.faixa === 'info' ? '#eff6ff' :
                               flexibilidadeResultado.faixa === 'warning' ? '#fef3c7' : '#fef2f2',
                    border: `1px solid ${flexibilidadeResultado.faixa === 'success' ? '#fed7aa' :
                                        flexibilidadeResultado.faixa === 'info' ? '#bfdbfe' :
                                        flexibilidadeResultado.faixa === 'warning' ? '#fcd34d' : '#fecaca'}`,
                    borderRadius: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      color: flexibilidadeResultado.faixa === 'success' ? '#92400e' :
                             flexibilidadeResultado.faixa === 'info' ? '#1e40af' :
                             flexibilidadeResultado.faixa === 'warning' ? '#d97706' : '#dc2626'
                    }}>
                      Resultado da Avaliação de Flexibilidade
                    </h3>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Pontuação Total:</span>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: flexibilidadeResultado.faixa === 'success' ? '#92400e' :
                                 flexibilidadeResultado.faixa === 'info' ? '#1e40af' :
                                 flexibilidadeResultado.faixa === 'warning' ? '#d97706' : '#dc2626'
                        }}>
                          {flexibilidadeResultado.pontuacaoTotal}/{flexibilidadeResultado.testesRealizados * 4} pontos
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Percentual de Flexibilidade:</span>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: flexibilidadeResultado.faixa === 'success' ? '#92400e' :
                                 flexibilidadeResultado.faixa === 'info' ? '#1e40af' :
                                 flexibilidadeResultado.faixa === 'warning' ? '#d97706' : '#dc2626'
                        }}>
                          {flexibilidadeResultado.percentual}%
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Classificação:</span>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: flexibilidadeResultado.faixa === 'success' ? '#92400e' :
                                 flexibilidadeResultado.faixa === 'info' ? '#1e40af' :
                                 flexibilidadeResultado.faixa === 'warning' ? '#d97706' : '#dc2626'
                        }}>
                          {flexibilidadeResultado.classificacao}
                        </span>
                      </div>
                    </div>

                    {/* Resultados Detalhados por Teste */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '1rem',
                        color: '#374151'
                      }}>
                        Resultados Detalhados por Teste:
                      </h4>

                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {Object.entries(flexibilidadeResultado.resultados).map(([key, resultado]) => {
                          const cor = resultado.pontos === 4 ? '#10b981' :
                                     resultado.pontos === 3 ? '#3b82f6' :
                                     resultado.pontos === 2 ? '#f59e0b' : '#ef4444';

                          return (
                            <div key={key} style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr auto auto',
                              alignItems: 'center',
                              gap: '1rem',
                              padding: '0.75rem',
                              background: 'rgba(255, 255, 255, 0.3)',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem'
                            }}>
                              <div>
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                                  {resultado.nome}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                                  {resultado.valor}{resultado.unidade} ({resultado.percentualNormal}% do normal)
                                </div>
                              </div>

                              <div style={{
                                fontWeight: 600,
                                color: cor,
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                minWidth: '80px'
                              }}>
                                {resultado.classificacao}
                              </div>

                              <div style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                background: cor,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '0.875rem'
                              }}>
                                {resultado.pontos}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interpretação */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        color: '#374151'
                      }}>
                        Interpretação:
                      </h4>

                      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#4b5563' }}>
                        {flexibilidadeResultado.interpretacao}
                      </p>
                    </div>

                    {/* Limitações Identificadas */}
                    {flexibilidadeResultado.limitacoes && flexibilidadeResultado.limitacoes.length > 0 && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        marginBottom: '1rem'
                      }}>
                        <h4 style={{
                          fontWeight: 600,
                          marginBottom: '0.75rem',
                          color: '#374151'
                        }}>
                          Limitações Identificadas:
                        </h4>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {flexibilidadeResultado.limitacoes.map((limitacao, index) => (
                            <span key={index} style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              border: '1px solid #fecaca'
                            }}>
                              {limitacao}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recomendações Específicas */}
                    {flexibilidadeResultado.recomendacoes && flexibilidadeResultado.recomendacoes.length > 0 && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.8)'
                      }}>
                        <h4 style={{
                          fontWeight: 600,
                          marginBottom: '0.75rem',
                          color: '#374151'
                        }}>
                          Recomendações de Alongamento:
                        </h4>

                        <ul style={{
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: '#4b5563',
                          paddingLeft: '1.25rem',
                          margin: 0
                        }}>
                          {flexibilidadeResultado.recomendacoes.map((recomendacao, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                              {recomendacao}
                            </li>
                          ))}
                        </ul>

                        <div style={{
                          marginTop: '1rem',
                          padding: '0.75rem',
                          background: 'rgba(59, 130, 246, 0.1)',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#1e40af',
                            margin: 0,
                            fontWeight: 500
                          }}>
                            💡 <strong>Dica:</strong> Realize alongamentos 3-5x por semana, mantendo cada posição por 30-60 segundos.
                            Sempre aqueça antes dos alongamentos e evite movimentos bruscos.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'frequencia' && (
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  borderRadius: '0.75rem'
                }}>
                  <Heart style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>
                    Calculadora de Frequência Cardíaca
                  </h2>
                  <p style={{ color: '#6b7280' }}>
                    Zonas de treinamento baseadas na fórmula de Karvonen e diretrizes ACSM
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {/* Formulário */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 600, color: '#dc2626', marginBottom: '0.5rem' }}>
                      Instruções de Medição
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#dc2626', lineHeight: 1.5 }}>
                      Meça a FC de repouso pela manhã, ainda na cama, por 1 minuto completo.
                      Para maior precisão, faça a medição por 3 dias consecutivos e calcule a média.
                    </p>
                  </div>

                  {/* Dados Básicos */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Idade (anos)
                      </label>
                      <input
                        type="number"
                        value={frequenciaData.idade}
                        onChange={(e) => setFrequenciaData({...frequenciaData, idade: e.target.value})}
                        placeholder="Ex: 30"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#ef4444';
                          e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        FC de Repouso (bpm)
                      </label>
                      <input
                        type="number"
                        value={frequenciaData.fcRepouso}
                        onChange={(e) => setFrequenciaData({...frequenciaData, fcRepouso: e.target.value})}
                        placeholder="Ex: 65"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#ef4444';
                          e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Nível de Atividade */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Nível de Atividade Física
                    </label>
                    <select
                      value={frequenciaData.nivelAtividade}
                      onChange={(e) => setFrequenciaData({...frequenciaData, nivelAtividade: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        background: 'white'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#ef4444';
                        e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="sedentario">Sedentário (pouco ou nenhum exercício)</option>
                      <option value="leve">Leve (exercício leve 1-3 dias/semana)</option>
                      <option value="moderado">Moderado (exercício moderado 3-5 dias/semana)</option>
                      <option value="intenso">Intenso (exercício intenso 6-7 dias/semana)</option>
                      <option value="atleta">Atleta (exercício muito intenso, 2x/dia)</option>
                    </select>
                  </div>

                  <button
                    onClick={calcularFrequencia}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(239, 68, 68, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Heart style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
                    Calcular Zonas de FC
                  </button>
                </div>

                {/* Resultados */}
                {frequenciaResultado && (
                  <div style={{
                    padding: '1.5rem',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      color: '#dc2626'
                    }}>
                      Zonas de Frequência Cardíaca
                    </h3>

                    {/* Dados Básicos */}
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>FC Máxima Teórica:</span>
                        <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#dc2626' }}>
                          {frequenciaResultado.fcMaxima} bpm
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>FC de Repouso:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                            {frequenciaResultado.fcRepouso} bpm
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: frequenciaResultado.corRepouso,
                            background: 'rgba(255, 255, 255, 0.8)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '1rem'
                          }}>
                            {frequenciaResultado.statusRepouso}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 500 }}>Reserva de FC:</span>
                        <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#dc2626' }}>
                          {frequenciaResultado.reservaFC} bpm
                        </span>
                      </div>
                    </div>

                    {/* Zonas de Treinamento */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '1rem',
                        color: '#374151'
                      }}>
                        Zonas de Treinamento:
                      </h4>

                      <div style={{ display: 'grid', gap: '1rem' }}>
                        {Object.entries(frequenciaResultado.zonas).map(([key, zona]) => (
                          <div key={key} style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            border: `2px solid ${zona.cor}`,
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            position: 'relative'
                          }}>
                            <div style={{
                              position: 'absolute',
                              top: '-8px',
                              left: '1rem',
                              background: zona.cor,
                              color: 'white',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}>
                              {zona.intensidade}
                            </div>

                            <div style={{ marginTop: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h5 style={{ fontWeight: 700, color: zona.cor, margin: 0 }}>
                                  {zona.nome}
                                </h5>
                                <span style={{
                                  fontWeight: 700,
                                  fontSize: '1.125rem',
                                  color: zona.cor
                                }}>
                                  {zona.min}-{zona.max} bpm
                                </span>
                              </div>

                              <p style={{
                                fontSize: '0.875rem',
                                color: '#4b5563',
                                marginBottom: '0.75rem',
                                lineHeight: 1.4
                              }}>
                                <strong>Benefícios:</strong> {zona.beneficios}
                              </p>

                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', fontSize: '0.75rem' }}>
                                <div>
                                  <strong style={{ color: '#374151' }}>Atividades:</strong>
                                  <br />
                                  <span style={{ color: '#6b7280' }}>{zona.atividades}</span>
                                </div>
                                <div>
                                  <strong style={{ color: '#374151' }}>Duração:</strong>
                                  <br />
                                  <span style={{ color: '#6b7280' }}>{zona.duracao}</span>
                                </div>
                                <div>
                                  <strong style={{ color: '#374151' }}>Frequência:</strong>
                                  <br />
                                  <span style={{ color: '#6b7280' }}>{zona.frequencia}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recomendações Personalizadas */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        color: '#374151'
                      }}>
                        Recomendações para seu Nível ({frequenciaResultado.nivelAtividade}):
                      </h4>

                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div>
                          <strong style={{ color: '#10b981', fontSize: '0.875rem' }}>Zonas Recomendadas:</strong>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                            {frequenciaResultado.recomendacoes.foco.map((zona, index) => (
                              <span key={index} style={{
                                background: '#f0fdf4',
                                color: '#166534',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                border: '1px solid #bbf7d0'
                              }}>
                                {zona}
                              </span>
                            ))}
                          </div>
                        </div>

                        {frequenciaResultado.recomendacoes.evitar.length > 0 && (
                          <div>
                            <strong style={{ color: '#ef4444', fontSize: '0.875rem' }}>Evitar Inicialmente:</strong>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                              {frequenciaResultado.recomendacoes.evitar.map((zona, index) => (
                                <span key={index} style={{
                                  background: '#fef2f2',
                                  color: '#dc2626',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                  border: '1px solid #fecaca'
                                }}>
                                  {zona}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <strong style={{ color: '#3b82f6', fontSize: '0.875rem' }}>Progressão Sugerida:</strong>
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#4b5563',
                            margin: '0.25rem 0 0 0',
                            lineHeight: 1.4
                          }}>
                            {frequenciaResultado.recomendacoes.progressao}
                          </p>
                        </div>

                        <div>
                          <strong style={{ color: '#f59e0b', fontSize: '0.875rem' }}>Cuidados Especiais:</strong>
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#4b5563',
                            margin: '0.25rem 0 0 0',
                            lineHeight: 1.4
                          }}>
                            {frequenciaResultado.recomendacoes.cuidados}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dicas de Monitoramento */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.8)'
                    }}>
                      <h4 style={{
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        color: '#374151'
                      }}>
                        Dicas de Monitoramento:
                      </h4>

                      <ul style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#4b5563',
                        paddingLeft: '1.25rem',
                        margin: 0
                      }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                          <strong>Teste de Fala:</strong> Na zona aeróbica, você deve conseguir manter uma conversa
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                          <strong>Percepção de Esforço:</strong> Use a escala de Borg (6-20) como referência adicional
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                          <strong>Variabilidade:</strong> A FC pode variar ±5 bpm devido a fatores externos
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                          <strong>Medicamentos:</strong> Beta-bloqueadores podem alterar a resposta da FC
                        </li>
                        <li>
                          <strong>Hidratação:</strong> Desidratação pode elevar a FC em 10-15 bpm
                        </li>
                      </ul>

                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                      }}>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#dc2626',
                          margin: 0,
                          fontWeight: 500
                        }}>
                          ⚠️ <strong>Importante:</strong> Estas são estimativas baseadas em fórmulas padrão.
                          Para maior precisão, realize um teste de esforço máximo com acompanhamento profissional.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Informações Científicas */}
        <div style={{
          marginTop: '3rem',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #f3f4f6',
          padding: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Info style={{ width: '24px', height: '24px', color: '#2563eb' }} />
            Embasamento Científico
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: '#eff6ff',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #bfdbfe'
            }}>
              <h4 style={{ fontWeight: 600, color: '#1e40af', marginBottom: '0.5rem' }}>IMC</h4>
              <p style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                Baseado nos critérios da OMS (1995) e ajustes para idosos segundo Lipschitz (1994).
                Cálculo de TMB pela fórmula Harris-Benedict revisada.
              </p>
            </div>

            <div style={{
              background: '#f0fdf4',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #bbf7d0'
            }}>
              <h4 style={{ fontWeight: 600, color: '#166534', marginBottom: '0.5rem' }}>Avaliação Postural</h4>
              <p style={{ fontSize: '0.875rem', color: '#166534' }}>
                Protocolo baseado no SAPO (Software para Avaliação Postural) desenvolvido pela
                UNESP, validado cientificamente para análise postural.
              </p>
            </div>

            <div style={{
              background: '#fefce8',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fde68a'
            }}>
              <h4 style={{ fontWeight: 600, color: '#a16207', marginBottom: '0.5rem' }}>Flexibilidade</h4>
              <p style={{ fontSize: '0.875rem', color: '#a16207' }}>
                Valores normativos do ACSM (American College of Sports Medicine) e testes
                padronizados de amplitude de movimento articular.
              </p>
            </div>

            <div style={{
              background: '#fdf2f8',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fbcfe8'
            }}>
              <h4 style={{ fontWeight: 600, color: '#be185d', marginBottom: '0.5rem' }}>Frequência Cardíaca</h4>
              <p style={{ fontSize: '0.875rem', color: '#be185d' }}>
                Fórmula de Karvonen para cálculo das zonas de treinamento, seguindo diretrizes do ACSM
                para prescrição de exercícios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FerramentasCalculo;
