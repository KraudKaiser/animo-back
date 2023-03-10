const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  animes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
  }],
});

module.exports = mongoose.model('Category', categorySchema);
