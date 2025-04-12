const axios = require('axios');

const getCleanCountryData = async () => {
    try {
        const url = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,languages,flags';

        const response = await axios.get(url);

        return response.data.map((country) => ({
            name: country.name?.common || 'N/A',
            capital: country.capital?.[0] || 'N/A',
            currency: country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A',
            languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
            flag: country.flags?.png || 'N/A',
        }));
    } catch (err) {
        console.error("Error fetching from RestCountries API:", err.message);
        throw err;
    }
};

module.exports = {
    getCleanCountryData,
};
