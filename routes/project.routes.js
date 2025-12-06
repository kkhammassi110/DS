const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// route bech nasna3 projet user wala manager
router.post("/", auth, async (req, res) => {
  try {
    // Njib e data mel body
    const { nom, description, statut } = req.body;

    // Na3mel projet jdid
    const project = await Project.create({
      nom,
      description,
      statut,
      owner: req.user.id
    });

    res.json({ message: "Projet tesna3 ", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel création de projet", err });
  }
});

// route /mine bech njib beha les projects mta3 kol wa7ed

router.get("/mine", auth, async (req, res) => {
  try {
    // lahne bech nthabet li l user li 7alel taw howa l owner mte3hom howa 
    const projects = await Project.find({ owner: req.user.id });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erreur fel get mta3 l project", err });
  }
});

// route bech njib beha les projets lkol mta3 l manager khw

router.get("/", auth, role, async (req, res) => {
  try {
    // Nal9aw projects kol
    const projects = await Project.find().populate("owner", "nom login role");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erreur fel get all projects", err });
  }
});

// Route bech na3mel update lel project
router.put("/:id", auth, async (req, res) => {
  try {
    // ne5edh l id mta3 projet
    const projectId = req.params.id;

    // Nal9aw projet li 3maltlou update
    const project = await Project.findById(projectId);

    // nthabet ken fama wala ma famech Ken ma famech
    if (!project) {
      return res.status(404).json({ message: "Projet mouch mawjoud !" });
    }

    // Ken el user moch howa li 3amlou
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Arka7 rayedh ma3andekch l7a9 tbadel !" });
    }

    // ne5edh e data
    const { nom, description, statut } = req.body;

    // w nbadel lahne
    project.nom = nom || project.nom;
    project.description = description || project.description;
    project.statut = statut || project.statut;

    await project.save();

    res.json({ message: "Projet tbadel ", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel update mta3 l project", err });
  }
});

// Route bech nfasa5 project
router.delete("/:id", auth, async (req, res) => {
  try {
    const projectId = req.params.id;

    // Njib l projet mel BD
    const project = await Project.findById(projectId);

    // Ken ma famech
    if (!project) {
      return res.status(404).json({ message: "Projet mouch mawjoud !" });
    }

    // Ken l user mouch howa li 3amlou 
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Arka7 rayedh ma3andekch l7a9 tfasa5 !" });
    }

    // Lahne bech nfasa5
    await project.deleteOne();

    res.json({ message: "Projet tfasa5" });
  } catch (err) {
    res.status(500).json({ message: "Erreur fel delete mta3 project", err });
  }
});


module.exports = router;
