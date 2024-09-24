const io = require("socket.io")(8900, {
    cors : {
        origin : "http://localhost:3001"
    }
});

let users = [];
  
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
    users.push({userId, socketId})
}
 
const getUser = (userId) => {
    console.log("socket users:", users);
    return users.find(user => user.userId == userId);
}

const removeUser = socketId => {
    users = users.filter( user => user.socketId !== socketId)
}

io.on('connection', (socket)=>{
    // connection
    console.log("a new user is connected")

    // on connection take userId and socket Id
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)

        // sending online users to everyone
        io.emit("getUsers", users);
    })

    // send and recieve msg 
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user && user.socketId) {
            console.log("User found or user is online.");
          io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
          });
        } else {
          console.log("User not found or user is not online.");
        }
      });
      

    // disconnection
    // remove the user from users array after disconnection of socket server
    socket.on("disconnect", ()=>{
        console.log("user disconnected")
        removeUser(socket.id)

        // sending updated online users to everyone
        io.emit("getUsers", users);
    })
}) 
