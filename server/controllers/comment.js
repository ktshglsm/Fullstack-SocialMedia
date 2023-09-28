const { Comment, User } = require("../models")


const getComments = async (req, res, next) => {
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
        next(error);
    }
};
const addComment = async (req, res, next) => {
    try {
        await Comment.create(req.body);
        return res.status(200).json("comment has been created");

    } catch (error) {
        next(error);
    }
}




module.exports = {
    getComments, addComment
};