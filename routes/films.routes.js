const express = require('express');
const { upload, errorFileHandler } = require('../middlewares/fileVerification');
const filmController = require('../controllers/films.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
router.get('/{:Title}', protectedRoutes, filmController.getFilms);

// POST
router.post('/', protectedRoutes, authorizeRole('admin'), upload.single('Poster'), errorFileHandler, filmController.createFilm);

// PUT
router.put('/', protectedRoutes, authorizeRole('admin'), filmController.updateFilm);

// DELETE
router.delete('/', protectedRoutes, authorizeRole('admin'), filmController.deleteFilm);

// router.get('/', (req, res) => res.redirect('/login'));

// router.get('/login', (req, res) => res.render('login.pug'));
// router.post('/login', login);

// router.get('/logout', logout);

module.exports = router;