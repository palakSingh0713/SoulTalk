import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://soultalk-api.ct.ws';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


axiosInstance.interceptors.request.use(
  (config) => {
   
    const user = JSON.parse(localStorage.getItem('soultalk_user') || 'null');
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
 
      localStorage.removeItem('soultalk_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;