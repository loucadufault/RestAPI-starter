import { resolveSoa } from 'dns';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json('patients');
});

export default router;