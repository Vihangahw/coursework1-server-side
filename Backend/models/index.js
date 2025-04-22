const database = require('../config/db');
const RegisteredUser = require('./User');
const ApiUsageLog = require('./ApiUsageLog');

const initializeDatabase = async () => {
    try {
        await database.authenticate();
        console.log('Connected to database');

        await database.sync({ alter: true }); 
        console.log('synced successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = {
    initializeDatabase,
    RegisteredUser,
    ApiUsageLog,
};