import { Router } from 'express';
import patients from './patients';
import morgan from 'morgan';
import HttpError from '../http_error';

const router = Router();

// request-logging middleware
if (process.env.NODE_ENV == 'development') {
    router.use(morgan('dev'));
}

// root route
router.get('/', (req, res) => {
    return res.status(200).json('root');
});

// patients route handler middleware
router.use('/patients', patients);

// default route handler middleware
router.use('*', (req, res, next) => {
    next(new HttpError(404, `Route '${req.originalUrl}' not supported.`, 'ERR_UNSUPPORTED_ROUTE'));
});

export default router;