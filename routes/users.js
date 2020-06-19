/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const routerToUsers = require('express').Router();
const users = require('../data/users');

routerToUsers.get('/users', (req, res) => {
  if (!users) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    return;
  }
  res.send(users);
});

routerToUsers.get('/users/:id', (req, res) => {
  const { id } = req.params;
  let renderUser;

  Object.values(users).forEach((user) => {
    if (user._id === id) {
      renderUser = user;
    }
  });

  if (!renderUser) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  res.send(renderUser);
});

module.exports = routerToUsers;
