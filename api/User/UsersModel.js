const mongoose = require('mongoose');
const config = require('config')
const bcrypt = require('bcrypt')

const connectionString = config.get('db.connectionString')

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
console.log(connectionString)

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  own_posts: [],
  starred_posts: []
});

UserSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) { return next() }
  bcrypt.hash(user.password,10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  })
}, (err) => { next(err) });

UserSchema.methods.comparePassword = (try_password, next) => {
  bcrypt.compare(try_password, this.password, (err, isMatch) => {
    if (err) return next(err)
    next (null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema);
