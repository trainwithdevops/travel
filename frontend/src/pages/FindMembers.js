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
    <div className="find-members">
      <h1>Find Members</h1>
      <div className="filters">
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={filters.destination}
          onChange={handleChange}
          className="filter-input"
        />
        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={filters.budget}
          onChange={handleChange}
          className="filter-input"
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={filters.currency}
          onChange={handleChange}
          className="filter-input"
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={filters.language}
          onChange={handleChange}
          className="filter-input"
        />
      </div>
      <ul className="members-list">
        {members.map((member) => (
          <li key={member._id} className="member-item">
            {member.email} - {member.destination} - {member.budget} - {member.currency} - {member.language}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindMembers;
