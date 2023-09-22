const express = require("express");
const { postController } = require("../controllers");
const router = express.Router();
router.get('/', postController.getPosts);
router.post('/', postController.addPost);
router.delete('/:postId', postController.deletePost);

module.exports = router;