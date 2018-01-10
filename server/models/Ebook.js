var mongoose = require('mongoose');
var moment = require('moment');
const User = require('../models/User');
const Library = require('../models/Library');
moment.locale('fr');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var ebookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  publication_date: {
    type: Date,
    default: moment(),
    required: true
  },
  year: Number,
  licence: {
    type: String,
    required: true
  },
  target_audience: {
    type: String,
    required: true
  },
  author_firstName: String,
  author_lastName: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  thumbnail: String,
  tags: [{
    type: String
  }],
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  number_of_page: Number,
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  validated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  average_note: Number,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  file_pdf: {
    type: String
  },
  file_epub: {
    type: String
  }
}, {
  usePushEach: true
});


ebookSchema.pre('remove', function (next) {
  var self = this;
  User.find({
    $or: [{
        "published_ebooks": self
      },
      {
        "wish_list": self
      },
      {
        "read_ebooks": self
      }
    ]
  }).exec(function (err, listUsers) {
    listUsers.forEach(user => {
      user.published_ebooks.pull({
        _id: self._id
      });
      user.wish_list.pull({
        _id: self._id
      });
      user.read_ebooks.pull({
        _id: self._id
      });
      user.save();
    });
  });

  Library.find({
    "ebook": self
  }).exec(function (err, listLibraries) {
    listLibraries.forEach(lib => {
      lib.ebook.pull({
        _id: self._id
      });
      lib.save();
    });
  });
  next();
});

module.exports = mongoose.model('Ebook', ebookSchema);
