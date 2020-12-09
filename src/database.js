import { Sequelize } from 'sequelize';
import { patient } from './models';

const env = process.env.NODE_ENV || 'development';
console.log(env);
console.log(require(__dirname + '/../config/config.json'));
const config = require(__dirname + '/../config/config.json').db['development']; //[env];

const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

const sequelize = new Sequelize(config.database, username, password, config);

const models = {};
const patientModel = patient(sequelize, Sequelize.DataTypes);
models[patientModel.name] = patientModel;

export { sequelize };

export default models;
