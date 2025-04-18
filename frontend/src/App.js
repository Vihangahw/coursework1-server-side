import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CountrySearch from './components/CountrySearch';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <div className="container">
                <h1>CW1 API Portal</h1>
                <Routes>
                    <Route path="/" element={<HomePage />} /> 
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<CountrySearch />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
