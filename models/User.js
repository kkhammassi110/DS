const mongoose = require("mongoose");

// Hedha schema mta3 el user li y3adi register/login
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },

  login: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "manager"],
    default: "user"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Nexportiw model el User
module.exports = mongoose.model("User", userSchema);
