const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middlewares/authMiddleware');
const Project = require('../models/Project');
const { joinProject, createProject } = require('../controllers/projectController');

// ✅ Créer un projet (protégé)
router.post('/create', auth, createProject);

// ✅ Rejoindre un projet (protégé)
router.post('/:projectId/join', auth, async (req, res) => {
  const { projectId } = req.params;

  // Validation de l'ID du projet
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'ID de projet invalide' });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Vérifier si l'utilisateur est déjà membre du projet
    if (project.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Vous êtes déjà membre de ce projet' });
    }

    // Ajouter l'utilisateur aux membres du projet
    project.members.push(req.user._id);
    await project.save();

    // Ajouter le projet à la liste des projets de l'utilisateur
    const user = await User.findById(req.user._id);
    if (!user.projects.includes(projectId)) {
      user.projects.push(projectId);
      await user.save();
    }

    res.status(200).json({ message: 'Projet rejoint avec succès', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la tentative de rejoindre le projet' });
  }
});

// ✅ Récupérer tous les projets d’un utilisateur connecté (protégé)
router.get('/my-projects', auth, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user._id });
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des projets' });
  }
});

module.exports = router;

