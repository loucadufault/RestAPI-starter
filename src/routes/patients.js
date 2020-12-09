import { Router } from 'express';
import HttpError from '../http_error';

const router = Router();

router.get('/', async (req, res) => {
    const patients = await req.context.models.Patient.findAll();
    return res.status(200).json(patients);
});

router.get('/:id', async (req, res, next) => {
    const patient = await req.context.models.Patient.findByPk(req.params.id);
    if (patient !== null) {
        return res.status(200).json(patient.getProfile());
    }
    next(new HttpError({status: 404, detail: `patient with id '${req.params.id}' not found`, code: 'ERR_NOT_FOUND'}));
});

router.post('/', async (req, res, next) => {
    const existingPatient = await req.context.models.Patient.findOne({ where : { email: req.body.email } }); 
    if (existingPatient !== null) {
        next(new HttpError({status: 409, detail: 'Email duplicates', code: 'ERR_DUPLICATE_EMAIL'}));
    }

    try {
        const patient = await req.context.models.Patient.create(req.body);
        return res.status(201).json(patient.getProfile());
    } catch (e) {
        console.error(e);
        next(new HttpError({status: 400, detail: 'Required field missing or bad format', code: 'ERR_INVALID_FIELD'}));
    }
});

export default router;