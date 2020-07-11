const mongoose = require('mongoose');
const config = require('config')
const connectionString = config.get('db.connectionString')

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
console.log(connectionString)

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: String,
});

module.exports = mongoose.model('Post', PostSchema);
