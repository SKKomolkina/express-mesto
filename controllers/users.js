const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const NotFoundError = require('../constants/NotFoundError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Возникла ошибка: пользователь с указанным email не найден.');
      }
      bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new NotFoundError('Неправильные почта или пароль!');
      }
      res.send({ message: 'Все верно!' });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  // const {
  //   name, about, avatar, email, password,
  // } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(200).send(user))
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
        throw new NotFoundError('Возникла ошибка: пользователь с указанным ID не найден.');
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
