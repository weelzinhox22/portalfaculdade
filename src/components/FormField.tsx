import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: string;
  success?: boolean;
  children: ReactNode;
  required?: boolean;
  showCharCount?: boolean;
  currentLength?: number;
  maxLength?: number;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  success = false,
  children,
  required = false,
  showCharCount = false,
  currentLength = 0,
  maxLength = 0,
  className = ''
}) => {
  return (
    <motion.div
      className={`mb-6 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.label
        className="block text-sm font-semibold text-gray-700 mb-2"
        animate={{
          color: error ? '#ef4444' : success ? '#10b981' : '#374151'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {required && (
          <motion.span
            className="text-red-500 ml-1"
            animate={{ scale: error ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            *
          </motion.span>
        )}
      </motion.label>

      <motion.div
        animate={{
          scale: error ? [1, 1.01, 1] : 1,
          borderColor: error ? '#ef4444' : success ? '#10b981' : '#d1d5db'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {(error || success || showCharCount) && (
          <motion.div
            className="flex justify-between items-center mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  className="flex items-center text-red-600 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                  </motion.div>
                  {error}
                </motion.div>
              ) : success ? (
                <motion.div
                  key="success"
                  className="flex items-center text-green-600 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                  </motion.div>
                  Campo válido
                </motion.div>
              ) : (
                <div></div>
              )}
            </AnimatePresence>

            {showCharCount && (
              <motion.span
                className={`text-xs ${
                  currentLength > maxLength ? 'text-red-500' : 'text-gray-500'
                }`}
                animate={{
                  scale: currentLength > maxLength ? [1, 1.1, 1] : 1,
                  color: currentLength > maxLength ? '#ef4444' : '#6b7280'
                }}
                transition={{ duration: 0.2 }}
              >
                {currentLength}/{maxLength}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FormField;
