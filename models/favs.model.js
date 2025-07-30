const queries = require("../queries/fav.queries");
const { executeQuery } = require('../utils/pgHelper');

const getAllFavoritesById = async (user_id) => {
    const result = await executeQuery(queries.getAllFavoritesById, [user_id])
    return result
}


const addFavorite = async (favorite) => {
    const { user_id, movie_id, source } = favorite;
    return await executeQuery(queries.addFavorite, [user_id, movie_id, source])
}

const deleteFavorite = async (user_id, movie_id) => {
    return await executeQuery(queries.deleteFavorite, [user_id, movie_id])
}

module.exports = {
    getAllFavoritesById,
    addFavorite,
    deleteFavorite
}
