import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../services/authService';
import '../styles/main.css';

const Profile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState({
    email: '',
    destination: '',
    budget: '',
    currency: '',
    language: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put('/api/users/profile', profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled
          className="profile-input"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={profile.destination}
          onChange={handleChange}
          className="profile-input"
        />
        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={profile.budget}
          onChange={handleChange}
          className="profile-input"
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={profile.currency}
          onChange={handleChange}
          className="profile-input"
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={profile.language}
          onChange={handleChange}
          className="profile-input"
        />
        <button type="submit" className="profile-button">Update Profile</button>
      </form>
      <button onClick={logout} className="profile-button">Logout</button>
    </div>
  );
};

export default Profile;
