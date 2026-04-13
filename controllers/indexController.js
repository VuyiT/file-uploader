const prisma = require("../lib/prisma");

async function getHome(req, res, next) {
    try {
        const userId = req.user?.id;
        const files = userId ? await prisma.file.findMany({
            where: { userId: userId }
        }) : [];
        res.render("index", {
            title: "Files and Folders",
            files,
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getHome,
}