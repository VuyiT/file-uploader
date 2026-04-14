const folderRouter = require("express").Router();
const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");


folderRouter.get("/create", folderController.getCreateFolder);
folderRouter.post("/create", folderController.postFolder);
folderRouter.get("/:folderId", folderController.getViewFolder)
folderRouter.get("/:folderId/file/upload", fileController.getFileUploadForm);

module.exports = folderRouter;