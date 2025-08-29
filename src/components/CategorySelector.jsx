import React from 'react';
import { RefreshCw } from 'lucide-react';

const CategorySelector = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  onReload, 
  error,
  loading = false
}) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1rem' 
      }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          📂 Escolha uma Categoria *
        </label>

        <button
          type="button"
          onClick={onReload}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem 0.75rem',
            background: loading ? '#e5e7eb' : '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            color: loading ? '#9ca3af' : '#6b7280',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.background = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.background = '#f3f4f6';
          }}
        >
          <RefreshCw size={12} style={{ 
            animation: loading ? 'spin 1s linear infinite' : 'none' 
          }} />
          {loading ? 'Carregando...' : 'Recarregar'}
        </button>
      </div>

      {loading || categories.length === 0 ? (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#f9fafb',
          border: '2px dashed #d1d5db',
          borderRadius: '0.75rem',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {loading ? '⏳' : '📂'}
          </div>
          <p>{loading ? 'Carregando categorias...' : 'Nenhuma categoria encontrada'}</p>
          {!loading && (
            <button
              type="button"
              onClick={onReload}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#3b82f6';
              }}
            >
              Tentar Novamente
            </button>
          )}
        </div>
      ) : (
        <div
          role="radiogroup"
          aria-labelledby="category-label"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              role="radio"
              aria-checked={selectedCategory === category.id}
              tabIndex={selectedCategory === category.id ? 0 : -1}
              onClick={() => onCategoryChange(category.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCategoryChange(category.id);
                }
              }}
              style={{
                position: 'relative',
                padding: '1.25rem',
                border: `2px solid ${selectedCategory === category.id ? category.color || '#3b82f6' : '#e5e7eb'}`,
                borderRadius: '0.75rem',
                background: selectedCategory === category.id ? `${category.color || '#3b82f6'}08` : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedCategory === category.id ? `0 4px 12px ${category.color || '#3b82f6'}20` : '0 1px 3px rgba(0, 0, 0, 0.1)',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 3px ${category.color || '#3b82f6'}20`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = selectedCategory === category.id ? `0 4px 12px ${category.color || '#3b82f6'}20` : '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Radio Indicator */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `2px solid ${selectedCategory === category.id ? category.color || '#3b82f6' : '#d1d5db'}`,
                background: selectedCategory === category.id ? category.color || '#3b82f6' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedCategory === category.id && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'white'
                  }} />
                )}
              </div>

              {/* Category Content */}
              <div style={{ paddingRight: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.5rem',
                    background: `${category.color || '#3b82f6'}15`
                  }}>
                    {category.icon}
                  </span>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {category.name}
                  </h3>
                </div>
                
                {category.description && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          color: '#dc2626',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>
          Debug: {categories.length} categorias carregadas
          {selectedCategory && (
            <div>Selecionada: {categories.find(c => c.id === selectedCategory)?.name}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;