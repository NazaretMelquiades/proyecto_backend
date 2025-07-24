const pool = require('../config/db_pgsql');
const queries = require("../queries/fav.queries");

const getAllFavoritesById = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); //esperar a que se abra la conexión
        const data = await client.query(queries.getAllFavoritesById, [id]);
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        client.release();
    }
    return result
}

const addFavorite = async (favorite) => {
    const { user_id, movie_id, source } = favorite;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createFavorite, [user_id, movie_id, source])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        client.release();
    }
    return result
}

const deleteFavorite = async (user_id, movie_id) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteFavorite, [user_id, movie_id])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        client.release();
    }
    return result
}

