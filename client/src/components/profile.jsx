import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import '../styles/profile.css'

function Profile() {
    const { email, full_name, mobile } = useContext(AuthContext);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-heading">My Profile</h1>
                <div className="profile-detail">
                    <label className="profile-label">Name:</label>
                    <span className="profile-value">{full_name}</span>
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
