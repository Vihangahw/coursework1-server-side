const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getCleanCountryData } = require('../services/countryService');
const { RegisteredUser, ApiUsageLog } = require('../models');

router.get('/countries', async (req, res) => {
    try {
        const sessionUserId = req.session.userId;
        const apiKey = req.query.apiKey;
        let userId = null;

        if (!sessionUserId && !apiKey) {
            return res.status(401).json({ message: 'Access denied. Please log again in or provide a valid API key.' });
        }

        if (apiKey) {
            const user = await RegisteredUser.findOne({ where: { apiKey } });
            if (!user) {
                return res.status(403).json({ message: 'Invalid API key.' });
            }
            userId = user.userId;
        } else {
            userId = sessionUserId;
        }

        // Log the API key usage
        await ApiUsageLog.create({
            userId,
            endpoint: '/api/countries',
        });

        const countryData = await getCleanCountryData();
        res.status(200).json({ countries: countryData });
    } catch (err) {
        console.error('Country API Error:', err);
        res.status(500).json({ message: 'Failed to fetch country data.' });
    }
});

router.get('/country', async (req, res) => {
    try {
        const sessionUserId = req.session.userId;
        const apiKey = req.query.apiKey;
        const countryName = req.query.name;
        let userId = null;

        if (!countryName) {
            return res.status(400).json({ message: 'Country name is required' });
        }

        if (!sessionUserId && !apiKey) {
            return res.status(401).json({ message: 'INVALID. Please log in or provide a valid API key.' });
        }

        if (apiKey) {
            const user = await RegisteredUser.findOne({ where: { apiKey } });
            if (!user) {
                return res.status(403).json({ message: 'Invalid API key.' });
            }
            userId = user.userId;
        } else {
            userId = sessionUserId;
        }

        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true&fields=name,capital,currencies,languages,flags`;

        const response = await axios.get(url);
        const country = response.data[0];

        const countryDetails = {
            name: country.name?.common || 'N/A',
            capital: country.capital?.[0] || 'N/A',
            currency: country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A',
            languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
            flag: country.flags?.png || 'N/A',
        };

        

        res.status(200).json(countryDetails);

    } catch (err) {
        console.error("Country checkingout error:", err.message);
        res.status(404).json({ message: "Error" });
    }
});

module.exports = router;