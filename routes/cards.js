const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:_cardId', deleteCardById);

router.put('/:cardId/likes', likeCard);

module.exports = router;
