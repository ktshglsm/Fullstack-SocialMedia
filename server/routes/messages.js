const express = require("express");
const { messageController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.get('/:conversationId', verifyToken, messageController.getMessages);
router.post('/', verifyToken, messageController.addMessage);

module.exports = router;