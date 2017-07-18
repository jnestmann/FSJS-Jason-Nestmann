// src/routes/index.js
const router = require('express').Router();
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


router.get('/add', function(req, res, next){
    res.render('add');
});


// Posts new data to the database
router.post('/file', function(req, res, next){
    const File = mongoose.model('File');
    const fileData = {
        title: req.body.title,
        description: req.body.description,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        minAge: req.body.minAge,
        cooperative: req.body.cooperative
    };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
      res.redirect('/');
  });
});


router.get('/:fileId', function(req, res, next) {
    const File = mongoose.model('File');
    const fileId = req.params.fileId;
    
    File.findById(fileId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    res.render('game_detail', {game: file});
    })
});


router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.deleted = true;

    file.save(function(err, doomedFile) {
      res.json(doomedFile);
    })

  })
});


module.exports = router;