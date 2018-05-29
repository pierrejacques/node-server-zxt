const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const getExpire = require('./lib/getExpire');

const treeApi = require('./api/tree');
const bananaApi = require('./api/banana');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/favicon.ico', () => false);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', async function(req, res, next) {
  const user_id = req.cookies.user_id;
  if (user_id) {
    res.cookie('user_id', user_id, {
      expires: getExpire(),
      httpOnly: true,
    });
  }
  next();
})

app.use('/api', treeApi);
app.use('/api/banana', bananaApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status = err.status || 500;
  res.render('error');
});

module.exports = app;
