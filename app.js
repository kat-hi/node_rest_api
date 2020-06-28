const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const allRoutes = require('./api/allRoutes');
const security = require('./middleware/security')

app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json({ type: 'application/json'});

app.use('/', allRoutes.indexRoute);
app.use('/users', jsonParser, security.verifyToken, security.isAuthenticated, allRoutes.userRoute);
app.use('/posts', jsonParser, security.verifyToken, security.isAuthenticated, allRoutes.postRoute);
app.use('/login', jsonParser, allRoutes.loginRoute);
app.use('/mail', jsonParser, allRoutes.mailRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

module.exports = app;
