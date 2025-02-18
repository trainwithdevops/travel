import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const res = await axios.get('/api/users', { params: filters });
      setMembers(res.data);
    };

    fetchMembers();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Find Members</h1>
      <div>
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={filters.destination}
          onChange={handleChange}
        />
        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={filters.budget}
          onChange={handleChange}
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={filters.currency}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={filters.language}
          onChange={handleChange}
        />
      </div>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            {member.email} - {member.destination} - {member.budget} - {member.currency} - {member.language}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindMembers;
