import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

const Neuropatia = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [activeTab, setActiveTab] = useState('pds');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado para as ferramentas de estudo
  const [chatMessages, setChatMessages] = useState<Array<{type: 'sent' | 'received', text: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Google Gemini API key
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    initializeChart();
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const initializeChart = () => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Polineuropatia Simétrica Distal', 'Neuropatia Autonômica', 'Radiculoplexopatia', 'Mononeuropatia'],
            datasets: [{
              data: [60, 25, 10, 5],
              backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  usePointStyle: true
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.label + ': ' + context.parsed + '%';
                  }
                }
              }
            }
          }
        });
      }
    }
  };

  const getSectionsText = () => {
    const sections = ['o-que-e', 'tipos-sintomas', 'diagnostico-tratamento', 'prevencao'];
    return sections.map(id => {
      const element = document.getElementById(id);
      return element ? element.innerText : '';
    }).join('\n\n');
  };

  const callGeminiAPI = async (prompt: string, systemInstruction?: string) => {
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        ...(systemInstruction && {
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          }
        })
      };

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível gerar uma resposta.';
    } catch (error) {
      console.error('Erro na API:', error);
      return 'Ocorreu um erro ao processar sua solicitação.';
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'sent', text: userMessage }]);
    setLoading(true);

    const sectionsContent = getSectionsText();
    const prompt = `Responda à seguinte pergunta com base no texto sobre neuropatia diabética fornecido. Seja preciso e educativo. Pergunta: "${userMessage}". Texto: ${sectionsContent}`;
    
    const response = await callGeminiAPI(prompt, "Atue como um especialista em diabetes e neuropatia diabética, fornecendo respostas precisas e educativas.");
    
    setChatMessages(prev => [...prev, { type: 'received', text: response }]);
    setLoading(false);
  };

  const generateQuiz = async () => {
    setLoading(true);
    const sectionsContent = getSectionsText();
    const prompt = `Gere 5 perguntas de múltipla escolha sobre neuropatia diabética com base no texto fornecido. Cada pergunta deve ter 4 alternativas (A, B, C, D) e apenas uma correta. Formato: Pergunta seguida das alternativas. Texto: ${sectionsContent}`;
    
    const quizText = await callGeminiAPI(prompt, "Atue como um professor, criando perguntas educativas e precisas.");
    
    const outputElement = document.getElementById('quiz-output');
    if (outputElement) {
      outputElement.innerHTML = `<div class="p-4 bg-gray-100 rounded-md">${quizText.replace(/\n/g, '<br>')}</div>`;
    }
    setLoading(false);
  };

  const generateTool = async (toolType: string, inputValue?: string) => {
    setLoading(true);
    const sectionsContent = getSectionsText();
    let prompt = '';
    let systemInstruction = '';

    switch (toolType) {
      case 'summary':
        prompt = `Gere um resumo completo e estruturado do documento sobre neuropatia diabética. O resumo deve cobrir todos os pontos principais de forma clara e organizada. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um especialista em resumos acadêmicos.";
        break;
      case 'glossary':
        prompt = `Crie um glossário com os principais termos técnicos sobre neuropatia diabética presentes no texto, com suas definições claras e concisas. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um especialista em terminologia médica.";
        break;
      case 'analogy':
        prompt = `Crie uma analogia didática para explicar o conceito "${inputValue}" no contexto da neuropatia diabética, com base no texto fornecido. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um educador, criando analogias claras e didáticas.";
        break;
      case 'citation':
        prompt = `Formate a seguinte informação em uma citação ABNT correta: "${inputValue}"`;
        systemInstruction = "Atue como um especialista em normas ABNT.";
        break;
      case 'review':
        prompt = `Gere 8-10 perguntas abertas de revisão sobre neuropatia diabética baseadas no texto fornecido. As perguntas devem estimular o pensamento crítico. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um professor universitário.";
        break;
      case 'critical-review':
        prompt = `Faça uma resenha crítica acadêmica do seguinte texto, analisando pontos fortes, limitações e relevância científica: "${inputValue}"`;
        systemInstruction = "Atue como um pesquisador acadêmico crítico.";
        break;
      case 'case-study':
        prompt = `Crie um estudo de caso clínico detalhado sobre "${inputValue}" no contexto da neuropatia diabética, incluindo apresentação, diagnóstico e abordagem terapêutica. Baseie-se no texto: ${sectionsContent}`;
        systemInstruction = "Atue como um médico especialista.";
        break;
      case 'paraphrase':
        prompt = `Parafrase o seguinte texto de forma acadêmica, mantendo o significado original: "${inputValue}"`;
        systemInstruction = "Atue como um especialista em redação acadêmica.";
        break;
      case 'concept':
        prompt = `Explique detalhadamente o conceito "${inputValue}" no contexto da neuropatia diabética, com base no texto fornecido. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um especialista educacional.";
        break;
      case 'counter-argument':
        prompt = `Crie um contra-argumento acadêmico para a seguinte afirmação, baseando-se nos conceitos de neuropatia diabética: "${inputValue}". Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um intelectual crítico e acadêmico.";
        break;
      case 'comparison':
        const [concept1, concept2] = (inputValue || '').split(' vs ');
        prompt = `Crie uma tabela de comparação em formato Markdown entre "${concept1}" e "${concept2}" no contexto da neuropatia diabética. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um analista de dados.";
        break;
      case 'flashcard':
        prompt = `Crie um flashcard com o termo "${inputValue}" e sua definição baseada no texto sobre neuropatia diabética. Formate como JSON com 'term' e 'definition'. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um criador de materiais educativos.";
        break;
      case 'timeline':
        prompt = `Crie uma linha do tempo sobre "${inputValue}" relacionado à neuropatia diabética, baseado no texto fornecido. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um historiador médico.";
        break;
      case 'study-plan':
        prompt = `Crie um plano de estudo estruturado sobre "${inputValue}" com base no documento de neuropatia diabética. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um tutor acadêmico.";
        break;
      case 'synthesis':
        prompt = `Faça uma síntese dos conceitos "${inputValue}" e explique como se relacionam no contexto da neuropatia diabética. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um especialista em síntese de conceitos.";
        break;
      case 'hypothesis':
        prompt = `Formule uma hipótese científica testável sobre "${inputValue}" baseada nos conceitos do documento. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um cientista pesquisador.";
        break;
      case 'presentation':
        prompt = `Crie um roteiro de apresentação de 5-7 slides sobre "${inputValue}", estruturado com títulos e pontos-chave. Texto: ${sectionsContent}`;
        systemInstruction = "Atue como um designer de apresentações.";
        break;
    }

    const result = await callGeminiAPI(prompt, systemInstruction);
    setLoading(false);
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Neuropatia Diabética</h1>
          <div className="hidden md:flex space-x-8">
            <a href="#o-que-e" className="nav-link pb-1 hover:text-blue-500 transition-colors border-b-2 border-transparent hover:border-blue-500">O que é?</a>
            <a href="#tipos-sintomas" className="nav-link pb-1 hover:text-blue-500 transition-colors border-b-2 border-transparent hover:border-blue-500">Tipos e Sintomas</a>
            <a href="#diagnostico-tratamento" className="nav-link pb-1 hover:text-blue-500 transition-colors border-b-2 border-transparent hover:border-blue-500">Diagnóstico e Tratamento</a>
            <a href="#prevencao" className="nav-link pb-1 hover:text-blue-500 transition-colors border-b-2 border-transparent hover:border-blue-500">Prevenção</a>
            <a href="#ferramentas" className="nav-link pb-1 hover:text-blue-500 transition-colors border-b-2 border-transparent hover:border-blue-500">Ferramentas</a>
            <a href="#referencias" className="nav-link pb-1 hover:text-blue-500 transition-colors border-b-2 border-transparent hover:border-blue-500">Referências</a>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4">
            <a href="#o-que-e" className="block py-2 text-gray-700 hover:text-blue-500">O que é?</a>
            <a href="#tipos-sintomas" className="block py-2 text-gray-700 hover:text-blue-500">Tipos e Sintomas</a>
            <a href="#diagnostico-tratamento" className="block py-2 text-gray-700 hover:text-blue-500">Diagnóstico e Tratamento</a>
            <a href="#prevencao" className="block py-2 text-gray-700 hover:text-blue-500">Prevenção</a>
            <a href="#ferramentas" className="block py-2 text-gray-700 hover:text-blue-500">Ferramentas</a>
            <a href="#referencias" className="block py-2 text-gray-700 hover:text-blue-500">Referências</a>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Voltar para Neurofuncional */}
        <div className="mb-8">
          <Link 
            to="/neurofuncional" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Neurofuncional
          </Link>
        </div>

        {/* O que é */}
        <section id="o-que-e" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">Compreendendo a Neuropatia Diabética</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-10">
            Esta seção introdutória define a neuropatia diabética, uma das complicações mais comuns e debilitantes do diabetes. Aqui, exploramos sua causa fundamental—os danos aos nervos causados por níveis elevados de glicose no sangue—e sua prevalência, preparando o terreno para uma análise mais aprofundada dos diferentes tipos e seus impactos.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">O que é e por que ocorre?</h3>
              <div id="whatIsContent">
                <p id="whatIsText">A neuropatia diabética é um termo que descreve um conjunto de distúrbios nervosos causados pelo diabetes mellitus. A exposição prolongada a altos níveis de glicose no sangue (hiperglicemia) pode danificar as fibras nervosas em todo o corpo, mas afeta mais comumente os nervos das pernas e dos pés.</p>
                <p>O mecanismo exato é complexo, envolvendo fatores metabólicos e vasculares. A hiperglicemia danifica os pequenos vasos sanguíneos (vasa nervorum) que suprem os nervos com oxigênio e nutrientes, levando à lesão nervosa. Além disso, processos inflamatórios e estresse oxidativo contribuem para a degeneração das fibras nervosas.</p>
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
                  <p><span className="font-bold">Estatística Chave:</span> Estima-se que até 50% das pessoas com diabetes desenvolverão alguma forma de neuropatia ao longo da vida, destacando a importância do controle glicêmico rigoroso.</p>
                </div>
              </div>
              <button 
                onClick={() => speakText(document.getElementById('whatIsText')?.innerText || '')}
                className="mt-4 w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Falar Conteúdo ✨
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-center mb-4">Prevalência dos Tipos de Neuropatia</h3>
              <div className="relative w-full max-w-sm mx-auto h-80">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Tipos e Sintomas */}
        <section id="tipos-sintomas" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">Tipos e Manifestações Clínicas</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-10">
            A neuropatia diabética não é uma condição única, mas um espectro de distúrbios. Nesta seção interativa, você pode explorar os quatro tipos principais. Clique em cada tipo para descobrir seus sintomas característicos, as áreas do corpo que afetam e a progressão típica da doença, desde sensações comuns até manifestações mais atípicas e raras.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {[
              { id: 'pds', label: 'Polineuropatia Simétrica Distal' },
              { id: 'autonomica', label: 'Neuropatia Autonômica' },
              { id: 'radiculoplexopatia', label: 'Radiculoplexopatia Diabética' },
              { id: 'mononeuropatia', label: 'Mononeuropatia' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm md:text-base font-semibold py-2 px-4 rounded-full shadow-sm transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg min-h-[300px]">
            {activeTab === 'pds' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Polineuropatia Simétrica Distal (PSD)</h3>
                <p className="mb-4">É a forma mais comum. Afeta os nervos periféricos de forma simétrica, começando nas extremidades mais longas do corpo (pés) e progredindo para cima (pernas, mãos).</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Sintomas Típicos (Sensitivos)</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Dormência, formigamento ou queimação nos pés.</li>
                      <li>Sensação de "agulhadas" ou "choques".</li>
                      <li>Perda da capacidade de sentir dor, temperatura e tato.</li>
                      <li>Hipersensibilidade ao toque (alodinia).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Sintomas Atípicos e de Progressão (Motores)</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Fraqueza muscular nos pés e mãos.</li>
                      <li>Perda de reflexos e equilíbrio.</li>
                      <li>Deformidades nos pés (ex: "pé de Charcot").</li>
                      <li>Úlceras que não cicatrizam devido à perda de sensibilidade.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'autonomica' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Neuropatia Autonômica</h3>
                <p className="mb-4">Afeta os nervos que controlam as funções involuntárias do corpo, como frequência cardíaca, digestão e pressão arterial.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Cardiovascular</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Tontura ao levantar-se (hipotensão postural).</li>
                      <li>Frequência cardíaca em repouso acelerada.</li>
                      <li>Infarto do miocárdio silencioso (sem dor).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Gastrointestinal</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Dificuldade para engolir.</li>
                      <li>Náuseas, vômitos, sensação de estômago cheio (gastroparesia).</li>
                      <li>Diarreia noturna ou constipação.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Geniturinário e Outros</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Disfunção erétil em homens.</li>
                      <li>Bexiga neurogênica (dificuldade para esvaziar a bexiga).</li>
                      <li>Alterações na sudorese (suor excessivo ou ausente).</li>
                      <li>Hipoglicemia sem sintomas de alerta.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'radiculoplexopatia' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Radiculoplexopatia Diabética (Amiotrofia Diabética)</h3>
                <p className="mb-4">Uma forma menos comum e severa que afeta os nervos das coxas, quadris, nádegas ou pernas, geralmente de um lado do corpo. A dor é um sintoma proeminente.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Início Súbito:</strong> Geralmente começa com dor intensa e unilateral na coxa ou quadril.</li>
                  <li><strong>Fraqueza Muscular Severa:</strong> Leva à atrofia (perda de massa) dos músculos da coxa, dificultando a locomoção.</li>
                  <li><strong>Perda de Peso:</strong> Frequentemente associada a uma perda de peso não intencional.</li>
                  <li><strong>Recuperação Lenta:</strong> A recuperação pode ocorrer, mas é geralmente lenta e, por vezes, incompleta.</li>
                </ul>
              </div>
            )}

            {activeTab === 'mononeuropatia' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Mononeuropatia</h3>
                <p className="mb-4">Refere-se ao dano a um único nervo específico, que pode ser no rosto, tronco ou perna. O início é súbito e pode ser doloroso.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Tipos Comuns</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Paralisia de Nervo Craniano:</strong> Afeta nervos que controlam os músculos oculares, causando visão dupla ou queda da pálpebra. A paralisia de Bell (paralisia facial) também é mais comum.</li>
                      <li><strong>Síndrome do Túnel do Carpo:</strong> Compressão do nervo mediano no punho, causando dor e dormência na mão.</li>
                      <li><strong>Compressão do Nervo Ulnar/Fibular:</strong> Causa sintomas em outras partes do braço ou da perna.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Características</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Início agudo e localizado.</li>
                      <li>Não está diretamente relacionado à duração do diabetes.</li>
                      <li>Geralmente melhora por conta própria ao longo de semanas ou meses.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Diagnóstico e Tratamento */}
        <section id="diagnostico-tratamento" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">Diagnóstico e Abordagens de Tratamento</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-10">
            O diagnóstico precoce e o tratamento adequado são cruciais para gerenciar a neuropatia e prevenir complicações graves. Esta seção detalha os métodos de diagnóstico, desde exames físicos simples até testes mais complexos, e explora o pilar triplo do tratamento: controle glicêmico, manejo da dor e cuidados preventivos.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow" id="diagnosticoContent">
              <h3 className="text-2xl font-semibold mb-4">Como é Feito o Diagnóstico?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold text-xl mr-4">➤</span>
                  <div>
                    <h4 className="font-bold">Exame Físico e Anamnese</h4>
                    <p>O médico avalia os sintomas, reflexos, força muscular e a sensibilidade do paciente à vibração, toque leve, temperatura e dor.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold text-xl mr-4">➤</span>
                  <div>
                    <h4 className="font-bold">Teste com Monofilamento</h4>
                    <p>Usa-se um fio de nylon macio (monofilamento de 10g) para tocar a pele dos pés e verificar a sensibilidade protetora.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold text-xl mr-4">➤</span>
                  <div>
                    <h4 className="font-bold">Eletroneuromiografia (ENMG)</h4>
                    <p>Estudos de condução nervosa que medem a velocidade com que os sinais elétricos viajam pelos nervos, confirmando o dano nervoso.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold text-xl mr-4">➤</span>
                  <div>
                    <h4 className="font-bold">Avaliação Autonômica</h4>
                    <p>Testes específicos para avaliar a resposta da frequência cardíaca e da pressão arterial a certas manobras (ex: teste de inclinação).</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow" id="tratamentoContent">
              <h3 className="text-2xl font-semibold mb-4">Pilares do Tratamento</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold text-xl mr-4">✓</span>
                  <div>
                    <h4 className="font-bold">Controle Glicêmico Rigoroso</h4>
                    <p>A base de tudo. Manter os níveis de glicose no sangue dentro da meta é a única maneira de retardar a progressão da neuropatia.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold text-xl mr-4">✓</span>
                  <div>
                    <h4 className="font-bold">Manejo da Dor Neuropática</h4>
                    <p>Medicamentos como antidepressivos (duloxetina, amitriptilina) e anticonvulsivantes (pregabalina, gabapentina) são usados para controlar a dor. Analgésicos comuns são ineficazes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold text-xl mr-4">✓</span>
                  <div>
                    <h4 className="font-bold">Tratamento de Complicações</h4>
                    <p>Manejo específico para problemas autonômicos (ex: medicamentos para gastroparesia ou hipotensão) e cuidados intensivos com os pés para prevenir úlceras e amputações.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <button 
            onClick={() => {
              const diagnosticoText = document.getElementById('diagnosticoContent')?.innerText || '';
              const tratamentoText = document.getElementById('tratamentoContent')?.innerText || '';
              speakText(diagnosticoText + ' ' + tratamentoText);
            }}
            className="mt-4 w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Falar Conteúdo ✨
          </button>
        </section>

        {/* Prevenção */}
        <section id="prevencao" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">Prevenção: A Melhor Estratégia</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-10">
            Embora não haja cura para a neuropatia diabética, a prevenção e o retardamento de sua progressão são totalmente possíveis. Esta seção foca nas estratégias fundamentais que todo paciente com diabetes deve adotar. A chave está em uma abordagem multifacetada que combina controle médico rigoroso, autocuidado diário e um estilo de vida saudável.
          </p>
          <div id="prevencaoContent" className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:transform hover:-translate-y-1 transition-all">
              <div className="mx-auto bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-4xl">🩸</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Controle Glicêmico</h3>
              <p>Manter a hemoglobina glicada (HbA1c) na meta definida pelo seu médico. É o fator mais importante para prevenir ou retardar a neuropatia.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:transform hover:-translate-y-1 transition-all">
              <div className="mx-auto bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-4xl">👟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cuidados com os Pés</h3>
              <p>Inspecionar os pés diariamente em busca de cortes ou bolhas. Usar sapatos confortáveis, nunca andar descalço e visitar um podólogo regularmente.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:transform hover:-translate-y-1 transition-all">
              <div className="mx-auto bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Estilo de Vida Saudável</h3>
              <p>Controlar a pressão arterial e o colesterol, manter um peso saudável, praticar atividade física regularmente e não fumar. Esses fatores protegem os vasos sanguíneos que nutrem os nervos.</p>
            </div>
          </div>
          <button 
            onClick={() => speakText(document.getElementById('prevencaoContent')?.innerText || '')}
            className="mt-4 w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Falar Conteúdo ✨
          </button>
        </section>
        
        {/* Ferramentas de Estudo - Estilo diferenciado */}
        <section id="ferramentas" className="mb-20 scroll-mt-24">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🚀 Ferramentas de Estudo Inteligentes
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-700">
              Potencialize seu aprendizado com nossa suíte de ferramentas alimentadas por IA. Cada ferramenta foi cuidadosamente projetada para acelerar sua compreensão sobre neuropatia diabética.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quiz Interativo */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2">
                    <span className="text-white text-xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Quiz Interativo</h3>
                </div>
                <div id="quiz-container">
                  <div className="flex flex-col items-center">
                    <div id="quiz-message" className="text-center text-gray-600 mb-4">Teste seus conhecimentos com perguntas inteligentes</div>
                    <button 
                      onClick={generateQuiz}
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 w-full transform hover:scale-105 disabled:opacity-50"
                    >
                      {loading ? 'Gerando...' : 'Gerar Quiz ✨'}
                    </button>
                    <div id="quiz-output" className="mt-4 w-full"></div>
                  </div>
                </div>
              </div>

              {/* Assistente de Chat */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Assistente IA</h3>
                </div>
                <div className="h-64 overflow-y-auto bg-gray-50/50 rounded-xl p-4 mb-4 space-y-2">
                  {chatMessages.length === 0 ? (
                    <div className="text-gray-500 text-center">Faça uma pergunta sobre neuropatia diabética...</div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg max-w-[85%] ${
                          msg.type === 'sent'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-white text-gray-800 shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))
                  )}
                  {loading && (
                    <div className="bg-white text-gray-800 shadow-sm p-3 rounded-lg max-w-[85%]">
                      Pensando...
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua pergunta..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !chatInput.trim()}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    ➤
                  </button>
                </div>
              </div>

              {/* Outras ferramentas com design moderno */}
              {[
                { id: 'summary', title: 'Resumo Completo', icon: '📄', color: 'from-purple-500 to-purple-600' },
                { id: 'glossary', title: 'Glossário de Termos', icon: '📚', color: 'from-indigo-500 to-indigo-600' },
                { id: 'analogy', title: 'Gerador de Analogia', icon: '🎯', color: 'from-pink-500 to-pink-600' },
                { id: 'review', title: 'Perguntas de Revisão', icon: '❓', color: 'from-orange-500 to-orange-600' }
              ].map((tool) => (
                <ToolCard key={tool.id} tool={tool} generateTool={generateTool} loading={loading} />
              ))}
            </div>
          </div>
        </section>

        {/* Referências */}
        <section id="referencias" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Referências Científicas</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>1.</strong> American Diabetes Association. Standards of Medical Care in Diabetes—2023. Diabetes Care. 2023;46(Suppl 1):S1-S291.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>2.</strong> Pop-Busui R, Boulton AJ, Feldman EL, et al. Diabetic Neuropathy: A Position Statement by the American Diabetes Association. Diabetes Care. 2017;40(1):136-154.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>3.</strong> Tesfaye S, Boulton AJ, Dyck PJ, et al. Diabetic neuropathies: update on definitions, diagnostic criteria, estimation of severity, and treatments. Diabetes Care. 2010;33(10):2285-2293.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Componente auxiliar para as ferramentas
const ToolCard: React.FC<{
  tool: { id: string; title: string; icon: string; color: string };
  generateTool: (toolType: string, inputValue?: string) => Promise<string>;
  loading: boolean;
}> = ({ tool, generateTool, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateTool(tool.id, inputValue);
    setOutput(result);
    setIsGenerating(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
      <div className="flex items-center gap-3 mb-4">
        <div className={`bg-gradient-to-r ${tool.color} rounded-full p-2`}>
          <span className="text-white text-xl">{tool.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
      </div>
      <div className="space-y-4">
        {['analogy', 'citation', 'critical-review', 'case-study', 'paraphrase', 'concept', 'counter-argument'].includes(tool.id) && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Digite o ${tool.id === 'analogy' ? 'conceito' : 'texto'}...`}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || loading}
          className={`bg-gradient-to-r ${tool.color} text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300 w-full transform hover:scale-105 disabled:opacity-50`}
        >
          {isGenerating ? 'Gerando...' : `Gerar ${tool.title} ✨`}
        </button>
        {output && (
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 max-h-40 overflow-y-auto">
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

export default Neuropatia;
