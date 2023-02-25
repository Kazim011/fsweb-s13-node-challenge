// eylemlerle ilgili ara katman yazılımları yazın

const actionModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function validateActionWıthId(req, res, next) {
  try {
    let isExistAction = await actionModel.get(req.params.id);
    if (!isExistAction) {
      res.status(404).json({ message: "Not Found" });
    } else {
      req.action = isExistAction;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validateActions(req, res, next) {
  try {
    let { project_id, description, notes, completed } = req.body;
    if (
      !project_id ||
      !description ||
      !notes ||
      typeof completed != "boolean"
    ) {
      res.status(400).json({ message: "Eksik alan var." });
    } else {
      if (project_id > 0) {
        let isExistProject = await projectModel.get(project_id);
        if (!isExistProject) {
          res.status(400).json({ message: "Project not found" });
        } else {
          req.action = {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: completed,
          };
        }
      }
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateActionWıthId, validateActions };
