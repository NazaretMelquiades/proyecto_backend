const express = require('express');
const favsController = require('../controllers/favs.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
/**
 * @swagger
 * /api/favorites/{user_id}:
 *   get:
 *     summary: Obtener películas favoritas de un usuario
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de películas favoritas del usuario
 *       404:
 *         description: Usuario no encontrado o sin favoritos
 */
router.get('/:user_id', protectedRoutes, authorizeRole('user'), favsController.getAllFavoritesById);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Agregar una película a los favoritos del usuario
 *     tags:
 *       - Favorites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - film_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID del usuario
 *               film_id:
 *                 type: string
 *                 description: ID de la película
 *     responses:
 *       201:
 *         description: Película añadida a favoritos
 *       400:
 *         description: Datos inválidos o película ya en favoritos
 */
// POST
router.post('/', protectedRoutes, authorizeRole('user'), favsController.addFavorite);

/**
 * @swagger
 * /api/favorites:
 *   delete:
 *     summary: Eliminar una película de los favoritos del usuario
 *     tags:
 *       - Favorites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - film_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID del usuario
 *               film_id:
 *                 type: string
 *                 description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada de favoritos
 *       404:
 *         description: Película no encontrada en favoritos
 */
// DELETE
router.delete('/', protectedRoutes, authorizeRole('user'), favsController.deleteFavorite);

module.exports = router;