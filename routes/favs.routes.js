const express = require('express');
const favsController = require('../controllers/favs.controller');
const router = express.Router();

// GET 
router.get('/:user_id', favsController.getAllFavoritesById);

// POST
router.post('/', favsController.addFavorite);

// DELETE
router.delete('/', favsController.deleteFavorite);

// GET VISTA
router.get('/view/:user_id', favsController.renderFavoritesByUser);

module.exports = router;