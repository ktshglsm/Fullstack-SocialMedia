const sequelize = require('../connect.js');
const { DataTypes } = require('sequelize');

const CommentModel = require('./Comment.js');
const LikeModel = require('./Like.js');
const PostModel = require('./Post.js');
const RelationshipModel = require('./Relationship.js');
const StoryModel = require('./Story.js');
const UserModel = require('./User.js');
const ConversationModel = require('./Conversation.js');
const MessageModel = require('./Message.js');
const NotificationModel = require('./Notification.js');

const Comment = CommentModel(sequelize, DataTypes);
const Like = LikeModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const Relationship = RelationshipModel(sequelize, DataTypes);
const Story = StoryModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Conversation = ConversationModel(sequelize, DataTypes);
const Message = MessageModel(sequelize, DataTypes);
const Notification = NotificationModel(sequelize, DataTypes);

//comment fk
User.hasMany(Comment, {
  foreignKey: 'userId'
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
})
Post.hasMany(Comment, {
  foreignKey: 'postId'
});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
})

//like fk
Post.hasMany(Like, {
  foreignKey: 'postId'
});
Like.belongsTo(Post, {
  foreignKey: 'postId',
});
User.hasMany(Like, {
  foreignKey: 'userId'
});
Like.belongsTo(User, {
  foreignKey: 'userId',
})

//post fk
User.hasMany(Post, {
  foreignKey: 'userId'
});
Post.belongsTo(User, {
  foreignKey: 'userId',
})

//relationship fk
User.hasMany(Relationship, {
  foreignKey: 'followerUser',
  as: 'follower'
});
Relationship.belongsTo(User, {
  foreignKey: 'followerUser',
  as: 'follower'
})
User.hasMany(Relationship, {
  foreignKey: 'followedUser',
  as: 'followed'
});
Relationship.belongsTo(User, {
  foreignKey: 'followedUser',
  as: 'followed'
})

//story fk
User.hasMany(Story, {
  foreignKey: 'userId'
});
Story.belongsTo(User, {
  foreignKey: 'userId',
})

//conversation fk
User.hasMany(Conversation, {
  foreignKey: 'firstUser',
  as: 'first'
})
Conversation.belongsTo(User, {
  foreignKey: 'firstUser',
  as: 'first'
})
User.hasMany(Conversation, {
  foreignKey: 'secondUser',
  as: 'second'
})
Conversation.belongsTo(User, {
  foreignKey: 'secondUser',
  as: 'second'
})

//message fk
User.hasMany(Message, {
  foreignKey: 'sender',
  as: 'send'
})
Message.belongsTo(User, {
  foreignKey: 'sender',
  as: 'send'
})
User.hasMany(Message, {
  foreignKey: 'receiver',
  as: 'receive'
})
Message.belongsTo(User, {
  foreignKey: 'receiver',
  as: 'receive'
})
Conversation.hasMany(Message, {
  foreignKey: 'conversationId',
})
Message.belongsTo(Conversation, {
  foreignKey: 'conversationId',
})

//notification fk
User.hasMany(Notification, {
  foreignKey: 'sender',
  as: 'NotificationSend'
})
Notification.belongsTo(User, {
  foreignKey: 'sender',
  as: 'NotificationSend'
})
User.hasMany(Notification, {
  foreignKey: 'receiver',
  as: 'NotificationReceive'
})
Notification.belongsTo(User, {
  foreignKey: 'receiver',
  as: 'NotificationReceive'
})
Conversation.hasMany(Notification, {
  foreignKey: 'conversationId',
})
Notification.belongsTo(Conversation, {
  foreignKey: 'conversationId',
})


module.exports = {
  Comment,
  Like,
  Post,
  Relationship,
  Story,
  User,
  Conversation,
  Message,
  Notification
};