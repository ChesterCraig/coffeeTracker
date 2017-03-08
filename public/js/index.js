var socket = io();

//listen for events
socket.on("connect",function() {
    console.log("Welcome.");

    socket.emit("createMessage",{
        from: "cheezy",
        text: "Hey team!"
    });
});


socket.on("newMessage",function(message) {
    console.log("newMessage:",message);
});


socket.on("disconnect",function() {
    console.log("Disconnected");
});

