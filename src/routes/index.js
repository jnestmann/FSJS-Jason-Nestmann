// src/routes/index.js
const router = require('express').Router();
const data_api = require('../game_data_api.js');


router.get('/', function(req, res, next){
    res.render('index');
    next();
});

router.get('/about', function(req, res, next){
    res.render('about');
    next();
})

router.post('/add/file', function(req, res, next){
    console.log("Post request made");
    console.log(req.body);
    data_api.post2(req.body);
    res.render('index');
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
    const games = data_api.get_all();
    console.log(games);
    res.render('games_list', {games: games});
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