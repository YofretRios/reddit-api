const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  reddit_id: {
    type: String,
    required: true
  },
  visited: {
    type: Boolean,
    default: false
  },
  dismissed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const post = mongoose.model('Post', postSchema);

module.exports = post;
