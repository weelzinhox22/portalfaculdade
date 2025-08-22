# 🔍 **Configuração de APIs de Busca Científica**

## 📋 **APIs Implementadas**

### **1. SciELO API** 🇧🇷
- **URL Base**: `https://search.scielo.org/api/`
- **Documentação**: [SciELO Search API](https://search.scielo.org/api/)
- **Tipo**: API Gratuita (sem necessidade de chave)
- **Cobertura**: Literatura científica da América Latina e Caribe

#### **Parâmetros Principais:**
```javascript
{
  q: 'termo de busca',           // Query principal
  lang: 'pt',                    // Idioma (pt, en, es)
  format: 'json',                // Formato de resposta
  count: 10,                     // Número de resultados
  offset: 0,                     // Paginação
  filter: {
    'type': 'article',           // Tipo de documento
    'year_cluster': '2020-2024', // Filtro por ano
    'subject_area': 'health'     // Área temática
  }
}
```

#### **Exemplo de Uso:**
```javascript
const searchSciELO = async (query) => {
  const params = new URLSearchParams({
    q: query,
    lang: 'pt',
    format: 'json',
    count: 20
  });
  
  const response = await fetch(`https://search.scielo.org/api/?${params}`);
  const data = await response.json();
  return data.docs;
};
```

### **2. Google Scholar via SerpAPI** 🔍
- **URL Base**: `https://serpapi.com/search.json`
- **Documentação**: [SerpAPI Google Scholar](https://serpapi.com/google-scholar-api)
- **Tipo**: API Paga (1000 buscas gratuitas/mês)
- **Cobertura**: Literatura científica global

#### **Configuração:**
1. Criar conta em [SerpAPI](https://serpapi.com/)
2. Obter chave da API
3. Adicionar ao `.env`:
```bash
REACT_APP_SERPAPI_KEY=afa818b8b5226bb118e0804eb6fc1a4968557c0742e82b9f9d3648f5acfac993
```

#### **Parâmetros Principais:**
```javascript
{
  engine: 'google_scholar',      // Motor de busca
  q: 'termo de busca',          // Query principal
  api_key: 'sua_chave',         // Chave da API
  num: 10,                      // Número de resultados
  start: 0,                     // Paginação
  hl: 'pt',                     // Idioma da interface
  as_ylo: 2020,                 // Ano mínimo
  as_yhi: 2024                  // Ano máximo
}
```

### **3. CrossRef API** 📚
- **URL Base**: `https://api.crossref.org/works`
- **Documentação**: [CrossRef REST API](https://github.com/CrossRef/rest-api-doc)
- **Tipo**: API Gratuita
- **Cobertura**: Metadados de publicações científicas globais

#### **Exemplo de Uso:**
```javascript
const searchCrossRef = async (query) => {
  const params = new URLSearchParams({
    query: query,
    rows: 20,
    sort: 'relevance',
    order: 'desc'
  });
  
  const response = await fetch(`https://api.crossref.org/works?${params}`);
  const data = await response.json();
  return data.message.items;
};
```

## 🛠️ **Implementação no Portal**

### **Arquivo de Configuração** (`src/config/apis.js`):
```javascript
export const API_CONFIG = {
  scielo: {
    baseUrl: 'https://search.scielo.org/api/',
    enabled: true,
    timeout: 10000
  },
  serpapi: {
    baseUrl: 'https://serpapi.com/search.json',
    apiKey: process.env.REACT_APP_SERPAPI_KEY,
    enabled: !!process.env.REACT_APP_SERPAPI_KEY,
    timeout: 15000
  },
  crossref: {
    baseUrl: 'https://api.crossref.org/works',
    enabled: true,
    timeout: 10000
  }
};
```

### **Hook de Busca** (`src/hooks/useSearch.js`):
- ✅ Busca paralela em múltiplas APIs
- ✅ Tratamento de erros e timeout
- ✅ Cache de resultados
- ✅ Filtragem e ordenação
- ✅ Remoção de duplicatas

### **Componentes de UI**:
- ✅ **SearchResults.jsx**: Página de resultados com abas
- ✅ **ArticleViewer.jsx**: Visualizador de artigos integrado
- ✅ **Header.jsx**: Modal de busca no navbar

## 🔧 **Configuração para Produção**

### **1. Variáveis de Ambiente** (`.env`):
```bash
# APIs de Busca Científica
REACT_APP_SERPAPI_KEY=sua_chave_serpapi
REACT_APP_ENABLE_REAL_APIS=true

# Configurações de Cache
REACT_APP_CACHE_DURATION=3600000  # 1 hora em ms
REACT_APP_MAX_RESULTS_PER_SOURCE=50
```

### **2. Configuração de CORS**:
Para algumas APIs, pode ser necessário usar um proxy backend:

```javascript
// backend/proxy.js (Node.js/Express)
app.get('/api/search/scielo', async (req, res) => {
  const { q, count = 10, offset = 0 } = req.query;
  
  try {
    const response = await fetch(`https://search.scielo.org/api/?q=${q}&count=${count}&offset=${offset}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **3. Rate Limiting**:
```javascript
// Implementar debounce para evitar muitas requisições
import { debounce } from 'lodash';

const debouncedSearch = debounce(performSearch, 500);
```

## 📊 **Monitoramento e Analytics**

### **Métricas Importantes**:
- Número de buscas por dia
- Termos mais pesquisados
- Taxa de cliques em resultados
- Tempo de resposta das APIs
- Taxa de erro por fonte

### **Implementação**:
```javascript
// src/utils/analytics.js
export const trackSearch = (query, results, responseTime) => {
  // Google Analytics, Mixpanel, etc.
  gtag('event', 'search', {
    search_term: query,
    results_count: results.total,
    response_time: responseTime
  });
};
```

## 🚀 **Próximos Passos**

### **Funcionalidades Avançadas**:
1. **Busca por Voz**: Implementar Web Speech API
2. **Busca por Imagem**: Upload de imagens para busca
3. **Filtros Avançados**: Autor, instituição, revista
4. **Alertas**: Notificações para novos artigos
5. **Exportação**: BibTeX, RIS, EndNote
6. **Colaboração**: Compartilhamento de resultados
7. **IA Assistida**: Resumos automáticos com GPT

### **Otimizações**:
1. **Cache Redis**: Para resultados frequentes
2. **CDN**: Para imagens e assets
3. **Lazy Loading**: Para resultados longos
4. **Service Worker**: Para busca offline
5. **GraphQL**: Para queries mais eficientes

## 📝 **Exemplo de Integração Real**

```javascript
// src/services/realSearchService.js
class RealSearchService {
  async searchAll(query, filters = {}) {
    const promises = [];
    
    // SciELO
    if (API_CONFIG.scielo.enabled) {
      promises.push(this.searchSciELO(query, filters));
    }
    
    // Google Scholar via SerpAPI
    if (API_CONFIG.serpapi.enabled) {
      promises.push(this.searchGoogleScholar(query, filters));
    }
    
    // CrossRef
    if (API_CONFIG.crossref.enabled) {
      promises.push(this.searchCrossRef(query, filters));
    }
    
    const results = await Promise.allSettled(promises);
    return this.processResults(results, query);
  }
}
```

---

**⚠️ Nota**: Atualmente o sistema está configurado com dados mock para desenvolvimento. Para ativar as APIs reais, configure as chaves necessárias e defina `REACT_APP_ENABLE_REAL_APIS=true`.

