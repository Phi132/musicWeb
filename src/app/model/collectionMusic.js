const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const music = new Schema ({
    name: {type: String },
    singer: String,
    path: String,
    image: String,
    timeSong: String,
})
module.exports = mongoose.model('collectionMusic', music);

