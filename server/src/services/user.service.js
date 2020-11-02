const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

const signup = async ({email: passedEmail, password, name, req, db}) => {
    const email = passedEmail.toLowerCase();
    const userWithEmailAlreadyExists = await db.user.findOne({ where: { email } });

    if (userWithEmailAlreadyExists) {
      throw new Error('This email address is not available');
    }

    const userId = v4();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.user.create({
        id: userId,
        name: name,
        email,
        password: hashedPassword,
      });
    } catch(e) {
      throw new Error("Failed to create user");
    }

    req.login(user, (err) => {
      if (err) { return err; }
    });

    return {
      userId,
      name: name,
      email: email,
    };
  }

  module.exports = {
      signup
  }