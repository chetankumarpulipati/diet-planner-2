import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../styles/login.css';
import ResetPasswordModal from '../components/ResetPasswordModal';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setIsLoggedIn, setEmail } = useContext(AuthContext);
    const { first_name } = useContext(AuthContext);
    const { last_name } = useContext(AuthContext);
    const { mobile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setEmail(localStorage.getItem('email'));
            const first_name = localStorage.getItem('first_name');
            const last_name = localStorage.getItem('last_name');
            if (first_name) {
                console.log('Full Name:', first_name);
            }
            if(last_name){
                console.log('Last Name:', last_name);
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
            const { token, first_name, last_name, mobile } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('first_name', first_name);
            localStorage.setItem('last_name', last_name);
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
        <div className="login-page">
            <img src={require('../images/login-screen-4308924-3582001.webp')} alt="Login Image" className="login-image"/>
            <form className="login-container" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} required/>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} required/>
                <span onClick={forgot_password} className="centered-span-container"
                      style={{color: 'white', fontSize: 15, cursor: 'pointer'}}>Forgot Password?</span>
                <br/>
                <button type="submit">Login</button>
            </form>
            {isModalOpen && <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal}/>}
        </div>
    );
}
export default Login;