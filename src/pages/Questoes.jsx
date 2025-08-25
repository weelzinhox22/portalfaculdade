import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Filter,
  Trophy,
  Target,
  BookOpen,
  Play,
  Pause,
  SkipForward,
  Award,
  TrendingUp,
  Users,
  Star,
  AlertCircle
} from 'lucide-react';

const Questoes = () => {
  const [modoAtual, setModoAtual] = useState('selecao'); // 'selecao', 'questao', 'resultado'
  const [filtros, setFiltros] = useState({
    area: 'todas',
    dificuldade: 'todas',
    tipo: 'todas'
  });
  
  const [sessaoAtual, setSessaoAtual] = useState({
    questoes: [],
    questaoAtual: 0,
    respostas: {},
    tempoInicio: null,
    tempoDecorrido: 0,
    modo: 'estudo' // 'estudo' ou 'simulado'
  });

  const [estatisticas, setEstatisticas] = useState({
    totalQuestoes: 0,
    acertos: 0,
    erros: 0,
    percentualAcerto: 0,
    tempoMedio: 0,
    ranking: 0
  });

  // Banco de questões expandido - Estilo Passei Direto
  const bancoQuestoes = [
    // ANATOMIA - Questões Básicas a Avançadas
    {
      id: 1,
      area: 'anatomia',
      dificuldade: 'facil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual músculo é considerado o principal flexor do quadril?',
      alternativas: [
        { id: 'a', texto: 'Glúteo máximo' },
        { id: 'b', texto: 'Iliopsoas' },
        { id: 'c', texto: 'Reto femoral' },
        { id: 'd', texto: 'Sartório' },
        { id: 'e', texto: 'Tensor da fáscia lata' }
      ],
      respostaCorreta: 'b',
      explicacao: 'O iliopsoas é formado pelos músculos psoas maior e ilíaco, sendo considerado o principal flexor do quadril. Origina-se na coluna lombar e crista ilíaca, inserindo-se no trocânter menor do fêmur.',
      referencias: 'Kendall, F.P. et al. Músculos: Provas e Funções. 5ª ed.',
      tags: ['anatomia', 'quadril', 'músculos'],
      autor: 'Prof. Dr. João Silva',
      dificuldadeNumerica: 2
    },
    {
      id: 2,
      area: 'anatomia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'O ligamento cruzado anterior (LCA) tem como função primária:',
      alternativas: [
        { id: 'a', texto: 'Prevenir a hiperextensão do joelho' },
        { id: 'b', texto: 'Limitar a rotação interna da tíbia' },
        { id: 'c', texto: 'Prevenir o deslocamento anterior da tíbia sobre o fêmur' },
        { id: 'd', texto: 'Estabilizar o compartimento medial do joelho' },
        { id: 'e', texto: 'Controlar a flexão do joelho' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O LCA é o principal estabilizador anterior do joelho, prevenindo o deslocamento anterior da tíbia em relação ao fêmur, especialmente durante movimentos de pivô e desaceleração.',
      referencias: 'Magee, D.J. Avaliação Musculoesquelética. 6ª ed.',
      tags: ['anatomia', 'joelho', 'ligamentos'],
      autor: 'Prof. Dra. Maria Santos',
      dificuldadeNumerica: 5
    },
    {
      id: 3,
      area: 'anatomia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Sobre a inervação do plexo braquial, qual nervo é responsável pela inervação do músculo serrátil anterior?',
      alternativas: [
        { id: 'a', texto: 'Nervo torácico longo (C5, C6, C7)' },
        { id: 'b', texto: 'Nervo peitoral medial (C8, T1)' },
        { id: 'c', texto: 'Nervo subescapular (C5, C6)' },
        { id: 'd', texto: 'Nervo axilar (C5, C6)' },
        { id: 'e', texto: 'Nervo supraescapular (C5, C6)' }
      ],
      respostaCorreta: 'a',
      explicacao: 'O nervo torácico longo, originado das raízes C5, C6 e C7, é responsável pela inervação do músculo serrátil anterior. Sua lesão causa a "escápula alada".',
      referencias: 'Moore, K.L. Anatomia Orientada para a Clínica. 8ª ed.',
      tags: ['anatomia', 'plexo-braquial', 'inervação'],
      autor: 'Prof. Dr. Carlos Lima',
      dificuldadeNumerica: 8
    },

    // NEUROLOGIA - Casos Clínicos Complexos
    {
      id: 4,
      area: 'neurologia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Em relação à Escala de Coma de Glasgow, qual pontuação indica coma profundo?',
      alternativas: [
        { id: 'a', texto: '15 pontos' },
        { id: 'b', texto: '8-12 pontos' },
        { id: 'c', texto: '3-8 pontos' },
        { id: 'd', texto: '13-15 pontos' },
        { id: 'e', texto: '9-12 pontos' }
      ],
      respostaCorreta: 'c',
      explicacao: 'A Escala de Coma de Glasgow varia de 3 a 15 pontos. Pontuação de 3-8 indica coma severo, 9-12 coma moderado e 13-15 coma leve ou consciência normal.',
      referencias: 'Teasdale, G. & Jennett, B. Lancet, 1974',
      tags: ['neurologia', 'glasgow', 'coma'],
      autor: 'Prof. Dra. Ana Costa',
      dificuldadeNumerica: 5
    },
    {
      id: 5,
      area: 'neurologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Paciente de 65 anos apresenta hemiparesia direita, afasia de Broca e desvio conjugado do olhar para a esquerda. A lesão mais provável localiza-se em:',
      alternativas: [
        { id: 'a', texto: 'Artéria cerebral média esquerda - território superficial' },
        { id: 'b', texto: 'Artéria cerebral anterior direita' },
        { id: 'c', texto: 'Artéria cerebral posterior esquerda' },
        { id: 'd', texto: 'Artéria basilar' },
        { id: 'e', texto: 'Artéria cerebral média direita - território profundo' }
      ],
      respostaCorreta: 'a',
      explicacao: 'A combinação de hemiparesia direita, afasia de Broca (área de Broca no hemisfério dominante esquerdo) e desvio conjugado do olhar para a esquerda indica lesão no território superficial da artéria cerebral média esquerda.',
      referencias: 'Adams & Victor. Neurologia. 11ª ed.',
      tags: ['neurologia', 'avc', 'anatomia-vascular'],
      autor: 'Prof. Dr. Roberto Mendes',
      dificuldadeNumerica: 9
    },
    {
      id: 6,
      area: 'neurologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Na avaliação da espasticidade pela Escala de Ashworth Modificada, o grau 1+ corresponde a:',
      alternativas: [
        { id: 'a', texto: 'Nenhum aumento do tônus muscular' },
        { id: 'b', texto: 'Leve aumento do tônus com resistência mínima no final da ADM' },
        { id: 'c', texto: 'Leve aumento do tônus com resistência súbita seguida de relaxamento' },
        { id: 'd', texto: 'Aumento mais marcante do tônus durante a maior parte da ADM' },
        { id: 'e', texto: 'Considerável aumento do tônus com movimento passivo difícil' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O grau 1+ da Escala de Ashworth Modificada caracteriza-se por leve aumento do tônus muscular manifestado por uma resistência súbita (catch) seguida de relaxamento ou resistência mínima durante o restante da amplitude de movimento.',
      referencias: 'Bohannon, R.W. & Smith, M.B. Phys Ther, 1987',
      tags: ['neurologia', 'espasticidade', 'avaliação'],
      autor: 'Prof. Dra. Fernanda Silva',
      dificuldadeNumerica: 7
    },
    {
      id: 2,
      area: 'neurologia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Em relação à Escala de Coma de Glasgow, qual pontuação indica coma profundo?',
      alternativas: [
        { id: 'a', texto: '15 pontos' },
        { id: 'b', texto: '8-12 pontos' },
        { id: 'c', texto: '3-8 pontos' },
        { id: 'd', texto: '13-15 pontos' },
        { id: 'e', texto: '9-12 pontos' }
      ],
      respostaCorreta: 'c',
      explicacao: 'A Escala de Coma de Glasgow varia de 3 a 15 pontos. Pontuação de 3-8 indica coma severo, 9-12 coma moderado e 13-15 coma leve ou consciência normal.',
      referencias: 'Teasdale, G. & Jennett, B. Lancet, 1974',
      tags: ['neurologia', 'glasgow', 'coma'],
      autor: 'Prof. Dra. Maria Santos',
      dificuldadeNumerica: 5
    },
    {
      id: 3,
      area: 'cardiologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Durante o teste de esforço, qual é o principal indicador de isquemia miocárdica no ECG?',
      alternativas: [
        { id: 'a', texto: 'Elevação do segmento ST' },
        { id: 'b', texto: 'Depressão do segmento ST ≥ 1mm' },
        { id: 'c', texto: 'Inversão da onda T' },
        { id: 'd', texto: 'Prolongamento do intervalo QT' },
        { id: 'e', texto: 'Aparecimento de ondas Q' }
      ],
      respostaCorreta: 'b',
      explicacao: 'A depressão horizontal ou descendente do segmento ST ≥ 1mm, medida 80ms após o ponto J, é o principal critério eletrocardiográfico para isquemia miocárdica durante teste de esforço.',
      referencias: 'Diretrizes da Sociedade Brasileira de Cardiologia, 2019',
      tags: ['cardiologia', 'teste-esforco', 'ecg'],
      autor: 'Prof. Dr. Carlos Lima',
      dificuldadeNumerica: 8
    },
    {
      id: 4,
      area: 'ortopedia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'O teste de Lachman é utilizado para avaliar a integridade de qual estrutura?',
      alternativas: [
        { id: 'a', texto: 'Ligamento colateral medial' },
        { id: 'b', texto: 'Ligamento colateral lateral' },
        { id: 'c', texto: 'Ligamento cruzado anterior' },
        { id: 'd', texto: 'Ligamento cruzado posterior' },
        { id: 'e', texto: 'Menisco medial' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O teste de Lachman é considerado o teste mais sensível e específico para avaliar a integridade do ligamento cruzado anterior (LCA). É realizado com o joelho em 20-30° de flexão.',
      referencias: 'Magee, D.J. Avaliação Musculoesquelética. 6ª ed.',
      tags: ['ortopedia', 'joelho', 'lachman'],
      autor: 'Prof. Dra. Ana Costa',
      dificuldadeNumerica: 4
    },
    {
      id: 5,
      area: 'respiratoria',
      dificuldade: 'facil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual é o volume corrente normal em um adulto saudável em repouso?',
      alternativas: [
        { id: 'a', texto: '100-200 mL' },
        { id: 'b', texto: '300-400 mL' },
        { id: 'c', texto: '500-600 mL' },
        { id: 'd', texto: '700-800 mL' },
        { id: 'e', texto: '900-1000 mL' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O volume corrente (VT) normal em adultos saudáveis em repouso é de aproximadamente 500-600 mL ou 6-8 mL/kg de peso corporal.',
      referencias: 'West, J.B. Fisiologia Respiratória. 9ª ed.',
      tags: ['respiratoria', 'volumes', 'fisiologia'],
      autor: 'Prof. Dr. Pedro Mendes',
      dificuldadeNumerica: 3
    },

    // FISIOLOGIA DO EXERCÍCIO - Questões Avançadas
    {
      id: 6,
      area: 'fisiologia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Durante o exercício aeróbico, qual é o principal sistema energético utilizado após os primeiros 2-3 minutos?',
      alternativas: [
        { id: 'a', texto: 'Sistema ATP-CP (fosfagênio)' },
        { id: 'b', texto: 'Sistema glicolítico anaeróbico' },
        { id: 'c', texto: 'Sistema oxidativo aeróbico' },
        { id: 'd', texto: 'Gliconeogênese' },
        { id: 'e', texto: 'Beta-oxidação exclusiva' }
      ],
      respostaCorreta: 'c',
      explicacao: 'Após 2-3 minutos de exercício, o sistema oxidativo aeróbico torna-se predominante, utilizando carboidratos e gorduras como substrato energético na presença de oxigênio.',
      referencias: 'McArdle, W.D. Fisiologia do Exercício. 8ª ed.',
      tags: ['fisiologia', 'exercício', 'metabolismo'],
      autor: 'Prof. Dr. Pedro Oliveira',
      dificuldadeNumerica: 6
    },
    {
      id: 7,
      area: 'fisiologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Em relação ao VO2 máximo, qual afirmação está CORRETA?',
      alternativas: [
        { id: 'a', texto: 'É determinado exclusivamente pela capacidade pulmonar' },
        { id: 'b', texto: 'Representa o platô no consumo de O2 durante exercício incremental' },
        { id: 'c', texto: 'Não sofre influência do treinamento físico' },
        { id: 'd', texto: 'É maior em indivíduos sedentários' },
        { id: 'e', texto: 'Depende apenas da concentração de hemoglobina' }
      ],
      respostaCorreta: 'b',
      explicacao: 'O VO2 máximo representa o platô no consumo de oxigênio durante exercício incremental, indicando a capacidade máxima do organismo de captar, transportar e utilizar oxigênio.',
      referencias: 'ACSM. Guidelines for Exercise Testing. 10ª ed.',
      tags: ['fisiologia', 'vo2-max', 'teste-esforço'],
      autor: 'Prof. Dra. Carla Rodrigues',
      dificuldadeNumerica: 8
    },

    // PNEUMOLOGIA - Casos Clínicos
    {
      id: 8,
      area: 'pneumologia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Na espirometria, qual parâmetro representa o volume de ar que pode ser expirado após uma inspiração máxima?',
      alternativas: [
        { id: 'a', texto: 'Volume corrente (VC)' },
        { id: 'b', texto: 'Volume de reserva expiratório (VRE)' },
        { id: 'c', texto: 'Capacidade vital forçada (CVF)' },
        { id: 'd', texto: 'Volume residual (VR)' },
        { id: 'e', texto: 'Capacidade pulmonar total (CPT)' }
      ],
      respostaCorreta: 'c',
      explicacao: 'A Capacidade Vital Forçada (CVF) representa o volume máximo de ar que pode ser expirado forçadamente após uma inspiração máxima, sendo um importante parâmetro na avaliação da função pulmonar.',
      referencias: 'Miller, M.R. et al. Eur Respir J, 2005',
      tags: ['pneumologia', 'espirometria', 'função-pulmonar'],
      autor: 'Prof. Dr. Eduardo Santos',
      dificuldadeNumerica: 5
    },
    {
      id: 9,
      area: 'pneumologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Em pacientes com DPOC, qual valor de VEF1/CVF confirma a presença de obstrução ao fluxo aéreo?',
      alternativas: [
        { id: 'a', texto: 'VEF1/CVF > 0,80' },
        { id: 'b', texto: 'VEF1/CVF < 0,70' },
        { id: 'c', texto: 'VEF1/CVF > 0,75' },
        { id: 'd', texto: 'VEF1/CVF < 0,60' },
        { id: 'e', texto: 'VEF1/CVF = 0,70' }
      ],
      respostaCorreta: 'b',
      explicacao: 'Segundo as diretrizes GOLD, um valor de VEF1/CVF < 0,70 após broncodilatador confirma a presença de obstrução ao fluxo aéreo e o diagnóstico de DPOC.',
      referencias: 'GOLD Guidelines, 2023',
      tags: ['pneumologia', 'dpoc', 'espirometria'],
      autor: 'Prof. Dra. Patricia Lima',
      dificuldadeNumerica: 8
    },

    // PEDIATRIA - Desenvolvimento Motor
    {
      id: 10,
      area: 'pediatria',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Segundo os marcos do desenvolvimento motor, em que idade a criança normalmente consegue sentar sem apoio?',
      alternativas: [
        { id: 'a', texto: '4-5 meses' },
        { id: 'b', texto: '6-8 meses' },
        { id: 'c', texto: '9-10 meses' },
        { id: 'd', texto: '11-12 meses' },
        { id: 'e', texto: '13-15 meses' }
      ],
      respostaCorreta: 'b',
      explicacao: 'O sentar sem apoio é um marco importante do desenvolvimento motor que ocorre tipicamente entre 6-8 meses de idade, representando o desenvolvimento do controle postural do tronco.',
      referencias: 'Piper, M.C. & Darrah, J. Motor Assessment of the Developing Infant',
      tags: ['pediatria', 'desenvolvimento-motor', 'marcos'],
      autor: 'Prof. Dra. Juliana Martins',
      dificuldadeNumerica: 4
    },
    {
      id: 11,
      area: 'pediatria',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Na paralisia cerebral do tipo diplegia espástica, qual padrão de marcha é mais comumente observado?',
      alternativas: [
        { id: 'a', texto: 'Marcha em tesoura com equinismo' },
        { id: 'b', texto: 'Marcha atáxica com base alargada' },
        { id: 'c', texto: 'Marcha festinante' },
        { id: 'd', texto: 'Marcha em steppage' },
        { id: 'e', texto: 'Marcha anserina' }
      ],
      respostaCorreta: 'a',
      explicacao: 'Na diplegia espástica, a espasticidade predomina nos membros inferiores, resultando em padrão de marcha em tesoura (adução e rotação interna dos quadris) associado ao equinismo dos pés.',
      referencias: 'Rosenbaum, P. et al. Dev Med Child Neurol, 2007',
      tags: ['pediatria', 'paralisia-cerebral', 'marcha'],
      autor: 'Prof. Dr. Ricardo Souza',
      dificuldadeNumerica: 9
    },

    // GERIATRIA - Envelhecimento
    {
      id: 12,
      area: 'geriatria',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Qual é o principal fator de risco modificável para quedas em idosos?',
      alternativas: [
        { id: 'a', texto: 'Idade avançada' },
        { id: 'b', texto: 'Sexo feminino' },
        { id: 'c', texto: 'Fraqueza muscular' },
        { id: 'd', texto: 'História familiar de quedas' },
        { id: 'e', texto: 'Baixa estatura' }
      ],
      respostaCorreta: 'c',
      explicacao: 'A fraqueza muscular, especialmente dos membros inferiores, é o principal fator de risco modificável para quedas em idosos, podendo ser melhorada através de exercícios de fortalecimento.',
      referencias: 'Tinetti, M.E. N Engl J Med, 2003',
      tags: ['geriatria', 'quedas', 'prevenção'],
      autor: 'Prof. Dra. Mariana Costa',
      dificuldadeNumerica: 5
    },
    {
      id: 13,
      area: 'geriatria',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Na sarcopenia, qual é o ponto de corte para força de preensão palmar em homens segundo o consenso europeu (EWGSOP2)?',
      alternativas: [
        { id: 'a', texto: '< 16 kg' },
        { id: 'b', texto: '< 20 kg' },
        { id: 'c', texto: '< 27 kg' },
        { id: 'd', texto: '< 30 kg' },
        { id: 'e', texto: '< 35 kg' }
      ],
      respostaCorreta: 'c',
      explicacao: 'Segundo o consenso EWGSOP2, o ponto de corte para força de preensão palmar em homens é < 27 kg, sendo um dos critérios diagnósticos para sarcopenia.',
      referencias: 'Cruz-Jentoft, A.J. et al. Age Ageing, 2019',
      tags: ['geriatria', 'sarcopenia', 'força'],
      autor: 'Prof. Dr. Antonio Silva',
      dificuldadeNumerica: 8
    },

    // BIOMECÂNICA - Análise de Movimento
    {
      id: 14,
      area: 'biomecanica',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Durante a fase de apoio da marcha, qual músculo é o principal responsável pela absorção do impacto no contato inicial?',
      alternativas: [
        { id: 'a', texto: 'Quadríceps femoral' },
        { id: 'b', texto: 'Gastrocnêmio' },
        { id: 'c', texto: 'Tibial anterior' },
        { id: 'd', texto: 'Glúteo médio' },
        { id: 'e', texto: 'Isquiotibiais' }
      ],
      respostaCorreta: 'a',
      explicacao: 'O quadríceps femoral atua excentricamente durante o contato inicial e resposta à carga, controlando a flexão do joelho e absorvendo o impacto do contato com o solo.',
      referencias: 'Perry, J. & Burnfield, J.M. Gait Analysis. 2ª ed.',
      tags: ['biomecanica', 'marcha', 'músculos'],
      autor: 'Prof. Dr. Fernando Reis',
      dificuldadeNumerica: 6
    },
    {
      id: 15,
      area: 'biomecanica',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Na análise cinemática da marcha, qual é o valor normal da flexão máxima do joelho durante a fase de balanço?',
      alternativas: [
        { id: 'a', texto: '30-40°' },
        { id: 'b', texto: '45-55°' },
        { id: 'c', texto: '60-70°' },
        { id: 'd', texto: '75-85°' },
        { id: 'e', texto: '90-100°' }
      ],
      respostaCorreta: 'c',
      explicacao: 'Durante a fase de balanço da marcha normal, o joelho atinge flexão máxima de aproximadamente 60-70°, permitindo o clearance adequado do pé com o solo.',
      referencias: 'Whittle, M.W. Gait Analysis: An Introduction. 4ª ed.',
      tags: ['biomecanica', 'cinemática', 'joelho'],
      autor: 'Prof. Dra. Beatriz Almeida',
      dificuldadeNumerica: 7
    },

    // ELETROTERAPIA - Recursos Físicos
    {
      id: 16,
      area: 'eletroterapia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Na estimulação elétrica neuromuscular (EENM), qual frequência é mais adequada para fortalecimento muscular?',
      alternativas: [
        { id: 'a', texto: '1-10 Hz' },
        { id: 'b', texto: '20-35 Hz' },
        { id: 'c', texto: '50-100 Hz' },
        { id: 'd', texto: '150-200 Hz' },
        { id: 'e', texto: '300-500 Hz' }
      ],
      respostaCorreta: 'c',
      explicacao: 'Para fortalecimento muscular através da EENM, utilizam-se frequências entre 50-100 Hz, que promovem contrações tetânicas sustentadas e recrutamento adequado das fibras musculares.',
      referencias: 'Robinson, A.J. Clinical Electrophysiology. 3ª ed.',
      tags: ['eletroterapia', 'eenm', 'fortalecimento'],
      autor: 'Prof. Dr. Gustavo Pereira',
      dificuldadeNumerica: 5
    },
    {
      id: 17,
      area: 'eletroterapia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'No ultrassom terapêutico, qual é o mecanismo primário do efeito térmico?',
      alternativas: [
        { id: 'a', texto: 'Cavitação estável' },
        { id: 'b', texto: 'Micromassagem acústica' },
        { id: 'c', texto: 'Absorção da energia ultrassônica pelos tecidos' },
        { id: 'd', texto: 'Reflexão das ondas na interface tecidual' },
        { id: 'e', texto: 'Dispersão das ondas ultrassônicas' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O efeito térmico do ultrassom resulta da absorção da energia ultrassônica pelos tecidos, convertendo energia mecânica em calor, especialmente em tecidos com alto conteúdo proteico.',
      referencias: 'Ter Haar, G. Ultrasound Med Biol, 2007',
      tags: ['eletroterapia', 'ultrassom', 'efeitos-térmicos'],
      autor: 'Prof. Dra. Claudia Moreira',
      dificuldadeNumerica: 8
    },

    // HIDROTERAPIA - Propriedades Físicas
    {
      id: 18,
      area: 'hidroterapia',
      dificuldade: 'facil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual propriedade física da água é responsável pela redução do peso corporal durante exercícios aquáticos?',
      alternativas: [
        { id: 'a', texto: 'Viscosidade' },
        { id: 'b', texto: 'Empuxo (flutuação)' },
        { id: 'c', texto: 'Pressão hidrostática' },
        { id: 'd', texto: 'Tensão superficial' },
        { id: 'e', texto: 'Condutividade térmica' }
      ],
      respostaCorreta: 'b',
      explicacao: 'O empuxo ou força de flutuação, descrito pelo princípio de Arquimedes, é responsável pela redução do peso corporal na água, diminuindo a sobrecarga nas articulações.',
      referencias: 'Becker, B.E. & Cole, A.J. Comprehensive Aquatic Therapy. 3ª ed.',
      tags: ['hidroterapia', 'empuxo', 'propriedades-físicas'],
      autor: 'Prof. Dra. Renata Oliveira',
      dificuldadeNumerica: 3
    },
    {
      id: 19,
      area: 'hidroterapia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Em que profundidade da água o peso corporal é reduzido em aproximadamente 50%?',
      alternativas: [
        { id: 'a', texto: 'Altura dos tornozelos' },
        { id: 'b', texto: 'Altura dos joelhos' },
        { id: 'c', texto: 'Altura da cintura' },
        { id: 'd', texto: 'Altura do processo xifoide' },
        { id: 'e', texto: 'Altura dos ombros' }
      ],
      respostaCorreta: 'd',
      explicacao: 'Quando a água atinge a altura do processo xifoide (parte inferior do esterno), o peso corporal é reduzido em aproximadamente 50%, proporcionando alívio significativo da carga articular.',
      referencias: 'Harrison, R.A. et al. Physiotherapy, 1992',
      tags: ['hidroterapia', 'redução-peso', 'profundidade'],
      autor: 'Prof. Dr. Marcos Teixeira',
      dificuldadeNumerica: 4
    },

    // ERGONOMIA - Saúde Ocupacional
    {
      id: 20,
      area: 'ergonomia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Segundo a NR-17, qual é a altura recomendada para superfícies de trabalho em atividades que exigem precisão?',
      alternativas: [
        { id: 'a', texto: '70-75 cm' },
        { id: 'b', texto: '75-80 cm' },
        { id: 'c', texto: '80-85 cm' },
        { id: 'd', texto: '85-95 cm' },
        { id: 'e', texto: '95-105 cm' }
      ],
      respostaCorreta: 'd',
      explicacao: 'Para atividades que exigem precisão, a NR-17 recomenda altura da superfície de trabalho entre 85-95 cm, permitindo apoio adequado dos antebraços e reduzindo a tensão nos ombros.',
      referencias: 'NR-17 - Ergonomia. Ministério do Trabalho, 2018',
      tags: ['ergonomia', 'nr17', 'altura-trabalho'],
      autor: 'Prof. Dra. Silvia Barbosa',
      dificuldadeNumerica: 5
    },

    // CASOS CLÍNICOS COMPLEXOS - Neurologia
    {
      id: 21,
      area: 'neurologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Paciente de 45 anos, vítima de TCE há 3 meses, apresenta rigidez em extensão dos MMSS e MMII, com rotação interna dos ombros e pronação dos antebraços. Este quadro sugere:',
      alternativas: [
        { id: 'a', texto: 'Postura de decorticação' },
        { id: 'b', texto: 'Postura de descerebração' },
        { id: 'c', texto: 'Rigidez em roda denteada' },
        { id: 'd', texto: 'Espasticidade em flexão' },
        { id: 'e', texto: 'Distonia generalizada' }
      ],
      respostaCorreta: 'b',
      explicacao: 'A postura de descerebração caracteriza-se por extensão rígida dos quatro membros, rotação interna dos ombros, pronação dos antebraços e flexão plantar dos pés, indicando lesão do tronco cerebral.',
      referencias: 'Plum, F. & Posner, J.B. The Diagnosis of Stupor and Coma. 3ª ed.',
      tags: ['neurologia', 'tce', 'posturas-patológicas'],
      autor: 'Prof. Dr. Alexandre Nunes',
      dificuldadeNumerica: 9
    },
    {
      id: 22,
      area: 'neurologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Na esclerose múltipla, qual sintoma é mais característico da forma remitente-recorrente?',
      alternativas: [
        { id: 'a', texto: 'Progressão contínua dos déficits' },
        { id: 'b', texto: 'Episódios de exacerbação seguidos de remissão' },
        { id: 'c', texto: 'Deterioração cognitiva precoce' },
        { id: 'd', texto: 'Paralisia flácida permanente' },
        { id: 'e', texto: 'Movimentos involuntários constantes' }
      ],
      respostaCorreta: 'b',
      explicacao: 'A forma remitente-recorrente da esclerose múltipla caracteriza-se por episódios de exacerbação (surtos) seguidos de períodos de remissão, com recuperação parcial ou total dos sintomas.',
      referencias: 'Compston, A. & Coles, A. Lancet, 2008',
      tags: ['neurologia', 'esclerose-múltipla', 'formas-clínicas'],
      autor: 'Prof. Dra. Isabela Rocha',
      dificuldadeNumerica: 8
    },

    // ORTOPEDIA - Lesões Esportivas
    {
      id: 23,
      area: 'ortopedia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Na síndrome da banda iliotibial, qual é o local mais comum de dor?',
      alternativas: [
        { id: 'a', texto: 'Face medial do joelho' },
        { id: 'b', texto: 'Face lateral do joelho' },
        { id: 'c', texto: 'Região poplítea' },
        { id: 'd', texto: 'Face anterior do joelho' },
        { id: 'e', texto: 'Região infrapatelar' }
      ],
      respostaCorreta: 'b',
      explicacao: 'Na síndrome da banda iliotibial, a dor localiza-se tipicamente na face lateral do joelho, sobre o epicôndilo lateral do fêmur, devido ao atrito da banda sobre esta proeminência óssea.',
      referencias: 'Fredericson, M. & Weir, A. Sports Med, 2006',
      tags: ['ortopedia', 'banda-iliotibial', 'joelho'],
      autor: 'Prof. Dr. Rafael Santos',
      dificuldadeNumerica: 4
    },
    {
      id: 24,
      area: 'ortopedia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'No teste de Hawkins-Kennedy positivo, qual estrutura está sendo testada?',
      alternativas: [
        { id: 'a', texto: 'Tendão do bíceps braquial' },
        { id: 'b', texto: 'Tendão do supraespinhal' },
        { id: 'c', texto: 'Ligamento glenoumeral inferior' },
        { id: 'd', texto: 'Bursa subdeltoidea' },
        { id: 'e', texto: 'Tendão do infraespinhal' }
      ],
      respostaCorreta: 'b',
      explicacao: 'O teste de Hawkins-Kennedy avalia o impacto do tendão do supraespinhal contra o ligamento coracoacromial, sendo positivo quando há dor durante a flexão de 90° do ombro com rotação interna forçada.',
      referencias: 'Hawkins, R.J. & Kennedy, J.C. Am J Sports Med, 1980',
      tags: ['ortopedia', 'ombro', 'testes-impacto'],
      autor: 'Prof. Dra. Camila Ferreira',
      dificuldadeNumerica: 7
    },

    // CARDIOLOGIA - Reabilitação Cardíaca
    {
      id: 25,
      area: 'cardiologia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Na reabilitação cardíaca fase II, qual é a intensidade de exercício recomendada?',
      alternativas: [
        { id: 'a', texto: '40-50% da FCmáx' },
        { id: 'b', texto: '60-80% da FCmáx' },
        { id: 'c', texto: '85-95% da FCmáx' },
        { id: 'd', texto: '50-60% da FC de reserva' },
        { id: 'e', texto: '80-90% da FC de reserva' }
      ],
      respostaCorreta: 'b',
      explicacao: 'Na fase II da reabilitação cardíaca, recomenda-se exercício aeróbico com intensidade de 60-80% da frequência cardíaca máxima ou 40-70% da FC de reserva, dependendo da estratificação de risco.',
      referencias: 'Diretrizes Brasileiras de Reabilitação Cardiovascular, 2020',
      tags: ['cardiologia', 'reabilitação', 'intensidade-exercício'],
      autor: 'Prof. Dr. Luiz Carlos',
      dificuldadeNumerica: 6
    },
    {
      id: 26,
      area: 'cardiologia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual é o principal mecanismo de melhora da capacidade funcional após treinamento físico em pacientes com insuficiência cardíaca?',
      alternativas: [
        { id: 'a', texto: 'Aumento da fração de ejeção' },
        { id: 'b', texto: 'Redução da pré-carga' },
        { id: 'c', texto: 'Melhora da função endotelial e extração periférica de O2' },
        { id: 'd', texto: 'Diminuição da frequência cardíaca de repouso' },
        { id: 'e', texto: 'Aumento do débito cardíaco máximo' }
      ],
      respostaCorreta: 'c',
      explicacao: 'Em pacientes com IC, o treinamento físico melhora principalmente a função endotelial, a densidade capilar e a capacidade oxidativa muscular, aumentando a extração periférica de oxigênio.',
      referencias: 'Piepoli, M.F. et al. Eur Heart J, 2011',
      tags: ['cardiologia', 'insuficiência-cardíaca', 'treinamento'],
      autor: 'Prof. Dra. Monica Andrade',
      dificuldadeNumerica: 9
    },

    // ANATOMIA - Questões Avançadas
    {
      id: 27,
      area: 'anatomia',
      dificuldade: 'dificil',
      tipo: 'multipla-escolha',
      enunciado: 'Qual estrutura forma o limite posterior do triângulo femoral (triângulo de Scarpa)?',
      alternativas: [
        { id: 'a', texto: 'Músculo adutor longo' },
        { id: 'b', texto: 'Músculo pectíneo' },
        { id: 'c', texto: 'Músculo iliopsoas' },
        { id: 'd', texto: 'Músculo sartório' },
        { id: 'e', texto: 'Ligamento inguinal' }
      ],
      respostaCorreta: 'c',
      explicacao: 'O triângulo femoral é delimitado superiormente pelo ligamento inguinal, medialmente pelo músculo adutor longo e lateralmente pelo músculo sartório. O músculo iliopsoas forma o assoalho (limite posterior).',
      referencias: 'Moore, K.L. Anatomia Orientada para a Clínica. 8ª ed.',
      tags: ['anatomia', 'triângulo-femoral', 'coxa'],
      autor: 'Prof. Dr. Henrique Dias',
      dificuldadeNumerica: 8
    },
    {
      id: 28,
      area: 'anatomia',
      dificuldade: 'media',
      tipo: 'multipla-escolha',
      enunciado: 'Qual vértebra cervical é conhecida como "áxis"?',
      alternativas: [
        { id: 'a', texto: 'C1' },
        { id: 'b', texto: 'C2' },
        { id: 'c', texto: 'C3' },
        { id: 'd', texto: 'C7' },
        { id: 'e', texto: 'T1' }
      ],
      respostaCorreta: 'b',
      explicacao: 'A segunda vértebra cervical (C2) é conhecida como áxis e possui o processo odontoide (dente), que se articula com o atlas (C1) permitindo a rotação da cabeça.',
      referencias: 'Netter, F.H. Atlas de Anatomia Humana. 7ª ed.',
      tags: ['anatomia', 'coluna-cervical', 'axis'],
      autor: 'Prof. Dra. Leticia Gomes',
      dificuldadeNumerica: 3
    }
  ];

  const areas = [
    { value: 'todas', label: 'Todas as Áreas', icon: '📚' },
    { value: 'anatomia', label: 'Anatomia', icon: '🦴' },
    { value: 'neurologia', label: 'Neurologia', icon: '🧠' },
    { value: 'cardiologia', label: 'Cardiologia', icon: '❤️' },
    { value: 'ortopedia', label: 'Ortopedia', icon: '🦵' },
    { value: 'respiratoria', label: 'Respiratória', icon: '🫁' },
    { value: 'pneumologia', label: 'Pneumologia', icon: '🫁' },
    { value: 'pediatria', label: 'Pediatria', icon: '👶' },
    { value: 'geriatria', label: 'Geriatria', icon: '👴' },
    { value: 'fisiologia', label: 'Fisiologia', icon: '⚡' },
    { value: 'biomecanica', label: 'Biomecânica', icon: '🏃' },
    { value: 'eletroterapia', label: 'Eletroterapia', icon: '⚡' },
    { value: 'hidroterapia', label: 'Hidroterapia', icon: '🏊' },
    { value: 'ergonomia', label: 'Ergonomia', icon: '💼' }
  ];

  const dificuldades = [
    { value: 'todas', label: 'Todas', cor: '#6b7280' },
    { value: 'facil', label: 'Fácil', cor: '#10b981' },
    { value: 'media', label: 'Média', cor: '#f59e0b' },
    { value: 'dificil', label: 'Difícil', cor: '#ef4444' }
  ];

  const tipos = [
    { value: 'todas', label: 'Todos os Tipos' },
    { value: 'multipla-escolha', label: 'Múltipla Escolha' },
    { value: 'verdadeiro-falso', label: 'Verdadeiro/Falso' },
    { value: 'dissertativa', label: 'Dissertativa' }
  ];

  // Filtrar questões
  const questoesFiltradas = bancoQuestoes.filter(questao => {
    return (filtros.area === 'todas' || questao.area === filtros.area) &&
           (filtros.dificuldade === 'todas' || questao.dificuldade === filtros.dificuldade) &&
           (filtros.tipo === 'todas' || questao.tipo === filtros.tipo);
  });

  const iniciarSessao = (modo, quantidade = 10) => {
    const questoesSelecionadas = questoesFiltradas
      .sort(() => Math.random() - 0.5)
      .slice(0, quantidade);
    
    setSessaoAtual({
      questoes: questoesSelecionadas,
      questaoAtual: 0,
      respostas: {},
      tempoInicio: Date.now(),
      tempoDecorrido: 0,
      modo
    });
    
    setModoAtual('questao');
  };

  const responderQuestao = (questaoId, alternativaId) => {
    setSessaoAtual(prev => ({
      ...prev,
      respostas: {
        ...prev.respostas,
        [questaoId]: alternativaId
      }
    }));
  };

  const proximaQuestao = () => {
    if (sessaoAtual.questaoAtual < sessaoAtual.questoes.length - 1) {
      setSessaoAtual(prev => ({
        ...prev,
        questaoAtual: prev.questaoAtual + 1
      }));
    } else {
      finalizarSessao();
    }
  };

  const finalizarSessao = () => {
    const tempoTotal = Date.now() - sessaoAtual.tempoInicio;
    let acertos = 0;
    
    sessaoAtual.questoes.forEach(questao => {
      if (sessaoAtual.respostas[questao.id] === questao.respostaCorreta) {
        acertos++;
      }
    });
    
    const novasEstatisticas = {
      totalQuestoes: sessaoAtual.questoes.length,
      acertos,
      erros: sessaoAtual.questoes.length - acertos,
      percentualAcerto: Math.round((acertos / sessaoAtual.questoes.length) * 100),
      tempoMedio: Math.round(tempoTotal / sessaoAtual.questoes.length / 1000),
      ranking: Math.floor(Math.random() * 100) + 1 // Simulado
    };
    
    setEstatisticas(novasEstatisticas);
    setModoAtual('resultado');
  };

  const reiniciar = () => {
    setModoAtual('selecao');
    setSessaoAtual({
      questoes: [],
      questaoAtual: 0,
      respostas: {},
      tempoInicio: null,
      tempoDecorrido: 0,
      modo: 'estudo'
    });
  };

  // Timer para modo simulado
  useEffect(() => {
    let interval;
    if (modoAtual === 'questao' && sessaoAtual.modo === 'simulado') {
      interval = setInterval(() => {
        setSessaoAtual(prev => ({
          ...prev,
          tempoDecorrido: Date.now() - prev.tempoInicio
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [modoAtual, sessaoAtual.modo, sessaoAtual.tempoInicio]);

  const formatarTempo = (ms) => {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) {
      return `${horas}:${(minutos % 60).toString().padStart(2, '0')}:${(segundos % 60).toString().padStart(2, '0')}`;
    }
    return `${minutos}:${(segundos % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e1f5fe 100%)', 
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
              Banco de Questões
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Pratique com questões de fisioterapia baseadas em evidências científicas e concursos
            </p>
          </div>
        </div>

        {/* Tela de Seleção */}
        {modoAtual === 'selecao' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Estatísticas Gerais */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>
                Estatísticas do Banco
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: '#10b981',
                    borderRadius: '0.5rem'
                  }}>
                    <BookOpen style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534' }}>
                      {bancoQuestoes.length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                      Questões Disponíveis
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#eff6ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: '#3b82f6',
                    borderRadius: '0.5rem'
                  }}>
                    <Users style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                      {areas.length - 1}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                      Áreas Cobertas
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#fffbeb',
                  borderRadius: '0.5rem',
                  border: '1px solid #fed7aa'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: '#f59e0b',
                    borderRadius: '0.5rem'
                  }}>
                    <Trophy style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>
                      {estatisticas.percentualAcerto || 0}%
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                      Seu Aproveitamento
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros e Configurações */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Filter style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Configurar Sessão de Estudos
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Área de Conhecimento
                  </label>
                  <select
                    value={filtros.area}
                    onChange={(e) => setFiltros({...filtros, area: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    {areas.map(area => (
                      <option key={area.value} value={area.value}>
                        {area.icon} {area.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Nível de Dificuldade
                  </label>
                  <select
                    value={filtros.dificuldade}
                    onChange={(e) => setFiltros({...filtros, dificuldade: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    {dificuldades.map(dif => (
                      <option key={dif.value} value={dif.value}>
                        {dif.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Tipo de Questão
                  </label>
                  <select
                    value={filtros.tipo}
                    onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    {tipos.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Questões disponíveis com os filtros atuais:
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                  {questoesFiltradas.length} questões
                </div>
              </div>

              {/* Botões de Início */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <button
                  onClick={() => iniciarSessao('estudo', 5)}
                  disabled={questoesFiltradas.length === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: questoesFiltradas.length > 0 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: questoesFiltradas.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <BookOpen style={{ width: '20px', height: '20px' }} />
                  Modo Estudo (5 questões)
                </button>

                <button
                  onClick={() => iniciarSessao('simulado', 10)}
                  disabled={questoesFiltradas.length < 10}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: questoesFiltradas.length >= 10 ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: questoesFiltradas.length >= 10 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (questoesFiltradas.length >= 10) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (questoesFiltradas.length >= 10) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <Clock style={{ width: '20px', height: '20px' }} />
                  Simulado (10 questões)
                </button>

                <button
                  onClick={() => iniciarSessao('personalizado', Math.min(questoesFiltradas.length, 20))}
                  disabled={questoesFiltradas.length === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: questoesFiltradas.length > 0 ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: questoesFiltradas.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(245, 158, 11, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (questoesFiltradas.length > 0) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <Target style={{ width: '20px', height: '20px' }} />
                  Personalizado (até 20)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tela de Questão */}
        {modoAtual === 'questao' && sessaoAtual.questoes.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #f3f4f6',
            overflow: 'hidden'
          }}>
            {/* Header da Questão */}
            <div style={{
              padding: '1.5rem 2rem',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
                    Questão {sessaoAtual.questaoAtual + 1} de {sessaoAtual.questoes.length}
                  </span>

                  {sessaoAtual.modo === 'simulado' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444' }}>
                        {formatarTempo(sessaoAtual.tempoDecorrido)}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={reiniciar}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'none',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.color = '#6b7280';
                  }}
                >
                  <XCircle style={{ width: '16px', height: '16px' }} />
                  Sair
                </button>
              </div>

              {/* Barra de Progresso */}
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((sessaoAtual.questaoAtual + 1) / sessaoAtual.questoes.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Conteúdo da Questão */}
            <div style={{ padding: '2rem' }}>
              {(() => {
                const questaoAtual = sessaoAtual.questoes[sessaoAtual.questaoAtual];
                const dificuldadeCor = dificuldades.find(d => d.value === questaoAtual.dificuldade)?.cor || '#6b7280';

                return (
                  <div>
                    {/* Metadados da Questão */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: areas.find(a => a.value === questaoAtual.area)?.icon ? '#f0fdf4' : '#f8fafc',
                        color: '#166534',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        border: '1px solid #bbf7d0'
                      }}>
                        {areas.find(a => a.value === questaoAtual.area)?.icon} {areas.find(a => a.value === questaoAtual.area)?.label}
                      </span>

                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: dificuldadeCor,
                        color: 'white',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}>
                        {dificuldades.find(d => d.value === questaoAtual.dificuldade)?.label}
                      </span>
                    </div>

                    {/* Enunciado */}
                    <div style={{
                      padding: '1.5rem',
                      background: '#f8fafc',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#111827',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {questaoAtual.enunciado}
                      </h3>
                    </div>

                    {/* Alternativas */}
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {questaoAtual.alternativas.map((alternativa, index) => {
                        const isSelected = sessaoAtual.respostas[questaoAtual.id] === alternativa.id;

                        return (
                          <button
                            key={alternativa.id}
                            onClick={() => responderQuestao(questaoAtual.id, alternativa.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              padding: '1rem 1.5rem',
                              background: isSelected ? '#eff6ff' : 'white',
                              border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                              borderRadius: '0.75rem',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontSize: '1rem'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.target.style.borderColor = '#3b82f6';
                                e.target.style.background = '#f8fafc';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.background = 'white';
                              }
                            }}
                          >
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              background: isSelected ? '#3b82f6' : '#f3f4f6',
                              color: isSelected ? 'white' : '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              flexShrink: 0
                            }}>
                              {alternativa.id.toUpperCase()}
                            </div>
                            <span style={{ color: '#374151', lineHeight: 1.5 }}>
                              {alternativa.texto}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Botões de Navegação */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={() => setSessaoAtual(prev => ({
                          ...prev,
                          questaoAtual: Math.max(0, prev.questaoAtual - 1)
                        }))}
                        disabled={sessaoAtual.questaoAtual === 0}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: sessaoAtual.questaoAtual === 0 ? '#f3f4f6' : 'white',
                          color: sessaoAtual.questaoAtual === 0 ? '#9ca3af' : '#6b7280',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          cursor: sessaoAtual.questaoAtual === 0 ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <ArrowLeft style={{ width: '16px', height: '16px' }} />
                        Anterior
                      </button>

                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {sessaoAtual.modo === 'estudo' ? 'Modo Estudo' : 'Modo Simulado'}
                      </div>

                      <button
                        onClick={proximaQuestao}
                        disabled={!sessaoAtual.respostas[questaoAtual.id]}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: !sessaoAtual.respostas[questaoAtual.id] ? '#f3f4f6' :
                                     sessaoAtual.questaoAtual === sessaoAtual.questoes.length - 1 ?
                                     'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                                     'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: !sessaoAtual.respostas[questaoAtual.id] ? '#9ca3af' : 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontWeight: 600,
                          cursor: !sessaoAtual.respostas[questaoAtual.id] ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (sessaoAtual.respostas[questaoAtual.id]) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sessaoAtual.respostas[questaoAtual.id]) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        {sessaoAtual.questaoAtual === sessaoAtual.questoes.length - 1 ? (
                          <>
                            <CheckCircle style={{ width: '16px', height: '16px' }} />
                            Finalizar
                          </>
                        ) : (
                          <>
                            Próxima
                            <SkipForward style={{ width: '16px', height: '16px' }} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Tela de Resultado */}
        {modoAtual === 'resultado' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Resultado Geral */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                background: estatisticas.percentualAcerto >= 70 ?
                           'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                           estatisticas.percentualAcerto >= 50 ?
                           'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                           'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {estatisticas.percentualAcerto >= 70 ? (
                  <Trophy style={{ width: '40px', height: '40px', color: 'white' }} />
                ) : estatisticas.percentualAcerto >= 50 ? (
                  <Award style={{ width: '40px', height: '40px', color: 'white' }} />
                ) : (
                  <AlertCircle style={{ width: '40px', height: '40px', color: 'white' }} />
                )}
              </div>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {estatisticas.percentualAcerto >= 70 ? 'Excelente!' :
                 estatisticas.percentualAcerto >= 50 ? 'Bom trabalho!' : 'Continue estudando!'}
              </h2>

              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Você acertou {estatisticas.acertos} de {estatisticas.totalQuestoes} questões
              </p>

              <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: estatisticas.percentualAcerto >= 70 ? '#10b981' :
                       estatisticas.percentualAcerto >= 50 ? '#f59e0b' : '#ef4444',
                marginBottom: '1rem'
              }}>
                {estatisticas.percentualAcerto}%
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <div style={{
                  padding: '1rem',
                  background: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534' }}>
                    {estatisticas.acertos}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                    Acertos
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#fef2f2',
                  borderRadius: '0.5rem',
                  border: '1px solid #fecaca'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>
                    {estatisticas.erros}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                    Erros
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#eff6ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                    {estatisticas.tempoMedio}s
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                    Tempo Médio
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#fffbeb',
                  borderRadius: '0.5rem',
                  border: '1px solid #fed7aa'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>
                    #{estatisticas.ranking}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                    Ranking
                  </div>
                </div>
              </div>
            </div>

            {/* Revisão das Questões */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '1.5rem 2rem',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Revisão das Questões
                </h3>
              </div>

              <div style={{ padding: '0' }}>
                {sessaoAtual.questoes.map((questao, index) => {
                  const respostaUsuario = sessaoAtual.respostas[questao.id];
                  const acertou = respostaUsuario === questao.respostaCorreta;
                  const alternativaCorreta = questao.alternativas.find(a => a.id === questao.respostaCorreta);
                  const alternativaUsuario = questao.alternativas.find(a => a.id === respostaUsuario);

                  return (
                    <div key={questao.id} style={{
                      padding: '1.5rem 2rem',
                      borderBottom: index < sessaoAtual.questoes.length - 1 ? '1px solid #e5e7eb' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: acertou ? '#10b981' : '#ef4444',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          flexShrink: 0
                        }}>
                          {acertou ? (
                            <CheckCircle style={{ width: '16px', height: '16px' }} />
                          ) : (
                            <XCircle style={{ width: '16px', height: '16px' }} />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
                              Questão {index + 1}
                            </span>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              background: areas.find(a => a.value === questao.area)?.icon ? '#f0fdf4' : '#f8fafc',
                              color: '#166534',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}>
                              {areas.find(a => a.value === questao.area)?.label}
                            </span>
                          </div>

                          <p style={{
                            fontSize: '1rem',
                            color: '#374151',
                            marginBottom: '1rem',
                            lineHeight: 1.5
                          }}>
                            {questao.enunciado}
                          </p>

                          <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {respostaUsuario && (
                              <div style={{
                                padding: '0.75rem',
                                background: acertou ? '#f0fdf4' : '#fef2f2',
                                borderRadius: '0.5rem',
                                border: `1px solid ${acertou ? '#bbf7d0' : '#fecaca'}`
                              }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                                  Sua resposta: {alternativaUsuario?.id.toUpperCase()}) {alternativaUsuario?.texto}
                                </div>
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: acertou ? '#166534' : '#dc2626',
                                  fontWeight: 500
                                }}>
                                  {acertou ? '✓ Correto!' : '✗ Incorreto'}
                                </div>
                              </div>
                            )}

                            {!acertou && (
                              <div style={{
                                padding: '0.75rem',
                                background: '#f0fdf4',
                                borderRadius: '0.5rem',
                                border: '1px solid #bbf7d0'
                              }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                                  Resposta correta: {alternativaCorreta?.id.toUpperCase()}) {alternativaCorreta?.texto}
                                </div>
                              </div>
                            )}

                            {questao.explicacao && (
                              <div style={{
                                padding: '0.75rem',
                                background: '#fffbeb',
                                borderRadius: '0.5rem',
                                border: '1px solid #fed7aa',
                                marginTop: '0.5rem'
                              }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', marginBottom: '0.5rem' }}>
                                  Explicação:
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: 1.4 }}>
                                  {questao.explicacao}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botões de Ação */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={reiniciar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                <RotateCcw style={{ width: '16px', height: '16px' }} />
                Nova Sessão
              </button>

              <button
                onClick={() => iniciarSessao(sessaoAtual.modo, sessaoAtual.questoes.length)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
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
                <Play style={{ width: '16px', height: '16px' }} />
                Repetir Sessão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questoes;
