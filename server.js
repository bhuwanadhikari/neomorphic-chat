const express = require('express');
const next = require('next');
const cors = require('cors');


const dev = process.env.NODE_ENV != 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const server = express();

var rtserver = require('http').createServer(server);
const io = module.exports.io = require('socket.io')(rtserver);

const SocketManager = require('./rtServe');

server.use(cors());

io.on('connection', SocketManager)

nextApp.prepare()
    .then(() => {

        server.get('*', (req, res) => {
            handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('On on port 3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit();
    })