

class MusicController {
    //[GET] /mymusic/libary/song
    libsong(req, res) {
        res.render('libarySong')
    }
    //[GET]/mymusic
    mymusic(req, res) {
        res.render('mymusic')
    }

}
module.exports = new MusicController;