var mongoose = require('mongoose');

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

module.exports = mongoose.model('Library', librarySchema);
