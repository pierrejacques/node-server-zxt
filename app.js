require('./lib/ipa.declare');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const getExpire = require('./lib/getExpire');
const setCORS = require('./lib/setCORS');

const treeApi = require('./api/tree');
const bananaApi = require('./api/banana');
const monitorApi = require('./api/monitor');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/favicon.ico', () => false);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', async function(req, res, next) {
  const user_id = req.cookies.user_id;
  if (user_id) {
    res.cookie('user_id', user_id, {
      expires: getExpire(),
      httpOnly: true,
    });
  }
  next();
});

app.use('/api/monitor', setCORS);
app.use('/api/monitor', monitorApi);

app.use('/api/banana', bananaApi);

app.use('/api', treeApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status = 404;
  res.send({
    code: 404,
    msg: 'not found',
  });
});

module.exports = app;
