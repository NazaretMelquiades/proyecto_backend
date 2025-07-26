const userAndAdmin = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//POST http://localhost:3000/api/signup

const signUpUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            console.log(username,password,email);
            
            return res.status(400).send('Missing necessary data');
        }
        const newUser = await userAndAdmin.signUpUser(username, email, password);
        res.redirect('/user/dashboard');
        res.status(201).json({ message: 'User created successfully', newUser});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating user' });
    }
};

//POST http://localhost:3000/api/login 

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing necessary data' });
    }
    try {
        const user = await userAndAdmin.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            await userAndAdmin.logIn(email)
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
        } else {
            res.status(404).json({ message: 'Invalid credential' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};

//POST http://localhost:3000/api/logout

const logoutUser = async (req, res) => {
    const email = req.params.email;
    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }
    try {
        const result = await userAndAdmin.logOut(email);

        res.clearCookie('token');
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({ error: 'Error logging out user' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userAndAdmin.getAllUsers();
        if (!users) {
            return res.status(404).json({ message: 'Users not found'});
        }
        res.redirect('/users')
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}
//GET http://localhost:3000/api/user

const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
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


//PUT http://localhost:3000/api/user

const editUser = async (req, res) => {
    const { oldemail, username, email, password } = req.body;

    if (!oldemail || !username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await userAndAdmin.updateUser( oldemail, username, email, password );
        if (result === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

//DELETE http://localhost:3000/api/user

const deleteUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Invalid email address.' });
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
    deleteUser,
    getAllUsers
};

