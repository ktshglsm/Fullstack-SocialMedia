const express = require("express");
const { conversationController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.get('/:other', verifyToken, conversationController.getConversation);
router.post('/', conversationController.addConversation);

module.exports = router;