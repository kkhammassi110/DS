// el middleware hedha ykhali ken el manager yet3ada
module.exports = (req, res, next) => {
  // nthabet ken el role mte3 el user mahich manager 
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Access mamnou3 ! Manager bark" });
  }

  next(); // n3adih kenou manager
};

