const { Op } = require("sequelize")
const { Story, User, Relationship } = require("../models")

const getStories = async (req, res, next) => {
    const { userId } = req.body
    try {
        const stories = await Story.findAll({
            include: {
                model: User,
                attributes: ["name", "profilePic"],
                include: {
                    model: Relationship,
                    as: "followed",
                    attributes: [],
                    where: {
                        followedUser: { [Op.col]: 'Story.userId' }
                    },
                    required: false
                }
            },
            where: {
                [Op.or]: [
                    { userId },
                    { '$User->followed.followerUser$': userId },
                ],
            },
            order: [['createdAt', 'DESC']],
        })

        return res.status(200).json(stories)
    } catch (error) {
        next(error);
    }
}

const addStory = async (req, res, next) => {
    try {
        await Story.create(req.body);
        return res.status(200).json("created successfully")
    } catch (error) {
        next(error);
    }
}
const deleteStory = async (req, res, next) => {
    const { userId, storyId: id } = req.body
    try {
        await Story.destroy({ where: { userId, id } });
        return res.status(200).json("deleted successfully")
    } catch (error) {
        next(error);
    }
}

module.exports = { getStories, addStory, deleteStory }