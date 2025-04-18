import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', formData, {
                withCredentials: true,
            });
            setMessage(res.data.message);
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setMessage('Email already registered.');
            } else {
                setMessage('Registration failed.');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="emailAddress" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterForm;
