const { Notification } = require("../models/index.js");

const getNotifications = async (req, res, next) => {
    const { userId: receiver } = req.body;
    const { conversationId } = req.params;
    console.log(conversationId, receiver);
    try {
        const notifications = await Notification.findAll({
            where: { conversationId, receiver }
        })
        return res.status(200).json(notifications.length);
    } catch (error) {
        next(error);
    }

};

const addNotification = async (req, res, next) => {
    const { userId: sender } = req.body
    try {
        await Notification.create({ ...req.body, sender });
        return res.status(200).json('Notification success');
    } catch (error) {
        next(error)
    }

};

const deleteNotification = async (req, res, next) => {
    const { conversationId } = req.params
    try {
        await Notification.destroy({ where: { conversationId } });
        return res.status(200).json('deleteNotification success');
    } catch (error) {
        next(error);
    }

};


module.exports = {
    getNotifications, addNotification, deleteNotification
};