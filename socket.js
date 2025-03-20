const jwt = require('jsonwebtoken');
const socketServer = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
          },
    });

    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log("AUTHENTICATION ERROR:", err);
                    return next(new Error("Authentication Error "));
                }
    
                socket.decoded = decoded; // Store decoded token
                console.log("AUTHENTICATION SUCCESS");
    
                // Send confirmation message to the client
                socket.emit("connected", {
                    message: "Connected to the socket server",
                    socketId: socket.id
                });
    
                return next(); // Proceed with connection
            });
        } else {
            console.log("No token provided");
            return next(new Error("Authentication error: No token provided"));
        }
    });
    

        io.on("connection", async (socket)=>{
        console.log(`New socket connected: ${socket.id}`)

        io.to(socket.id).emit("connected", {
            message: "Connected to the socket server",
            socketId: socket.id
        });

        socket.on("message", (arr1, arr2) => {

            console.log("Received test1 event:", arr1, arr2);
            
          });
          socket.on("test2", (arr1, arr2) => {
            console.log("Received test2 event:", arr1, arr2);
          });
          
    });
    return io
    
    
}

module.exports = socketServer;