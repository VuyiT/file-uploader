const loginRouter = require("express").Router();
const passport = require("passport");
require("../config/passport");
const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.getLogin);
loginRouter.post("/", passport.authenticate("local", {
    successRedirect: "/upload-file",
    failureRedirect: "/log-in",
    failureFlash: true,
}));

module.exports = loginRouter;