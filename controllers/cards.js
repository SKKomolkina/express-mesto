const Card = require('../models/cardSchema');

const { ERROR_DEFAULT, ERROR_BAD_REQUEST, ERROR_NOT_FOUND } = require('../constants/errors-constants');
const NotFoundError = require('../constants/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: карта с указанным ID не найдена.'});
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: карта с указанным ID не найдена.'});
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Возникла ошибка: карта с указанным ID не найдена.');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Возникла ошибка: карта с указанным ID не найдена.'});
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Возникла ошибка: карта с указанным ID не найдена.');
      }
    })
    .catch(next);
};
