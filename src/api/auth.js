import axios from './axios';

const authAPI = {


  async login(email, password) {
    try {
      const response = await axios.post('/login.php',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed',
      };
    }
  },

  async register(name, email, password, securityQuestion, securityAnswer) {
    try {
      const response = await axios.post('/register.php',
        { name, email, password, securityQuestion, securityAnswer },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.error || 'Registration failed',
      };
    }
  },


  async logout() {
    try {
      await axios.get('/logout.php');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  },


  async updateProfile(data) {
    try {
      const response = await axios.post('/profile.php',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Update failed' };
    }
  },

};

export default authAPI;