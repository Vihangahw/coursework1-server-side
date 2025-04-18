import React, { useState } from 'react';
import axios from 'axios';

function ApiKeyManager() {
    const [apiKey, setApiKey] = useState(
        JSON.parse(localStorage.getItem('user'))?.apiKey || ''
    );
    const [message, setMessage] = useState('');

    const regenerateKey = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3000/api/auth/regenerate-key',
                {},
                { withCredentials: true }
            );

            const updatedKey = res.data.newApiKey;

            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.apiKey = updatedKey;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }

            setApiKey(updatedKey);
            setMessage(res.data.message);
        } catch (err) {
            setMessage('Failed to regenerate API key.');
        }
    };

    return (
        <div>
            <h3>Your API Key</h3>
            <input type="text" value={apiKey} readOnly style={{ width: '100%' }} />
            <br />
            <button onClick={regenerateKey}>Regenerate API Key</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ApiKeyManager;
