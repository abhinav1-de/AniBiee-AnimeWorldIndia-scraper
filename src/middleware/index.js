module.exports = {
  ...require('./error.middleware'),
  ...require('./not-found.middleware'),
  ...require('./validation.middleware'),
};
