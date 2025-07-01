const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const rightsRoutes = require('./routes/rights');

const app = express(); // ⚠️ il faut d'abord créer l'app ici

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);       // routes d'authentification
app.use('/api/rights', rightsRoutes);   // routes de gestion des droits

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("plateforme_etudiant :", mongoose.connection.name);

  console.log("✅ Connecté à MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("🚀 Serveur lancé sur le port " + process.env.PORT);
  });
}).catch(err => console.error("❌ Erreur de connexion à MongoDB:", err));
