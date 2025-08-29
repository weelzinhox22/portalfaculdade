import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error: string;
  children: ReactNode;
  required?: boolean;
  showCharCount?: boolean;
  currentLength?: number;
  maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  children, 
  required = false,
  showCharCount = false,
  currentLength = 0,
  maxLength = 0
}) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        {label} {required && '*'}
      </label>
      
      {children}
      
      {(error || showCharCount) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem'
        }}>
          {error ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#ef4444',
              fontSize: '0.875rem'
            }}>
              <AlertCircle style={{ width: '16px', height: '16px', marginRight: '0.25rem' }} />
              {error}
            </div>
          ) : (
            <div></div>
          )}
          
          {showCharCount && (
            <span style={{
              fontSize: '0.75rem',
              color: currentLength > maxLength ? '#ef4444' : '#6b7280'
            }}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FormField;
