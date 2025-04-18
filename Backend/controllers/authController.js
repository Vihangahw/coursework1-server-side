
const bcrypt = require('bcryptjs');
const { RegisteredUser } = require('../models');

const registerNewUser = async (req, res) => {
    console.log('Incoming :', req.body); // debug
    const { fullName, emailAddress, password } = req.body;

    try {
        // Basic validation to fill all req fields
        if (!fullName || !emailAddress || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check for a existing user
        const existingUser = await RegisteredUser.findOne({ where: { emailAddress } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hashed password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await RegisteredUser.create({
            fullName,
            emailAddress,
            hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully!',
            apiKey: newUser.apiKey,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Something went wrong. Try again later.' });
    }
};

const loginUser = async (req, res) => {
    const { emailAddress, password } = req.body;

    try {
        const user = await RegisteredUser.findOne({ where: { emailAddress } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Save user session
        req.session.userId = user.userId;

        res.status(200).json({
            message: 'Login successful!',
            fullName: user.fullName,
            apiKey: user.apiKey,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed. Try again.' });
    }
};

const { v4: generateApiKey } = require('uuid');

const regenerateApiKey = async (req, res) => {
    const sessionUserId = req.session.userId;

    if (!sessionUserId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    try {
        const user = await RegisteredUser.findByPk(sessionUserId);

        const newKey = generateApiKey();
        user.apiKey = newKey;
        await user.save();

        res.status(200).json({
            message: "API key regenerated successfully.",
            newApiKey: newKey,
        });
    } catch (err) {
        console.error("API key regeneration error:", err.message);
        res.status(500).json({ message: "Failed to regenerate API key." });
    }
};


module.exports = {
    registerNewUser,
    loginUser,
    regenerateApiKey,
};
