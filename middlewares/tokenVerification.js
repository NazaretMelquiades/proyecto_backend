const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const jwt_secret = process.env.SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.headers['accessToken'];

    if(token) {
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            let user = await User.getUserByEmail(decoded.email);
            if (!user || user.logged !== true) {
                 return res.json({ message: 'Invalid token or user not logged in'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send ({message: 'Token not provided'});
    }
});

module.exports = protectedRoutes;