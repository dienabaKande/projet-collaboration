import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';  // ✅ Chemin corrigé
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import RestrictRights from './pages/RestrictRights'; // ✅ Import de la nouvelle page
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admint" element={<RestrictRights />} /> {/* ✅ Route ajoutée */}
      </Routes>
    </Router>
  );
};

export default App;
