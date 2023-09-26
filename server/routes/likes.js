const express = require("express");
const { likeController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get('/', likeController.getLikes);
router.post('/', verifyToken, likeController.addLike);
router.delete('/', verifyToken, likeController.deleteLike);


module.exports = router;