import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    console.log("🔐 Connexion soumise avec :", formData);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2>🔐 Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label>📧 Email :</label>
        <input
          type="email"
          name="email"
          placeholder="Entrer votre email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>🔑 Mot de passe :</label>
        <input
          type="password"
          name="password"
          placeholder="Entrer votre mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">✅ Se connecter</button>
      </form>

      <style>{`
        .login-container {
          max-width: 500px;
          margin: auto;
          padding: 30px;
          background-color: #f3f0ff; /* mauve clair */
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
          background-color: #9c88ff; /* mauve */
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Login;
