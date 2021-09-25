const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../constants/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходимо авторизоваться!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'meow');
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться!');
  }

  req.user = payload;
  next();
};
