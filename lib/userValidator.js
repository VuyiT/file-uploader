const { body } = require("express-validator");
const { prisma } = require("./prisma.js");
const ConflictError = require("../errors/ConflictError.js");

const namesAlphaErr = "must only contain alphabet letters.";
const namesLengthErr = "must be between 2 and 50 characters long.";
const notEmptyErr = "cannot be empty.";
const passwordErrStart = "A strong password must include at least one";

exports.validateUser = [
    body("firstName").trim()
        .notEmpty().withMessage(`First name ${notEmptyErr}`)
        .isAlpha().withMessage(`First name ${namesAlphaErr}`)
        .isLength({ min: 2, max: 50 }).withMessage(`First name ${namesLengthErr}`),
    
    body("lastName").trim()
        .notEmpty().withMessage(`Last name ${notEmptyErr}`)
        .isAlpha().withMessage(`Last name ${namesAlphaErr}`)
        .isLength({ min: 2, max: 50 }).withMessage(`Last name ${namesLengthErr}`),

    body("email").trim()
        .notEmpty().withMessage(`Email address ${notEmptyErr}`)
        .isEmail().withMessage("Not a valid e-mail address")
        .custom(async value => {
            const user = await prisma.user.findUnique({
                where: { email: value },
            });
            if (user) {
                throw new ConflictError();
            }
        }),

    body("password").trim()
        .notEmpty().withMessage(`Password ${notEmptyErr}`)
        .isLength({ min: 12 }).withMessage(`A strong password must be at least 12 characters long.`)
        .matches(/[a-z]/).withMessage(`${passwordErrStart} lowercase letter.`)
        .matches(/[A-Z]/).withMessage(`${passwordErrStart} uppercase letter.`)
        .matches(/\d/).withMessage(`${passwordErrStart} number.`)
        .matches(/[^a-zA-Z0-9]/).withMessage(`${passwordErrStart} special character.`),

    body("passwordConfirmation").trim()
        .notEmpty().withMessage(`Password confirmation ${notEmptyErr}`)
        .custom((value, { req })=> {
            return value === req.body.password;
        }).withMessage("Password confirmation does not match password field."),
];