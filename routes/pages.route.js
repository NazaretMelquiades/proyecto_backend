const express = require('express');
const router = express.Router();
const fetchFilm = require('../utils/fetchFilm');

// Vista inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
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

module.exports = router;