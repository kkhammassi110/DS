const express = require("express");

// fonction li tconnectina b MongoDB
const connectDB = require("./config/db");

// Lahne jebet el variables elli fi .env
require("dotenv").config();

const app = express();

// Bech na9raw JSON
app.use(express.json());

// Nconnectiw 3al MongoDB
connectDB();

// Route test
app.get("/test", (req, res) => {
  res.send("Serveur ye5dem jawou behi !");
});

app.listen(process.env.PORT, () => {
  console.log(`Server ye5dem 3al port ${process.env.PORT}`);
});

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
