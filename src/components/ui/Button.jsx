import { forwardRef } from 'react';

const variants = {
  primary: 'bg-teal-600 hover:bg-teal-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  outline: 'bg-transparent border border-teal-600 text-teal-600 hover:bg-teal-50',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-800'
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg'
};

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`rounded-md font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;