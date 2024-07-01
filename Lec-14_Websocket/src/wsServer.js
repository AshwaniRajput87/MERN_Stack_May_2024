const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const { join } = require('path');

dotenv.config();

const { PORT } = process.env;

const app =  express();

app.use(express.static("src/public"))

const httpServer = http.createServer(app);

const io = new Server(httpServer);

let room;

io.on('connection', (socket)=>{
    console.log("socket connection established", socket.id);

    socket.on('message', (data)=>{
        console.log(data);
        socket.broadcast.emit("broadcast", data);
    });

    socket.on('create_grp', (roomId)=>{
        console.log(roomId);
        room = roomId;
        socket.join(roomId);
    });

    socket.on('join_grp', ()=>{
        console.log(`${socket.id} + 'joined the room ' + ${room}`);
        socket.join(room);
    });

    socket.on('grp_msg', (msg)=>{
        console.log(`group message sent: ${msg}`);
        socket.to(room).emit('serve_grp_msg', msg);
    });
})


app.get('/', (req, res)=>{
    // console.log(__dirname);
    res.sendFile(join(__dirname, 'public', 'wsClient.html'));

    // res.json({
    //     status: "success",
    //     message:"Ok"
    // })
})


httpServer.listen(PORT, ()=>{
    console.log(`Serving the request from ${PORT}`);
})

