import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import VoiceControls from './VoiceControls';

const ChatInput = ({
  onSend,
  disabled,
  placeholder = "Type your message...",
  currentCharacter
}) => {

  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  //  voice recognition states (added)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const textareaRef = useRef(null);

  /* VOICE RECOGNITION INIT */

  useEffect(() => {

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;

        setMessage(prev =>
          prev + (prev ? ' ' : '') + transcript
        );
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      recognitionRef.current?.stop();
    };

  }, []);

  /* AUTO RESIZE TEXTAREA */

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [message]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  /*SEND MESSAGE*/

  const handleSubmit = (e) => {

    e?.preventDefault();

    if (!message.trim() || disabled) return;

    onSend(message.trim());

    setMessage('');

    textareaRef.current.style.height = 'auto';

    setTimeout(() => textareaRef.current?.focus(), 10);
  };

  const handleKeyDown = (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }

  };

  /* TOGGLE VOICE INPUT */

  const toggleVoiceInput = () => {

    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }

  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">

        <form onSubmit={handleSubmit} className="chat-input-form">

          <div className={`chat-input-field-wrapper ${isFocused ? 'focused' : ''}`}>

            {/*  VoiceControls + listening state */}
            <VoiceControls
              isListening={isListening}
              onToggleMic={toggleVoiceInput}
            />

            <div className="chat-input-textarea-container">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  isListening
                    ? "Listening..."
                    : disabled
                      ? 'Please wait...'
                      : placeholder
                }
                disabled={disabled}
                rows={1}
                className="chat-input-textarea"
              />
            </div>

            <div className="chat-input-actions">

              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className={`chat-input-send-btn ${
                  message.trim() && !disabled ? 'active' : ''
                }`}
              >
                <Send size={20} />
              </button>

            </div>
          </div>

          {message.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span>
                <kbd style={{
                  padding: '2px 6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  Enter
                </kbd> to send
              </span>

              <span style={{
                color: message.length > 450
                  ? '#ff6b6b'
                  : 'rgba(255,255,255,0.5)'
              }}>
                {message.length} / 500
              </span>
            </div>
          )}

        </form>

        {currentCharacter && (
          <div className="chat-input-character-info">
            <div className="avatar avatar-sm">
              {currentCharacter.image
                ? <img src={currentCharacter.image} alt={currentCharacter.name} />
                : <span>💜</span>}
            </div>

            <span>
              Talking with <strong>{currentCharacter.name}</strong>
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatInput;