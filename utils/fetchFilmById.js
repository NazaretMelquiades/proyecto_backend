const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

async function fetchFilmById(imdbID = "") {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        let film = await response.json();
        if (film.Response === 'False') {
            return null;
        }
        film = {
            Title: film.Title,
            Poster: film.Poster,
            Year: film.Year,
            Director: film.Director,
            Genre: film.Genre,
            Runtime: film.Runtime,
            imdbID: film.imdbID
        };
        return film;
    } catch (error) {
        console.log('Error fetching film by ID:', error.message);
        return null;
    }
};

module.exports = fetchFilmById;
