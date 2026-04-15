const { Prisma } = require("@prisma/client");
const prisma = require("../lib/prisma");
const ConflictError = require("../errors/ConflictError");

async function getFileUploadForm(req, res, next) {
    try {
        res.render("upload-file-form", {
            title: "Upload File",
            folderId: req.params.folderId || null,
        })
    } catch (err) {
        next(err);
    }
}

async function postFile(req, res, next) {
    try {
        const folderId = req.params?.folderId;
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
                    },
                },
                folder: folderId ? {
                    connect: { id: Number(folderId) },
                } : undefined,
            },
        });
        folderId ? res.redirect(`/folder/${folderId}`) : res.redirect("/");
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new ConflictError("file name");
            }
        }
        next(err);
    }
}

module.exports = {
    getFileUploadForm,
    postFile,
}