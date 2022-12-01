const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUserInfoMe, updateUser,
} = require('../controllers/users');

router.get('/me', getUserInfoMe); // возвращает информацию о текущем пользователе

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser); // обновляет профиль

module.exports = router;
