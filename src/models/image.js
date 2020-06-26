const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  reddit_url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const image = mongoose.model('Image', imageSchema);

module.exports = image;
