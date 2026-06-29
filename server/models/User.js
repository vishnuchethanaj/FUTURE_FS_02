const { Query, findOne, findById, create } = require('../lib/store');

function normalizeUser(data = {}) {
  return {
    name: String(data.name || '').trim(),
    email: String(data.email || '').toLowerCase().trim(),
    password: String(data.password || ''),
    googleId: String(data.googleId || '').trim(),
  };
}

module.exports = {
  findOne(query) {
    return new Query(() => findOne('users', query));
  },

  findById(id) {
    return new Query(() => findById('users', id));
  },

  create(data) {
    return create('users', data, normalizeUser);
  },
};
