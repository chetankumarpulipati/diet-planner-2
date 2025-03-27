import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import '../styles/profile.css'

function Profile() {
    const { email, first_name, last_name, mobile } = useContext(AuthContext);
    console.log('first_name:', first_name);
    console.log('last_name:', last_name);
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-heading">My Profile</h1>
                <div className="profile-detail">
                    <label className="profile-label">First Name:</label>
                    <span className="profile-value">{first_name}</span>
                </div>
                <div className="profile-detail">
                    <label className="profile-label">Last Name:</label>
                    <span className="profile-value">{last_name}</span>
                </div>
                <div className="profile-detail">
                    <label className="profile-label">Email:</label>
                    <span className="profile-value">{email}</span>
                </div>
                <div className="profile-detail">
                    <label className="profile-label">Mobile:</label>
                    <span className="profile-value">{mobile}</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;
