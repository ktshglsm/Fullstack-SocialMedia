const { Op } = require('sequelize');
const { Post, Relationship, User } = require("../models/index.js");

const getPosts = async (req, res, next) => {
    const { userId } = req.body
    try {
        const posts = await Post.findAll({
            include:
            {
                model: User, attributes: ['name', 'profilePic'],
                include: {
                    model: Relationship,
                    as: 'followed',
                    attributes: [],
                    where: {
                        followedUser: { [Op.col]: 'Post.userId' }
                    },
                    required: false,
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

        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUser) WHERE r.followerUser = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
        return res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
};
const addPost = async (req, res, next) => {
    try {
        await Post.create(req.body);
        return res.status(200).json("post has been created");
    } catch (error) {
        next(error);
    }

};

const deletePost = async (req, res, next) => {
    const { userId } = req.body;
    const { postId: id } = req.params;

    try {
        const data = await Post.destroy({ where: { userId, id } });
        if (data) return res.status(200).json("post has been deleted");
        return res.status(403).json('you just only delete your post')
    } catch (error) {
        next(error);
    }

};


module.exports = {
    getPosts, addPost, deletePost
};