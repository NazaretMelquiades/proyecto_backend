const express = require('express');

const filmController = require('../controllers/films.controller');
const router = express.Router();

// GET
router.get('/{:title}', filmController.getFilms);

// POST
router.post('/', filmController.createFilm);

// PUT
router.put('/', filmController.updateFilm);

// DELETE
router.delete('/', filmController.deleteFilm);

// router.get('/', (req, res) => res.redirect('/login'));

// router.get('/login', (req, res) => res.render('login.pug'));
// router.post('/login', login);

// router.get('/logout', logout);

module.exports = router;