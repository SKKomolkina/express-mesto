const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Введена некорректная ссылка.');
};

const {
  getUsers, getUserById, updateUser, updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

// http://localhost:3000/users
router.get('/', getUsers);

// http://localhost:3000/users/:userId
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
}), getUserById);

// http://localhost:3000/users/me
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

// http://localhost:3000/users/me/avatar
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatar);

module.exports = router;
