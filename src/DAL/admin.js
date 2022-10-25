const { Admin } = require("../models/admin");

const signup_admin = async (admin_data) => {
  const admin = new Admin(admin_data);
  return await admin.save();
};

module.exports = { signup_admin };
