import { resolveSoa } from 'dns';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json('patients');
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {
    return res.status(201).json();
});

export default router;