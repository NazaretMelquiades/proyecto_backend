const express = require('express');
const router = express.Router();
const fetchFilm = require('../utils/fetchFilm');
const filmServices = require('../services/films.service');
const { getAllFavoritesById } = require('../models/favs.model');

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
router.get('/search', (req, res) => {
  res.render('search', { title: 'Buscar Películas' });
});


// Vista del formulario de registro
router.get('/signup', (req, res) => {
  res.render('register');
});

// Vista de administración de películas
router.get('/movies', async (req, res) => {
  const films = await filmServices.getAllFilms();
  res.render('movies', { films });
});

// Vista del login
router.get('/login', (req, res) => {
  res.render('login');
});

// Vista del dashboard del usuario
router.get('/user/dashboard', (req, res) => {
  res.render('user-dashboard');
});

//Vista del dashboard del admin
router.get('/admin/dashboard', (req, res) => {
  res.render('admin-dashboard')
})



module.exports = router;