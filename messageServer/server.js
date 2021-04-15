const express = require('express');
const socket = require("socket.io");
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

var roomlist = [];

var server = app.listen(3000,()=>{
    console.log("connected to server");
});



var io = socket(server);

app.post('/join', (req,res)=>{
    var roomid = req.body.room;
    if(roomlist.includes(roomid)){
        res.send({val:"YES"});
    }
    else{
        res.send({val:"NO"});
    }
});

app.post('/create', (req,res)=>{
    var roomid = req.body.room;
    console.log(req.body.room);
    if(roomlist.includes(roomid)){
        res.send({val:"NO"});
    }
    else{
        res.send({val:"YES"});
        roomlist = roomlist +[roomid];
        console.log(roomlist);
    }
});


io.on('connection',socket =>{
    var room ='';
    socket.on('room',(data)=>{
        socket.join(data.room);
        console.log(data.room);
        io.sockets.to(data.room).emit('chatMessage',{"name":"notification","messageSent":data.name+" has joined the room"});
        room = data.room;
    });


    socket.on('chatMessage',data=>{
        io.to(room).emit('chatMessage',data);
    });
})