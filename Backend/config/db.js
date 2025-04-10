const { Sequelize } = require('sequelize');
const path = require('path');

const databasePath = path.join(__dirname, '../../db.db');

const database = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
    logging: false,
});

module.exports = database;
