const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ INSCRIPTION
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Tentative d'inscription avec :", email);

  try {
    // Vérification de l'existence
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.warn("⚠️ Email déjà utilisé :", email);
      return res.status(400).json({ message: "Admin déjà inscrit avec cet email" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d’un nouvel admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log("✅ Admin créé avec succès :", newAdmin.email);

    res.status(201).json({ message: "Admin inscrit avec succès" });

  } catch (err) {
    console.error("❌ Erreur lors de l'inscription :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ CONNEXION
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin non trouvé" });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
