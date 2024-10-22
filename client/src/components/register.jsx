import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        full_name: '',
        country_code: '+91',
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
        <div className="registration-page">
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <label>Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange}
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
                           className="border border-e-black-700 rounded-lg p-2 mb-8 focus:border-blue-500 focus:outline-none"
                           required/>
                    <div className="flex items-start mb-2 ml-3">
                        <div className="flex items-center">
                            <input id="terms" type="checkbox" value=""
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                   required/>
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I
                            agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                    </div>
                    <button type="submit"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-red-500 bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign
                        Up
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Register;

