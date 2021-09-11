const User = require('../models/userSchema');
const { ERROR_DEFAULT } = require('../constants/errors-constants');
const ValidationError = require('../constants/ValidationError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.getUserById = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Введенные данные некорректны.' });
      } else {
        res.send({ message: `Произошла ошибка ${error.name}` });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Введенные данные некорректны.' });
      } else {
        res.send({ message: `Произошла ошибка ${error.name}` });
      }
    });
};