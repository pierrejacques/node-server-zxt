import './lib/ipa.declare';

import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import logger from 'morgan';
import cookieParser from 'cookie-parser';

import getExpire from './lib/getExpire';
import setCORS from './lib/setCORS';

import treeApi from './api/tree';
import bananaApi from './api/banana';

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
});

app.use('/api/banana', setCORS);
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

export default app;
