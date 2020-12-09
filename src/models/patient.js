import { Model } from "sequelize";

const patient = (sequelize, DataTypes) => {
    class Patient extends Model {
        getProfile() { // this would ideally be implemented with dtos/daos if we need to omit certain fields
            const {id, email, first_name, last_name, birthdate, sex} = this;
            return {
                id,
                email, 
                first_name, 
                last_name, 
                birthdate, 
                sex,
            };
        }
    }

    Patient.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,    
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Email is required'
                },
                notEmpty: {
                    msg: 'Email must not be empty'
                },
                isEmail: {
                    msg: 'Invalid email format'
                },
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'First name is required'
                },
                notEmpty: {
                    msg: 'First name must not be empty'
                },
                isAlpha: {
                    msg: 'First name must be alpha-only'
                },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last name is required'
                },
                notEmpty: {
                    msg: 'Last name must not be empty'
                },
                isAlpha: {
                    msg: 'Last name must be alpha-only'
                },
            },
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Birthdate is required'
                },
                notEmpty: {
                    msg: 'Birthdate must not be empty'
                },
                isDate: {
                    msg: 'Invalid date format'
                },
            },
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Sex is required'
                },
                notEmpty: {
                    msg: 'Sex must not be empty'
                },
            },
        }
    },
    {
        sequelize,
        modelName: 'Patient',
        tableName: 'patients', // specify lowercase table name
    });
    
    return Patient;
}

export default patient;