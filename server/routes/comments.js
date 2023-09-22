const express = require("express");
const { commentController } = require("../controllers");
const router = express.Router();
router.get('/', commentController.getComments);
router.post('/', commentController.addComment);

module.exports = router;