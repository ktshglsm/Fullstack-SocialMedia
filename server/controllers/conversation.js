const { Op } = require("sequelize");
const { User, Conversation } = require("../models")


const getConversation = async (req, res, next) => {
    const { other } = req.params
    const { userId: me } = req.body
    try {
        const conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    { firstUser: me, secondUser: other },
                    { firstUser: other, secondUser: me }
                ]
            },
        })
        const otherId = me === conversation.firstUser ? conversation.secondUser : conversation.firstUser
        const otherUser = await User.findByPk(otherId, {
            attributes: ['name', 'profilePic', 'id']
        })
        return res.status(200).json({ conversation, otherUser });
    } catch (error) {
        next(error);
    }
};
const addConversation = async (req, res, next) => {

    try {
        await Conversation.create(req.body);
        return res.status(200).json("Conversation has been created");

    } catch (error) {
        next(error);
    }
}




module.exports = {
    getConversation, addConversation
};