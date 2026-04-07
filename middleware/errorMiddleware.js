const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            name: err.name,
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.isOperational ? err.message : "Something went wrong on our end. We're working to fix it, please try again in a few minutes."
        })
    }
}

module.exports = globalErrorHandler;