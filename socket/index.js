const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3001",  // Make sure the origin matches where your frontend is running
        methods: ["GET", "POST"],
    },
});

let users = [];

const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
        console.log(`User added: ${userId}, Socket ID: ${socketId}`);
    }
};

const getUser = (userId) => {
    console.log("socket users:", users); 
    return users.find(user => user.userId == userId);
};

const removeUser = socketId => {
    users = users.filter(user => user.socketId !== socketId);
    console.log(`User removed: Socket ID: ${socketId}`);
};

io.on('connection', (socket) => {
    console.log("A new user is connected");

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        console.log("Current users:", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user && user.socketId) {
            console.log(`Sending message from ${senderId} to ${receiverId}: ${text}`);
            io.emit("getMessage", {
                senderId: senderId,
                text: text
            });
        } else {
            console.log("User not found or user is not online.");
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
        console.log("Current users after disconnection:", users);
    });
});