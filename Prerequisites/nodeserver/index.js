const { Socket } = require('socket.io');

// handle socket IO connections
const io=require('socket.io')(8000)

const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("New user",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined')
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    });
})