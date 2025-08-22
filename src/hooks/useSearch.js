import { useState, useEffect } from 'react';

// Hook personalizado para gerenciar buscas integradas
export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    articles: [],
    content: [],
    total: 0,
    sources: {}
  });
  const [error, setError] = useState(null);

  // Função para buscar no SciELO usando sua API oficial
  const searchSciELO = async (query, options = {}) => {
    try {
      // API oficial do SciELO: https://search.scielo.org/api/
      const params = new URLSearchParams({
        q: query,
        lang: 'pt',
        format: 'json',
        count: options.limit || 10,
        offset: options.offset || 0
      });

      // Em desenvolvimento, usar dados mock
      if (process.env.NODE_ENV === 'development') {
        return mockSciELOResults.filter(article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
        );
      }

      const response = await fetch(`https://search.scielo.org/api/?${params}`);
      const data = await response.json();
      
      return data.docs?.map(doc => ({
        id: doc.id,
        title: doc.ti_pt || doc.ti_en || doc.ti_es,
        authors: doc.au || [],
        journal: doc.ta,
        year: parseInt(doc.da?.substring(0, 4)),
        source: 'SciELO',
        abstract: doc.ab_pt || doc.ab_en || doc.ab_es,
        url: `https://scielo.br/article/${doc.id}`,
        doi: doc.doi,
        type: doc.type,
        keywords: doc.kw_pt || doc.kw_en || []
      })) || [];
    } catch (error) {
      console.error('Erro na busca SciELO:', error);
      return [];
    }
  };

  // Função para buscar no Google Scholar usando SerpAPI
  const searchGoogleScholar = async (query, options = {}) => {
    try {
      // Para usar Google Scholar em produção, é necessário uma API como SerpAPI
      // const apiKey = process.env.REACT_APP_SERPAPI_KEY;
      // if (!apiKey) return [];

      // Em desenvolvimento, usar dados mock
      if (process.env.NODE_ENV === 'development') {
        return mockScholarResults.filter(article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
        );
      }

      // Implementação real com SerpAPI
      // const params = new URLSearchParams({
      //   engine: 'google_scholar',
      //   q: query,
      //   api_key: apiKey,
      //   num: options.limit || 10
      // });
      
      // const response = await fetch(`https://serpapi.com/search.json?${params}`);
      // const data = await response.json();
      
      return [];
    } catch (error) {
      console.error('Erro na busca Google Scholar:', error);
      return [];
    }
  };

  // Função para buscar conteúdo interno do portal
  const searchPortalContent = async (query) => {
    const internalContent = [
      {
        id: 'neuro-manual',
        title: 'Manual de Neurorreabilitação',
        type: 'Material Didático',
        category: 'Neurofuncional',
        description: 'Fundamentos teóricos e práticos da fisioterapia neurológica com foco em AVC, lesão medular e doenças neurodegenerativas',
        url: '/neurofuncional',
        keywords: ['neurologia', 'reabilitação', 'plasticidade', 'AVC', 'lesão medular', 'neurorreabilitação'],
        relevance: 95
      },
      {
        id: 'sports-protocols',
        title: 'Protocolos de Reabilitação Esportiva',
        type: 'Protocolo',
        category: 'Saúde do Atleta',
        description: 'Guias práticos para diferentes modalidades esportivas e tipos de lesões, incluindo LCA, lesões musculares e retorno ao esporte',
        url: '/saude-atleta',
        keywords: ['esporte', 'lesão', 'atleta', 'reabilitação', 'performance', 'lesão esportiva', 'LCA'],
        relevance: 88
      },
      {
        id: 'geriatric-scales',
        title: 'Escalas de Avaliação Geriátrica',
        type: 'Instrumento',
        category: 'Saúde do Idoso',
        description: 'Instrumentos validados para avaliação de idosos, prevenção de quedas e manutenção da funcionalidade',
        url: '/saude-idoso',
        keywords: ['idoso', 'geriátrico', 'avaliação', 'escalas', 'quedas', 'funcionalidade'],
        relevance: 82
      },
      {
        id: 'icu-manual',
        title: 'Manual de Fisioterapia em UTI',
        type: 'Manual',
        category: 'Unidade Hospitalar',
        description: 'Protocolos e diretrizes para ambiente hospitalar, ventilação mecânica e mobilização precoce',
        url: '/unidade-hospitalar',
        keywords: ['UTI', 'hospitalar', 'ventilação mecânica', 'mobilização precoce', 'cuidados intensivos'],
        relevance: 90
      }
    ];

    const queryLower = query.toLowerCase();
    return internalContent.filter(content => 
      content.title.toLowerCase().includes(queryLower) ||
      content.description.toLowerCase().includes(queryLower) ||
      content.keywords.some(keyword => keyword.toLowerCase().includes(queryLower))
    ).sort((a, b) => b.relevance - a.relevance);
  };

  // Função principal de busca
  const performSearch = async (query, filters = {}) => {
    if (!query?.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const [scieloResults, scholarResults, portalResults] = await Promise.allSettled([
        searchSciELO(query, filters),
        searchGoogleScholar(query, filters),
        searchPortalContent(query)
      ]);

      const newResults = {
        articles: [],
        content: [],
        sources: {
          scielo: { count: 0, status: 'success' },
          scholar: { count: 0, status: 'success' },
          portal: { count: 0, status: 'success' }
        }
      };

      // Processa resultados
      if (scieloResults.status === 'fulfilled') {
        newResults.articles.push(...scieloResults.value);
        newResults.sources.scielo.count = scieloResults.value.length;
      } else {
        newResults.sources.scielo.status = 'error';
      }

      if (scholarResults.status === 'fulfilled') {
        newResults.articles.push(...scholarResults.value);
        newResults.sources.scholar.count = scholarResults.value.length;
      } else {
        newResults.sources.scholar.status = 'error';
      }

      if (portalResults.status === 'fulfilled') {
        newResults.content = portalResults.value;
        newResults.sources.portal.count = portalResults.value.length;
      } else {
        newResults.sources.portal.status = 'error';
      }

      newResults.total = newResults.articles.length + newResults.content.length;
      setResults(newResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    performSearch
  };
};

// Dados mock para desenvolvimento
const mockSciELOResults = [
  {
    id: 'scielo_1',
    title: 'Fisioterapia na Reabilitação de Lesões do Ligamento Cruzado Anterior: Uma Revisão Sistemática',
    authors: ['Silva, M.A.', 'Santos, J.P.', 'Oliveira, L.R.'],
    journal: 'Revista Brasileira de Fisioterapia',
    year: 2024,
    source: 'SciELO',
    abstract: 'Este estudo apresenta uma revisão sistemática sobre as técnicas mais eficazes de fisioterapia na reabilitação de lesões do LCA, analisando 45 estudos publicados entre 2019-2024.',
    url: 'https://scielo.br/article/example1',
    doi: '10.1590/bjpt-rbf.2024.0123',
    citations: 23,
    type: 'Revisão Sistemática',
    keywords: ['Fisioterapia', 'LCA', 'Reabilitação', 'Lesões Esportivas', 'Lesão Esportiva']
  },
  {
    id: 'scielo_4',
    title: 'Fisioterapia na Recuperação Funcional Pós-AVC: Protocolo Baseado em Evidências',
    authors: ['Martins, R.S.', 'Lima, P.A.', 'Barbosa, T.M.'],
    journal: 'Revista de Neurorreabilitação',
    year: 2024,
    source: 'SciELO',
    abstract: 'Este estudo propõe um protocolo estruturado de fisioterapia para pacientes em fase aguda e crônica pós-AVC, baseado em revisão sistemática da literatura e consenso de especialistas.',
    url: 'https://scielo.br/article/example4',
    doi: '10.1590/rn.2024.0456',
    citations: 34,
    type: 'Protocolo Clínico',
    keywords: ['AVC', 'Neurorreabilitação', 'Fisioterapia', 'Recuperação Funcional', 'Hemiplegia']
  }
];

const mockScholarResults = [
  {
    id: 'scholar_1',
    title: 'Effectiveness of Early Mobilization in ICU Patients: A Meta-Analysis',
    authors: ['Johnson, R.K.', 'Brown, S.L.', 'Davis, M.J.'],
    journal: 'Physical Therapy Journal',
    year: 2024,
    source: 'Google Scholar',
    abstract: 'Meta-analysis examining the effectiveness of early mobilization protocols in intensive care unit patients, including outcomes on length of stay and functional recovery.',
    url: 'https://scholar.google.com/article/example2',
    doi: '10.1093/ptj/pzab234',
    citations: 67,
    type: 'Meta-análise',
    keywords: ['Early Mobilization', 'ICU', 'Critical Care', 'Physical Therapy', 'Mobilização Precoce']
  }
];

export default useSearch;

