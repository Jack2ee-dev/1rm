const { sequelize } = require('../models/index');

module.exports = async () => {
  try {
    sequelize.sync();
  } catch (err) {
    throw err;
  }
};
