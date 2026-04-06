const signUpRouter = require("express").Router();
const signUpController = require("../controllers/signUpController");

signUpRouter.get("/", signUpController.getSignUp);

module.exports = signUpRouter;