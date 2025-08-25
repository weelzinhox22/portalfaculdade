import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Trophy, 
  Target, 
  BookOpen, 
  CheckCircle, 
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Award,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Brain,
  Timer,
  BarChart3
} from 'lucide-react';

const Simulados = () => {
  const [simuladoAtivo, setSimuladoAtivo] = useState(null);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [tempoRestante, setTempoRestante] = useState(0);
  const [simuladoIniciado, setSimuladoIniciado] = useState(false);
  const [simuladoFinalizado, setSimuladoFinalizado] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [pausado, setPausado] = useState(false);

  // Banco de simulados com questões reais de concursos
  const simulados = [
    {
      id: 1,
      titulo: 'Concurso SES-DF 2022 - Fisioterapeuta',
      banca: 'IADES',
      ano: 2022,
      orgao: 'Secretaria de Saúde do DF',
      cargo: 'Fisioterapeuta',
      totalQuestoes: 30,
      tempo: 90, // minutos
      dificuldade: 'media',
      descricao: 'Simulado completo baseado nas questões específicas de fisioterapia do concurso SES-DF 2022',
      questoes: [
        {
          id: 1,
          enunciado: 'A síndrome do impacto do ombro é uma das principais causas de dor no ombro em atletas que praticam esportes com movimentos repetitivos acima da cabeça. Sobre essa síndrome, é CORRETO afirmar que:',
          alternativas: [
            { id: 'a', texto: 'O teste de Neer é considerado o mais específico para o diagnóstico da síndrome do impacto.' },
            { id: 'b', texto: 'A síndrome do impacto primário está relacionada à instabilidade glenoumeral.' },
            { id: 'c', texto: 'O espaço subacromial é reduzido durante a elevação do braço, podendo causar compressão das estruturas.' },
            { id: 'd', texto: 'O tratamento cirúrgico é sempre a primeira opção terapêutica.' },
            { id: 'e', texto: 'A bursite subacromial não está relacionada à síndrome do impacto.' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A síndrome do impacto do ombro ocorre quando há redução do espaço subacromial durante a elevação do braço, causando compressão das estruturas como tendão do supraespinhal, bursa subacromial e porção longa do bíceps contra o arco coracoacromial.',
          raciocinio: 'Para resolver esta questão, é necessário compreender a fisiopatologia da síndrome do impacto: 1) O espaço subacromial é limitado superiormente pelo acrômio e ligamento coracoacromial, e inferiormente pela cabeça do úmero; 2) Durante a elevação do braço, este espaço diminui naturalmente; 3) Quando há alterações anatômicas ou funcionais, pode ocorrer compressão patológica das estruturas; 4) Esta compressão é a base da síndrome do impacto.',
          referencias: 'Neer CS. Impingement lesions. Clin Orthop Relat Res. 1983;(173):70-77.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 2,
          enunciado: 'Na avaliação da função pulmonar através da espirometria, o parâmetro que representa o volume máximo de ar que pode ser expirado forçadamente após uma inspiração máxima é denominado:',
          alternativas: [
            { id: 'a', texto: 'Volume corrente (VC)' },
            { id: 'b', texto: 'Volume de reserva expiratório (VRE)' },
            { id: 'c', texto: 'Capacidade vital forçada (CVF)' },
            { id: 'd', texto: 'Volume expiratório forçado no primeiro segundo (VEF1)' },
            { id: 'e', texto: 'Capacidade pulmonar total (CPT)' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A Capacidade Vital Forçada (CVF) é definida como o volume máximo de ar que pode ser expirado forçadamente após uma inspiração máxima. É um dos principais parâmetros da espirometria e reflete a capacidade total dos pulmões.',
          raciocinio: 'Análise das alternativas: a) VC é o volume normal de ar inspirado/expirado em repouso (~500mL); b) VRE é o volume adicional que pode ser expirado após expiração normal; c) CVF é exatamente o que o enunciado descreve; d) VEF1 é o volume expirado no primeiro segundo da manobra de CVF; e) CPT inclui também o volume residual, não mensurável por espirometria.',
          referencias: 'Miller MR, et al. Standardisation of spirometry. Eur Respir J. 2005;26(2):319-338.',
          banca: 'IADES',
          ano: 2022,
          area: 'Pneumologia',
          dificuldade: 'facil'
        },
        {
          id: 3,
          enunciado: 'Paciente de 68 anos, com diagnóstico de doença de Parkinson há 5 anos, apresenta bradicinesia, rigidez e instabilidade postural. Sobre a fisioterapia nesta condição, é INCORRETO afirmar:',
          alternativas: [
            { id: 'a', texto: 'Exercícios de amplitude de movimento são importantes para manter a flexibilidade.' },
            { id: 'b', texto: 'O treinamento de marcha com pistas visuais e auditivas pode melhorar o padrão de marcha.' },
            { id: 'c', texto: 'Exercícios de fortalecimento muscular são contraindicados devido à rigidez.' },
            { id: 'd', texto: 'O treinamento de equilíbrio é fundamental para prevenir quedas.' },
            { id: 'e', texto: 'Exercícios respiratórios podem ajudar na melhora da capacidade pulmonar.' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Exercícios de fortalecimento muscular NÃO são contraindicados na doença de Parkinson. Pelo contrário, são recomendados e benéficos, pois ajudam a combater a fraqueza muscular secundária à inatividade e podem melhorar a função motora.',
          raciocinio: 'A questão pede o que é INCORRETO. Analisando: a) CORRETO - ADM previne contraturas; b) CORRETO - pistas externas melhoram a marcha parkinsiana; c) INCORRETO - fortalecimento é benéfico e recomendado; d) CORRETO - equilíbrio previne quedas; e) CORRETO - exercícios respiratórios são importantes. A alternativa C é a única incorreta.',
          referencias: 'Keus SH, et al. European Physiotherapy Guideline for Parkinson\'s disease. KNGF/ParkinsonNet, 2014.',
          banca: 'IADES',
          ano: 2022,
          area: 'Neurologia',
          dificuldade: 'media'
        },
        {
          id: 4,
          enunciado: 'Na avaliação da força muscular pela escala do Medical Research Council (MRC), o grau 3 corresponde a:',
          alternativas: [
            { id: 'a', texto: 'Movimento ativo contra a gravidade e resistência moderada' },
            { id: 'b', texto: 'Movimento ativo contra a gravidade, mas sem resistência' },
            { id: 'c', texto: 'Movimento ativo com eliminação da gravidade' },
            { id: 'd', texto: 'Contração muscular visível, mas sem movimento articular' },
            { id: 'e', texto: 'Nenhuma contração muscular detectável' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Na escala MRC, o grau 3 representa movimento ativo contra a gravidade, mas incapaz de vencer qualquer resistência adicional. É o ponto médio da escala onde o músculo consegue mover o segmento contra a força da gravidade.',
          raciocinio: 'Escala MRC: 0=sem contração; 1=contração sem movimento; 2=movimento sem gravidade; 3=movimento contra gravidade (sem resistência); 4=movimento contra gravidade e resistência; 5=força normal. O grau 3 é específico: vence gravidade mas não resistência.',
          referencias: 'Medical Research Council. Aids to the examination of the peripheral nervous system. London: HMSO, 1976.',
          banca: 'IADES',
          ano: 2022,
          area: 'Avaliação',
          dificuldade: 'facil'
        },
        {
          id: 5,
          enunciado: 'Em relação à biomecânica da marcha normal, durante a fase de apoio médio (midstance), qual músculo atua principalmente para estabilizar a pelve no plano frontal?',
          alternativas: [
            { id: 'a', texto: 'Quadríceps femoral' },
            { id: 'b', texto: 'Glúteo máximo' },
            { id: 'c', texto: 'Glúteo médio' },
            { id: 'd', texto: 'Isquiotibiais' },
            { id: 'e', texto: 'Gastrocnêmio' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O glúteo médio é o principal estabilizador da pelve no plano frontal durante a fase de apoio da marcha. Sua contração evita a queda da pelve para o lado oposto (sinal de Trendelenburg), mantendo o alinhamento pélvico.',
          raciocinio: 'Durante o apoio unipodal: 1) A pelve tende a cair para o lado da perna que está no balanço; 2) O glúteo médio da perna de apoio contrai para evitar essa queda; 3) Outros músculos têm funções diferentes: quadríceps (estabiliza joelho), glúteo máximo (extensão quadril), etc.',
          referencias: 'Perry J, Burnfield JM. Gait Analysis: Normal and Pathological Function. 2nd ed. Thorofare: SLACK; 2010.',
          banca: 'IADES',
          ano: 2022,
          area: 'Biomecânica',
          dificuldade: 'media'
        },
        {
          id: 6,
          enunciado: 'Na fisioterapia respiratória, a técnica de drenagem postural tem como objetivo principal:',
          alternativas: [
            { id: 'a', texto: 'Aumentar a capacidade vital do paciente' },
            { id: 'b', texto: 'Facilitar a remoção de secreções brônquicas' },
            { id: 'c', texto: 'Melhorar a troca gasosa alveolar' },
            { id: 'd', texto: 'Fortalecer a musculatura respiratória' },
            { id: 'e', texto: 'Reduzir o trabalho respiratório' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A drenagem postural utiliza a força da gravidade para facilitar a mobilização e remoção de secreções das vias aéreas, posicionando o paciente de forma que o segmento pulmonar a ser drenado fique em posição superior.',
          raciocinio: 'Princípio da drenagem postural: 1) Usa a gravidade como força auxiliar; 2) Posiciona o segmento pulmonar acima do nível da carina; 3) Facilita o fluxo de secreções para vias aéreas maiores; 4) Objetivo específico: remoção de secreções (não melhora CV, troca gasosa ou força).',
          referencias: 'Pryor JA, Prasad SA. Physiotherapy for Respiratory and Cardiac Problems. 4th ed. Edinburgh: Churchill Livingstone; 2008.',
          banca: 'IADES',
          ano: 2022,
          area: 'Pneumologia',
          dificuldade: 'facil'
        },
        {
          id: 7,
          enunciado: 'Um paciente de 45 anos apresenta dor lombar há 3 meses, com irradiação para membro inferior direito até o pé, parestesias e teste de Lasègue positivo a 30°. O diagnóstico mais provável é:',
          alternativas: [
            { id: 'a', texto: 'Lombalgia mecânica simples' },
            { id: 'b', texto: 'Estenose do canal vertebral' },
            { id: 'c', texto: 'Hérnia de disco com radiculopatia' },
            { id: 'd', texto: 'Síndrome do piriforme' },
            { id: 'e', texto: 'Artrose facetária' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O quadro clínico descrito (dor com irradiação dermatomérica, parestesias e Lasègue positivo precoce) é característico de hérnia de disco com compressão radicular. O teste de Lasègue positivo a 30° indica compressão significativa da raiz nervosa.',
          raciocinio: 'Sinais de radiculopatia: 1) Dor irradiada seguindo dermátomo; 2) Parestesias (alteração sensitiva); 3) Lasègue positivo precoce (30°) indica compressão severa; 4) Outros diagnósticos não explicam todos os sinais: lombalgia simples (sem irradiação), estenose (claudicação), piriforme (sem Lasègue), artrose (sem radiculopatia).',
          referencias: 'Deyo RA, Weinstein JN. Low back pain. N Engl J Med. 2001;344(5):363-370.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 8,
          enunciado: 'Na reabilitação de pacientes com doença pulmonar obstrutiva crônica (DPOC), qual é o principal benefício do treinamento físico?',
          alternativas: [
            { id: 'a', texto: 'Melhora da função pulmonar (VEF1)' },
            { id: 'b', texto: 'Redução da dispneia e melhora da capacidade funcional' },
            { id: 'c', texto: 'Reversão do processo obstrutivo' },
            { id: 'd', texto: 'Aumento da saturação de oxigênio em repouso' },
            { id: 'e', texto: 'Cura da doença pulmonar' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O treinamento físico em pacientes com DPOC não melhora significativamente a função pulmonar, mas reduz a dispneia, melhora a capacidade funcional, a qualidade de vida e a tolerância ao exercício através de adaptações periféricas.',
          raciocinio: 'Benefícios do exercício na DPOC: 1) Não melhora VEF1 (obstrução é irreversível); 2) Não reverte obstrução nem cura; 3) Pode não alterar SpO2 repouso; 4) PRINCIPAL benefício: redução dispneia + melhora capacidade funcional através de: melhor condicionamento muscular, eficiência ventilatória, tolerância ao exercício.',
          referencias: 'Spruit MA, et al. An official American Thoracic Society/European Respiratory Society statement: key concepts and advances in pulmonary rehabilitation. Am J Respir Crit Care Med. 2013;188(8):e13-64.',
          banca: 'IADES',
          ano: 2022,
          area: 'Pneumologia',
          dificuldade: 'media'
        },
        {
          id: 9,
          enunciado: 'No tratamento da espasticidade em pacientes neurológicos, qual técnica de fisioterapia é mais eficaz para redução imediata do tônus muscular?',
          alternativas: [
            { id: 'a', texto: 'Exercícios de fortalecimento muscular' },
            { id: 'b', texto: 'Alongamento passivo mantido' },
            { id: 'c', texto: 'Estimulação elétrica funcional' },
            { id: 'd', texto: 'Mobilização articular' },
            { id: 'e', texto: 'Exercícios ativos resistidos' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O alongamento passivo mantido é a técnica mais eficaz para redução imediata da espasticidade, promovendo inibição reflexa através do reflexo de estiramento inverso (órgãos tendinosos de Golgi) e adaptação viscoelástica dos tecidos.',
          raciocinio: 'Mecanismos do alongamento na espasticidade: 1) Ativa órgãos tendinosos de Golgi → inibição reflexa; 2) Promove adaptação viscoelástica; 3) Reduz hiperexcitabilidade do reflexo de estiramento; 4) Outras técnicas: fortalecimento pode aumentar tônus, EEF é para ativação, mobilização é para articulação.',
          referencias: 'Bovend\'Eerdt TJ, et al. The effects of stretching in spasticity: a systematic review. Arch Phys Med Rehabil. 2008;89(7):1395-1406.',
          banca: 'IADES',
          ano: 2022,
          area: 'Neurologia',
          dificuldade: 'media'
        },
        {
          id: 10,
          enunciado: 'Na avaliação da capacidade funcional de idosos, qual teste é mais específico para avaliar o risco de quedas?',
          alternativas: [
            { id: 'a', texto: 'Teste de caminhada de 6 minutos' },
            { id: 'b', texto: 'Timed Up and Go (TUG)' },
            { id: 'c', texto: 'Teste de sentar e levantar' },
            { id: 'd', texto: 'Escala de Borg' },
            { id: 'e', texto: 'Índice de Barthel' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O Timed Up and Go (TUG) é considerado o teste mais específico para avaliação do risco de quedas em idosos. Valores acima de 13,5 segundos indicam alto risco de quedas, pois avalia múltiplas funções: transferências, marcha e mudanças de direção.',
          raciocinio: 'Especificidade do TUG para quedas: 1) Avalia transferência (sentar→levantar); 2) Avalia marcha; 3) Avalia mudança de direção; 4) Avalia equilíbrio dinâmico; 5) Todas essas funções estão relacionadas ao risco de quedas. Outros testes: TC6 (capacidade aeróbica), sentar-levantar (força MMII), Borg (percepção esforço), Barthel (AVDs).',
          referencias: 'Shumway-Cook A, et al. Predicting the probability for falls in community-dwelling older adults using the Timed Up & Go Test. Phys Ther. 2000;80(9):896-903.',
          banca: 'IADES',
          ano: 2022,
          area: 'Geriatria',
          dificuldade: 'media'
        },
        {
          id: 11,
          enunciado: 'Na síndrome do túnel do carpo, qual teste clínico apresenta maior sensibilidade para o diagnóstico?',
          alternativas: [
            { id: 'a', texto: 'Teste de Phalen' },
            { id: 'b', texto: 'Sinal de Tinel' },
            { id: 'c', texto: 'Teste de Finkelstein' },
            { id: 'd', texto: 'Teste de compressão do carpo' },
            { id: 'e', texto: 'Teste de Allen' }
          ],
          respostaCorreta: 'd',
          explicacao: 'O teste de compressão do carpo (Durkan) apresenta a maior sensibilidade (87%) para diagnóstico da síndrome do túnel do carpo, seguido pelo teste de Phalen (68%) e sinal de Tinel (60%).',
          raciocinio: 'Sensibilidade dos testes: 1) Compressão carpo: pressão direta sobre nervo mediano → maior sensibilidade; 2) Phalen: flexão punho → compressão indireta; 3) Tinel: percussão → menos sensível; 4) Finkelstein: para tenosinovite De Quervain; 5) Allen: para circulação arterial.',
          referencias: 'Durkan JA. A new diagnostic test for carpal tunnel syndrome. J Bone Joint Surg Am. 1991;73(4):535-538.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 12,
          enunciado: 'Em pacientes com insuficiência cardíaca, qual parâmetro é mais importante para prescrição da intensidade do exercício aeróbico?',
          alternativas: [
            { id: 'a', texto: 'Frequência cardíaca máxima teórica (220 - idade)' },
            { id: 'b', texto: 'Frequência cardíaca no limiar anaeróbico' },
            { id: 'c', texto: 'Frequência cardíaca de repouso + 20 bpm' },
            { id: 'd', texto: '70% da frequência cardíaca máxima' },
            { id: 'e', texto: 'Percepção subjetiva de esforço (Borg 12-14)' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Em pacientes com insuficiência cardíaca, a prescrição baseada na frequência cardíaca no limiar anaeróbico (obtida no teste cardiopulmonar) é mais segura e eficaz, pois considera as limitações individuais da doença.',
          raciocinio: 'Prescrição na IC: 1) FCmáx teórica não considera limitações da IC; 2) Limiar anaeróbico = intensidade segura e eficaz; 3) FC repouso+20 muito baixa; 4) 70% FCmáx pode ser excessiva; 5) Borg útil mas subjetiva. Limiar anaeróbico = ponto ótimo de treinamento.',
          referencias: 'Piepoli MF, et al. Exercise training in heart failure: from theory to practice. A consensus document of the Heart Failure Association. Eur J Heart Fail. 2011;13(4):347-357.',
          banca: 'IADES',
          ano: 2022,
          area: 'Cardiologia',
          dificuldade: 'dificil'
        },
        {
          id: 13,
          enunciado: 'Na paralisia cerebral do tipo hemiplegia espástica, qual padrão de marcha é mais comumente observado?',
          alternativas: [
            { id: 'a', texto: 'Marcha em tesoura bilateral' },
            { id: 'b', texto: 'Marcha ceifante unilateral' },
            { id: 'c', texto: 'Marcha atáxica' },
            { id: 'd', texto: 'Marcha anserina' },
            { id: 'e', texto: 'Marcha festinante' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Na hemiplegia espástica, o padrão mais comum é a marcha ceifante unilateral, caracterizada por circundução do membro inferior afetado devido à espasticidade dos extensores e dificuldade de flexão do joelho e dorsiflexão do tornozelo.',
          raciocinio: 'Hemiplegia espástica: 1) Afeta um lado do corpo; 2) Espasticidade predomina em extensores MMII; 3) Dificuldade flexão joelho + dorsiflexão tornozelo; 4) Compensação: circundução (ceifante); 5) Outros padrões: tesoura (diplegia), atáxica (cerebelar), anserina (miopatia), festinante (Parkinson).',
          referencias: 'Rodda JM, et al. Classification of gait patterns in spastic hemiplegia and spastic diplegia: a basis for a management algorithm. Eur J Neurol. 2001;8 Suppl 5:98-108.',
          banca: 'IADES',
          ano: 2022,
          area: 'Pediatria',
          dificuldade: 'media'
        },
        {
          id: 14,
          enunciado: 'No ultrassom terapêutico, qual frequência é mais adequada para tratamento de tecidos superficiais (até 2 cm de profundidade)?',
          alternativas: [
            { id: 'a', texto: '1 MHz' },
            { id: 'b', texto: '3 MHz' },
            { id: 'c', texto: '5 MHz' },
            { id: 'd', texto: '10 MHz' },
            { id: 'e', texto: '0,5 MHz' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A frequência de 3 MHz é mais adequada para tecidos superficiais (até 2 cm), pois apresenta maior absorção nos tecidos superficiais. A frequência de 1 MHz é utilizada para tecidos mais profundos (3-5 cm).',
          raciocinio: 'Relação frequência-profundidade no US: 1) Maior frequência = menor penetração, maior absorção superficial; 2) 3 MHz: tecidos superficiais (0-2 cm); 3) 1 MHz: tecidos profundos (3-5 cm); 4) Frequências muito altas (5-10 MHz): diagnóstico, não terapêutico; 5) 0,5 MHz: muito baixa, pouco usada.',
          referencias: 'Ter Haar G. Therapeutic ultrasound. Eur J Ultrasound. 1999;9(1):3-9.',
          banca: 'IADES',
          ano: 2022,
          area: 'Eletroterapia',
          dificuldade: 'media'
        },
        {
          id: 15,
          enunciado: 'Na avaliação postural, a presença de hipercifose torácica está frequentemente associada a:',
          alternativas: [
            { id: 'a', texto: 'Hiperextensão cervical compensatória' },
            { id: 'b', texto: 'Hiperlordose lombar' },
            { id: 'c', texto: 'Retroversão pélvica' },
            { id: 'd', texto: 'Anteversão pélvica' },
            { id: 'e', texto: 'Escoliose torácica' }
          ],
          respostaCorreta: 'a',
          explicacao: 'A hipercifose torácica frequentemente leva à hiperextensão cervical compensatória para manter o olhar horizontal. Esta compensação ocorre principalmente na transição cervico-torácica e occipito-atlanto-axial.',
          raciocinio: 'Compensações posturais na hipercifose: 1) Cifose torácica → cabeça projeta anteriormente; 2) Para manter olhar horizontal → hiperextensão cervical; 3) Compensação típica e frequente; 4) Outras opções: lordose lombar pode diminuir, pelve pode retroverter, escoliose não é compensação típica.',
          referencias: 'Kendall FP, et al. Muscles: Testing and Function with Posture and Pain. 5th ed. Baltimore: Lippincott Williams & Wilkins; 2005.',
          banca: 'IADES',
          ano: 2022,
          area: 'Avaliação',
          dificuldade: 'facil'
        },
        {
          id: 16,
          enunciado: 'Na hidroterapia, qual propriedade física da água é responsável pela redução da sobrecarga articular?',
          alternativas: [
            { id: 'a', texto: 'Viscosidade' },
            { id: 'b', texto: 'Pressão hidrostática' },
            { id: 'c', texto: 'Empuxo (flutuação)' },
            { id: 'd', texto: 'Tensão superficial' },
            { id: 'e', texto: 'Condutividade térmica' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O empuxo ou força de flutuação, descrito pelo princípio de Arquimedes, é responsável pela redução da sobrecarga articular na hidroterapia, diminuindo o peso corporal aparente e facilitando os movimentos.',
          raciocinio: 'Propriedades da água na hidroterapia: 1) Empuxo = força vertical para cima que reduz peso corporal; 2) Redução peso = menor sobrecarga articular; 3) Viscosidade = resistência ao movimento; 4) Pressão hidrostática = compressão; 5) Tensão superficial e condutividade não afetam sobrecarga articular.',
          referencias: 'Becker BE, Cole AJ. Comprehensive Aquatic Therapy. 3rd ed. Pullman: Washington State University Publishing; 2011.',
          banca: 'IADES',
          ano: 2022,
          area: 'Hidroterapia',
          dificuldade: 'facil'
        },
        {
          id: 17,
          enunciado: 'No tratamento da fibromialgia, qual modalidade de exercício apresenta maior evidência científica de eficácia?',
          alternativas: [
            { id: 'a', texto: 'Exercícios de fortalecimento de alta intensidade' },
            { id: 'b', texto: 'Exercícios aeróbicos de baixa a moderada intensidade' },
            { id: 'c', texto: 'Exercícios de flexibilidade exclusivamente' },
            { id: 'd', texto: 'Exercícios anaeróbicos intervalados' },
            { id: 'e', texto: 'Exercícios isométricos máximos' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Exercícios aeróbicos de baixa a moderada intensidade apresentam o maior nível de evidência científica para redução da dor, fadiga e melhora da qualidade de vida em pacientes com fibromialgia.',
          raciocinio: 'Evidências na fibromialgia: 1) Exercícios aeróbicos baixa-moderada intensidade = maior evidência (nível A); 2) Reduz dor, fadiga, melhora sono e qualidade vida; 3) Alta intensidade pode exacerbar sintomas; 4) Flexibilidade sozinha insuficiente; 5) Anaeróbicos e isométricos máximos contraindicados.',
          referencias: 'Macfarlane GJ, et al. EULAR revised recommendations for the management of fibromyalgia. Ann Rheum Dis. 2017;76(2):318-328.',
          banca: 'IADES',
          ano: 2022,
          area: 'Reumatologia',
          dificuldade: 'media'
        },
        {
          id: 18,
          enunciado: 'Na lesão do ligamento cruzado anterior (LCA), qual teste clínico apresenta maior especificidade?',
          alternativas: [
            { id: 'a', texto: 'Teste de Lachman' },
            { id: 'b', texto: 'Teste da gaveta anterior' },
            { id: 'c', texto: 'Teste do pivot shift' },
            { id: 'd', texto: 'Teste de McMurray' },
            { id: 'e', texto: 'Teste de Apley' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O teste do pivot shift apresenta a maior especificidade (98%) para lesão do LCA, embora tenha menor sensibilidade. É considerado o teste mais específico, mas requer experiência do examinador.',
          raciocinio: 'Especificidade dos testes para LCA: 1) Pivot shift: maior especificidade (98%), menor sensibilidade; 2) Lachman: melhor sensibilidade (85%), boa especificidade; 3) Gaveta anterior: menos específica; 4) McMurray e Apley: para meniscos, não LCA. Especificidade = capacidade de identificar verdadeiros negativos.',
          referencias: 'Solomon DH, et al. The rational clinical examination. Does this patient have a torn meniscus or ligament of the knee? JAMA. 2001;286(13):1610-1620.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'dificil'
        },
        {
          id: 19,
          enunciado: 'Na ventilação mecânica invasiva, qual modo ventilatório oferece maior conforto ao paciente consciente?',
          alternativas: [
            { id: 'a', texto: 'Ventilação controlada por volume (VCV)' },
            { id: 'b', texto: 'Ventilação controlada por pressão (PCV)' },
            { id: 'c', texto: 'Ventilação com suporte pressórico (PSV)' },
            { id: 'd', texto: 'Ventilação mandatória intermitente (SIMV)' },
            { id: 'e', texto: 'Ventilação controlada assistida (A/C)' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A ventilação com suporte pressórico (PSV) oferece maior conforto ao paciente consciente, pois permite controle do tempo inspiratório, fluxo e volume pelo próprio paciente, respeitando seu padrão respiratório natural.',
          raciocinio: 'Conforto na ventilação mecânica: 1) PSV = paciente controla Ti, fluxo, volume → maior conforto; 2) Respeita drive respiratório natural; 3) VCV/PCV = controlados, menos confortáveis; 4) SIMV = híbrido, menos confortável que PSV; 5) A/C = assistido mas controlado.',
          referencias: 'Tobin MJ. Principles and Practice of Mechanical Ventilation. 3rd ed. New York: McGraw-Hill; 2013.',
          banca: 'IADES',
          ano: 2022,
          area: 'UTI',
          dificuldade: 'dificil'
        },
        {
          id: 20,
          enunciado: 'Na avaliação do equilíbrio em idosos, a Escala de Berg avalia quantos itens funcionais?',
          alternativas: [
            { id: 'a', texto: '10 itens' },
            { id: 'b', texto: '12 itens' },
            { id: 'c', texto: '14 itens' },
            { id: 'd', texto: '16 itens' },
            { id: 'e', texto: '18 itens' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A Escala de Equilíbrio de Berg avalia 14 itens funcionais relacionados ao equilíbrio estático e dinâmico, com pontuação de 0 a 4 para cada item, totalizando 56 pontos máximos.',
          raciocinio: 'Escala de Berg: 1) 14 itens funcionais; 2) Cada item: 0-4 pontos; 3) Total: 56 pontos; 4) Avalia equilíbrio estático e dinâmico; 5) Ponto de corte: <45 pontos = risco de quedas. Número específico e bem estabelecido na literatura.',
          referencias: 'Berg KO, et al. Measuring balance in the elderly: validation of an instrument. Can J Public Health. 1992;83 Suppl 2:S7-11.',
          banca: 'IADES',
          ano: 2022,
          area: 'Geriatria',
          dificuldade: 'facil'
        },
        {
          id: 21,
          enunciado: 'Na estimulação elétrica neuromuscular (EENM), qual frequência é mais adequada para fortalecimento muscular?',
          alternativas: [
            { id: 'a', texto: '2-10 Hz' },
            { id: 'b', texto: '20-35 Hz' },
            { id: 'c', texto: '50-100 Hz' },
            { id: 'd', texto: '150-200 Hz' },
            { id: 'e', texto: '300-500 Hz' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Para fortalecimento muscular através da EENM, utilizam-se frequências entre 50-100 Hz, que promovem contrações tetânicas sustentadas e recrutamento adequado das unidades motoras.',
          raciocinio: 'Frequências na EENM: 1) 2-10 Hz: contrações isoladas, não tetânicas; 2) 20-35 Hz: contrações parcialmente tetânicas; 3) 50-100 Hz: contrações tetânicas completas → fortalecimento; 4) >150 Hz: desconfortáveis, desnecessárias; 5) Tetania necessária para ganho de força.',
          referencias: 'Robinson AJ, Snyder-Mackler L. Clinical Electrophysiology: Electrotherapy and Electrophysiologic Testing. 3rd ed. Baltimore: Lippincott Williams & Wilkins; 2008.',
          banca: 'IADES',
          ano: 2022,
          area: 'Eletroterapia',
          dificuldade: 'media'
        },
        {
          id: 22,
          enunciado: 'No método Bobath para tratamento de pacientes neurológicos, qual conceito é fundamental?',
          alternativas: [
            { id: 'a', texto: 'Fortalecimento muscular seletivo' },
            { id: 'b', texto: 'Inibição de padrões anormais e facilitação de movimentos normais' },
            { id: 'c', texto: 'Compensação funcional através de movimentos alternativos' },
            { id: 'd', texto: 'Treinamento de habilidades motoras específicas' },
            { id: 'e', texto: 'Estimulação sensorial intensiva' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O conceito Bobath baseia-se na inibição de padrões de movimento anormais (sinergias patológicas) e facilitação de padrões de movimento normais através de pontos-chave de controle e manuseios específicos.',
          raciocinio: 'Princípios do Bobath: 1) Inibir padrões anormais (sinergias, espasticidade); 2) Facilitar movimentos normais; 3) Usar pontos-chave de controle; 4) Não compensar, mas normalizar; 5) Não é fortalecimento seletivo nem treinamento específico, mas normalização de padrões.',
          referencias: 'Bobath B. Adult Hemiplegia: Evaluation and Treatment. 3rd ed. Oxford: Butterworth-Heinemann; 1990.',
          banca: 'IADES',
          ano: 2022,
          area: 'Neurologia',
          dificuldade: 'media'
        },
        {
          id: 23,
          enunciado: 'Na artrite reumatoide, durante a fase aguda inflamatória, qual conduta fisioterapêutica é mais apropriada?',
          alternativas: [
            { id: 'a', texto: 'Exercícios resistidos de alta intensidade' },
            { id: 'b', texto: 'Mobilização articular passiva e exercícios isométricos suaves' },
            { id: 'c', texto: 'Alongamentos forçados para manter amplitude' },
            { id: 'd', texto: 'Aplicação de calor profundo' },
            { id: 'e', texto: 'Exercícios de impacto para fortalecer ossos' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Durante a fase aguda inflamatória da artrite reumatoide, deve-se realizar mobilização articular passiva suave e exercícios isométricos de baixa intensidade para manter função sem exacerbar a inflamação.',
          raciocinio: 'Fase aguda da AR: 1) Articulações inflamadas, dolorosas, edemaciadas; 2) Evitar sobrecarga que piore inflamação; 3) Mobilização passiva suave mantém ADM; 4) Isométricos suaves mantêm força sem movimento articular; 5) Evitar: exercícios resistidos, alongamentos forçados, calor profundo, impacto.',
          referencias: 'American College of Rheumatology Subcommittee on Rheumatoid Arthritis Guidelines. Guidelines for the management of rheumatoid arthritis. Arthritis Rheum. 2002;46(2):328-346.',
          banca: 'IADES',
          ano: 2022,
          area: 'Reumatologia',
          dificuldade: 'media'
        },
        {
          id: 24,
          enunciado: 'Na avaliação da dor, qual escala é mais apropriada para crianças de 3 a 7 anos?',
          alternativas: [
            { id: 'a', texto: 'Escala Visual Analógica (EVA)' },
            { id: 'b', texto: 'Escala Numérica de Dor' },
            { id: 'c', texto: 'Escala de Faces de Wong-Baker' },
            { id: 'd', texto: 'Questionário McGill de Dor' },
            { id: 'e', texto: 'Escala de Borg' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A Escala de Faces de Wong-Baker é mais apropriada para crianças de 3 a 7 anos, pois utiliza expressões faciais que são facilmente compreendidas por crianças desta faixa etária, não requerendo habilidades abstratas.',
          raciocinio: 'Escalas de dor por idade: 1) 3-7 anos: capacidade limitada de abstração → faces são concretas e compreensíveis; 2) EVA: requer abstração (>8 anos); 3) Numérica: requer conceito numérico (>8 anos); 4) McGill: muito complexa para crianças; 5) Borg: para percepção de esforço.',
          referencias: 'Wong DL, Baker CM. Pain in children: comparison of assessment scales. Pediatr Nurs. 1988;14(1):9-17.',
          banca: 'IADES',
          ano: 2022,
          area: 'Pediatria',
          dificuldade: 'facil'
        },
        {
          id: 25,
          enunciado: 'Na disfunção temporomandibular (DTM), qual técnica de terapia manual é mais eficaz para redução da dor?',
          alternativas: [
            { id: 'a', texto: 'Mobilização articular de alta velocidade' },
            { id: 'b', texto: 'Massagem dos músculos mastigatórios e mobilização suave da ATM' },
            { id: 'c', texto: 'Tração cervical' },
            { id: 'd', texto: 'Manipulação vertebral cervical' },
            { id: 'e', texto: 'Alongamento passivo forçado da mandíbula' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A massagem dos músculos mastigatórios combinada com mobilização suave da ATM apresenta maior evidência de eficácia na redução da dor em pacientes com DTM, promovendo relaxamento muscular e melhora da mobilidade articular.',
          raciocinio: 'Tratamento da DTM: 1) Componente muscular importante (músculos mastigatórios tensos); 2) Massagem relaxa músculos, reduz dor; 3) Mobilização suave melhora movimento ATM; 4) Técnicas agressivas contraindicadas; 5) Tração cervical e manipulação não são específicas para ATM.',
          referencias: 'Medlicott MS, Harris SR. A systematic review of the effectiveness of exercise, manual therapy, electrotherapy, relaxation training, and biofeedback in the management of temporomandibular disorder. Phys Ther. 2006;86(7):955-973.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'media'
        }
      ]
    },
    {
      id: 2,
      titulo: 'Residência UNIFESP 2023 - Fisioterapia',
      banca: 'UNIFESP',
      ano: 2023,
      orgao: 'Universidade Federal de São Paulo',
      cargo: 'Residente em Fisioterapia',
      totalQuestoes: 20,
      tempo: 60,
      dificuldade: 'dificil',
      descricao: 'Simulado baseado na prova de residência em fisioterapia da UNIFESP 2023',
      questoes: [
        {
          id: 1,
          enunciado: 'Na reabilitação cardíaca fase II, um paciente pós-infarto agudo do miocárdio deve iniciar exercícios aeróbicos com intensidade baseada em qual parâmetro?',
          alternativas: [
            { id: 'a', texto: '50-60% da frequência cardíaca máxima teórica' },
            { id: 'b', texto: '40-60% da frequência cardíaca de reserva' },
            { id: 'c', texto: '60-80% da frequência cardíaca máxima atingida no teste ergométrico' },
            { id: 'd', texto: '70-85% da frequência cardíaca máxima teórica' },
            { id: 'e', texto: 'Frequência cardíaca de repouso + 20 bpm' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Na fase II da reabilitação cardíaca, a intensidade recomendada é de 40-60% da frequência cardíaca de reserva (Fórmula de Karvonen) ou 50-70% da FC máxima atingida no teste ergométrico, priorizando sempre a segurança do paciente.',
          raciocinio: 'Paciente pós-IAM na fase II (2-12 semanas): 1) Necessita intensidade moderada e segura; 2) FC de reserva é mais precisa que FC máxima teórica; 3) 40-60% da FC reserva corresponde a intensidade leve-moderada; 4) Evita sobrecarga cardiovascular excessiva; 5) Permite adaptação progressiva.',
          referencias: 'Diretrizes Brasileiras de Reabilitação Cardiovascular - 2020. Arq Bras Cardiol. 2020;114(5):943-987.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Cardiologia',
          dificuldade: 'dificil'
        }
      ]
    },
    {
      id: 3,
      titulo: 'Concurso Prefeitura SP 2019 - Fisioterapeuta',
      banca: 'VUNESP',
      ano: 2019,
      orgao: 'Prefeitura de São Paulo',
      cargo: 'Fisioterapeuta',
      totalQuestoes: 12,
      tempo: 40,
      dificuldade: 'media',
      descricao: 'Simulado baseado nas questões específicas de fisioterapia do concurso da Prefeitura de São Paulo 2019',
      questoes: [
        {
          id: 1,
          enunciado: 'Na avaliação da função respiratória, a capacidade vital forçada (CVF) representa:',
          alternativas: [
            { id: 'a', texto: 'O volume de ar inspirado e expirado durante a respiração normal' },
            { id: 'b', texto: 'O volume máximo de ar que pode ser expirado após uma inspiração máxima' },
            { id: 'c', texto: 'O volume de ar que permanece nos pulmões após uma expiração forçada' },
            { id: 'd', texto: 'O volume de ar expirado no primeiro segundo da manobra expiratória forçada' },
            { id: 'e', texto: 'A capacidade total dos pulmões incluindo o volume residual' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A Capacidade Vital Forçada (CVF) é definida como o volume máximo de ar que pode ser expirado forçadamente após uma inspiração máxima. É um dos principais parâmetros espirométricos para avaliação da função pulmonar.',
          raciocinio: 'Para identificar a CVF: 1) Não é o volume corrente (respiração normal); 2) É o volume MÁXIMO expirado após inspiração MÁXIMA; 3) Não é o volume residual (que fica nos pulmões); 4) Não é o VEF1 (volume no primeiro segundo); 5) Não inclui volume residual (não mensurável por espirometria).',
          referencias: 'Pereira CAC. Espirometria. J Pneumol. 2002;28(Supl 3):S1-S82.',
          banca: 'VUNESP',
          ano: 2019,
          area: 'Pneumologia',
          dificuldade: 'facil'
        },
        {
          id: 2,
          enunciado: 'Um paciente com lesão medular completa em nível T6 apresentará, como consequência neurológica esperada:',
          alternativas: [
            { id: 'a', texto: 'Paraplegia com preservação da função dos membros superiores' },
            { id: 'b', texto: 'Tetraplegia com comprometimento respiratório severo' },
            { id: 'c', texto: 'Hemiplegia do lado direito' },
            { id: 'd', texto: 'Perda apenas da sensibilidade, com preservação motora' },
            { id: 'e', texto: 'Comprometimento apenas dos reflexos tendinosos' }
          ],
          respostaCorreta: 'a',
          explicacao: 'Uma lesão medular completa em T6 (sexta vértebra torácica) resulta em paraplegia, pois está abaixo do nível de inervação dos membros superiores (C5-T1), preservando sua função, mas comprometendo completamente os membros inferiores.',
          raciocinio: 'Anatomia da medula espinal: 1) T6 está na região torácica; 2) Membros superiores são inervados por C5-T1; 3) Como T6 está abaixo, MMSS ficam preservados; 4) MMII são inervados por L1-S2, então ficam comprometidos; 5) Resultado: paraplegia com MMSS normais.',
          referencias: 'Kirshblum SC, et al. International standards for neurological classification of spinal cord injury. J Spinal Cord Med. 2011;34(6):535-546.',
          banca: 'VUNESP',
          ano: 2019,
          area: 'Neurologia',
          dificuldade: 'media'
        }
      ]
    },
    {
      id: 4,
      titulo: 'Residência HC-FMUSP 2022 - Fisioterapia',
      banca: 'FMUSP',
      ano: 2022,
      orgao: 'Hospital das Clínicas - FMUSP',
      cargo: 'Residente em Fisioterapia',
      totalQuestoes: 25,
      tempo: 90,
      dificuldade: 'dificil',
      descricao: 'Simulado baseado na prova de residência em fisioterapia do HC-FMUSP 2022 - nível avançado',
      questoes: [
        {
          id: 1,
          enunciado: 'Na síndrome do desconforto respiratório agudo (SDRA), qual estratégia ventilatória é considerada protetora pulmonar?',
          alternativas: [
            { id: 'a', texto: 'Volume corrente de 10-12 mL/kg de peso predito' },
            { id: 'b', texto: 'Volume corrente de 6 mL/kg de peso predito com pressão de platô ≤ 30 cmH2O' },
            { id: 'c', texto: 'PEEP mínima para evitar colapso alveolar' },
            { id: 'd', texto: 'Frequência respiratória baixa (< 12 rpm) para evitar auto-PEEP' },
            { id: 'e', texto: 'FiO2 sempre em 100% para garantir oxigenação adequada' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A ventilação protetora na SDRA preconiza volume corrente baixo (6 mL/kg de peso predito) com pressão de platô ≤ 30 cmH2O para minimizar o volutrauma e barotrauma, conforme demonstrado no estudo ARDSNet.',
          raciocinio: 'Estratégia protetora na SDRA: 1) Volume baixo previne volutrauma; 2) 6 mL/kg é o padrão-ouro (não 10-12 mL/kg); 3) Pressão de platô ≤ 30 cmH2O previne barotrauma; 4) PEEP adequada (não mínima) mantém recrutamento; 5) FiO2 deve ser a menor possível para SpO2 88-95%.',
          referencias: 'ARDSNet. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury. N Engl J Med. 2000;342(18):1301-1308.',
          banca: 'FMUSP',
          ano: 2022,
          area: 'UTI/Pneumologia',
          dificuldade: 'dificil'
        }
      ]
    }
  ];

  // Timer do simulado
  useEffect(() => {
    let interval = null;
    if (simuladoIniciado && !pausado && !simuladoFinalizado && tempoRestante > 0) {
      interval = setInterval(() => {
        setTempoRestante(tempo => {
          if (tempo <= 1) {
            finalizarSimulado();
            return 0;
          }
          return tempo - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simuladoIniciado, pausado, simuladoFinalizado, tempoRestante]);

  const iniciarSimulado = (simulado) => {
    setSimuladoAtivo(simulado);
    setQuestaoAtual(0);
    setRespostas({});
    setTempoRestante(simulado.tempo * 60); // converter para segundos
    setSimuladoIniciado(true);
    setSimuladoFinalizado(false);
    setMostrarResultado(false);
    setPausado(false);
  };

  const finalizarSimulado = () => {
    setSimuladoIniciado(false);
    setSimuladoFinalizado(true);
    setMostrarResultado(true);
  };

  const selecionarResposta = (questaoId, alternativaId) => {
    setRespostas(prev => ({
      ...prev,
      [questaoId]: alternativaId
    }));
  };

  const proximaQuestao = () => {
    if (questaoAtual < simuladoAtivo.questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  };

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const formatarTempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    
    if (horas > 0) {
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    }
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const calcularResultado = () => {
    if (!simuladoAtivo) return { acertos: 0, total: 0, percentual: 0 };
    
    let acertos = 0;
    simuladoAtivo.questoes.forEach(questao => {
      if (respostas[questao.id] === questao.respostaCorreta) {
        acertos++;
      }
    });
    
    const total = simuladoAtivo.questoes.length;
    const percentual = Math.round((acertos / total) * 100);
    
    return { acertos, total, percentual };
  };

  if (!simuladoAtivo) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        paddingTop: '6rem' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '2rem',
            color: 'white'
          }}>
            <Link 
              to="/" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                marginRight: '1rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
                Simulados de Concursos
              </h1>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '1.1rem' }}>
                Questões reais de concursos da área da saúde com explicações detalhadas
              </p>
            </div>
          </div>

          {/* Lista de Simulados */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {simulados.map((simulado) => (
              <div
                key={simulado.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: '#1f2937', 
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      {simulado.titulo}
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{
                        background: '#3b82f6',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {simulado.banca}
                      </span>
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {simulado.ano}
                      </span>
                      <span style={{
                        background: simulado.dificuldade === 'facil' ? '#10b981' : 
                                   simulado.dificuldade === 'media' ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {simulado.dificuldade === 'facil' ? 'Fácil' : 
                         simulado.dificuldade === 'media' ? 'Médio' : 'Difícil'}
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
                      {simulado.descricao}
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', color: '#374151', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} />
                        <span>{simulado.totalQuestoes} questões</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} />
                        <span>{simulado.tempo} minutos</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={16} />
                        <span>{simulado.cargo}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => iniciarSimulado(simulado)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s',
                      marginLeft: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Play size={20} />
                    Iniciar Simulado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Renderização do simulado ativo
  if (mostrarResultado) {
    const resultado = calcularResultado();

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Resultado do Simulado */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '1rem',
            padding: '3rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <Award size={64} style={{ color: '#10b981', marginBottom: '1rem' }} />
              <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2.5rem', fontWeight: 'bold' }}>
                Simulado Finalizado!
              </h1>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: '#f0f9ff',
                padding: '2rem',
                borderRadius: '1rem',
                border: '2px solid #0ea5e9'
              }}>
                <Target size={32} style={{ color: '#0ea5e9', marginBottom: '1rem' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>Acertos</h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#0ea5e9' }}>
                  {resultado.acertos}/{resultado.total}
                </p>
              </div>

              <div style={{
                background: '#f0fdf4',
                padding: '2rem',
                borderRadius: '1rem',
                border: '2px solid #10b981'
              }}>
                <BarChart3 size={32} style={{ color: '#10b981', marginBottom: '1rem' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>Percentual</h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {resultado.percentual}%
                </p>
              </div>

              <div style={{
                background: '#fef3c7',
                padding: '2rem',
                borderRadius: '1rem',
                border: '2px solid #f59e0b'
              }}>
                <Trophy size={32} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>Desempenho</h3>
                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>
                  {resultado.percentual >= 70 ? 'Excelente!' :
                   resultado.percentual >= 50 ? 'Bom!' : 'Precisa Melhorar'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setMostrarResultado(false)}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <BookOpen size={20} />
                Ver Gabarito Comentado
              </button>

              <button
                onClick={() => setSimuladoAtivo(null)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <ArrowLeft size={20} />
                Voltar aos Simulados
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mostrarResultado && simuladoFinalizado) {
    // Gabarito comentado
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem',
            color: 'white'
          }}>
            <button
              onClick={() => setMostrarResultado(true)}
              style={{
                color: 'white',
                background: 'none',
                border: 'none',
                marginRight: '1rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                Gabarito Comentado
              </h1>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                {simuladoAtivo.titulo}
              </p>
            </div>
          </div>

          {/* Questões com gabarito */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {simuladoAtivo.questoes.map((questao, index) => {
              const respostaUsuario = respostas[questao.id];
              const acertou = respostaUsuario === questao.respostaCorreta;

              return (
                <div
                  key={questao.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    border: `2px solid ${acertou ? '#10b981' : '#ef4444'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    {acertou ? (
                      <CheckCircle size={24} style={{ color: '#10b981' }} />
                    ) : (
                      <XCircle size={24} style={{ color: '#ef4444' }} />
                    )}
                    <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1.25rem' }}>
                      Questão {index + 1}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem'
                      }}>
                        {questao.area}
                      </span>
                      <span style={{
                        background: questao.dificuldade === 'facil' ? '#dcfce7' :
                                   questao.dificuldade === 'media' ? '#fef3c7' : '#fee2e2',
                        color: questao.dificuldade === 'facil' ? '#166534' :
                               questao.dificuldade === 'media' ? '#92400e' : '#991b1b',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem'
                      }}>
                        {questao.dificuldade === 'facil' ? 'Fácil' :
                         questao.dificuldade === 'media' ? 'Médio' : 'Difícil'}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    color: '#374151',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    fontSize: '1.1rem'
                  }}>
                    {questao.enunciado}
                  </p>

                  <div style={{ marginBottom: '2rem' }}>
                    {questao.alternativas.map((alternativa) => {
                      const isCorreta = alternativa.id === questao.respostaCorreta;
                      const foiSelecionada = alternativa.id === respostaUsuario;

                      return (
                        <div
                          key={alternativa.id}
                          style={{
                            padding: '1rem',
                            marginBottom: '0.5rem',
                            borderRadius: '0.5rem',
                            border: '2px solid',
                            borderColor: isCorreta ? '#10b981' :
                                        foiSelecionada && !isCorreta ? '#ef4444' : '#e5e7eb',
                            background: isCorreta ? '#f0fdf4' :
                                       foiSelecionada && !isCorreta ? '#fef2f2' : '#f9fafb'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: isCorreta ? '#10b981' :
                                         foiSelecionada && !isCorreta ? '#ef4444' : '#6b7280',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              fontWeight: 'bold'
                            }}>
                              {alternativa.id.toUpperCase()}
                            </span>
                            <span style={{
                              color: '#374151',
                              fontSize: '1rem'
                            }}>
                              {alternativa.texto}
                            </span>
                            {isCorreta && (
                              <CheckCircle size={20} style={{ color: '#10b981', marginLeft: 'auto' }} />
                            )}
                            {foiSelecionada && !isCorreta && (
                              <XCircle size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explicação detalhada */}
                  <div style={{
                    background: '#f8fafc',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h4 style={{
                      margin: '0 0 1rem 0',
                      color: '#1f2937',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Brain size={20} />
                      Explicação
                    </h4>
                    <p style={{
                      color: '#374151',
                      lineHeight: 1.6,
                      margin: '0 0 1rem 0'
                    }}>
                      {questao.explicacao}
                    </p>

                    <h5 style={{
                      margin: '1.5rem 0 0.5rem 0',
                      color: '#1f2937',
                      fontSize: '1rem'
                    }}>
                      💡 Linha de Raciocínio:
                    </h5>
                    <p style={{
                      color: '#4b5563',
                      lineHeight: 1.6,
                      margin: '0 0 1rem 0',
                      fontStyle: 'italic'
                    }}>
                      {questao.raciocinio}
                    </p>

                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '1rem',
                      marginTop: '1rem'
                    }}>
                      <strong>Referência:</strong> {questao.referencias}<br/>
                      <strong>Banca:</strong> {questao.banca} • <strong>Ano:</strong> {questao.ano}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setSimuladoAtivo(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#374151',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto',
                transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={20} />
              Voltar aos Simulados
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Interface do simulado em andamento
  const questaoAtualObj = simuladoAtivo.questoes[questaoAtual];
  const respostaAtual = respostas[questaoAtualObj.id];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '6rem'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header do Simulado */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.25rem' }}>
              {simuladoAtivo.titulo}
            </h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
              <span>Questão {questaoAtual + 1} de {simuladoAtivo.totalQuestoes}</span>
              <span>•</span>
              <span>{simuladoAtivo.banca} {simuladoAtivo.ano}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Cronômetro */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: tempoRestante < 300 ? '#fee2e2' : '#f0f9ff',
              color: tempoRestante < 300 ? '#dc2626' : '#0369a1',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              <Timer size={20} />
              {formatarTempo(tempoRestante)}
            </div>

            {/* Controles */}
            <button
              onClick={() => setPausado(!pausado)}
              style={{
                background: pausado ? '#10b981' : '#f59e0b',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              {pausado ? <Play size={20} /> : <Pause size={20} />}
            </button>

            <button
              onClick={finalizarSimulado}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              Finalizar
            </button>
          </div>
        </div>

        {/* Questão Atual */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              background: '#3b82f6',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              {questaoAtual + 1}
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1.25rem' }}>
                Questão {questaoAtual + 1}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem'
                }}>
                  {questaoAtualObj.area}
                </span>
                <span style={{
                  background: questaoAtualObj.dificuldade === 'facil' ? '#dcfce7' :
                             questaoAtualObj.dificuldade === 'media' ? '#fef3c7' : '#fee2e2',
                  color: questaoAtualObj.dificuldade === 'facil' ? '#166534' :
                         questaoAtualObj.dificuldade === 'media' ? '#92400e' : '#991b1b',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem'
                }}>
                  {questaoAtualObj.dificuldade === 'facil' ? 'Fácil' :
                   questaoAtualObj.dificuldade === 'media' ? 'Médio' : 'Difícil'}
                </span>
              </div>
            </div>
          </div>

          <p style={{
            color: '#374151',
            lineHeight: 1.6,
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            {questaoAtualObj.enunciado}
          </p>

          {/* Alternativas */}
          <div style={{ marginBottom: '2rem' }}>
            {questaoAtualObj.alternativas.map((alternativa) => (
              <button
                key={alternativa.id}
                onClick={() => selecionarResposta(questaoAtualObj.id, alternativa.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  borderRadius: '0.75rem',
                  border: '2px solid',
                  borderColor: respostaAtual === alternativa.id ? '#3b82f6' : '#e5e7eb',
                  background: respostaAtual === alternativa.id ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (respostaAtual !== alternativa.id) {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.background = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (respostaAtual !== alternativa.id) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#ffffff';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: respostaAtual === alternativa.id ? '#3b82f6' : '#f3f4f6',
                    color: respostaAtual === alternativa.id ? 'white' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {alternativa.id.toUpperCase()}
                  </div>
                  <span style={{
                    color: '#374151',
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}>
                    {alternativa.texto}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={questaoAnterior}
            disabled={questaoAtual === 0}
            style={{
              background: questaoAtual === 0 ? '#f3f4f6' : '#6b7280',
              color: questaoAtual === 0 ? '#9ca3af' : 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: questaoAtual === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={16} />
            Anterior
          </button>

          {/* Indicador de progresso */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {simuladoAtivo.questoes.map((_, index) => (
              <button
                key={index}
                onClick={() => setQuestaoAtual(index)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === questaoAtual ? '#3b82f6' :
                             respostas[simuladoAtivo.questoes[index].id] ? '#10b981' : '#e5e7eb',
                  color: index === questaoAtual || respostas[simuladoAtivo.questoes[index].id] ? 'white' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={proximaQuestao}
            disabled={questaoAtual === simuladoAtivo.questoes.length - 1}
            style={{
              background: questaoAtual === simuladoAtivo.questoes.length - 1 ? '#f3f4f6' : '#6b7280',
              color: questaoAtual === simuladoAtivo.questoes.length - 1 ? '#9ca3af' : 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: questaoAtual === simuladoAtivo.questoes.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            Próxima
            <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulados;
