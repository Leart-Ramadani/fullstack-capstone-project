import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import './RegisterPage.css';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST', // method attribute
                headers: {
                    'Content-Type': 'application/json', // header attribute
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', email);
                navigate('/app');
            } else {
                setShowerr(json.error || 'Registration failed');
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {showerr && <p className="text-danger">{showerr}</p>}
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;