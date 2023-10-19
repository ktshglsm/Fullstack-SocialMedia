const { Op } = require("sequelize");
const { Relationship, User, Notification } = require("../models");

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
const getFriends = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const relationships = await Relationship.findAll({
            where: {
                [Op.or]: [{ followerUser: userId }, { followedUser: userId }],
            },
        });
        const friendIds = relationships
            .filter(
                (relationship) =>
                    (relationship.followerUser == userId &&
                        relationships.some(
                            (r) => r.followedUser == userId && r.followerUser == relationship.followedUser
                        )) ||
                    (relationship.followedUser == userId &&
                        relationships.some(
                            (r) => r.followerUser == userId && r.followedUser == relationship.followerUser
                        ))
            )
            .map((relationship) =>
                relationship.followerUser == userId
                    ? relationship.followedUser
                    : relationship.followerUser
            );
        const friends = await User.findAll({
            attributes: ['id', 'name', 'profilePic'],
            include: {
                model: Notification,
                as: 'NotificationSend',
                where: {
                    receiver: userId,
                },
                required: false,
            },
            where: {
                id: friendIds,
            },
        });

        return res.status(200).json(friends)
    } catch (error) {
        next(error);
    }
}
module.exports = { addFollow, deleteFollow, getFollowed, getFollower, getFriends }