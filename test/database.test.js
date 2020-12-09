import dotenv from 'dotenv'
import faker from 'faker';

import 'dotenv/config';

import models, { sequelize } from '../src/database';
import { expect } from '@jest/globals';

beforeAll(async () => {
    await sequelize.sync();
});

let id;
let fields = {}
test('create person', async () => {
    fields = {
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birthdate: faker.date.past().toISOString().slice(0, 10),
        sex: 'male',
    };
    const patient = await models.Patient.create(fields);
    console.log(patient.toJSON());
    id = patient.id;
    console.log(id);
});

test('get person', async () => {
    const patient = await models.Patient.findByPk(id);

    expect(patient.email).toEqual(fields.email);
    expect(patient.first_name).toEqual(fields.first_name);
    expect(patient.last_name).toEqual(fields.last_name);
    expect(patient.birthdate).toEqual(fields.birthdate);
    expect(patient.sex).toEqual(fields.sex);
});

test('delete person', async () => {
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

test('dsf', () => {console.log('testing')});
