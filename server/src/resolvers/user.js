const {v4} = require('uuid');
const bcrypt = require('bcrypt');

const UserMutations = {
    signup: async(parent, args, {db, req,res}, info) => {

        const email = args.email.toLowerCase();
        const userWithEmailAlreadyExists = await db.user.findOne({where: {email}});

        if(userWithEmailAlreadyExists) {
            throw new Error("The User already exists ");
        }

        const userId = v4();
        const password = await bcrypt.hash(args.password, 10);
        const user = await db.user.create({
            id: userId,
            name: args.name,
            email,
            password
        });

      req.login(user, function(err) {
            if (err) { return err }
          });

          return {
              userId,
              name: args.name,
              email: args.email
          }
    }, 
}

module.exports = {
    UserMutations
}