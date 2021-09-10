const User = require('../models/userSchema');
const { ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../constants/errors-constants');
const { STATUS_OK } = require('../constants/success-constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.getUserById = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь с указанным id не найден.',
        });
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(() => res.send(name, about, avatar))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
