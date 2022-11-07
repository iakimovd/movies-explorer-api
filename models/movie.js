const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

movieSchema.path('image').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlRegex.test(val);
}, 'Invalid URL.');

movieSchema.path('trailerLink').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlRegex.test(val);
}, 'Invalid URL.');

movieSchema.path('thumbnail').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('movie', movieSchema);
