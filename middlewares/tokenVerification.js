const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const jwt_secret = process.env.SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
    return res.status(401).redirect('/login');
  }
    jwt.verify(token, jwt_secret, async (err, decoded) => {
        if (err) {
            return res.status(401).redirect('/login');
        } 
        if (!decoded || !decoded.email) {
            return res.status(401).redirect('/login');
        }
        let user = await User.getUserByEmail(decoded.email);
        if (!user || user.logged !== true) {
            res.json({ message: 'Invalid token or user not logged in'});
            return res.redirect('/login');
        } else {
            req.user = user
            req.decoded = decoded;
            next();
        }
    });
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