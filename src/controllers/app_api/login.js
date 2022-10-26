const { find_customer_by_user_id } = require("../../DAL/customer");
const { find_admin_by_user_id } = require("../../DAL/admin");
const { find_user_by_email } = require("../../DAL/user");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");
const { validateUserLogin } = require("../../models/user");
const jwt = require("jsonwebtoken");

const login_user = async (req, res) => {
  try {
    var resp = {};
    const { error } = await validateUserLogin(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    let user = await find_user_by_email(req.body.email);
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "Invalid email or password",
      });
    }

    let is_valid_password = await user.comparePassword(req.body.password);
    if (!is_valid_password) {
      return res.status(400).json({
        code: 400,
        message: "Invalid email or password",
      });
    }

    if (req.body.type != user.type) {
      return res.status(400).json({
        code: 400,
        message: "Invalid type",
      });
    } else if (req.body.type == 1) {
      let customer = await find_customer_by_user_id(user._id);
      if (!customer) {
        return res.status(400).json({
          code: 400,
          message: "Invalid email or password",
        });
      }
      resp = customer;
    } else if (req.body.type == 0) {
      let admin = await find_admin_by_user_id(user._id);
      console.log(admin);
      if (!admin) {
        return res.status(400).json({
          code: 400,
          message: "Invalid email or password",
        });
      }

      resp = admin;
    }

    var login_by = "";

    req.body.type == 1 ? (login_by = "customer") : (login_by = "admin");

    let token = jwt.sign(
      {
        _id: user._id,
        login_by: login_by,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      code: 200,
      message: "Login Successfully",
      token: token,
      user: resp,
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = login_user;
