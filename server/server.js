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

io.on('connection', function(socket) {
    console.log('New user connected');

    socket.on('disconnect', function() {
        console.log('Client disconnected');
    });

    

    socket.on('createMessage', (newMessage) =>{
        console.log('New Message');
        console.log(newMessage);
        io.emit('newMessage', {
            from : newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });
    

});

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


