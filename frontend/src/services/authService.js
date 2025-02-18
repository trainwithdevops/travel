import { useState } from 'react';
import axios from 'axios';

const API_URL = '/api/users/';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const res = await axios.post(API_URL + 'login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export { useAuth };
