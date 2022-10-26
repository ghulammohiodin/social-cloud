const { Admin } = require("../models/admin");

const signup_admin = async (admin_data) => {
  const admin = new Admin(admin_data);
  return await admin.save();
};

const find_admin_by_user_id = async (user_id) => {
  return await Admin.findOne({ user_id: user_id });
};

module.exports = { signup_admin, find_admin_by_user_id };
