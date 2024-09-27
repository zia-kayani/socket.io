import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    // socket.emit("wellcome", `wellcome to the server ${socket.id}`)
    // socket.broadcast.emit("wellcome", `user has joined the server with id  ${socket.id}`)

    socket.on("message", (data)=>{
        console.log(data)
        socket.broadcast.emit("recieved-message" , data)
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected' , socket.id)
    })

  });

 server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });