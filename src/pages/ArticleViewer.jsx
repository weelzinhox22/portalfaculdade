import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, Share2, Bookmark, Calendar, User, Quote, FileText, Eye, ThumbsUp, AlertCircle } from 'lucide-react';
import realSearchService from '../services/realSearchService';

const ArticleViewer = () => {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [fullTextSources, setFullTextSources] = useState([]);
  const [loadingFullText, setLoadingFullText] = useState(false);
  const [showFullTextOptions, setShowFullTextOptions] = useState(false);

  // Mock article data - In production, this would come from an API
  const mockArticle = {
    id: 1,
    title: 'Fisioterapia na Reabilitação de Lesões do Ligamento Cruzado Anterior: Uma Revisão Sistemática',
    authors: [
      { name: 'Dr. Marcus Silva', affiliation: 'Universidade de São Paulo', email: 'marcus.silva@usp.br' },
      { name: 'Dra. João Santos', affiliation: 'UNIFESP', email: 'joao.santos@unifesp.br' },
      { name: 'Dr. Lucas Oliveira', affiliation: 'UFRJ', email: 'lucas.oliveira@ufrj.br' }
    ],
    journal: 'Revista Brasileira de Fisioterapia',
    year: 2024,
    volume: '28',
    issue: '3',
    pages: '145-162',
    source: 'SciELO',
    originalUrl: 'https://scielo.br/article/example1',
    doi: '10.1590/bjpt-rbf.2024.0123',
    citations: 23,
    type: 'Revisão Sistemática',
    publishedDate: '2024-03-15',
    keywords: ['Fisioterapia', 'LCA', 'Reabilitação', 'Lesões Esportivas', 'Medicina Esportiva'],
    abstract: `
      Objetivo: Este estudo apresenta uma revisão sistemática sobre as técnicas mais eficazes de fisioterapia na reabilitação de lesões do ligamento cruzado anterior (LCA), analisando 45 estudos publicados entre 2019-2024.
      
      Métodos: Foi realizada uma busca sistemática nas bases de dados PubMed, SciELO, LILACS e Cochrane Library. Foram incluídos ensaios clínicos randomizados, estudos de coorte e revisões sistemáticas que avaliaram protocolos de fisioterapia para reabilitação pós-cirúrgica de LCA.
      
      Resultados: Os resultados demonstraram que protocolos que combinam fortalecimento progressivo, treinamento proprioceptivo e exercícios funcionais específicos do esporte apresentam os melhores outcomes funcionais. O tempo médio de retorno ao esporte foi de 6-9 meses, com taxa de re-lesão de 8-12%.
      
      Conclusão: A evidência atual suporta uma abordagem multimodal na reabilitação do LCA, com progressão baseada em critérios funcionais rather than time-based protocols.
    `,
    fullContent: `
      <h2>Introdução</h2>
      <p>As lesões do ligamento cruzado anterior (LCA) representam uma das lesões mais comuns no esporte, com incidência estimada de 200.000 casos anuais nos Estados Unidos. A reconstrução cirúrgica seguida de reabilitação fisioterapêutica é considerada o padrão-ouro para atletas que desejam retornar ao esporte.</p>
      
      <p>A fisioterapia desempenha papel fundamental no processo de reabilitação, influenciando diretamente os outcomes funcionais, o tempo de retorno ao esporte e as taxas de re-lesão. Apesar da abundante literatura sobre o tema, ainda existe controvérsia sobre os protocolos mais eficazes.</p>
      
      <h2>Metodologia</h2>
      <p>Esta revisão sistemática seguiu as diretrizes PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses). A estratégia de busca foi desenvolvida com descritores MeSH e palavras-chave relevantes.</p>
      
      <h3>Estratégia de Busca</h3>
      <p>As seguintes bases de dados foram consultadas:</p>
      <ul>
        <li>PubMed/MEDLINE (1990-2024)</li>
        <li>SciELO (1998-2024)</li>
        <li>LILACS (1985-2024)</li>
        <li>Cochrane Library (1993-2024)</li>
      </ul>
      
      <h3>Critérios de Inclusão</h3>
      <ul>
        <li>Ensaios clínicos randomizados</li>
        <li>Estudos de coorte prospectivos</li>
        <li>Participantes com reconstrução de LCA</li>
        <li>Intervenções fisioterapêuticas bem definidas</li>
        <li>Outcomes funcionais mensurados</li>
      </ul>
      
      <h2>Resultados</h2>
      <p>Foram identificados 1.247 estudos na busca inicial. Após aplicação dos critérios de inclusão e exclusão, 45 estudos foram incluídos na análise final, totalizando 3.892 participantes.</p>
      
      <h3>Características dos Estudos</h3>
      <p>A idade média dos participantes variou de 18 a 35 anos (média: 26,4 ± 5,2 anos). O seguimento médio foi de 12 meses (variação: 6-24 meses). A maioria dos estudos (78%) incluiu atletas de diferentes modalidades esportivas.</p>
      
      <h3>Protocolos de Reabilitação</h3>
      <p>Os protocolos analisados foram categorizados em:</p>
      <ol>
        <li><strong>Protocolos baseados em tempo:</strong> Progressão fixa baseada em marcos temporais</li>
        <li><strong>Protocolos baseados em critérios:</strong> Progressão baseada em achievements funcionais</li>
        <li><strong>Protocolos híbridos:</strong> Combinação de ambas as abordagens</li>
      </ol>
      
      <h2>Discussão</h2>
      <p>Os resultados desta revisão sistemática demonstram que não existe um protocolo único superior para todos os pacientes. A individualização baseada em fatores como idade, nível de atividade, modalidade esportiva e presença de lesões associadas é fundamental.</p>
      
      <h3>Implicações Clínicas</h3>
      <p>Os achados sugerem que fisioterapeutas devem:</p>
      <ul>
        <li>Utilizar critérios funcionais objective para progressão</li>
        <li>Incorporar treinamento proprioceptivo precocemente</li>
        <li>Incluir exercícios específicos do esporte na fase final</li>
        <li>Considerar fatores psicológicos no retorno ao esporte</li>
      </ul>
      
      <h2>Limitações</h2>
      <p>Esta revisão apresenta algumas limitações importantes:</p>
      <ul>
        <li>Heterogeneidade nos protocolos de reabilitação</li>
        <li>Variabilidade nos outcomes mensurados</li>
        <li>Diferentes técnicas cirúrgicas utilizadas</li>
        <li>Seguimento variável entre os estudos</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>A evidência atual suporta uma abordagem multimodal e individualizada na reabilitação pós-cirúrgica do LCA. Protocolos baseados em critérios funcionais demonstram resultados superiores comparados a protocolos baseados exclusivamente em tempo.</p>
      
      <p>Futuras pesquisas devem focar na padronização de outcomes e no desenvolvimento de algoritmos de decisão clínica para otimizar a individualização dos protocolos de reabilitação.</p>
    `,
    references: [
      'Silva MA, Santos JP, Oliveira LR. Anterior cruciate ligament rehabilitation: systematic review of current evidence. Braz J Phys Ther. 2024;28(3):145-162.',
      'Johnson RK, Brown SL. Early mobilization protocols in ACL rehabilitation. Sports Med. 2023;51(8):1623-1635.',
      'Costa AB, Ferreira CD. Functional criteria vs time-based progression in ACL rehabilitation. Am J Sports Med. 2023;51(4):892-901.'
    ],
    relatedArticles: [
      {
        id: 2,
        title: 'Prevenção de Lesões do LCA em Atletas Jovens',
        authors: ['Costa, A.B.', 'Silva, M.J.'],
        year: 2024
      },
      {
        id: 3,
        title: 'Biomecânica da Reconstrução do LCA',
        authors: ['Oliveira, P.R.', 'Santos, L.M.'],
        year: 2023
      }
    ],
    metrics: {
      views: 1247,
      downloads: 89,
      citations: 23,
      altmetric: 15
    }
  };

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      
      try {
        // Check if article data was passed via navigation state
        if (location.state?.article) {
          const articleData = location.state.article;
          setArticle(articleData);
          
          // Load full text sources if DOI is available
          if (articleData.doi) {
            setLoadingFullText(true);
            const sources = await realSearchService.getFullTextSources(articleData.doi, articleData.title);
            setFullTextSources(sources);
            setLoadingFullText(false);
          }
        } else {
          // Check URL params for DOI
          const urlParams = new URLSearchParams(location.search);
          const doi = urlParams.get('doi');
          
          if (doi) {
            // Try to fetch article by DOI (placeholder - in real app this would be an API call)
            console.log('Loading article by DOI:', doi);
            // For now, use mock data but set the DOI
            const articleWithDOI = { ...mockArticle, doi: doi };
            setArticle(articleWithDOI);
            
            // Load full text sources
            setLoadingFullText(true);
            const sources = await realSearchService.getFullTextSources(doi, articleWithDOI.title);
            setFullTextSources(sources);
            setLoadingFullText(false);
          } else {
            // Fallback to mock data
            setArticle(mockArticle);
          }
        }
      } catch (error) {
        console.error('Error loading article:', error);
        setArticle(mockArticle); // Fallback
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id, location]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.abstract.substring(0, 200) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '3rem', 
            height: '3rem', 
            border: '3px solid var(--neutral-200)', 
            borderTop: '3px solid var(--primary-600)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: 'var(--neutral-600)' }}>Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--neutral-600)' }}>
            Artigo não encontrado
          </h2>
          <Link to="/search" className="btn btn-primary">
            Voltar à Busca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-viewer" style={{ minHeight: '100vh', background: 'white', paddingTop: '5rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <Link 
            to="/search"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'var(--neutral-600)',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Resultados
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{
              background: article.source === 'SciELO' ? 'var(--green-100)' : 'var(--blue-100)',
              color: article.source === 'SciELO' ? 'var(--green-700)' : 'var(--blue-700)',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              {article.source}
            </span>
            <span style={{
              background: 'var(--neutral-100)',
              color: 'var(--neutral-600)',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.9rem'
            }}>
              {article.type}
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: 'var(--neutral-800)', 
            lineHeight: '1.2',
            marginBottom: '1.5rem'
          }}>
            {article.title}
          </h1>
          
          {/* Authors */}
          <div style={{ marginBottom: '1.5rem' }}>
            {article.authors.map((author, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--neutral-800)' }}>
                  {author.name}
                </span>
                <span style={{ color: 'var(--neutral-600)', marginLeft: '0.5rem' }}>
                  {author.affiliation}
                </span>
              </div>
            ))}
          </div>
          
          {/* Publication Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar className="w-4 h-4" />
              {article.publishedDate}
            </span>
            <span>{article.journal}</span>
            <span>Vol. {article.volume}, No. {article.issue}</span>
            <span>pp. {article.pages}</span>
            <span>{article.citations} citações</span>
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className="btn btn-secondary"
              style={{ 
                background: bookmarked ? 'var(--primary-100)' : 'white',
                color: bookmarked ? 'var(--primary-700)' : 'var(--neutral-600)'
              }}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarked ? 'Salvo' : 'Salvar'}
            </button>
            <button onClick={handleShare} className="btn btn-secondary">
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
            <a 
              href={article.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <ExternalLink className="w-4 h-4" />
              Fonte Original
            </a>
            {/* Full Text Access Dropdown */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setShowFullTextOptions(!showFullTextOptions)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Download className="w-4 h-4" />
                Acessar Texto Completo
                <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>▼</span>
              </button>
              
              {showFullTextOptions && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  background: 'white',
                  border: '1px solid var(--neutral-200)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  minWidth: '250px',
                  zIndex: 1000,
                  padding: '1rem'
                }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--neutral-800)' }}>
                    Opções de Acesso
                  </h4>
                  
                  {loadingFullText ? (
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                        Verificando disponibilidade...
                      </div>
                    </div>
                  ) : (
                    <div>
                      {fullTextSources.length > 0 ? (
                        fullTextSources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem',
                              borderRadius: '0.5rem',
                              textDecoration: 'none',
                              color: 'var(--neutral-700)',
                              border: '1px solid var(--neutral-200)',
                              marginBottom: '0.5rem',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--neutral-50)';
                              e.currentTarget.style.borderColor = 'var(--primary-300)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'white';
                              e.currentTarget.style.borderColor = 'var(--neutral-200)';
                            }}
                          >
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              background: source.source === 'Sci-Hub' ? '#e74c3c' : 
                                         source.source === 'ResearchGate' ? '#00a0b0' : '#4285f4',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {source.source === 'Sci-Hub' ? '🔬' : 
                               source.source === 'ResearchGate' ? 'RG' : 'GS'}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                {source.source}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
                                {source.type === 'pdf' ? 'PDF Disponível' : 'Buscar na fonte'}
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ))
                      ) : (
                        <div style={{ 
                          padding: '1rem', 
                          textAlign: 'center', 
                          background: 'var(--neutral-50)',
                          borderRadius: '0.5rem',
                          border: '1px solid var(--neutral-200)'
                        }}>
                          <AlertCircle className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                          <div style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                            Texto completo não disponível
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', marginTop: '0.25rem' }}>
                            Tente acessar pela fonte original
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          {/* Main Content */}
          <div>
            {/* Abstract */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--neutral-800)' }}>
                Resumo
              </h2>
              <div style={{ 
                background: 'var(--neutral-50)', 
                padding: '2rem', 
                borderRadius: '1rem',
                border: '1px solid var(--neutral-200)',
                lineHeight: '1.8'
              }}>
                {article.abstract.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '1rem', color: 'var(--neutral-700)' }}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </section>

            {/* Keywords */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--neutral-800)' }}>
                Palavras-chave
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {article.keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    style={{
                      background: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.9rem',
                      border: '1px solid var(--primary-200)'
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>

            {/* Full Content */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--neutral-800)' }}>
                Texto Completo
              </h2>
              <div 
                style={{ 
                  lineHeight: '1.8', 
                  fontSize: '1.05rem',
                  color: 'var(--neutral-700)'
                }}
                dangerouslySetInnerHTML={{ __html: article.fullContent }}
              />
            </section>

            {/* References */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--neutral-800)' }}>
                Referências
              </h2>
              <div style={{ background: 'var(--neutral-50)', padding: '2rem', borderRadius: '1rem' }}>
                {article.references.map((ref, index) => (
                  <div key={index} style={{ marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--neutral-700)' }}>
                    <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{index + 1}.</span>
                    {ref}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            {/* Metrics */}
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '1rem', 
              border: '1px solid var(--neutral-200)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--neutral-800)' }}>
                Métricas do Artigo
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--neutral-50)', borderRadius: '0.5rem' }}>
                  <Eye className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--neutral-800)' }}>
                    {article.metrics.views.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Visualizações</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--neutral-50)', borderRadius: '0.5rem' }}>
                  <Download className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--neutral-800)' }}>
                    {article.metrics.downloads}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Downloads</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--neutral-50)', borderRadius: '0.5rem' }}>
                  <Quote className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--neutral-800)' }}>
                    {article.metrics.citations}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Citações</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--neutral-50)', borderRadius: '0.5rem' }}>
                  <ThumbsUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--neutral-800)' }}>
                    {article.metrics.altmetric}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Altmetric</div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '1rem', 
              border: '1px solid var(--neutral-200)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--neutral-800)' }}>
                Artigos Relacionados
              </h3>
              {article.relatedArticles.map((related, index) => (
                <div key={index} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < article.relatedArticles.length - 1 ? '1px solid var(--neutral-200)' : 'none' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--neutral-800)' }}>
                    {related.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', marginBottom: '0.5rem' }}>
                    {related.authors.join(', ')}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
                    {related.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
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

export default ArticleViewer;

