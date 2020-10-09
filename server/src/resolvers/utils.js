const { AuthenticationError } = require('apollo-server-express');

const requiresLogin = (resolver) => (parent, args, context, info) => {
  if (context.req.user) {
    return resolver(parent, args, context, info);
  }
  console.log('will go there');
  throw new AuthenticationError('Not Authorized!');
};

module.exports = {
  requiresLogin,
};
