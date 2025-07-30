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

// POST para procesar registro y redirigir a login
const userAndAdmin = require('../models/user.model');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await userAndAdmin.signUpUser(username, email, password);
    res.redirect('/login');
  } catch (error) {
    // En caso de error, podés renderizar la vista con el error
    res.render('register', { error: error.message });
  }
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