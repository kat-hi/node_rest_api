const app = require('./app');
const config = require('config')

const port = config.get('server.port');

const server = app.listen(port, function() {
  console.log('Express server runs on http://localhost:'+ port);
});
