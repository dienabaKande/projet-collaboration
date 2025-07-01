import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Formulaire d'inscription soumis :", formData);

    // Rediriger directement vers /dashboard après inscription
    navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <h2>📝 Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label>👤 Nom complet :</label>
        <input
          type="text"
          name="nom"
          placeholder="Entrer votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />

        <label>📧 Email :</label>
        <input
          type="email"
          name="email"
          placeholder="Entrer votre email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>🔐 Mot de passe :</label>
        <input
          type="password"
          name="password"
          placeholder="Créer un mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>🔁 Confirmer le mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">S'inscrire</button>
      </form>

      <p className="login-link">
        Déjà inscrit ?{" "}
        <span onClick={() => navigate("/login")}>Se connecter 🔑</span>
      </p>

      <style>{`
        .register-container {
          max-width: 500px;
          margin: auto;
          padding: 30px;
          background-color: #f3f0ff;
          border-radius: 10px;
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        label {
          display: block;
          margin-top: 15px;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
        }

        button {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          background-color: #9c88ff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }

        .login-link {
          margin-top: 15px;
          text-align: center;
        }

        .login-link span {
          color: blue;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;
