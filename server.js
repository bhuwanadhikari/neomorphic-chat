const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
const messages = [];
const pairs = [];
const ones = [];

// socket.io server
io.on('connection', socket => {
    console.log("connected")
    ones.push(socket.id);

    socket.emit('connection');

    //when disconnects
    socket.on('disconnect', ()=> {
        console.log('disconnnected');
        ones.splice(ones.indexOf(socket.id), 1);
    });



    console.log(ones);
    socket.on('message', (data) => {
        console.log(data)
        io.emit('message', data)
    })
})

nextApp.prepare().then(() => {
    //   app.get('/messages', (req, res) => {
    //     res.json(messages)
    //   })

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
