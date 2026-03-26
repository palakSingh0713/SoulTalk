import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../../hooks/useChat';

const ChatContainer = () => {
  const { currentCharacter, messages, isTyping, sendMessage } = useChat();

  if (!currentCharacter) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-8xl mb-6">💜</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            No character selected
          </h2>
          <p className="text-white/60 mb-8">
            Please select a character to start chatting
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Choose a Character
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ChatHeader character={currentCharacter} />
      
      <ChatMessages messages={messages} isTyping={isTyping} />
      
      <ChatInput 
        onSend={sendMessage} 
        disabled={isTyping}
        placeholder={`Message ${currentCharacter.name}...`}
      />
    </div>
  );
};

export default ChatContainer;