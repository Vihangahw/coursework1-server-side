const { DataTypes } = require('sequelize');
const database = require('../config/db');

const ApiUsageLog = database.define('ApiUsageLog', {
    logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endpoint: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = ApiUsageLog;
