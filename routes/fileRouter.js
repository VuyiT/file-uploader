const fileRouter = require("express").Router();
const fileController = require("../controllers/fileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

fileRouter.get("/", fileController.getFileUploadForm);
fileRouter.post("/", upload.single("uploadedFile"), fileController.postFile);

module.exports = fileRouter;