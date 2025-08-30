const express = require('express');
const { upload, errorFileHandler } = require('../middlewares/fileVerification');
const filmController = require('../controllers/films.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
/**
 * @swagger
 * /api/films/{title}:
 *   get:
 *     summary: Obtener una película por título
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la película a buscar
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: Película no encontrada
 */
router.get('/{:Title}', protectedRoutes, filmController.getFilms);

// POST
/**
 * @swagger
 * /api/films:
 *   post:
 *     summary: Crear una nueva película
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - poster
 *               - year
 *               - director
 *               - genre
 *               - runtime
 *             properties:
 *               title:
 *                 type: string
 *               poster:
 *                 type: string
 *                 description: URL del póster (termina en .jpg o .png)
 *               year:
 *                 type: integer
 *               director:
 *                 type: string
 *               genre:
 *                 type: string
 *               runtime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Película creada correctamente
 *       400:
 *         description: Datos inválidos
 */

router.post('/', protectedRoutes, authorizeRole('admin'), upload.single('Poster'), errorFileHandler, filmController.createFilm);

// PUT
/**
 * @swagger
 * /api/films:
 *   put:
 *     summary: Actualizar una película existente
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID de la película a actualizar
 *               title:
 *                 type: string
 *               poster:
 *                 type: string
 *               year:
 *                 type: integer
 *               director:
 *                 type: string
 *               genre:
 *                 type: string
 *               runtime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Película actualizada correctamente
 *       400:
 *         description: Datos inválidos o ID faltante
 *       404:
 *         description: Película no encontrada
 */
router.put('/', protectedRoutes, authorizeRole('admin'), filmController.updateFilm);

// DELETE
/**
 * @swagger
 * /api/films:
 *   delete:
 *     summary: Eliminar una película
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID de la película a eliminar
 *     responses:
 *       200:
 *         description: Película eliminada correctamente
 *       404:
 *         description: Película no encontrada
 */
router.delete('/', protectedRoutes, authorizeRole('admin'), filmController.deleteFilm);

// router.get('/', (req, res) => res.redirect('/login'));

// router.get('/login', (req, res) => res.render('login.pug'));
// router.post('/login', login);

// router.get('/logout', logout);

module.exports = router;