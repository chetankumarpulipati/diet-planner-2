const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const logAccess = (req, res, next) => {
    const userId = req.user ? req.user._id : uuidv4();
    const logEntry = `User ID: ${userId}, URL: ${req.originalUrl}, Method: ${req.method}, Timestamp: ${new Date().toISOString()}\n`;

    fs.appendFile('access.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
};

module.exports = logAccess;