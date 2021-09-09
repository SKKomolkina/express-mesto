const User = require('../models/userSchema');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'error' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(() => res.send(name, about, avatar))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
