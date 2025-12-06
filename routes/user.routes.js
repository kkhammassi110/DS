const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth");

// route bech na3mel register l user jdid

router.post("/register", async (req, res) => {
  try {
    // njib les infos mel body
    const { nom, login, password, role } = req.body;

    // Na3mel cryptage mta3 mdp
    const hashedPassword = await bcrypt.hash(password, 10);

    // Nasna3 user jdid
    const user = await User.create({
      nom,
      login,
      password: hashedPassword,
      role
    });

    res.json({ message: "User tsajel jawou behi", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel register", err });
  }
});
// route bech na3mel cnx
router.post("/login", async (req, res) => {
  try {
    // njib login w password mel body
    const { login, password } = req.body;

    // Nthabet mel login wel passe li 7athom
    const user = await User.findOne({ login });
    if (!user)
      return res.status(404).json({ message: "User mouch mawjoud aslan !" });

    // Nthabet fel mdp li 7athqa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe ghalet !" });

    // nasma3 JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token 7atitou bech yab9a nhar khw 
    );

    res.json({ message: "Login réussi loumour mrigl", token });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel login", err });
  }
});



router.get("/protected-test", auth, (req, res) => {
  res.json({
    message: "Enti authentifié !",
    user: req.user
  });
});
module.exports = router;
