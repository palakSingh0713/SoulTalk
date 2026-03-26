import axios from './axios';

const charactersAPI = {
  async getAll() {
    try {
      const response = await axios.get('/explore.php');
      return response.data.characters || [];
    } catch (error) {
      console.error('Get characters error:', error);
      return [];
    }
  },

  async createCustomCharacter(characterData) {
    try {
      const formData = new FormData();
      Object.keys(characterData).forEach(key => {
        formData.append(key, characterData[key]);
      });

      const response = await axios.post('/create_story.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Create character error:', error);
      return { success: false, message: 'Failed to create character' };
    }
  },

  async deleteCharacter(characterId) {
    try {
      const response = await axios.post('/delete_story.php', {
        id: characterId,
      });

      return { success: true };
    } catch (error) {
      console.error('Delete character error:', error);
      return { success: false };
    }
  },
};

export default charactersAPI;