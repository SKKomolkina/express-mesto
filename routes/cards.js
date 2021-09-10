const router = require('express').Router();
const { getCards, createCard, deleteCardById } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:_cardId', deleteCardById);

module.exports = router;
