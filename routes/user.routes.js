const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
router.get('/user{/:title}', protectedRoutes, authorizeRole('admin'), userController.getUsers);

// POST
router.post('/signup', userController.signUpUser);

// PUT
router.put('/user', protectedRoutes, authorizeRole('admin'), userController.editUser);

// DELETE
router.delete('/user', protectedRoutes, authorizeRole('admin'), userController.deleteUser);

// RUTAS DE INICIO Y FINAL DE SESION 
router.post('/login', userController.loginUser);
router.post('/logout', protectedRoutes, userController.logoutUser);

module.exports = router;
