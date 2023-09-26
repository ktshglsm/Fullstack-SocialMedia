const express = require("express");
const { commentController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.get('/', commentController.getComments);
router.post('/', verifyToken, commentController.addComment);

module.exports = router;