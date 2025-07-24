const userAndAdmin = require('../models/');

//GET http://localhost:3000/api/user
const getUser = async (req, res) => {
    let users;
    if(req.query.email) {
        users = await user.getUserByEmail(req.query.email);
    }
    else {
        
    }  
}
//POST http://localhost:3000/api/signup
const createUser = async (req, res) => {

}
//POST http://localhost:3000/api/login 
const loginUser = async (req, res) => {

}
//POST http://localhost:3000/api/logout
const logoutUser = async (req, res) => {

}
//PUT http://localhost:3000//api/user
const editUser = async (req, res) => {

}
//DELETE http://localhost:3000/api/user
const  deleteUser = async (req, res) => {

}


module.exports= {
    getUser,
    loginUser,
    logoutUser,
    editUser,
    deleteUser
};
