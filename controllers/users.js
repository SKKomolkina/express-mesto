const User = require('../models/userSchema');

const { ERROR_DEFAULT, ERROR_NOT_FOUND, ERROR_BAD_REQUEST } = require('../constants/errors-constants');
const ValidationError = require('../constants/ValidationError');
const NotFoundError = require('../constants/NotFoundError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` }));
};

module.exports.getUserById = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (ValidationError) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (NotFoundError) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (ValidationError) {
        return res.status(400).send({ message: 'Введенные данные некорректны.' });
      }
      if (NotFoundError) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Введенные данные некорректны.' });
      }
      if (NotFoundError) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};
