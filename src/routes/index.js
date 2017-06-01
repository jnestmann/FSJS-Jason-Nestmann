// src/routes/index.js
const router = require('express').Router();
const fs = require('fs');

const data_api = require('../game_data_api.js');


router.get('/', function(req, res, next){
    res.render('index');
})

router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

router.get('/file', function(req, res, next) {
  res.json(data_api.get_all());
});


router.post('/file', function(req, res, next) {
    data_api.post(req, res);
    next();
});
            

router.put('/file/:fileId', function(req, res, next) {
    data_api.put(req, res);
    next();
});

router.delete('/file/:fileId', function(req, res, next) {
    data_api.delete(req, res);
    next();
});

router.get('/file/:fileId', function(req, res, next) {
    data_api.get(req, res);
    next();
});

router.use('/file/save', function(req, res, next){
    data_api.save(req, res);
    next();
})

module.exports = router;