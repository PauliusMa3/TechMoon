const {userService} = require('../services');
const { passwordResetRequest } = require('../services/user.service');
const {requiresLogin} = require('./utils');

const UserMutations = {
  signup: async (parent, args, { db, req, res }, info) => userService.signup({...args, req, db}),
  changePassword: requiresLogin((parent, args, {req, db}, info) => userService.changePassword({...args, req, db})),
  passwordResetRequest: async(parent, args ,{db}, info) => userService.passwordResetRequest({...args,db }),
  resetPassword: async(parent, args, {db, req}, info) => userService.resetPassword({...args, db, req})  
};

module.exports = {
  UserMutations,
};
