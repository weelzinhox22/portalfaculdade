import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FerramentasIA.css';

const FerramentasIA: React.FC = () => {
  // State for quiz
  const [quizData, setQuizData] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizResult, setQuizResult] = useState<string>('');

  // State for chat
  const [chatMessages, setChatMessages] = useState<{ text: string; type: 'sent' | 'received' }[]>([]);
  const [chatInput, setChatInput] = useState('');

  // State for tools
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [glossary, setGlossary] = useState<any[]>([]);
  const [analogy, setAnalogy] = useState('');
  const [citation, setCitation] = useState('');
  const [reviewQuestions, setReviewQuestions] = useState('');
  const [criticalReview, setCriticalReview] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [paraphrase, setParaphrase] = useState('');
  const [conceptExplanation, setConceptExplanation] = useState('');
  const [counterArgument, setCounterArgument] = useState('');
  const [comparisonTable, setComparisonTable] = useState('');
  const [flashcard, setFlashcard] = useState<any>({});
  const [timeline, setTimeline] = useState('');
  const [studyPlan, setStudyPlan] = useState('');
  const [conceptSynthesis, setConceptSynthesis] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [presentationOutline, setPresentationOutline] = useState('');

  // API key
  const apiKey = "AIzaSyDAwQNVmF3VRXRTNqj9WKzl6AvDMjmSC7w";

  // Function to speak text
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // Function to call Gemini API
  const callGeminiAPI = async (prompt: string, systemPrompt: string = "") => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt + "\n\n" + prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'Erro ao processar a solicitação. Tente novamente.';
    }
  };

  // Quiz generation
  const generateQuiz = async () => {
    const prompt = `Crie 5 perguntas de múltipla escolha sobre saúde, fisioterapia e medicina em geral. 
    Cada pergunta deve ter 4 opções (A, B, C, D) e uma resposta correta.
    Formate a resposta como JSON com a estrutura:
    [
      {
        "question": "Pergunta aqui?",
        "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
        "correct": "Opção correta"
      }
    ]`;
    
    const result = await callGeminiAPI(prompt);
    try {
      const quiz = JSON.parse(result);
      setQuizData(quiz);
    } catch (e) {
      setQuizData([]);
    }
  };

  // Submit quiz
  const submitQuiz = () => {
    let correct = 0;
    quizData.forEach((q, index) => {
      if (userAnswers[index] === q.correct) {
        correct++;
      }
    });
    const percentage = (correct / quizData.length) * 100;
    setQuizResult(`Você acertou ${correct} de ${quizData.length} perguntas (${percentage.toFixed(1)}%)`);
  };

  // Summary generation
  const generateSummary = async () => {
    const prompt = `Crie um resumo abrangente sobre saúde, fisioterapia e medicina em geral, 
    incluindo conceitos fundamentais, práticas clínicas e avanços recentes na área.`;
    
    const result = await callGeminiAPI(prompt);
    setSummary(result);
  };

  // Send chat message
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { text: userMessage, type: 'sent' }]);
    setChatInput('');

    const prompt = `Responda à seguinte pergunta sobre saúde, fisioterapia ou medicina: ${userMessage}`;
    const response = await callGeminiAPI(prompt);
    
    setChatMessages(prev => [...prev, { text: response, type: 'received' }]);
  };

  // Image generation
  const generateImage = async () => {
    const imageInput = (document.getElementById('imageInput') as HTMLInputElement)?.value;
    if (!imageInput) return;

    const prompt = `Crie uma imagem sobre: ${imageInput}`;
    const result = await callGeminiAPI(prompt);
    setImageUrl(result);
  };

  // Glossary generation
  const generateGlossary = async () => {
    const prompt = `Crie um glossário com 10 termos importantes relacionados à saúde, fisioterapia e medicina, 
    com definições claras e concisas. Formate como JSON:
    [
      {
        "term": "Termo",
        "definition": "Definição"
      }
    ]`;
    
    const result = await callGeminiAPI(prompt);
    try {
      const glossary = JSON.parse(result);
      setGlossary(glossary);
    } catch (e) {
      setGlossary([]);
    }
  };

  // Analogy generation
  const generateAnalogy = async () => {
    const analogyInput = (document.getElementById('analogyInput') as HTMLInputElement)?.value;
    if (!analogyInput) return;

    const prompt = `Crie uma analogia clara e didática para explicar o conceito: ${analogyInput}`;
    const result = await callGeminiAPI(prompt);
    setAnalogy(result);
  };

  // Citation generation
  const generateCitation = async () => {
    const citationInput = (document.getElementById('citationInput') as HTMLTextAreaElement)?.value;
    if (!citationInput) return;

    const prompt = `Formate a seguinte citação no padrão ABNT: ${citationInput}`;
    const result = await callGeminiAPI(prompt);
    setCitation(result);
  };

  // Review questions generation
  const generateReviewQuestions = async () => {
    const prompt = `Crie 5 perguntas de revisão abertas sobre saúde, fisioterapia e medicina em geral, 
    que ajudem a testar a compreensão dos conceitos fundamentais.`;
    
    const result = await callGeminiAPI(prompt);
    setReviewQuestions(result);
  };

  // Critical review generation
  const generateCriticalReview = async () => {
    const reviewInput = (document.getElementById('criticalReviewInput') as HTMLTextAreaElement)?.value;
    if (!reviewInput) return;

    const prompt = `Faça uma análise crítica detalhada do seguinte texto sobre saúde: ${reviewInput}`;
    const result = await callGeminiAPI(prompt);
    setCriticalReview(result);
  };

  // Case study generation
  const generateCaseStudy = async () => {
    const caseInput = (document.getElementById('caseStudyInput') as HTMLInputElement)?.value;
    if (!caseInput) return;

    const prompt = `Crie um estudo de caso detalhado sobre: ${caseInput}`;
    const result = await callGeminiAPI(prompt);
    setCaseStudy(result);
  };

  // Paraphrase generation
  const generateParaphrase = async () => {
    const paraphraseInput = (document.getElementById('paraphraseInput') as HTMLTextAreaElement)?.value;
    if (!paraphraseInput) return;

    const prompt = `Parafraseie o seguinte texto de forma acadêmica e clara: ${paraphraseInput}`;
    const result = await callGeminiAPI(prompt);
    setParaphrase(result);
  };

  // Concept explanation
  const explainConcept = async () => {
    const conceptInput = (document.getElementById('conceptInput') as HTMLInputElement)?.value;
    if (!conceptInput) return;

    const prompt = `Explique detalhadamente o conceito: ${conceptInput}`;
    const result = await callGeminiAPI(prompt);
    setConceptExplanation(result);
  };

  // Counter argument generation
  const generateCounterArgument = async () => {
    const argumentInput = (document.getElementById('counterArgumentInput') as HTMLTextAreaElement)?.value;
    if (!argumentInput) return;

    const prompt = `Crie um contra-argumento bem fundamentado para: ${argumentInput}`;
    const result = await callGeminiAPI(prompt);
    setCounterArgument(result);
  };

  // Comparison table generation
  const generateComparisonTable = async () => {
    const concept1 = (document.getElementById('concept1Input') as HTMLInputElement)?.value;
    const concept2 = (document.getElementById('concept2Input') as HTMLInputElement)?.value;
    if (!concept1 || !concept2) return;

    const prompt = `Crie uma tabela comparativa entre ${concept1} e ${concept2}`;
    const result = await callGeminiAPI(prompt);
    setComparisonTable(result);
  };

  // Flashcard generation
  const generateFlashcard = async () => {
    const flashcardInput = (document.getElementById('flashcardInput') as HTMLInputElement)?.value;
    if (!flashcardInput) return;

    const prompt = `Crie um flashcard para o termo: ${flashcardInput}`;
    const result = await callGeminiAPI(prompt);
    setFlashcard({ term: flashcardInput, definition: result });
  };

  // Timeline generation
  const generateTimeline = async () => {
    const timelineInput = (document.getElementById('timelineInput') as HTMLInputElement)?.value;
    if (!timelineInput) return;

    const prompt = `Crie uma linha do tempo para: ${timelineInput}`;
    const result = await callGeminiAPI(prompt);
    setTimeline(result);
  };

  // Study plan generation
  const generateStudyPlan = async () => {
    const planInput = (document.getElementById('studyPlanInput') as HTMLInputElement)?.value;
    if (!planInput) return;

    const prompt = `Crie um plano de estudo estruturado para: ${planInput}`;
    const result = await callGeminiAPI(prompt);
    setStudyPlan(result);
  };

  // Concept synthesis generation
  const generateConceptSynthesis = async () => {
    const synthesisInput = (document.getElementById('conceptSynthesisInput') as HTMLTextAreaElement)?.value;
    if (!synthesisInput) return;

    const prompt = `Sintetize os conceitos: ${synthesisInput}`;
    const result = await callGeminiAPI(prompt);
    setConceptSynthesis(result);
  };

  // Hypothesis generation
  const generateHypothesis = async () => {
    const hypothesisInput = (document.getElementById('hypothesisInput') as HTMLInputElement)?.value;
    if (!hypothesisInput) return;

    const prompt = `Gere uma hipótese científica para: ${hypothesisInput}`;
    const result = await callGeminiAPI(prompt);
    setHypothesis(result);
  };

  // Presentation outline generation
  const generatePresentationOutline = async () => {
    const presentationInput = (document.getElementById('presentationInput') as HTMLInputElement)?.value;
    if (!presentationInput) return;

    const prompt = `Crie um roteiro de apresentação para: ${presentationInput}`;
    const result = await callGeminiAPI(prompt);
    setPresentationOutline(result);
  };

  return (
    <div className="antialiased" style={{ paddingTop: '2rem' }}>
      {/* Content Wrapper */}
      <div className="content-wrapper">
        <main className="container mx-auto px-6 py-8">
          {/* Header */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', color: '#6366f1', textDecoration: 'none', marginBottom: '1rem' }}>
              <ArrowLeft style={{ marginRight: '0.5rem' }} />
              Voltar ao Início
            </Link>
            <h1 className="section-title" style={{ color: '#1f2937', marginBottom: '1rem' }}>🚀 Ferramentas de IA para Saúde</h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#6b7280', maxWidth: '800px', margin: '0 auto' }}>
              Potencialize seu aprendizado com nossa suíte completa de ferramentas alimentadas por IA. 
              Cada ferramenta foi cuidadosamente projetada para acelerar sua compreensão sobre saúde, fisioterapia e medicina.
            </p>
          </div>

          {/* Ferramentas Grid */}
          <div className="ferramentas-grid">
            <div className="grid-3">
              {/* Quiz Tool */}
              <div className="tool-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div className="tool-icon">🧠</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem' }}>Quiz Interativo</h3>
                </div>
                <div id="quiz-container">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
                      Clique no botão para gerar 5 perguntas de múltipla escolha.
                    </div>
                    <button onClick={generateQuiz} className="modern-button" style={{ width: '100%' }}>🎯 Gerar Quiz</button>
                    {quizData.length > 0 && (
                      <div style={{ marginTop: '1.5rem', width: '100%' }}>
                        {quizData.map((q, index) => (
                          <div key={index} style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontWeight: '600', marginBottom: '1rem' }}>{index + 1}. {q.question}</p>
                            {q.options.map((option: string, i: number) => (
                              <label key={i} style={{ display: 'block', marginBottom: '0.5rem' }}>
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={option}
                                  onChange={(e) => setUserAnswers({ ...userAnswers, [index]: e.target.value })}
                                  style={{ marginRight: '0.5rem' }}
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        ))}
                        <button onClick={submitQuiz} className="modern-button" style={{ width: '100%', marginTop: '1rem' }}>Ver Resultado</button>
                        {quizResult && <p style={{ marginTop: '1rem', fontWeight: '700', textAlign: 'center' }}>{quizResult}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary Tool */}
              <div className="tool-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div className="tool-icon">📄</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem' }}>Resumo Completo</h3>
                </div>
                <div id="summary-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1rem' }}>
                    Clique no botão para gerar um resumo sobre saúde e medicina.
                  </div>
                  <button onClick={generateSummary} className="modern-button" style={{ width: '100%' }}>📋 Gerar Resumo</button>
                  {summary && <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem', marginTop: '1rem' }}>{summary}</div>}
                </div>
              </div>

              {/* Chat Assistant */}
              <div className="tool-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div className="tool-icon">🤖</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem' }}>Assistente de Estudos</h3>
                </div>
                <div id="chat-container" className="chat-container">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {chatMessages.map((msg, index) => (
                      <div key={index} style={{ 
                        marginBottom: '1rem', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem',
                        background: msg.type === 'sent' ? '#3b82f6' : '#f3f4f6',
                        color: msg.type === 'sent' ? 'white' : '#374151',
                        alignSelf: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%'
                      }}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', marginTop: '1rem' }}>
                  <input
                    placeholder="Pergunte sobre saúde e medicina..."
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <button 
                    onClick={sendChatMessage}
                    style={{ marginLeft: '0.5rem', background: '#3b82f6', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                      <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.917H11.25a.75.75 0 0 1 0 1.5H4.984l-2.432 7.917a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Generator */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Imagens</h3>
                <div id="image-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="imageInput"
                    placeholder="Ex: 'Anatomia do sistema nervoso'"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateImage} className="modern-button" style={{ width: '100%' }}>Gerar Imagem ✨</button>
                  {imageUrl && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{imageUrl}</div>}
                </div>
              </div>

              {/* Glossary Tool */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Glossário de Termos</h3>
                <div id="glossary-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1rem' }}>
                    Clique para gerar um glossário com termos-chave de saúde.
                  </div>
                  <button onClick={generateGlossary} className="modern-button" style={{ width: '100%' }}>Gerar Glossário ✨</button>
                  {glossary.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      {glossary.map((item, index) => (
                        <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                          <strong>{item.term}:</strong> {item.definition}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Analogy Generator */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Analogia</h3>
                <div id="analogy-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="analogyInput"
                    placeholder="Ex: 'sistema cardiovascular'"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateAnalogy} className="modern-button" style={{ width: '100%' }}>Gerar Analogia ✨</button>
                  {analogy && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{analogy}</div>}
                </div>
              </div>

              {/* Citation Generator */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Citação ABNT</h3>
                <div id="citation-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea
                    id="citationInput"
                    rows={3}
                    placeholder="Cole o texto ou dados bibliográficos aqui..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={generateCitation} className="modern-button" style={{ width: '100%' }}>Gerar Citação ✨</button>
                  {citation && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{citation}</div>}
                </div>
              </div>

              {/* Review Questions */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Perguntas de Revisão</h3>
                <div id="review-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1rem' }}>
                    Clique no botão para gerar perguntas abertas sobre saúde.
                  </div>
                  <button onClick={generateReviewQuestions} className="modern-button" style={{ width: '100%' }}>Gerar Perguntas ✨</button>
                  {reviewQuestions && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{reviewQuestions}</div>}
                </div>
              </div>

              {/* Critical Review */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Resenha Crítica</h3>
                <div id="critical-review-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea
                    id="criticalReviewInput"
                    rows={5}
                    placeholder="Cole o texto que você deseja analisar criticamente..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={generateCriticalReview} className="modern-button" style={{ width: '100%' }}>Gerar Resenha Crítica ✨</button>
                  {criticalReview && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{criticalReview}</div>}
                </div>
              </div>

              {/* Case Study */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Estudo de Caso</h3>
                <div id="case-study-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="caseStudyInput"
                    placeholder="Ex: 'paciente com lesão medular'"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateCaseStudy} className="modern-button" style={{ width: '100%' }}>Gerar Estudo de Caso ✨</button>
                  {caseStudy && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{caseStudy}</div>}
                </div>
              </div>

              {/* Paraphrase */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Parafraseador Acadêmico</h3>
                <div id="paraphrase-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea
                    id="paraphraseInput"
                    rows={5}
                    placeholder="Cole o texto que você deseja parafrasear..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={generateParaphrase} className="modern-button" style={{ width: '100%' }}>Parafrasear Texto ✨</button>
                  {paraphrase && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{paraphrase}</div>}
                </div>
              </div>

              {/* Concept Explorer */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Explorador de Conceitos</h3>
                <div id="concept-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="conceptInput"
                    placeholder="Digite um conceito para explicar..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={explainConcept} className="modern-button" style={{ width: '100%' }}>Explicar Conceito ✨</button>
                  {conceptExplanation && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{conceptExplanation}</div>}
                </div>
              </div>

              {/* Counter Argument */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Contra-argumento</h3>
                <div id="counter-argument-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea
                    id="counterArgumentInput"
                    rows={5}
                    placeholder="Cole uma afirmação para criar um contra-argumento..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={generateCounterArgument} className="modern-button" style={{ width: '100%' }}>Gerar Contra-argumento ✨</button>
                  {counterArgument && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{counterArgument}</div>}
                </div>
              </div>

              {/* Comparison Table */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Tabela Comparativa</h3>
                <div id="comparison-table-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      id="concept1Input"
                      placeholder="Conceito 1..."
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                    />
                    <input
                      id="concept2Input"
                      placeholder="Conceito 2..."
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                    />
                  </div>
                  <button onClick={generateComparisonTable} className="modern-button" style={{ width: '100%' }}>Gerar Tabela ✨</button>
                  {comparisonTable && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{comparisonTable}</div>}
                </div>
              </div>

              {/* Flashcards */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Flashcards</h3>
                <div id="flashcard-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="flashcardInput"
                    placeholder="Digite um termo ou conceito..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateFlashcard} className="modern-button" style={{ width: '100%' }}>Gerar Flashcard ✨</button>
                  {flashcard.term && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                      <strong>{flashcard.term}:</strong> {flashcard.definition}
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Linha do Tempo</h3>
                <div id="timeline-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="timelineInput"
                    placeholder="Digite um tópico para a linha do tempo..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateTimeline} className="modern-button" style={{ width: '100%' }}>Gerar Linha do Tempo ✨</button>
                  {timeline && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{timeline}</div>}
                </div>
              </div>

              {/* Study Plan */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Estudo Dirigido</h3>
                <div id="study-plan-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="studyPlanInput"
                    placeholder="Digite um tópico para o estudo dirigido..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateStudyPlan} className="modern-button" style={{ width: '100%' }}>Gerar Plano ✨</button>
                  {studyPlan && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{studyPlan}</div>}
                </div>
              </div>

              {/* Concept Synthesis */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Síntese de Conceitos</h3>
                <div id="concept-synthesis-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea
                    id="conceptSynthesisInput"
                    rows={3}
                    placeholder="Digite os conceitos para sintetizar (ex: 'anatomia, fisiologia')..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={generateConceptSynthesis} className="modern-button" style={{ width: '100%' }}>Gerar Síntese ✨</button>
                  {conceptSynthesis && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{conceptSynthesis}</div>}
                </div>
              </div>

              {/* Hypothesis */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Gerador de Hipótese</h3>
                <div id="hypothesis-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="hypothesisInput"
                    placeholder="Digite um tópico para a hipótese..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generateHypothesis} className="modern-button" style={{ width: '100%' }}>Gerar Hipótese ✨</button>
                  {hypothesis && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{hypothesis}</div>}
                </div>
              </div>

              {/* Presentation Outline */}
              <div className="tool-card">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Roteiro de Apresentação</h3>
                <div id="presentation-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    id="presentationInput"
                    placeholder="Digite um tema para o roteiro..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <button onClick={generatePresentationOutline} className="modern-button" style={{ width: '100%' }}>Gerar Roteiro ✨</button>
                  {presentationOutline && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>{presentationOutline}</div>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FerramentasIA;
