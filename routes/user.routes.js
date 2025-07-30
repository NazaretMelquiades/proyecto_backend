const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');


// Registrar nuevo usuario
router.post('/signup', userController.signUpUser);

// Login
router.post('/login', userController.loginUser);

// Logout 
router.post('/logout/:email', userController.logoutUser);

// Solo admin puede obtener todos los usuarios
router.get('/users{/:title}', userController.getUsers);

// Editar usuario
router.put('/user', userController.editUser);

// Eliminar usuario
router.delete('/user', userController.deleteUser);

module.exports = router;
