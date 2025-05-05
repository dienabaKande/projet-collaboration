const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour empêcher l'accès aux pages si l'utilisateur est déjà connecté
const ensureGuest = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      return res.redirect('/dashboard');
    }
    next();
  } catch (error) {
    next(); // Même s'il y a une erreur, on laisse accéder (comme si non connecté)
  }
};

// Middleware pour protéger les routes nécessitant une authentification
const ensureAuth = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Accès refusé. Token manquant.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = {
  ensureGuest,
  ensureAuth
};




