const folderRouter = require("express").Router();
const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");
const fileRouter = require("./fileRouter");

folderRouter.use("/:folderId/file", fileRouter);

folderRouter.get("/create", folderController.getCreateFolder);
folderRouter.post("/create", folderController.postFolder);
folderRouter.get("/:folderId/update", folderController.getUpdateForm);
folderRouter.get("/:folderId", folderController.getViewFolder)
folderRouter.get("/upload", fileController.getFileUploadForm);
folderRouter.post("/upload", fileController.postFile);
folderRouter.post("/:folderId/update", folderController.postUpdate);
folderRouter.post("/:folderId/delete", folderController.postDeleteFolder);


module.exports = folderRouter;