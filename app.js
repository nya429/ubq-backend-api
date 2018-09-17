/*jslint esversion:6 */
const express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// var routes = require('./routes/index');
const users = require('./routes/userRoutes');
const companys = require('./routes/companyRoutes');
const participants = require('./routes/participantRoutes');
const vendors = require('./routes/vendorRoutes');
const products = require('./routes/productRoutes');
const events = require('./routes/eventRoutes');
const settings = require('./routes/settingRoutes');
const logger = require('./log/logger');
const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// app.use(logger('dev'));
app.use(bodyParser.json());
// use qs to parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));
// output log
app.use(logger);
// app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', routes);
app.use('/user', users);
app.use('/company', companys);
app.use('/participant', participants);
app.use('/vendor', vendors);
app.use('/product', products);
app.use('/event', events);
app.use('/setting', settings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
