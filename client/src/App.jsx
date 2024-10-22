import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inputs from "./components/inputs";
import Login from "./components/login";
import About from "./components/about";
import Profile from "./components/profile";
import Pricing from "./components/pricing";
import Initial from './components/home_launch';
import Bmi from './components/bmi';
import NavigationBar from "./components/navbar";

function App() {
    return (
        <Router>
            <div className="main-container">
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Initial />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/inputs" element={<Inputs />} />
                    <Route path="/bmi" element={<Bmi />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;