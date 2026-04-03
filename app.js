require("dotenv").config();
const express = require("express");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("File Uploader"));


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`listening for requests on port ${PORT}`)
});