const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const prisma = require("../lib/prisma");
const { Prisma } = require("@prisma/client")

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
                    },
                },
            },
        });
        res.redirect("/");
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new ConflictError("folder name");
            }
        }
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