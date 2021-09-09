const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    driver: mongoose.ObjectId,
    required: true,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
