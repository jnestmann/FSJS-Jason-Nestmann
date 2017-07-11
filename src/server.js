'use strict';

const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const config = require('./config');
const router = require('./routes');


// Connect to MongoDB and create/use database as configured
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);
require('./models/file.model.js');


const app = express();
const port = process.env.PORT || 3000;

app.use('/static/', express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// sends all rountes to be handled by the router.js file
app.use('/', router);


app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, function(){
    console.log(`${config.app_name} is running on port ${config.port}`);
});
