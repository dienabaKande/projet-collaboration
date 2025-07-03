import React from 'react';
import MessageList from '../components/MessageList';
import '../App.css';

const Moderation = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>🗣️ Modération des échanges</h1>
      <p>Gérez les messages inappropriés et les utilisateurs à risque.</p>
      <MessageList />
    </div>
  );
};

export default Moderation;
 
