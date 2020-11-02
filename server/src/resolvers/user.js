const {userService} = require('../services');

const UserMutations = {
  signup: async (parent, args, { db, req, res }, info) => userService.signup({...args, req, db})
};

module.exports = {
  UserMutations,
};
