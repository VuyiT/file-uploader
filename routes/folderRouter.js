const folderRouter = require("express").Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/", folderController.getCreateFolder);

module.exports = folderRouter;