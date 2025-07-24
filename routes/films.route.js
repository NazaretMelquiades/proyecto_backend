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

module.exports = router;