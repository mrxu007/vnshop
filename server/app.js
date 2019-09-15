var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 访问拦截，所有的接口走这个逻辑
app.use(function (req, res, next) {
  if(req.cookies.userId){
    next();
  }else{
    if(req.originalUrl == '/users/login' || req.originalUrl.indexOf('/goods/list')>-1){
      next();
    }else{
      res.json({
          status: 1,
          msg: '当前用户未登录',
          result: ''
      })
    }
  }
})
app.use('/', indexRouter);
app.use('/users',users);
app.use('/goods',goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
