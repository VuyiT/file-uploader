const indexRouter = require("express").Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHome);

module.exports = indexRouter;