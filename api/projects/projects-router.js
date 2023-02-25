// "project" routerını buraya yazın!
const express = require("express");

const {
  validateProjectWithId,
  validateProjects,
} = require("./projects-middleware");

const projectModel = require("./projects-model");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    let allProjects = await projectModel.get();
    // if(!allProjects){
    //     allProjects = []
    // }
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateProjectWithId, async (req, res, next) => {
  try {
    let project = await projectModel.get(req.params.id);
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateProjects, async (req, res, next) => {
  try {
    let project = req.project;
    let newProject = await projectModel.insert(project);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateProjectWithId,
  validateProjects,

  async (req, res, next) => {
    try {
      const { id } = req.params;
      let updateProject = await projectModel.update(id, req.project);
      res.status(200).json(updateProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateProjectWithId, async (req, res, next) => {
  try {
    const { id } = req.params;
    let removeProject = await projectModel.remove(id);
    res.json(removeProject);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", validateProjectWithId, async (req, res, next) => {
  try {
    const { id } = req.params;
    let actionsPost = await projectModel.getProjectActions(id);
    res.json(actionsPost);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
