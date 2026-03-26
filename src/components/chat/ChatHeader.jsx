import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MoreVertical, Trash2, Home, Info,
  Download, Share2, Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useChat } from '../../hooks/useChat';

const ChatHeader = ({ character }) => {
  const navigate = useNavigate();
  const { clearChat } = useChat();
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      clearChat();
      setShowMenu(false);
    }
  };

  const handleExportChat = () => {
    //  Implement chat export
    console.log('Export chat');
    setShowMenu(false);
  };

  const handleShareChat = () => {
    // Implement chat sharing
    console.log('Share chat');
    setShowMenu(false);
  };

  const getCharacterInitials = () => {
    if (!character?.name) return '💜';
    const words = character.name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return character.name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="chat-header glass-effect-strong"
    >
      <div className="chat-header-content">
        {/* Left Section */}
        <div className="chat-header-left">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/explore')}
            className="chat-header-back-btn"
            aria-label="Back to explore"
          >
            <ArrowLeft size={20} />
          </motion.button>

          {character && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowInfo(!showInfo)}
              className="chat-header-character"
            >
              {/* Avatar */}
              <div className="avatar avatar-lg">
                {character.image ? (
                  <img 
                    src={character.image} 
                    alt={character.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span style={{ display: character.image ? 'none' : 'flex' }}>
                  {getCharacterInitials()}
                </span>
                <div className="avatar-status online" />
              </div>
              
              {/* Info */}
              <div className="chat-header-character-info">
                <h2 className="chat-header-character-name">
                  {character.name}
                </h2>
                <div className="chat-header-character-status">
                  <span className="chat-header-status-indicator online" />
                  <span className="chat-header-status-text">Active now</span>
                </div>
              </div>
            </motion.button>
          )}
        </div>

        {/* Right Section */}
        <div className="chat-header-right">
          {/* Info Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowInfo(!showInfo)}
            className={`chat-header-action-btn ${showInfo ? 'active' : ''}`}
            aria-label="Character info"
          >
            <Info size={20} />
          </motion.button>

          {/* Menu Button */}
          <div className="chat-header-menu-container">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="chat-header-action-btn"
              aria-label="Menu"
            >
              <MoreVertical size={20} />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="chat-header-dropdown glass-effect-strong"
                >
                  <button
                    onClick={() => {
                      navigate('/');
                      setShowMenu(false);
                    }}
                    className="chat-header-menu-item"
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </button>
                  
                  <button
                    onClick={handleExportChat}
                    className="chat-header-menu-item"
                  >
                    <Download size={18} />
                    <span>Export Chat</span>
                  </button>

                  <button
                    onClick={handleShareChat}
                    className="chat-header-menu-item"
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowMenu(false);
                    }}
                    className="chat-header-menu-item"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <div className="chat-header-menu-divider" />
                  
                  <button
                    onClick={handleClearChat}
                    className="chat-header-menu-item danger"
                  >
                    <Trash2 size={18} />
                    <span>Clear Chat</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Character Info Panel */}
      <AnimatePresence>
        {showInfo && character && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="chat-header-info-panel"
          >
            <div className="chat-header-info-content">
              <p className="chat-header-info-tagline">
                {character.tagline}
              </p>
              <div className="chat-header-info-badges">
                <span className="badge">{character.personality}</span>
                <span className="badge">{character.voiceType} voice</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatHeader;