/* eslint no-console: ["error", { allow: ["info"] }] */
const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const routeToCards = require('./routes/cards');
const routeToUsers = require('./routes/users');

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

app.use(express.static('./public'));
app.use('/', routeToCards, routeToUsers);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
