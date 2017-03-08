//Module imports
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

//Constants
const publicPath = path.join(__dirname,"../public");
const port = process.env.port || 3000;

//Create webserver app
var app = express();

//swap to using the http server with express
var server = http.createServer(app);

//websockets server
var io = socketIO(server);

//set middleware to serve up static files.
app.use(express.static(publicPath));


//respond to io event
io.on("connection", (socket) => {
    console.log("New user connected");

    //handle receiving a message from a client
    socket.on("createMessage", (message) => {
        console.log("createMesage: ", message);

        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getDate()

        });

    });
    
    socket.on("disconnect",(socket) => {
        console.log("User disconnected");
    });
});




//start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});