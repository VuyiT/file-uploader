const fileRouter = require("express").Router({ mergeParams: true });
const fileController = require("../controllers/fileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

fileRouter.get("/upload", fileController.getFileUploadForm);
fileRouter.post("/upload", upload.single("uploadedFile"), fileController.postFile);

module.exports = fileRouter;