
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './NeuropatiaGuide.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const NeuropatiaGuide: React.FC = () => {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for tabs in types/symptoms
  const [activeTab, setActiveTab] = useState('pds');

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

  // Chart data
  const chartData = {
    labels: ['Polineuropatia Simétrica Distal', 'Neuropatia Autonômica', 'Outras Formas (Mono, Radiculo)'],
    datasets: [{
      label: 'Prevalência',
      data: [75, 20, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(245, 158, 11, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    }
  };

  // API key (should be in env, but for now inline)
  const apiKey = "AIzaSyDAwQNVmF3VRXRTNqj9WKzl6AvDMjmSC7w";

  // Function to get sections text
  const getSectionsText = () => {
    return [
      "Compreendendo a Neuropatia Diabética...",
      "Tipos e Manifestações Clínicas...",
      "Diagnóstico e Abordagens de Tratamento...",
      "Prevenção: A Melhor Estratégia..."
    ].join('\n\n');
  };

  // Quiz generation
  const generateQuiz = async () => {
    const sectionsText = getSectionsText();
    const userPrompt = `Você é um professor universitário e precisa criar um quiz de múltipla escolha sobre Neuropatia Diabética para ajudar seus alunos a estudarem. Crie 5 perguntas com 4 opções de resposta para cada, sendo apenas uma correta. As perguntas e respostas devem ser baseadas EXCLUSIVAMENTE no conteúdo sobre Neuropatia Diabética fornecido a seguir. Formate a resposta como um array de objetos JSON. Cada objeto deve ter as chaves 'question', 'options' (array de strings) e 'correctAnswer' (string, que deve ser a resposta correta). Conteúdo sobre Neuropatia Diabética:\n\n${sectionsText}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "question": { "type": "STRING" },
                "options": {
                  "type": "ARRAY",
                  "items": { "type": "STRING" }
                },
                "correctAnswer": { "type": "STRING" }
              },
              "propertyOrdering": ["question", "options", "correctAnswer"]
            }
          },
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const json = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      const data = JSON.parse(json);
      setQuizData(data);
    } catch (error) {
      console.error('Quiz generation error:', error);
    }
  };

  // Submit quiz
  const submitQuiz = () => {
    let score = 0;
    quizData.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        score++;
      }
    });
    setQuizResult(`Seu resultado: ${score} de ${quizData.length}`);
  };

  // Send chat message
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { text: userMessage, type: 'sent' }]);
    setChatInput('');

    const sectionsContent = getSectionsText();
    const userPrompt = `Responda a esta pergunta sobre neuropatia diabética. Suas respostas devem ser baseadas EXCLUSIVAMENTE neste texto: "${sectionsContent}". Se a resposta não estiver no texto, diga que a informação não foi encontrada. Pergunta: ${userMessage}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um assistente de estudos universitário, respondendo de forma clara e concisa. Sempre baseie suas respostas no texto fornecido." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setChatMessages(prev => [...prev, { text: text || 'Não foi possível encontrar uma resposta.', type: 'received' }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { text: 'Ocorreu um erro ao conectar com o assistente.', type: 'received' }]);
    }
  };

  // Generate summary
  const generateSummary = async () => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Resuma o seguinte texto de forma clara, objetiva e concisa para um estudante universitário. O resumo deve ser uma síntese completa, mas não exceder 200 palavras. Texto:\n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um assistente de IA focado em resumos acadêmicos concisos e precisos." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setSummary(text || 'Não foi possível gerar o resumo.');
    } catch (error) {
      console.error('Summary generation error:', error);
    }
  };

  // Generate image
  const generateImage = async (prompt: string) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

    try {
      const payload = {
        instances: [{ prompt }],
        parameters: { "sampleCount": 1 }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;

      if (base64Data) {
        setImageUrl(`data:image/png;base64,${base64Data}`);
      } else {
        throw new Error('Falha ao gerar a imagem.');
      }
    } catch (error) {
      console.error('Image generation error:', error);
    }
  };

  // Generate glossary
  const generateGlossary = async () => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Com base neste texto, crie um glossário com os termos técnicos mais importantes e suas definições. O resultado deve ser uma lista de 5 a 8 termos. Formate a resposta como um array de objetos JSON. Cada objeto deve ter as chaves 'term' e 'definition'. O texto é: \n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "term": { "type": "STRING" },
                "definition": { "type": "STRING" }
              },
              "propertyOrdering": ["term", "definition"]
            }
          },
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const json = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      const data = JSON.parse(json);
      setGlossary(data);
    } catch (error) {
      console.error('Glossary generation error:', error);
    }
  };

  // Generate analogy
  const generateAnalogy = async (term: string) => {
    const userPrompt = `Crie uma analogia simples e clara em português para o seguinte conceito técnico sobre neuropatia diabética. A analogia deve ser curta e fácil de entender. Se o conceito não estiver relacionado à neuropatia diabética, diga que não pode gerar a analogia. Conceito: '${term}'`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um especialista que cria analogias educacionais." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnalogy(text || 'Não foi possível gerar a analogia.');
    } catch (error) {
      console.error('Analogy generation error:', error);
    }
  };

  // Generate citation
  const generateCitation = async (text: string) => {
    const userPrompt = `Formate a seguinte referência bibliográfica de acordo com as normas da ABNT. A resposta deve conter apenas a citação formatada, sem explicações ou textos adicionais. Texto: '${text}'`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um assistente de citação ABNT, formatando referências bibliográficas de forma estrita e sem adicionar nenhum outro texto." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const citationText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setCitation(citationText || 'Não foi possível gerar a citação.');
    } catch (error) {
      console.error('Citation generation error:', error);
    }
  };

  // Generate review questions
  const generateReviewQuestions = async () => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Com base neste texto, crie 5 perguntas de revisão abertas sobre os principais conceitos de neuropatia diabética para um estudante universitário. O resultado deve ser uma lista de perguntas numerada. Não forneça as respostas. Texto:\n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um tutor acadêmico, criando perguntas abertas para ajudar na revisão do conteúdo." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setReviewQuestions(text || 'Não foi possível gerar as perguntas.');
    } catch (error) {
      console.error('Review questions generation error:', error);
    }
  };

  // Generate critical review
  const generateCriticalReview = async (text: string) => {
    const userPrompt = `Atue como um revisor acadêmico. Analise e escreva uma resenha crítica sobre o seguinte texto, destacando seus pontos fortes, fracos, relevância e originalidade. Texto: '${text}'`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um revisor acadêmico, fornecendo uma resenha crítica imparcial e bem estruturada." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const reviewText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setCriticalReview(reviewText || 'Não foi possível gerar a resenha crítica.');
    } catch (error) {
      console.error('Critical review generation error:', error);
    }
  };

  // Generate case study
  const generateCaseStudy = async (theme: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Crie um estudo de caso fictício detalhado, com introdução, descrição do paciente, sintomas e um desafio a ser resolvido, com base nos conceitos de neuropatia diabética descritos no texto a seguir. Use o prompt do usuário para focar o estudo de caso. Prompt: '${theme}'. Texto: \n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um escritor de estudos de caso para fins educacionais. O estudo de caso deve ser fictício, mas clinicamente plausível, com base no texto fornecido." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setCaseStudy(text || 'Não foi possível gerar o estudo de caso.');
    } catch (error) {
      console.error('Case study generation error:', error);
    }
  };

  // Paraphrase
  const paraphraseText = async (text: string) => {
    const userPrompt = `Parafraseie o seguinte texto acadêmico em português, mantendo o significado original, mas usando diferentes palavras e estruturas de frase. O resultado deve conter apenas o texto parafraseado. Texto: '${text}'`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um assistente de escrita acadêmica focado em parafrasear textos de forma precisa e fluida." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const paraphrasedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setParaphrase(paraphrasedText || 'Não foi possível parafrasear o texto.');
    } catch (error) {
      console.error('Paraphrase error:', error);
    }
  };

  // Explain concept
  const explainConcept = async (concept: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Explique o seguinte conceito ou termo técnico sobre neuropatia diabética, baseando a sua resposta EXCLUSIVAMENTE no texto a seguir. Seja conciso e direto ao ponto. Se o conceito não estiver no texto, diga que não foi encontrado. Conceito: '${concept}'. Texto: \n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um especialista em termos técnicos, fornecendo explicações claras e concisas." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setConceptExplanation(text || 'Não foi possível encontrar uma explicação.');
    } catch (error) {
      console.error('Concept explanation error:', error);
    }
  };

  // Generate counter argument
  const generateCounterArgument = async (statement: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Crie um contra-argumento acadêmico para a seguinte afirmação. Baseie sua resposta nos conceitos de neuropatia diabética presentes no texto fornecido. Se o texto não suportar um contra-argumento, forneça uma explicação neutra sobre o tema. Afirmação: '${statement}'. Texto: \n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um intelectual crítico e acadêmico." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setCounterArgument(text || 'Não foi possível gerar um contra-argumento.');
    } catch (error) {
      console.error('Counter argument generation error:', error);
    }
  };

  // Generate comparison table
  const generateComparisonTable = async (concept1: string, concept2: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Crie uma tabela de comparação em formato Markdown entre os seguintes dois conceitos sobre neuropatia diabética. A tabela deve ter colunas 'Característica', '${concept1}' e '${concept2}', e comparar os conceitos com base em sintomas, causa e tratamento. Baseie-se estritamente no texto fornecido. Conceitos: '${concept1}' e '${concept2}'. Texto: \n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um analista de dados, gerando uma tabela de comparação em formato Markdown para auxiliar a análise." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setComparisonTable(text || 'Não foi possível gerar a tabela.');
    } catch (error) {
      console.error('Comparison table generation error:', error);
    }
  };

  // Generate flashcard
  const generateFlashcard = async (term: string) => {
    const userPrompt = `Crie um flashcard com o termo e sua definição. O termo deve ser o seguinte: '${term}'. A definição deve ser concisa e baseada no texto fornecido sobre neuropatia diabética. Formate a resposta como um objeto JSON com as chaves 'term' e 'definition'. Texto: ${getSectionsText()}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              "term": { "type": "STRING" },
              "definition": { "type": "STRING" }
            },
            "propertyOrdering": ["term", "definition"]
          },
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const json = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      const data = JSON.parse(json);
      setFlashcard(data);
    } catch (error) {
      console.error('Flashcard generation error:', error);
    }
  };

  // Generate timeline
  const generateTimeline = async (topic: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Crie uma linha do tempo clara e concisa em português sobre o tema '${topic}', usando o texto fornecido. A linha do tempo deve ser um texto em formato de lista numerada com os principais marcos. Texto:\n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um historiador ou cientista, gerando uma linha do tempo precisa e organizada." }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setTimeline(text || 'Não foi possível gerar a linha do tempo.');
    } catch (error) {
      console.error('Timeline generation error:', error);
    }
  };

  // Generate study plan
  const generateStudyPlan = async (topic: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Crie um plano de estudo estruturado e detalhado sobre o tema '${topic}' com base no texto fornecido sobre neuropatia diabética. O plano deve incluir objetivos, tópicos principais, e uma lista de atividades de estudo. Texto:\n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um tutor acadêmico, gerando planos de estudo úteis e organizados." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setStudyPlan(text || 'Não foi possível gerar o plano de estudo.');
    } catch (error) {
      console.error('Study plan generation error:', error);
    }
  };

  // Generate concept synthesis
  const generateConceptSynthesis = async (concepts: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Analise os seguintes conceitos sobre neuropatia diabética e explique como eles se relacionam, com base no texto fornecido. O resultado deve ser uma síntese concisa. Conceitos: '${concepts}'. Texto: \n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um especialista acadêmico em síntese de conceitos." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setConceptSynthesis(text || 'Não foi possível gerar a síntese.');
    } catch (error) {
      console.error('Concept synthesis generation error:', error);
    }
  };

  // Generate hypothesis
  const generateHypothesis = async (topic: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Atue como um cientista. Com base nos conceitos do documento, formule uma hipótese testável sobre o tópico: '${topic}'. A resposta deve ser uma única frase concisa e clara. Texto:\n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um cientista, formulando hipóteses científicas e testáveis." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setHypothesis(text || 'Não foi possível gerar a hipótese.');
    } catch (error) {
      console.error('Hypothesis generation error:', error);
    }
  };

  // Generate presentation outline
  const generatePresentationOutline = async (theme: string) => {
    const sectionsContent = getSectionsText();
    const userPrompt = `Crie um roteiro detalhado para uma apresentação acadêmica sobre o tema '${theme}', usando o conteúdo do documento sobre neuropatia diabética. Estruture em 5-7 slides, cada um com um título e 3-4 pontos-chave. Formate a resposta com títulos de slides e listas de pontos. Não inclua texto introdutório ou conclusivo fora do roteiro. Texto:\n\n${sectionsContent}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: "Atue como um designer de apresentações, criando roteiros claros e eficazes." }]
        },
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      setPresentationOutline(text || 'Não foi possível gerar o roteiro.');
    } catch (error) {
      console.error('Presentation outline generation error:', error);
    }
  };

  // Text-to-speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR'; // Set to Portuguese
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  };

  return (
    <div className="antialiased" style={{ paddingTop: '2rem' }}>
      {/* Content Wrapper */}
      <div className="content-wrapper">
        <main className="container mx-auto px-6 py-8">
          {/* Section: O que é */}
          <section id="o-que-e" className="card section-green mb-4">
            <h2 className="section-title green">Compreendendo a Neuropatia Diabética</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#065f46', marginBottom: '2rem', textAlign: 'center' }}>
              Esta seção introdutória define a neuropatia diabética, uma das complicações mais comuns e debilitantes do diabetes. Aqui, exploramos sua causa fundamental—os danos aos nervos causados por níveis elevados de glicose no sangue—e sua prevalência, preparando o terreno para uma análise mais aprofundada dos diferentes tipos e seus impactos.
            </p>
            <div className="grid-2">
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#065f46', marginBottom: '1rem' }}>O que é e por que ocorre?</h3>
                <div id="whatIsContent">
                  <p id="whatIsText" className="mb-2">A neuropatia diabética é um termo que descreve um conjunto de distúrbios nervosos causados pelo diabetes mellitus. A exposição prolongada a altos níveis de glicose no sangue (hiperglicemia) pode danificar as fibras nervosas em todo o corpo, mas afeta mais comumente os nervos das pernas e dos pés.</p>
                  <p className="mb-2">O mecanismo exato é complexo, envolvendo fatores metabólicos e vasculares. A hiperglicemia danifica os pequenos vasos sanguíneos (vasa nervorum) que suprem os nervos com oxigênio e nutrientes, levando à lesão nervosa. Além disso, processos inflamatórios e estresse oxidativo contribuem para a degeneração das fibras nervosas.</p>
                  <div style={{ background: '#ecfdf5', borderLeft: '4px solid #10b981', color: '#065f46', padding: '1rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
                    <p><span style={{ fontWeight: '700' }}>Estatística Chave:</span> Estima-se que até 50% das pessoas com diabetes desenvolverão alguma forma de neuropatia ao longo da vida, destacando a importância do controle glicêmico rigoroso.</p>
                  </div>
                </div>
                <button onClick={() => speakText(document.getElementById('whatIsContent')?.innerText || '')} className="modern-button" style={{ width: '100%', marginTop: '1rem' }}>Falar Conteúdo ✨</button>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '1rem', color: '#065f46' }}>Prevalência dos Tipos de Neuropatia</h3>
                <div className="chart-container">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Tipos e Sintomas */}
          <section id="tipos-sintomas" className="card section-blue mb-4">
            <h2 className="section-title blue">Tipos e Manifestações Clínicas</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#1e40af', marginBottom: '3rem', textAlign: 'center' }}>
              A neuropatia diabética não é uma condição única, mas um espectro de distúrbios. Nesta seção interativa, você pode explorar os quatro tipos principais. Clique em cada tipo para descobrir seus sintomas característicos, as áreas do corpo que afetam e a progressão típica da doença, desde sensações comuns até manifestações mais atípicas e raras.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <button className={`tab-button ${activeTab === 'pds' ? 'active' : ''} text-sm md:text-base font-semibold py-2 px-4 rounded-full bg-white shadow-sm`} data-tab="pds" onClick={() => setActiveTab('pds')}>Polineuropatia Simétrica Distal</button>
              <button className={`tab-button ${activeTab === 'autonomica' ? 'active' : ''} text-sm md:text-base font-semibold py-2 px-4 rounded-full bg-white shadow-sm`} data-tab="autonomica" onClick={() => setActiveTab('autonomica')}>Neuropatia Autonômica</button>
              <button className={`tab-button ${activeTab === 'radiculoplexopatia' ? 'active' : ''} text-sm md:text-base font-semibold py-2 px-4 rounded-full bg-white shadow-sm`} data-tab="radiculoplexopatia" onClick={() => setActiveTab('radiculoplexopatia')}>Radiculoplexopatia Diabética</button>
              <button className={`tab-button ${activeTab === 'mononeuropatia' ? 'active' : ''} text-sm md:text-base font-semibold py-2 px-4 rounded-full bg-white shadow-sm`} data-tab="mononeuropatia" onClick={() => setActiveTab('mononeuropatia')}>Mononeuropatia</button>
            </div>

            <div style={{ background: 'white', padding: '3rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', minHeight: '400px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              {activeTab === 'pds' && (
                <div id="pds" className="tab-content active">
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e40af' }}>Polineuropatia Simétrica Distal (PSD)</h3>
                  <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>É a forma mais comum. Afeta os nervos periféricos de forma simétrica, começando nas extremidades mais longas do corpo (pés) e progredindo para cima (pernas, mãos).</p>
                  <div className="grid-2" style={{ marginTop: '2rem' }}>
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
                <div id="autonomica" className="tab-content active">
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
                <div id="radiculoplexopatia" className="tab-content active">
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
                <div id="mononeuropatia" className="tab-content active">
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e40af' }}>Mononeuropatia</h3>
                  <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>Refere-se ao dano a um único nervo específico, que pode ser no rosto, tronco ou perna. O início é súbito e pode ser doloroso.</p>
                  <div className="grid-2" style={{ marginTop: '2rem' }}>
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

          {/* Section: Diagnóstico e Tratamento */}
          <section id="diagnostico-tratamento" className="card section-purple mb-4">
            <h2 className="section-title purple">Diagnóstico e Abordagens de Tratamento</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#7c3aed', marginBottom: '3rem', textAlign: 'center' }}>
              O diagnóstico precoce e o tratamento adequado são cruciais para gerenciar a neuropatia e prevenir complicações graves. Esta seção detalha os métodos de diagnóstico, desde exames físicos simples até testes mais complexos, e explora o pilar triplo do tratamento: controle glicêmico, manejo da dor e cuidados preventivos.
            </p>
            <div className="grid-2">
              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} id="diagnosticoContent">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#7c3aed' }}>Como é Feito o Diagnóstico?</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>➤</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Exame Físico e Anamnese</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>O médico avalia os sintomas, reflexos, força muscular e a sensibilidade do paciente à vibração, toque leve, temperatura e dor.</p>
                    </div>
                  </li>
                                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>➤</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Teste com Monofilamento</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Usa-se um fio de nylon macio (monofilamento de 10g) para tocar a pele dos pés e verificar a sensibilidade protetora.</p>
                    </div>
                  </li>
                                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>➤</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Eletroneuromiografia (ENMG)</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Estudos de condução nervosa que medem a velocidade com que os sinais elétricos viajam pelos nervos, confirmando o dano nervoso.</p>
                    </div>
                  </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>➤</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Avaliação Autonômica</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Testes específicos para avaliar a resposta da frequência cardíaca e da pressão arterial a certas manobras (ex: teste de inclinação).</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} id="tratamentoContent">
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#7c3aed' }}>Pilares do Tratamento</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>✓</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Controle Glicêmico Rigoroso</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>A base de tudo. Manter os níveis de glicose no sangue dentro da meta é a única maneira de retardar a progressão da neuropatia.</p>
                    </div>
                  </li>
                                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>✓</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Manejo da Dor Neuropática</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Medicamentos como antidepressivos (duloxetina, amitriptilina) e anticonvulsivantes (pregabalina, gabapentina) são usados para controlar a dor. Analgésicos comuns são ineficazes.</p>
                    </div>
                  </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.25rem', marginTop: '0.25rem' }}>✓</span>
                    <div>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem', color: '#7c3aed' }}>Tratamento de Complicações</h4>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Manejo específico para problemas autonômicos (ex: medicamentos para gastroparesia ou hipotensão) e cuidados intensivos com os pés para prevenir úlceras e amputações.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <button onClick={() => speakText(document.getElementById('diagnosticoContent')?.innerText + ' ' + document.getElementById('tratamentoContent')?.innerText || '')} className="modern-button" style={{ width: '100%', marginTop: '2rem' }}>Falar Conteúdo ✨</button>
          </section>

          {/* Section: Prevenção */}
          <section id="prevencao" className="card section-yellow mb-4">
            <h2 className="section-title yellow">Prevenção: A Melhor Estratégia</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#92400e', marginBottom: '3rem', textAlign: 'center' }}>
              Embora não haja cura para a neuropatia diabética, a prevenção e o retardamento de sua progressão são totalmente possíveis. Esta seção foca nas estratégias fundamentais que todo paciente com diabetes deve adotar. A chave está em uma abordagem multifacetada que combina controle médico rigoroso, autocuidado diário e um estilo de vida saudável.
            </p>
            <div id="prevencaoContent" className="grid-3" style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ margin: '0 auto', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>🩸</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#92400e' }}>Controle Glicêmico</h3>
                <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Manter a hemoglobina glicada (HbA1c) na meta definida pelo seu médico. É o fator mais importante para prevenir ou retardar a neuropatia.</p>
              </div>
              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ margin: '0 auto', background: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>👟</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#92400e' }}>Cuidados com os Pés</h3>
                <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Inspecionar os pés diariamente em busca de cortes ou bolhas. Usar sapatos confortáveis, nunca andar descalço e visitar um podólogo regularmente.</p>
              </div>
              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ margin: '0 auto', background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>❤️</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#92400e' }}>Estilo de Vida Saudável</h3>
                <p style={{ lineHeight: '1.6', color: '#4b5563' }}>Controlar a pressão arterial e o colesterol, manter um peso saudável, praticar atividade física regularmente e não fumar. Esses fatores protegem os vasos sanguíneos que nutrem os nervos.</p>
              </div>
            </div>
            <button onClick={() => speakText(document.getElementById('prevencaoContent')?.innerText || '')} className="modern-button" style={{ width: '100%', marginTop: '2rem' }}>Falar Conteúdo ✨</button>
          </section>

          {/* Section: Ferramentas */}
          <section id="ferramentas" className="mb-20 scroll-mt-24">
            <h2 className="section-title text-4xl mb-8">🚀 Ferramentas de Estudo Inteligentes</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-700">
              Potencialize seu aprendizado com nossa suíte completa de ferramentas alimentadas por IA. 
              Cada ferramenta foi cuidadosamente projetada para acelerar sua compreensão sobre neuropatia diabética.
            </p>
            <div className="ferramentas-grid">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {/* Quiz Tool */}
                <div className="tool-card">
                  <div className="text-center mb-4">
                    <div className="tool-icon">🧠</div>
                    <h3 className="text-2xl font-semibold">Quiz Interativo</h3>
                  </div>
                  <div id="quiz-container">
                    <div className="flex flex-col items-center">
                      <div className="text-center text-gray-600 mb-4">Clique no botão para gerar 5 perguntas de múltipla escolha.</div>
                      <button onClick={generateQuiz} className="modern-button w-full">🎯 Gerar Quiz</button>
                      {quizData.length > 0 && (
                        <div className="mt-4">
                          {quizData.map((q, index) => (
                            <div key={index} className="mb-4">
                              <p className="font-semibold">{index + 1}. {q.question}</p>
                              {q.options.map((option: string, i: number) => (
                                <label key={i} className="block">
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={(e) => setUserAnswers({ ...userAnswers, [index]: e.target.value })}
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          ))}
                          <button onClick={submitQuiz} className="modern-button w-full mt-4">Ver Resultado</button>
                          {quizResult && <p className="mt-4 font-bold">{quizResult}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary Tool */}
                <div className="tool-card">
                  <div className="text-center mb-4">
                    <div className="tool-icon">📄</div>
                    <h3 className="text-2xl font-semibold">Resumo Completo</h3>
                  </div>
                  <div id="summary-container" className="space-y-4">
                    <div className="text-center text-gray-600 mb-4">Clique no botão para gerar um resumo do documento.</div>
                    <button onClick={generateSummary} className="modern-button w-full">📋 Gerar Resumo</button>
                    {summary && <div className="p-4 bg-gray-100 rounded-md mt-4">{summary}</div>}
                  </div>
                </div>

                {/* Chat Assistant */}
                <div className="tool-card">
                  <div className="text-center mb-4">
                    <div className="tool-icon">🤖</div>
                    <h3 className="text-2xl font-semibold">Assistente de Estudos</h3>
                  </div>
                  <div id="chat-container" className="chat-container">
                    <div className="flex flex-col">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`message-${msg.type}`}>
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Pergunte sobre neuropatia diabética..."
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={sendChatMessage} className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.917H11.25a.75.75 0 0 1 0 1.5H4.984l-2.432 7.917a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Image Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Imagens</h3>
                  <div id="image-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ex: 'Nervo saudável e danificado'"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setImageUrl('')}
                    />
                    <button onClick={() => generateImage('Nervo saudável e danificado')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Imagem ✨</button>
                    {imageUrl && <img src={imageUrl} alt="Generated" className="rounded-lg shadow-lg max-w-full h-auto mt-4" />}
                  </div>
                </div>

                {/* Glossary */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Glossário de Termos</h3>
                  <div id="glossary-container" className="space-y-4">
                    <div className="text-center text-gray-600 mb-4">Clique para gerar um glossário com termos-chave.</div>
                    <button onClick={generateGlossary} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Glossário ✨</button>
                    {glossary.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 mt-4">
                        {glossary.map((item, index) => (
                          <li key={index}><strong>{item.term}:</strong> {item.definition}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Analogy Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Analogia</h3>
                  <div id="analogy-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ex: 'vasa nervorum'"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setAnalogy('')}
                    />
                    <button onClick={() => generateAnalogy('vasa nervorum')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Analogia ✨</button>
                    {analogy && <div className="p-4 bg-gray-100 rounded-md mt-4">{analogy}</div>}
                  </div>
                </div>

                {/* Citation Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Citação ABNT</h3>
                  <div id="citation-container" className="space-y-4">
                    <textarea
                      rows={3}
                      placeholder="Cole o texto ou dados bibliográficos aqui..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setCitation('')}
                    />
                    <button onClick={() => generateCitation('Texto de exemplo')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Citação ✨</button>
                    {citation && <div className="p-4 bg-gray-100 rounded-md mt-4">{citation}</div>}
                  </div>
                </div>

                {/* Review Questions */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Perguntas de Revisão</h3>
                  <div id="review-container" className="space-y-4">
                    <div className="text-center text-gray-600 mb-4">Clique no botão para gerar perguntas abertas sobre o conteúdo.</div>
                    <button onClick={generateReviewQuestions} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Perguntas ✨</button>
                    {reviewQuestions && <div className="p-4 bg-gray-100 rounded-md mt-4">{reviewQuestions}</div>}
                  </div>
                </div>

                {/* Critical Review */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Resenha Crítica</h3>
                  <div id="critical-review-container" className="space-y-4">
                    <textarea
                      rows={5}
                      placeholder="Cole o texto que você deseja analisar criticamente..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setCriticalReview('')}
                    />
                    <button onClick={() => generateCriticalReview('Texto de exemplo')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Resenha Crítica ✨</button>
                    {criticalReview && <div className="p-4 bg-gray-100 rounded-md mt-4">{criticalReview}</div>}
                  </div>
                </div>

                {/* Case Study */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Estudo de Caso</h3>
                  <div id="case-study-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ex: 'paciente com neuropatia autonômica'"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setCaseStudy('')}
                    />
                    <button onClick={() => generateCaseStudy('paciente com neuropatia autonômica')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Estudo de Caso ✨</button>
                    {caseStudy && <div className="p-4 bg-gray-100 rounded-md mt-4">{caseStudy}</div>}
                  </div>
                </div>

                {/* Paraphraser */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Parafraseador Acadêmico</h3>
                  <div id="paraphrase-container" className="space-y-4">
                    <textarea
                      rows={5}
                      placeholder="Cole o texto que você deseja parafrasear..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setParaphrase('')}
                    />
                    <button onClick={() => paraphraseText('Texto de exemplo')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Parafrasear Texto ✨</button>
                    {paraphrase && <div className="p-4 bg-gray-100 rounded-md mt-4">{paraphrase}</div>}
                  </div>
                </div>

                {/* Concept Explorer */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Explorador de Conceitos</h3>
                  <div id="concept-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Digite um conceito para explicar..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setConceptExplanation('')}
                    />
                    <button onClick={() => explainConcept('hiperglicemia')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Explicar Conceito ✨</button>
                    {conceptExplanation && <div className="p-4 bg-gray-100 rounded-md mt-4">{conceptExplanation}</div>}
                  </div>
                </div>

                {/* Counter-argument Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Contra-argumento</h3>
                  <div id="counter-argument-container" className="space-y-4">
                    <textarea
                      rows={5}
                      placeholder="Cole uma afirmação para criar um contra-argumento..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setCounterArgument('')}
                    />
                    <button onClick={() => generateCounterArgument('Afirmação de exemplo')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Contra-argumento ✨</button>
                    {counterArgument && <div className="p-4 bg-gray-100 rounded-md mt-4">{counterArgument}</div>}
                  </div>
                </div>

                {/* Comparison Table Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Tabela Comparativa</h3>
                  <div id="comparison-table-container" className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Conceito 1..."
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Conceito 2..."
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button onClick={() => generateComparisonTable('Conceito1', 'Conceito2')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Tabela ✨</button>
                    {comparisonTable && <div className="p-4 bg-gray-100 rounded-md mt-4" dangerouslySetInnerHTML={{ __html: comparisonTable.replace(/\n/g, '<br>') }} />}
                  </div>
                </div>

                {/* Flashcard Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Flashcards</h3>
                  <div id="flashcard-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Digite um termo ou conceito..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setFlashcard({})}
                    />
                    <button onClick={() => generateFlashcard('Termo')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Flashcard ✨</button>
                    {flashcard.term && (
                      <div className="p-6 bg-white rounded-lg shadow-md text-center mt-4">
                        <h4 className="text-xl font-bold mb-2">{flashcard.term}</h4>
                        <p>{flashcard.definition}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Linha do Tempo</h3>
                  <div id="timeline-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Digite um tópico para a linha do tempo..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setTimeline('')}
                    />
                    <button onClick={() => generateTimeline('Neuropatia Diabética')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Linha do Tempo ✨</button>
                    {timeline && <div className="p-4 bg-gray-100 rounded-md mt-4">{timeline}</div>}
                  </div>
                </div>

                {/* Study Plan Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Estudo Dirigido</h3>
                  <div id="study-plan-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Digite um tópico para o estudo dirigido..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setStudyPlan('')}
                    />
                    <button onClick={() => generateStudyPlan('Neuropatia Diabética')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Plano ✨</button>
                    {studyPlan && <div className="p-4 bg-gray-100 rounded-md mt-4">{studyPlan}</div>}
                  </div>
                </div>

                {/* Concept Synthesis Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Síntese de Conceitos</h3>
                  <div id="concept-synthesis-container" className="space-y-4">
                    <textarea
                      rows={3}
                      placeholder="Digite os conceitos para sintetizar (ex: 'hiperglicemia, vasa nervorum')..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setConceptSynthesis('')}
                    />
                    <button onClick={() => generateConceptSynthesis('hiperglicemia, vasa nervorum')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Síntese ✨</button>
                    {conceptSynthesis && <div className="p-4 bg-gray-100 rounded-md mt-4">{conceptSynthesis}</div>}
                  </div>
                </div>

                {/* Hypothesis Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Gerador de Hipótese</h3>
                  <div id="hypothesis-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Digite um tópico para a hipótese..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setHypothesis('')}
                    />
                    <button onClick={() => generateHypothesis('Neuropatia Diabética')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Hipótese ✨</button>
                    {hypothesis && <div className="p-4 bg-gray-100 rounded-md mt-4">{hypothesis}</div>}
                  </div>
                </div>

                {/* Presentation Outline Generator */}
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Roteiro de Apresentação</h3>
                  <div id="presentation-container" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Digite um tema para o roteiro..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setPresentationOutline('')}
                    />
                    <button onClick={() => generatePresentationOutline('Neuropatia Diabética')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">Gerar Roteiro ✨</button>
                    {presentationOutline && <div className="p-4 bg-gray-100 rounded-md mt-4">{presentationOutline}</div>}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Referências */}
          <section id="referencias" className="scroll-mt-24">
            <h2 className="section-title text-4xl mb-8">📚 Referências Bibliográficas</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-10">
              A informação apresentada foi compilada a partir de diretrizes de sociedades médicas, artigos de revisão e publicações científicas de referência. A lista a seguir está formatada de acordo com as normas da ABNT e serve como base para aprofundamento nos estudos.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 text-sm md:text-base">
              <p>AMERICAN DIABETES ASSOCIATION. 12. Retinopathy, Neuropathy, and Foot Care: Standards of Medical Care in Diabetes—2023. <strong>Diabetes Care</strong>, v. 46, n. Supplement 1, p. S203–S215, jan. 2023.</p>
              <p>FELDMAN, E. L. et al. Diabetic neuropathy. <strong>Nature Reviews Disease Primers</strong>, v. 5, n. 1, p. 41, jun. 2019.</p>
              <p>IQBAL, Z. et al. Diabetic peripheral neuropathy: epidemiology, diagnosis, and pharmacotherapy. <strong>Clinical Therapeutics</strong>, v. 40, n. 6, p. 828–849, jun. 2018.</p>
              <p>POP-BUSUI, R. et al. Diabetic Neuropathy: A Position Statement by the American Diabetes Association. <strong>Diabetes Care</strong>, v. 40, n. 1, p. S136–S154, jan. 2017.</p>
              <p>SOCIEDADE BRASILEIRA DE DIABETES. <strong>Diretrizes da Sociedade Brasileira de Diabetes 2019-2020</strong>. São Paulo: Clannad, 2019. Disponível em: [https://www.diabetes.org.br/profissionais/images/DIRETRIZES-COMPLETA-2019-2020.pdf]. Acesso em: 31 ago. 2025.</p>
              <p>VINIK, A. I.; NEVIAN, C. B.; CASellini, C. M.; Parson, H. K. Diabetic Neuropathy. In: FEINGOLD, K. R. et al. (Eds.). <strong>Endotext</strong>. South Dartmouth (MA): MDText.com, Inc., 2000.</p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="container mx-auto px-6 py-4 text-center">
          <p>&copy; 2025 Guia Interativo sobre Neuropatia Diabética. Conteúdo destinado a fins acadêmicos.</p>
        </div>
      </footer>
    </div>
  );
};

export default NeuropatiaGuide;