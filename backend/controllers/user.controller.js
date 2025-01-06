
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });

        }
    // Create a new user
        const user = await User.create({ name, email, password });
        console.log(name)

        return res.status(201).json({
            message: 'User registered successfully',
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (user && (await user.comparePassword(password))) {
            console.log(email,"loggede in.....")
            return res.status(200).json({
                message: 'Login successful',
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
