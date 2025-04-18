import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser);
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleRegenerateKey = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3000/api/auth/regenerate-key',
                {},
                { withCredentials: true }
            );

            const newKey = res.data.newApiKey;

            const updatedUser = { ...user, apiKey: newKey };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setMessage(res.data.message);
        } catch (err) {
            setMessage('Failed to regenerate API key.');
        }
    };

    if (!user) return <p>Please login first.</p>;

    return (
        <div>
            <h2>Dashboard</h2>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>API Key:</strong> <code>{user.apiKey}</code></p>
            <button onClick={handleRegenerateKey}>Regenerate API Key</button>
            {message && <p>{message}</p>}
            <br />
            <button onClick={() => navigate('/search')}>Search Countries</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
