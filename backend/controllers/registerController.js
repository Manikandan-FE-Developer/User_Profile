const bcrypt = require('bcryptjs');
const User = require('../models/registerModel');

// Create Register API - /api/v1/register
exports.register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", firstname: newUser.firstname, lastname: newUser.lastname, email: newUser.email, password: newUser.password });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
