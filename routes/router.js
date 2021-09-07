const router = require('express').Router();
const { createUser, getUsers } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', (req, res) => {
  if (!users[req.params._id]) {
    res.send({ error: 'Такого пользователя нет' });
    return;
  }
  res.send(users[req.params._id]);
});

router.post('/users', createUser);

module.exports = router;
