const mongoose = require("mongoose");
const Joi = require("joi");
const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [],
    comment_count: {
      type: Number,
      default: 0,
    },

    post_type: {
      type: String,
      enum: ["image", "video"],
    },

    video_url: {
      type: String,
    },

    like_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

function validatePost(post) {
  const schema = {
    user_id: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    post_type: Joi.string().required().valid("image", "video"),
    video_url: Joi.string().when("post_type", {
      is: "video",
      then: Joi.string().required().uri(),
    }),
    images: Joi.array().when("post_type", {
      is: "image",
      then: Joi.array().required(),
    }),
  };
  return Joi.validate(post, schema);
}

module.exports = { Post, validatePost };
