const { ApiUsageLog } = require('../models');

const apiLogger = async (req, res, next) => {
    try {
        const userId = req.session.userId || null;

        if (userId) {
            await ApiUsageLog.create({
                userId,
                endpoint: req.originalUrl,
            });
        }
    } catch (err) {
        console.error('Error logginf API usage:', err.message);
    }
    next();
};

module.exports = apiLogger;
