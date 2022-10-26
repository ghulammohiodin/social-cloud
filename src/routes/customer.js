const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/register_route");
const signup_customer_user = require("../controllers/customer/signup_customer");

register_route({
  router,
  route: "/signup_customer",
  post_method: signup_customer_user,
});

module.exports = router;
