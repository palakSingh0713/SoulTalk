import axios from './axios';

const chatAPI = {
  async sendMessage(message, characterId) {
    try {
      const response = await axios.post('/ai.php {
        message: message,
        bot: characterId,
      });

      return {
        reply: response.data.reply || "I'm here with you 💜",
        error: response.data.error || null,
      };
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Failed to get response');
    }
  },

  async getIntroMessage(characterId) {
    try {
      const response = await axios.post('/ai.php {
        message: '__intro__',
        bot: characterId,
      });

      return {
        reply: response.data.reply,
      };
    } catch (error) {
      console.error('Intro message error:', error);
      return {
        reply: "Hi 💜 I'm here with you. How are you feeling today?",
      };
    }
  },

  async getChatHistory(characterId) {
    try {
      const response = await axios.get(`/chat_history.php?bot=${characterId}`);
      return response.data.messages || [];
    } catch (error) {
      console.error('Chat history error:', error);
      return [];
    }
  },
};

export default chatAPI;