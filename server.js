const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

// Charger les variables d'environnement et connecter la base
dotenv.config();
connectDB();

const app = express();
app.set('env', 'development'); // Affiche les erreurs détaillées en dev
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dossier statique pour CSS / JS front-end
app.use(express.static(path.join(__dirname, 'public')));

// Configurer EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/invitations', require('./routes/invitationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// 🌟 Nouvelle page d'accueil
app.get('/home', (req, res) => res.render('home'));

// Routes de rendu des vues
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/projects/new', (req, res) => res.render('create-project'));
app.get('/projects/:id', (req, res) => {
  res.render('project-detail', { projectId: req.params.id });
});
app.get('/invitations', (req, res) => res.render('invitation'));
app.get('/profile', (req, res) => res.render('profile'));

// 🔁 Redirection root vers /home
app.get('/', (req, res) => res.redirect('/home'));

// 👉 Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('❌ Erreur détectée :', err.stack);
  res.status(500).send('Une erreur est survenue sur le serveur.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


