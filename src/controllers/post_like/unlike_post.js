const {
  unlike_post,
  unlike_post,
  find_post_like_by_id_and_user_id,
} = require("../../DAL/post_like");
const { find_post_by_id } = require("../../DAL/post");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");

const unlike_post = async (req, res) => {
  try {
    let post_like = await find_post_like_by_id_and_user_id(
      req.params.id,
      req.user._id
    );
    if (!post_like) {
      return res
        .status(400)
        .json({ code: 400, message: "Post like not found" });
    }

    let post = await find_post_by_id(post_like.post_id);
    if (!post)
      return res.status(400).json({ code: 400, message: "Post not found" });

    post_like = await unlike_post(post_like._id);

    post.like_count = post.like_count - 1;
    await post.save();

    return res.status(200).json({
      code: 200,
      message: "Post Unliked successfully",
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = unlike_post;
