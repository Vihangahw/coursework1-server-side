const { ApiUsageLog, RegisteredUser } = require('../models');

const apiLogger = async (req, res, next) => {
    try {
        let userId = req.session.userId || null;

        // If no session, check for API key
        if (!userId && req.query.apiKey) {
            const user = await RegisteredUser.findOne({ where: { apiKey: req.query.apiKey } });
            if (user) {
                userId = user.userId;
            }
        }

        // Clean the endpoint by removing the API key from the query string
        const url = new URL(req.originalUrl, `http://${req.headers.host}`);
        url.searchParams.delete('apiKey');
        const cleanEndpoint = url.pathname + url.search;

        // Only log if user is identified
        if (userId) {
            await ApiUsageLog.create({
                userId,
                endpoint: cleanEndpoint,
            });
        }

    } catch (err) {
        console.error('API logging error:', err.message);
    }

    next();
};

module.exports = apiLogger;
