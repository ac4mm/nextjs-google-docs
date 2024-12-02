import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        connectionStateRecovery: {}
    });

    let users = [];
    io.on("connection", (socket) => {

        // console.log(`User ${socket.id} connected`);

        // socket.on("join", (data) => {
        //     users.push({ id: socket.id, username: data.username });
        //     io.emit("userList", users); // Send updated user list
        // });

        socket.on("userJoinRoom", ({username, room}) => {
            socket.join(room);
            socket.username = username;
            console.log(`User ${username} joined (room: ${room}, socketId: ${socket.id})`);

            socket.broadcast.emit("stateUpdated", {
                socketId: socket.id,
                username: username,
                firstCapitalLetter: username.charAt(0).toUpperCase(),
            });
        });

        socket.on("joinRoom", (room) => {
            socket.join(room);
            // console.log(`User ${socket.id} joined room: ${room}`);
            socket.to(room).emit("message", `User ${socket.id} has joined the room`);
        });

        // Get users in a room with their usernames
        socket.on('getUsersInRoom', (room, callback) => {
            const socketsInRoom = io.sockets.adapter.rooms.get(room) || new Set();
            const usersInRoom = [...socketsInRoom].map((socketId) => {
                const userSocket = io.sockets.sockets.get(socketId);
                return {
                    socketId: socketId,
                    username: userSocket?.username,
                    firstCapitalLetter: userSocket?.username.charAt(0).toUpperCase(),
                };
            });

            callback(usersInRoom);
        });

        // Broadcast message to the room
        socket.on("sendMessage", ({ room, message }) => {
            // console.log(`Message sent to ${room}: ${message}`);
            io.to(room).emit("message", message);
        });

        // socket.on("username", (username) => {
        //     socket.join(socket.id);
        //
        //     console.log(`User ${username} joined room ${socket.id}`);
        //
        //     // Broadcast current sessions for the user
        //     io.to(socket.id).emit("updateSessions", userSessions[username]);
        // });

        socket.on("disconnect", () => {
            console.log(`User ${socket.username} disconnected`, socket.id);
            // console.log("User disconnected:", socket.id);

            users = users.filter((user) => user.id !== socket.id);
            io.emit("userList", users); // Send updated user list
        });
    });



    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Server ready on http://${hostname}:${port}`);
        });
});
