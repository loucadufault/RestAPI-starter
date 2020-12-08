import HttpError from '../http_error';

const errorLogger = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
};

const errorHandler = (err, req, res, next) => {
    let httpError;

    if (err instanceof HttpError) {
        httpError = err;
    } else {
        httpError = new HttpError({status: err.status, detail: err.message, code: err.code});
    } 

    res.status(httpError.status).json(httpError.toJSON());
};

export {
    errorLogger,
    errorHandler
}