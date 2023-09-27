const { Like } = require("../models/index.js");

const getLikes = async (req, res, next) => {
    const { postId } = req.query;
    try {
        const userIdList = await Like.findAll({
            attributes: ['userId'],
            where: { postId }
        })
        return res.status(200).json(userIdList.map(item => item.userId));
    } catch (error) {
        next(error);
    }

};

const addLike = async (req, res, next) => {
    try {
        await Like.create(req.body);
        return res.status(200).json('like success');
    } catch (error) {
        next(error)
    }

};

const deleteLike = async (req, res, next) => {
    const { postId, userId } = req.body
    console.log(req.body);
    try {
        await Like.destroy({ where: { userId, postId } });
        return res.status(200).json('dislike success');
    } catch (error) {
        next(error);
    }

};


module.exports = {
    getLikes, addLike, deleteLike
};