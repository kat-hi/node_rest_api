const mongoose = require('mongoose');
const config = require('config')
mongoose.connect(config.db.connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
console.log(config.db.connectionString)

const PostSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  category: String,
  author: String,
});

module.exports = mongoose.model('Post', PostSchema);
