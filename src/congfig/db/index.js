const mongoose = require('mongoose');
const collectionMusic = require('../../app/model/collectionMusic');

async function connect () {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri, {
            UseNewUrlParser: true,
            UseUnifiedTopology: true
        });
        console.log("connect successfully");

    }   catch(err) {
        console.log('failure');
    }
}
module.exports = {connect}
