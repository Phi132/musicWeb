

class HomeController{
    home(req, res, next) {
        res.render('body')
    }
}
module.exports = new HomeController;