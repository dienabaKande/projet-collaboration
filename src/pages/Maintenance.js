import React from 'react';
import '../App.css';

import IncidentLogs from '../components/IncidentLogs';

const Maintenance = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>🔧 Maintenance et sécurité</h1>
      <p>Surveillez les erreurs système et incidents techniques.</p>
      <IncidentLogs />
    </div>
  );
};

export default Maintenance;
 
