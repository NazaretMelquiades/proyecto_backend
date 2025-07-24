const pool = require('../db');
const queries = require('./queries/user.queries');
const { executeQuery } = require('../utils/pgHelper');

const signUpUser = async (user) => {
  const { username, email, password } = user;
  return await executeQuery(queries.signUpUser, [username, email, password]);
}

const getUserByEmail = async (email) => {
  return await executeQuery(queries.getUserByEmail, [email]);
}

// Obtener todos los usuarios
const getAllUsers = async () => {
  return await executeQuery(queries.getAllUser);
};

// Actualizar un usuario
const updateUser = async (user) => {
  const { username, email, password, id } = user;
  return await executeQuery(queries.updateUser, [username, email, password, id]);
};

// Eliminar usuario por email
const deleteUser = async (email) => {
  return await executeQuery(queries.deleteUser, [email]);
};

// Marcar usuario como logueado
const logIn = async (email) => {
  return await executeQuery(queries.logIn, [email]);
};

// Marcar usuario como deslogueado
const logOut = async (email) => {
  return await executeQuery(queries.logOut, [email]);
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
