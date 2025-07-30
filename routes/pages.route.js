const express = require('express');
const router = express.Router();
const fetchFilm = require('../utils/fetchFilm');
const filmServices = require('../services/films.service');

// Vista inicio
router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Vista buscador de películas con resultados
router.get('/search', async (req, res) => {
  const { title } = req.query;
  let filmApi = null;
  let filmsMongo = [];

  if (title) {
    filmApi = await fetchFilm(title); // Correctamente asignado a filmApi

    if (!filmApi) {
      // Si la API no devuelve nada, buscar en MongoDB
      filmsMongo = await filmServices.getFilmsByTitle(title);
    }
  }

  res.render('search', {
    title: 'Buscar Películas',
    filmsApi: filmApi ? [filmApi] : [],
    filmsMongo
  });
});

// Vista del formulario de registro
router.get('/signup', (req, res) => {
  res.render('register');
});

// Vista del login
router.get('/login', (req, res) => {
  res.render('login');
});


module.exports = router;