import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestrictRights = () => {
  const [userId, setUserId] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const navigate = useNavigate();

  const handleRestrict = async (e) => {
    e.preventDefault();
    if (!userId || !selectedRight) return;

    try {
      const response = await fetch('http://localhost:5000/api/rights/revoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: userId,
          droit: selectedRight,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Succès : ${data.message}`);
        setUserId("");
        setSelectedRight("");
      } else {
        alert(`Erreur : ${data.message || 'Quelque chose a mal tourné'}`);
      }
    } catch (error) {
      alert("Erreur de connexion au serveur");
      console.error(error);
    }
  };

  return (
    <div className="restrict-container">
      <h2>❌ Restreindre des Droits</h2>
      <form onSubmit={handleRestrict}>
        <label>👤 Identifiant de l'utilisateur :</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="ex : ID ou email"
          required
        />

        <label>🔒 Droit à restreindre :</label>
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

        <button type="submit">Restreindre</button>
      </form>

      <button className="back" onClick={() => navigate("/dashboard")}>
        Retour
      </button>

      <style>{`
        .restrict-container {
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
        }

        label {
          display: block;
          margin-top: 15px;
          font-weight: bold;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          background-color: #e17055;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button.back {
          margin-top: 15px;
          background-color: #dcdde1;
          color: black;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default RestrictRights;
