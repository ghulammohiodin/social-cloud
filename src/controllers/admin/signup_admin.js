const { signup_admin } = require("../../DAL/admin");
const { create_user, find_user_by_email } = require("../../DAL/user");
const { validateAdmin } = require("../../models/admin");

const jwt = require("jsonwebtoken");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");

const signup_admin_user = async (req, res) => {
  try {
    let { error } = await validateAdmin(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    let user_obj = {
      email: req.body.email,
      password: req.body.password,
      type: 0,
    };

    let existing_user = await find_user_by_email(user_obj.email);
    if (existing_user) {
      return res.status(400).json({
        code: 400,
        message: "User already exists",
      });
    }

    let user = await create_user(user_obj);

    let admin_obj = {
      user_id: user._id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      contact_number: req.body.contact_number,
      address: req.body.address,
    };

    let admin = await signup_admin(admin_obj);

    let token = jwt.sign(
      {
        _id: user._id,
        login_by: "admin",
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      code: 200,
      message: "Admin Created Successfully",
      admin: admin,
      token: token,
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = signup_admin_user;
