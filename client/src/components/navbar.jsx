import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from './AuthContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = localStorage.getItem('email');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        }
    }, [setIsLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('full_name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className="bg-black navbar-container">
            <Navbar.Brand as={Link} to="/" className="text-white navbar-brand-center">Diet App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-nav ml-auto">
                    <Nav.Link className="text-white" as={Link} to="/">Home</Nav.Link>
                    <Nav.Link className="text-white" as={Link} to="/bmi">BMI</Nav.Link>
                    <Nav.Link className="text-white" as={Link} to="/pricing">Pricing</Nav.Link>
                    <Nav.Link className="text-white" as={Link} to="/about">About</Nav.Link>
                    {isLoggedIn ? (
                        <NavDropdown title={email} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/Profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <Nav.Link className="text-white" as={Link} to="/register">Sign up</Nav.Link>
                            <Nav.Link className="text-white" as={Link} to="/login">Sign in</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
