const jwt = require('jsonwebtoken');

const env = require('../config/env.json');
const { findUser } = require('../controllers/auth/functions');

module.exports = async (req, res, next) => {
  const authorization = req.get('Authorization');

  if (!authorization) {
    const err = new Error('Authorization: no authToken');
    err.statusCode = 401;
    next(err);
  }

  let extractedToken;
  try {
    extractedToken = authorization.split(' ')[1];
    jwt.verify(extractedToken, env.jwtSecretKey);
  } catch (err) {
    err.message = 'Authorization: invalid authToken';
    err.statusCode = 401;
    next(err);
  }

  try {
    const { id, authToken } = await findUser({ authToken: extractedToken });
    if (Number(req.params.userId) !== id) throw new Error();
    req.authToken = authToken;
    next();
  } catch (err) {
    console.log(err);
    err.message = 'Authorization: authToken and user not matched';
    err.statusCode = 401;
    next(err);
  }
};
