async function getCreateFolder(req, res, next) {
    try {
        res.render("create-folder-form", {
            title: "Create New Folder",
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCreateFolder,
}