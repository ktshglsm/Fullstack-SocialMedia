const express = require("express");
const { postController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get('/', verifyToken, postController.getPosts);
router.get('/:userId', postController.getPostsById);
router.post('/', verifyToken, postController.addPost);
router.delete('/:postId', verifyToken, postController.deletePost);

module.exports = router;