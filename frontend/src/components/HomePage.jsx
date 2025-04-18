import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function HomePage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
                <LoginForm />
            </div>
            <div>
                <RegisterForm />
            </div>
        </div>
    );
}

export default HomePage;
