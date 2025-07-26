const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const jwt_secret = process.env.SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            let user = await User.getUserByEmail(decoded.email);
            if (!user || user.logged !== true) {
                res.json({ message: 'Invalid token or user not logged in'});
                return res.redirect('/login');
            } else if (err){
                return res.redirect('/login');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({message: 'Token not provided'});
        return res.redirect('/login');
    }
});

module.exports = protectedRoutes;

// Logica logOut
// app.get('/logout', (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/login');
// });

// Logica login
// res
//   .cookie('token', token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'strict',
//       maxAge: 20 * 60 * 1000
//   })
//   .status(200)
//   .json({
//       msg: 'Correct authentication',
//       token
//   });