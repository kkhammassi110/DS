const jwt = require("jsonwebtoken");

// Middleware hedha bech yverifily ken user 3andou token
module.exports = (req, res, next) => {
  // Lahne bech ne5edh el token mel header
  const token = req.header("Authorization");

  // lahne bech nthabet e token mawjoud wala le
  if (!token) {
    // token mouch mawjoud donc bech n5arej l token ne9es
    return res.status(401).json({ message: "Token ne9es !" });
  }

  try {
    // lahne bech n7el e token w njib e data li fih
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // N7ot data mte3 el user fi req 5ater bech nesta3mlouha ba3d
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token ghalet !" });
  }
};
