const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const routes = require('./server/routes');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('handlebars', hbs({defaultLayout: 'index'}))
app.set('view engine', 'handlebars')

app.use('/', express.static(__dirname + '/assets'))

routes(app)
h
const PORT = process.env.PORT || 3000
app.listen(3000, () => console.log('listening on port: ', PORT) )
