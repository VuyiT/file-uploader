require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const { prisma } = require("./lib/prisma.js");
const path = require("node:path");
const globalErrorHandler = require("./middleware/errorMiddleware.js");
const signUpRouter = require("./routes/signUpRouter.js");
const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("File Uploader"));

app.use("/sign-up", signUpRouter);



app.use(globalErrorHandler);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`listening for requests on port ${PORT}`)
});