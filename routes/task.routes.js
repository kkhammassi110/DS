const router = require("express").Router();
const Task = require("../models/Task");
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const role = require("../middleware/role")

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
// route li bech ya3ti beha l manager tache lel user
router.put("/assign/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const {userId} = req.body;
     // nlawjou 3a tache
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task mahich mawjouda aslan !" });
    }
// Na3mlou assign lel user 
    task.assignedTo = userId;
    await task.save();

    res.json({ message: "Task t3aynet jawha behi", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel assign task", err });
  }
});
// route bech ya3mel filter lel les taches par status
router.get("/status/:statut", auth, async (req, res) => {
  try {
    const statut = req.params.statut; // Nchoufou e status to do, doing wala done 

    // Nlawjou 3al les taches li 3andhom e statut li 7atineha f const statut
    const tasks = await Task.find({ statut });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur fel filtrage", err });
  }
});


// route bech ylwej 3al les taches 
router.get("/search/:keyword", auth, async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const tasks = await Task.find({
    // nesta3mlou Regex bech nal9aw ay titre fih el mot hedha
      titre: { $regex: keyword, $options: "i" }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur fel recherche ", err });
  }
});
// route bech ya3mel tri 
router.get("/sort/:order", auth, async (req, res) => {
  try {
    const order = req.params.order === "asc" ? 1 : -1;

    const tasks = await Task.find().sort({ createdAt: order });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur fel tri", err });
  }
});





module.exports = router;
