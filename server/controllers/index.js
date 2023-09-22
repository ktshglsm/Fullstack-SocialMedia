const authController = require('./auth.js');
const commentController = require('./comment.js');
const likeController = require('./like.js');
const postController = require('./post.js');
const relationshipController = require('./auth.js');
const storyController = require('./story.js');
const userController = require('./user.js');

module.exports = {
    authController,
    commentController,
    likeController,
    postController,
    relationshipController,
    storyController,
    userController
}