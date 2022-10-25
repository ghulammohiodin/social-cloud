const express = require("express");
const router = express.Router();

const signup_admin = require("../controllers/admin/signup_admin");

router.post("/signup_admin", signup_admin);

module.exports = router;
