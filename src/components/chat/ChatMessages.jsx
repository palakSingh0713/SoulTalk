import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Loader } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ChatMessages = ({ messages, isTyping, onRegenerate }) => {

  const { chatThemeStyles } = useTheme(); //  get theme styles

  const messagesEndRef = useRef(null);
  const [regeneratingId, setRegeneratingId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleRegenerate = async (messageIndex) => {
    const botMessage = messages[messageIndex];
    setRegeneratingId(botMessage.id);

    if (onRegenerate) {
      await onRegenerate(messageIndex);
    }

    setRegeneratingId(null);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <AnimatePresence>
        {messages.map((message, index) => {

          const isBot = message.sender === 'bot';
          const showRegenerate = isBot && !isTyping && index > 0;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: isBot ? 'row' : 'row-reverse',
                gap: '12px',
                marginBottom: '20px',
                alignItems: 'flex-start'
              }}
            >

              {/* Avatar */}
              <div className="avatar avatar-md" style={{ flexShrink: 0 }}>
                {isBot ? (
                  message.character?.image ? (
                    <img src={message.character.image} alt={message.character.name} />
                  ) : (
                    <span>🤖</span>
                  )
                ) : (
                  <span>ME</span>
                )}
              </div>

              {/* Message Container */}
              <div style={{
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>

                {/* Message Bubble using THEME styles */}
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: isBot
                      ? '16px 16px 16px 4px'
                      : '16px 16px 4px 16px',
                    background: isBot
                      ? chatThemeStyles.botBubble
                      : chatThemeStyles.userBubble,
                    border: isBot
                      ? chatThemeStyles.botBorder
                      : 'none',
                    color: 'white',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    wordWrap: 'break-word'
                  }}
                >
                  {message.text}
                </div>

                {/* Timestamp + Regenerate */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  paddingLeft: isBot ? '4px' : '0',
                  paddingRight: isBot ? '0' : '4px'
                }}>

                  <span>{formatTime(message.timestamp)}</span>

                  {showRegenerate && (
                    <button
                      onClick={() => handleRegenerate(index)}
                      disabled={regeneratingId === message.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '11px',
                        cursor: regeneratingId === message.id ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: regeneratingId === message.id ? 0.5 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (regeneratingId !== message.id) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      }}
                    >
                      {regeneratingId === message.id ? (
                        <>
                          <Loader size={12} className="spinner" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RotateCcw size={12} />
                          Regenerate
                        </>
                      )}
                    </button>
                  )}

                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}
        >
          <div className="avatar avatar-md">
            <span>🤖</span>
          </div>

          <div style={{
            padding: '14px 18px',
            borderRadius: '16px 16px 16px 4px',
            background: chatThemeStyles.botBubble,
            border: chatThemeStyles.botBorder,
            display: 'flex',
            gap: '6px'
          }}>
            <span className="typing-dot">•</span>
            <span className="typing-dot">•</span>
            <span className="typing-dot">•</span>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />

    </div>
  );
};

export default ChatMessages;