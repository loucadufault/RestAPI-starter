import { Sequalize, Sequelize } from 'sequelize';

import { patient } from './models';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json').db[env];
console.log(env);
console.log(process.env.NODE_ENV);
console.log(require('../config/config.json').db[env]);

let username, password;
if (process.env.DATABASE_USERNAME_DEVELOPMENT == 'production') {
    username = process.env.DATABASE_USERNAME_PRODUCTION
    password = process.env.DATABASE_PASSWORD_PRODUCTION;
} else {
    username = process.env.DATABASE_USERNAME_DEVELOPMENT;
    password = process.env.DATABASE_PASSWORD_DEVELOPMENT;
}

const sequelize = new Sequelize(config.database, username, password, config);

const models = {};
const patientModel = patient(sequelize, Sequelize.DataTypes);
models[patientModel.name] = patientModel;

export { sequelize };

export default models;
