var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var winston = require('winston');
var expressWinston = require('express-winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var helmet = require('helmet');
var validator = require('express-validator');
var util = require('./routes/util/util.js')();
var config = require('./config/' + process.env.ENV + '.js');
var app = express();
const logDir = 'log';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect to Mongo when the app initializes
mongoose.connect(config.db.connection);
var dbName = config.db.connection.split('/');
console.log("********************************\n*  Mongoose connected to "+
dbName[3]+" *\n********************************");
/*
* Application Middleware's should be added here
* Order does matter
*/
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if(config.log === 'debug' || config.log === 'info') {
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true, 
        level: config.log
      }),
      new(require('winston-daily-rotate-file'))({filename: `${logDir}/-request-results.log`,
        timestamp: (new Date()).toLocaleTimeString(),
        datePattern: 'yyyy-MM-dd',
        prepend: true,
        level: config.log,
        maxsize: 15000000,
        colorize: true,      
        json: true})
    ],
    level: config.log,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(config && config.session && config.session.secure) {
  app.use(helmet());  
  app.use(helmet.noCache());
  app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['self']
    }
  }));
}

/*
* Custom validation middleware for API request params validations
* https://www.npmjs.com/package/express-validator
*/
app.use(validator(util.customValidations));

/*
* Initialize Application routes
*/
app.use('/', index);

process.on("unhandledRejection", function(reason, p){
    console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
    throw reason; // optional, in case you want to treat these as errors
}); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.session.secure ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
