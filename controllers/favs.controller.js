const favorites = require("../models/favs.model");
const fetchFilmById = require('../utils/fetchFilmById');
const filmServices = require('../services/films.service');

// GET http://localhost:3000/api/favorites/id
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
            });
        }

        const films = [];

        for (const fav of favs) {
            let film = null;

            if (fav.source === 'omdb') {
                film = await fetchFilmById(fav.movie_id);

                if (film.Poster === 'N/A') film.Poster = 'Poster not found';
                if (film.Runtime === 'N/A') film.Runtime = 'Probably too long';
            }

            if (fav.source === 'mongo') {
                film = await filmServices.getFilmsById(fav.movie_id);
            }

            if (film) {
                films.push(film);
            }
        }

        res.status(200).json({
            message: `Found ${films.length} film(s) for user ${user_id}`,
            data: films
        });

    } catch (err) {
        console.error("error obtaining favourites", err.message);
        res.status(500).json({ message: "internal server error" });
    }
};

// POST http://localhost:3000/api/favorites
// RENDER https://proyecto-backend-krib.onrender.com/api/favorites
const addFavorite = async (req, res) => {
    const { user_id, movie_id, source } = req.body;
    // Validación
    if (!user_id || !movie_id || !source) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        let movieDetails = null;

        if (source === 'omdb') {
            // Llama a una función para pedir la película a la API OMDB
            movieDetails = await fetchFilmById(movie_id);
        } else if (source === 'mongo') {
            // O la busca en tu base de datos Mongo local con otro servicio
            movieDetails = await filmServices.getFilmById(movie_id);
            // console.log(movieDetails);
        } else {

            return res.status(400).json({ message: "Invalid source" });
        }

        if (!movieDetails) {
            return res.status(404).json({ message: "Movie not found in source" });
        }

        const result = await favorites.addFavorite({ user_id, movie_id, source });

        if (result === 0) {
            return res.status(400).json({
                message: "Favorite not added",
                items_created: result
            });
        }
        res.status(201).json({
            message: "Favorite added successfully",
            items_created: result,
            data: { user_id, movie_id, source }
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
    addFavorite,
    deleteFavorite
}


