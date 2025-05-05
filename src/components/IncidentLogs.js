import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const IncidentLogs = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/incidents')
      .then(res => setIncidents(res.data))
      .catch(err => console.error('Erreur de chargement des incidents:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Journal des incidents</h2>
      <ul>
        {incidents.map(incident => (
          <li key={incident._id} style={{ marginBottom: '1rem', backgroundColor: '#fff4f4', padding: '1rem', borderRadius: '8px' }}>
            <strong>{incident.title}</strong> <br />
            <em>{incident.description}</em><br />
            <span style={{ fontSize: '0.9rem', color: 'gray' }}>
              {new Date(incident.createdAt).toLocaleDateString()} - Statut : <strong>{incident.status}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentLogs;
