const Movie = require('../models/movie');

const NotFound = require('../errors/NotFound'); // 404
const BadRequest = require('../errors/BadRequest'); // 400
const Forbidden = require('../errors/Forbidden'); // 403

// возвращаем все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

// создаёт фильм с переданными в теле:
// country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// удаляем сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFound(`Фильм с id '${movieId}' не найден`))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new Forbidden('Нельзя удалить чужой сохраненный фильм'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};
