const moment = require("moment/moment.js");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Người dùng không tồn tại' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error);
        res.status(500).json({ error: 'Lỗi khi lấy người dùng' });
    }


}
const updateUser = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const userId = userInfo.id;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Người dùng không tồn tại' });
        } else {
            await user.update(req.body);
            res.status(200).json(user);
        }
    });
}






module.exports = {
    getAllUser, getUser, updateUser
};