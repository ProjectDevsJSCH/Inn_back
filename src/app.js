const express = require('express');
const morgan = require('morgan'); //Imprimir las peticiones
const config = require('config');
const debug = require('debug')('app:startup'); //export DEBUG=app:startup
const { logging, authenticating } = require('./middleware/logger');

const artist = require('./routes/artist.route');
const category = require('./routes/category.route');
const user = require('./routes/user.route');


console.log('Application Name: ' + config.get('name'));


/**
 * Inicialización de express
 */
const app = express();
debug(`NODE_ENV: ${process.env.NODE_ENV}`); //export NODE_ENV=production
debug(`app: ${app.get('env')}`);
debug(`password: ${config.get('mail.password')}`);


/**
 * Middlewares
 */
app.use(logging);
app.use(authenticating);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //POST http://localhost:3000/api/courses (key=value&key=value)
app.use(express.static('public')); //Archivos públicos
if (app.get('env') === 'development') {
   app.use(morgan('dev'));
   debug('Morgan is enabled...');
}


/**
 * Rutas
 */
app.use('/api/artists', artist);
app.use('/api/categories', category);
app.use('/api/users', user);


module.exports = app;