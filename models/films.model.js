const mongoose = require("mongoose");
require("../config/db_mongo");

const objectSchema = {
    title: {
        type: String,
        required: true,
        unique: true
    },
    poster: {
        type: String,
        required: true,
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