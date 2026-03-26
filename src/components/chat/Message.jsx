import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Copy, Check, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../../utils/helpers';

const Message = ({ message, onSpeak, isSpeaking, currentCharacter, isFirst }) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getUserInitials = () => {
    return 'You';
  };

  const getCharacterInitials = () => {
    if (!currentCharacter?.name) return '💜';
    const words = currentCharacter.name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return currentCharacter.name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500,
        damping: 30 
      }}
      className={`message ${isUser ? 'message-user' : 'message-bot'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="message-content-wrapper">
        {/* Avatar */}
        {!isUser && (
          <div className="message-avatar">
            <div className="avatar avatar-md">
              {currentCharacter?.image ? (
                <img 
                  src={currentCharacter.image} 
                  alt={currentCharacter.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span style={{ display: currentCharacter?.image ? 'none' : 'flex' }}>
                {getCharacterInitials()}
              </span>
              <div className="avatar-status online" />
            </div>
          </div>
        )}

        <div className="message-bubble-container">
          {/* Message Bubble */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`message-bubble ${
              isUser 
                ? 'message-bubble-user' 
                : message.isError 
                  ? 'message-bubble-error'
                  : 'message-bubble-bot'
            }`}
          >
            <div className="message-text">
              {message.text}
            </div>

            {/* Message Glow Effect */}
            {!isUser && !message.isError && (
              <div className="message-glow" />
            )}
          </motion.div>

          {/* Metadata & Actions */}
          <div className="message-meta">
            <span className="message-time">
              {formatDate(message.timestamp)}
            </span>

            {/* Message Actions */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, x: isUser ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isUser ? 10 : -10 }}
                  className="message-actions"
                >
                  {/* Voice Button (Bot messages only) */}
                  {!isUser && onSpeak && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSpeak(message.text)}
                      className="message-action-btn"
                      title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
                    >
                      {isSpeaking ? (
                        <VolumeX size={16} className="message-action-icon active" />
                      ) : (
                        <Volume2 size={16} className="message-action-icon" />
                      )}
                    </motion.button>
                  )}

                  {/* Copy Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    className="message-action-btn"
                    title="Copy message"
                  >
                    {copied ? (
                      <Check size={16} className="message-action-icon success" />
                    ) : (
                      <Copy size={16} className="message-action-icon" />
                    )}
                  </motion.button>

                  {/* Regenerate Button (Error messages) */}
                  {message.isError && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="message-action-btn"
                      title="Retry"
                    >
                      <RefreshCw size={16} className="message-action-icon" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;