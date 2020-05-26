const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  author: String,
  starred_posts: []
});

mongoose.model('Post', PostSchema);
module.exports = mongoose.model('Post');
