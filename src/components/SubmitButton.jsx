import React from 'react';
import { Send } from 'lucide-react';
import RippleButton from './animations/RippleButton';
import LoadingSpinner from './animations/LoadingSpinner';

const SubmitButton = ({ loading, children, className = '', ...props }) => {
  return (
    <RippleButton
      type="submit"
      disabled={loading}
      loading={loading}
      variant="primary"
      size="md"
      className={`font-semibold ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          Criando...
        </>
      ) : (
        <>
          <Send size={16} />
          {children}
        </>
      )}
    </RippleButton>
  );
};

export default SubmitButton;