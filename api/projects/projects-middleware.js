// projects ara yazılımları buraya
const ProjectsModel = require("./projects-model");

async function validateProjectWithId(req, res, next) {
  try {
    const { id } = req.params;
    const existProject = await ProjectsModel.get(id);
    if (!existProject) {
      res.status(404).json({ message: "Not Found" });
    } else {
      req.project = existProject;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateProjects(req, res, next) {
  try {
    const { name, description, completed } = req.body;
    if (!name || !description || typeof completed != "boolean") {
      res.status(400).json({ message: "Gerekli alanlar eksik." });
    } else {
      req.project = {
        name: name,
        description: description,
        completed: completed,
      };
      // req.name = name;
      // req.description = description;
      // req.completed = completed;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateProjectWithId, validateProjects };
