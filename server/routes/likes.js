const express = require("express");
const { likeController } = require("../controllers");
const router = express.Router();
router.get('/', likeController.getLikes);
router.post('/', likeController.addLike);
router.delete('/', likeController.deleteLike);


module.exports = router;