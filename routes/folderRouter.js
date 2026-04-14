const folderRouter = require("express").Router();
const folderController = require("../controllers/folderController");


folderRouter.get("/create", folderController.getCreateFolder);
folderRouter.post("/create", folderController.postFolder);
folderRouter.get("/:folderId", folderController.getViewFolder)
folderRouter.get("/:folderId/upload-file", folderController.getUploadFolderFileForm);

module.exports = folderRouter;