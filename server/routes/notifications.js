const express = require("express");
const { notificationController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.get('/:conversationId', verifyToken, notificationController.getNotifications);
router.post('/', verifyToken, notificationController.addNotification);
router.delete('/:sender', verifyToken, notificationController.deleteNotification);

module.exports = router;