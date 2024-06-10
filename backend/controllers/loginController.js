const bcrypt = require('bcryptjs');
const User = require('../models/registerModel');

// Login User API - /api/v1/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful', firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password});
        } else {
            return res.status(401).json({ message: 'Email or password wrong' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};