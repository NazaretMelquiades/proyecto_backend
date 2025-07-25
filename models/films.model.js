const mongoose = require("mongoose");
require("../config/db_mongo");
const regex = require('../utils/regex');

const objectSchema = {
    title: {
        type: String,
        required: true,
        unique: true
    },
    poster: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                if (regex.validateImg(url)) {
                    return true;
                } else {
                    return false;
                }
            },
            message: "Valid formats for Images url are .jpg or .png"
        }
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    }
}

//CREAR ESQUEMA
const filmsSchema = mongoose.Schema(objectSchema);

//Crear colección
const Film = mongoose.model("Film", filmsSchema);

module.exports = Film;