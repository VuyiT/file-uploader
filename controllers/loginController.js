const passport = require("passport");
require("../config/passport");

async function getLogin(req, res, next) {
    try {
        res.render("log-in-form", {
            title: "Log In",
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getLogin,
}