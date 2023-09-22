const express = require("express");
const { getAllUser, getUser, updateUser } = require("../controllers/user.js");
const router = express.Router();
router.get('/', getAllUser);

router.get('/find/:userId', getUser);
router.put('/', updateUser);

module.exports = router;