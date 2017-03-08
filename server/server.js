//Module imports
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

//Constants
const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;

//Coffee buying tracking array
var coffeeLog = [];

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
    //update client with buyer
    if (coffeeLog.length == 0) {
        socket.emit('update',{buyer: undefined});
    } else {
        socket.emit('update',coffeeLog[coffeeLog.length - 1]);
    }

    //recieve update from client about new buyer
    socket.on('coffeeBought', (data) => {
        if (data.buyer) {
            //update the coffeeLog
            data.purchaseDate = new Date().getDate();
            coffeeLog.push(data);

            //let any other connected clients know
            io.emit('update',data);
        } else {
            console.log('missing buyer in coffeeBought message from client - no update made.');
        }
    });
    
    socket.on("disconnect",(socket) => {
        console.log("User disconnected");
    });
});


//start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});