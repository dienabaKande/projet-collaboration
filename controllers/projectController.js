const Project = require('../models/Project');
const User = require('../models/User');

exports.joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });

    // Ajouter l'étudiant comme membre s'il n'est pas déjà
    if (!project.members.includes(req.user.id)) {
      project.members.push(req.user.id);
      await project.save();
    }

    // Ajouter le projet dans la liste des projets de l'étudiant
    const user = await User.findById(req.user.id);
    if (!user.projects.includes(project._id)) {
      user.projects.push(project._id);
      await user.save();
    }

    res.status(200).json({ message: "Vous avez rejoint le projet avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// Créer un projet
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Le titre du projet est requis." });
    }

    // Créer le projet
    const project = new Project({
      title,
      description,
      creator: req.user.id,
      members: [req.user.id], // le créateur est automatiquement membre
    });

    await project.save();

    // Ajouter le projet à l'utilisateur
    const user = await User.findById(req.user.id);
    user.projects.push(project._id);
    await user.save();

    res.status(201).json({ message: "Projet créé avec succès", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
