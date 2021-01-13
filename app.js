const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const template = require('art-template');
const dateformat = require('dateformat');

//创建web服务器
let app = express();

//开放静态资源
// app.use('/public/',express.static('./public/'))
//app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/', express.static(path.join(__dirname, "public")))
app.use('/node_modules/', express.static(path.join(__dirname, "node_modules")))

//连接数据库
require('./db/connect')

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置express模板引擎的位置
app.set('views', path.join(__dirname, "views"));
//配置express框架模板的默认后缀
app.set('view engine', 'art');
//使用art-template模板引擎
app.engine('art', require('express-art-template'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//使用express-session处理请求
app.use(session(
  {
    name: 'myblog',
    secret: 'myblog',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

//flash中间件 用来显示通知
app.use(flash())

// set flash
app.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

//配置路由信息
const home = require('./routes/home')
const admin = require('./routes/admin')
app.use(home);
app.use(admin);

//配置template
template.defaults.imports.dateformat = dateformat;

//匹配根目录下的网站
// app.get('/home', require('./routes/home/home'));

//登录拦截

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('common/error', {
//     err: err.message
//   });
// });



module.exports = app;
