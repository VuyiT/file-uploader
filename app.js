require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const prisma = require("./lib/prisma.js");
const path = require("node:path");
const globalErrorHandler = require("./middleware/errorMiddleware.js");
const signUpRouter = require("./routes/signUpRouter.js");
const loginRouter = require("./routes/loginRouter.js");
const uploadRouter = require("./routes/uploadRouter.js");
const indexRouter = require("./routes/indexRouter.js");
const logoutRouter = require("./routes/logoutRouter.js");
const folderRouter = require("./routes/folderRouter.js");
const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
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
app.use((req, res, next) => {
    res.locals.success_msg = req.session.success_msg;
    res.locals.error_msg = req.session.error_msg;
    req.session.oldInput = req.body;
    res.locals.oldInput = req.session.oldInput || {};
    res.locals.errors = req.session.errors || [];
    res.locals.currentUser = req.user || null;

    delete req.session.success_msg;
    delete req.session.error_msg;
    delete req.session.oldData;
    delete req.session.errors;

    req.flash = (type, msg) => {
        if (type === "success") req.session.success_msg = msg;
        if (type === "error") req.session.error_msg = msg;
    };
    next();
})

app.use("/folder", folderRouter);
app.use("/upload-file", uploadRouter);
app.use("/log-out", logoutRouter);
app.use("/log-in", loginRouter);
app.use("/sign-up", signUpRouter);
app.use("/", indexRouter);

app.use(globalErrorHandler);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`listening for requests on port ${PORT}`)
});