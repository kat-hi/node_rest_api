const mongoose = require('mongoose');
const config = require('config')
const bcrypt = require('bcrypt')

const connectionString = config.get('db.connectionString')

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
console.log(connectionString)

const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  own_posts: [],
  starred_posts: []
});

// UserSchema.pre('save', function (next) {
//   const user = this;
//   if (!user.isModified('password')) { return next() }
//   bcrypt.hash(user.password,10).then((hashedPassword) => {
//     user.password = hashedPassword;
//     next();
//   })
// }, function (err) {
//   next(err)
// });
//
// UserSchema.methods.comparePassword = function(candidatePassword, next) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err)
//       return next(err)
//     next (null, isMatch)
//   })
// }

module.exports = mongoose.model('User', UserSchema);
