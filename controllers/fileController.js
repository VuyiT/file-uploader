const prisma = require("../lib/prisma");

async function getFileUploadForm(req, res, next) {
    try {
        res.render("upload-file-form", {
            title: "Upload File",
        })
    } catch (err) {
        next(err);
    }
}

async function postFile(req, res, next) {
    try {
        const { originalname, size, mimetype, path } = req.file;
        await prisma.file.create({
            data: {
                name: originalname,
                size: size,
                type: mimetype,
                path: path,
                user: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        });
        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getFileUploadForm,
    postFile,
}