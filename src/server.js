'use strict';

const express = require('express');
const pug = require('pug');
const jsonParser = require('body-parser').json;

const app = express();
const port = process.env.PORT || 3000;

app.use('/static/', express.static("./public"));

app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, function(){
    console.log(`The express server is running on port ${port}`);
});


// routes
app.get('/', function(req, res) {
    res.render('index');
});