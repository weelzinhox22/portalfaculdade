import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
  BookOpen,
  Brain,
  Target,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import useMobile from '../hooks/useMobile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const CasosClinicos = () => {
  const isMobile = useMobile();
  const [currentCase, setCurrentCase] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [caseCompleted, setCaseCompleted] = useState({});

  const cases = [
    {
      id: 1,
      title: "DPOC com Exacerbação - Fisioterapia Respiratória",
      category: "Fisioterapia Respiratória",
      difficulty: "Avançado",
      duration: "15-20 min",
      description: `Paciente de 75 anos, sexo masculino, encaminhado ao serviço de fisioterapia 
      respiratória ambulatorial após 20 dias de internação hospitalar por exacerbação 
      do DPOC. Queixa-se de dispnéia e tosse produtiva.`,
      
      fullCase: `
        <h3>História Clínica Completa:</h3>
        <p>Paciente de 75 anos, sexo masculino, encaminhado ao serviço de fisioterapia
        respiratória ambulatorial após 20 dias de internação hospitalar por exacerbação
        do DPOC. Queixa-se de dispnéia e tosse produtiva.</p>
        
        <p>Relata que há mais de 30 dias apresentou coriza e febre, procurou o serviço médico após 5 dias
        quando já estava com tosse produtiva (além dos sintomas anteriormente citados). Relata que já teve pneumonia (2 por ano) e que foi tabagista há 30
        anos (30 cigarros por dia).</p>
        
        <p>Durante a internação hospitalar fez uso de antibioticoterapia e necessitou de ventilação mecânica durante 10 dias
        (quadro de IRAg).</p>
        
        <h4>Exame Físico:</h4>
        <ul>
          <li>Tórax em tonel</li>
          <li>Percussão timpânica em AHT</li>
          <li>Cianose</li>
          <li>Hipocratismo digital severo</li>
          <li>Diminuição da expansibilidade</li>
          <li>Padrão respiratório de predomínio torácico com tiragens de fúrcula e supra-clavicular</li>
        </ul>
        
        <h4>Sinais Vitais:</h4>
        <ul>
          <li>FR: 28 rpm</li>
          <li>Pulso: 100 bpm</li>
          <li>PAS: 130 PAD: 75 mmHg</li>
          <li>SatO2: 88% (sem oxigênio)</li>
        </ul>
        
        <h4>Ausculta Pulmonar:</h4>
        <p>Murmúrio vesicular positivo muito diminuído 2/3 inf. AHT com roncos</p>
        
        <h4>Radiografia:</h4>
        <p>Retificação das cúpulas diafragmáticas, aumento dos espaços
        intercostais, hipertransparência bilateral e mediastino estreitado.</p>
      `,
      
      questions: [
        {
          id: 1,
          question: "Qual o principal diagnóstico fisioterapêutico baseado nos achados clínicos?",
          options: [
            "Disfunção respiratória restritiva com hipoxemia",
            "Disfunção respiratória obstrutiva com hipoxemia e hipercapnia",
            "Pneumonia nosocomial com insuficiência respiratória",
            "Síndrome do desconforto respiratório agudo"
          ],
          correct: 1,
          explanation: `O diagnóstico correto é <strong>Disfunção respiratória obstrutiva com hipoxemia e hipercapnia</strong>.
          
          <h4>Justificativa científica:</h4>
          <ul>
            <li><strong>Tórax em tonel:</strong> Característico do DPOC, indica hiperinsuflação pulmonar crônica</li>
            <li><strong>Percussão timpânica:</strong> Confirma a hiperinsuflação e aprisionamento aéreo</li>
            <li><strong>Hipocratismo digital severo:</strong> Indica hipoxemia crônica prolongada</li>
            <li><strong>SatO2 88%:</strong> Confirma hipoxemia (normal >95%)</li>
            <li><strong>Padrão respiratório torácico:</strong> Compensação pela limitação diafragmática</li>
            <li><strong>Radiografia:</strong> Sinais clássicos de enfisema pulmonar</li>
          </ul>
          
          <p><strong>Referência:</strong> Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2023</p>`
        },
        {
          id: 2,
          question: "Qual a principal técnica fisioterapêutica indicada para este paciente?",
          options: [
            "Exercícios de fortalecimento muscular respiratório",
            "Técnicas de higiene brônquica e reeducação respiratória",
            "Ventilação não-invasiva imediata",
            "Mobilização precoce e exercícios aeróbicos"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Técnicas de higiene brônquica e reeducação respiratória</strong>.
          
          <h4>Justificativa:</h4>
          <ul>
            <li><strong>Tosse produtiva:</strong> Indica necessidade de remoção de secreções</li>
            <li><strong>Roncos à ausculta:</strong> Presença de secreções nas vias aéreas</li>
            <li><strong>Padrão respiratório inadequado:</strong> Necessita reeducação</li>
            <li><strong>Pós-ventilação mecânica:</strong> Comum acúmulo de secreções</li>
          </ul>
          
          <h4>Técnicas recomendadas:</h4>
          <ul>
            <li>Drenagem postural modificada</li>
            <li>Técnica de expiração forçada (TEF)</li>
            <li>Respiração diafragmática</li>
            <li>Respiração com lábios franzidos</li>
          </ul>
          
          <p><strong>Referência:</strong> Diretrizes Brasileiras de Fisioterapia Respiratória, ASSOBRAFIR 2022</p>`
        }
      ]
    },
    {
      id: 2,
      title: "Trauma com Insuficiência Respiratória - UTI",
      category: "Fisioterapia Hospitalar",
      difficulty: "Avançado",
      duration: "20-25 min",
      description: `Paciente masculino, 35 anos, vítima de acidente automobilístico com 
      capotamento, evoluiu com insuficiência respiratória e necessidade de ventilação mecânica.`,
      
      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Paciente M.F.F., sexo masculino, 35 anos, 85 kg, com história de HAS em uso de medicação contínua, 
        deu entrada na emergência após acidente automobilístico com capotamento, sendo projetado para fora do veículo.</p>
        
        <p>Evoluiu com insuficiência respiratória, necessitando de intubação orotraqueal e suporte ventilatório 
        após broncoaspiração de vômito na emergência. Foi encaminhado para UTI sedado, estável hemodinamicamente.</p>
        
        <h4>Exames de Imagem:</h4>
        <ul>
          <li><strong>TC Crânio:</strong> Edema e pequena área de HSA temporal esquerda</li>
          <li><strong>TC Tórax:</strong> Opacidade alveolar em base do pulmão direito, infiltrado difuso intersticial e atelectasia do terço médio e base pulmonar esquerda</li>
          <li><strong>TC Abdômen:</strong> Normal</li>
        </ul>
        
        <h4>Gasometria Inicial:</h4>
        <ul>
          <li>pH: 7.24</li>
          <li>PaO2: 104 mmHg</li>
          <li>PaCO2: 67 mmHg</li>
          <li>HCO3: 20 mmol/l</li>
          <li>SaO2: 87%</li>
          <li>FiO2: 80%</li>
          <li>Relação PaO2/FiO2: 130 mmHg</li>
          <li>PEEP: 12 cmH2O</li>
        </ul>
        
        <h4>Evolução:</h4>
        <p>Paciente apresentou febre de 39°C, leucopenia e piora radiológica. 
        Foi realizada manobra de recrutamento alveolar (MRA) devido à piora da relação PaO2/FiO2: 100 mmHg.</p>
      `,
      
      questions: [
        {
          id: 1,
          question: "Baseado na relação PaO2/FiO2 inicial (130 mmHg), qual a classificação da lesão pulmonar?",
          options: [
            "Lesão pulmonar aguda leve",
            "Lesão pulmonar aguda moderada", 
            "Síndrome do desconforto respiratório agudo (SDRA) leve",
            "SDRA moderada"
          ],
          correct: 2,
          explanation: `A resposta correta é <strong>SDRA leve</strong>.
          
          <h4>Classificação de Berlim para SDRA:</h4>
          <ul>
            <li><strong>SDRA Leve:</strong> 200 < PaO2/FiO2 ≤ 300 mmHg</li>
            <li><strong>SDRA Moderada:</strong> 100 < PaO2/FiO2 ≤ 200 mmHg</li>
            <li><strong>SDRA Grave:</strong> PaO2/FiO2 ≤ 100 mmHg</li>
          </ul>
          
          <p>Com PaO2/FiO2 = 130 mmHg, o paciente se enquadra na <strong>SDRA moderada</strong>. 
          A piora posterior para 100 mmHg caracteriza evolução para SDRA grave.</p>
          
          <h4>Critérios adicionais atendidos:</h4>
          <ul>
            <li>Início agudo (< 1 semana)</li>
            <li>Opacidades bilaterais na TC</li>
            <li>Edema não cardiogênico (eco normal)</li>
            <li>PEEP ≥ 5 cmH2O</li>
          </ul>
          
          <p><strong>Referência:</strong> ARDS Definition Task Force, 2012</p>`
        },
        {
          id: 2,
          question: "Qual a principal indicação para a manobra de recrutamento alveolar neste caso?",
          options: [
            "Melhorar a complacência pulmonar",
            "Reverter atelectasias e melhorar a oxigenação",
            "Reduzir a pressão de pico inspiratória",
            "Facilitar o desmame ventilatório"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Reverter atelectasias e melhorar a oxigenação</strong>.
          
          <h4>Indicações para MRA:</h4>
          <ul>
            <li><strong>Atelectasias extensas:</strong> Evidenciadas na TC de tórax</li>
            <li><strong>Hipoxemia refratária:</strong> PaO2/FiO2 < 150 mmHg</li>
            <li><strong>SDRA com colapso alveolar:</strong> Confirmado por imagem</li>
            <li><strong>Paciente estável:</strong> Hemodinamicamente compensado</li>
          </ul>
          
          <h4>Técnica utilizada - Insuflação gradual:</h4>
          <ul>
            <li><strong>Vantagens:</strong> Menor impacto hemodinâmico</li>
            <li><strong>Eficácia:</strong> Atinge vias aéreas distais</li>
            <li><strong>Segurança:</strong> Menor liberação de mediadores inflamatórios</li>
            <li><strong>Titulação de PEEP:</strong> Mantém recrutamento</li>
          </ul>
          
          <p><strong>Referência:</strong> Intensive Care Medicine, 2017; Diretrizes AMIB 2020</p>`
        }
      ]
    },
    {
      id: 3,
      title: "Dor no Ombro - Limitação de Movimento",
      category: "Fisioterapia Ortopédica",
      difficulty: "Intermediário",
      duration: "10-15 min",
      description: `Senhora de 70+ anos com limitação para elevar o braço acima de 50-60 graus
      após atividades diárias rotineiras.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Senhora de mais de 70 anos de idade, não consegue levantar braço acima de 50 ou 60 graus
        após rotina de atividades diárias (lavar louça, levar lixo para a rua).</p>

        <h4>Avaliação Fisioterapêutica:</h4>
        <ul>
          <li><strong>Inspeção:</strong> Ombro projetado anteriormente</li>
          <li><strong>Palpação:</strong> Músculos deltoides muito tensos</li>
          <li><strong>Mobilidade:</strong> Escápula mal posicionada</li>
          <li><strong>Teste específico:</strong> Retração da cápsula articular posterior</li>
          <li><strong>Amplitude de movimento:</strong> Elevação limitada a 50-60°</li>
          <li><strong>Dor:</strong> Presente durante tentativa de elevação</li>
        </ul>

        <h4>Tratamento Realizado:</h4>
        <ul>
          <li>Alongamento da região posterior da articulação</li>
          <li>Mobilização do ombro para relaxar musculatura tensa</li>
          <li>Estimulação dos músculos que controlam a escápula</li>
          <li>Reposicionamento da escápula</li>
          <li>Treinamento de elevação do braço com escápula em posição correta</li>
        </ul>

        <h4>Resultado:</h4>
        <p>Após 20 minutos de atendimento, a paciente conseguia levantar o braço
        por toda a amplitude sem qualquer dor.</p>
      `,

      questions: [
        {
          id: 1,
          question: "Qual a principal causa da limitação de movimento neste caso?",
          options: [
            "Lesão do manguito rotador",
            "Síndrome do impacto subacromial",
            "Retração da cápsula articular posterior e disfunção escapular",
            "Bursite subacromial"
          ],
          correct: 2,
          explanation: `A resposta correta é <strong>Retração da cápsula articular posterior e disfunção escapular</strong>.

          <h4>Análise do caso:</h4>
          <ul>
            <li><strong>Ombro projetado anteriormente:</strong> Indica retração posterior</li>
            <li><strong>Escápula mal posicionada:</strong> Disfunção do ritmo escápulo-umeral</li>
            <li><strong>Deltoides tenso:</strong> Compensação pela limitação articular</li>
            <li><strong>Melhora imediata:</strong> Característica de disfunção mecânica</li>
          </ul>

          <h4>Fisiopatologia:</h4>
          <p>A retração da cápsula posterior causa translação anterior da cabeça do úmero,
          limitando a elevação. A disfunção escapular compromete o ritmo escápulo-umeral normal (2:1).</p>

          <h4>Tratamento eficaz:</h4>
          <ul>
            <li><strong>Mobilização capsular:</strong> Restaura amplitude articular</li>
            <li><strong>Reeducação escapular:</strong> Corrige o padrão de movimento</li>
            <li><strong>Integração funcional:</strong> Treina movimento correto</li>
          </ul>

          <p><strong>Referência:</strong> Kisner & Colby, 2018; Magee et al., 2021</p>`
        }
      ]
    },
    {
      id: 4,
      title: "Dor no Joelho - Condromalácia Grau 4",
      category: "Fisioterapia Ortopédica",
      difficulty: "Avançado",
      duration: "12-18 min",
      description: `Mulher de 20-40 anos com condromalácia grau 4, corre sem problemas
      mas tem grande dificuldade para subir escadas.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Mulher entre 20 e 40 anos, diagnóstico médico de condromalácia grau 4.
        Apresenta um quadro aparentemente contraditório:</p>

        <h4>Sintomas Relatados:</h4>
        <ul>
          <li><strong>Corrida:</strong> Corre sem problemas, apenas leve incômodo após 10 minutos</li>
          <li><strong>Escadas:</strong> Grande dificuldade para subir escadas</li>
          <li><strong>Dor:</strong> Principalmente ao subir escadas</li>
        </ul>

        <h4>Avaliação Biomecânica:</h4>
        <ul>
          <li><strong>Observação funcional:</strong> Ao subir escadas, joelho caía para dentro (valgo)</li>
          <li><strong>Padrão de movimento:</strong> Disfunção do controle neuromuscular</li>
          <li><strong>Estabilização:</strong> Déficit de estabilização dinâmica</li>
        </ul>

        <h4>Tratamento Aplicado:</h4>
        <ul>
          <li>Técnicas de facilitação neuromuscular proprioceptiva (FNP)</li>
          <li>Paciente em pé com pé apoiado no degrau</li>
          <li>Orientação sobre posicionamento correto do joelho</li>
          <li>Orientação sobre contração muscular adequada</li>
          <li>Exercícios de estabilização e reequilíbrio muscular</li>
        </ul>

        <h4>Evolução:</h4>
        <ul>
          <li><strong>2ª sessão:</strong> Paciente sem dor (escadas e corrida)</li>
          <li><strong>Continuidade:</strong> Mesmas condutas + exercícios específicos</li>
          <li><strong>Alta:</strong> 6ª sessão</li>
        </ul>
      `,

      questions: [
        {
          id: 1,
          question: "Por que a paciente consegue correr sem dor, mas tem dificuldade nas escadas?",
          options: [
            "A corrida é menos impactante que subir escadas",
            "As demandas biomecânicas são diferentes: corrida é sagital, escadas exigem controle frontal",
            "A condromalácia só afeta movimentos lentos",
            "É uma contradição que não tem explicação científica"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>As demandas biomecânicas são diferentes: corrida é sagital, escadas exigem controle frontal</strong>.

          <h4>Análise biomecânica:</h4>

          <h5>Corrida (Plano Sagital):</h5>
          <ul>
            <li><strong>Movimento:</strong> Predominantemente flexão-extensão</li>
            <li><strong>Carga:</strong> Distribuída uniformemente na patela</li>
            <li><strong>Velocidade:</strong> Movimento rápido, menor tempo de contato</li>
            <li><strong>Padrão:</strong> Automático, menos controle consciente necessário</li>
          </ul>

          <h5>Subir Escadas (Controle Multiplanar):</h5>
          <ul>
            <li><strong>Movimento:</strong> Exige controle nos 3 planos</li>
            <li><strong>Valgo dinâmico:</strong> Aumenta pressão lateral na patela</li>
            <li><strong>Carga:</strong> Concentrada em áreas específicas da cartilagem</li>
            <li><strong>Controle:</strong> Requer estabilização ativa do quadril/joelho</li>
          </ul>

          <h4>Condromalácia Grau 4:</h4>
          <p>Lesão severa da cartilagem que se torna sintomática quando há
          concentração de carga em áreas específicas (valgo dinâmico).</p>

          <p><strong>Referência:</strong> Powers et al., 2017; Crossley et al., 2016</p>`
        },
        {
          id: 2,
          question: "Qual o principal mecanismo de ação da facilitação neuromuscular proprioceptiva (FNP) neste caso?",
          options: [
            "Fortalecimento dos músculos do quadríceps",
            "Reeducação do controle motor e estabilização dinâmica",
            "Redução da inflamação articular",
            "Melhora da flexibilidade muscular"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Reeducação do controle motor e estabilização dinâmica</strong>.

          <h4>Mecanismo da FNP:</h4>
          <ul>
            <li><strong>Facilitação neural:</strong> Ativa padrões motores corretos</li>
            <li><strong>Propriocepção:</strong> Melhora consciência corporal</li>
            <li><strong>Controle motor:</strong> Treina sequência de ativação muscular</li>
            <li><strong>Estabilização dinâmica:</strong> Coordenação entre músculos</li>
          </ul>

          <h4>Aplicação específica:</h4>
          <ul>
            <li><strong>Posição funcional:</strong> Pé no degrau simula a atividade</li>
            <li><strong>Correção do valgo:</strong> Ativa glúteo médio e vasto medial</li>
            <li><strong>Padrão correto:</strong> Integra quadril-joelho-tornozelo</li>
            <li><strong>Automatização:</strong> Torna o movimento inconsciente</li>
          </ul>

          <h4>Por que foi eficaz:</h4>
          <p>O problema não era estrutural (cartilagem), mas funcional (controle motor).
          A FNP corrigiu o padrão de movimento disfuncional, eliminando a sobrecarga
          patelo-femoral lateral.</p>

          <p><strong>Referência:</strong> Adler et al., 2014; Kabat, 1961</p>`
        }
      ]
    },
    {
      id: 5,
      title: "Dor Lombar - Fixação Vertebral L5",
      category: "Fisioterapia Ortopédica",
      difficulty: "Intermediário",
      duration: "8-12 min",
      description: `Senhora de 70+ anos com dor lombar à direita, centro em L5-S1,
      impedindo atividades de ginástica e pilates.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Senhora de mais de 70 anos com dor e incômodo na coluna lombar,
        maior à direita, com centro na região de L5-S1 (parte baixa da coluna lombar).</p>

        <h4>Limitações Funcionais:</h4>
        <ul>
          <li><strong>Atividades impedidas:</strong> Ginástica e pilates</li>
          <li><strong>Dor:</strong> Localizada em L5-S1, predominantemente à direita</li>
          <li><strong>Padrão:</strong> Dor mecânica, relacionada ao movimento</li>
        </ul>

        <h4>Primeira Avaliação:</h4>
        <ul>
          <li><strong>Achado:</strong> Fixação da vértebra L5 no movimento de rotação</li>
          <li><strong>Teste específico:</strong> Limitação da rotação segmentar</li>
          <li><strong>Tratamento:</strong> Técnica de liberação articular</li>
          <li><strong>Resultado imediato:</strong> Paciente relatou melhora</li>
        </ul>

        <h4>Retorno (3 dias depois):</h4>
        <ul>
          <li><strong>Evolução:</strong> Dor e incômodo melhores, mas ainda presentes</li>
          <li><strong>Nova avaliação:</strong> Fixação de L5 para inclinação lateral</li>
          <li><strong>Tratamento:</strong> Liberação articular para inclinação lateral</li>
          <li><strong>Resultado:</strong> Dor e incômodo eliminados</li>
        </ul>

        <h4>Desfecho:</h4>
        <p>A paciente pôde retornar às suas atividades (ginástica e pilates) plenamente.</p>
      `,

      questions: [
        {
          id: 1,
          question: "Por que foi necessário um segundo tratamento com abordagem diferente?",
          options: [
            "O primeiro tratamento foi ineficaz",
            "Havia múltiplas fixações articulares em planos de movimento diferentes",
            "A paciente não seguiu as orientações corretamente",
            "Era necessário mais tempo para a primeira técnica fazer efeito"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Havia múltiplas fixações articulares em planos de movimento diferentes</strong>.

          <h4>Conceito de Fixação Segmentar:</h4>
          <ul>
            <li><strong>Movimento tridimensional:</strong> Vértebras se movem em 3 planos</li>
            <li><strong>Fixações específicas:</strong> Podem ocorrer em planos isolados</li>
            <li><strong>Compensação:</strong> Outros planos podem manter mobilidade</li>
          </ul>

          <h4>Planos de Movimento Vertebral:</h4>
          <ul>
            <li><strong>Sagital:</strong> Flexão-extensão</li>
            <li><strong>Frontal:</strong> Inclinação lateral</li>
            <li><strong>Transverso:</strong> Rotação</li>
          </ul>

          <h4>Progressão do Caso:</h4>
          <ul>
            <li><strong>1ª sessão:</strong> Liberou fixação em rotação</li>
            <li><strong>Melhora parcial:</strong> Outros planos ainda limitados</li>
            <li><strong>2ª sessão:</strong> Liberou fixação em inclinação lateral</li>
            <li><strong>Resolução completa:</strong> Todos os planos livres</li>
          </ul>

          <h4>Princípio Biomecânico:</h4>
          <p>A função vertebral normal requer mobilidade em todos os planos.
          Fixações residuais podem manter sintomas mesmo após melhora parcial.</p>

          <p><strong>Referência:</strong> Maitland et al., 2019; Kaltenborn, 2018</p>`
        }
      ]
    },
    {
      id: 6,
      title: "Fasciíte Plantar - Abordagem Miofascial",
      category: "Fisioterapia Ortopédica",
      difficulty: "Intermediário",
      duration: "10-15 min",
      description: `Paciente de 25-45 anos com fasciíte plantar que não respondeu
      a 10 sessões de tratamento convencional.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Paciente entre 25 e 45 anos, diagnóstico médico de fasciíte plantar.
        Havia realizado cerca de 10 sessões de tratamento fisioterapêutico anterior
        sem qualquer alteração da dor.</p>

        <h4>Avaliação Fisioterapêutica:</h4>
        <ul>
          <li><strong>Déficit de mobilidade:</strong> Calcanhar com mobilidade reduzida</li>
          <li><strong>Tensão muscular:</strong> Excessiva tensão dos músculos da perna</li>
          <li><strong>Encurtamento:</strong> Fáscia plantar encurtada</li>
          <li><strong>Disfunção biomecânica:</strong> Alteração da mobilidade do calcanhar durante movimento</li>
        </ul>

        <h4>Tratamento Aplicado:</h4>
        <ul>
          <li><strong>Liberação miofascial:</strong> Musculatura da perna</li>
          <li><strong>Alongamento específico:</strong> Fáscia plantar</li>
          <li><strong>Mobilização articular:</strong> Aumento da mobilidade do calcanhar</li>
          <li><strong>Taping:</strong> Aplicação de fita adesiva para adequar mobilidade durante movimento</li>
        </ul>

        <h4>Resultado:</h4>
        <ul>
          <li><strong>Imediato:</strong> Paciente saiu da sessão sem dor</li>
          <li><strong>2ª sessão:</strong> Alta médica</li>
          <li><strong>Seguimento:</strong> Sem recidiva</li>
        </ul>
      `,

      questions: [
        {
          id: 1,
          question: "Por que o tratamento anterior de 10 sessões não foi eficaz?",
          options: [
            "A fasciíte plantar é uma condição incurável",
            "O tratamento anterior não abordou as causas biomecânicas da disfunção",
            "O paciente não colaborou adequadamente",
            "Era necessário mais tempo de tratamento"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>O tratamento anterior não abordou as causas biomecânicas da disfunção</strong>.

          <h4>Abordagem Tradicional vs. Biomecânica:</h4>

          <h5>Tratamento Tradicional (Ineficaz):</h5>
          <ul>
            <li><strong>Foco:</strong> Sintoma local (dor no calcanhar)</li>
            <li><strong>Métodos:</strong> Anti-inflamatórios, gelo, repouso</li>
            <li><strong>Limitação:</strong> Não corrige a causa biomecânica</li>
          </ul>

          <h5>Abordagem Biomecânica (Eficaz):</h5>
          <ul>
            <li><strong>Foco:</strong> Cadeia cinética completa</li>
            <li><strong>Avaliação:</strong> Mobilidade do calcanhar</li>
            <li><strong>Tratamento:</strong> Corrige disfunções proximais</li>
          </ul>

          <h4>Fisiopatologia da Fasciíte Plantar:</h4>
          <ul>
            <li><strong>Causa primária:</strong> Disfunção da mobilidade do calcanhar</li>
            <li><strong>Compensação:</strong> Sobrecarga da fáscia plantar</li>
            <li><strong>Perpetuação:</strong> Tensão muscular da perna</li>
          </ul>

          <h4>Por que o tratamento foi eficaz:</h4>
          <ul>
            <li><strong>Liberação miofascial:</strong> Reduziu tensão proximal</li>
            <li><strong>Mobilização:</strong> Restaurou função do calcanhar</li>
            <li><strong>Taping:</strong> Manteve correção durante movimento</li>
          </ul>

          <p><strong>Referência:</strong> Bolívar et al., 2013; Martin et al., 2014</p>`
        }
      ]
    },
    {
      id: 7,
      title: "Dor Cervical com Comprometimento Vascular",
      category: "Fisioterapia Neurológica",
      difficulty: "Avançado",
      duration: "15-20 min",
      description: `Mulher de 20-40 anos com dor cervical há mais de 1 ano e sinais
      de comprometimento da circulação cerebral.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Mulher entre 20 e 40 anos com dor cervical há mais de 1 ano.
        Caso apresentou complicações que exigiram abordagem multidisciplinar.</p>

        <h4>Avaliação Inicial:</h4>
        <ul>
          <li><strong>Queixa principal:</strong> Dor cervical crônica (> 1 ano)</li>
          <li><strong>Áreas associadas:</strong> Dor na ATM e ombro direito</li>
          <li><strong>Teste de segurança:</strong> Pressão leve em vértebra cervical</li>
          <li><strong>Sinal de alerta:</strong> Sensação de "nuvem nos olhos" (imagem fechando)</li>
        </ul>

        <h4>Interpretação do Sinal de Alerta:</h4>
        <ul>
          <li><strong>Significado clínico:</strong> Possível diminuição da circulação cerebral</li>
          <li><strong>Mecanismo:</strong> Compressão de artérias vertebrais</li>
          <li><strong>Contraindicação:</strong> Manipulação cervical</li>
          <li><strong>Conduta:</strong> Encaminhamento médico urgente</li>
        </ul>

        <h4>Tratamento das Áreas Seguras:</h4>

        <h5>Articulação Têmporo-Mandibular:</h5>
        <ul>
          <li><strong>Achado:</strong> Movimento excessivo à direita na abertura</li>
          <li><strong>Tratamento:</strong> Reposicionamento articular</li>
          <li><strong>Resultado:</strong> Abertura da boca sem dor</li>
        </ul>

        <h5>Ombro Direito:</h5>
        <ul>
          <li><strong>Achado:</strong> Escápula não se movia coordenadamente</li>
          <li><strong>Tratamento:</strong> Facilitação do movimento escapular</li>
          <li><strong>Resultado:</strong> Elevação do braço sem dor</li>
        </ul>
      `,

      questions: [
        {
          id: 1,
          question: "Qual a interpretação correta do sinal de 'nuvem nos olhos' durante a palpação cervical?",
          options: [
            "Reação normal de ansiedade da paciente",
            "Sinal de comprometimento da circulação cerebral - contraindicação absoluta",
            "Indicação para manipulação mais suave",
            "Sinal de tensão muscular excessiva"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Sinal de comprometimento da circulação cerebral - contraindicação absoluta</strong>.

          <h4>Anatomia das Artérias Vertebrais:</h4>
          <ul>
            <li><strong>Trajeto:</strong> Passam pelos forames transversos de C6-C1</li>
            <li><strong>Função:</strong> Irrigam tronco cerebral e cerebelo</li>
            <li><strong>Vulnerabilidade:</strong> Podem ser comprimidas por disfunções cervicais</li>
          </ul>

          <h4>Sinais de Insuficiência Vertebrobasilar:</h4>
          <ul>
            <li><strong>Visuais:</strong> Visão turva, diplopia, escotomas</li>
            <li><strong>Vestibulares:</strong> Tontura, vertigem, nistagmo</li>
            <li><strong>Neurológicos:</strong> Ataxia, disartria, disfagia</li>
            <li><strong>Outros:</strong> Náusea, cefaleia occipital</li>
          </ul>

          <h4>Teste de Segurança Cervical:</h4>
          <ul>
            <li><strong>Objetivo:</strong> Detectar comprometimento vascular</li>
            <li><strong>Método:</strong> Pressão suave + movimentos cervicais</li>
            <li><strong>Positivo:</strong> Qualquer sintoma neurológico</li>
            <li><strong>Conduta:</strong> Interrupção imediata + encaminhamento</li>
          </ul>

          <h4>Importância da Conduta:</h4>
          <p>A manipulação cervical na presença de comprometimento vascular
          pode causar AVC ou outras complicações neurológicas graves.</p>

          <p><strong>Referência:</strong> Kerry & Taylor, 2006; Rushton et al., 2014</p>`
        },
        {
          id: 2,
          question: "Por que foi possível tratar a ATM e o ombro, mas não a cervical?",
          options: [
            "A ATM e ombro não têm relação com a circulação cerebral",
            "O tratamento da ATM e ombro não envolve manipulação de alto risco",
            "A dor nessas regiões era menos intensa",
            "Era apenas uma questão de preferência do fisioterapeuta"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>O tratamento da ATM e ombro não envolve manipulação de alto risco</strong>.

          <h4>Anatomia de Segurança:</h4>

          <h5>ATM (Articulação Têmporo-Mandibular):</h5>
          <ul>
            <li><strong>Localização:</strong> Distante das artérias vertebrais</li>
            <li><strong>Técnicas:</strong> Reposicionamento suave, sem thrust</li>
            <li><strong>Risco:</strong> Mínimo para circulação cerebral</li>
          </ul>

          <h5>Ombro/Escápula:</h5>
          <ul>
            <li><strong>Região:</strong> Não envolve coluna cervical</li>
            <li><strong>Técnicas:</strong> Facilitação muscular, mobilização</li>
            <li><strong>Segurança:</strong> Sem risco vascular</li>
          </ul>

          <h5>Coluna Cervical:</h5>
          <ul>
            <li><strong>Risco:</strong> Artérias vertebrais vulneráveis</li>
            <li><strong>Contraindicação:</strong> Sinais de insuficiência vascular</li>
            <li><strong>Consequências:</strong> AVC, lesão neurológica</li>
          </ul>

          <h4>Princípio de Segurança:</h4>
          <p>"Primum non nocere" - Primeiro, não causar dano.
          O fisioterapeuta pode tratar áreas seguras enquanto
          encaminha para investigação médica das áreas de risco.</p>

          <h4>Abordagem Multidisciplinar:</h4>
          <ul>
            <li><strong>Fisioterapia:</strong> Trata áreas seguras</li>
            <li><strong>Medicina:</strong> Investiga comprometimento vascular</li>
            <li><strong>Integração:</strong> Plano de tratamento conjunto</li>
          </ul>

          <p><strong>Referência:</strong> IFOMPT Standards, 2016; WCPT Guidelines, 2019</p>`
        }
      ]
    },
    {
      id: 8,
      title: "Dor Lombar - Instabilidade Segmentar",
      category: "Fisioterapia Ortopédica",
      difficulty: "Avançado",
      duration: "15-20 min",
      description: `Mulher de 15-30 anos com dor lombar inespecífica, maior do lado direito,
      com excesso de mobilidade vertebral.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Mulher entre 15 e 30 anos, dor em coluna lombar pouco específica,
        maior do lado direito. Caso desafiador com testes específicos inconclusivos.</p>

        <h4>Características da Dor:</h4>
        <ul>
          <li><strong>Localização:</strong> Coluna lombar, predominantemente à direita</li>
          <li><strong>Padrão:</strong> Dor inespecífica, difícil localização</li>
          <li><strong>Horário:</strong> Aparecia durante o dia ou ao deitar à noite</li>
          <li><strong>Testes específicos:</strong> Não conseguiram identificar origem</li>
        </ul>

        <h4>Avaliação Fisioterapêutica:</h4>
        <ul>
          <li><strong>Mobilidade:</strong> Excesso de mobilidade das vértebras lombares</li>
          <li><strong>Estabilidade:</strong> Falta de estabilidade na região</li>
          <li><strong>Controle motor:</strong> Déficit de controle do posicionamento da bacia</li>
          <li><strong>Musculatura:</strong> Desequilíbrio entre músculos superficiais e profundos</li>
        </ul>

        <h4>Tratamento Aplicado:</h4>
        <ul>
          <li><strong>Programa de estabilização:</strong> Exercícios específicos para coluna</li>
          <li><strong>Ativação muscular:</strong> Equilíbrio entre musculatura superficial e profunda</li>
          <li><strong>Controle motor:</strong> Treinamento do controle adequado do movimento</li>
          <li><strong>Frequência:</strong> 1 sessão por semana em sistema de acompanhamento</li>
        </ul>

        <h4>Evolução:</h4>
        <ul>
          <li><strong>3ª sessão:</strong> Paciente sem dor, sono melhorado</li>
          <li><strong>Retorno às atividades:</strong> Voltou às atividades físicas sem limitações</li>
          <li><strong>Seguimento:</strong> Sem recidiva</li>
        </ul>
      `,

      questions: [
        {
          id: 1,
          question: "Por que os testes específicos não conseguiram identificar a origem da dor?",
          options: [
            "Os testes foram mal executados",
            "A dor era de origem psicossomática",
            "Tratava-se de instabilidade segmentar, não de lesão estrutural específica",
            "Era necessário fazer exames de imagem"
          ],
          correct: 2,
          explanation: `A resposta correta é <strong>Tratava-se de instabilidade segmentar, não de lesão estrutural específica</strong>.

          <h4>Conceito de Instabilidade Segmentar:</h4>
          <ul>
            <li><strong>Definição:</strong> Perda do controle neuromuscular da coluna</li>
            <li><strong>Característica:</strong> Excesso de movimento sem controle adequado</li>
            <li><strong>Sintomas:</strong> Dor inespecífica, difícil localização</li>
            <li><strong>Testes:</strong> Negativos para lesões estruturais específicas</li>
          </ul>

          <h4>Por que os testes específicos falham:</h4>
          <ul>
            <li><strong>Testes ortopédicos:</strong> Detectam lesões estruturais específicas</li>
            <li><strong>Instabilidade:</strong> É uma disfunção do controle motor</li>
            <li><strong>Movimento passivo:</strong> Pode ser normal nos testes</li>
            <li><strong>Problema funcional:</strong> Aparece durante atividades dinâmicas</li>
          </ul>

          <h4>Sinais de Instabilidade:</h4>
          <ul>
            <li><strong>Dor inespecífica:</strong> Difícil de localizar precisamente</li>
            <li><strong>Padrão temporal:</strong> Piora com atividades prolongadas</li>
            <li><strong>Hipermobilidade:</strong> Excesso de movimento segmentar</li>
            <li><strong>Déficit de controle:</strong> Incapacidade de estabilizar</li>
          </ul>

          <h4>Diagnóstico diferencial:</h4>
          <p>A instabilidade segmentar requer avaliação do controle motor
          e estabilidade dinâmica, não apenas testes de estruturas passivas.</p>

          <p><strong>Referência:</strong> Panjabi, 1992; O'Sullivan, 2005</p>`
        },
        {
          id: 2,
          question: "Qual o princípio do programa de estabilização aplicado?",
          options: [
            "Fortalecimento geral da musculatura lombar",
            "Reequilíbrio entre musculatura superficial e profunda com controle motor",
            "Alongamento da musculatura encurtada",
            "Mobilização das articulações rígidas"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Reequilíbrio entre musculatura superficial e profunda com controle motor</strong>.

          <h4>Sistema de Estabilização Vertebral:</h4>

          <h5>Músculos Profundos (Sistema Local):</h5>
          <ul>
            <li><strong>Multífidos:</strong> Controle segmentar específico</li>
            <li><strong>Transverso do abdômen:</strong> Estabilização central</li>
            <li><strong>Diafragma:</strong> Pressão intra-abdominal</li>
            <li><strong>Assoalho pélvico:</strong> Suporte da base</li>
          </ul>

          <h5>Músculos Superficiais (Sistema Global):</h5>
          <ul>
            <li><strong>Reto abdominal:</strong> Flexão do tronco</li>
            <li><strong>Oblíquos:</strong> Rotação e inclinação</li>
            <li><strong>Eretor da espinha:</strong> Extensão</li>
            <li><strong>Quadrado lombar:</strong> Inclinação lateral</li>
          </ul>

          <h4>Disfunção na Instabilidade:</h4>
          <ul>
            <li><strong>Músculos profundos:</strong> Inibidos, atrasados</li>
            <li><strong>Músculos superficiais:</strong> Hiperativados, compensatórios</li>
            <li><strong>Coordenação:</strong> Perda da sinergia normal</li>
            <li><strong>Controle motor:</strong> Padrões inadequados</li>
          </ul>

          <h4>Princípios do Tratamento:</h4>
          <ul>
            <li><strong>1ª fase:</strong> Ativação dos músculos profundos</li>
            <li><strong>2ª fase:</strong> Integração com superficiais</li>
            <li><strong>3ª fase:</strong> Controle em atividades funcionais</li>
            <li><strong>4ª fase:</strong> Automatização dos padrões</li>
          </ul>

          <p><strong>Referência:</strong> Richardson et al., 2004; Hodges & Moseley, 2003</p>`
        }
      ]
    },
    {
      id: 9,
      title: "Dor Torácica - Manipulação Vertebral",
      category: "Fisioterapia Ortopédica",
      difficulty: "Básico",
      duration: "5-8 min",
      description: `Mulher de 20-40 anos com dor torácica de baixa intensidade,
      mas incômoda, especialmente aos movimentos.`,

      fullCase: `
        <h3>Apresentação do Caso:</h3>
        <p>Mulher entre 20 e 40 anos, realizava fisioterapia para tratamento
        ortopédico de pé, mas referiu estar com dor na coluna torácica.</p>

        <h4>Características da Dor:</h4>
        <ul>
          <li><strong>Intensidade:</strong> Baixa intensidade, mas incômoda</li>
          <li><strong>Padrão:</strong> Dor mecânica relacionada ao movimento</li>
          <li><strong>Movimentos afetados:</strong> Inclinação lateral e extensão</li>
          <li><strong>Frequência:</strong> Incômodo durante a maior parte do tempo</li>
        </ul>

        <h4>Avaliação Específica:</h4>
        <ul>
          <li><strong>Mobilidade:</strong> Limitação específica da coluna torácica</li>
          <li><strong>Testes de movimento:</strong> Dor à inclinação lateral e extensão</li>
          <li><strong>Palpação:</strong> Tensão e fixação segmentar</li>
          <li><strong>Postura:</strong> Alterações da curvatura torácica</li>
        </ul>

        <h4>Tratamento Aplicado:</h4>
        <ul>
          <li><strong>Técnica:</strong> Manipulação da coluna torácica</li>
          <li><strong>Tipo:</strong> Thrust de alta velocidade e baixa amplitude</li>
          <li><strong>Sessões:</strong> Sessão única</li>
        </ul>

        <h4>Resultado:</h4>
        <p>Após a manipulação, não houve mais dor. Resolução completa e imediata.</p>
      `,

      questions: [
        {
          id: 1,
          question: "Por que uma única manipulação foi suficiente para resolver o problema?",
          options: [
            "A dor era psicológica",
            "Era uma fixação articular simples sem componente inflamatório",
            "A paciente tinha alta capacidade de cicatrização",
            "Foi apenas um efeito placebo"
          ],
          correct: 1,
          explanation: `A resposta correta é <strong>Era uma fixação articular simples sem componente inflamatório</strong>.

          <h4>Conceito de Fixação Articular:</h4>
          <ul>
            <li><strong>Definição:</strong> Perda de mobilidade articular específica</li>
            <li><strong>Causa:</strong> Disfunção mecânica, não lesão estrutural</li>
            <li><strong>Característica:</strong> Reversível com mobilização adequada</li>
            <li><strong>Sintomas:</strong> Dor mecânica, limitação de movimento</li>
          </ul>

          <h4>Indicações para Manipulação:</h4>
          <ul>
            <li><strong>Fixação articular:</strong> Hipomobilidade específica</li>
            <li><strong>Dor mecânica:</strong> Relacionada ao movimento</li>
            <li><strong>Ausência de inflamação:</strong> Sem sinais flogísticos</li>
            <li><strong>Início recente:</strong> Sem cronificação</li>
          </ul>

          <h4>Mecanismo de Ação:</h4>
          <ul>
            <li><strong>Mecânico:</strong> Restaura mobilidade articular</li>
            <li><strong>Neurológico:</strong> Inibe dor via gate control</li>
            <li><strong>Reflexo:</strong> Relaxamento muscular reflexo</li>
            <li><strong>Proprioceptivo:</strong> Normaliza input sensorial</li>
          </ul>

          <h4>Por que foi eficaz:</h4>
          <ul>
            <li><strong>Problema mecânico:</strong> Correção imediata possível</li>
            <li><strong>Sem inflamação:</strong> Não há processo de cicatrização</li>
            <li><strong>Técnica adequada:</strong> Thrust específico e preciso</li>
            <li><strong>Timing correto:</strong> Intervenção precoce</li>
          </ul>

          <h4>Coluna Torácica:</h4>
          <p>Região com alta incidência de fixações articulares devido à
          biomecânica complexa e múltiplas articulações (costovertebrais).</p>

          <p><strong>Referência:</strong> Maitland et al., 2019; Bialosky et al., 2009</p>`
        }
      ]
    }
  ];

  const handleAnswerSelect = (caseId, questionId, selectedOption) => {
    setUserAnswers(prev => ({
      ...prev,
      [`${caseId}-${questionId}`]: selectedOption
    }));
  };

  const handleSubmitAnswer = (caseId, questionId) => {
    setShowResults(prev => ({
      ...prev,
      [`${caseId}-${questionId}`]: true
    }));
  };

  const isAnswerCorrect = (caseId, questionId, selectedOption) => {
    const question = cases.find(c => c.id === caseId)?.questions.find(q => q.id === questionId);
    return question && selectedOption === question.correct;
  };

  const getCaseProgress = (caseId) => {
    const case_ = cases.find(c => c.id === caseId);
    if (!case_) return 0;
    
    const totalQuestions = case_.questions.length;
    const answeredQuestions = case_.questions.filter(q => 
      showResults[`${caseId}-${q.id}`]
    ).length;
    
    return (answeredQuestions / totalQuestions) * 100;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCase]);

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        paddingTop: '6rem'
      }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        color: 'white',
        padding: isMobile ? '3rem 0' : '4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '100%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          transform: 'rotate(30deg)'
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
              }}>
                <FileText size={40} color="white" />
              </div>
            </div>

            <h1 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Casos Clínicos Interativos
            </h1>

            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              color: '#cbd5e1',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Desenvolva seu raciocínio clínico com casos reais da fisioterapia. 
              Analise, diagnostique e aprenda com explicações baseadas em evidências científicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases Navigation */}
      <section style={{
        padding: '3rem 0',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem'
          }}>
            {cases.map((case_, index) => (
              <motion.div
                key={case_.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentCase(index)}
                style={{
                  minWidth: isMobile ? '280px' : '320px',
                  background: currentCase === index
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: currentCase === index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: '700'
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.75rem',
                      opacity: 0.8,
                      marginBottom: '0.25rem'
                    }}>
                      {case_.category}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {case_.difficulty} • {case_.duration}
                    </div>
                  </div>
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3'
                }}>
                  {case_.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  lineHeight: '1.4',
                  marginBottom: '1rem'
                }}>
                  {case_.description}
                </p>

                {/* Progress Bar */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  height: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: currentCase === index ? 'white' : '#10b981',
                    height: '100%',
                    width: `${getCaseProgress(case_.id)}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Case Content */}
      <section style={{
        padding: '4rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {cases[currentCase] && (
            <motion.div
              key={currentCase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Case Header */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '2rem',
                padding: isMobile ? '2rem 1.5rem' : '3rem',
                marginBottom: '3rem',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {cases[currentCase].category}
                  </div>
                  <div style={{
                    background: '#fbbf24',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {cases[currentCase].difficulty}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#64748b',
                    fontSize: '0.875rem'
                  }}>
                    <Clock size={16} />
                    {cases[currentCase].duration}
                  </div>
                </div>

                <h2 style={{
                  fontSize: isMobile ? '1.5rem' : '2rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '1rem'
                }}>
                  {cases[currentCase].title}
                </h2>

                <div
                  style={{
                    color: '#475569',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}
                  dangerouslySetInnerHTML={{ __html: cases[currentCase].fullCase }}
                />
              </div>

              {/* Questions */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem'
              }}>
                {cases[currentCase].questions.map((question, qIndex) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: qIndex * 0.1 }}
                    style={{
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      borderRadius: '2rem',
                      padding: isMobile ? '2rem 1.5rem' : '3rem',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: '700'
                      }}>
                        {qIndex + 1}
                      </div>
                      <h3 style={{
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0
                      }}>
                        Questão {qIndex + 1}
                      </h3>
                    </div>

                    <p style={{
                      fontSize: '1.1rem',
                      color: '#374151',
                      lineHeight: '1.6',
                      marginBottom: '2rem',
                      fontWeight: '500'
                    }}>
                      {question.question}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {question.options.map((option, optIndex) => {
                        const isSelected = userAnswers[`${cases[currentCase].id}-${question.id}`] === optIndex;
                        const isCorrect = optIndex === question.correct;
                        const showResult = showResults[`${cases[currentCase].id}-${question.id}`];

                        return (
                          <motion.button
                            key={optIndex}
                            whileHover={{ scale: showResult ? 1 : 1.02 }}
                            whileTap={{ scale: showResult ? 1 : 0.98 }}
                            onClick={() => !showResult && handleAnswerSelect(cases[currentCase].id, question.id, optIndex)}
                            disabled={showResult}
                            style={{
                              background: showResult
                                ? (isCorrect ? '#f0fdf4' : isSelected ? '#fef2f2' : '#f9fafb')
                                : isSelected ? '#eff6ff' : '#f9fafb',
                              border: showResult
                                ? (isCorrect ? '2px solid #22c55e' : isSelected ? '2px solid #ef4444' : '1px solid #e5e7eb')
                                : isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                              borderRadius: '1rem',
                              padding: '1.25rem',
                              textAlign: 'left',
                              cursor: showResult ? 'default' : 'pointer',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              fontSize: '1rem',
                              color: showResult
                                ? (isCorrect ? '#166534' : isSelected ? '#dc2626' : '#374151')
                                : '#374151'
                            }}
                          >
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: showResult
                                ? (isCorrect ? '#22c55e' : isSelected ? '#ef4444' : '#d1d5db')
                                : isSelected ? '#3b82f6' : '#d1d5db',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              flexShrink: 0
                            }}>
                              {showResult ? (
                                isCorrect ? <CheckCircle size={16} /> :
                                isSelected ? <XCircle size={16} /> :
                                String.fromCharCode(65 + optIndex)
                              ) : (
                                String.fromCharCode(65 + optIndex)
                              )}
                            </div>
                            <span style={{ flex: 1 }}>{option}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {!showResults[`${cases[currentCase].id}-${question.id}`] &&
                     userAnswers[`${cases[currentCase].id}-${question.id}`] !== undefined && (
                      <button
                        onClick={() => handleSubmitAnswer(cases[currentCase].id, question.id)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <Target size={20} />
                        Verificar Resposta
                      </button>
                    )}

                    {showResults[`${cases[currentCase].id}-${question.id}`] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          background: isAnswerCorrect(cases[currentCase].id, question.id, userAnswers[`${cases[currentCase].id}-${question.id}`])
                            ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                            : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                          border: isAnswerCorrect(cases[currentCase].id, question.id, userAnswers[`${cases[currentCase].id}-${question.id}`])
                            ? '1px solid #bbf7d0'
                            : '1px solid #fecaca',
                          borderRadius: '1.5rem',
                          padding: '2rem',
                          marginTop: '2rem'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1.5rem'
                        }}>
                          {isAnswerCorrect(cases[currentCase].id, question.id, userAnswers[`${cases[currentCase].id}-${question.id}`]) ? (
                            <CheckCircle size={24} color="#22c55e" />
                          ) : (
                            <AlertCircle size={24} color="#ef4444" />
                          )}
                          <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: isAnswerCorrect(cases[currentCase].id, question.id, userAnswers[`${cases[currentCase].id}-${question.id}`])
                              ? '#166534'
                              : '#dc2626',
                            margin: 0
                          }}>
                            {isAnswerCorrect(cases[currentCase].id, question.id, userAnswers[`${cases[currentCase].id}-${question.id}`])
                              ? 'Resposta Correta!'
                              : 'Resposta Incorreta'}
                          </h4>
                        </div>

                        <div
                          style={{
                            color: isAnswerCorrect(cases[currentCase].id, question.id, userAnswers[`${cases[currentCase].id}-${question.id}`])
                              ? '#166534'
                              : '#dc2626',
                            lineHeight: '1.6',
                            fontSize: '1rem'
                          }}
                          dangerouslySetInnerHTML={{ __html: question.explanation }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '4rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '2rem'
              }}>
                <button
                  onClick={() => setCurrentCase(Math.max(0, currentCase - 1))}
                  disabled={currentCase === 0}
                  style={{
                    background: currentCase === 0 ? '#9ca3af' : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: currentCase === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: currentCase === 0 ? 0.5 : 1
                  }}
                >
                  <ArrowLeft size={20} />
                  Caso Anterior
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#64748b',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  <Brain size={16} />
                  {currentCase + 1} de {cases.length}
                </div>

                <button
                  onClick={() => setCurrentCase(Math.min(cases.length - 1, currentCase + 1))}
                  disabled={currentCase === cases.length - 1}
                  style={{
                    background: currentCase === cases.length - 1 ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: currentCase === cases.length - 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: currentCase === cases.length - 1 ? 0.5 : 1
                  }}
                >
                  Próximo Caso
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>

    <Newsletter />
    <Footer />
    </>
  );
};

export default CasosClinicos;
