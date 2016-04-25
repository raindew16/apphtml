/**
 * 模块依赖
 */
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//路由控制器
var routes = require('./routes/index');
var users = require('./routes/user');
var question = require('./routes/question');

/**
 * 环境变量
 */
// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 将favicon.ico放到public文件夹下面，并显示在浏览器的标签栏
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//拼接项目路径：path.join(__dirname, 'public');
//创建静态文件(css,js,img)服务器：express.static(root, [options]);
//写了下面这行代码就可以在浏览器中输入：http://localhost:3000/page/index.html 直接访问public下面的文件了
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 路径解析
 */
app.use('/', routes);
app.use('/users', users);
app.use('/question',question);

// 抓住404年和错误处理程序
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * 错误处理程序
 */
// 开发环境错误处理程序
// 加亮泄露给用户
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// 生成环境错误处理程序
// 不加亮泄露给用户
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
