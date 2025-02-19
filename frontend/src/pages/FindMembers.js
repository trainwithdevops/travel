import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const FindMembers = () => {
  const [members, setMembers] = useState([]);
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    currency: '',
    language: '',
  });

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      setMembers(res.data);
    };

    fetchMembers();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Find Members</h1>
      <div className="form-row">
        <div className="form-group col-md-3">
          <input
            type="text"
            name="destination"
           
