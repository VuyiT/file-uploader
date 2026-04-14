const NotFoundError = require("../errors/NotFoundError");
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

async function getViewFolder(req, res, next) {
    const folder = await prisma.folder.findUnique({
        where: { id: Number(req.params.folderId) },
        include: {
            files: true,
        }
    });
    if (!folder) {
        return next(new NotFoundError("folder"));
    }
    try {
        res.render("view-folder", {
            title: folder.name,
            folder,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCreateFolder,
    postFolder,
    getViewFolder,
}