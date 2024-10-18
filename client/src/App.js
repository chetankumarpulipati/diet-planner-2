import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import NavigationBar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inputs from "./components/inputs";
import Timetable from "./components/timetable";
import Login from "./components/login";
import About from "./components/about";
import Profile from "./components/profile";
import Pricing from "./components/pricing";
import Initial from './components/home_launch'
import Bmi from './components/bmi'

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
                    {/* <Route path="/Home" element={
                        <>
                            <h1 style={{color: "black"}}>Welcome to the Fitness App</h1>
                            <p>Schedule your diet with our diet planning system</p>
                            <Inputs/>
                            <Timetable/>
                        </>
                    }/> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;