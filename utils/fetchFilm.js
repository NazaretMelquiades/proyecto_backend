// Leer fichero .env
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

/************** Fetch by title ************/
async function fetchFilm (title="") { 
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`); //{} o [{},{},{},{}]
        let film = await response.json(); //{} o [{},{},{},{}]
        if (film.Response === 'False') {
            return null;
    }
        film = {
            Title: film.Title,
            Poster: film.Poster,
            Year: film.Year,
            Director: film.Director,
            Genre: film.Genre,
            Runtime: film.Runtime
        }   
        return film 
    } catch (error) {
        console.log('Error fetching film:', error.message);
        return null;
    }
};

module.exports = fetchFilm;