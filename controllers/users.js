require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/NotFound'); // 404
const BadRequest = require('../errors/BadRequest'); // 400
const Conflict = require('../errors/Conflict'); // 409

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name: req.body.name,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неверный запрос'));
      } if (err.code === 11000) {
        next(new Conflict('Пользователь с этим email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' }, // токен будет просрочен через час после создания
      );
      // аутентификация успешна
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.getUserInfoMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        next(new NotFound('Пользователь не найден'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } if (err.code === 11000) {
        next(new Conflict('Пользователь с этим email уже существует'));
      } else {
        next(err);
      }
    });
};
