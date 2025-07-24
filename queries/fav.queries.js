const queries = {
    getAllFavoritesById: `
    SELECT movie_id, source
    FROM favorites
    WHERE user_id = $1`,
    createFavorite: `
    INSERT INTO favorites(user_id, movie_id, source)
    VALUES ($1,$2,$3)`,
    deleteFavorite: `
    DELETE FROM favorites
    WHERE user_id = $1 AND movie_id = $2 AND source = $3;`
}

module.exports = queries;