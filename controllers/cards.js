const Card = require('../models/cardSchema');
const { ERROR_BAD_REQUEST, } = require('../constants/errors-constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_BAD_REQUEST).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  Card.findByIdAndDelete(cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'error' }));
};
