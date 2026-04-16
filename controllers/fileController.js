const { Prisma } = require("@prisma/client");
const prisma = require("../lib/prisma");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

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

async function getFileView(req, res, next) {
    const file = await prisma.file.findUnique({ where: { id: Number(req.params.fileId) } });
    const author = await prisma.user.findUnique({ where: { id: Number(req.user.id) } });
    try {
        res.render("view-file", {
            title: file.name,
            file,
            author,
        });;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                throw new NotFoundError("file");
            }
        }
        next(err);
    }
}

module.exports = {
    getFileUploadForm,
    postFile,
    getFileView,
}