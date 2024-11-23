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

    const io = new Server(httpServer);

    io.on("connection", (socket) => {

        console.log(`User ${socket.id} connected`);

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
            // socket.to(room).emit("message", `User ${socket.id} has joined the room`);
        });

        // Broadcast message to the room
        socket.on("sendMessage", ({ room, message }) => {
            console.log(`Message to ${room}: ${message}`);
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
            // console.log(`User ${socket.username} disconnected`, socket.id);
            console.log("User disconnected:", socket.id);
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
