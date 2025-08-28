import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritosProvider } from './contexts/FavoritosContext';
import Layout from './components/Layout';

// Lazy loading para componentes de página
const Home = lazy(() => import('./pages/Home'));
const SaudeAtleta = lazy(() => import('./pages/SaudeAtleta'));
const UnidadeHospitalar = lazy(() => import('./pages/UnidadeHospitalar'));
const SaudeIdoso = lazy(() => import('./pages/SaudeIdoso'));
const Neurofuncional = lazy(() => import('./pages/Neurofuncional'));
// Novas especialidades
const Respiratoria = lazy(() => import('./pages/Respiratoria'));
const Ortopedica = lazy(() => import('./pages/Ortopedica'));
const Esportiva = lazy(() => import('./pages/Esportiva'));
const Pediatrica = lazy(() => import('./pages/Pediatrica'));
const Geriatrica = lazy(() => import('./pages/Geriatrica'));
const Aquatica = lazy(() => import('./pages/Aquatica'));
const UTI = lazy(() => import('./pages/UTI'));
const FerramentasCalculo = lazy(() => import('./pages/FerramentasCalculo'));
const Sugestoes = lazy(() => import('./pages/Sugestoes'));
const Questoes = lazy(() => import('./pages/Questoes'));
const Simulados = lazy(() => import('./pages/Simulados'));
const CriarQuestao = lazy(() => import('./pages/CriarQuestao'));
const QuestoesComunidade = lazy(() => import('./pages/QuestoesComunidade'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminModerator = lazy(() => import('./pages/AdminModerator'));
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade'));
const TermosUso = lazy(() => import('./pages/TermosUso'));
const CasosClinicos = lazy(() => import('./pages/CasosClinicos'));
const Produtos = lazy(() => import('./pages/ProdutosSimple'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Downloads = lazy(() => import('./pages/Downloads'));
const Livros = lazy(() => import('./pages/Livros'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
const CheckoutFailure = lazy(() => import('./pages/CheckoutFailure'));
const CheckoutPIX = lazy(() => import('./pages/CheckoutPIX'));
const CheckoutPIXReal = lazy(() => import('./pages/CheckoutPIXReal'));
const CheckoutDireto = lazy(() => import('./pages/CheckoutDireto'));
const Blog = lazy(() => import('./pages/Blog'));
const Cursos = lazy(() => import('./pages/Cursos'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Conquistas = lazy(() => import('./pages/Conquistas'));
const Favoritos = lazy(() => import('./pages/Favoritos'));
const PoliticaCookies = lazy(() => import('./pages/PoliticaCookies'));
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import SearchResults from './pages/SearchResults';
import ArticleViewer from './pages/ArticleViewer';
import NormasBiosseguranca1 from './pages/NormasBiosseguranca1';
import AvaliacaoUTI from './pages/AvaliacaoUTI';
import ExamesComplementares from './pages/ExamesComplementares';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento da aplicação
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #134e4a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'white',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          marginBottom: '2rem',
          animation: 'fadeInScale 1s ease-out'
        }}>
          FisioWel
        </div>

        {/* Loading Spinner */}
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTop: '3px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />

        {/* Loading Text */}
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1rem',
          marginTop: '1.5rem',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          Carregando...
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeInScale {
            0% { 
              opacity: 0; 
              transform: scale(0.8); 
            }
            100% { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AuthProvider>
      <FavoritosProvider>
        <Router>
        <div className="App">
        <Routes>
          {/* Páginas com layout completo */}
          <Route path="/" element={
            <Layout>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              }>
                <Home />
              </Suspense>
            </Layout>
          } />
          {/* Aplicar o mesmo padrão para outras rotas */}
          <Route path="/sobre" element={<Layout><Sobre /></Layout>} />
          <Route path="/contato" element={<Layout><Contato /></Layout>} />
          
          {/* Páginas das matérias com layout específico (Header + Footer, mas sem sidebar no Layout) */}
          <Route path="/saude-atleta" element={<Layout><SaudeAtleta /></Layout>} />
          <Route path="/unidade-hospitalar" element={<Layout><UnidadeHospitalar /></Layout>} />
          <Route path="/saude-idoso" element={<Layout><SaudeIdoso /></Layout>} />
          <Route path="/neurofuncional" element={<Layout><Neurofuncional /></Layout>} />

          {/* Novas especialidades */}
          <Route path="/respiratoria" element={<Layout><Respiratoria /></Layout>} />
          <Route path="/neurologica" element={<Layout><Neurofuncional /></Layout>} />
          <Route path="/ortopedica" element={<Layout><Ortopedica /></Layout>} />
          <Route path="/esportiva" element={<Layout><Esportiva /></Layout>} />
          <Route path="/pediatrica" element={<Layout><Pediatrica /></Layout>} />
          <Route path="/geriatrica" element={<Layout><Geriatrica /></Layout>} />
          <Route path="/aquatica" element={<Layout><Aquatica /></Layout>} />
          <Route path="/uti" element={<Layout><UTI /></Layout>} />
          
          {/* Páginas de busca e artigos */}
          <Route path="/search" element={<Layout><SearchResults /></Layout>} />
          <Route path="/article/:id" element={<Layout><ArticleViewer /></Layout>} />
          <Route path="/article/view" element={<Layout><ArticleViewer /></Layout>} />
          
          {/* Páginas de conteúdo educacional */}
          <Route path="/normas-biosseguranca-1" element={<Layout><NormasBiosseguranca1 /></Layout>} />
          <Route path="/avaliacao-uti" element={<Layout><AvaliacaoUTI /></Layout>} />
          <Route path="/exames-complementares" element={<Layout><ExamesComplementares /></Layout>} />
          <Route path="/ferramentas-calculo" element={
            <Layout>
              <Suspense fallback={<div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>}>
                <FerramentasCalculo />
              </Suspense>
            </Layout>
          } />
          <Route path="/sugestoes" element={
            <Layout>
              <Suspense fallback={<div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>}>
                <Sugestoes />
              </Suspense>
            </Layout>
          } />
          <Route path="/questoes" element={
            <Layout>
              <Suspense fallback={<div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>}>
                <Questoes />
              </Suspense>
            </Layout>
          } />
          <Route path="/simulados" element={
            <Layout>
              <Suspense fallback={<div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>}>
                <Simulados />
              </Suspense>
            </Layout>
          } />
          <Route path="/criar-questao" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CriarQuestao />
            </Suspense>
          } />
          <Route path="/questoes-comunidade" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <QuestoesComunidade />
            </Suspense>
          } />
          <Route path="/auth" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Auth />
            </Suspense>
          } />
          <Route path="/profile" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Profile />
            </Suspense>
          } />
          <Route path="/admin/moderator" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <AdminModerator />
            </Suspense>
          } />
          <Route path="/politica-privacidade" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <PoliticaPrivacidade />
            </Suspense>
          } />
          <Route path="/termos-uso" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <TermosUso />
            </Suspense>
          } />
          <Route path="/casos-clinicos" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CasosClinicos />
            </Suspense>
          } />
          <Route path="/produtos" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Produtos />
            </Suspense>
          } />
          <Route path="/checkout/:productId?" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Checkout />
            </Suspense>
          } />
          <Route path="/downloads" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Downloads />
            </Suspense>
          } />
          <Route path="/livros" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Livros />
            </Suspense>
          } />
          <Route path="/checkout/success" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CheckoutSuccess />
            </Suspense>
          } />
          <Route path="/checkout/failure" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CheckoutFailure />
            </Suspense>
          } />
          <Route path="/checkout-pix" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CheckoutPIX />
            </Suspense>
          } />
          <Route path="/checkout-pix-real" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CheckoutPIXReal />
            </Suspense>
          } />
          <Route path="/checkout-direto" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <CheckoutDireto />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Blog />
            </Suspense>
          } />
          <Route path="/cursos" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Cursos />
            </Suspense>
          } />
          <Route path="/quiz" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Quiz />
            </Suspense>
          } />
          <Route path="/newsletter" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Newsletter />
            </Suspense>
          } />
          <Route path="/dashboard" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="/conquistas" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Conquistas />
            </Suspense>
          } />
          <Route path="/favoritos" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <Favoritos />
            </Suspense>
          } />
          <Route path="/politica-cookies" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>}>
              <PoliticaCookies />
            </Suspense>
          } />
        </Routes>
        </div>
      </Router>
      </FavoritosProvider>
    </AuthProvider>
  );
}

export default App;
