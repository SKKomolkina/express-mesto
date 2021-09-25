const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// http://localhost:3000/signin
app.post('/signin', login);

// http://localhost:3000/signup
app.post('/signup', createUser);

app.use(auth);

// http://localhost:3000/users
app.use('/users', userRouter);

// http://localhost:3000/cards
app.use('/cards', cardRouter);

app.use('*', (req, res) => res.status(400).send({ message: 'Страница не найдена.' }));

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

// http://localhost:3000
app.listen(PORT);
