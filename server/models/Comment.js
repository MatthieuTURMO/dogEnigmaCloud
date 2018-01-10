var mongoose = require('mongoose');
const Ebook = require('../models/Ebook');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creation_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  last_modification: {
    type: Date,
    default: Date.now,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  note: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

commentSchema.pre('remove', function (next) {
  var self = this;
  Ebook.find({
    "comments": self
  }).exec(function (err, listEbooks) {
    listEbooks.forEach(ebook => {
      ebook.comments.pull({
        _id: self._id
      });
      ebook.save();
    });
  });
  next();
});

module.exports = mongoose.model('Comment', commentSchema);
