const pool = require('../config/db_pgsql');

const executeQuery = async (query, params = []) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(query, params);
        result = data.rows || data.rowCount;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};

module.exports = { executeQuery };
