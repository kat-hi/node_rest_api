const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const app = express();

const allRoutes = require('./api/allRoutes');

app.use('/', allRoutes.indexRoute);
app.use('/users', allRoutes.userRoute);
app.use('/posts', allRoutes.postRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var security = require('./middleware/security')
// var err = require('./middleware/error')
// app.use(err.errorHandler)
// app.use(err.serverErrorHandler)
// app.get('/*', security.isLoggedIn)
// app.get('/*', security.isAuthenticated)

module.exports = app;
