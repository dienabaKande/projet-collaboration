const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  files: [{
    type: String, // URLs ou chemins vers les fichiers partagés
  }],
  tasks: [{
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    }
  }],
  history: [{
    type: String, // Description textuelle des modifications
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
