// Load mongoose package
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    min_players: String,
    max_players: String,
    min_age: String,
    cooperative: Boolean,
    created_at: { type: Date, default: Date.now },
});

const File = mongoose.model('File', FileSchema);
module.exports = File;

File.count({}, function(err, count) {
    if (err) {
        throw err;
    } else {
        if (count > 0) return;
        
        const files = require('./file.seed.json');
        File.create(files, function(err, newFiles) {
            if (err) {
                throw err;
            }
            console.log("DB seeded");
        });
    }
});