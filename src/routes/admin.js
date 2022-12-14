const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/register_route");
const signup_admin = require("../controllers/admin/signup_admin");

register_route({
  router,
  route: "/signup_admin",
  post_method: signup_admin,
});

module.exports = router;
