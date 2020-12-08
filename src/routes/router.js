import { Router } from 'express';
import patients from './patients';
import morgan from 'morgan';

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
    const err = new Error(`Route '${req.originalUrl}' not supported.`);
    err.status = 404;
    err.code = 'ERR_UNSUPPORTED_ROUTE';

    next(err);
});

export default router;