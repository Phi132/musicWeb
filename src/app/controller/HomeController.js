const musicCollection = require('../model/collectionMusic')

class HomeController{
    // home(req, res, next) {
    //     res.render('body')
    // }
    //[GET] /
    home(req, res, next) {
        musicCollection.find({}).lean()
            .then(music => res.render('body'))
            .catch(next)
    }
}
module.exports = new HomeController;