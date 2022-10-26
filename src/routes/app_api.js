const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/register_route");

const login_user = require("../controllers/app_api/login");

register_route({
  router,
  route: "/login_user",
  post_method: login_user,
});

module.exports = router;
