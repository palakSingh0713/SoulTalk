import { createContext, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import voiceService from '../services/voiceService';
import { extractMemoryFromConversation, buildMemoryPrompt } from '../utils/memoryExtractor';

export const ChatContext = createContext();

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const ChatProvider = ({ children }) => {

  const [searchParams] = useSearchParams();

  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversationMemory, setConversationMemory] = useState(null);

  const isLoadingRef = useRef(false);
  const loadedConversationRef = useRef(null);

  
  // LOAD FROM URL
  
  useEffect(() => {
    const convId = searchParams.get('conversation_id');

    if (!convId) {
      loadedConversationRef.current = null;
      return;
    }

    
    if (loadedConversationRef.current === convId) return;
    if (isLoadingRef.current) return;

    loadConversation(convId);

  }, [searchParams]); 

  
  // LOAD CONVERSATION
  
  const loadConversation = async (convId) => {

    if (isLoadingRef.current) return;
    if (loadedConversationRef.current === convId) return;

    isLoadingRef.current = true;
    loadedConversationRef.current = convId;
    setConversationId(convId);

    try {

      const response = await fetch(
        `http://localhost/soulapp/php/load_conversation.php?conversation_id=${convId}`,
        { credentials: 'include' }
      );

      const data = await response.json();

      if (data.messages?.length > 0) {

        
        const formatted = data.messages.map(msg => ({
          id: generateId(),
          text: msg.message,
          sender: msg.sender,
          timestamp: msg.created_at,
          character: msg.sender === 'bot' ? (currentCharacter || null) : null,
        }));

        setMessages(formatted);
        setIsTyping(false);
      }

      // LOAD MEMORY
      try {

        const memoryResponse = await fetch(
          `http://localhost/soulapp/php/memory.php?conversation_id=${convId}`,
          { credentials: 'include' }
        );

        const memoryData = await memoryResponse.json();

        if (memoryData.success && memoryData.memory) {
          setConversationMemory(memoryData.memory);
        }

      } catch {}

    } catch (err) {

      console.error('Load error:', err);

    } finally {

      isLoadingRef.current = false;
      setIsTyping(false);

    }
  };

 
  // SELECT CHARACTER
  
  const selectCharacter = (character, source = 'unknown', isHistoryMode = false) => {

    setCurrentCharacter(character);

    if (isHistoryMode) {
      return; 
    }

    // Fresh new chat
    setMessages([]);
    setConversationId(null);
    setConversationMemory(null);
    loadedConversationRef.current = null;
    setIsTyping(true);

    if (character.firstMessage) {

      const newConvId = 'conv_' + Date.now();
      setConversationId(newConvId);

      setTimeout(() => {

        const firstMsg = {
          id: generateId(),
          text: character.firstMessage,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          character,
        };

        setMessages([firstMsg]);
        setIsTyping(false);
        voiceService.speak(firstMsg.text, character);

      }, 800);
    }
  };

  
  // MEMORY UPDATE FUNCTION
  
  const updateConversationMemory = async () => {
      console.log("🧠 updateConversationMemory called");
  console.log("conversationId:", conversationId);
  console.log("messages.length:", messages.length);
  console.log("character id:", currentCharacter?.id);


    if (!conversationId || messages.length < 3) return;

    const memory = extractMemoryFromConversation(messages);
    if (!memory) return;

    
    const characterId = currentCharacter?.id;
    if (!characterId) {
      console.warn('Memory update skipped: no character id');
      return;
    }

    try {

      await fetch('http://localhost/soulapp/php/memory.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          conversation_id: conversationId,
          character_id: characterId,
          memory_summary: memory.summary,
          key_topics: memory.keyTopics,
          user_preferences: memory.userPreferences,
          emotional_tone: memory.emotionalTone
        })
      });

      setConversationMemory(memory);

    } catch (error) {

      console.error('Memory update failed', error);

    }
  };

 
  // AUTO MEMORY UPDATE
  
  useEffect(() => {

    if (!conversationId) return;
    if (messages.length < 3) return;

    
    if (conversationId.startsWith('conv_')) return;

    if (messages.length % 5 === 0) {
      console.log("💭 Auto memory trigger");
      updateConversationMemory();
    }

  }, [messages, conversationId]);

  
  // SEND MESSAGE
  
  const sendMessage = async (text) => {

    if (!text.trim() || !currentCharacter) return;

    const userMessage = {
      id: generateId(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const memoryPrompt = buildMemoryPrompt(conversationMemory);

    try {

      const response = await fetch('http://localhost/soulapp/php/ai.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: text.trim(),
          memory: memoryPrompt,
          conversation_id: conversationId,
          character: currentCharacter
        }),
      });

      const data = await response.json();

      
      if (data.conversation_id && data.conversation_id !== conversationId) {
        setConversationId(data.conversation_id);
      }

      const botMessage = {
        id: generateId(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        character: currentCharacter,
      };

      setMessages(prev => [...prev, botMessage]);
      voiceService.speak(botMessage.text, currentCharacter);

    } catch (error) {

      console.error('Chat error:', error);

    } finally {

      setIsTyping(false);

    }
  };

  
  // REGENERATE MESSAGE
  
  const regenerateMessage = async (messageIndex) => {

    if (messageIndex < 1 || !currentCharacter) return;

    const userMessage = messages[messageIndex - 1];
    if (!userMessage || userMessage.sender !== 'user') return;

    setMessages(prev => prev.filter((_, idx) => idx !== messageIndex));
    setIsTyping(true);

    try {

      const response = await fetch('http://localhost/soulapp/php/ai.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: userMessage.text,
          conversation_id: conversationId,
          character: currentCharacter
        })
      });

      const data = await response.json();

      const newBotMessage = {
        id: generateId(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        character: currentCharacter
      };

      setMessages(prev => {
        const updated = [...prev];
        updated.splice(messageIndex, 0, newBotMessage);
        return updated;
      });

      voiceService.speak(newBotMessage.text, currentCharacter);

    } catch {

    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider value={{
      currentCharacter,
      messages,
      isTyping,
      conversationId,
      selectCharacter,
      sendMessage,
      regenerateMessage,
      conversationMemory,
      updateConversationMemory
    }}>
      {children}
    </ChatContext.Provider>
  );
};