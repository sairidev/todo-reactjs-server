const { User } = require('../db/Schemas');
const userTools = require('../utils/auth');

const searchUser = async (user) => {
  try {
    const userFound = await User.findOne({ username: user.username });

    if (userFound) {
      const result = await userTools.decrypt(user.password, userFound.password);

      if (result) {
        return {
          token: userTools.token({
            id: userFound.id,
            username: userFound.username,
          }),
        };
      }
    } else {
      throw new Error('Username or Password is invalid');
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const userFound = await User.findOne({ user: user.username });

    if (!userFound) {
      const newPassword = await userTools.encrypt(user.password);
      const newUser = new User({
        username: user.username,
        password: newPassword,
      });
      await newUser.save();

      return {
        token: userTools.token({
          id: newUser.id,
          username: newUser.username,
        }),
      };
    } else {
      throw new Error('The user already exists, please try another one.');
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = { searchUser, createUser };
