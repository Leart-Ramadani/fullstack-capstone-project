import React, { useState } from 'react';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const { setIsLoggedIn } = useAppContext();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Content-Type attribute
                    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`, // Authorization attribute
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                setIsLoggedIn(true);
                navigate('/app');
            } else {
                setIncorrect('Wrong password. Try again.');
                setEmail('');
                setPassword('');
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {incorrect && <p className="text-danger">{incorrect}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;