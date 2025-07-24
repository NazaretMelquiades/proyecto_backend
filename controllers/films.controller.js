const  {response} = require('express');
const filmServices = require('../services/films.service');
const fetchFilm = require('../utils/fetchFilm');

// GET 
const getFilms = async (req, res) => {
    let Films;
    let title = req.query.title
    try {
        if(title){
            Films = await fetchFilm(title) || await filmServices.getFilmsByTitle(title);
        }
        else{
            Films = await filmServices.getAllFilms();
        }
        if (!Films){
            return res.status(404).json({ message: 'Films not found'});
        }
    res.status(200).json(Films);
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
};

// POST
const createFilm = async (req, res) => {
    const { title, poster, year, director, genre, runtime  } = req.body;
        if (!title || !poster || !year || !director || !genre || !runtime) {
            res.status(400).json({ msj: "Missing necessary data" });
        }
    try{
        
        let newFilm = await filmServices.createFilm(
            title,
            poster,
            year,
            director,
            genre,
            runtime
            );
            res.status(201).json({
                    msj: "Film saved",
                    data: newFilm 
                });
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
};

// PUT
const updateFilm = async (req, res) => {
    const {findTitle, title, poster, year, director, genre, runtime} = req.body;
        if (!findTitle || !title || !poster || !year || !director || !genre || !runtime) {
            res.status(400).json({ msj: "Missing necessary data" });
        }
    try{
        const updatedFilm = await filmServices.updateFilm(req.body);
        res.status(200).json({
            msj: "Film updated",
            Oldtitle: req.body.findTitle,
            data: updatedFilm 
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// DELETE
const deleteFilm = async (req, res) => {
    const {title} = req.body;
        if(!title){
                res.status(400).json({ msj: "Missing valid title"});      
        }
    try{
        const deleted = await filmServices.deleteFilm(title);
        if(!deleted){
            res.status(400).json({ msj: "Couldn't find a film with the given title"});
        }
        res.status(200).json({ msj: `Film: ${title} was successfully deleted`})
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

module.exports = {
    getFilms,
    createFilm,
    updateFilm,
    deleteFilm
}