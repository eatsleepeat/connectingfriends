const express = require("express");
const io = require("socket.io");

const app = express()
const port = 500;

const http = require("http").Server(app)
const socket = io(http);

const users = [];


socket.on("connection", (socket)=>{
    console.log("User connected");
    socket.on("disconnect",()=>{
        console.log("disconnected");
    })
})



http.listen(process.env.PORT || 500, ()=>{
    console.log("connected to port: "+ port)
});

app.post("/login", (req, res) => {
    users.push(req.body);
})

app.get("/", (req, res) => {
    res.send("This is our backend!")
})

app.get("/users", (req, res) => {
    res.send(JSON.stringify(users));
})

//Listen to the incoming chats
socket.on("chat message", function(msg){
    console.log("message: "  +  msg);
    //emits the thing in port
    socket.emit("received", { message: msg  });
});
