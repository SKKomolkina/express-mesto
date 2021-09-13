const Card = require('../models/cardSchema');

const { ERROR_DEFAULT, ERROR_BAD_REQUEST, ERROR_NOT_FOUND } = require('../constants/errors-constants');
const ValidationError = require('../constants/ValidationError');
const NotFoundError = require('../constants/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (NotFoundError) {
        return res.status(ERROR_NOT_FOUND).send({ message: `Возникла ошибка: пользователь с указанным ${cardId} не найден.` });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err.name}` });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    // eslint-disable-next-line no-underscore-dangle
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (ValidationError) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    // eslint-disable-next-line no-underscore-dangle
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Возникла ошибка: переданные данные некорректны.' });
      }
      return res.status(ERROR_DEFAULT).send({ message: `Возникла ошибка: ${err}` });
    });
};
