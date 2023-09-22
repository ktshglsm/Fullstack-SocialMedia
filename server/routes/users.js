const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();
router.get('/', userController.getAllUser);
router.get('/find/:userId', userController.getUser);
router.put('/', userController.updateUser);

module.exports = router;