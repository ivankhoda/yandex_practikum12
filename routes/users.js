const routerToUsers = require('express').Router();
let users = require('../data/users');

routerToUsers.get('/users', (req, res) => {
  console.log(req.path)
  if (!users) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    return;
  }
res.send(users)

});

routerToUsers.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if (id !== '8340d0ec33270a25f2413b69') {
    res.status(404).send({message: "Нет пользователя с таким id"});
    return;
  }
  res.send(users[4]);
});

module.exports = routerToUsers;