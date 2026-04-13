const prisma = require("../lib/prisma");

async function getHome(req, res, next) {
    try {
        const userId = req.user?.id;
        const files = userId ? await prisma.file.findMany({
            where: { userId: userId }
        }) : [];
        const folders = userId ? await prisma.folder.findMany({
            where: { userId: userId },
        }) : [];
        res.render("index", {
            title: "Files and Folders",
            files,
            folders,
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getHome,
}