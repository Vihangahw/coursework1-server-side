const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { v4: generateApiKey } = require('uuid');

const RegisteredUser = database.define('RegisteredUser', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailAddress: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apiKey: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: () => generateApiKey(),
    },
});

module.exports = RegisteredUser;
