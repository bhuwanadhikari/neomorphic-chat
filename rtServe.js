const io = require('./server').io;

module.exports = function(){
    io.on('connect', socket=>{
        console.log("new connection")
        socket.emit('now', {message: 'hello'})
    })
}