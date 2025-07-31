const express = require('express');
const router = express.Router();
const fetchFilm = require('../utils/fetchFilm');
const filmServices = require('../services/films.service');
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');
const userModel = require('../models/user.model');
const userAndAdmin = require('../models/user.model');

// Vista inicio
router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Vista buscador de películas con resultados
// router.get('/search', async (req, res) => {
//   const { title } = req.query;
//   let filmApi = null;
//   let filmsMongo = [];

//   if (title) {
//     filmApi = await fetchFilm(title); // Correctamente asignado a filmApi

//     if (!filmApi) {
//       // Si la API no devuelve nada, buscar en MongoDB
//       filmsMongo = await filmServices.getFilmsByTitle(title);
//     }
//   }

//   res.render('search', {
//     title: 'Buscar Películas',
//     filmsApi: filmApi ? [filmApi] : [],
//     filmsMongo
//   });
// });

// Ruta GET /search que renderiza la vista
router.get('/search', protectedRoutes, (req, res) => {
  res.render('search', { title: 'Buscar Películas' });
});


// Vista del formulario de registro
router.get('/signup', (req, res) => {
  res.render('register');
});

// POST para procesar registro y redirigir a login
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await userAndAdmin.signUpUser(username, email, password);
    res.redirect('/login');
  } catch (error) {
    
    res.render('register', { error: error.message });
  }
});

// Vista de administración de películas
router.get('/movies', protectedRoutes, authorizeRole('admin'), async (req, res) => {
  const films = await filmServices.getAllFilms();
  res.render('movies', { films });
});

// Vista del login
router.get('/login', (req, res) => {
  res.render('login');
});

// Vista del dashboard del usuario
router.get('/user/dashboard', protectedRoutes, authorizeRole('user'), (req, res) => {
  res.render('user-dashboard');
});

//Vista del dashboard del admin
router.get('/admin/dashboard', protectedRoutes, authorizeRole('admin'), (req, res) => {
  res.render('admin-dashboard')
})

// Vista de administración de usuarios
router.get('/users', protectedRoutes, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.render('users', { users });
  } catch (error) {
    res.render('users', { error: error.message });
  }
});
//Eliminar usuario por email
router.post('/users/delete', protectedRoutes, authorizeRole('admin'), async (req, res) => {
  try {
    await userModel.deleteUser(req.body.email);
    res.redirect('/users');
  } catch (error) {
    res.render('users', { error: error.message });
  }
});
//Profile user
router.get('/profile', protectedRoutes, (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;