const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { sign, verify } = require('jsonwebtoken');
const logAccess = require('./middleware/logAccess'); 
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(logAccess);


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decoded = verify(token, 'your_secret_key');
            req.user = decoded; 
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        next();
    }
};

app.use(authenticate); 

mongoose.connect('mongodb://localhost:27017/diet-planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const formDataSchema = new mongoose.Schema({
    age: String,
    height: String,
    weight: String,
    goal: String,
    preference: String
});

const FormData = mongoose.model('FormData', formDataSchema);

app.get('/', (req, res) => {
    res.send('backend is working');
});

app.post('/register', async (req, res) => {
    const { first_name, last_name, country_code, mobile, organisation, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            first_name,
            last_name,
            country_code,
            mobile,
            organisation,
            email,
            password: hashedPassword
        });
        await newUser.save();
        // res.status(200).json({ message: 'User registered successfully' });
        res.status(200);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = sign({ userId: user._id }, 'chetankumar', { expiresIn: '1h' });
        res.json({ token, full_name: user.full_name, mobile: user.mobile });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/submit', async (req, res) => {
    try {
        const newFormData = new FormData(req.body);
        await newFormData.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data:', err); 
        res.status(500).json({ message: 'Error saving data', error: err.message });
    }
});

app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/verify-email', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Email verified' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const foodSchema = new mongoose.Schema({
    name: String,
    calories: Number
});

app.get('/food-items', async (req, res) => {
    try {
        const foodItems = await Food.find();
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const emailSchema = new mongoose.Schema({
    email: String,
});

const Email = mongoose.model('Email', emailSchema);

app.post('/newsletter', async (req, res) => {
    const { email } = req.body;
    const newEmail = new Email({ email });
    try {
        await newEmail.save();
        console.log('Email saved:', email);
        res.send('Email saved successfully');
    } catch (error) {
        console.error('Error saving email:', error);
        res.status(500).send('Error saving email');
    }
});

const mealSchema = new mongoose.Schema({
    category: String,
    items: [{ name: String, calories: Number }]
});

const Meal = mongoose.model('Meal', mealSchema);

app.get('/breakfast', async (req, res) => {
    try {
        const meals = await mongoose.connection.db.collection('food_items').aggregate([
            { $match: { category: 'breakfast' } },
            { $addFields: { totalCalories: { $sum: '$items.calories' } } },
            { $match: { totalCalories: { $lt: 1000 } } }
        ]).toArray();

        if (meals.length === 0) {
            console.log('No meals found with the specified criteria.');
        } else {
            console.log('Meals found:', meals);
        }

        res.json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send(error.message);
    }
});

app.get('/lunch', async (req, res) => {
    try {
        const meals = await mongoose.connection.db.collection('food_items').aggregate([
            { $match: { category: 'lunch' } },
            { $addFields: { totalCalories: { $sum: '$items.calories' } } },
            { $match: { totalCalories: { $lt: 1000 } } }
        ]).toArray();

        if (meals.length === 0) {
            console.log('No meals found with the specified criteria.');
        } else {
            console.log('Meals found:', meals);
        }

        res.json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send(error.message);
    }
});

app.get('/dinner', async (req, res) => {
    try {
        const meals = await mongoose.connection.db.collection('food_items').aggregate([
            { $match: { category: 'dinner' } },
            { $addFields: { totalCalories: { $sum: '$items.calories' } } },
            { $match: { totalCalories: { $lt: 1000 } } }
        ]).toArray();

        if (meals.length === 0) {
            console.log('No meals found with the specified criteria.');
        } else {
            console.log('Meals found:', meals);
        }

        res.json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send(error.message);
    }
});

app.get('/snacks', async (req, res) => {
    try {
        const meals = await mongoose.connection.db.collection('food_items').aggregate([
            { $match: { category: 'snack' } },
            { $addFields: { totalCalories: { $sum: '$calories' } } },
            { $match: { totalCalories: { $lt: 1000 } } }
        ]).toArray();

        if (meals.length === 0) {
            console.log('No meals found with the specified criteria.');
        } else {
            console.log('Meals found:', meals);
        }

        res.json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});