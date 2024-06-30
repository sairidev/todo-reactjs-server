const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const encrypt = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};
const decrypt = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

const token = (payload) => {
  return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  encrypt,
  decrypt,
  token,
  decodeToken,
};
