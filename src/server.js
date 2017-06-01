'use strict';

const express = require('express');
const pug = require('pug');
const jsonParser = require('body-parser');

const config = require('./config');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/static/', express.static("./public"));
app.use(jsonParser.json());

// sends all rountes to be handled by the router.js file
app.use('/', router);


app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, function(){
    console.log(`${config.app_name} is running on port ${config.port}`);
});
