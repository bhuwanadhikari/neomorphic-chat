"use strict";

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next');
const { link } = require('fs');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

class Room {
    constructor(rechts, links) {
        this.rechts = rechts;
        this.links = links;
    }

    get users() {
        return [this.rechts, this.links]
    }
}

const rooms = [];

const pool = [];


// socket.io server
io.on('connection', socket => {


    function addRoom(rechts, links) {
        console.log('room created', rechts, links);
        rooms.push([rechts, links])
        socket.broadcast.to(rechts).emit('join_room', rooms.length - 1)
        socket.broadcast.to(links).emit('join_room', rooms.length - 1)
    }

    function clearPool() {
        pool.length = 0;
        // socket.broadcast.to(rechts).emit('leave_room')
        // socket.broadcast.to(links).emit('leave_room')
    }
    
    socket.emit('connect', socket);


    pool.push(socket.id);
    if (pool.length === 2) {
        //create new room
        addRoom(pool[0], pool[1]);
        //clear the pool
        clearPool();
        console.log("Rooms are", rooms);
        console.log("Pool is:", pool);
    } else {
        console.log("Rooms are", rooms);
        console.log("Pool is:", pool);
    }




    //when disconnects
    socket.on('disconnect', () => {
        console.log('disconnnected');
        const selectedRoom = rooms.find(room => room.includes(socket.id))
        console.log('room is: ', selectedRoom)
        //if already in rooms
        if (selectedRoom) {
            const roomIndex = rooms.indexOf(selectedRoom);
            //widow goes to pool
            const widow = rooms[roomIndex].filter(id => id !== socket.id)[0]
            pool.push(widow);
            //both will leave  room
            rooms.splice(roomIndex, 1);
            socket.broadcast.to(widow).emit('leave_room');

        } else {
            pool.splice(pool.indexOf(socket.id), 1);
        }
        if (pool.length === 2) {
            //create new room
            addRoom(pool[0], pool[1])
            //clear the pool
            pool.length = 0;
        }
        console.log("Rooms are", rooms);
        console.log("Pool is:", pool)
    });



    socket.on('message', (data) => {
        io.emit('message', data);
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
