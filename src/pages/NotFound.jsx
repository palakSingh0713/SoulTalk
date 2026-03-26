import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative z-10 max-w-2xl"
      >
        {/* 404 Animation */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-gradient mb-4">404</div>
          <div className="text-6xl">😕</div>
        </motion.div>
        
        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-white/70 mb-10 max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </motion.button>
        </div>

        {/* Helper Text */}
        <p className="mt-12 text-sm text-white/40">
          Error Code: 404 • Lost in the SoulTalk universe
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;