const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");

const customFields = {
    usernameField: "email",
    passwordField: "password",
};


const strategy = new LocalStrategy(customFields, 
    async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });
            if (!user) {
                return done(null, false, { message: "Incorrect email address "});
            }
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return done(null, false, { message: "incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            done(err);
        }
    }
);

passport.use(strategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
})