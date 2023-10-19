const authController = require('./auth.js');
const commentController = require('./comment.js');
const likeController = require('./like.js');
const postController = require('./post.js');
const relationshipController = require('./relationship.js');
const storyController = require('./story.js');
const userController = require('./user.js');
const conversationController = require('./conversation.js');
const messageController = require('./message.js');
const notificationController = require('./notification.js');

module.exports = {
    authController,
    commentController,
    likeController,
    postController,
    relationshipController,
    storyController,
    userController,
    conversationController,
    messageController,
    notificationController,
}