const AppError = require("./AppError");

class BadRequestError extends AppError {
    constructor(message = "Something went wrong with your request. Please check your information and try again.") {
        super(message, 400);
    }
};

module.exports = BadRequestError;