const moment = require("moment/moment.js");
const { db } = require("../connect.js");
const jwt = require("jsonwebtoken");
const { Comment, User } = require("../models")


const getComments = async (req, res) => {
    const { postId } = req.query
    try {
        const comments = await Comment.findAll({

            include: {
                model: User,
                attributes: ['name', 'profilePic']
            },
            where: {
                postId
            },
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json(comments);
    } catch (error) {
        if (error) return res.status(500).json(error);
    }
};
const addComment = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("Not logged in!");
        jwt.verify(token, "secretKey", async (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");
            const newComment = { ...req.body, userId: userInfo.id }
            await Comment.create(newComment);
            return res.status(200).json("comment has been created");
        })
    } catch (error) {
        if (err) return res.status(500).json(err);
    }
}




module.exports = {
    getComments, addComment
};