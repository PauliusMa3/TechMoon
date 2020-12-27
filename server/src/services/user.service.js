const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const util = require('util');
const {transport, baseEmail} = require('./mail.service');
const { Op } = require('sequelize');

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

    await db.user.update({
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

const passwordResetRequest = async({email, db}) => {

  const user = await db.user.findOne({
    where: {
      email: email.toLowerCase()
    }
  })

  const returnMessage = "If an account with this email exists, you will receive an email with password reset instructions"

  if(!user) {
    return {
      message: returnMessage
    }
  }

  const randomBytes = util.promisify(crypto.randomBytes);

  const RandomisedToken = await randomBytes(32)

  const passwordResetToken = RandomisedToken.toString('hex');


  await db.user.update({
    password_reset_token: passwordResetToken,
    password_reset_token_expiry: Date.now() + 3600000
  },{where: {
      id: user.id
  }})

  const emailHtml = `
    You have recently requested to reset your password for your TechMoon account. Click the button below to reset
    \n\n\n
    <a style="
    border-radius: 10px;
    padding: 10px 20px;
    color: white;
    background: #1665d8;
    display: block;
    width: max-content;
    margin: 20px auto;
    text-align: center;
    text-decoration: none;
    font-size: 20px;" href="${process.env.CLIENT_URL}/passwordReset?resetToken=${passwordResetToken}">Reset Password</a>
    \n\n
    <p>If you have not requested password reset, please ignore this email</p>
    `

  const message = {
    from: 'password-reset@techmoon.com',
    to: user.email,
    subject: 'Password Reset Request',
    html: baseEmail(emailHtml)
  }


  await transport.sendMail({
    ...message
  })
  
  return {
      message: returnMessage
    }
}

const resetPassword = async({password, confirmPassword, resetToken, db,req}) => {

  if(password != confirmPassword) {
    throw new Error('Passwords should match!');
  }

  const user = await db.user.findOne({
    where: {
      [Op.and]: [
        {
          password_reset_token: resetToken,
        },
        {
          password_reset_token_expiry: {
            [Op.gte]: Date.now() - 3600000
          },
        },
      ],
  }});

  if(!user) {
    throw new Error("Token is either invalid or expired!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      password: hashedPassword,
      password_reset_token: null,
      password_reset_token_expiry: null
    }, {
      where: {
        id: user.id
      }
    })

    return {
      message: 'Password was successfully changed'
    }
  } catch(e) {
    throw new Error("Failed to update user'\s password");
  }
}

  module.exports = {
      signup,
      changePassword,
      passwordResetRequest,
      resetPassword
  }