const User = require('../models/registerModel');

// Update User API - /api/v1/updateUser
exports.updateUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { firstname, lastname, password } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', updatedUser });

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
