import { motion } from 'framer-motion';

const TypingIndicator = ({ characterName, characterImage }) => {
  const getCharacterInitials = () => {
    if (!characterName) return '💜';
    const words = characterName.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return characterName.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="typing-indicator"
    >
      <div className="typing-indicator-content">
        {/* Avatar */}
        <div className="typing-indicator-avatar">
          <div className="avatar avatar-md">
            {characterImage ? (
              <img 
                src={characterImage} 
                alt={characterName}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <span style={{ display: characterImage ? 'none' : 'flex' }}>
              {getCharacterInitials()}
            </span>
            <div className="avatar-status online" />
          </div>
        </div>
        
        {/* Typing Bubble */}
        <div className="typing-indicator-bubble glass-effect-strong">
          <div className="typing-indicator-text">
            <span className="typing-indicator-name">{characterName}</span> is typing
          </div>
          <div className="typing-dots">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="typing-dot"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;