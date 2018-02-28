/*jslint esversion:6 */
const fs = require('fs');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream('./log/access.log', {flags: 'a',  encoding:'utf8'});
const logger = morgan('combined', {stream: accessLogStream});

module.exports = logger;
