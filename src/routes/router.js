import { Router } from 'express';

import patients from './patients';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json('root');
});

router.use("/patients", patients);

export default router;