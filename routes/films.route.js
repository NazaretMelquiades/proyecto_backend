const express = require('express');
const { upload, errorFileHandler } = require('../middlewares/fileVerification');
const filmController = require('../controllers/films.controller');
const router = express.Router();

// GET
router.get('/{:Title}', filmController.getFilms);

// POST
router.post('/', upload.single('poster'), errorFileHandler, filmController.createFilm);

// PUT
router.put('/', filmController.updateFilm);

// DELETE
router.delete('/', filmController.deleteFilm);

module.exports = router;