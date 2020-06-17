const routerToCards = require('express').Router();
let cards = require('../data/cards')

routerToCards.get('/cards', (req, res) => {

  if (!cards) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    return;
  }
  res.send(cards);

});



module.exports = routerToCards;