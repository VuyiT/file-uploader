const AppError = require("./AppError");

class ConflictError extends AppError {
    constructor(item = "email") {
        const message = `This ${item} is already in use. Please try a different one or check your existing details.`
        super(message, 409);
    }
}

module.exports = ConflictError;