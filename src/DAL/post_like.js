const { PostLike } = require("../models/post_like");

const add_post_like = async (body) => {
  const post_like = await new PostLike(body);
  return await post_like.save();
};

const find_post_like_by_user_id = async (user_id) => {
  return await PostLike.findOne({ user_id: user_id });
};

const unlike_post = async (id) => {
  return await PostLike.findOneAndDelete({ _id: id });
};

const find_post_like_by_id = async (id) => {
  return await PostLike.findOne({ _id: id });
};

const find_post_like_by_id_and_user_id = async (id, user_id) => {
  return await PostLike.findOne({ _id: id, user_id: user_id });
};

const list_all_post_likes_post_id = async (post_id) => {
  return await PostLike.find({ post_id: post_id }).lean();
};

module.exports = {
  add_post_like,
  find_post_like_by_user_id,
  unlike_post,
  find_post_like_by_id,
  find_post_like_by_id_and_user_id,
  list_all_post_likes_post_id,
};
