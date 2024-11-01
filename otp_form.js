import React, { useState } from 'react';
import axios from 'axios';

function OTPForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleOtpRequest = async () => {
    try {
      const response = await axios.post('/send-otp', { email });
      // ... (handle success)
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  // ... (handle OTP verification)

  return (
    <div>
      {/* ... (input fields for email and OTP) */}
      <button onClick={handleOtpRequest}>Send OTP</button>
      {/* ... (error and success messages) */}
    </div>
  );
}

export default OTPForm;