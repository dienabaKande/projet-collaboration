import React from 'react';
import '../App.css';

import ActivityDashboard from '../components/ActivityDashboard';

const Dashboard = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>👀 Supervision des collaborations</h1>
      <p>Surveillez les projets, groupes et discussions en cours.</p>
      <ActivityDashboard />
    </div>
  );
};

export default Dashboard;
 
