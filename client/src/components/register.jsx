import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        country_code: '+91',
        mobile: '',
        organisation: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
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
            // alert(response.data.message);

        } catch (error) {
            alert('Error registering user');
        }
        setFormData({
            first_name: '',
            last_name: '',
            country_code: '+91',
            mobile: '',
            organisation: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className="registration-page">
            <div className="register-container">
                <form className="white-border-form" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    {/*<label>Full Name</label>*/}
                    {/*<input type="text" name="full_name" value={formData.full_name} onChange={handleChange}*/}
                    {/*       className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"*/}
                    {/*       required/>*/}
                    <label>First Name</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                           className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                           required/>
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                           className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                           required/>
                    <label>Mobile Number</label>
                    <div className="mobile-input-container">
                        <select name="country_code" value={formData.country_code} onChange={handleChange}
                                className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                                required>
                            <option value="+91">+91 (India)</option>
                            <option value="+1">+1 (USA)</option>
                            <option value="+44">+44 (UK)</option>
                        </select>
                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange}
                               className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                               required/>
                    </div>
                    <label>Organisation</label>
                    <input type="text" name="organisation" value={formData.organisation} onChange={handleChange}
                           className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                           required/>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                           className="border border-e-black-700 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                           required/>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                           className="border border-e-black-700 rounded-lg p-3 mb-15 focus:border-blue-500 focus:outline-none"
                           required autoComplete="new-password"/>
                    <button type="submit"
                            className="py-2.5 px-12 me-2 mb-4 text-lg bg-blue-500 text-white rounded">Sign up
                    </button>
                </form>
                <h3 style={{color:'white', textAlign: "center", padding: 15}}>Already have an account? Log In</h3>
            </div>
        </div>
    );
}

export default Register;

