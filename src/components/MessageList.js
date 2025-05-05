import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(res => {
        console.log("Messages reçus :", res.data);
        setMessages(res.data);
      })
      .catch(err => console.error('Erreur de chargement des messages:', err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/messages/${id}`)
      .then(() => setMessages(messages.filter(msg => msg._id !== id)))
      .catch(err => console.error('Erreur lors de la suppression:', err));
  };

  const handleBlock = (id) => {
    axios.put(`http://localhost:5000/api/messages/${id}`, { isBlocked: true })
      .then(res => {
        const updated = messages.map(m => m._id === id ? res.data : m);
        setMessages(updated);
      })
      .catch(err => console.error('Erreur lors du blocage:', err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Messages / Commentaires</h2>
      <ul>
        {messages.map(msg => (
          <li key={msg._id} style={{ marginBottom: '1rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
            <strong>{msg.user || 'Anonyme'}</strong> : {msg.content}
            {msg.isBlocked && <span style={{ color: 'red', marginLeft: '1rem' }}>(Bloqué)</span>}
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleBlock(msg._id)} style={{ marginRight: '0.5rem' }}>Bloquer</button>
              <button onClick={() => handleDelete(msg._id)} style={{ color: 'red' }}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
