const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    let token = req.header("x-sh-auth");
    if (!token) {
      return res.status(401).json({
        code: 401,
        message: "Access Denied No Token Provided",
      });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Invalid Token ",
    });
  }
};

module.exports = { authenticate };
