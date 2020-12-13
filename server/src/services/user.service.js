const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

const signup = async ({email: passedEmail, password, name, req, db}) => {
    const email = passedEmail.toLowerCase();
    const userWithEmailAlreadyExists = await db.user.findOne({ where: { email } });

    if (userWithEmailAlreadyExists) {
      throw new Error('This email address is not available');
    }

    const userId = v4();

    let user;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await db.user.create({
        id: userId,
        name: name,
        email,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) { return err; }
      });

      return {
        userId,
        name: name,
        email: email,
      };
    } catch(e) {
      throw new Error("Failed to create user");
    }
}

const changePassword = async({ currentPassword, newPassword, req, db}) => {
  // check user existing password
  try {
    const user = await db.user.findOne({
      where: {
        id: req.user.id
      }
    })

    if(!user) {
      throw new Error('Failed to Find User');
    }

    const result = await bcrypt.compare(currentPassword, user.password);

    if(!result) {
      throw new Error("Your current password is incorrect");
    }
  } catch(e) {
    throw new Error('Failed to verify the user');
  }

  try {
    const newHashedPasword = await bcrypt.hash(newPassword, 10);

    console.log('req.user: ', req.user);

    const updatedUser = await db.user.update({
      password: newHashedPasword
    }, {
      where: {
        id: req.user.id
      }
    })

    return {
      message: "Password was successfully changed!"
    }

  } catch(e) {
    throw new Error("Failed to Update User password");
  }

}

  module.exports = {
      signup,
      changePassword
  }