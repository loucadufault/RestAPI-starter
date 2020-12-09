import { Model } from "sequelize";

const patient = (sequelize, DataTypes) => {
    class Patient extends Model {}

    Patient.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true,
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true,
            },
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
                isDate: true,
            },
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
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