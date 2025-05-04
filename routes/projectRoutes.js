// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Project = require('../models/Project');
const mongoose = require('mongoose');
const { joinProject, createProject } = require('../controllers/projectController');

// Créer un projet
router.post('/create', auth, createProject);

// Rejoindre un projet
router.post('/:projectId/join', auth, async (req, res) => {
  const { projectId } = req.params;
  // Validation de l'ID
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'ID de projet invalide' });
  }
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Vérifier si déjà membre
    if (project.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'Vous êtes déjà membre de ce projet' });
    }

    // Ajout de l'utilisateur
    project.members.push(req.user.id);
    await project.save();

    res.status(200).json({ message: 'Projet rejoint avec succès', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
