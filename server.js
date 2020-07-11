const app = require('./app');
const config = require('config')
const https = require('https');
const fs = require('fs');

const server = app.listen(config['server'].port, '0.0.0.0', function() {
 console.log('Express server runs on http://localhost:'+ config['server'].port)
})
