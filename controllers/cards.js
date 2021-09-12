const Card = require('../models/cardSchema');
const { ERROR_DEFAULT } = require('../constants/errors-constants');
const ValidationError = require('../constants/ValidationError');
const DefaultError = require('../constants/DefaultError');
// const { STATUS_OK } = require('../constants/success-constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (ValidationError) {
        return res.send({ message: 'Возникла ошибка: введенные данные некорректны.' });
      }
      if (DefaultError) {
        return res.send({ message: `Возникла ошибка: ${DefaultError}` });
      }
      return res.send({ message: `${err}` });
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  // eslint-disable-next-line no-underscore-dangle
  Card.findByIdAndDelete(cardId)
    .then((card) => res.status(200).send(card))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    // eslint-disable-next-line no-underscore-dangle
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: `Произошла ошибка ${error.name}` }));
};

// module.exports.dislikeCard = (req, res) => {
//   const { cardId } = req.params;
//
//   Card.findByIdAndUpdate()
// }
