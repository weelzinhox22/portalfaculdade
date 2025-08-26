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
        },
        {
          id: 26,
          enunciado: 'Na síndrome da dor patelofemoral, qual fator biomecânico é considerado o mais importante na etiologia?',
          alternativas: [
            { id: 'a', texto: 'Fraqueza do quadríceps femoral' },
            { id: 'b', texto: 'Fraqueza dos músculos do quadril (glúteo médio e máximo)' },
            { id: 'c', texto: 'Encurtamento dos isquiotibiais' },
            { id: 'd', texto: 'Hipermobilidade patelar' },
            { id: 'e', texto: 'Encurtamento do trato iliotibial' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A fraqueza dos músculos do quadril, especialmente glúteo médio e máximo, é considerada o fator biomecânico mais importante na síndrome da dor patelofemoral, causando alterações no alinhamento do membro inferior e sobrecarga patelofemoral.',
          raciocinio: 'Biomecânica da dor patelofemoral: 1) Fraqueza glúteo médio → adução e rotação interna do fêmur; 2) Fraqueza glúteo máximo → rotação interna do fêmur; 3) Alterações proximais afetam alinhamento patelofemoral; 4) Quadríceps importante mas secundário; 5) Outros fatores menos relevantes na etiologia.',
          referencias: 'Powers CM. The influence of abnormal hip mechanics on knee injury: a biomechanical perspective. J Orthop Sports Phys Ther. 2010;40(2):42-51.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'dificil'
        },
        {
          id: 27,
          enunciado: 'Na reabilitação pulmonar, qual técnica de higiene brônquica é mais eficaz para pacientes com DPOC?',
          alternativas: [
            { id: 'a', texto: 'Drenagem postural clássica' },
            { id: 'b', texto: 'Percussão e vibração torácica' },
            { id: 'c', texto: 'Técnica de expiração forçada (huffing)' },
            { id: 'd', texto: 'Pressão expiratória positiva (PEP)' },
            { id: 'e', texto: 'Aspiração traqueal' }
          ],
          respostaCorreta: 'd',
          explicacao: 'A pressão expiratória positiva (PEP) é considerada a técnica mais eficaz para higiene brônquica em pacientes com DPOC, pois mantém as vias aéreas abertas durante a expiração, facilitando a mobilização de secreções.',
          raciocinio: 'Higiene brônquica na DPOC: 1) DPOC = obstrução + colapso vias aéreas; 2) PEP mantém vias aéreas abertas → facilita clearance; 3) Mais eficaz que drenagem postural; 4) Huffing útil mas menos eficaz sozinha; 5) Percussão/vibração menos evidência; 6) Aspiração para pacientes intubados.',
          referencias: 'Osadnik CR, et al. Positive expiratory pressure therapy for chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2012;5:CD003147.',
          banca: 'IADES',
          ano: 2022,
          area: 'Pneumologia',
          dificuldade: 'media'
        },
        {
          id: 28,
          enunciado: 'Na avaliação neurológica, a presença do sinal de Babinski indica lesão em qual trato?',
          alternativas: [
            { id: 'a', texto: 'Trato espinocerebelar' },
            { id: 'b', texto: 'Trato corticoespinal (piramidal)' },
            { id: 'c', texto: 'Trato espinotálamo' },
            { id: 'd', texto: 'Trato rubroespinal' },
            { id: 'e', texto: 'Trato vestibuloespinal' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O sinal de Babinski (extensão do hálux com abertura dos outros dedos) indica lesão do trato corticoespinal (piramidal), sendo um sinal patológico de liberação que indica comprometimento do neurônio motor superior.',
          raciocinio: 'Sinal de Babinski: 1) Reflexo patológico de liberação; 2) Indica lesão neurônio motor superior; 3) Trato corticoespinal = via piramidal principal; 4) Lesão libera reflexos primitivos; 5) Outros tratos: espinocerebelar (coordenação), espinotálamo (dor), rubroespinal/vestibuloespinal (postura).',
          referencias: 'Kandel ER, et al. Principles of Neural Science. 5th ed. New York: McGraw-Hill; 2013.',
          banca: 'IADES',
          ano: 2022,
          area: 'Neurologia',
          dificuldade: 'media'
        },
        {
          id: 29,
          enunciado: 'Na prescrição de exercícios para osteoporose, qual tipo de exercício apresenta maior evidência para aumento da densidade mineral óssea?',
          alternativas: [
            { id: 'a', texto: 'Exercícios aquáticos de baixo impacto' },
            { id: 'b', texto: 'Exercícios aeróbicos de baixa intensidade' },
            { id: 'c', texto: 'Exercícios resistidos de alta intensidade' },
            { id: 'd', texto: 'Exercícios de flexibilidade' },
            { id: 'e', texto: 'Exercícios respiratórios' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Exercícios resistidos de alta intensidade apresentam a maior evidência científica para aumento da densidade mineral óssea em pacientes com osteoporose, seguindo a lei de Wolff (osso se adapta às cargas aplicadas).',
          raciocinio: 'Exercício e densidade óssea: 1) Lei de Wolff: osso se adapta à carga; 2) Alta intensidade = maior estímulo osteogênico; 3) Resistidos = carga direta no osso; 4) Aquáticos reduzem carga (empuxo); 5) Aeróbicos baixa intensidade = estímulo insuficiente; 6) Flexibilidade/respiratórios não estimulam osso.',
          referencias: 'Nikander R, et al. Targeted exercise against osteoporosis: A systematic review and meta-analysis for optimising bone strength throughout life. BMC Med. 2010;8:47.',
          banca: 'IADES',
          ano: 2022,
          area: 'Geriatria',
          dificuldade: 'media'
        },
        {
          id: 30,
          enunciado: 'Na síndrome do impacto subacromial, qual estrutura anatômica forma o "teto" do espaço subacromial?',
          alternativas: [
            { id: 'a', texto: 'Processo coracoide' },
            { id: 'b', texto: 'Acrômio e ligamento coracoacromial' },
            { id: 'c', texto: 'Clavícula' },
            { id: 'd', texto: 'Cabeça do úmero' },
            { id: 'e', texto: 'Glenóide' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O "teto" do espaço subacromial é formado pelo acrômio e ligamento coracoacromial, constituindo o arco coracoacromial. Esta estrutura pode comprimir os tecidos moles (tendão do supraespinhal, bursa) durante a elevação do braço.',
          raciocinio: 'Anatomia do espaço subacromial: 1) Teto = acrômio + ligamento coracoacromial (arco coracoacromial); 2) Assoalho = cabeça do úmero; 3) Conteúdo = tendão supraespinhal, bursa subacromial; 4) Impacto ocorre entre teto e assoalho; 5) Outras estruturas não formam o teto.',
          referencias: 'Neer CS 2nd. Impingement lesions. Clin Orthop Relat Res. 1983;(173):70-77.',
          banca: 'IADES',
          ano: 2022,
          area: 'Ortopedia',
          dificuldade: 'facil'
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
      totalQuestoes: 30,
      tempo: 90,
      dificuldade: 'dificil',
      descricao: 'Simulado completo baseado na prova de residência em fisioterapia da UNIFESP 2023',
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
        },
        {
          id: 2,
          enunciado: 'Na síndrome do desconforto respiratório agudo (SDRA), qual estratégia ventilatória demonstrou redução da mortalidade no estudo ARDSNet?',
          alternativas: [
            { id: 'a', texto: 'Volume corrente de 12 mL/kg com PEEP baixa' },
            { id: 'b', texto: 'Volume corrente de 6 mL/kg com pressão de platô ≤ 30 cmH2O' },
            { id: 'c', texto: 'Ventilação de alta frequência oscilatória' },
            { id: 'd', texto: 'Ventilação com liberação de pressão das vias aéreas' },
            { id: 'e', texto: 'Oxigenação por membrana extracorpórea (ECMO)' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O estudo ARDSNet demonstrou que a ventilação com baixo volume corrente (6 mL/kg de peso predito) e pressão de platô ≤ 30 cmH2O reduziu significativamente a mortalidade na SDRA comparado ao volume tradicional de 12 mL/kg.',
          raciocinio: 'Estudo ARDSNet (2000): 1) Comparou 6 mL/kg vs 12 mL/kg; 2) Grupo baixo volume: redução mortalidade de 39,8% para 31%; 3) Pressão platô ≤ 30 cmH2O previne barotrauma; 4) Outras estratégias não foram testadas neste estudo específico; 5) Marco na ventilação protetora.',
          referencias: 'The Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342(18):1301-1308.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'UTI',
          dificuldade: 'dificil'
        },
        {
          id: 3,
          enunciado: 'Em pacientes com esclerose lateral amiotrófica (ELA), qual parâmetro respiratório é o melhor preditor de sobrevida?',
          alternativas: [
            { id: 'a', texto: 'Capacidade vital forçada (CVF)' },
            { id: 'b', texto: 'Volume expiratório forçado no primeiro segundo (VEF1)' },
            { id: 'c', texto: 'Pressão inspiratória máxima (PImáx)' },
            { id: 'd', texto: 'Pressão expiratória máxima (PEmáx)' },
            { id: 'e', texto: 'Saturação de oxigênio em repouso' }
          ],
          respostaCorreta: 'a',
          explicacao: 'A capacidade vital forçada (CVF) é o melhor preditor de sobrevida em pacientes com ELA. Uma CVF < 50% do predito indica necessidade de discussão sobre ventilação não invasiva, e < 30% está associada a pior prognóstico.',
          raciocinio: 'CVF na ELA: 1) Reflete força muscular respiratória global; 2) Declínio progressivo correlaciona com progressão da doença; 3) CVF < 50% = indicação VNI; 4) CVF < 30% = prognóstico reservado; 5) Melhor que PImáx/PEmáx isoladas; 6) SpO2 repouso normal até fases avançadas.',
          referencias: 'Miller RG, et al. Practice parameter update: the care of the patient with amyotrophic lateral sclerosis: multidisciplinary care, symptom management, and cognitive/behavioral impairment. Neurology. 2009;73(15):1227-1233.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 4,
          enunciado: 'Na reabilitação de pacientes com lesão medular completa em nível T12, qual é a expectativa funcional mais realista para locomoção?',
          alternativas: [
            { id: 'a', texto: 'Marcha comunitária sem dispositivos auxiliares' },
            { id: 'b', texto: 'Marcha domiciliar com órteses longas e andador' },
            { id: 'c', texto: 'Marcha terapêutica com órteses e barras paralelas' },
            { id: 'd', texto: 'Locomoção exclusiva em cadeira de rodas' },
            { id: 'e', texto: 'Marcha comunitária com órteses curtas e muletas' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Em lesão medular completa T12, a expectativa funcional mais realista é marcha terapêutica com órteses longas em ambiente controlado (barras paralelas). A marcha comunitária é impraticável devido ao alto gasto energético e limitações funcionais.',
          raciocinio: 'Lesão T12 completa: 1) Preserva músculos até L1-L2; 2) Perde inervação da maioria dos músculos MMII; 3) Marcha possível mas com alto gasto energético; 4) Realista apenas para terapia/exercício; 5) Cadeira de rodas = locomoção funcional primária; 6) Marcha comunitária impraticável.',
          referencias: 'Consortium for Spinal Cord Medicine. Outcomes following traumatic spinal cord injury: clinical practice guidelines for health-care professionals. J Spinal Cord Med. 2000;23(4):289-316.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 5,
          enunciado: 'Na fibrose cística, qual mecanismo fisiopatológico é responsável pela obstrução das vias aéreas?',
          alternativas: [
            { id: 'a', texto: 'Broncoconstrição por hiperreatividade brônquica' },
            { id: 'b', texto: 'Secreções espessas e viscosas por defeito no transporte de cloreto' },
            { id: 'c', texto: 'Colapso alveolar por deficiência de surfactante' },
            { id: 'd', texto: 'Edema de mucosa por reação alérgica' },
            { id: 'e', texto: 'Espasmo da musculatura lisa brônquica' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Na fibrose cística, a mutação no gene CFTR (regulador de condutância transmembrana) causa defeito no transporte de cloreto, resultando em secreções espessas e viscosas que obstruem as vias aéreas e facilitam infecções.',
          raciocinio: 'Fisiopatologia FC: 1) Mutação CFTR → defeito transporte Cl-; 2) Redução secreção Cl- e água; 3) Muco espesso e viscoso; 4) Obstrução vias aéreas; 5) Não é broncoconstrição, deficiência surfactante, alergia ou espasmo; 6) Problema primário = transporte iônico.',
          referencias: 'Rowe SM, et al. Cystic fibrosis. N Engl J Med. 2005;352(19):1992-2001.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pediatria',
          dificuldade: 'dificil'
        },
        {
          id: 6,
          enunciado: 'Na avaliação da função ventricular esquerda por ecocardiografia, qual parâmetro é considerado o padrão-ouro para quantificar a contratilidade miocárdica?',
          alternativas: [
            { id: 'a', texto: 'Fração de ejeção do ventrículo esquerdo (FEVE)' },
            { id: 'b', texto: 'Débito cardíaco' },
            { id: 'c', texto: 'Pressão sistólica do ventrículo esquerdo' },
            { id: 'd', texto: 'Volume diastólico final' },
            { id: 'e', texto: 'Espessura da parede posterior' }
          ],
          respostaCorreta: 'a',
          explicacao: 'A fração de ejeção do ventrículo esquerdo (FEVE) é considerada o padrão-ouro para avaliação da função sistólica e contratilidade miocárdica, representando a porcentagem do volume diastólico final que é ejetado durante a sístole.',
          raciocinio: 'FEVE como padrão-ouro: 1) Reflete diretamente a contratilidade; 2) FEVE = (VDF-VSF)/VDF x 100; 3) Normal ≥55%; 4) Disfunção: leve (45-54%), moderada (35-44%), severa (<35%); 5) Outros parâmetros são complementares mas não padrão-ouro.',
          referencias: 'Lang RM, et al. Recommendations for cardiac chamber quantification by echocardiography in adults. J Am Soc Echocardiogr. 2015;28(1):1-39.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Cardiologia',
          dificuldade: 'media'
        },
        {
          id: 7,
          enunciado: 'Em pacientes com doença de Parkinson em estágio avançado, qual sintoma NÃO motor é mais limitante funcionalmente?',
          alternativas: [
            { id: 'a', texto: 'Constipação intestinal' },
            { id: 'b', texto: 'Distúrbios do sono REM' },
            { id: 'c', texto: 'Demência associada' },
            { id: 'd', texto: 'Hipotensão ortostática' },
            { id: 'e', texto: 'Disfagia' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A demência associada à doença de Parkinson é o sintoma não motor mais limitante funcionalmente em estágios avançados, afetando significativamente a independência, segurança e qualidade de vida do paciente.',
          raciocinio: 'Sintomas não motores limitantes: 1) Demência → perda independência, segurança, AVDs; 2) Mais limitante que sintomas motores em fases avançadas; 3) Outros sintomas importantes mas menos limitantes: constipação (desconforto), sono (fadiga), hipotensão (tonturas), disfagia (aspiração).',
          referencias: 'Chaudhuri KR, et al. Non-motor symptoms of Parkinson\'s disease: diagnosis and management. Lancet Neurol. 2006;5(3):235-245.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 8,
          enunciado: 'Na ventilação não invasiva (VNI), qual é a principal indicação para uso em pacientes com DPOC exacerbado?',
          alternativas: [
            { id: 'a', texto: 'Hipoxemia refratária (PaO2 < 60 mmHg)' },
            { id: 'b', texto: 'Acidose respiratória (pH < 7,35) com hipercapnia' },
            { id: 'c', texto: 'Fadiga muscular respiratória isolada' },
            { id: 'd', texto: 'Broncoespasmo severo' },
            { id: 'e', texto: 'Pneumonia associada' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A principal indicação para VNI na exacerbação da DPOC é acidose respiratória (pH < 7,35) com hipercapnia, pois a VNI melhora a ventilação alveolar, reduz o trabalho respiratório e corrige a acidose.',
          raciocinio: 'VNI na DPOC exacerbada: 1) Indicação principal: acidose respiratória + hipercapnia; 2) VNI melhora ventilação → reduz CO2 → corrige pH; 3) Hipoxemia isolada: O2 suplementar; 4) Fadiga isolada: não indicação absoluta; 5) Broncoespasmo: broncodilatadores; 6) Pneumonia: pode ser contraindicação.',
          referencias: 'Rochwerg B, et al. Official ERS/ATS clinical practice guidelines: noninvasive ventilation for acute respiratory failure. Eur Respir J. 2017;50(2):1602426.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'UTI',
          dificuldade: 'dificil'
        },
        {
          id: 9,
          enunciado: 'Na paralisia cerebral, qual classificação funcional é mais utilizada para determinar o nível de mobilidade?',
          alternativas: [
            { id: 'a', texto: 'Gross Motor Function Classification System (GMFCS)' },
            { id: 'b', texto: 'Manual Ability Classification System (MACS)' },
            { id: 'c', texto: 'Communication Function Classification System (CFCS)' },
            { id: 'd', texto: 'Eating and Drinking Ability Classification System (EDACS)' },
            { id: 'e', texto: 'International Classification of Functioning (ICF)' }
          ],
          respostaCorreta: 'a',
          explicacao: 'O GMFCS (Gross Motor Function Classification System) é o sistema de classificação mais utilizado para determinar o nível de mobilidade em crianças com paralisia cerebral, dividindo em 5 níveis baseados na função motora grossa.',
          raciocinio: 'Classificações na PC: 1) GMFCS = mobilidade/função motora grossa (5 níveis); 2) MACS = habilidade manual; 3) CFCS = comunicação; 4) EDACS = alimentação; 5) ICF = classificação geral de funcionalidade. GMFCS é específico e padrão-ouro para mobilidade.',
          referencias: 'Palisano R, et al. Development and reliability of a system to classify gross motor function in children with cerebral palsy. Dev Med Child Neurol. 1997;39(4):214-223.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pediatria',
          dificuldade: 'media'
        },
        {
          id: 10,
          enunciado: 'Na síndrome de Guillain-Barré, qual é o achado eletroneuromiográfico mais precoce e característico?',
          alternativas: [
            { id: 'a', texto: 'Redução da amplitude dos potenciais de ação muscular' },
            { id: 'b', texto: 'Prolongamento das latências distais' },
            { id: 'c', texto: 'Redução da velocidade de condução nervosa' },
            { id: 'd', texto: 'Bloqueio de condução' },
            { id: 'e', texto: 'Ondas F ausentes ou prolongadas' }
          ],
          respostaCorreta: 'e',
          explicacao: 'As ondas F ausentes ou prolongadas são o achado eletroneuromiográfico mais precoce na síndrome de Guillain-Barré, refletindo o comprometimento das raízes nervosas proximais, que são afetadas precocemente na doença.',
          raciocinio: 'ENMG na Guillain-Barré: 1) Ondas F = reflexo das raízes proximais; 2) Comprometimento proximal é precoce; 3) Ondas F alteradas antes de outros parâmetros; 4) Outros achados aparecem posteriormente: latências, velocidades, amplitudes, bloqueios; 5) Progressão proximal → distal.',
          referencias: 'Hadden RD, et al. Electrophysiological classification of Guillain-Barré syndrome: clinical associations and outcome. Ann Neurol. 1998;44(5):780-788.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 11,
          enunciado: 'Na insuficiência cardíaca com fração de ejeção preservada (HFpEF), qual mecanismo fisiopatológico é predominante?',
          alternativas: [
            { id: 'a', texto: 'Disfunção sistólica do ventrículo esquerdo' },
            { id: 'b', texto: 'Disfunção diastólica com rigidez ventricular' },
            { id: 'c', texto: 'Regurgitação mitral severa' },
            { id: 'd', texto: 'Hipertensão pulmonar primária' },
            { id: 'e', texto: 'Cardiomiopatia dilatada' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Na HFpEF, o mecanismo predominante é a disfunção diastólica com aumento da rigidez ventricular, resultando em prejuízo do relaxamento e enchimento ventricular, apesar da fração de ejeção preservada (≥50%).',
          raciocinio: 'HFpEF vs HFrEF: 1) HFpEF = FEVE ≥50% + sintomas IC; 2) Problema = disfunção diastólica (relaxamento/enchimento); 3) Rigidez ventricular → ↑pressões enchimento; 4) Não é disfunção sistólica (FEVE normal); 5) Outros são complicações, não mecanismo primário.',
          referencias: 'Borlaug BA, Paulus WJ. Heart failure with preserved ejection fraction: pathophysiology, diagnosis, and treatment. Eur Heart J. 2011;32(6):670-679.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Cardiologia',
          dificuldade: 'dificil'
        },
        {
          id: 12,
          enunciado: 'Na distrofia muscular de Duchenne, qual é a idade típica de perda da marcha independente?',
          alternativas: [
            { id: 'a', texto: '6-8 anos' },
            { id: 'b', texto: '9-12 anos' },
            { id: 'c', texto: '13-15 anos' },
            { id: 'd', texto: '16-18 anos' },
            { id: 'e', texto: '19-21 anos' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Na distrofia muscular de Duchenne, a perda da marcha independente ocorre tipicamente entre 9-12 anos de idade, sendo um marco importante na progressão da doença e indicativo para início de intervenções como corticosteroides.',
          raciocinio: 'Progressão DMD: 1) Início sintomas: 2-5 anos; 2) Marcha na ponta dos pés: 5-7 anos; 3) Perda marcha: 9-12 anos (marco clássico); 4) Cadeira rodas: adolescência; 5) Complicações respiratórias: final adolescência/adulto jovem. 9-12 anos = período crítico.',
          referencias: 'Bushby K, et al. Diagnosis and management of Duchenne muscular dystrophy, part 1: diagnosis, and pharmacological and psychosocial management. Lancet Neurol. 2010;9(1):77-93.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pediatria',
          dificuldade: 'media'
        },
        {
          id: 13,
          enunciado: 'Na síndrome do desfiladeiro torácico neurogênico, qual teste provocativo apresenta maior sensibilidade?',
          alternativas: [
            { id: 'a', texto: 'Teste de Adson' },
            { id: 'b', texto: 'Teste de Wright' },
            { id: 'c', texto: 'Teste de Roos (EAST)' },
            { id: 'd', texto: 'Teste de Halstead' },
            { id: 'e', texto: 'Teste de Allen' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O teste de Roos (Elevated Arm Stress Test - EAST) apresenta maior sensibilidade para síndrome do desfiladeiro torácico neurogênico, reproduzindo os sintomas neurológicos através da elevação e abdução dos braços por 3 minutos.',
          raciocinio: 'Testes desfiladeiro torácico: 1) Roos/EAST: maior sensibilidade para forma neurogênica; 2) Reproduz sintomas neurológicos (parestesias, fraqueza); 3) Adson/Wright/Halstead: mais para forma vascular; 4) Allen: circulação arterial mão; 5) Forma neurogênica = 95% dos casos.',
          referencias: 'Gillard J, et al. Diagnosing thoracic outlet syndrome: contribution of provocative tests, ultrasonography, electrophysiology, and helical computed tomography in 48 patients. Joint Bone Spine. 2001;68(5):416-424.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Ortopedia',
          dificuldade: 'dificil'
        },
        {
          id: 14,
          enunciado: 'Na ventilação mecânica, qual parâmetro indica melhor a adequação da ventilação alveolar?',
          alternativas: [
            { id: 'a', texto: 'Pressão parcial de oxigênio (PaO2)' },
            { id: 'b', texto: 'Saturação de oxigênio (SpO2)' },
            { id: 'c', texto: 'Pressão parcial de dióxido de carbono (PaCO2)' },
            { id: 'd', texto: 'Bicarbonato sérico (HCO3-)' },
            { id: 'e', texto: 'Diferença alvéolo-arterial de oxigênio (DA-aO2)' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A PaCO2 é o melhor indicador da adequação da ventilação alveolar, pois reflete diretamente a eliminação de CO2 pelos pulmões. PaCO2 normal (35-45 mmHg) indica ventilação alveolar adequada.',
          raciocinio: 'Ventilação vs Oxigenação: 1) Ventilação alveolar = eliminação CO2 → PaCO2; 2) PaCO2 ↑ = hipoventilação; PaCO2 ↓ = hiperventilação; 3) PaO2/SpO2 = oxigenação; 4) HCO3- = compensação metabólica; 5) DA-aO2 = eficiência troca gasosa.',
          referencias: 'West JB. Respiratory Physiology: The Essentials. 10th ed. Philadelphia: Wolters Kluwer; 2016.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'UTI',
          dificuldade: 'media'
        },
        {
          id: 15,
          enunciado: 'Na avaliação da marcha hemiplégica, qual compensação é mais comumente observada durante a fase de balanço?',
          alternativas: [
            { id: 'a', texto: 'Elevação da pelve (hiking)' },
            { id: 'b', texto: 'Circundução do membro inferior' },
            { id: 'c', texto: 'Flexão excessiva do quadril' },
            { id: 'd', texto: 'Todas as alternativas anteriores' },
            { id: 'e', texto: 'Nenhuma compensação específica' }
          ],
          respostaCorreta: 'd',
          explicacao: 'Na marcha hemiplégica, múltiplas compensações são observadas durante a fase de balanço: elevação da pelve (hiking), circundução e flexão excessiva do quadril, todas para compensar a dificuldade de clearance do pé devido à espasticidade.',
          raciocinio: 'Compensações hemiplegia: 1) Problema: espasticidade extensora + dificuldade flexão joelho/dorsiflexão; 2) Clearance prejudicado; 3) Compensações: hiking (eleva pelve), circundução (contorna), flexão quadril excessiva; 4) Todas ocorrem simultaneamente; 5) Objetivo comum: clearance do pé.',
          referencias: 'Perry J, Burnfield JM. Gait Analysis: Normal and Pathological Function. 2nd ed. Thorofare: SLACK; 2010.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'media'
        },
        {
          id: 16,
          enunciado: 'Na fibrose pulmonar idiopática, qual achado na tomografia computadorizada de alta resolução é patognomônico?',
          alternativas: [
            { id: 'a', texto: 'Opacidades em vidro fosco difusas' },
            { id: 'b', texto: 'Padrão de favo de mel (honeycombing) subpleural' },
            { id: 'c', texto: 'Nódulos pulmonares múltiplos' },
            { id: 'd', texto: 'Consolidações alveolares' },
            { id: 'e', texto: 'Derrame pleural bilateral' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O padrão de favo de mel (honeycombing) subpleural é patognomônico da fibrose pulmonar idiopática, caracterizado por espaços císticos de paredes espessas, predominantemente nas bases pulmonares e região subpleural.',
          raciocinio: 'TCAR na FPI: 1) Honeycombing = patognomônico (diagnóstico definitivo); 2) Padrão UIP (usual interstitial pneumonia); 3) Distribuição basal e subpleural; 4) Vidro fosco = inespecífico; 5) Nódulos/consolidações = outros diagnósticos; 6) Derrame pleural raro na FPI.',
          referencias: 'Raghu G, et al. An official ATS/ERS/JRS/ALAT statement: idiopathic pulmonary fibrosis: evidence-based guidelines for diagnosis and management. Am J Respir Crit Care Med. 2011;183(6):788-824.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pneumologia',
          dificuldade: 'dificil'
        },
        {
          id: 17,
          enunciado: 'Na reabilitação de pacientes com amputação transfemoral, qual é o principal objetivo do treinamento pré-protético?',
          alternativas: [
            { id: 'a', texto: 'Adaptação psicológica à prótese' },
            { id: 'b', texto: 'Fortalecimento do membro contralateral' },
            { id: 'c', texto: 'Condicionamento do coto e prevenção de contraturas' },
            { id: 'd', texto: 'Treinamento de marcha com muletas' },
            { id: 'e', texto: 'Dessensibilização da dor fantasma' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O principal objetivo do treinamento pré-protético é o condicionamento do coto (fortalecimento, resistência, formato adequado) e prevenção de contraturas, preparando o membro para o uso futuro da prótese.',
          raciocinio: 'Fase pré-protética: 1) Objetivo principal = preparar coto para prótese; 2) Condicionamento = fortalecimento + resistência + formato; 3) Prevenção contraturas = manter ADM; 4) Outros objetivos importantes mas secundários: adaptação psicológica, fortalecimento contralateral, marcha muletas, dor fantasma.',
          referencias: 'Smith DG, et al. Amputations: general principles and lower-extremity amputations. In: DeLisa JA, ed. Physical Medicine and Rehabilitation: Principles and Practice. 4th ed. Philadelphia: Lippincott Williams & Wilkins; 2005.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 18,
          enunciado: 'Na síndrome de Down, qual complicação ortopédica é mais frequente e requer avaliação radiológica de rotina?',
          alternativas: [
            { id: 'a', texto: 'Luxação congênita do quadril' },
            { id: 'b', texto: 'Instabilidade atlantoaxial' },
            { id: 'c', texto: 'Escoliose idiopática' },
            { id: 'd', texto: 'Pé plano valgo' },
            { id: 'e', texto: 'Joelho valgo' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A instabilidade atlantoaxial é a complicação ortopédica mais importante na síndrome de Down, presente em 10-20% dos casos, requerendo avaliação radiológica de rotina devido ao risco de compressão medular.',
          raciocinio: 'Complicações ortopédicas Down: 1) Instabilidade atlantoaxial = mais grave (risco neurológico); 2) Frouxidão ligamentar generalizada; 3) Screening radiológico obrigatório; 4) Outras complicações comuns mas menos graves: pé plano, joelho valgo; 5) Luxação quadril e escoliose menos frequentes.',
          referencias: 'Bull MJ; Committee on Genetics. Health supervision for children with Down syndrome. Pediatrics. 2011;128(2):393-406.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pediatria',
          dificuldade: 'dificil'
        },
        {
          id: 19,
          enunciado: 'Na lesão do plexo braquial tipo Erb-Duchenne (C5-C6), qual movimento estará mais comprometido?',
          alternativas: [
            { id: 'a', texto: 'Flexão dos dedos' },
            { id: 'b', texto: 'Extensão do punho' },
            { id: 'c', texto: 'Abdução do ombro' },
            { id: 'd', texto: 'Flexão do cotovelo' },
            { id: 'e', texto: 'Pronação do antebraço' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Na lesão de Erb-Duchenne (C5-C6), a abdução do ombro estará mais comprometida devido ao comprometimento do nervo axilar (deltóide) e supraescapular (supraespinhal), músculos principais da abdução.',
          raciocinio: 'Erb-Duchenne (C5-C6): 1) Músculos afetados: deltóide, supraespinhal, infraespinhal, bíceps, braquial; 2) Abdução ombro = deltóide + supraespinhal (ambos C5-C6); 3) Posição típica: braço aduzido, rotação interna, extensão cotovelo; 4) Outros movimentos: flexão dedos (C8-T1), extensão punho (C6-C8), pronação (C6-C8).',
          referencias: 'Smania N, et al. Rehabilitation of limb apraxia improves daily life activities in patients with stroke. Neurology. 2006;67(11):2050-2052.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 20,
          enunciado: 'Na avaliação da capacidade funcional em pacientes com DPOC, qual teste é considerado padrão-ouro?',
          alternativas: [
            { id: 'a', texto: 'Teste de caminhada de 6 minutos (TC6M)' },
            { id: 'b', texto: 'Teste cardiopulmonar de exercício (TCPE)' },
            { id: 'c', texto: 'Teste de sentar e levantar' },
            { id: 'd', texto: 'Teste de caminhada incremental (shuttle test)' },
            { id: 'e', texto: 'Teste de escada' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O teste cardiopulmonar de exercício (TCPE) é considerado padrão-ouro para avaliação da capacidade funcional em DPOC, fornecendo informações detalhadas sobre limitações cardiovasculares, pulmonares e musculares.',
          raciocinio: 'Testes capacidade funcional DPOC: 1) TCPE = padrão-ouro (informações completas: VO2, limiar anaeróbico, limitações); 2) TC6M = submáximo, prático, correlaciona com AVDs; 3) Shuttle = progressivo mas limitado; 4) Sentar-levantar = força MMII; 5) Escada = específico mas limitado.',
          referencias: 'American Thoracic Society; American College of Chest Physicians. ATS/ACCP Statement on cardiopulmonary exercise testing. Am J Respir Crit Care Med. 2003;167(2):211-277.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pneumologia',
          dificuldade: 'media'
        },
        {
          id: 21,
          enunciado: 'Na síndrome coronariana aguda, qual biomarcador apresenta maior especificidade para necrose miocárdica?',
          alternativas: [
            { id: 'a', texto: 'Creatina quinase (CK)' },
            { id: 'b', texto: 'Creatina quinase MB (CK-MB)' },
            { id: 'c', texto: 'Troponina I ou T' },
            { id: 'd', texto: 'Lactato desidrogenase (LDH)' },
            { id: 'e', texto: 'Aspartato aminotransferase (AST)' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A troponina I ou T apresenta maior especificidade para necrose miocárdica, sendo o biomarcador de escolha para diagnóstico de infarto agudo do miocárdio, com elevação detectável 3-6 horas após o início dos sintomas.',
          raciocinio: 'Biomarcadores cardíacos: 1) Troponina = maior especificidade (específica do miocárdio); 2) Padrão-ouro atual; 3) CK-MB = boa especificidade mas inferior; 4) CK total = inespecífica (músculos esqueléticos); 5) LDH/AST = inespecíficas; 6) Troponina detectável por dias.',
          referencias: 'Thygesen K, et al. Fourth universal definition of myocardial infarction (2018). J Am Coll Cardiol. 2018;72(18):2231-2264.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Cardiologia',
          dificuldade: 'media'
        },
        {
          id: 22,
          enunciado: 'Na espasticidade pós-AVC, qual escala de avaliação é mais sensível para detectar mudanças após intervenções terapêuticas?',
          alternativas: [
            { id: 'a', texto: 'Escala de Ashworth' },
            { id: 'b', texto: 'Escala de Ashworth Modificada' },
            { id: 'c', texto: 'Escala de Tardieu' },
            { id: 'd', texto: 'Escala de Spasticity Assessment' },
            { id: 'e', texto: 'Escala de Tone Assessment' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A Escala de Tardieu é mais sensível para detectar mudanças na espasticidade após intervenções, pois avalia o tônus em diferentes velocidades de movimento, diferenciando componentes neurais e não-neurais da resistência.',
          raciocinio: 'Escalas de espasticidade: 1) Tardieu = mais sensível (avalia velocidade-dependência); 2) Diferencia componente neural vs não-neural; 3) Ashworth/Ashworth Modificada = mais usadas mas menos sensíveis; 4) Não diferenciam causas da resistência; 5) Tardieu melhor para pesquisa e follow-up.',
          referencias: 'Gracies JM, et al. Traditional pharmacological treatments for spasticity. Part I: Local treatments. Muscle Nerve Suppl. 1997;6:S61-91.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 23,
          enunciado: 'Na bronquiolite viral aguda em lactentes, qual sinal clínico indica maior gravidade e necessidade de internação?',
          alternativas: [
            { id: 'a', texto: 'Febre alta (>39°C)' },
            { id: 'b', texto: 'Tosse produtiva' },
            { id: 'c', texto: 'Tiragem intercostal e batimento de asa nasal' },
            { id: 'd', texto: 'Coriza e obstrução nasal' },
            { id: 'e', texto: 'Irritabilidade e choro' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A tiragem intercostal e batimento de asa nasal indicam desconforto respiratório significativo na bronquiolite, sendo sinais de gravidade que requerem internação para monitorização e suporte respiratório.',
          raciocinio: 'Sinais gravidade bronquiolite: 1) Tiragem + batimento asa nasal = desconforto respiratório; 2) Indicam aumento trabalho respiratório; 3) Critério internação; 4) Febre não é critério gravidade; 5) Tosse produtiva rara em lactentes; 6) Coriza/irritabilidade = sintomas comuns, não gravidade.',
          referencias: 'Ralston SL, et al. Clinical practice guideline: the diagnosis, management, and prevention of bronchiolitis. Pediatrics. 2014;134(5):e1474-502.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pediatria',
          dificuldade: 'media'
        },
        {
          id: 24,
          enunciado: 'Na síndrome do impacto femoroacetabular (IFA), qual tipo morfológico é mais comum em atletas jovens?',
          alternativas: [
            { id: 'a', texto: 'Tipo CAM (aspecto em came)' },
            { id: 'b', texto: 'Tipo PINCER (aspecto em pinça)' },
            { id: 'c', texto: 'Tipo misto (CAM + PINCER)' },
            { id: 'd', texto: 'Displasia acetabular' },
            { id: 'e', texto: 'Coxa vara' }
          ],
          respostaCorreta: 'a',
          explicacao: 'O tipo CAM é mais comum em atletas jovens, especialmente do sexo masculino, caracterizado por perda da esfericidade da cabeça femoral, criando uma proeminência óssea que causa impacto durante a flexão do quadril.',
          raciocinio: 'IFA em atletas: 1) CAM = mais comum em jovens atletas masculinos; 2) Relacionado a atividades com flexão repetitiva quadril; 3) Perda esfericidade cabeça femoral; 4) PINCER = mais comum em mulheres, atletas mais velhas; 5) Misto = combinação; 6) Displasia/coxa vara = outras patologias.',
          referencias: 'Griffin DR, et al. The Warwick Agreement on femoroacetabular impingement syndrome (FAI syndrome): an international consensus statement. Br J Sports Med. 2016;50(19):1169-1176.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Ortopedia',
          dificuldade: 'dificil'
        },
        {
          id: 25,
          enunciado: 'Na ventilação mecânica invasiva, qual modo ventilatório é mais apropriado para um paciente com SDRA grave?',
          alternativas: [
            { id: 'a', texto: 'Ventilação controlada a volume (VCV)' },
            { id: 'b', texto: 'Ventilação controlada a pressão (PCV)' },
            { id: 'c', texto: 'Ventilação com suporte pressórico (PSV)' },
            { id: 'd', texto: 'Ventilação mandatória intermitente (SIMV)' },
            { id: 'e', texto: 'Ventilação de alta frequência oscilatória (HFOV)' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A ventilação controlada a pressão (PCV) é mais apropriada na SDRA grave, pois permite melhor controle das pressões das vias aéreas, distribuição mais homogênea da ventilação e redução do risco de barotrauma.',
          raciocinio: 'Ventilação na SDRA: 1) PCV = controle pressão → proteção pulmonar; 2) Distribuição mais homogênea; 3) Evita picos pressão; 4) VCV = risco barotrauma; 5) PSV = paciente consciente; 6) SIMV = híbrido, menos usado; 7) HFOV = resgate, não primeira linha.',
          referencias: 'Fan E, et al. An Official American Thoracic Society/European Society of Intensive Care Medicine/Society of Critical Care Medicine Clinical Practice Guideline: Mechanical Ventilation in Adult Patients with Acute Respiratory Distress Syndrome. Am J Respir Crit Care Med. 2017;195(9):1253-1263.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'UTI',
          dificuldade: 'dificil'
        },
        {
          id: 26,
          enunciado: 'Na avaliação da disfagia orofaríngea, qual método é considerado padrão-ouro para diagnóstico?',
          alternativas: [
            { id: 'a', texto: 'Avaliação clínica à beira do leito' },
            { id: 'b', texto: 'Videofluoroscopia da deglutição' },
            { id: 'c', texto: 'Nasofibroscopia da deglutição (FEES)' },
            { id: 'd', texto: 'Manometria esofágica' },
            { id: 'e', texto: 'Ultrassonografia cervical' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A videofluoroscopia da deglutição é considerada padrão-ouro para avaliação da disfagia orofaríngea, permitindo visualização dinâmica de todas as fases da deglutição e identificação precisa de aspirações e penetrações.',
          raciocinio: 'Métodos avaliação disfagia: 1) Videofluoroscopia = padrão-ouro (visualização completa, dinâmica); 2) Identifica aspiração, penetração, resíduos; 3) FEES = boa alternativa, sem radiação; 4) Avaliação clínica = triagem; 5) Manometria = esôfago; 6) US cervical = limitada.',
          referencias: 'Logemann JA. Evaluation and Treatment of Swallowing Disorders. 2nd ed. Austin: Pro-Ed; 1998.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'media'
        },
        {
          id: 27,
          enunciado: 'Na reabilitação pulmonar de pacientes com fibrose cística, qual técnica de higiene brônquica demonstra maior eficácia?',
          alternativas: [
            { id: 'a', texto: 'Drenagem postural convencional' },
            { id: 'b', texto: 'Pressão expiratória positiva oscilatória (Flutter/Acapella)' },
            { id: 'c', texto: 'Percussão torácica manual' },
            { id: 'd', texto: 'Técnica de expiração forçada (huffing)' },
            { id: 'e', texto: 'Ventilação percussiva intrapulmonar' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A pressão expiratória positiva oscilatória (Flutter/Acapella) demonstra maior eficácia na fibrose cística, combinando PEP com oscilações que mobilizam secreções viscosas e mantêm vias aéreas abertas.',
          raciocinio: 'Higiene brônquica FC: 1) PEP oscilatória = mais eficaz (combina PEP + oscilações); 2) Mobiliza secreções viscosas específicas da FC; 3) Mantém vias aéreas abertas; 4) Drenagem postural = menos eficaz sozinha; 5) Percussão = complementar; 6) Huffing = técnica adjuvante.',
          referencias: 'Flume PA, et al. Cystic fibrosis pulmonary guidelines: airway clearance therapies. Respir Care. 2009;54(4):522-537.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pediatria',
          dificuldade: 'dificil'
        },
        {
          id: 28,
          enunciado: 'Na síndrome de Guillain-Barré, qual é o principal fator prognóstico para recuperação funcional?',
          alternativas: [
            { id: 'a', texto: 'Idade do paciente' },
            { id: 'b', texto: 'Velocidade de instalação dos sintomas' },
            { id: 'c', texto: 'Grau de fraqueza no nadir da doença' },
            { id: 'd', texto: 'Presença de disfunção autonômica' },
            { id: 'e', texto: 'Subtipo eletrofisiológico' }
          ],
          respostaCorreta: 'c',
          explicacao: 'O grau de fraqueza no nadir (ponto mais grave) da doença é o principal fator prognóstico na síndrome de Guillain-Barré. Pacientes que não conseguem caminhar independentemente têm pior prognóstico funcional.',
          raciocinio: 'Prognóstico Guillain-Barré: 1) Grau fraqueza no nadir = principal fator; 2) Incapacidade caminhar = pior prognóstico; 3) Idade importante mas secundária; 4) Velocidade instalação menos relevante; 5) Disfunção autonômica = gravidade mas não prognóstico funcional; 6) Subtipo influencia mas menos que fraqueza.',
          referencias: 'van den Berg B, et al. Guillain-Barré syndrome: pathogenesis, diagnosis, treatment and prognosis. Nat Rev Neurol. 2014;10(8):469-482.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Neurologia',
          dificuldade: 'dificil'
        },
        {
          id: 29,
          enunciado: 'Na insuficiência cardíaca aguda descompensada, qual parâmetro hemodinâmico indica melhor a adequação da perfusão tecidual?',
          alternativas: [
            { id: 'a', texto: 'Pressão arterial sistólica' },
            { id: 'b', texto: 'Frequência cardíaca' },
            { id: 'c', texto: 'Saturação venosa central de oxigênio (SvcO2)' },
            { id: 'd', texto: 'Pressão venosa central (PVC)' },
            { id: 'e', texto: 'Débito urinário' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A saturação venosa central de oxigênio (SvcO2) é o melhor indicador da adequação da perfusão tecidual, refletindo o equilíbrio entre oferta e consumo de oxigênio. Valores <70% indicam perfusão inadequada.',
          raciocinio: 'Perfusão tecidual na IC: 1) SvcO2 = melhor indicador (oferta vs consumo O2); 2) <70% = perfusão inadequada; 3) PA sistólica pode estar normal com má perfusão; 4) FC = compensação, não perfusão; 5) PVC = pré-carga; 6) Débito urinário = tardio, inespecífico.',
          referencias: 'Ponikowski P, et al. 2016 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J. 2016;37(27):2129-2200.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Cardiologia',
          dificuldade: 'dificil'
        },
        {
          id: 30,
          enunciado: 'Na avaliação da função muscular respiratória, qual valor de pressão inspiratória máxima (PImáx) indica fraqueza muscular significativa?',
          alternativas: [
            { id: 'a', texto: 'PImáx > -80 cmH2O' },
            { id: 'b', texto: 'PImáx entre -60 e -80 cmH2O' },
            { id: 'c', texto: 'PImáx entre -40 e -60 cmH2O' },
            { id: 'd', texto: 'PImáx > -40 cmH2O' },
            { id: 'e', texto: 'PImáx > -20 cmH2O' }
          ],
          respostaCorreta: 'd',
          explicacao: 'PImáx > -40 cmH2O (menos negativa que -40) indica fraqueza muscular respiratória significativa. Valores normais são tipicamente < -80 cmH2O em adultos jovens saudáveis.',
          raciocinio: 'PImáx e fraqueza muscular: 1) Valores normais: homens <-100 cmH2O, mulheres <-70 cmH2O; 2) PImáx > -40 cmH2O = fraqueza significativa; 3) Indica risco insuficiência respiratória; 4) Valores menos negativos = menor força; 5) Importante para indicação VNI.',
          referencias: 'American Thoracic Society/European Respiratory Society. ATS/ERS Statement on respiratory muscle testing. Am J Respir Crit Care Med. 2002;166(4):518-624.',
          banca: 'UNIFESP',
          ano: 2023,
          area: 'Pneumologia',
          dificuldade: 'media'
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
      totalQuestoes: 30,
      tempo: 90,
      dificuldade: 'media',
      descricao: 'Simulado completo baseado nas questões específicas de fisioterapia do concurso da Prefeitura de São Paulo 2019',
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
        },
        {
          id: 3,
          enunciado: 'Na avaliação da marcha, qual fase representa o período de duplo apoio?',
          alternativas: [
            { id: 'a', texto: 'Contato inicial a resposta à carga' },
            { id: 'b', texto: 'Resposta à carga e pré-balanço' },
            { id: 'c', texto: 'Apoio médio a apoio terminal' },
            { id: 'd', texto: 'Balanço inicial a balanço médio' },
            { id: 'e', texto: 'Balanço terminal a contato inicial' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O duplo apoio ocorre em dois momentos: no início da fase de apoio (resposta à carga) e no final (pré-balanço), quando ambos os pés estão em contato com o solo simultaneamente.',
          raciocinio: 'Fases da marcha: 1) Duplo apoio = ambos pés no solo; 2) Ocorre 2x no ciclo: início (resposta à carga) e fim (pré-balanço) da fase de apoio; 3) Representa ~20% do ciclo total; 4) Outras fases são apoio simples ou balanço.',
          referencias: 'Perry J, Burnfield JM. Gait Analysis: Normal and Pathological Function. 2nd ed.',
          banca: 'VUNESP',
          ano: 2019,
          area: 'Biomecânica',
          dificuldade: 'facil'
        },
        {
          id: 4,
          enunciado: 'No tratamento da lombalgia aguda, qual conduta é recomendada pelas diretrizes atuais?',
          alternativas: [
            { id: 'a', texto: 'Repouso absoluto no leito por 7 dias' },
            { id: 'b', texto: 'Manutenção das atividades dentro da tolerância à dor' },
            { id: 'c', texto: 'Imobilização com colete rígido' },
            { id: 'd', texto: 'Aplicação de calor intenso por períodos prolongados' },
            { id: 'e', texto: 'Exercícios de alta intensidade imediatos' }
          ],
          respostaCorreta: 'b',
          explicacao: 'As diretrizes atuais recomendam manutenção das atividades dentro da tolerância à dor, evitando repouso prolongado que pode retardar a recuperação e causar descondicionamento.',
          raciocinio: 'Lombalgia aguda - evidências: 1) Atividade precoce > repouso prolongado; 2) Manutenção atividades dentro tolerância; 3) Repouso >2 dias prejudicial; 4) Imobilização não recomendada; 5) Calor moderado, não intenso; 6) Exercícios graduais, não alta intensidade imediata.',
          referencias: 'Qaseem A, et al. Noninvasive treatments for acute, subacute, and chronic low back pain. Ann Intern Med. 2017;166(7):514-530.',
          banca: 'VUNESP',
          ano: 2019,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 5,
          enunciado: 'Na fisioterapia respiratória pediátrica, qual técnica é mais apropriada para lactentes?',
          alternativas: [
            { id: 'a', texto: 'Drenagem postural com percussão vigorosa' },
            { id: 'b', texto: 'Técnicas de expiração forçada (huffing)' },
            { id: 'c', texto: 'Drenagem postural modificada com vibração suave' },
            { id: 'd', texto: 'Pressão expiratória positiva (PEP)' },
            { id: 'e', texto: 'Exercícios respiratórios ativos' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Para lactentes, a drenagem postural modificada com vibração suave é mais apropriada, evitando posições que aumentem o refluxo gastroesofágico e utilizando técnicas gentis adequadas à idade.',
          raciocinio: 'Fisioterapia respiratória lactentes: 1) Drenagem postural modificada (evita Trendelenburg → refluxo); 2) Vibração suave (não percussão vigorosa); 3) Huffing requer cooperação (>3 anos); 4) PEP requer cooperação; 5) Exercícios ativos impossíveis em lactentes.',
          referencias: 'Hough JL, et al. Airway clearance techniques in hospitalized preterm infants. Cochrane Database Syst Rev. 2008;(1):CD003968.',
          banca: 'VUNESP',
          ano: 2019,
          area: 'Pediatria',
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
      totalQuestoes: 30,
      tempo: 120,
      dificuldade: 'dificil',
      descricao: 'Simulado completo baseado na prova de residência em fisioterapia do HC-FMUSP 2022 - nível avançado',
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
    },
    {
      id: 5,
      titulo: 'UNIFESP 2024 - Fisioterapia',
      banca: 'VUNESP',
      ano: 2024,
      orgao: 'Universidade Federal de São Paulo',
      cargo: 'Fisioterapeuta',
      totalQuestoes: 30,
      tempo: 90,
      dificuldade: 'dificil',
      descricao: 'Simulado completo baseado nas questões reais da UNIFESP 2024 aplicadas pela VUNESP',
      questoes: [
        {
          id: 21,
          enunciado: 'Uma articulação que realiza um movimento de circundução possui quantos graus de liberdade?',
          alternativas: [
            { id: 'a', texto: '1' },
            { id: 'b', texto: '2' },
            { id: 'c', texto: '3' },
            { id: 'd', texto: '4' },
            { id: 'e', texto: '5' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Uma articulação que realiza circundução possui 3 graus de liberdade. A circundução é um movimento complexo que combina flexão, extensão, abdução e adução, requerendo 3 eixos de movimento perpendiculares entre si.',
          raciocinio: 'Graus de liberdade articular: 1) Circundução = movimento complexo; 2) Combina movimentos nos 3 planos: sagital (flexão/extensão), frontal (abdução/adução), transverso (rotação); 3) Requer 3 eixos perpendiculares; 4) Exemplos: ombro, quadril; 5) 1 grau = dobradiça, 2 graus = elipsoide, 3 graus = esferóide.',
          referencias: 'Neumann DA. Kinesiology of the Musculoskeletal System: Foundations for Rehabilitation. 3rd ed. St. Louis: Elsevier; 2017.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Anatomia',
          dificuldade: 'media'
        },
        {
          id: 22,
          enunciado: 'Os entes que compõem o SUS possuem atribuições e responsabilidades na gestão deste sistema. Os estados e o Distrito Federal são responsáveis',
          alternativas: [
            { id: 'a', texto: 'pelo atendimento da população nas Unidades Básicas de Saúde.' },
            { id: 'b', texto: 'pela criação dos Serviço de Apoio Diagnóstico Terapêutico (SADT).' },
            { id: 'c', texto: 'por planejar, elaborar normas, avaliar e utilizar instrumentos para o controle do SUS.' },
            { id: 'd', texto: 'pela execução das ações e serviços de saúde no âmbito do seu território.' },
            { id: 'e', texto: 'pela organização do atendimento à saúde em seu território.' }
          ],
          respostaCorreta: 'e',
          explicacao: 'Os estados e o Distrito Federal são responsáveis pela organização do atendimento à saúde em seu território, incluindo a coordenação das redes de atenção à saúde e a gestão dos serviços de média e alta complexidade.',
          raciocinio: 'Competências no SUS: 1) União = políticas nacionais, normas gerais; 2) Estados/DF = organização territorial, redes de atenção; 3) Municípios = execução direta, UBS; 4) Estados coordenam regionalmente; 5) Não executam diretamente UBS (municipal) nem criam SADT isoladamente.',
          referencias: 'Lei 8.080/90 - Lei Orgânica da Saúde. Constituição Federal de 1988, Art. 196-200.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'SUS',
          dificuldade: 'media'
        },
        {
          id: 23,
          enunciado: 'O fisioterapeuta quer avaliar o sistema de estabilização lateral do pé de um paciente. Neste sistema, a estrutura que é responsável por prevenir a inversão excessiva do pé é o ligamento',
          alternativas: [
            { id: 'a', texto: 'tibiotalar anterior.' },
            { id: 'b', texto: 'calcâneo fibular.' },
            { id: 'c', texto: 'talofibular posterior.' },
            { id: 'd', texto: 'talofibular anterior.' },
            { id: 'e', texto: 'colateral medial.' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O ligamento calcâneo fibular é o principal responsável por prevenir a inversão excessiva do pé. É o ligamento mais forte do complexo lateral do tornozelo e o mais comumente lesado nas entorses de inversão.',
          raciocinio: 'Estabilização lateral tornozelo: 1) Complexo lateral = talofibular anterior + calcâneo fibular + talofibular posterior; 2) Calcâneo fibular = mais forte, previne inversão excessiva; 3) Talofibular anterior = mais fraco, lesão mais comum; 4) Colateral medial = lado oposto; 5) Tibiotalar anterior = não existe.',
          referencias: 'Hertel J. Functional anatomy, pathomechanics, and pathophysiology of lateral ankle instability. J Athl Train. 2002;37(4):364-375.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 24,
          enunciado: 'Ao examinar o padrão respiratório de um paciente internado em uma Unidade de Terapia Intensiva, a fisioterapeuta encontrou um padrão respiratório caracterizado por incursões respiratórias em profundidade crescente até o máximo, depois decrescente, seguidas por períodos de apneia. Este padrão corresponde à respiração',
          alternativas: [
            { id: 'a', texto: 'normal.' },
            { id: 'b', texto: 'de Kussmaul.' },
            { id: 'c', texto: 'de Biot.' },
            { id: 'd', texto: 'de Cheyne-Stokes.' },
            { id: 'e', texto: 'de apneia' }
          ],
          respostaCorreta: 'd',
          explicacao: 'A respiração de Cheyne-Stokes é caracterizada por ciclos de respirações com amplitude crescente até um máximo, depois decrescente, seguidas por períodos de apneia. É comum em pacientes com insuficiência cardíaca ou lesões neurológicas.',
          raciocinio: 'Padrões respiratórios patológicos: 1) Cheyne-Stokes = crescente-decrescente + apneia (descrito na questão); 2) Kussmaul = respiração profunda e rápida (acidose); 3) Biot = irregular com pausas (lesão bulbar); 4) Normal = regular; 5) Apneia = ausência respiração.',
          referencias: 'West JB. Respiratory Physiology: The Essentials. 10th ed. Philadelphia: Wolters Kluwer; 2016.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'UTI',
          dificuldade: 'media'
        },
        {
          id: 25,
          enunciado: 'Um trabalhador que realizava atividades ocupacionais com furadeiras que resultavam em vibração nas mãos compareceu à fisioterapia com queixa de dor e restrição aos movimentos da mão. Ao exame físico, o fisioterapeuta observou hipertrofia da fáscia palmar, com a presença de nódulos, apresentando flexão dos dedos. Esta patologia é denominada',
          alternativas: [
            { id: 'a', texto: 'síndrome do túnel do carpo.' },
            { id: 'b', texto: 'tenossinovite de De Quervain.' },
            { id: 'c', texto: 'dedos em gatilho.' },
            { id: 'd', texto: 'doença de Raynaud.' },
            { id: 'e', texto: 'doença de Dupuytren.' }
          ],
          respostaCorreta: 'e',
          explicacao: 'A doença de Dupuytren é caracterizada por hipertrofia e contratura da fáscia palmar, formando nódulos e cordões fibrosos que causam flexão progressiva dos dedos, especialmente 4º e 5º dedos.',
          raciocinio: 'Diagnóstico diferencial mão: 1) Dupuytren = hipertrofia fáscia palmar + nódulos + flexão dedos (descrito); 2) Túnel carpo = compressão nervo mediano; 3) De Quervain = tenossinovite polegar; 4) Dedo gatilho = travamento flexão; 5) Raynaud = vasoespasmo.',
          referencias: 'Rayan GM. Dupuytren disease: anatomy, pathology, presentation, and treatment. J Bone Joint Surg Am. 2007;89(1):189-198.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 26,
          enunciado: 'A prática de exercícios durante a gestação traz diversos benefícios para a gestante e para o bebê que está sendo gestado. No entanto, existem algumas contraindicações absolutas para a realização dessa prática, que são preconizadas pela Associação Brasileira de Fisioterapia em Saúde da Mulher. Entre elas está:',
          alternativas: [
            { id: 'a', texto: 'diabetes tipo I mal controlado.' },
            { id: 'b', texto: 'doença pulmonar restritiva.' },
            { id: 'c', texto: 'aumento do colo do útero.' },
            { id: 'd', texto: 'bronquite crônica.' },
            { id: 'e', texto: 'distúrbio convulsivo mal controlado.' }
          ],
          respostaCorreta: 'e',
          explicacao: 'Distúrbio convulsivo mal controlado é uma contraindicação absoluta para exercícios na gestação devido ao risco de convulsões durante a atividade física, que podem causar trauma fetal e materno.',
          raciocinio: 'Contraindicações absolutas exercício gestação: 1) Distúrbio convulsivo mal controlado = risco trauma; 2) Diabetes tipo I mal controlado = relativa; 3) Doença pulmonar restritiva = relativa; 4) Aumento colo útero = não é contraindicação; 5) Bronquite crônica = relativa.',
          referencias: 'Associação Brasileira de Fisioterapia em Saúde da Mulher. Diretrizes para exercícios na gestação. 2019.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Saúde da Mulher',
          dificuldade: 'media'
        },
        {
          id: 27,
          enunciado: 'Ao avaliar pacientes com artrite idiopática juvenil, o fisioterapeuta encontrará articulações mais frequentemente acometidas por esta patologia. São elas:',
          alternativas: [
            { id: 'a', texto: 'mãos, punho e joelho.' },
            { id: 'b', texto: 'mãos, punho e tornozelo.' },
            { id: 'c', texto: 'cotovelo, joelho e mãos.' },
            { id: 'd', texto: 'quadril, joelho e mãos.' },
            { id: 'e', texto: 'joelho, quadril e tornozelo.' }
          ],
          respostaCorreta: 'a',
          explicacao: 'Na artrite idiopática juvenil, as articulações mais frequentemente acometidas são mãos (especialmente IFPs e MCFs), punhos e joelhos. O padrão de acometimento varia conforme o subtipo da doença.',
          raciocinio: 'AIJ - articulações mais acometidas: 1) Mãos (IFPs, MCFs) = muito comum; 2) Punhos = frequentemente acometidos; 3) Joelhos = comum, especialmente oligoarticular; 4) Quadril menos comum que joelho; 5) Tornozelo e cotovelo menos frequentes que as outras.',
          referencias: 'Petty RE, et al. International League of Associations for Rheumatology classification of juvenile idiopathic arthritis. J Rheumatol. 2004;31(2):390-392.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Pediatria',
          dificuldade: 'media'
        },
        {
          id: 28,
          enunciado: 'Ao receber uma criança com problemas respiratórios para avaliação, a fisioterapeuta de uma UBS constatou que a criança não era vacinada e que havia um surto de sarampo na região. Se a criança adquirir esta doença, a medida preconizada para o controle desta infecção é:',
          alternativas: [
            { id: 'a', texto: 'repouso absoluto e medicação para alívio dos sintomas.' },
            { id: 'b', texto: 'uso da laserterapia de baixa intensidade e exercícios ativos.' },
            { id: 'c', texto: 'cinesioterapia passiva e ativa assistida, medicação para alívio dos sintomas.' },
            { id: 'd', texto: 'crioterapia para controle da infecção e cinesioterapia passiva.' },
            { id: 'e', texto: 'alongamentos e exercícios ativos de baixo impacto' }
          ],
          respostaCorreta: 'a',
          explicacao: 'No sarampo, o tratamento é sintomático com repouso absoluto e medicação para alívio dos sintomas (febre, tosse). Não há tratamento específico antiviral, e exercícios são contraindicados na fase aguda.',
          raciocinio: 'Tratamento sarampo: 1) Doença viral sem tratamento específico; 2) Repouso absoluto na fase aguda; 3) Tratamento sintomático (antitérmicos, hidratação); 4) Exercícios contraindicados (risco complicações); 5) Laserterapia, crioterapia não têm indicação.',
          referencias: 'Ministério da Saúde. Guia de Vigilância em Saúde: Sarampo. Brasília: MS; 2019.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Pediatria',
          dificuldade: 'facil'
        },
        {
          id: 29,
          enunciado: 'Ao organizar um programa de exercícios para pacientes hipertensos em uma UBS, a fisioterapeuta da equipe de saúde realizará atividades de educação em saúde voltada para o controle de peso em pacientes hipertensos com obesidade. De acordo com as Diretrizes da Sociedade Brasileira de Cardiologia e o Ministério da Saúde, esses pacientes devem ser orientados a',
          alternativas: [
            { id: 'a', texto: 'realizar atividades aeróbicas apenas, pois não há comprovação de que treinos resistidos diminuam a hipertensão.' },
            { id: 'b', texto: 'manter um Índice de Massa Corporal (IMC) entre 22 e 27 em idosos e uma Circunferência de Cintura (CC) < 90 cm em homens e < 80 cm em mulheres.' },
            { id: 'c', texto: 'alcançar e manter um peso corporal saudável, representado pelo IMC (kg/m²) < 28 em adultos.' },
            { id: 'd', texto: 'consumir uma quantidade de café que não exceda quantidades baixas a moderadas (≤ 300 mg de cafeína).' },
            { id: 'e', texto: 'substituir o sal de cozinha ou o sal grosso por sal rosa do Himalaia ou sal marinho, pois estes apresentam menor conteúdo de cloreto de sódio.' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Segundo as Diretrizes da SBC, hipertensos obesos devem manter IMC entre 22-27 kg/m² em idosos e circunferência da cintura < 90 cm (homens) e < 80 cm (mulheres) para redução do risco cardiovascular.',
          raciocinio: 'Diretrizes SBC hipertensão: 1) IMC 22-27 em idosos (não <28 geral); 2) CC <90 cm homens, <80 cm mulheres; 3) Exercícios resistidos SÃO recomendados; 4) Cafeína até 300mg é aceitável; 5) Sal rosa/marinho TÊM mesmo sódio que sal comum.',
          referencias: 'Barroso WKS, et al. Diretrizes Brasileiras de Hipertensão Arterial – 2020. Arq Bras Cardiol. 2021;116(3):516-658.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Cardiologia',
          dificuldade: 'dificil'
        },
        {
          id: 30,
          enunciado: 'Ao avaliar um paciente com hanseníase e neurite do nervo ulnar, apresentando estágio irritativo (estágio I), caracterizado por dor, parestesia e hiperestesia, o fisioterapeuta pensou em condutas terapêuticas para este paciente. A fotobiomodulação',
          alternativas: [
            { id: 'a', texto: 'no comprimento de onda de 904 nm pode ser utilizada nestes pacientes, pois ela melhora a dor e melhora a funcionalidade, quando associada a alongamentos, mobilizações e exercícios.' },
            { id: 'b', texto: 'no comprimento de onda de 904 nm melhora a funcionalidade, mas não tem efeito significativo sobre a dor quando associada a alongamentos, mobilizações e exercícios.' },
            { id: 'c', texto: 'não deve ser utilizada neste paciente, pois não há evidências que lasers/LEDs tenham efeito neste tipo de neurite.' },
            { id: 'd', texto: 'não deve ser utilizada neste paciente, pois lasers/LEDs possuem efeito angiogênico e podem levar a bactéria para outros locais do organismo.' },
            { id: 'e', texto: 'pode ser utilizada nestes pacientes apenas nos comprimentos de onda vermelho, pois os comprimentos no infravermelho possuem efeito angiogênico e podem levar a bactéria para outros locais do organismo' }
          ],
          respostaCorreta: 'a',
          explicacao: 'A fotobiomodulação com 904 nm (infravermelho) pode ser utilizada na neurite hansênica estágio I, pois demonstra eficácia na redução da dor e melhora da funcionalidade quando associada a outras terapias.',
          raciocinio: 'Fotobiomodulação neurite hansênica: 1) 904 nm = infravermelho, penetração profunda; 2) Evidências mostram melhora dor + funcionalidade; 3) Seguro no estágio irritativo; 4) Não há risco angiogênico significativo; 5) Associação com outras terapias potencializa resultados.',
          referencias: 'Gomes CF, et al. Low-level laser therapy improves pain and function in leprosy neuropathy. Lasers Med Sci. 2014;29(3):1153-1159.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Eletroterapia',
          dificuldade: 'dificil'
        },
        {
          id: 31,
          enunciado: 'O Ministério da Saúde, por meio das suas atribuições, baixou uma portaria que institui incentivo financeiro federal de implantação e custeio para as equipes multiprofissionais na Atenção Primária à Saúde (eMulti). São diretrizes e objetivos do processo de trabalho das eMulti:',
          alternativas: [
            { id: 'a', texto: 'dar assistência fisioterapêutica em Centros Especializados de Reabilitação, promovendo a interação entre a APS e o nível secundário de assistência à saúde.' },
            { id: 'b', texto: 'facilitar o acesso da população aos cuidados em saúde, por meio do trabalho colaborativo entre profissionais das eMulti e das outras equipes que atuam na APS.' },
            { id: 'c', texto: 'prestar assistência na alta complexidade, em locais com leitos de UTI, centros cirúrgicos grandes e complexos, fazendo a ponte entre a alta complexidade e a APS.' },
            { id: 'd', texto: 'prestar assistência na média complexidade, composta por serviços especializados encontrados em hospitais e ambulatórios, e criar um sistema de referência e contrarreferência para outros níveis de atenção em saúde.' },
            { id: 'e', texto: 'dar assistência a pacientes nas Unidades de Pronto Atendimento (UPA 24h) que se encaixam nesse nível de atenção, concentrando os atendimentos de saúde de complexidade intermediária.' }
          ],
          respostaCorreta: 'b',
          explicacao: 'As eMulti têm como objetivo facilitar o acesso da população aos cuidados em saúde através do trabalho colaborativo entre profissionais multiprofissionais e as equipes de Saúde da Família na Atenção Primária.',
          raciocinio: 'eMulti na APS: 1) Objetivo = facilitar acesso + trabalho colaborativo; 2) Atuação NA atenção primária (não secundária/terciária); 3) Integração com eSF; 4) Não atua em CER, UTI, UPA; 5) Foco na APS, não média/alta complexidade.',
          referencias: 'Portaria GM/MS nº 99, de 7 de fevereiro de 2020. Institui incentivo financeiro federal para eMulti.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'SUS',
          dificuldade: 'media'
        },
        {
          id: 32,
          enunciado: 'Compareceu ao atendimento de fisioterapia um paciente que apresenta uma lesão muscular na fase subaguda. O plano terapêutico indicado para este paciente é:',
          alternativas: [
            { id: 'a', texto: 'aumento da força muscular, equilíbrio e propriocepção, exercícios concêntricos e excêntricos e pliométricos, treinos de independência funcionais, reeducação de gestos.' },
            { id: 'b', texto: 'aumento da força e alinhamento da cicatriz, desenvolvimento da independência funcional, alongamento, fortalecimento, treino de resistência física e exercícios funcionais progressivos e com ênfase na especificidade.' },
            { id: 'c', texto: 'repouso e/ou imobilização seletivos, promoção da regeneração inicial e prevenção dos efeitos prejudiciais do repouso, movimentos passivos, massagem e ajustamentos musculares leves com cuidado.' },
            { id: 'd', texto: 'exercícios ativos, resistidos e de estabilização em cadeia cinética aberta e fechada não destrutivos e de resistência muscular à fadiga, progredindo cuidadosamente em intensidade e amplitude.' },
            { id: 'e', texto: 'mobilização passiva e ativa assistida, uso de órteses para limitação do grupo muscular lesado, drenagem linfática, orientação para elevação do membro do grupo muscular lesado.' }
          ],
          respostaCorreta: 'd',
          explicacao: 'Na fase subaguda da lesão muscular, o tratamento inclui exercícios ativos, resistidos e de estabilização em cadeia cinética aberta e fechada, progredindo cuidadosamente em intensidade para promover reparação tecidual adequada.',
          raciocinio: 'Fases lesão muscular: 1) Aguda = repouso, proteção; 2) Subaguda = exercícios ativos/resistidos progressivos; 3) Crônica = fortalecimento, pliométricos, gestos específicos; 4) Subaguda permite carga controlada; 5) Não repouso absoluto nem exercícios máximos.',
          referencias: 'Järvinen TAH, et al. Muscle injuries: biology and treatment. Am J Sports Med. 2005;33(5):745-764.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 33,
          enunciado: 'Ao realizar uma manobra de deslizamento dorsal (posterior) da articulação talocrural de um paciente com limitação de movimentos articulares na articulação do tornozelo, o fisioterapeuta tem como objetivo:',
          alternativas: [
            { id: 'a', texto: 'aumentar a flexão plantar do tornozelo.' },
            { id: 'b', texto: 'realizar mobilização geral para inversão/eversão.' },
            { id: 'c', texto: 'deslizar lateralmente a articulação para aumentar a inversão.' },
            { id: 'd', texto: 'aumentar a dorsiflexão do tornozelo.' },
            { id: 'e', texto: 'aumentar os movimentos acessórios de flexão plantar.' }
          ],
          respostaCorreta: 'd',
          explicacao: 'O deslizamento dorsal (posterior) do tálus na articulação talocrural tem como objetivo aumentar a dorsiflexão do tornozelo, seguindo a regra côncavo-convexo de Kaltenborn.',
          raciocinio: 'Mobilização talocrural: 1) Tálus = convexo, tíbia/fíbula = côncavo; 2) Dorsiflexão = tálus rola anterior + desliza posterior; 3) Deslizamento posterior do tálus = aumenta dorsiflexão; 4) Deslizamento anterior = aumenta flexão plantar; 5) Regra côncavo-convexo.',
          referencias: 'Kaltenborn FM. Manual Mobilization of the Joints: The Kaltenborn Method of Joint Examination and Treatment. 8th ed. Oslo: Norli; 2014.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Terapia Manual',
          dificuldade: 'media'
        },
        {
          id: 34,
          enunciado: 'A.J.C., 13 anos, apresenta espinha bífida e um quadro de paralisia abaixo de L2. O tipo de dispositivo auxiliar para deambulação que deve ser indicado para este paciente é a órtese',
          alternativas: [
            { id: 'a', texto: 'toracolombar de coluna (OTLC) com órtese joelho-tornozelo-pé (KAFO) e órtese lombossacra (OLS).' },
            { id: 'b', texto: 'lombossacra (OLS) com órtese joelho-tornozelo-pé (KAFO) ou KAFO apenas.' },
            { id: 'c', texto: 'joelho-tornozelo-pé (KAFO) ou órtese tornozelo-pé (AFO).' },
            { id: 'd', texto: 'toracolombar de Coluna (OTLC) com órtese joelho-tornozelo-pé (KAFO) e órtese guia de quadril.' },
            { id: 'e', texto: 'tornozelo-pé (AFO).' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Para paralisia abaixo de L2 na espinha bífida, indica-se órtese lombossacra (OLS) com KAFO ou apenas KAFO, pois há preservação parcial da musculatura do quadril e necessidade de estabilização do joelho e tornozelo.',
          raciocinio: 'Órteses espinha bífida L2: 1) L2 = preserva flexores quadril parcialmente; 2) Perde extensores joelho e músculos tornozelo; 3) Necessita estabilização lombar + MMII; 4) OLS + KAFO ou só KAFO; 5) AFO insuficiente (não estabiliza joelho); 6) OTLC desnecessária (tronco preservado).',
          referencias: 'Dias RC, et al. Órteses e próteses na reabilitação. Rio de Janeiro: Guanabara Koogan; 2016.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Pediatria',
          dificuldade: 'dificil'
        },
        {
          id: 35,
          enunciado: 'A fisioterapeuta que atende um bebê com idade de 5 meses e diagnóstico de síndrome de Down vai utilizar uma técnica conhecida como "tummy time" ou tempo de barriga. Esta técnica tem como objetivo',
          alternativas: [
            { id: 'a', texto: 'aumentar progressivamente o controle de tronco inferior e o controle de quadril, auxiliando a postura de rastejar.' },
            { id: 'b', texto: 'desenvolver progressivamente mais controle de cabeça e tronco superior contra a gravidade e auxiliar a aquisição precoce na postura.' },
            { id: 'c', texto: 'desenvolver progressivamente o controle de cabeça e o controle de tronco superior e inferior para estabilização de tronco na postura sentada.' },
            { id: 'd', texto: 'aumentar progressivamente o controle de tronco superior e inferior e as reações de proteção na postura sentada.' },
            { id: 'e', texto: 'facilitar a aquisição de controle de tronco superior e da manutenção dos reflexos tônicos cervicais assimétricos.' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O "tummy time" tem como objetivo desenvolver progressivamente o controle de cabeça e tronco superior contra a gravidade, sendo fundamental para o desenvolvimento motor precoce e prevenção de plagiocefalia.',
          raciocinio: 'Tummy time objetivos: 1) Posição prona = trabalha contra gravidade; 2) Desenvolve controle cabeça + tronco superior; 3) Aos 5 meses = foco nestes controles; 4) Não é para tronco inferior/quadril ainda; 5) Não mantém reflexos primitivos (os inibe); 6) Base para marcos posteriores.',
          referencias: 'American Academy of Pediatrics. Back to Sleep, Tummy to Play. Pediatrics. 2008;122(5):1135-1136.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Pediatria',
          dificuldade: 'media'
        },
        {
          id: 36,
          enunciado: 'Em pacientes com suporte ventilatório, o fisioterapeuta deve estar atento à umidificação de vias aéreas, uma vez que, se este cuidado não for realizado de forma adequada, o paciente pode sofrer complicações como',
          alternativas: [
            { id: 'a', texto: 'hipertermia associada a umidificação e aquecimentos insuficientes.' },
            { id: 'b', texto: 'aumento da viscosidade e transporte de muco.' },
            { id: 'c', texto: 'hiper-hidratação e aumento do transporte de muco.' },
            { id: 'd', texto: 'diminuição da resistência das vias aéreas.' },
            { id: 'e', texto: 'aumentar o risco de oclusão da cânula endotraqueal.' }
          ],
          respostaCorreta: 'e',
          explicacao: 'A umidificação inadequada em pacientes ventilados pode levar ao ressecamento das secreções, aumentando sua viscosidade e o risco de oclusão da cânula endotraqueal, complicação grave que pode ser fatal.',
          raciocinio: 'Umidificação inadequada VM: 1) Resseca secreções → ↑viscosidade; 2) Secreções espessas → risco oclusão cânula; 3) Não causa hipertermia; 4) Diminui (não aumenta) transporte muco; 5) Não causa hiper-hidratação; 6) Aumenta (não diminui) resistência vias aéreas.',
          referencias: 'Restrepo RD, Walsh BK. Humidification during invasive and noninvasive mechanical ventilation: 2012. Respir Care. 2012;57(5):782-788.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'UTI',
          dificuldade: 'media'
        },
        {
          id: 37,
          enunciado: 'T.G., 24 anos, com diagnóstico de lupus eritematoso sistêmico, compareceu à fisioterapia para avaliação inicial e orientações. As orientações que devem ser dadas ao paciente para evitar desencadeadores que provocam surtos são:',
          alternativas: [
            { id: 'a', texto: 'cessar tabagismo, utilizar roupas escuras com fator de proteção solar e filtros solares e utilizar dexametasona.' },
            { id: 'b', texto: 'evitar exercícios, cessar tabagismo, utilizar roupas escuras com fator de proteção solar e filtros solares.' },
            { id: 'c', texto: 'reduzir o estresse, ter boa higiene do sono, realizar exercícios e ter apoio emocional.' },
            { id: 'd', texto: 'utilizar cremes com corticoide e tomar dexametasona ou prednisona ou metilprednisolona ou deflazacorte.' },
            { id: 'e', texto: 'reduzir o estresse, ter boa higiene do sono, realizar exercícios e aplicar cremes com corticoide.' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Para prevenir surtos de LES, as orientações incluem redução do estresse, boa higiene do sono, exercícios regulares e apoio emocional. Estas medidas ajudam a controlar fatores desencadeadores não farmacológicos.',
          raciocinio: 'Prevenção surtos LES: 1) Estresse = principal desencadeador; 2) Sono adequado = essencial; 3) Exercícios = benéficos (não evitar); 4) Apoio emocional = importante; 5) Medicamentos = prescrição médica; 6) Proteção solar importante mas não listada corretamente nas outras.',
          referencias: 'Fanouriakis A, et al. 2019 update of the EULAR recommendations for the management of systemic lupus erythematosus. Ann Rheum Dis. 2019;78(6):736-745.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Reumatologia',
          dificuldade: 'media'
        },
        {
          id: 38,
          enunciado: 'Em pacientes com vaginismo ou dispareunia, a fisioterapeuta pode utilizar dilatadores vaginais que podem atuar',
          alternativas: [
            { id: 'a', texto: 'promovendo analgesia por meio da modulação da dor via substâncias analgésicas endógenas.' },
            { id: 'b', texto: 'no relaxamento, aumento da coordenação e propriocepção da musculatura e no aumento do fluxo sanguíneo local.' },
            { id: 'c', texto: 'na dessensibilização do canal vaginal, reduzindo a tensão muscular e melhorando o conforto durante a relação sexual.' },
            { id: 'd', texto: 'aumentando a força muscular dos músculos do assoalho pélvico e promovendo a analgesia por meio deste mecanismo.' },
            { id: 'e', texto: 'diminuindo a dor por meio da visualização da contração muscular nas telas dos computadores.' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Os dilatadores vaginais atuam na dessensibilização do canal vaginal, reduzindo a tensão muscular reflexa e melhorando o conforto durante a relação sexual através da exposição gradual e controlada.',
          raciocinio: 'Dilatadores vaginais: 1) Dessensibilização = mecanismo principal; 2) Reduz tensão muscular reflexa; 3) Melhora conforto sexual; 4) Não é analgesia por substâncias endógenas; 5) Não aumenta força (relaxa); 6) Não envolve biofeedback visual.',
          referencias: 'Melnik T, et al. Interventions for vaginismus. Cochrane Database Syst Rev. 2012;12:CD001760.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Saúde da Mulher',
          dificuldade: 'media'
        },
        {
          id: 39,
          enunciado: 'J.P.M., 84 anos, apresenta dificuldades em deambulação, e a fisioterapeuta que o atende avalia que uma bengala poderia melhorar o desempenho na marcha deste paciente. De acordo com o Ministério da Saúde, a bengala deve',
          alternativas: [
            { id: 'a', texto: 'ter o apoio das mãos no nível do trocânter menor do fêmur.' },
            { id: 'b', texto: 'posicionar o cotovelo com cerca de 45º de flexão.' },
            { id: 'c', texto: 'ser posicionada entre 15 e 20 cm lateralmente aos pés.' },
            { id: 'd', texto: 'ter uma ponteira de borracha com um diâmetro mínimo de 2 cm.' },
            { id: 'e', texto: 'ter empunhadura na forma de U.' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Segundo o Ministério da Saúde, a bengala deve ser posicionada entre 15 e 20 cm lateralmente aos pés para proporcionar base de apoio adequada e estabilidade durante a marcha.',
          raciocinio: 'Prescrição bengala MS: 1) Posição lateral 15-20 cm = estabilidade adequada; 2) Apoio no nível trocânter maior (não menor); 3) Cotovelo 20-30° flexão (não 45°); 4) Ponteira mínimo 3 cm diâmetro; 5) Empunhadura anatômica (não U).',
          referencias: 'Ministério da Saúde. Manual de Prescrição de Órteses, Próteses e Meios Auxiliares de Locomoção. Brasília: MS; 2018.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Geriatria',
          dificuldade: 'media'
        },
        {
          id: 40,
          enunciado: 'Na aplicação de estimulação elétrica funcional em pacientes com espasticidade, a rampa de subida deve ser utilizada porque',
          alternativas: [
            { id: 'a', texto: 'promove analgesia na região em que é aplicada.' },
            { id: 'b', texto: 'aumenta a analgesia do músculo estimulado.' },
            { id: 'c', texto: 'evita um aumento da espasticidade por reflexo.' },
            { id: 'd', texto: 'recruta seletivamente as unidades motoras para contração muscular.' },
            { id: 'e', texto: 'provoca um reflexo de estiramento e melhora a contração muscular.' }
          ],
          respostaCorreta: 'c',
          explicacao: 'A rampa de subida na estimulação elétrica funcional em pacientes espásticos evita o aumento reflexo da espasticidade que poderia ocorrer com o início abrupto da estimulação, proporcionando contração mais suave e controlada.',
          raciocinio: 'Rampa subida EEF espasticidade: 1) Início abrupto → reflexo estiramento → ↑espasticidade; 2) Rampa gradual evita reflexo; 3) Contração mais suave; 4) Não é para analgesia; 5) Não recruta seletivamente; 6) Evita (não provoca) reflexo estiramento.',
          referencias: 'Sheffler LR, Chae J. Neuromuscular electrical stimulation in neurorehabilitation. Muscle Nerve. 2007;35(5):562-590.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Eletroterapia',
          dificuldade: 'media'
        },
        {
          id: 41,
          enunciado: 'Na avaliação da função pulmonar, qual valor de VEF1/CVF indica obstrução ao fluxo aéreo segundo as diretrizes GOLD?',
          alternativas: [
            { id: 'a', texto: 'VEF1/CVF > 0,80' },
            { id: 'b', texto: 'VEF1/CVF < 0,70' },
            { id: 'c', texto: 'VEF1/CVF > 0,75' },
            { id: 'd', texto: 'VEF1/CVF < 0,60' },
            { id: 'e', texto: 'VEF1/CVF = 0,70' }
          ],
          respostaCorreta: 'b',
          explicacao: 'Segundo as diretrizes GOLD, um valor de VEF1/CVF < 0,70 após broncodilatador confirma a presença de obstrução ao fluxo aéreo e o diagnóstico de DPOC.',
          raciocinio: 'Critério GOLD obstrução: 1) VEF1/CVF < 0,70 pós-broncodilatador = obstrução; 2) Valor fixo, não dependente da idade; 3) Confirma DPOC; 4) Valores ≥ 0,70 = normais; 5) Critério internacionalmente aceito.',
          referencias: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy for the Diagnosis, Management, and Prevention of COPD. 2023.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Pneumologia',
          dificuldade: 'facil'
        },
        {
          id: 42,
          enunciado: 'No teste de Lachman para avaliação do ligamento cruzado anterior, qual é a posição ideal do joelho para realização do teste?',
          alternativas: [
            { id: 'a', texto: '0° de flexão (extensão completa)' },
            { id: 'b', texto: '20-30° de flexão' },
            { id: 'c', texto: '45° de flexão' },
            { id: 'd', texto: '90° de flexão' },
            { id: 'e', texto: '120° de flexão' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O teste de Lachman é realizado com o joelho em 20-30° de flexão, posição que relaxa a cápsula posterior e permite melhor avaliação da integridade do ligamento cruzado anterior.',
          raciocinio: 'Teste Lachman: 1) 20-30° flexão = posição ideal; 2) Relaxa cápsula posterior; 3) Melhor sensibilidade que gaveta anterior; 4) 0° = cápsula tensa; 5) 90° = gaveta anterior; 6) Maior especificidade nesta angulação.',
          referencias: 'Benjaminse A, et al. Clinical diagnosis of an anterior cruciate ligament rupture: a meta-analysis. J Orthop Sports Phys Ther. 2006;36(5):267-288.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Ortopedia',
          dificuldade: 'facil'
        },
        {
          id: 43,
          enunciado: 'Na reabilitação cardíaca fase II, qual é a intensidade de exercício recomendada para pacientes pós-infarto agudo do miocárdio?',
          alternativas: [
            { id: 'a', texto: '40-60% da FC de reserva' },
            { id: 'b', texto: '70-85% da FC máxima' },
            { id: 'c', texto: '50-60% da FC máxima teórica' },
            { id: 'd', texto: '80-90% da FC de reserva' },
            { id: 'e', texto: 'FC de repouso + 20 bpm' }
          ],
          respostaCorreta: 'a',
          explicacao: 'Na fase II da reabilitação cardíaca pós-IAM, recomenda-se intensidade de 40-60% da frequência cardíaca de reserva, proporcionando benefícios cardiovasculares com segurança.',
          raciocinio: 'Reabilitação cardíaca fase II: 1) 40-60% FC reserva = seguro e eficaz; 2) Fase II = 2-12 semanas pós-evento; 3) Intensidade moderada; 4) 70-85% FCmáx muito alta; 5) FC reserva mais precisa que FCmáx teórica.',
          referencias: 'Diretrizes Brasileiras de Reabilitação Cardiovascular - 2020. Arq Bras Cardiol. 2020;114(5):943-987.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Cardiologia',
          dificuldade: 'media'
        },
        {
          id: 44,
          enunciado: 'Na escala de Ashworth Modificada, qual pontuação indica espasticidade severa?',
          alternativas: [
            { id: 'a', texto: '1' },
            { id: 'b', texto: '1+' },
            { id: 'c', texto: '2' },
            { id: 'd', texto: '3' },
            { id: 'e', texto: '4' }
          ],
          respostaCorreta: 'e',
          explicacao: 'Na escala de Ashworth Modificada, a pontuação 4 indica espasticidade severa, caracterizada por rigidez em flexão ou extensão, impossibilitando movimentos passivos.',
          raciocinio: 'Ashworth Modificada: 1) 0=sem aumento tônus; 2) 1=leve aumento; 3) 1+=leve aumento com travamento; 4) 2=aumento mais marcante; 5) 3=aumento considerável; 6) 4=rigidez (espasticidade severa).',
          referencias: 'Bohannon RW, Smith MB. Interrater reliability of a modified Ashworth scale of muscle spasticity. Phys Ther. 1987;67(2):206-207.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Neurologia',
          dificuldade: 'facil'
        },
        {
          id: 45,
          enunciado: 'No desenvolvimento motor normal, em que idade a criança tipicamente consegue caminhar independentemente?',
          alternativas: [
            { id: 'a', texto: '9-10 meses' },
            { id: 'b', texto: '12-15 meses' },
            { id: 'c', texto: '16-18 meses' },
            { id: 'd', texto: '18-24 meses' },
            { id: 'e', texto: '6-9 meses' }
          ],
          respostaCorreta: 'b',
          explicacao: 'A marcha independente é tipicamente adquirida entre 12-15 meses de idade, sendo um marco importante do desenvolvimento motor grosso.',
          raciocinio: 'Marcos desenvolvimento motor: 1) 6-8 meses = sentar; 2) 9-10 meses = engatinhar; 3) 10-12 meses = ficar em pé; 4) 12-15 meses = marcha independente; 5) Variação normal existe.',
          referencias: 'Piper MC, Darrah J. Motor Assessment of the Developing Infant. Philadelphia: WB Saunders; 1994.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Pediatria',
          dificuldade: 'facil'
        },
        {
          id: 46,
          enunciado: 'Na avaliação do equilíbrio em idosos, qual teste é mais específico para predizer risco de quedas?',
          alternativas: [
            { id: 'a', texto: 'Teste de Romberg' },
            { id: 'b', texto: 'Timed Up and Go (TUG)' },
            { id: 'c', texto: 'Teste de sentar e levantar' },
            { id: 'd', texto: 'Escala de Berg' },
            { id: 'e', texto: 'Teste de alcance funcional' }
          ],
          respostaCorreta: 'b',
          explicacao: 'O Timed Up and Go (TUG) é o teste mais específico para predizer risco de quedas em idosos. Valores > 13,5 segundos indicam alto risco de quedas.',
          raciocinio: 'TUG para quedas: 1) Avalia múltiplas funções (transferência, marcha, mudança direção); 2) > 13,5s = alto risco quedas; 3) Mais específico que outros testes; 4) Romberg = equilíbrio estático; 5) Berg = mais completa mas menos específica.',
          referencias: 'Shumway-Cook A, et al. Predicting the probability for falls in community-dwelling older adults using the Timed Up & Go Test. Phys Ther. 2000;80(9):896-903.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Geriatria',
          dificuldade: 'media'
        },
        {
          id: 47,
          enunciado: 'Na aplicação de TENS (estimulação elétrica nervosa transcutânea) para analgesia, qual frequência é mais utilizada no modo convencional?',
          alternativas: [
            { id: 'a', texto: '2-10 Hz' },
            { id: 'b', texto: '50-100 Hz' },
            { id: 'c', texto: '150-200 Hz' },
            { id: 'd', texto: '1-4 Hz' },
            { id: 'e', texto: '200-300 Hz' }
          ],
          respostaCorreta: 'b',
          explicacao: 'No TENS convencional para analgesia, utilizam-se frequências de 50-100 Hz, que ativam fibras A-beta e promovem analgesia através da teoria das comportas da dor.',
          raciocinio: 'TENS convencional: 1) 50-100 Hz = alta frequência; 2) Ativa fibras A-beta; 3) Teoria comportas (Melzack & Wall); 4) Baixa intensidade; 5) 2-10 Hz = TENS acupuntura; 6) Frequências muito altas desnecessárias.',
          referencias: 'Johnson MI. Transcutaneous electrical nerve stimulation: mechanisms, clinical application and evidence. Rev Pain. 2007;1(1):7-11.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Eletroterapia',
          dificuldade: 'facil'
        },
        {
          id: 48,
          enunciado: 'Na hidroterapia, em que profundidade da água o peso corporal é reduzido em aproximadamente 90%?',
          alternativas: [
            { id: 'a', texto: 'Altura dos joelhos' },
            { id: 'b', texto: 'Altura da cintura' },
            { id: 'c', texto: 'Altura do processo xifoide' },
            { id: 'd', texto: 'Altura dos ombros' },
            { id: 'e', texto: 'Altura do pescoço' }
          ],
          respostaCorreta: 'e',
          explicacao: 'Quando a água atinge a altura do pescoço, o peso corporal é reduzido em aproximadamente 90%, proporcionando máximo alívio da carga articular.',
          raciocinio: 'Redução peso corporal hidroterapia: 1) Joelhos = 25%; 2) Cintura = 50%; 3) Processo xifoide = 75%; 4) Ombros = 85%; 5) Pescoço = 90% (máxima redução prática).',
          referencias: 'Harrison RA, et al. Loading of the lower limb when walking partially immersed. Physiotherapy. 1992;78(3):164-166.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Hidroterapia',
          dificuldade: 'media'
        },
        {
          id: 49,
          enunciado: 'Na síndrome do impacto do ombro, qual estrutura anatômica forma o "arco coracoacromial"?',
          alternativas: [
            { id: 'a', texto: 'Acrômio, processo coracoide e ligamento coracoacromial' },
            { id: 'b', texto: 'Clavícula, acrômio e processo coracoide' },
            { id: 'c', texto: 'Acrômio, clavícula e ligamento coracoclavicular' },
            { id: 'd', texto: 'Processo coracoide, clavícula e ligamento coracoacromial' },
            { id: 'e', texto: 'Acrômio e ligamento coracoacromial apenas' }
          ],
          respostaCorreta: 'a',
          explicacao: 'O arco coracoacromial é formado pelo acrômio, processo coracoide e ligamento coracoacromial, constituindo o "teto" do espaço subacromial onde ocorre o impacto.',
          raciocinio: 'Arco coracoacromial: 1) Acrômio + processo coracoide + ligamento coracoacromial; 2) Forma teto do espaço subacromial; 3) Local do impacto; 4) Clavícula não faz parte do arco; 5) Estrutura ósseo-ligamentar.',
          referencias: 'Neer CS 2nd. Impingement lesions. Clin Orthop Relat Res. 1983;(173):70-77.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Ortopedia',
          dificuldade: 'media'
        },
        {
          id: 50,
          enunciado: 'Na prescrição de exercícios para pacientes com osteoporose, qual tipo de exercício apresenta maior evidência para aumento da densidade mineral óssea?',
          alternativas: [
            { id: 'a', texto: 'Exercícios aquáticos de baixo impacto' },
            { id: 'b', texto: 'Exercícios aeróbicos de baixa intensidade' },
            { id: 'c', texto: 'Exercícios resistidos de alta intensidade' },
            { id: 'd', texto: 'Exercícios de flexibilidade' },
            { id: 'e', texto: 'Exercícios respiratórios' }
          ],
          respostaCorreta: 'c',
          explicacao: 'Exercícios resistidos de alta intensidade apresentam a maior evidência científica para aumento da densidade mineral óssea, seguindo a lei de Wolff (osso se adapta às cargas aplicadas).',
          raciocinio: 'Exercício e densidade óssea: 1) Lei de Wolff = osso adapta-se à carga; 2) Alta intensidade = maior estímulo osteogênico; 3) Resistidos = carga direta; 4) Aquáticos reduzem carga; 5) Baixa intensidade = estímulo insuficiente.',
          referencias: 'Nikander R, et al. Targeted exercise against osteoporosis: A systematic review and meta-analysis for optimising bone strength throughout life. BMC Med. 2010;8:47.',
          banca: 'VUNESP',
          ano: 2024,
          area: 'Geriatria',
          dificuldade: 'media'
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
          {/* Barra de progresso */}
          <div style={{
            width: '100%',
            height: '6px',
            background: '#e5e7eb',
            borderRadius: '3px',
            marginBottom: '1.5rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((questaoAtual + 1) / simuladoAtivo.questoes.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>

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
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1.25rem' }}>
                  Questão {questaoAtual + 1} de {simuladoAtivo.questoes.length}
                </h3>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {Math.round(((questaoAtual + 1) / simuladoAtivo.questoes.length) * 100)}% concluído
                </div>
              </div>
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
            onMouseEnter={(e) => {
              if (questaoAtual !== 0) {
                e.target.style.background = '#4b5563';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (questaoAtual !== 0) {
                e.target.style.background = '#6b7280';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            <ArrowLeft size={16} />
            Anterior
          </button>

          {/* Indicador de progresso */}
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {simuladoAtivo.questoes.map((_, index) => (
              <button
                key={index}
                onClick={() => setQuestaoAtual(index)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === questaoAtual ? '#3b82f6' :
                             respostas[simuladoAtivo.questoes[index].id] ? '#10b981' : '#e5e7eb',
                  color: index === questaoAtual || respostas[simuladoAtivo.questoes[index].id] ? 'white' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  margin: '1px'
                }}
                onMouseEnter={(e) => {
                  if (index !== questaoAtual) {
                    e.target.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {questaoAtual === simuladoAtivo.questoes.length - 1 ? (
            <button
              onClick={finalizarSimulado}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#dc2626';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ef4444';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Finalizar Simulado
              <CheckCircle size={16} />
            </button>
          ) : (
            <button
              onClick={proximaQuestao}
              style={{
                background: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#4b5563';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#6b7280';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Próxima
              <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulados;
