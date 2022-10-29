const mongoose = require("mongoose");
const Joi = require("joi");
const postCommentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
    },
  },

  { timestamps: true }
);

const PostComment = mongoose.model("post_comment", postCommentSchema);

function validatePostComment(post) {
  const schema = {
    user_id: Joi.string(),
    post_id: Joi.string().required(),
    comment: Joi.string().required(),
  };
  return Joi.validate(post, schema);
}

module.exports = { PostComment, validatePostComment };
