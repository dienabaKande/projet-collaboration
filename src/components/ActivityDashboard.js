import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const ActivityDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => setActivities(res.data))
      .catch(err => console.error('Erreur de chargement des activités:', err));
  }, []);

  const filtered = activities.filter((a) =>
    (a.project?.toLowerCase() || '').includes(filter.toLowerCase()) ||
    (a.user?.toLowerCase() || '').includes(filter.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>📌 Activités récentes</h1>

      <input
        type="text"
        placeholder="🔍 Filtrer par projet ou utilisateur"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul className="activity-list">
        {filtered.map((a) => (
          <li key={a._id}>
            <span className="author"><strong>{a.user}</strong></span>
            <span className="on">sur</span>
            <span className="project"><em>{a.project}</em></span>
            <span className="details">: {a.description}</span>
            <span className="date">{new Date(a.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityDashboard;
