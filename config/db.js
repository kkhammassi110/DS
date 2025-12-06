// Lahne 3malet npm install mongoose w 3ayet l mongoose
const mongoose = require("mongoose");

// Fonction bech tconnectina b MongoDB
const connectDB = async () => {
  try {
    // Houni nest3mlou el lien mte3 el database li fi .env puisque sta3melt variable d'environement
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Erreur fel connexion m3a MongoDB", err);
    process.exit(1); // server ya7bes ken fama mochkla m3a l base
  }
};

module.exports = connectDB;
