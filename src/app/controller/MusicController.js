const collecMusic = require('../model/collectionMusic')

class MusicController {
    //[GET] /mymusic/libary/song
    libsong(req, res) {
        res.render('libarySong')
    }
    //[GET]/mymusic
    mymusic(req, res, next) {
        collecMusic.find({}).lean()
            .then(music => res.render('mymusic',{music}))
            .catch(next)
        
    }

}
module.exports = new MusicController;