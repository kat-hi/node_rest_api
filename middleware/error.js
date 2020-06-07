function serverErrorHandler (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error');
}

const createError = require('http-errors');

function errorHandler (req, res, next) {
    next(createError(404));
}

module.exports = {
    serverErrorHandler,
    errorHandler
}
