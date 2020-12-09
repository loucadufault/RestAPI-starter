import { Router } from 'express';
import HttpError from '../http_error';
import url from 'url';

const router = Router();

router.get('/', async (req, res) => {
    const PAGE_SIZE = 10;
    let page = 1;

    if ('page' in req.query && ! isNaN(req.query.page)) {
        const parsedPage = parseInt(req.query.page, 10);
        if (Number.isInteger(parsedPage) && parsedPage >= 1) {
           page = parsedPage;
        }
    }
    
    const fullUrlWithoutQueryString = req.protocol + '://' + req.get('host') + url.parse(req.originalUrl).pathname;
    const pagination = {
        self: fullUrlWithoutQueryString + `?page=${page}`, 
        next: fullUrlWithoutQueryString + `?page=${page + 1}`
    };

    const patients = await req.context.models.Patient.findAll({ offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE });
    return res.status(200).json({
        data: patients.map(patient => patient.getProfile()),
        links: pagination,
    });
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
        next(new HttpError({status: 400, detail: 'Required field missing or bad format', code: 'ERR_INVALID_FIELD'}));
    }
});

export default router;