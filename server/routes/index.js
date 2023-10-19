const authRoutes = require("./auth.js")
const commentRoutes = require("./comments.js")
const likeRoutes = require("./likes.js")
const postRoutes = require("./posts.js")
const relationshipRoutes = require("./relationships.js")
const storyRoutes = require("./stories.js")
const userRoutes = require("./users.js")
const conversationRoutes = require("./conversations.js")
const messageRoutes = require("./messages.js")
const notificationRoutes = require("./notifications.js")

const route = (app) => {
    app.use("/api/auth", authRoutes)
    app.use("/api/comments", commentRoutes)
    app.use("/api/likes", likeRoutes)
    app.use("/api/posts", postRoutes)
    app.use("/api/relationships", relationshipRoutes)
    app.use("/api/stories", storyRoutes)
    app.use("/api/users", userRoutes)
    app.use("/api/conversations", conversationRoutes)
    app.use("/api/messages", messageRoutes)
    app.use("/api/notifications", notificationRoutes)
}

module.exports = route;