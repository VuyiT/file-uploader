const folderRouter = require("express").Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/", folderController.getCreateFolder);
folderRouter.post("/", folderController.postFolder);

module.exports = folderRouter;