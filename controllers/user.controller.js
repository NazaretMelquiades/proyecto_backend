const userAndAdmin = require('../models/user.model');

//GET http://localhost:3000/api/user

const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid or missing email' });
    }

    try {
        const user = await userAndAdmin.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user'  });
    }
};

//POST http://localhost:3000/api/signup

const signUpUser = async (req, res) => {
    try {
        const newUser = req.body;
        const result = await userAndAdmin.signUpUser(newUser);
        res.status(201).json({ message: 'User created successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

//POST http://localhost:3000/api/login 

const loginUser = async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid or missing email' });
    }

    try {
        const result = await userAndAdmin.loginUser(email);
        if (result === 0) {
            return res.status(404).json({ message: 'User not found or login failed' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};

//POST http://localhost:3000/api/logout

const logoutUser = async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid or missing email' });
    }

    try {
        const result = await userAndAdmin.logoutUser(email);
        if (result === 0) {
            return res.status(404).json({ message: 'User not found or logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out user' });
    }
};

//PUT http://localhost:3000/api/user

const editUser = async (req, res) => {
    const { username, email, password, id } = req.body;

    if (!id || !username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await userAndAdmin.updateUser({ username, email, password, id });
        if (result === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

//DELETE http://localhost:3000/api/user

const deleteUser = async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid or missing email address.' });
    }

    try {
        const result = await userAndAdmin.deleteUser(email);

        if (result === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ error: 'Internal server error while deleting user.' });
    }
};

module.exports = {
    getUserByEmail,
    signUpUser,
    loginUser,
    logoutUser,
    editUser,
    deleteUser
};

