const favorites = require("../models/favs.model");
const pool = require('../config/db_pgsql');

// GET http://localhost:3000/api/favorites
// RENDER https://proyecto-backend-krib.onrender.com/api/favorites/id
const getAllFavoritesById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const favs = await favorites.getAllFavoritesById(user_id);
        if (favs.length === 0) {
            return res.status(404).json({
                message: "No favourites found for this user",
                items_found: "0",
                data: []
            })
        }
        res.status(200).json(favs)
    } catch (err) {
        console.error("error obtaining favourites", err.message);
        res.status(500).json({ message: "internal server error" })
    }
}

// GET WEB
const renderFavoritesByUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const favs = await favorites.getAllFavoritesById(user_id);
        res.render('favorites', { favorites: favs }); // Renderiza la vista Pug

    } catch (err) {
        console.error('Error al renderizar favoritos:', err.message);
        res.status(500).send('Error al cargar la lista de favoritos');
    }
};

module.exports = { renderFavoritesByUser };

// POST http://localhost:3000/api/favorites
// RENDER https://proyecto-backend-krib.onrender.com/api/favorites
const addFavorite = async (req, res) => {
    const { user_id, movie_id, title, source } = req.body;

    if (!user_id || !movie_id || !title || !source) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await favorites.addFavorite({ user_id, movie_id, title, source });

        if (result === 0) {
            return res.status(400).json({
                message: "Favorite not added",
                items_created: result
            });

        }

        res.status(201).json({
            message: "Favorite added successfully",
            items_created: result,
            data: { user_id, movie_id, title, source }
        });
    } catch (err) {
        console.error("Error adding favorite:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE http://localhost:3000/api/favorites
// RENDER https://proyecto-backend-krib.onrender.com/api/favorites
const deleteFavorite = async (req, res) => {
    const { user_id, movie_id, } = req.body;
    if (!user_id || !movie_id) {
        return res.status(400).json({
            message: "Required fields are missing",
            items_deleted: result
        });
    }

    try {
        const result = await favorites.deleteFavorite(user_id, movie_id);

        if (result === 0) {
            return res.status(404).json({
                message: "The favourite does not exist or has already been eliminated",
                items_deleted: result
            });
        }

        res.status(200).json({
            message: "Favorite deleted succesfuly",
            items_deleted: result,
            data: { user_id, movie_id }
        });
    } catch (err) {
        console.error("Error delete favorite:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllFavoritesById,
    renderFavoritesByUser,
    addFavorite,
    deleteFavorite
}


