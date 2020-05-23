const mongoose = require('mongoose');
const config = require('config')

const connectionString = config.get('db.connectionString');
console.log(connectionString)

mongoose.connect(connectionString);
