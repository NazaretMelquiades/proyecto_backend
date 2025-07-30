const express = require('express');
const router = express.Router();
const fetchFilm = require('../utils/fetchFilm');

// Vista inicio
router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Vista buscador de películas con resultados
router.get('/search', async (req, res) => {
  const { title } = req.query;
  let film = null;

  if (title) {
    film = await fetchFilm(title); // Solo API externa por ahora
  }

  res.render('search', {
    title: 'Buscar Películas',
    filmsApi: film ? [film] : [],
    filmsMongo: [] // De mongo
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