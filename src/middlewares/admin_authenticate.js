const { RENDER_BAD_REQUEST } = require("../utils/error_codes");

const admin_authenticate = async (req, res, next) => {
  try {
    let user = req.user;
    if (user.login_by != "admin") {
      return res.status(400).json({
        code: 400,
        message: "Access Denied... Not an Admin",
      });
    }
    next();
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = { admin_authenticate };
