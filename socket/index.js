const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3000" });

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({ userId, socketId: socket.id })
        console.log(onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    })

    socket.on("addMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.receiver);
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }
    })

    socket.on("addNotification", (notification) => {
        const user = onlineUsers.find(user => user.userId === notification.receiver);
        if (user) {
            io.to(user.socketId).emit("getNotification", notification)
        }
    })


    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers);
        console.log(onlineUsers);
    })

});

io.listen(8080);