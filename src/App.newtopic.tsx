import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewTopic from './pages/NewTopic';
import CategorySelector from './components/CategorySelector';
import FormField from './components/FormField';
import SubmitButton from './components/SubmitButton';

// Mock Auth Context para preview
const MockAuthContext = React.createContext({
  user: { id: 'mock-user-123', email: 'user@example.com' },
  isAuthenticated: true
});

const MockAuthProvider = ({ children }) => {
  const mockUser = { id: 'mock-user-123', email: 'user@example.com' };
  
  return (
    <MockAuthContext.Provider value={{ 
      user: mockUser, 
      isAuthenticated: true 
    }}>
      {children}
    </MockAuthContext.Provider>
  );
};

// Mock das categorias para preview
const mockCategories = [
  {
    id: 'cat-1',
    name: 'Fisioterapia Respiratória',
    description: 'Técnicas respiratórias, ventilação mecânica, UTI',
    icon: '🫁',
    color: '#0891b2'
  },
  {
    id: 'cat-2',
    name: 'Fisioterapia Ortopédica',
    description: 'Lesões musculoesqueléticas, reabilitação',
    icon: '🦴',
    color: '#ea580c'
  },
  {
    id: 'cat-3',
    name: 'Fisioterapia Neurológica',
    description: 'AVC, lesões medulares, neuroplasticidade',
    icon: '🧠',
    color: '#8b5cf6'
  },
  {
    id: 'cat-4',
    name: 'Fisioterapia Esportiva',
    description: 'Prevenção, reabilitação esportiva',
    icon: '⚽',
    color: '#10b981'
  }
];

// Componente de demonstração do CategorySelector
const CategorySelectorDemo = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('cat-1');
  
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>
        🎨 Demonstração do Seletor de Categorias
      </h2>
      <CategorySelector
        categories={mockCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onReload={() => console.log('Recarregando categorias...')}
        error=""
      />
    </div>
  );
};

// Componente de demonstração dos FormFields
const FormFieldsDemo = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>
        📝 Demonstração dos Campos de Formulário
      </h2>
      
      <FormField
        label="📝 Título do Tópico"
        required
        showCharCount
        currentLength={title.length}
        maxLength={200}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título do tópico..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </FormField>

      <FormField
        label="💬 Conteúdo"
        required
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite o conteúdo..."
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </FormField>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <SubmitButton loading={false}>
          Criar Tópico
        </SubmitButton>
      </div>
    </div>
  );
};

// Mock do NewTopic com contexto
const MockNewTopic = () => {
  return (
    <MockAuthProvider>
      <NewTopic />
    </MockAuthProvider>
  );
};

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <Routes>
          <Route path="/" element={
              <div>
                <div style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'white',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <h1 style={{ color: '#1f2937', marginBottom: '1rem' }}>
                    🚀 Preview: Novo Sistema de Categorias
                  </h1>
                  <p style={{ color: '#6b7280' }}>
                    Interface visual moderna para seleção de categorias no fórum
                  </p>
                </div>
                
                <CategorySelectorDemo />
                <FormFieldsDemo />
                
                <div style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'white',
                  borderTop: '1px solid #e5e7eb',
                  marginTop: '2rem'
                }}>
                  <p style={{ color: '#6b7280' }}>
                    ✨ Componentes reutilizáveis criados para melhor experiência do usuário
                  </p>
                </div>
              </div>
            } />
            <Route path="/forum/new-topic" element={<MockNewTopic />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;