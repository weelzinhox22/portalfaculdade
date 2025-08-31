import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'floating' | 'minimal';
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  success = false,
  disabled = false,
  required = false,
  className = '',
  icon,
  variant = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const getInputClasses = () => {
    const baseClasses = 'w-full px-4 py-3 text-gray-900 placeholder-gray-500 border-2 rounded-lg transition-all duration-200 focus:outline-none';

    let stateClasses = '';

    if (error) {
      stateClasses = 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200';
    } else if (success) {
      stateClasses = 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200';
    } else if (isFocused) {
      stateClasses = 'border-teal-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200';
    } else {
      stateClasses = 'border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100';
    }

    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';

    return `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;
  };

  const getLabelClasses = () => {
    const baseClasses = 'absolute left-4 transition-all duration-200 pointer-events-none';

    if (variant === 'floating') {
      if (isFocused || hasValue) {
        return `${baseClasses} top-1 text-xs font-medium text-teal-600`;
      } else {
        return `${baseClasses} top-3.5 text-base text-gray-500`;
      }
    }

    return `${baseClasses} top-1 text-xs font-medium ${error ? 'text-red-600' : success ? 'text-green-600' : isFocused ? 'text-teal-600' : 'text-gray-600'}`;
  };

  const renderInput = () => (
    <motion.div
      className="relative"
      initial={false}
      animate={{
        scale: error ? [1, 1.02, 1] : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon */}
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
          {icon}
        </div>
      )}

      {/* Input */}
      <motion.input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        className={`${getInputClasses()} ${icon ? 'pl-10' : ''}`}
        placeholder={variant === 'floating' ? '' : placeholder}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      />

      {/* Floating Label */}
      {label && variant === 'floating' && (
        <motion.label
          className={getLabelClasses()}
          animate={{
            y: (isFocused || hasValue) ? -8 : 0,
            scale: (isFocused || hasValue) ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      {/* Default Label */}
      {label && variant !== 'floating' && (
        <label className={getLabelClasses()}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}

      {/* Success Indicator */}
      {success && !error && (
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}

      {/* Focus Ring Animation */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={false}
        animate={{
          boxShadow: isFocused
            ? error
              ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
              : success
              ? '0 0 0 3px rgba(34, 197, 94, 0.1)'
              : '0 0 0 3px rgba(20, 184, 166, 0.1)'
            : '0 0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );

  return renderInput();
};

export default AnimatedInput;