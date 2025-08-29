import React from 'react';
import { Send, Loader } from 'lucide-react';

const SubmitButton = ({ loading, children, ...props }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!loading) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }
      }}
      {...props}
    >
      {loading ? (
        <Loader style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
      ) : (
        <Send style={{ width: '16px', height: '16px' }} />
      )}
      {loading ? 'Criando...' : children}
    </button>
  );
};

export default SubmitButton;