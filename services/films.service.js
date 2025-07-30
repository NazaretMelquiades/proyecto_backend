const mongoose = require('mongoose');
const Film = require('../models/films.model');

const getAllFilms = async () => {
    return await Film.find({}, "-_id -__v");
};

const getFilmsByTitle = async (Title) => {
    return await Film.find({ Title }, "-_id -__v");
};

const getFilmById = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return await Film.findById(id).select("-__v"); // Busca por _id
    }
    return await Film.findOne({ movie_id: id }).select("-__v"); // Busca por movie_id si lo tienes así definido
};

const createFilm = async (
    Title,
    Poster,
    Year,
    Director,
    Genre,
    Runtime
) => {
    const film = new Film({
        Title,
        Poster,
        Year,
        Director,
        Genre,
        Runtime
    });
    return await film.save();
};

const updateFilm = async (FilmData) => {
    const { findTitle, Title, Poster, Year, Director, Genre, Runtime } = FilmData;

    return await Film.findOneAndUpdate({ Title: FilmData.findTitle }, FilmData, { new: true });
};

const deleteFilm = async (Title) => {
    const film = await Film.findOne({ Title });
    if (!film) {
        throw new Error(`No Film found with name: ${Title}`);
    }
    else {
        return await Film.findOneAndDelete({ Title });
    }
};

module.exports = {
    getAllFilms,
    getFilmsByTitle,
    getFilmById,
    createFilm,
    updateFilm,
    deleteFilm
};

// createFilm(
//     'The return of the cheese',
//     'cheese.img',
//     2025,
//     'Alejandro Reyes',
//     'Action',
//     '125m'
// )

// getAllFilms()

// getFilmsByTitle('The return of the cheese');

// deleteFilm('The return of the cheese');

// const newFilm = {
//      findTitle:'The return of the cheese',
//      Title:'The revenge of the bluecheese',
//      Poster:'cheese.img',
//      Year:2025,
//      Director:'Alejandro Reyes',
//      Genre:'Action',
//      Runtime:'125m'
// }

// updateFilm(newFilm);