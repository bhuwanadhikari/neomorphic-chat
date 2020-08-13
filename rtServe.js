const io = require('./server').io;

module.exports = function(){
    io.on('connect', socket=>{
        socket.emit('now', {message: 'hello'})
    })
}