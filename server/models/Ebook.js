var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var ebookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  publication_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  year: Number,
  licence: {
    type: String,
    required: true
  },
  target_audience: {
    type: String,
    require: true
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
  }]
});

module.exports = mongoose.model('Ebook', ebookSchema);
