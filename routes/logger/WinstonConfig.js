'use strict';
const winston = require('winston');
const fs = require('fs');
var config = require('../../config/' + process.env.ENV + '.js');
const logDir = 'log';

var twoDigit = '2-digit';
var options = {
  day: twoDigit,
  month: twoDigit,
  year: twoDigit,
  hour: twoDigit,
  minute: twoDigit,
  second: twoDigit
};

function formatter(args) {
  var dateTimeComponents = new Date().toLocaleTimeString('en-us', options).split(',');
  var logMessage = dateTimeComponents[0] + dateTimeComponents[1] + ' - ' + args.level + ': ' + args.message;
  return logMessage;
}

var logPreference = { 'debug': 0, 'info': 1, 'warn': 2, 'error': 3 };

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();

var debug = new winston.Logger({
  levels: {
    debug: 0
  },
  transports: [
     new (require('winston-daily-rotate-file'))({
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      filename: `${logDir}/-debug-results.log`, 
      level: 'debug',
      maxsize: 15000000,
      json: false,
      formatter: formatter
    }),
    new (winston.transports.Console)({level: 'debug'})
  ]
});

var info = new winston.Logger({
  levels: {
    info: 1
  },
  transports: [
    new (require('winston-daily-rotate-file'))({
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      filename: `${logDir}/-info-results.log`, 
      level: 'info',
      maxsize: 15000000,
      json: false,
      formatter: formatter
    }),
    new (winston.transports.Console)({level: 'info'})
  ]
});

var warn = new winston.Logger({
  levels: {
    warn: 2
  },
  transports: [
  new (require('winston-daily-rotate-file'))({
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      filename: `${logDir}/-warn-results.log`, 
      level: 'warn',
      maxsize: 15000000,
      json: false,
      formatter: formatter
    }),
    new (winston.transports.Console)({level: 'warn'})
  ]
});

var error = new winston.Logger({
  levels: {
    error: 3
  },
  transports: [
    new (require('winston-daily-rotate-file'))({
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      filename: `${logDir}/-error-results.log`, 
      level: 'error',
      maxsize: 15000000,
      json: false,
      formatter: formatter
    }),
    new (winston.transports.Console)({level: 'error'})
  ]
});

var exports = {
  debug: function(msg) {
    if(logPreference[config.log] === logPreference['debug']) {
      debug.debug(msg);
    }
  },
  info: function(msg) {
    if(logPreference[config.log] <= logPreference['info']) {
      info.info(msg);
    }
  },
  warn: function(msg) {
    if(logPreference[config.log] <= logPreference['warn']) {
      warn.warn(msg);
    }
  },
  error: function(msg) {
    if(logPreference[config.log] <= logPreference['error']) {
      error.error(msg);
    }
  },
  log: function(level, msg) {
    if(logPreference[config.log] >= logPreference[level]) {
      var lvl = exports[level];
      lvl(msg);
    }
  }
};

module.exports = exports;