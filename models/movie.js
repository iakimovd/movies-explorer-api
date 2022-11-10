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
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства image
        return /(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v); // если ссылка невалидна, вернётся false
      },
      message: 'Image link validation failed', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства trailerLink
        return /^(https?:\/\/)(www\.)?[\w-]+(\.[a-z])+[\w~!@#$%&*()-+=:;\\'",.?/]+#?/i.test(v); // если ссылка невалидна, вернётся false
      },
      message: 'Trailer link validation failed', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства thumbnail
        return /(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v); // если ссылка невалидна, вернётся false
      },
      message: 'Thumbnail link validation failed', // когда validator вернёт false, будет использовано это сообщение
    },
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

module.exports = mongoose.model('movie', movieSchema);
