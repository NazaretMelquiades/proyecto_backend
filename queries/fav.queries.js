const queries = {
    getAllFavoritesById: `
    SELECT movie_id, source, title
    FROM favorites
    WHERE user_id = $1`,
    addFavorite: `
    INSERT INTO favorites(user_id, movie_id, title, source)
    VALUES ($1,$2,$3,$4)`,
    deleteFavorite: `
    DELETE FROM favorites
    WHERE user_id = $1 AND movie_id = $2;`
}

module.exports = queries;