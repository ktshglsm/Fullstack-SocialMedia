const { Relationship } = require("../models");

const addFollow = async (req, res, next) => {
    const { userId: followerUser, followedUser } = req.body;
    try {
        await Relationship.create({ followerUser, followedUser });
        return res.status(200).json("followed successfully")
    } catch (error) {
        next(error);
    }
}
const deleteFollow = async (req, res, next) => {
    const { userId: followerUser, followedUser } = req.body;
    try {
        await Relationship.destroy({ where: { followerUser, followedUser } });
        return res.status(200).json("unFollowed successfully")
    } catch (error) {
        next(error);
    }
}

const getFollower = async (req, res, next) => {
    const { userId: followedUser } = req.body;
    try {
        const userIdList = await Relationship.findAll({ attributes: ['followerUser'], where: { followedUser } })
        return res.status(200).json(userIdList.map((item) => item.followerUser))
    } catch (error) {
        next(error);
    }
}
const getFollowed = async (req, res, next) => {
    const { userId: followerUser } = req.body;
    try {
        const userIdList = await Relationship.findAll({ attributes: ['followedUser'], where: { followerUser } })
        return res.status(200).json(userIdList.map((item) => item.followedUser))
    } catch (error) {
        next(error);
    }
}

module.exports = { addFollow, deleteFollow, getFollowed, getFollower }