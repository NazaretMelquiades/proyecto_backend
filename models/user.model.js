const bcrypt = require('bcryptjs')
const queries = require('../queries/user.queries');
const { executeQuery } = require('../utils/pgHelper');
const regex = require('../utils/regex');

const signUpUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if(!regex.validateEmail(email)){
    throw new Error('Introduce a valid email')
  }
  if(!regex.validatePassword(password)){
    throw new Error('Password must be 8 characters long and must include an uppercase letter, lowercase letter, a  number and a symbol')
  }  
  const newUser = [username, email, hashedPassword] ;
  return await executeQuery(queries.signUpUser, newUser);
}

const getUserByEmail = async (email) => {
  const result =  await executeQuery(queries.getUserByEmail, [email]);
  return result[0];
}

// Obtener todos los usuarios
const getAllUsers = async () => {
  return await executeQuery(queries.getAllUser);
};

// Actualizar un usuario
const updateUser = async (oldEmail, username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if(!regex.validateEmail(email)){
    throw new Error('Introduce a valid email')
  }
  if(!regex.validatePassword(password)){
    throw new Error('Password must be 8 characters long and must include an uppercase letter, lowercase letter, a  number and a symbol')
  }  
  const updatedUser = [ oldEmail, username, email, hashedPassword ];
  return await executeQuery(queries.updateUser, updatedUser);
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
