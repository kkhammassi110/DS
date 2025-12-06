const mongoose = require("mongoose");

// Hedha schema mta3 el projet
const projectSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  statut: {
    type: String,
    default: "en cours" 
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Nexportiw model l project
module.exports = mongoose.model("Project", projectSchema);
