import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// In-memory log storage
let logs = [];

// Utility function to log messages
function logEvent(event, data) {
    const logMessage = `[${new Date().toISOString()}] ${event}: ${JSON.stringify(data)}`;
    logs.push(logMessage);
    // console.log(logMessage);
}

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        connectionStateRecovery: {}
    });

    const users = new Map();
    io.on("connection", (socket) => {

        socket.on("userJoinRoom", ({username, room}) => {
            socket.join(room);
            socket.username = username;
            console.log(`User ${username} joined (room: ${room}, socketId: ${socket.id})`);
            logEvent('User Login', { id: socket.id, username });
            io.emit('log-update', `${username} join ${room}`);

            users.set(socket.id, { username, room });

            // Emit updated user list to the room
            const usersInRoom = [...users.values()].filter((user) => user.room === room);
            io.to(room).emit('roomUsers', usersInRoom);

            socket.broadcast.emit("stateUpdated", {
                socketId: socket.id,
                username: username,
                firstCapitalLetter: username.charAt(0).toUpperCase(),
            });
        });

        socket.on("joinRoom", (room) => {
            socket.join(room);

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
            io.to(room).emit("message", message);
        });

        socket.on("disconnect", () => {
            const user = users.get(socket.id);

            if (user) {
                const { username, room } = user;

                console.log(`User ${username} disconnected (room: ${room}, socketId: ${socket.id})`);
                logEvent('User Logout', { id: socket.id, username });
                io.emit('log-update', `${username} exit from ${room}`);

                // Remove the user from the `users` map
                users.delete(socket.id);

                // Emit updated user list to the room
                const usersInRoom = [...users.values()].filter((user) => user.room === room);
                io.to(room).emit('roomUsers', usersInRoom);

                io.to(room).emit('userLeaveRoom', {socketId: socket.id, username: username});
            }
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
