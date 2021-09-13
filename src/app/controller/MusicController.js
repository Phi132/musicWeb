const collecMusic = require('../model/collectionMusic')

class MusicController {
    //[GET] /mymusic/libary/song
    libsong(req, res) {
        res.render('libarySong')
    }
    //[GET]/mymusic
    mymusic(req, res) {
        collecMusic.find({}).lean()
            .then(music => res.render('mymusic', {music}))
        
    }

}
module.exports = new MusicController;