const express = require("express");
const { addPost, deletePost, getPosts } = require("../controllers/post.js");
const router = express.Router();
router.get('/', getPosts);
router.post('/', addPost);
router.delete('/:postId', deletePost);

module.exports = router;