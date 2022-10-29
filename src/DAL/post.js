const { Post } = require("../models/post");

const add_post = async (body) => {
  const post = await new Post(body);
  return await post.save();
};

const find_post_by_id = async (id) => {
  return await Post.findOne({ _id: id });
};

const find_post_by_id_and_user_id = async (id, user_id) => {
  return await Post.findOne({ _id: id, user_id: user_id });
};

module.exports = {
  add_post,
  find_post_by_id,
  find_post_by_id_and_user_id,
};
