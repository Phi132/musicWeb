const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const path = require('path')
const handlebars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', handlebars({
  extname: 'hbs',
  helpers: {
    sum: function (a, b) { return a+b; }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})