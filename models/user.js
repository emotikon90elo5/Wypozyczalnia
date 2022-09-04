let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);
module.exports = User;