const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  droits: {
    type: [String], // Ex : ['publier', 'commenter']
    default: []     // Par défaut aucun droit
  }
});

module.exports = mongoose.model('Admin', adminSchema);
