import axios from 'axios';

const API_URL = '/api/users/profile';

const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const updateProfile = async (profile) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(API_URL, profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { getProfile, updateProfile };
``
