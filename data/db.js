const mongoose = require('mongoose');
const config = require('config')
const app = require('app')

const connectionString = config.get('db.connectionString');
console.log('CONNECTION STRING:', connectionString)
mongoose.connect(connectionString);
console.log('db connection established')
app.log('db connection established')
