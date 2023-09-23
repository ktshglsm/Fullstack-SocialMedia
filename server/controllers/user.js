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

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            next({ message: 'Người dùng không tồn tại', statusCode: 404 })

            // res.status(404).json({ message: 'Người dùng không tồn tại' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error);
        res.status(500).json({ error: 'Lỗi khi lấy người dùng' });
    }


}
const updateUser = async (req, res, next) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            next({ message: 'Người dùng không tồn tại', statusCode: 404 })
            // res.status(404).json({ message: 'Người dùng không tồn tại' });
        } else {
            await user.update(req.body);
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }

}


module.exports = {
    getAllUser, getUser, updateUser
};