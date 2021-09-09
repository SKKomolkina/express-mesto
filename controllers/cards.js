const Card = require('../models/cardSchema');

module.exports.getCards = (req, res) => {
  Card.find({});
    .then((cards) => {res.send({ data: cards })})
    .catch(())
};