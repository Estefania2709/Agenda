const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');


//configuracion de servidor
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routers
app.use(require('./routes/index'));

//statics
app.use(express.static(path.join('__dirname, ')))

//404 handeler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
})


module.exports = app;