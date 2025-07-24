const Film = require('../models/films.model');

const getAllFilms = async () => {
    return await Film.find({},"-_id -__v");
};

const getFilmsByTitle = async (title) => {
    return await Film.find({title}, "-_id -__v");
};

const createFilm = async (
    title,
    poster,
    year,
    director,
    genre,
    runtime
) => {
    const film = new Film({
        title,
        poster,
        year,
        director,
        genre,
        runtime
    });
    return await film.save();
};

const updateFilm = async (FilmData) => {
    const { findTitle, title, poster, year, director, genre, runtime } = FilmData;

    return await Film.findOneAndUpdate( {title: FilmData.findTitle}, FilmData, {new: true});
};

const deleteFilm = async (title) => {
    const film = await Film.findOne({ title });
    if(!film) {
        throw new Error(`No Film found with name: ${title}`);
    }
    else {
        return await Film.findOneAndDelete({title});
    }
};

module.exports = {
    getAllFilms,
    getFilmsByTitle,
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
//      title:'The revenge of the bluecheese',
//      poster:'cheese.img',
//      year:2025,
//      director:'Alejandro Reyes',
//      genre:'Action',
//      runtime:'125m'
// }

// updateFilm(newFilm);