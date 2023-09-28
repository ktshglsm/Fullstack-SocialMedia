const express = require("express");
const { storyController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get('/', verifyToken, storyController.getStories);
router.post('/', verifyToken, storyController.addStory);
router.delete('/', verifyToken, storyController.deleteStory);

module.exports = router;