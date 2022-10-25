const User = require("../models/user");

const create_user = async (user_data) => {
  const user = new User(user_data);
  return await user.save();
};

const find_user_by_email = async (email) => {
  return await User.findOne({ email: email });
};

module.exports = { create_user, find_user_by_email };
