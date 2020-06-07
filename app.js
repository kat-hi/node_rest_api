const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken')

var allRoutes = require('./api/allRoutes');

const app = express();
app.use('/', allRoutes.indexRoute);
app.use('/users', allRoutes.userRoute);
app.use('/posts', allRoutes.postRoute);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/*', function (request, response, next) {
    if (true) {
        next();
    } else {
        response.send('Sorry, you are not logged in!')
    }
})
app.get('/*', function isAuthenticated(request, response, next) {
    if (typeof request.headers.authorization !== 'undefined') {
        let token = request.headers.authorization.split(" ")[1];
        var privateKey = config.get('session.tokenKey');
        jwt.very(token, privateKey, { algorithm: "HS256 "}, (err, user) => {
            if (err) {
                res.status(500).json({error: "Not Authorized"});
                return;
            }
            return next();
        });
    } else {
        response.status(500).json({ error: "Not Authorized"});
        return;
    }
})


module.exports = app;
