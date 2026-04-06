async function getSignUp(req, res, next) {
    try {
        res.render("sign-up-form", {
        title: "Sign Up",
    })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSignUp,
}