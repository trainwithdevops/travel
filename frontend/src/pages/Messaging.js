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
      <h1>Messages</h1>
      <form onSubmit={handleSend} className="messaging-form">
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="messaging-input"
        />
        <textarea
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="messaging-textarea"
        ></textarea>
        <button type="submit" className="messaging-button">Send</button>
      </form>
      <ul className="messages-list">
        {messages.map((message) => (
          <li key={message._id} className="message-item">
            <strong>{message.sender.email} to {message.recipient.email}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messaging;
