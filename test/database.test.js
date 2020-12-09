import faker from 'faker';

import 'dotenv/config';

import models, { sequelize } from '../src/database';
import { expect } from '@jest/globals';

beforeAll(async () => {
    await sequelize.sync();
});

let id;
let fields = {}
test('create patient', async () => {
    fields = {
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birthdate: faker.date.past().toISOString().slice(0, 10),
        sex: 'male',
    };
    const patient = await models.Patient.create(fields);
    id = patient.id;
});

test('get patient', async () => {
    const patient = await models.Patient.findByPk(id);

    expect(patient.email).toEqual(fields.email);
    expect(patient.first_name).toEqual(fields.first_name);
    expect(patient.last_name).toEqual(fields.last_name);
    expect(patient.birthdate).toEqual(fields.birthdate);
    expect(patient.sex).toEqual(fields.sex);
});

test('delete patient', async () => {
    await models.Patient.destroy({
        where: {
            id: id
        }
    });
    const patient = await models.Patient.findByPk(id);
    expect(patient).toBeNull();
});

afterAll(async () => {
    await sequelize.close();
});
