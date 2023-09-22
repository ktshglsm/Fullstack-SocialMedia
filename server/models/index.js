const sequelize = require('../connect.js');
const { DataTypes } = require('sequelize');

const CommentModel = require('./Comment.js');
const LikeModel = require('./Like.js');
const PostModel = require('./Post.js');
const RelationshipModel = require('./Relationship.js');
const StoryModel = require('./Story.js');
const UserModel = require('./User.js');

const Comment = CommentModel(sequelize, DataTypes);
const Like = LikeModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const Relationship = RelationshipModel(sequelize, DataTypes);
const Story = StoryModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);


module.exports = {
  User, Comment, Like, Post, Relationship, Story
};