const mongoose = require("mongoose");

// Hedha schema mta3 el tache
const taskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  statut: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo"
  },

  deadline: {
    type: Date
  },

  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Nexportiw model e Task
module.exports = mongoose.model("Task", taskSchema);
