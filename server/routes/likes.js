const express = require("express");
const { addLike, deleteLike, getLikes } = require("../controllers/like.js");
const router = express.Router();
router.get('/', getLikes);
router.post('/', addLike);
router.delete('/', deleteLike);


module.exports = router;