const {
  add_post_like,
  find_post_like_by_user_id,
  list_all_post_likes_post_id,
} = require("../../DAL/post_like");
const { find_user_by_id } = require("../../DAL/user");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");
const { find_customer_by_user_id } = require("../../DAL/customer");

const post_likes_by_post_id = async (req, res) => {
  try {
    let post_likes = await list_all_post_likes_post_id(req.params.post_id);
    if (!post_likes) {
      return res
        .status(400)
        .json({ code: 400, message: "Post likes not found" });
    }

    return res.status(200).json({
      code: 200,
      message: "Post likes retrieved successfully",
      data: post_likes,
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = post_likes_by_post_id;
