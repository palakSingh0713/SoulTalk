const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Search, Calendar, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { formatDate } from '../utils/helpers';
import { CHARACTERS } from '../utils/constants';
import toast from 'react-hot-toast';

const History = () => {
  const navigate = useNavigate();
  const { selectCharacter } = useChat();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

useEffect(() => {
  if (user?.email) {
    loadConversations();
  }
}, [user]);

  const loadConversations = async () => {
    try {
     const response = await fetch(`${API_URL}/get_conversations.php`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_email: user?.email })
});

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server returned non-JSON response');
        return;
      }

      const data = await response.json();

      if (data.conversations && data.conversations.length > 0) {
        const customChars = JSON.parse(localStorage.getItem('custom_characters') || '[]');
        const allCharacters = [...CHARACTERS, ...customChars];

        const enrichedConversations = data.conversations.map(conv => {
          const character = allCharacters.find(c => c.id === conv.character_id);
          
          return {
            ...conv,
            characterName: character?.name || conv.character_id || 'Unknown',
            characterImage: character?.image || null,
            character: character,
          };
        });
        
        setConversations(enrichedConversations);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const handleDeleteConversation = async (conversationId, e) => {
    e.stopPropagation();
    
    if (!confirm('Delete this conversation? This cannot be undone.')) {
      return;
    }

    setDeletingId(conversationId);

    try {
      const response = await fetch(`${API_URL}/delete_conversation.php`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Conversation deleted');
        setConversations(prev => prev.filter(c => c.conversation_id !== conversationId));
      } else {
        toast.error('Failed to delete conversation');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete conversation');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.characterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const handleOpenConversation = (conversation) => {
    const customChars = JSON.parse(localStorage.getItem('custom_characters') || '[]');
    const allCharacters = [...CHARACTERS, ...customChars];
    const character = allCharacters.find(c => c.id === conversation.character_id);
    
    if (character) {
      console.log('🔓 Opening:', conversation.conversation_id, 'for', character.name);
      
      // Step 1: Set character in context (isHistoryMode=true = don't clear messages)
      selectCharacter(character, 'History.handleOpenConversation', true);
      
      // Step 2: Navigate immediately — no delay needed
      navigate(`/chat?conversation_id=${conversation.conversation_id}`);
    } else {
      toast.error('Character not found');
    }
  };

  const getCharacterInitials = (name) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="page-with-navbar">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Chat <span className="text-gradient">History</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            View and manage your past conversations
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search 
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.4)',
                pointerEvents: 'none'
              }} 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '15px',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '60px' }}>
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.conversation_id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: deletingId === conversation.conversation_id ? 0.5 : 1
                }}
                onClick={() => handleOpenConversation(conversation)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div className="avatar avatar-lg">
                  {conversation.characterImage ? (
                    <img 
                      src={conversation.characterImage} 
                      alt={conversation.characterName}
                    />
                  ) : null}
                  <span style={{ display: conversation.characterImage ? 'none' : 'flex' }}>
                    {getCharacterInitials(conversation.characterName)}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>
                      {conversation.characterName}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      <Calendar size={12} />
                      <span>{formatDate(conversation.last_updated)}</span>
                    </div>
                  </div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    margin: '0 0 8px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {conversation.last_message}
                  </p>
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                    {conversation.message_count} messages
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenConversation(conversation);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={(e) => handleDeleteConversation(conversation.conversation_id, e)}
                    disabled={deletingId === conversation.conversation_id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      cursor: deletingId === conversation.conversation_id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💬</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>No conversations found</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '32px' }}>
                {searchQuery 
                  ? 'Try adjusting your search query'
                  : 'Start chatting to see your history'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate('/explore')}
                  className="btn btn-primary"
                >
                  Start Chatting
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default History;