import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../styles/login.css';
import ResetPasswordModal from '../components/ResetPasswordModal';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setIsLoggedIn, setEmail } = useContext(AuthContext);
    const { full_name } = useContext(AuthContext);
    const { mobile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setEmail(localStorage.getItem('email'));
            const fullName = localStorage.getItem('full_name');
            if (fullName) {
                console.log('Full Name:', fullName);
            }
            navigate('/');
        }
    }, [setIsLoggedIn, setEmail, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            const { token, full_name, mobile } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('full_name', full_name);
            localStorage.setItem('email', formData.email);
            localStorage.setItem('mobile', mobile);
            alert('Logged in successfully');
            if (response.status === 200) {
                setIsLoggedIn(true);
                setEmail(formData.email);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Invalid credentials. Please try again.');
            } else {
                console.error('Error signing in:', error.response ? error.response.data : error.message);
                alert('Error signing in: ' + (error.response ? error.response.data.message : error.message));
            }
        }
    };

    const forgot_password = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} required/>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} required/>
                <span onClick={forgot_password} className="centered-span-container" style={{color: 'blue', cursor: 'pointer'}}>Forgot Password?</span>
                <br/>
                <button type="submit">Login</button>
            </form>
            {isModalOpen && <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
    );
}

export default Login;