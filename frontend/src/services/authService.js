import axios from 'axios';

const API_URL = '/api/users/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', {
    email,
    password,
  });
};

export default {
  register,
};
