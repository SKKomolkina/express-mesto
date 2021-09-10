const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6137bb46b97e966c55f1d7d9',
  };

  next();
});

// http://localhost:3000/users
app.use('/users', userRouter);

// http://localhost:3000/cards
app.use('/cards', cardRouter);

// http://localhost:3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
