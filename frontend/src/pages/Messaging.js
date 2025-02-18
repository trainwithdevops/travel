import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    };

    fetchMessages();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.post('/api/messages', { recipientId, content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessages([...messages, res.data]);
    setContent('');
  };

  return (
    <div className="messaging">
      <h1>Messages</h1
