// const express = require('express');
// const router = express.Router();

// // Controllers
// const userController = require('../controllers/user.controller');


// // Registrar nuevo usuario
// router.post('/signup', userController.signUpUser);

// // Login
// router.post('/login', userController.loginUser);

// // Logout 
// router.post('/logout/:email', userController.logoutUser);

// // router.use(auth); 

// // Solo admin puede obtener todos los usuarios
// router.get('/users', authorizeRole('admin'), userController.getAllUsers);

// // Obtener usuario por email 
// router.get('/user/:email', userController.getUserByEmail);

// // Editar usuario
// router.put('/user', userController.editUser);

// // Eliminar usuario
// router.delete('/user', userController.deleteUser);

// module.exports = router;

const express = require('express');

const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

router.get('/signup', (req, res) => {
  res.render('register')});
  
// Registrar nuevo usuario
router.post('/signup', userController.signUpUser);

// Login
router.post('/login', userController.loginUser);

// Logout 
router.post('/logout/:email', userController.logoutUser);

//solo admin puede obtener todos los usuarios
router.get('/users{/:title}', userController.getUsers)

 // Obtener usuario por email 
// router.get('/user/:email', userController.getUserByEmail);

// Editar usuario
router.put('/user', userController.editUser);

// Eliminar usuario
router.delete('/user', userController.deleteUser);

module.exports = router;
