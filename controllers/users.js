const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

const NotFoundError = require('../constants/NotFoundError');
const ConflictError = require('../constants/ConflictError');
const DefaultError = require('../constants/DefaultError');
const ValidationError = require('../constants/ValidationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Ошибка ввода данных!');
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Указанный пользователь не найден.');
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          throw new DefaultError('Ошибка на сервере.');
        }

        if (!result) {
          return res.status(401).send({ message: 'Неправильные почта или пароль.' });
        }

        return res.send({ user });
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return User.findOne({ email })
    .then((mail) => {
      if (mail) {
        throw new ConflictError('Такой пользователь уже существует!');
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw new DefaultError('Ошибка на сервере.');
        }

        User.create({
          name, about, avatar, email, password: hash,
        })
          .then((user) => {
            res.status(200).send(user);
          });
      });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным ID не найден.');
      }
      res.status(200).send(user);
    })
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
