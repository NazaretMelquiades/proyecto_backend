const express = require('express');
const favsController = require('../controllers/favs.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET 
router.get('/:user_id', protectedRoutes, authorizeRole('user'), favsController.getAllFavoritesById);

// POST
router.post('/', protectedRoutes, authorizeRole('user'), favsController.addFavorite);

// DELETE
router.delete('/', protectedRoutes, authorizeRole('user'), favsController.deleteFavorite);

module.exports = router;