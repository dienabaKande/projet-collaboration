import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Moderation from './pages/Moderation';
import Maintenance from './pages/Maintenance';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/moderation">Modération</Link> |{" "}
        <Link to="/maintenance">Maintenance</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/moderation" element={<Moderation />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Routes>
    </Router>
  );
};

export default App;
