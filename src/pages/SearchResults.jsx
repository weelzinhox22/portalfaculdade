import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, FileText, Calendar, User, Download, Eye, BookOpen, ArrowLeft } from 'lucide-react';
import realSearchService from '../services/realSearchService';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    articles: [],
    content: [],
    total: 0
  });
  const [filters, setFilters] = useState({
    year: 'all',
    source: 'all',
    type: 'all'
  });

  // Simulated search results - In production, these would come from APIs
  const mockResults = {
    articles: [
      {
        id: 1,
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
        id: 2,
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
        keywords: ['Early Mobilization', 'ICU', 'Critical Care', 'Physical Therapy']
      },
      {
        id: 3,
        title: 'Prevenção de Quedas em Idosos: Protocolo de Exercícios Baseado em Evidências',
        authors: ['Costa, A.B.', 'Ferreira, C.D.', 'Rodrigues, E.F.'],
        journal: 'Geriatrics & Gerontology International',
        year: 2023,
        source: 'SciELO',
        abstract: 'Desenvolvimento e validação de um protocolo de exercícios para prevenção de quedas em idosos residentes na comunidade, com seguimento de 12 meses.',
        url: 'https://scielo.br/article/example3',
        doi: '10.1111/ggi.14234',
        citations: 45,
        type: 'Estudo Clínico',
        keywords: ['Prevenção de Quedas', 'Idosos', 'Exercícios', 'Fisioterapia Geriátrica']
      },
      {
        id: 4,
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
      },
      {
        id: 5,
        title: 'Plasticidade Neural e Reabilitação Motora após Acidente Vascular Cerebral',
        authors: ['Nunes, A.C.', 'Pereira, M.L.', 'Campos, J.R.'],
        journal: 'Brazilian Journal of Neuroscience',
        year: 2023,
        source: 'Google Scholar',
        abstract: 'Revisão narrativa sobre os mecanismos de plasticidade neural envolvidos na recuperação motora pós-AVC e suas implicações para estratégias de reabilitação fisioterapêutica.',
        url: 'https://scholar.google.com/article/example5',
        doi: '10.1016/j.bjn.2023.0789',
        citations: 28,
        type: 'Revisão Narrativa',
        keywords: ['AVC', 'Plasticidade Neural', 'Reabilitação Motora', 'Neuroplasticidade', 'Fisioterapia']
      }
    ],
    content: [
      {
        id: 1,
        title: 'Manual de Neurorreabilitação',
        type: 'Material Didático',
        category: 'Neurofuncional',
        description: 'Fundamentos teóricos e práticos da fisioterapia neurológica',
        url: '/neurofuncional',
        relevance: 95
      },
      {
        id: 2,
        title: 'Protocolos de Reabilitação Esportiva',
        type: 'Protocolo',
        category: 'Saúde do Atleta',
        description: 'Guias práticos para diferentes modalidades esportivas e tipos de lesões',
        url: '/saude-atleta',
        relevance: 88
      },
      {
        id: 3,
        title: 'Escalas de Avaliação Geriátrica',
        type: 'Instrumento',
        category: 'Saúde do Idoso',
        description: 'Instrumentos validados para avaliação de idosos',
        url: '/saude-idoso',
        relevance: 82
      }
    ]
  };

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) return;
      
      setLoading(true);
      try {
        console.log('🔍 Iniciando busca real para:', query);
        const searchResults = await realSearchService.searchAll(query, filters);
        console.log('📊 Resultados obtidos:', searchResults);
        setResults(searchResults);
      } catch (error) {
        console.error('❌ Erro na busca:', error);
        // Fallback para resultados mock em caso de erro
        const fallbackResults = {
          articles: mockResults.articles.filter(article => 
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())) ||
            article.abstract.toLowerCase().includes(query.toLowerCase())
          ),
          content: mockResults.content.filter(content =>
            content.title.toLowerCase().includes(query.toLowerCase()) ||
            content.description.toLowerCase().includes(query.toLowerCase()) ||
            content.category.toLowerCase().includes(query.toLowerCase())
          ),
          total: 0,
          sources: {
            scielo: { count: 0, status: 'error' },
            scholar: { count: 0, status: 'error' },
            portal: { count: 0, status: 'success' }
          }
        };
        fallbackResults.total = fallbackResults.articles.length + fallbackResults.content.length;
        setResults(fallbackResults);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      performSearch();
    }
  }, [query, filters]);

  const tabs = [
    { id: 'all', label: 'Todos', count: results.total },
    { id: 'articles', label: 'Artigos Científicos', count: results.articles.length },
    { id: 'content', label: 'Conteúdo do Portal', count: results.content.length }
  ];

  const openArticleInPortal = (article) => {
    // Create a new page or modal to display the article within the portal
    window.open(`/article/${article.id}`, '_blank');
  };

  const ArticleCard = ({ article }) => (
    <div className="article-card" style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--neutral-200)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              background: article.source === 'SciELO' ? 'var(--green-100)' : 'var(--blue-100)',
              color: article.source === 'SciELO' ? 'var(--green-700)' : 'var(--blue-700)',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {article.source}
            </span>
            <span style={{
              background: 'var(--neutral-100)',
              color: 'var(--neutral-600)',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.8rem'
            }}>
              {article.type}
            </span>
            <span style={{ color: 'var(--neutral-500)', fontSize: '0.9rem' }}>
              {article.year}
            </span>
          </div>
          
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700', 
            color: 'var(--neutral-800)', 
            marginBottom: '0.5rem',
            lineHeight: '1.4'
          }}>
            {article.title}
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <User className="w-4 h-4 text-neutral-500" />
            <span style={{ color: 'var(--neutral-600)', fontSize: '0.9rem' }}>
              {article.authors.join(', ')}
            </span>
          </div>
          
          <p style={{ 
            color: 'var(--neutral-600)', 
            lineHeight: '1.6', 
            marginBottom: '1rem',
            fontSize: '0.95rem'
          }}>
            {article.abstract}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {article.keywords.map((keyword, index) => (
              <span 
                key={index}
                style={{
                  background: 'var(--primary-50)',
                  color: 'var(--primary-600)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  border: '1px solid var(--primary-200)'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--neutral-500)' }}>
            <span>{article.journal}</span>
            <span>•</span>
            <span>{article.citations} citações</span>
            <span>•</span>
            <span>DOI: {article.doi}</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--neutral-200)' }}>
        <button 
          onClick={() => openArticleInPortal(article)}
          className="btn btn-primary"
          style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
        >
          <Eye className="w-4 h-4" />
          Ver no Portal
        </button>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
        >
          <ExternalLink className="w-4 h-4" />
          Fonte Original
        </a>
        <button className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
          <Download className="w-4 h-4" />
          Salvar
        </button>
      </div>
    </div>
  );

  const ContentCard = ({ content }) => (
    <div className="content-card" style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--neutral-200)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <BookOpen className="w-4 h-4 text-primary-600" />
            <span style={{
              background: 'var(--primary-100)',
              color: 'var(--primary-700)',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {content.category}
            </span>
            <span style={{
              background: 'var(--neutral-100)',
              color: 'var(--neutral-600)',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.8rem'
            }}>
              {content.type}
            </span>
          </div>
          
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: 'var(--neutral-800)', 
            marginBottom: '0.5rem'
          }}>
            {content.title}
          </h3>
          
          <p style={{ 
            color: 'var(--neutral-600)', 
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            {content.description}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link 
              to={content.url}
              className="btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Eye className="w-4 h-4" />
              Acessar Conteúdo
            </Link>
            <span style={{ 
              color: 'var(--neutral-500)', 
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span style={{ 
                width: '0.5rem', 
                height: '0.5rem', 
                background: 'var(--green-500)', 
                borderRadius: '50%' 
              }} />
              {content.relevance}% relevante
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="search-results-page" style={{ minHeight: '100vh', background: 'var(--neutral-50)', paddingTop: '5rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            to="/"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'var(--neutral-600)',
              textDecoration: 'none',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Portal
          </Link>
          
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--neutral-800)', marginBottom: '0.5rem' }}>
            Resultados da Busca
          </h1>
          <p style={{ color: 'var(--neutral-600)', fontSize: '1.1rem' }}>
            {loading ? 'Buscando...' : `${results.total} resultados encontrados para "${query}"`}
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search className="w-5 h-5" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }} />
            <input
              type="text"
              defaultValue={query}
              placeholder="Refinar busca..."
              style={{
                width: '100%',
                padding: '1rem 1.5rem 1rem 3rem',
                fontSize: '1.1rem',
                border: '2px solid var(--neutral-200)',
                borderRadius: '0.75rem',
                background: 'white'
              }}
            />
          </div>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <select style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--neutral-300)' }}>
              <option value="all">Todos os anos</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <select style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--neutral-300)' }}>
              <option value="all">Todas as fontes</option>
              <option value="scielo">SciELO</option>
              <option value="scholar">Google Scholar</option>
              <option value="portal">Portal</option>
            </select>
            <select style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--neutral-300)' }}>
              <option value="all">Todos os tipos</option>
              <option value="review">Revisão</option>
              <option value="clinical">Estudo Clínico</option>
              <option value="meta">Meta-análise</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--neutral-200)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--primary-600)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--neutral-600)',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              border: '3px solid var(--neutral-200)', 
              borderTop: '3px solid var(--primary-600)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: 'var(--neutral-600)', marginBottom: '1rem' }}>
              Buscando em múltiplas bases de dados...
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--green-600)' }}>📚 SciELO</span>
              <span style={{ color: 'var(--blue-600)' }}>🔍 Google Scholar</span>
              <span style={{ color: 'var(--purple-600)' }}>🏠 Portal</span>
            </div>
          </div>
        )}

        {/* API Status Indicators */}
        {!loading && results.sources && (
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            fontSize: '0.85rem',
            border: '1px solid var(--neutral-200)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                width: '0.5rem', 
                height: '0.5rem', 
                borderRadius: '50%',
                background: results.sources.scielo?.status === 'success' ? 'var(--green-500)' : 'var(--red-500)'
              }} />
              <span>SciELO ({results.sources.scielo?.count || 0})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                width: '0.5rem', 
                height: '0.5rem', 
                borderRadius: '50%',
                background: results.sources.scholar?.status === 'success' ? 'var(--green-500)' : 'var(--red-500)'
              }} />
              <span>Google Scholar ({results.sources.scholar?.count || 0})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                width: '0.5rem', 
                height: '0.5rem', 
                borderRadius: '50%',
                background: results.sources.portal?.status === 'success' ? 'var(--green-500)' : 'var(--red-500)'
              }} />
              <span>Portal ({results.sources.portal?.count || 0})</span>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div>
            {(activeTab === 'all' || activeTab === 'articles') && (
              <div style={{ marginBottom: '3rem' }}>
                {activeTab === 'all' && (
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--neutral-800)' }}>
                    Artigos Científicos ({results.articles.length})
                  </h2>
                )}
                {results.articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'content') && (
              <div>
                {activeTab === 'all' && (
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--neutral-800)' }}>
                    Conteúdo do Portal ({results.content.length})
                  </h2>
                )}
                {results.content.map(content => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {!loading && results.total === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--neutral-600)' }}>
              Nenhum resultado encontrado
            </h3>
            <p style={{ color: 'var(--neutral-500)', marginBottom: '2rem' }}>
              Tente usar termos diferentes ou verifique a ortografia.
            </p>
            <Link to="/" className="btn btn-primary">
              Voltar ao Portal
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SearchResults;
