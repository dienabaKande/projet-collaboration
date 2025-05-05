const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

// 🌍 Charger les variables d'environnement
dotenv.config();

// 🔌 Connexion à la base de données
connectDB();

const app = express();

// 🛠️ Détection de l'environnement
const isDevelopment = process.env.NODE_ENV === 'development';

// 🔒 Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// 🖼️ Configuration du moteur de vues EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 📦 Routes API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/invitations', require('./routes/invitationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// 🌐 Routes front-end (pages EJS)
app.get('/home', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/projects/new', (req, res) => res.render('create-project'));
app.get('/projects/:id', (req, res) => {
  res.render('project-detail', { projectId: req.params.id });
});
app.get('/invitations', (req, res) => res.render('invitation'));
app.get('/profile', (req, res) => res.render('profile'));
app.get('/about', (req, res) => res.render('about'));

// 🔁 Redirection de la racine vers /home
app.get('/', (req, res) => res.redirect('/home'));

// ❌ Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('❌ Erreur détectée :', err.stack);
  const errorMessage = isDevelopment ? err.stack : 'Une erreur est survenue sur le serveur.';
  res.status(500).send(errorMessage);
});

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${app.get('env')} mode on port ${PORT}`);
});
