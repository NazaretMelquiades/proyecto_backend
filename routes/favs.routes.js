const express = require('express');
const favsController = require('../controllers/favs.controller');
const router = express.Router();


// [GET] / api / favorites Obtener películas favoritas del usuario
router.get('/:user_id', favsController.getAllFavoritesById);

// [POST] / api / favorites Guardar favorito del usuario
router.post('/', favsController.addFavorite);

// [DELETE] / api / favorites Borrar favorito del usuario
router.delete('/', favsController.deleteFavorite);

module.exports = router;