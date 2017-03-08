var cupTxt = document.getElementById("buyer");
var firstCoffeBuyers = document.getElementById("firstCoffeBuyers");
var camButton = document.getElementById("camButton");
var chezButton = document.getElementById("chezButton");


var socket = io();

//listen for coffee related events
socket.on("connect",function() {

    socket.on("update", function(data) {
        console.log("Update recieved:", data);
        if (!data.buyer) {
            cupTxt.innerHTML = "BUY COFFEE";
        } else {
            //firstCoffeBuyers.parentNode.removeChild(firstCoffeBuyers);
            //cupTxt.innerHTML = data.buyer + "<br>" + data.purchaseDate;
            cupTxt.innerHTML = data.buyer;
    }
    });

    camButton.onclick = function() {
        console.log("Cameron clicked");
        socket.emit('coffeeBought',{buyer: "Cameron"});
    };

    chezButton.onclick = function() {
        console.log("Chester clicked");
        socket.emit('coffeeBought',{buyer: "Chester"});
    };
});




