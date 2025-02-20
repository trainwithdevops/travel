import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      const res = await axios.get('/api/users
