const app = require('./app');
const config = require('config')
const https = require('https');
const fs = require('fs');


if ( config['env'] === 'production' ) {
    https.createServer({
        key: fs.readFileSync('./keytmp.pem'),
        cert: fs.readFileSync('./cert.pem'),
    }, app)
        .listen(config['server'].port, function() {
            console.log(`Express server runs on ${config['server'].protocol}://localhost:${config['server'].port}`)
        })
} else {
    const server = app.listen(config['server'].port, function() {
        console.log('Express server runs on http://localhost:'+ config['server'].port)})
}
