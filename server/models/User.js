var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var Ebook = require('../models/Ebook');
var Comment = require('../models/Comment');

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
}, {
  usePushEach: true
});

// //génération d'un token aléatoire pour chaque nouvel utilisateur
// userSchema.method('randomToken', function(){
//     return Math.round((new Date().valueOf() * Math.random())) + '';
// });

// fonction de hashage du mot de passe avant persistence dans la base de données
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  var pw = passwordHash.generate(this.password);
  this.password = pw;
  next();
});

userSchema.pre('remove', function (next) {
  var self = this;
  console.log('SELF', self);
  Ebook.find({
    $or: [{
      "added_by": self
    }, {
      "validated_by": self
    }, {
      "author": self
    }]
  }).exec(function (err, listEbooks) {
    if (err) {
      throw err;
    }
    listEbooks.forEach(ebook => {
      if (ebook.author.equals(self._id)) {
        ebook.author = undefined;
      }
      if (ebook.added_by.equals(self._id)) {
        ebook.added_by = undefined;
      }
      if (ebook.validated_by.equals(self._id)) {
        ebook.validated_by = undefined;
      }
      ebook.save();
    });
  });

  Comment.find({
    "author": self
  }).exec(function (err, listComments) {
    listComments.forEach(comment => {
      comment.author = undefined;
      comment.save();
    });
  });
  next();
});

module.exports = mongoose.model('User', userSchema);
