var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  user_id: ObjectId,
  pseudo: {
    type: String,
    match: /^[a-zA-Z0-9-_]+$/,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  privilege: Number,
  avatar: String,
  bio: String,
  website: String,
  birth_date: Date,
  city: String,
  published_ebooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ebook'
  }],
  read_ebooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ebook'
  }],
  wish_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ebook'
  }],
  libraries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library'
  }],
});

// //génération d'un token aléatoire pour chaque nouvel utilisateur
// userSchema.method('randomToken', function(){
//     return Math.round((new Date().valueOf() * Math.random())) + '';
// });

// fonction de hashage du mot de passe avant persistence dans la base de données
userSchema.pre('save', function (next) {
  var pw = passwordHash.generate(this.password);
  this.password = pw;
  next();
});

module.exports = mongoose.model('User', userSchema);
