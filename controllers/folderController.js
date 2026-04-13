const prisma = require("../lib/prisma");

async function getCreateFolder(req, res, next) {
    try {
        res.render("create-folder-form", {
            title: "Create New Folder",
        });
    } catch (err) {
        next(err);
    }
}

async function postFolder(req, res, next) {
    try {
        await prisma.folder.create({
            data: {
                name: req.body.folderName,
                user: {
                    connect: {
                        id: req.user.id,
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
    getCreateFolder,
    postFolder,
}