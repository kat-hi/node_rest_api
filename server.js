const app = require('./app');

const port = process.env.EXPRESS_SERVER_PORT || 3333; // use env with docker or k8s. if no env is available set default port

const server = app.listen(port, function() {
  console.log('Express server runs on http://localhost:'+ port);
});
