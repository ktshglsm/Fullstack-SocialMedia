const { User, Message } = require("../models")


const getMessages = async (req, res, next) => {
    const { conversationId } = req.params
    const { userId } = req.body
    try {
        const messages = await Message.findAll({
            include: {
                model: User,
                as: 'send',
                attributes: ['profilePic', 'name'],

            },
            where: {
                conversationId,
            }
        })
        return res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};
const addMessage = async (req, res, next) => {
    const { userId: sender } = req.body
    try {
        await Message.create({ ...req.body, sender });
        return res.status(200).json("Message has been created");

    } catch (error) {
        next(error);
    }
}




module.exports = {
    getMessages, addMessage
};