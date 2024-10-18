const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'websterw116@gmail.com',
        pass: 'chetankumar@3470'
    }
});

exports.sendResetPasswordEmail = functions.https.onCall(async (data, context) => {
    const { email, newPassword } = data;

    const mailOptions = {
        from: 'websterw116@gmail.com',
        to: email,
        subject: 'Your new password',
        text: `Your new password is: ${newPassword}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { message: 'Password reset email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new functions.https.HttpsError('internal', 'Error sending email');
    }
});