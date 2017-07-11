// src/routes/index.js
const router = require('express').Router();
const data_api = require('../game_data_api.js');
const mongoose = require('mongoose');

// Gets the main landing, home page
router.get('/', function(req, res, next){
    res.render('index');
    next();
});

// Posts new data to the database
router.post('/file', function(req, res, next){
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


router.post('/add/file', function(req, res, next){
    console.log("Post request made");
    console.log(req.body);
    data_api.post2(req.body);
    const games = data_api.get_all();
    res.render('games_list', {games: games});
});

router.get('/add', function(req, res, next){
    res.render('add');
});

router.get('/add/file', function(req, res, next){
    data_api.post2(req.query);
    res.render('add');
});

//router.get('/file/search', function(req, res, next) {
//    res.render('search');
//    next();
//});

router.get('/files', function(req, res, next) {
    mongoose.model('File').find({}, function(err, files) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        res.render('games_list', {games: files});
        //res.json(files);
    });
    //const games = data_api.get_all();
    //console.log(games);
    //res.render('games_list', {games: games});
    //res.json(data_api.get_all());
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