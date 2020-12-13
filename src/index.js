/*var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var urls = require('url');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function router(rutas, url, res) {
    if(typeof rutas[url] === 'function'){
        return rutas[url](res);
    } else {
        res.writeHead(404, {'Content-type':'text/html'});
        res.write('<h1>Error 404 Pagina no encontrada</h1>');
        res.end();
    }
}

var rutas = {};
//rutas['/'] = root;
rutas['/nosotros'] = nosotros;

function nosotros(res) {
    res.sendFile('nosotros.html' , { root : __dirname});
}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000');
});*/


const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.set('port', 4000);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
  console.log("Servidor", 4000);
});


const io = socket(server);

const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Conexión al socket lista");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });
});