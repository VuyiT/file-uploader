const folderRouter = require("express").Router();
const folderController = require("../controllers/folderController");


folderRouter.get("/create", folderController.getCreateFolder);
folderRouter.post("/create", folderController.postFolder);
folderRouter.get("/:folderId", folderController.getViewFolder)

module.exports = folderRouter;