const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/register_route");
const post_like = require("../controllers/post_like/add_post_like");
const post_likes_by_post_id = require("../controllers/post_like/post_likes_by_post_id");
const unlike_post = require("../controllers/post_like/unlike_post");

register_route({
  router,
  route: "/add_post_like",
  auth_required: true,
  post_method: post_like,
});

register_route({
  router,
  route: "/post_likes_by_post_id/:post_id",
  auth_required: true,
  get_method: post_likes_by_post_id,
});

register_route({
  router,
  route: "/unlike_post/:id",
  auth_required: true,
  get_method: unlike_post,
});

module.exports = router;
