const uploadRouter = require("express").Router();
const uploadController = require("../controllers/uploadController");

uploadRouter.get("/", uploadController.getUpload);

module.exports = uploadRouter;