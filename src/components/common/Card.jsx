import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glass = true,
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      onClick={onClick}
      className={`
        ${glass ? 'glass-effect' : 'bg-white/5'}
        rounded-3xl p-6 
        ${hover ? 'cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;