const queries = require("../queries/fav.queries");
const { executeQuery } = require('../utils/pgHelper');

/**
 * Obtiene todas las películas favoritas de un usuario por su ID.
 *
 * @async
 * @function getAllFavoritesById
 * @param {string} user_id - ID del usuario.
 * @returns {Promise<Array>} - Lista de objetos con las películas favoritas del usuario.
 */
const getAllFavoritesById = async (user_id) => {
    const result = await executeQuery(queries.getAllFavoritesById, [user_id])
    return result
}

/**
 * Añade una película a los favoritos de un usuario.
 *
 * @async
 * @function addFavorite
 * @param {Object} favorite - Objeto con los datos del favorito.
 * @param {string} favorite.user_id - ID del usuario.
 * @param {string} favorite.movie_id - ID de la película.
 * @param {string} favorite.source - Fuente de la película (por ejemplo, "OMDB" o "local").
 * @returns {Promise<Object>} - Resultado de la operación de inserción.
 */
const addFavorite = async (favorite) => {
    const { user_id, movie_id, source } = favorite;
    return await executeQuery(queries.addFavorite, [user_id, movie_id, source])
}

/**
 * Elimina una película de los favoritos de un usuario.
 *
 * @async
 * @function deleteFavorite
 * @param {string} user_id - ID del usuario.
 * @param {string} movie_id - ID de la película.
 * @returns {Promise<Object>} - Resultado de la operación de eliminación.
 */
const deleteFavorite = async (user_id, movie_id) => {
    return await executeQuery(queries.deleteFavorite, [user_id, movie_id])
}

module.exports = {
    getAllFavoritesById,
    addFavorite,
    deleteFavorite
}
