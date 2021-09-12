const router = require('./home');
const routerHome = require('./home')
const routerMusic = require('./mymusic')
function route(app) {


    app.use('/mymusic', routerMusic)
    app.use('/', routerHome)
}
module.exports = route;