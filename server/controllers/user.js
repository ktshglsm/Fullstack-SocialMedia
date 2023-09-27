const { User } = require("../models");
const getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (!user) next({ message: 'Người dùng không tồn tại', statusCode: 404 })
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }


}
const updateUser = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            next({ message: 'Người dùng không tồn tại', statusCode: 404 })
        }
        await user.update(req.body);
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }

}


module.exports = {
    getAllUser, getUser, updateUser
};