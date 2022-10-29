const {
  add_post_like,
  find_post_like_by_user_id,
} = require("../../DAL/post_like");
const { validatePostLike } = require("../../models/post_like");
const { find_post_by_id } = require("../../DAL/post");
const { find_user_by_id } = require("../../DAL/user");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");

const post_like = async (req, res) => {
  try {
    const { error } = validatePostLike(req.body);
    if (error)
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });

    let post = await find_post_by_id(req.body.post_id);
    if (!post)
      return res.status(400).json({ code: 400, message: "Post not found" });

    let user = await find_user_by_id(req.user._id);
    if (!user)
      return res.status(400).json({ code: 400, message: "User not found" });

    let post_like = await find_post_like_by_user_id(req.user._id);
    if (post_like) {
      return res.status(400).json({ code: 400, message: "Already liked" });
    }

    let post_like_obj = {
      post_id: post._id,
      user_id: user._id,
    };

    post_like = await add_post_like(post_like_obj);

    post.like_count = post.like_count + 1;
    await post.save();

    return res.status(200).json({
      code: 200,
      message: "Post liked successfully",
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = post_like;
