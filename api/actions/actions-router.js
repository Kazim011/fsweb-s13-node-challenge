// "eylem" routerını buraya yazın
const express = require("express");

const {
  validateActionWıthId,
  validateActions,
} = require("./actions-middlware");

const actionModel = require("./actions-model");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    let actionList = await actionModel.get();
    res.json(actionList);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateActionWıthId, async (req, res, next) => {
  try {
    let { id } = req.params;
    let action = await actionModel.get(id);
    res.json(action);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateActions, async (req, res, next) => {
  try {
    let action = req.action;
    let newActions = await actionModel.insert(action);
    res.json(newActions);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateActionWıthId,
  validateActions,
  async (req, res, next) => {
    try {
      let { id } = req.params;
      let action = req.action;
      let updatedAction = await actionModel.update(id, action);
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateActionWıthId, async (req, res, next) => {
  try {
    const { id } = req.params;
    let removeAction = await actionModel.remove(id);
    res.json(removeAction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
