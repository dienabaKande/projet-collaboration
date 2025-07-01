import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const navigate = useNavigate();

  const handleGrant = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedRight) return;

    try {
      const response = await fetch("http://localhost:5000/api/rights/grant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: selectedUser,
          droit: selectedRight,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Succès : ${data.message}`);
        setSelectedUser("");
        setSelectedRight("");
      } else {
        alert(`Erreur : ${data.message || "Erreur lors de l'attribution du droit"}`);
      }
    } catch (error) {
      alert("Erreur de connexion au serveur");
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <h2>🔐 Espace Administrateur</h2>

      <form onSubmit={handleGrant}>
        <label>👤 Étudiant :</label>
        <input
          type="text"
          placeholder="Nom ou ID de l'étudiant"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        />

        <label>🛠️ Droits à attribuer :</label>
        <select
          value={selectedRight}
          onChange={(e) => setSelectedRight(e.target.value)}
          required
        >
          <option value="">-- Sélectionner un droit --</option>
          <option value="publier">📝 Publier</option>
          <option value="commenter">💬 Commenter</option>
          <option value="administrer">🔧 Administrer</option>
        </select>

        <button type="submit" className="grant">
          ✔️ Attribuer Droits
        </button>
      </form>

      {/* Bouton de retour */}
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        Retour
      </button>

      <style>{`
        .admin-container {
          max-width: 600px;
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

        input, select {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          margin-top: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .grant {
          background-color: #9c88ff;
          color: white;
        }

        .back-button {
          background-color: #e0e0e0;
          color: #333;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Admin;
