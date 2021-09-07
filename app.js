const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', router);

app.use((req, res, next) => {
  req.user = {
    _id: '6137bb46b97e966c55f1d7d9',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
