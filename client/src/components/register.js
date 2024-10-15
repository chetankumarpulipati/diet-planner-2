import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        full_name: '',
        country_code: '+91', // Default value
        mobile: '',
        organisation: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', formData);
            alert(response.data.message);
            setFormData({
                full_name: '',
                country_code: '+91',
                mobile: '',
                organisation: '',
                email: '',
                password: ''
            });
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>Full Name</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <label>Mobile Number</label>
                <div className="mobile-input-container">
                    <select name="country_code" value={formData.country_code} onChange={handleChange} required>
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                    </select>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <label>Organisation</label>
                <input type="text" name="organisation" value={formData.organisation} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Register;