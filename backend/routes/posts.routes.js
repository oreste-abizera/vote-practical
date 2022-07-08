const express = require("express");
const { registerDefinition } = require("swaggiffy");
const {
  addPost,
  getAllPosts,
  getOnePost,
  likePost,
  updatePost,
  deletePost,
  dislikePost,
} = require("../controllers/posts.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/add", protect, addPost);
router.get("/", getAllPosts);
router.post("/:postId/like", protect, likePost);
router.post("/:postId/dislike", protect, dislikePost);
router.get("/:postId", getOnePost);
router.put("/:postId/update", updatePost);
router.delete("/:postId/delete", deletePost);

registerDefinition(router, {
  tags: "Posts",
  mappedSchema: "Post",
  basePath: "/api/v1/posts",
});

module.exports = router;
