import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import MemoryIndicator from '../components/chat/MemoryIndicator';
import { useChat } from '../hooks/useChat';
import { exportChatAsTXT, exportChatAsPDF } from '../utils/exportChat'; 

import ChatHeader from '../components/chat/ChatHeader';
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';

const Chat = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
  currentCharacter,
  messages,
  isTyping,
  sendMessage,
  regenerateMessage,
  conversationMemory
} = useChat();
 
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    const convId = searchParams.get('conversation_id');

    if (!currentCharacter && !convId) {
      console.warn('No character and no conversation_id - redirecting to explore');
      navigate('/explore');
    }
  }, []);

  const handleBack = () => {
    navigate('/explore');
  };

 
  const handleExport = (format) => {

    if (!messages || messages.length === 0) {
      toast.error('No messages to export');
      return;
    }

    try {

      if (format === 'txt') {
        exportChatAsTXT(messages, currentCharacter.name);
        toast.success('Chat exported as TXT');
      }

      if (format === 'pdf') {
        exportChatAsPDF(messages, currentCharacter.name);
        toast.success('Chat exported as PDF');
      }

      setShowExportMenu(false);

    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export chat');
    }
  };

  if (!currentCharacter) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <MemoryIndicator memory={conversationMemory} />
      {/* HEADER */}
      <div style={{ flexShrink: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            <button
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={20} />
            </button>

            <ChatHeader character={currentCharacter} />

          </div>

          {/* EXPORT BUTTON */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Export
            </button>

            {showExportMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '8px',
                background: 'rgba(15,23,42,0.98)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px',
                minWidth: '150px',
                zIndex: 1000
              }}>
                <button
                  onClick={() => handleExport('txt')}
                  style={dropdownStyle}
                >
                  <FileText size={16} />
                  Export as TXT
                </button>

                <button
                  onClick={() => handleExport('pdf')}
                  style={dropdownStyle}
                >
                  <FileText size={16} />
                  Export as PDF
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MESSAGES */}
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            onRegenerate={regenerateMessage}
          />
        </div>
      </div>

      {/* INPUT */}
      <div style={{ flexShrink: 0, position: 'sticky', bottom: 0 }}>
        <ChatInput
          onSend={sendMessage}
          disabled={isTyping}
          currentCharacter={currentCharacter}
        />
      </div>

    </div>
  );
};

const dropdownStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textAlign: 'left'
};

export default Chat;