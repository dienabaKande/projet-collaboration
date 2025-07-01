import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Admin = () => {
  const navigate = useNavigate();

  // État pour stocker les données dynamiques
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    restrictedUsers: 0,
    lastActivity: "",
  });

  const [userRolesData, setUserRolesData] = useState([]);

  const COLORS = ["#6c5ce7", "#00cec9", "#fdcb6e"];

  // Appel API pour récupérer les stats utilisateurs
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/users/stats"); // Adapter URL backend ici
        if (!res.ok) throw new Error("Erreur lors de la récupération des stats");
        const data = await res.json();

        // Exemple de format attendu :
        // {
        //   totalUsers: 123,
        //   restrictedUsers: 4,
        //   lastActivity: "10 min ago",
        //   rolesDistribution: [
        //     { name: "Admin", value: 5 },
        //     { name: "User", value: 100 },
        //     { name: "Guest", value: 18 }
        //   ]
        // }

        setUserStats({
          totalUsers: data.totalUsers,
          restrictedUsers: data.restrictedUsers,
          lastActivity: data.lastActivity,
        });

        setUserRolesData(data.rolesDistribution);
      } catch (error) {
        console.error(error);
        // Tu peux gérer un état d'erreur ici si besoin
      }
    }

    fetchStats();
  }, []);

  const handleAssignRights = () => {
    navigate("/admin");
  };

  const handleRestrictRights = () => {
    navigate("/admint");
  };

  return (
    <div className="admin-dashboard">
      <h1>🎉 Bienvenue Admin</h1>
      <div className="dashboard-content">
        <div className="action-buttons">
          <button onClick={handleAssignRights} className="action-button">
            ⚙️ Attribuer des droits
          </button>
          <button onClick={handleRestrictRights} className="action-button">
            ⚙️ Restreindre des droits
          </button>
        </div>

        <div className="statistics">
          <div className="stats-card">
            <h4>Nombre d'utilisateurs</h4>
            <p>{userStats.totalUsers}</p>
          </div>
          <div className="stats-card">
            <h4>Utilisateurs ayant des droits restreints</h4>
            <p>{userStats.restrictedUsers}</p>
          </div>
          <div className="stats-card">
            <h4>Dernière activité des utilisateurs</h4>
            <p>{userStats.lastActivity}</p>
          </div>
        </div>

        <div className="chart-container">
          <h3>📈 Répartition des rôles :</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRolesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
                isAnimationActive={false} // optionnel pour éviter animation au chargement
              >
                {userRolesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          font-family: Arial, sans-serif;
          background-color: #f3f0ff;
          padding: 20px;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .action-buttons {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
        }

        .action-button {
          padding: 15px;
          font-size: 1.2em;
          background-color: #9c88ff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .action-button:hover {
          background-color: #7a63cc;
        }

        .statistics {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .stats-card {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 200px;
          margin: 10px;
        }

        .stats-card h4 {
          color: #333;
          font-size: 1.1em;
        }

        .stats-card p {
          font-size: 1.5em;
          color: #6c5ce7;
        }

        .chart-container {
          margin-top: 30px;
          text-align: center;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Admin;
