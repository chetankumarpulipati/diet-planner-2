import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';

function NavigationBar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const [expanded, setExpanded] = useState(false);
    const navbarRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('full_name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <Navbar expand="lg" className="navbar-custom" expanded={expanded} ref={navbarRef}>
            <Container fluid>
                <Row className="w-100">
                    <Col xs={12} lg={3} className="text-center text-lg-start">
                        <Navbar.Brand as={Link} to="/" className="d-none d-lg-block">Diet Scheduler</Navbar.Brand>
                    </Col>
                    <Col xs={12} lg={9} className="text-lg-end">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link className="ms-3" as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
                                <Nav.Link className="ms-3" as={Link} to="/bmi" onClick={() => setExpanded(false)}>BMI</Nav.Link>
                                <Nav.Link className="ms-3" as={Link} to="/pricing" onClick={() => setExpanded(false)}>Pricing</Nav.Link>
                                <Nav.Link className="ms-3" as={Link} to="/about" onClick={() => setExpanded(false)}>About</Nav.Link>
                                {isLoggedIn ? (
                                    <NavDropdown title={email} id="basic-nav-dropdown" className="ms-3">
                                        <NavDropdown.Item as={Link} to="/Profile" onClick={() => setExpanded(false)}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleLogout(); setExpanded(false); }}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <>
                                        <Nav.Link className="ms-3" as={Link} to="/register" onClick={() => setExpanded(false)}>Sign up</Nav.Link>
                                        <Nav.Link className="ms-3" as={Link} to="/login" onClick={() => setExpanded(false)}>Sign in</Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;