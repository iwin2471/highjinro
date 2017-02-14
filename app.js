var express = require('express');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var path = require('path');
var bodyParser = require('body-parser');
var vhost = require('vhost');
var randomstring = require('randomstring');
var app = express();
var debug = require('debug')('dicon:server');
var rndString = require("randomstring");
var fs = require('fs');
var router = express.Router();
var async = require('async');
var multer = require('multer');
var Q = require('q');

//module setting
var db = require('./mongo');
var passport = require('./passport')(db.Users);
var func = require('./func');

var port = process.env.PORT || 8082;

//set engin
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


//router setting
var auth = require('./routes/auth')(router, db.Users, rndString, func, passport, Q, multer);
var user  = require('./routes/user')(router, db.Users,passport, func);
var schools  = require('./routes/schools')(router, db.Users, func, db.Schools, db.SchoolTag);
var img = require('./routes/img')(router);

//router setting
app.use('/auth', auth);
app.use('/user', user);
app.use('/schools', schools);
app.use('/img', schools);


//create server
app.listen(port);
app.on('error', onError);
app.on('listening', onListening);
//error handle
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    console.log(addr);
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;
