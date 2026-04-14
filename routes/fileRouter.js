const uploadRouter = require("express").Router();
const uploadController = require("../controllers/fileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

uploadRouter.get("/", uploadController.getUpload);
uploadRouter.post("/", upload.single("uploadedFile"), uploadController.postUpload);

module.exports = uploadRouter;