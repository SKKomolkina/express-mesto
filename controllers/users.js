const User = require('../models/userSchema');

const { ERROR_DEFAULT, ERROR_NOT_FOUND, ERROR_BAD_REQUEST } = require('../constants/errors-constants');
const ValidationError = require('../constants/ValidationError');
const NotFoundError = require('../constants/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Возникла ошибка: пользователь с указанным ID не найден.');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    // .then(() => {
    //   if (!name || !about || !avatar) {
    //     throw new ValidationError('Возникла ошибка: введенные данные некорректны');
    //   }
    // })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about },
    { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar },
    { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch(next);
};
