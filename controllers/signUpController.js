const { validationResult, matchedData } = require("express-validator");
const { validateUser } = require("../lib/userValidator");
const bcrypt = require("bcryptjs");
const prisma  = require("../lib/prisma.js");

async function getSignUp(req, res, next) {
    const oldInput = req.session.oldInput || {};
    const errors = req.session.errors || [];

    delete req.session.oldInput;
    delete req.session.errors;
    try {
        res.render("sign-up-form", {
        title: "Sign Up",
        oldInput,
        errors,
    })
    } catch (err) {
        next(err);
    }
}

const postSignUp = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.oldInput = req.body;
            req.session.errors = errors.array();
            return res.redirect("/sign-up");
        }
        try {
            const { firstName, lastName, email, password } = matchedData(req);
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password_hash: hashedPassword
                }
            });
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    }
];

module.exports = {
    getSignUp,
    postSignUp,
}