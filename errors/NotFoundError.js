const AppError = require("./AppError");

class NotFoundError extends AppError {
    constructor(item = "page or information") {
        const message = `We couldn't find the ${item} you're looking for.`
        super(message, 404);
    }
}

module.exports = NotFoundError;