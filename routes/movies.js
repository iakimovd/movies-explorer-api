const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    trailerLink: Joi.string().required().regex(/^(https?:\/\/)(www\.)?[\w-]+(\.[a-z])+[\w~!@#$%&*()-+=:;\\'",.?/]+#?/i),
    thumbnail: Joi.string().required().regex(/(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
