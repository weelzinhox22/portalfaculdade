// Configuração das APIs de busca científica

export const API_CONFIG = {
  scielo: {
    baseUrl: '/api/scielo/',
    enabled: true,
    timeout: 10000,
    defaultParams: {
      lang: 'pt',
      format: 'json',
      count: 20
    }
  },
  serpapi: {
    baseUrl: '/api/serpapi/search.json',
    apiKey: 'afa818b8b5226bb118e0804eb6fc1a4968557c0742e82b9f9d3648f5acfac993',
    enabled: true,
    timeout: 15000,
    defaultParams: {
      engine: 'google_scholar',
      hl: 'pt',
      num: 20,
      as_ylo: 2020,
      as_yhi: 2025
    }
  },
  crossref: {
    baseUrl: '/api/crossref/works',
    enabled: true,
    timeout: 10000,
    defaultParams: {
      rows: 20,
      sort: 'relevance',
      order: 'desc'
    }
  }
};

// Configurações gerais
export const SEARCH_CONFIG = {
  enableRealAPIs: true,
  cacheDuration: 3600000, // 1 hora
  maxResultsPerSource: 20,
  debounceDelay: 500,
  retryAttempts: 3
};

export default API_CONFIG;
