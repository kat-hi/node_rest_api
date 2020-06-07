const mongoose = require('mongoose');
const config = require('config')
mongoose.connect(config.db.connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
console.log(config.db.connectionString)

const UserSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  own_posts: [],
  starred_posts: []
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) { return next() }
  bcrypt.hash(user.password,10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  })
}, function (err) {
  next(err)
})

UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err)
      return next(err)
    next (null, isMatch)
  })
}
module.exports = mongoose.model('User', UserSchema);
