const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user connected');

    socket.on('disconnect', () =>{
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


