import React, { useState } from 'react';
import axios from 'axios';

function CountrySearch() {
    const [name, setName] = useState('');
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/country?name=${name}`, {
                params: { apiKey: user?.apiKey }
            });
            setResult(res.data);
            setMessage('');
        } catch (err) {
            setMessage('Country not found.');
            setResult(null);
        }
    };

    return (
        <div>
            <h2>Search Country</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter country name" />
            <button onClick={handleSearch}>Search</button>
            {message && <p>{message}</p>}
            {result && (
                <div>
                    <h3>{result.name}</h3>
                    <p><strong>Capital:</strong> {result.capital}</p>
                    <p><strong>Currency:</strong> {result.currency}</p>
                    <p><strong>Languages:</strong> {result.languages}</p>
                    <img src={result.flag} alt="Flag" width="100" />
                </div>
            )}
        </div>
    );
}

export default CountrySearch;
