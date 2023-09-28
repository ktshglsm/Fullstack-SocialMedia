const express = require("express");
const { userController } = require("../controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get('/', userController.getAllUser);
router.get('/search', userController.searchUsers);
router.get('/find/:userId', userController.getUser);
router.put('/', verifyToken, userController.updateUser);

module.exports = router;