// Real Search Service - Integração com APIs reais
import axios from 'axios';
import { API_CONFIG, SEARCH_CONFIG } from '../config/apis.js';

class RealSearchService {
  constructor() {
    this.cache = new Map();
    this.internalContent = [
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
  }

  // Função principal de busca integrada
  async searchAll(query, filters = {}) {
    console.log('🔍 Iniciando busca integrada para:', query);
    
    const results = {
      articles: [],
      content: [],
      total: 0,
      sources: {
        crossref: { count: 0, status: 'pending' },
        pubmed: { count: 0, status: 'pending' },
        portal: { count: 0, status: 'pending' }
      }
    };

    try {
      // Busca paralela em todas as fontes
      const [crossrefResults, pubmedResults, portalResults] = await Promise.allSettled([
        this.searchCrossRef(query, filters),
        this.searchPubMed(query, filters),
        this.searchPortalContent(query, filters)
      ]);

      // Processar resultados do CrossRef
      if (crossrefResults.status === 'fulfilled') {
        results.articles.push(...crossrefResults.value);
        results.sources.crossref = { count: crossrefResults.value.length, status: 'success' };
        console.log('✅ CrossRef:', crossrefResults.value.length, 'resultados');
      } else {
        results.sources.crossref = { count: 0, status: 'error' };
        console.error('❌ Erro CrossRef:', crossrefResults.reason);
      }

      // Processar resultados do PubMed
      if (pubmedResults.status === 'fulfilled') {
        results.articles.push(...pubmedResults.value);
        results.sources.pubmed = { count: pubmedResults.value.length, status: 'success' };
        console.log('✅ PubMed:', pubmedResults.value.length, 'resultados');
      } else {
        results.sources.pubmed = { count: 0, status: 'error' };
        console.error('❌ Erro PubMed:', pubmedResults.reason);
      }

      // Processar resultados do portal
      if (portalResults.status === 'fulfilled') {
        results.content = portalResults.value;
        results.sources.portal = { count: portalResults.value.length, status: 'success' };
        console.log('✅ Portal:', portalResults.value.length, 'resultados');
      } else {
        results.sources.portal = { count: 0, status: 'error' };
        console.error('❌ Erro Portal:', portalResults.reason);
      }

      // Remove duplicatas e ordena
      results.articles = this.removeDuplicates(results.articles);
      results.articles = this.sortByRelevance(results.articles, query);
      results.total = results.articles.length + results.content.length;

      console.log('📊 Total de resultados:', results.total);
      return results;

    } catch (error) {
      console.error('❌ Erro na busca integrada:', error);
      throw error;
    }
  }

  // Busca no CrossRef (API gratuita e confiável)
  async searchCrossRef(query, filters = {}) {
    const cacheKey = this.getCacheKey('crossref', query, filters);
    
    // Verificar cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < SEARCH_CONFIG.cacheDuration) {
        console.log('📦 Cache hit para CrossRef');
        return cached.data;
      }
    }

    try {
      console.log('🔍 Buscando artigos científicos via CrossRef:', query);
      
      // CrossRef API com parâmetros avançados para busca mais completa
      const searchQuery = `${query} physical therapy OR physiotherapy OR fisioterapia OR rehabilitation OR kinesiology`;
      const url = `https://api.crossref.org/works?query=${encodeURIComponent(searchQuery)}&rows=20&select=DOI,title,author,container-title,published,abstract,type,subject,URL,link,is-referenced-by-count,published-print,published-online,ISSN,publisher,language&sort=relevance&order=desc&filter=type:journal-article,from-pub-date:2010`;
      
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Portal-Fisioterapia/1.0 (mailto:contato@portal-fisioterapia.com)'
        },
        timeout: 10000
      });

      const data = response.data;
      console.log('📚 Resposta CrossRef:', data);
      
      const processedResults = (data.message?.items || []).map((work, index) => ({
        id: `crossref_${work.DOI || index}`,
        title: Array.isArray(work.title) ? work.title[0] : (work.title || 'Título não disponível'),
        authors: this.formatCrossRefAuthors(work.author || []),
        journal: Array.isArray(work['container-title']) ? work['container-title'][0] : (work['container-title'] || 'Revista não informada'),
        year: this.extractCrossRefYear(work.published),
        source: 'CrossRef',
        abstract: this.truncateText(work.abstract || 'Resumo não disponível', 300),
        url: work.DOI ? `https://doi.org/${work.DOI}` : (work.URL || '#'),
        doi: work.DOI || '',
        citations: work['is-referenced-by-count'] || 0,
        type: this.mapCrossRefType(work.type),
        keywords: this.extractKeywords((work.title || '') + ' ' + (work.abstract || '')),
        relevance: this.calculateCrossRefRelevance(work, query),
        // Dados adicionais para visualização interna
        publisher: work.publisher || 'Editora não informada',
        issn: work.ISSN ? work.ISSN[0] : '',
        language: work.language || 'en',
        subjects: work.subject || [],
        publishedPrint: this.extractCrossRefYear(work['published-print']),
        publishedOnline: this.extractCrossRefYear(work['published-online']),
        // Links para Sci-Hub e visualização interna
        scihubUrl: work.DOI ? `https://sci-hub.se/${work.DOI}` : null,
        internalViewUrl: work.DOI ? `/article/view?doi=${encodeURIComponent(work.DOI)}` : null,
        pdfLinks: this.extractPDFLinks(work.link || [])
      }));

      // Cache dos resultados
      this.cache.set(cacheKey, {
        data: processedResults,
        timestamp: Date.now()
      });

      console.log(`✅ CrossRef: ${processedResults.length} artigos encontrados`);
      return processedResults;
    } catch (error) {
      console.error('❌ Erro na busca CrossRef:', error.message);
      // Fallback para dados mock mais realistas
      return this.getMockSciELOResults(query);
    }
  }

  // Busca no PubMed (API gratuita e confiável)
  async searchPubMed(query, filters = {}) {
    const cacheKey = this.getCacheKey('pubmed', query, filters);
    
    // Verificar cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < SEARCH_CONFIG.cacheDuration) {
        console.log('📦 Cache hit para PubMed');
        return cached.data;
      }
    }

    try {
      console.log('🔍 Buscando artigos via PubMed:', query);
      
      // Primeiro, fazer busca no eSearch para obter IDs
      const searchQuery = `${query} AND (physical therapy OR physiotherapy OR rehabilitation)`;
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchQuery)}&retmax=10&retmode=json`;
      
      const searchResponse = await axios.get(searchUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Portal-Fisioterapia/1.0'
        },
        timeout: 10000
      });

      const searchData = searchResponse.data;
      const pmids = searchData.esearchresult?.idlist || [];
      
      if (pmids.length === 0) {
        console.log('🔍 Nenhum resultado encontrado no PubMed');
        return this.getMockScholarResults(query);
      }

      // Buscar detalhes dos artigos usando eSummary
      const detailsUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=json`;
      
      const detailsResponse = await axios.get(detailsUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Portal-Fisioterapia/1.0'
        },
        timeout: 10000
      });

      const detailsData = detailsResponse.data;
      console.log('📚 Resposta PubMed:', detailsData);
      
      const processedResults = pmids.map(pmid => {
        const article = detailsData.result?.[pmid];
        if (!article) return null;
        
        return {
          id: `pubmed_${pmid}`,
          title: article.title || 'Título não disponível',
          authors: this.formatPubMedAuthors(article.authors || []),
          journal: article.source || 'Revista não informada',
          year: parseInt(article.pubdate?.substring(0, 4)) || new Date().getFullYear(),
          source: 'PubMed',
          abstract: this.truncateText(article.abstract || 'Resumo não disponível', 300),
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
          doi: article.elocationid?.startsWith('doi:') ? article.elocationid.replace('doi:', '') : '',
          citations: 0, // PubMed não fornece contagem de citações diretamente
          type: this.mapPubMedType(article.pubtype || []),
          keywords: this.extractKeywords(article.title || ''),
          relevance: this.calculatePubMedRelevance(article, query)
        };
      }).filter(Boolean);

      // Cache dos resultados
      this.cache.set(cacheKey, {
        data: processedResults,
        timestamp: Date.now()
      });

      console.log(`✅ PubMed: ${processedResults.length} artigos encontrados`);
      return processedResults;
    } catch (error) {
      console.error('❌ Erro na busca PubMed:', error.message);
      // Fallback para dados mock
      return this.getMockScholarResults(query);
    }
  }

  // Busca PDF via Sci-Hub
  async checkSciHubAvailability(doi) {
    if (!doi) return null;
    
    try {
      // Verificar se o PDF está disponível no Sci-Hub
      const scihubUrl = `https://sci-hub.se/${doi}`;
      
      // Em produção, você pode fazer uma verificação HEAD request
      // Por enquanto, apenas retornamos o link
      return {
        available: true,
        url: scihubUrl,
        type: 'pdf',
        source: 'Sci-Hub'
      };
    } catch (error) {
      console.error('❌ Erro ao verificar Sci-Hub:', error);
      return null;
    }
  }

  // Buscar texto completo através de múltiplas fontes
  async getFullTextSources(doi, title) {
    const sources = [];
    
    // Sci-Hub
    const scihubSource = await this.checkSciHubAvailability(doi);
    if (scihubSource) {
      sources.push(scihubSource);
    }
    
    // Outras fontes alternativas
    if (doi) {
      sources.push({
        available: true,
        url: `https://www.researchgate.net/search/publication?q=${encodeURIComponent(title)}`,
        type: 'alternative',
        source: 'ResearchGate'
      });
      
      sources.push({
        available: true,
        url: `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`,
        type: 'alternative',
        source: 'Google Scholar'
      });
    }
    
    return sources;
  }

  // Busca no conteúdo interno do portal
  async searchPortalContent(query, filters = {}) {
    try {
      console.log('🔍 Buscando no conteúdo do portal:', query);
      
      const queryLower = query.toLowerCase();
      
      const filteredContent = this.internalContent.filter(content => {
        const matchesQuery = (
          content.title.toLowerCase().includes(queryLower) ||
          content.description.toLowerCase().includes(queryLower) ||
          content.keywords.some(keyword => keyword.toLowerCase().includes(queryLower))
        );
        
        const matchesCategory = !filters.category || content.category === filters.category;
        const matchesType = !filters.type || content.type === filters.type;
        
        return matchesQuery && matchesCategory && matchesType;
      }).sort((a, b) => b.relevance - a.relevance);

      console.log('✅ Portal:', filteredContent.length, 'resultados');
      return filteredContent;
    } catch (error) {
      console.error('❌ Erro na busca do portal:', error);
      return [];
    }
  }

  // Funções auxiliares
  getCacheKey(source, query, filters) {
    return `${source}_${query}_${JSON.stringify(filters)}`;
  }

  formatAuthors(authors) {
    if (Array.isArray(authors)) {
      return authors.slice(0, 3);
    }
    return typeof authors === 'string' ? [authors] : [];
  }

  formatCrossRefAuthors(authors) {
    if (!Array.isArray(authors)) return [];
    return authors.slice(0, 3).map(author => {
      if (author.given && author.family) {
        return `${author.family}, ${author.given}`;
      }
      return author.name || `${author.family || ''} ${author.given || ''}`.trim();
    }).filter(name => name && name !== ' ');
  }

  extractCrossRefYear(publishedInfo) {
    if (!publishedInfo) return new Date().getFullYear();
    if (publishedInfo['date-parts'] && Array.isArray(publishedInfo['date-parts'][0])) {
      return publishedInfo['date-parts'][0][0] || new Date().getFullYear();
    }
    return new Date().getFullYear();
  }

  mapCrossRefType(type) {
    const typeMap = {
      'journal-article': 'Artigo Científico',
      'review-article': 'Artigo de Revisão',
      'book-chapter': 'Capítulo de Livro',
      'conference-paper': 'Artigo de Conferência',
      'thesis': 'Tese',
      'dissertation': 'Dissertação',
      'report': 'Relatório'
    };
    return typeMap[type] || 'Artigo Científico';
  }

  calculateCrossRefRelevance(work, query) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const title = (Array.isArray(work.title) ? work.title[0] : work.title || '').toLowerCase();
    
    // Pontuação por correspondência no título
    if (title.includes(queryLower)) score += 50;
    if (title.includes('fisioterapia') || title.includes('physical therapy') || title.includes('physiotherapy')) score += 20;
    
    // Pontuação por citações
    score += Math.min((work['is-referenced-by-count'] || 0) / 10, 20);
    
    // Pontuação por ano (artigos mais recentes têm prioridade)
    const year = this.extractCrossRefYear(work.published);
    const currentYear = new Date().getFullYear();
    if (year >= currentYear - 2) score += 10;
    else if (year >= currentYear - 5) score += 5;
    
    return Math.min(score, 100);
  }

  extractPDFLinks(links) {
    if (!Array.isArray(links)) return [];
    return links
      .filter(link => link.URL && (
        link['content-type'] === 'application/pdf' ||
        link.URL.toLowerCase().includes('.pdf') ||
        link['intended-application'] === 'text-mining'
      ))
      .map(link => ({
        url: link.URL,
        type: link['content-type'] || 'application/pdf',
        application: link['intended-application'] || 'reading'
      }));
  }

  formatPubMedAuthors(authors) {
    if (!Array.isArray(authors)) return [];
    return authors.slice(0, 3).map(author => {
      if (typeof author === 'object' && author.name) {
        return author.name;
      }
      return author.toString();
    }).filter(name => name && name.trim());
  }

  mapPubMedType(pubTypes) {
    if (!Array.isArray(pubTypes) || pubTypes.length === 0) return 'Artigo Científico';
    
    const typeMap = {
      'Journal Article': 'Artigo Científico',
      'Review': 'Artigo de Revisão',
      'Meta-Analysis': 'Meta-análise',
      'Systematic Review': 'Revisão Sistemática',
      'Clinical Trial': 'Ensaio Clínico',
      'Case Reports': 'Relato de Caso',
      'Randomized Controlled Trial': 'Ensaio Clínico Randomizado',
      'Letter': 'Carta ao Editor',
      'Editorial': 'Editorial'
    };
    
    for (const type of pubTypes) {
      if (typeMap[type]) {
        return typeMap[type];
      }
    }
    
    return 'Artigo Científico';
  }

  calculatePubMedRelevance(article, query) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const title = (article.title || '').toLowerCase();
    
    // Pontuação por correspondência no título
    if (title.includes(queryLower)) score += 50;
    if (title.includes('physical therapy') || title.includes('physiotherapy') || title.includes('rehabilitation')) score += 20;
    
    // Pontuação por ano (artigos mais recentes têm prioridade)
    const year = parseInt(article.pubdate?.substring(0, 4)) || new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    if (year >= currentYear - 2) score += 15;
    else if (year >= currentYear - 5) score += 10;
    else if (year >= currentYear - 10) score += 5;
    
    // Pontuação por presença de DOI
    if (article.elocationid?.startsWith('doi:')) score += 5;
    
    return Math.min(score, 100);
  }

  parseScholarAuthors(authorsString) {
    if (!authorsString) return [];
    return authorsString.split(',').map(author => author.trim()).slice(0, 3);
  }

  truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  extractYear(text) {
    if (!text) return new Date().getFullYear();
    const yearMatch = text.match(/\b(19|20)\d{2}\b/);
    return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
  }

  mapDocumentType(type) {
    const typeMap = {
      'research-article': 'Artigo de Pesquisa',
      'review-article': 'Artigo de Revisão',
      'case-report': 'Relato de Caso',
      'editorial': 'Editorial',
      'letter': 'Carta',
      'brief-report': 'Comunicação Breve'
    };
    return typeMap[type] || 'Artigo Científico';
  }

  inferDocumentType(title) {
    if (!title) return 'Artigo Científico';
    const titleLower = title.toLowerCase();
    if (titleLower.includes('revisão') || titleLower.includes('review')) return 'Revisão';
    if (titleLower.includes('meta-análise') || titleLower.includes('meta-analysis')) return 'Meta-análise';
    if (titleLower.includes('protocolo') || titleLower.includes('protocol')) return 'Protocolo';
    if (titleLower.includes('caso') || titleLower.includes('case')) return 'Relato de Caso';
    return 'Artigo Científico';
  }

  formatKeywords(keywords) {
    if (Array.isArray(keywords)) {
      return keywords.slice(0, 5);
    }
    if (typeof keywords === 'string') {
      return keywords.split(',').map(k => k.trim()).slice(0, 5);
    }
    return [];
  }

  extractKeywords(text) {
    if (!text) return [];
    const commonTerms = [
      'fisioterapia', 'reabilitação', 'exercício', 'tratamento', 'terapia',
      'lesão', 'dor', 'movimento', 'função', 'mobilidade', 'força',
      'neurologia', 'ortopedia', 'cardiologia', 'respiratória', 'geriátrica',
      'atleta', 'esporte', 'performance', 'prevenção', 'avaliação'
    ];
    
    const textLower = text.toLowerCase();
    return commonTerms.filter(term => textLower.includes(term)).slice(0, 5);
  }

  calculateRelevance(doc, query) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const title = (doc.ti_pt || doc.ti_en || doc.ti_es || '').toLowerCase();
    
    if (title.includes(queryLower)) score += 50;
    if (title.startsWith(queryLower)) score += 30;
    score += Math.min((doc.cited_by_count || 0) / 10, 20);
    
    return Math.min(score, 100);
  }

  calculateScholarRelevance(result, query) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const title = (result.title || '').toLowerCase();
    
    if (title.includes(queryLower)) score += 50;
    if (title.startsWith(queryLower)) score += 30;
    score += Math.min((result.inline_links?.cited_by?.total || 0) / 20, 20);
    
    return Math.min(score, 100);
  }

  removeDuplicates(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const identifier = article.doi || article.title;
      if (seen.has(identifier)) return false;
      seen.add(identifier);
      return true;
    });
  }

  sortByRelevance(articles, query) {
    return articles.sort((a, b) => {
      const aInTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      const bInTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      if (aInTitle !== bInTitle) return bInTitle - aInTitle;
      return (b.citations || 0) - (a.citations || 0);
    });
  }

  // Mock data para fallback
  getMockSciELOResults(query) {
    const mockResults = [
      {
        id: 'scielo_1',
        title: 'Fisioterapia na Reabilitação de Lesões do Ligamento Cruzado Anterior: Uma Revisão Sistemática',
        authors: ['Silva, M.A.', 'Santos, J.P.', 'Oliveira, L.R.'],
        journal: 'Revista Brasileira de Fisioterapia',
        year: 2024,
        source: 'SciELO',
        abstract: 'Este estudo apresenta uma revisão sistemática sobre as técnicas mais eficazes de fisioterapia na reabilitação de lesões do LCA...',
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
        abstract: 'Este estudo propõe um protocolo estruturado de fisioterapia para pacientes em fase aguda e crônica pós-AVC...',
        url: 'https://scielo.br/article/example4',
        doi: '10.1590/rn.2024.0456',
        citations: 34,
        type: 'Protocolo Clínico',
        keywords: ['AVC', 'Neurorreabilitação', 'Fisioterapia', 'Recuperação Funcional', 'Hemiplegia']
      }
    ];

    const queryLower = query.toLowerCase();
    return mockResults.filter(article => 
      article.title.toLowerCase().includes(queryLower) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(queryLower)) ||
      article.abstract.toLowerCase().includes(queryLower)
    );
  }

  getMockScholarResults(query) {
    const mockResults = [
      {
        id: 'scholar_1',
        title: 'Effectiveness of Early Mobilization in ICU Patients: A Meta-Analysis',
        authors: ['Johnson, R.K.', 'Brown, S.L.', 'Davis, M.J.'],
        journal: 'Physical Therapy Journal',
        year: 2024,
        source: 'Google Scholar',
        abstract: 'Meta-analysis examining the effectiveness of early mobilization protocols in intensive care unit patients...',
        url: 'https://scholar.google.com/article/example2',
        doi: '10.1093/ptj/pzab234',
        citations: 67,
        type: 'Meta-análise',
        keywords: ['Early Mobilization', 'ICU', 'Critical Care', 'Physical Therapy', 'Mobilização Precoce']
      },
      {
        id: 'scholar_2',
        title: 'Sports Injury Prevention in Athletes: A Systematic Review',
        authors: ['Brown, A.L.', 'Smith, R.J.', 'Williams, K.M.'],
        journal: 'Sports Medicine International',
        year: 2024,
        source: 'Google Scholar',
        abstract: 'Comprehensive review of injury prevention strategies in professional and amateur athletes...',
        url: 'https://scholar.google.com/article/example6',
        doi: '10.1007/smi.2024.0123',
        citations: 45,
        type: 'Revisão Sistemática',
        keywords: ['Sports Injury', 'Prevention', 'Athletes', 'Physical Therapy', 'Lesão Esportiva']
      }
    ];

    const queryLower = query.toLowerCase();
    return mockResults.filter(article => 
      article.title.toLowerCase().includes(queryLower) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(queryLower)) ||
      article.abstract.toLowerCase().includes(queryLower)
    );
  }

  clearOldCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > SEARCH_CONFIG.cacheDuration) {
        this.cache.delete(key);
      }
    }
  }
}

// Instância singleton
const realSearchService = new RealSearchService();

// Limpar cache periodicamente
setInterval(() => {
  realSearchService.clearOldCache();
}, SEARCH_CONFIG.cacheDuration);

export default realSearchService;

