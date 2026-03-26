import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`
          ${sizes[size]} 
          border-4 border-purple-500/30 border-t-purple-500 
          rounded-full
        `}
      />
      {text && (
        <p className="text-white/60 text-sm">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;