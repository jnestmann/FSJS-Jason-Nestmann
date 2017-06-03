const game_data = require('../db/games.json');
const fs = require('fs');
const jsonParser = require('body-parser');

//const data_file = './db/games.json';
const FILES = game_data;

function get_all() {
    return FILES;
}

// CRUD functions for game data
// creating data
function post_data(req, res) {
    const newId = '' + (game_data.length + 1);
    const data = req.body;
    data.id = newId;

    FILES.push(data);
    res.status(201).json(data);
}

// read data
function get_data(req, res, next) {
  const {fileId} = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
}

// updating data
function put_data(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.description = req.body.description;
  res.json(file);
}

// delete data
function delete_data(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
}


function post2(form_data) {
    const newId = '' + (game_data.length + 1);
    const data = form_data;
    data.id = newId;

    FILES.push(data);
    const newFILES = JSON.stringify(FILES, null, 4);
    fs.writeFileSync('./db/games.json', newFILES);
}


module.exports.get_all = get_all;
module.exports.post = post_data;
module.exports.post2 = post2;
module.exports.get = get_data;
module.exports.put = put_data;
module.exports.delete = delete_data;