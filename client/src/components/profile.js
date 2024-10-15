import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Profile() {
    const { email, full_name, mobile } = useContext(AuthContext);

    return (
        <div>
            <h1>Profile</h1>
            <h2>Name: {full_name}</h2>
            <h2>Email: {email}</h2>
            <h2>Mobile: {mobile}</h2>
        </div>
    );
}

export default Profile;