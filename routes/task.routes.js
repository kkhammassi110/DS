const router = require("express").Router();
const Task = require("../models/Task");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

//   route bech nasna3 task lel user wala l manager

router.post("/", auth, async (req, res) => {
  try {
    // Njib ka data mel body
    const { titre, description, statut, deadline, projet } = req.body;

    // Na3mel check ken projet mawjoud ou nn
    const project = await Project.findById(projet);
    if (!project) {
      return res.status(404).json({ message: "Projet mahouch mawjoud !" });
    }

    // Lahne bech nasna3 e tache e jdida
    const task = await Task.create({
      titre,
      description,
      statut, 
      deadline,
      projet, 

    });

    res.json({ message: "Task tsan3et jawha behi", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel creation mta3 task", err });
  }
});


//   route bech njib kol tache mta3 projet we7ed
router.get("/by-project/:projectId", auth, async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Na3mel check lel projet mawjoud ou nn 
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Projet mahouch mawjoud !" });
    }

    // Lahne bech njib les taches bel find
    const tasks = await Task.find({ projet: projectId });
    // lahne bech nafichi les taches
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur fel get mta3 tasks", err });
  }
});

// route bech na3mel beha maj lel tache
router.put("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;

    // njib e tache mel BD
    const task = await Task.findById(taskId);

    // Nthabet kene tache mawjouda ou nn
    if (!task) {
      return res.status(404).json({ message: "Task mouch mawjouda aslan !" });
    }

    // Lahne bech nbadel e data lkol
    const { titre, description, statut, deadline } = req.body;

    // Lahne bech nbadel selon chnowa l user yheb ybadel
    if (titre) task.titre = titre;
    if (description) task.description = description;
    if (statut) task.statut = statut;
    if (deadline) task.deadline = deadline;

    // nsajlou les maj
    await task.save();

    res.json({ message: "Task tbadelet jawha behi", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel update mta3 task", err });
  }
});

module.exports = router;
