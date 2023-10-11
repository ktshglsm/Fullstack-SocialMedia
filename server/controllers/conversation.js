const { User, Conversation } = require("../models")


const getConversation = async (req, res, next) => {
    const { secondUser } = req.params
    const { userId: firstUser } = req.body
    try {
        const conversation = await Conversation.findOne({
            where: {
                firstUser, secondUser
            },
        })
        return res.status(200).json(conversation);
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