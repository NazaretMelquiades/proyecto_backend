const mongoose = require("mongoose");
require("../config/db_mongo");
const regex = require('../utils/regex');

const objectSchema = {
    Title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Poster: {
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
    Year: {
        type: Number,
        required: true
    },
    Director: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Runtime: {
        type: String,
        required: true
    }
}

//CREAR ESQUEMA
const filmsSchema = mongoose.Schema(objectSchema);

//Crear colección
const Film = mongoose.model("Film", filmsSchema);

module.exports = Film;