async function getUpload(req, res, next) {
    try {
        res.render("upload-file-form", {
            title: "Upload File",
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUpload,
}