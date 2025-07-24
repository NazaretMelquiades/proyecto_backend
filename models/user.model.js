const pool = require('../db');
const queries = require('./queries/user.queries');

const signUpUser = async (user) => {
  const { username, email, password } = user;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.signUpUser, [username, email, password]);
    return result.rowCount;
  } catch (err) {
    console.error('Error en signUpUser:', err);
    throw err;
  } finally {
    client.release();
  }
};


const getUserByEmail = async (email) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.getUserByEmail, [email]);
    return result.rows[0]; // retorna el usuario o undefined
  } catch (err) {
    console.error('Error en getUserByEmail:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Obtener todos los usuarios
const getAllUsers = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.getAllUser);
    return result.rows;
  } catch (err) {
    console.error('Error en getAllUsers:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Actualizar un usuario
const updateUser = async (user) => {
  const { username, email, password, id } = user;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.updateUser, [username, email, password, id]);
    return result.rowCount;
  } catch (err) {
    console.error('Error en updateUser:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Eliminar usuario por email
const deleteUser = async (email) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.deleteUser, [email]);
    return result.rowCount;
  } catch (err) {
    console.error('Error en deleteUser:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Marcar usuario como logueado
const logIn = async (email) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.logIn, [email]);
    return result.rowCount;
  } catch (err) {
    console.error('Error en logIn:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Marcar usuario como deslogueado
const logOut = async (email) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queries.logOut, [email]);
    return result.rowCount;
  } catch (err) {
    console.error('Error en logOut:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  signUpUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  logIn,
  logOut
};
