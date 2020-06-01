const mongoose = require('mongoose');
const config = require('config')
mongoose.connect(config.db.connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
console.log(config.db.connectionString)

const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  own_posts: [],
  starred_posts: []
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
