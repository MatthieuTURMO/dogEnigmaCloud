var mongoose = require('mongoose');
const User = require('../models/User');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var librarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  visibility: Number,
  ebook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ebook'
  }
});

//on supprime l'instance de la librairie dans tous les users qui la possède
librarySchema.pre('remove', function (next) {
  var self = this;
  User.find({
    "libraries": self
  }).exec(function (err, listUsers) {
    listUsers.forEach(user => {
      user.libraries.pull({
        _id: self._id
      });
      user.save();
    });
  });
  next();
});

module.exports = mongoose.model('Library', librarySchema);
