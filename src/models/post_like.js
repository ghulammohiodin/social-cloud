const mongoose = require("mongoose");
const Joi = require("joi");
const postLikeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },

  { timestamps: true }
);

const PostLike = mongoose.model("post_like", postLikeSchema);

function validatePostLike(post) {
  const schema = {
    user_id: Joi.string(),
    post_id: Joi.string().required(),
  };
  return Joi.validate(post, schema);
}

module.exports = { PostLike, validatePostLike };
