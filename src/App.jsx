import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import SaudeAtleta from './pages/SaudeAtleta';
import UnidadeHospitalar from './pages/UnidadeHospitalar';
import SaudeIdoso from './pages/SaudeIdoso';
import Neurofuncional from './pages/Neurofuncional';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import SearchResults from './pages/SearchResults';
import ArticleViewer from './pages/ArticleViewer';
import NormasBiosseguranca1 from './pages/NormasBiosseguranca1';
import AvaliacaoUTI from './pages/AvaliacaoUTI';

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
    <Router>
      <div className="App">
        <Routes>
          {/* Páginas com layout completo (Header + Footer) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/sobre" element={<Layout><Sobre /></Layout>} />
          <Route path="/contato" element={<Layout><Contato /></Layout>} />
          
          {/* Páginas das matérias com layout específico (Header + Footer, mas sem sidebar no Layout) */}
          <Route path="/saude-atleta" element={<Layout><SaudeAtleta /></Layout>} />
          <Route path="/unidade-hospitalar" element={<Layout><UnidadeHospitalar /></Layout>} />
          <Route path="/saude-idoso" element={<Layout><SaudeIdoso /></Layout>} />
          <Route path="/neurofuncional" element={<Layout><Neurofuncional /></Layout>} />
          
          {/* Páginas de busca e artigos */}
          <Route path="/search" element={<Layout><SearchResults /></Layout>} />
          <Route path="/article/:id" element={<Layout><ArticleViewer /></Layout>} />
          <Route path="/article/view" element={<Layout><ArticleViewer /></Layout>} />
          
          {/* Páginas de conteúdo educacional */}
          <Route path="/normas-biosseguranca-1" element={<Layout><NormasBiosseguranca1 /></Layout>} />
          <Route path="/avaliacao-uti" element={<Layout><AvaliacaoUTI /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
