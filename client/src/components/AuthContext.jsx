import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setEmail(localStorage.getItem('email'));
            setFullName(localStorage.getItem('full_name'));
            setMobile(localStorage.getItem('mobile'));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail, full_name, setFullName, mobile, setMobile }}>
            {children}
        </AuthContext.Provider>
    );
};