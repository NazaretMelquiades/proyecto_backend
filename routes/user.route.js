const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
router.get('/user{/:title}', userController.getUsers);

// POST
router.post('/signup', userController.signUpUser);

// PUT
router.put('/user', userController.editUser);

// DELETE´
router.delete('/user', userController.deleteUser);

router.post('/login', userController.loginUser);
router.post('/logout/:email', userController.logoutUser);

module.exports = router;