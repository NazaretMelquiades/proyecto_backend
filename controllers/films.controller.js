const  {response} = require('express');
const path = require('path');
const filmServices = require('../services/films.service');
const fetchFilm = require('../utils/fetchFilm');
const scraper = require('../utils/scraper') 

// GET 
const getFilms = async (req, res) => {
    let Films;
    let Title = req.query.Title
    try {
        if(Title){
            Films = await fetchFilm(Title) || await filmServices.getFilmsByTitle(Title);
        }
        else{
            Films = await filmServices.getAllFilms();
        }
        if (!Films){
            return res.status(404).json({ message: 'Films not found'});
        }

        if(Films.Poster == 'N/A') {
            Films.Poster = 'Poster not found';
        } else if(Films.Runtime == 'N/A') {
            Films.Runtime = 'Probably too long';
        }


    res.status(200).json(Films);
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
};

// POST
const createFilm = async (req, res) => {
    const { Title, Year, Director, Genre, Runtime  } = req.body;
        if (!Title || !Year || !Director || !Genre || !Runtime || !req.file) {
           return res.status(400).json({ msj: "Missing necessary data" });
        }
    const Poster = `${req.protocol}://${req.get('host')}/uploads/${path.basename(req.file.path)}`;
    try{    
        let newFilm = await filmServices.createFilm(
            Title,
            Poster,
            Year,
            Director,
            Genre,
            Runtime
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
    const {findTitle, Title, Poster, Year, Director, Genre, Runtime} = req.body;
        if (!findTitle || !Title || !Poster || !Year || !Director || !Genre || !Runtime) {
            res.status(400).json({ msj: "Missing necessary data" });
        }
    try{
        const updatedFilm = await filmServices.updateFilm(req.body);
        res.status(200).json({
            msj: "Film updated",
            OldTitle: req.body.findTitle,
            data: updatedFilm 
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// DELETE
const deleteFilm = async (req, res) => {
    const {Title} = req.body;
        if(!Title){
                res.status(400).json({ msj: "Missing valid Title"});      
        }
    try{
        const deleted = await filmServices.deleteFilm(Title);
        if(!deleted){
            res.status(400).json({ msj: "Couldn't find a film with the given Title"});
        }
        res.status(200).json({ msj: `Film: ${Title} was successfully deleted`})
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