const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ce modèle doit exister !

// ➕ Attribuer un droit
router.post('/grant', async (req, res) => {
  const { nom, droit } = req.body;

  try {
    let user = await User.findOne({ nom });
    if (!user) user = await User.create({ nom, droits: [] });

    if (!user.droits.includes(droit)) {
      user.droits.push(droit);
      await user.save();
    }

    res.json({ message: `Droit '${droit}' attribué à ${nom}` });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ❌ Restreindre un droit
router.post('/revoke', async (req, res) => {
  const { nom, droit } = req.body;

  try {
    const user = await User.findOne({ nom });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.droits = user.droits.filter(d => d !== droit);
    await user.save();

    res.json({ message: `Droit '${droit}' retiré de ${nom}` });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
