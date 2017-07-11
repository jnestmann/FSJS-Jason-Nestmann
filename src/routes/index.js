// src/routes/index.js
const router = require('express').Router();
const data_api = require('../game_data_api.js');
const mongoose = require('mongoose');

// Gets the main landing, home page
router.get('/', function(req, res, next) {
    mongoose.model('File').find({}, function(err, files) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        res.render('games_list', {games: files});
    });
});

// Posts new data to the database
router.post('/', function(req, res, next){
    const File = mongoose.model('File');
    console.log(req.body);
    const fileData = {
        title: req.body.title,
        description: req.body.description,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        minAge: req.body.minAge,
        cooperative: req.body.cooperative
    };
    console.log(fileData);

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.render('games_list', res.json());
    //res.json(newFile);
  });
});


router.get('/add', function(req, res, next){
    res.render('add');
});


router.get('/files/?:fileID', function(req, res, next){
    data_api.get(req, res);
});


























//router.put('/file/:fileId', function(req, res, next) {
//    data_api.put(req, res);
//    next();
//});

//router.delete('/file/:fileId', function(req, res, next) {
//    data_api.delete(req, res);
//    next();
//});

//router.get('/file/:fileId', function(req, res, next) {
//    data_api.get(req, res);
//    next();
//});

module.exports = router;