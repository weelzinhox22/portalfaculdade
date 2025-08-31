import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  delay = 0,
  className = '',
  hover = true,
  variant = 'default',
  onClick
}) => {
  const getHoverProps = () => {
    if (!hover) return {};

    switch (variant) {
      case 'scale':
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
        };
      case 'lift':
        return {
          whileHover: { y: -8 },
          whileTap: { y: -4 },
        };
      default:
        return {
          whileHover: { y: -5 },
          whileTap: { y: -2 },
        };
    }
  };

  return (
    <motion.div
      className={`h-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
      }}
      {...getHoverProps()}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;