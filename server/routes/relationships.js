const express = require("express");
const { relationshipController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get('/follower', verifyToken, relationshipController.getFollower);
router.get('/followed', verifyToken, relationshipController.getFollowed);
router.get('/friend', verifyToken, relationshipController.getFriends);
router.post('/', verifyToken, relationshipController.addFollow);
router.delete('/', verifyToken, relationshipController.deleteFollow);

module.exports = router;