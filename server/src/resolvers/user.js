const {userService} = require('../services');
const {requiresLogin} = require('./utils');

const UserMutations = {
  signup: async (parent, args, { db, req, res }, info) => userService.signup({...args, req, db}),
  changePassword: requiresLogin((parent, args, {req, db}, info) => userService.changePassword({...args, req, db}))
};

module.exports = {
  UserMutations,
};
