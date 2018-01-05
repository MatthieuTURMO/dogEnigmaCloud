var mongoose = require('mongoose');

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

module.exports = mongoose.model('Comment', commentSchema);
